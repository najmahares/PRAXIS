import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { LESSONS } from "@/lib/curriculum/lessons";
import { LEVELS } from "@/lib/curriculum/levels";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";
const SESSION_COOKIE = "praxis_session";

const SYSTEM_PROMPT = `You write short, warm study notes for PRAXIS, a beginner-focused stock market learning app in Kenya.

Return only valid JSON. No prose. No fences. Shape:

{
  "title": "short title, 3 to 6 words",
  "summary": "one paragraph, 50 to 70 words, second person, tying the level together",
  "keyPoints": [
    "one sentence per point",
    "five to seven points total",
    "each under 18 words"
  ],
  "closing": "one sentence, under 20 words, about why this level matters next"
}

Rules:
- Second person. Use "you".
- Plain language.
- No emoji. No markdown. No numbers inside strings.
- Ground every point in what the level actually taught.
- Keep the whole response under 500 tokens. Be concise.`;

type Body = { level?: number };

type GeneratedNotes = {
  title: string;
  summary: string;
  keyPoints: string[];
  closing: string;
  source: "ai" | "local";
};

function buildLocalFallback(levelId: number): GeneratedNotes {
  const level = LEVELS.find((l) => l.id === levelId);
  const lessons = LESSONS.filter((l) => l.level === levelId);
  const levelTitle = level?.title ?? `Level ${levelId}`;

  const keyPoints = lessons.map((lesson) => lesson.summary);

  const summary =
    lessons.length > 0
      ? `You worked through ${lessons.length} ${
          lessons.length === 1 ? "lesson" : "lessons"
        } in this level. Here is a quick recap of what each one covered.`
      : "A short recap of what this level covered.";

  const closing =
    lessons.length > 0
      ? `These ideas will come back in the levels ahead, so keep them close.`
      : "Keep going. The next level builds on this one.";

  return {
    title: `${levelTitle} in review`,
    summary,
    keyPoints,
    closing,
    source: "local",
  };
}

function isValidAI(value: unknown): value is Omit<GeneratedNotes, "source"> {
  if (!value || typeof value !== "object") return false;
  const n = value as Record<string, unknown>;
  if (typeof n.title !== "string" || n.title.trim().length < 3) return false;
  if (typeof n.summary !== "string" || n.summary.trim().length < 20) return false;
  if (!Array.isArray(n.keyPoints) || n.keyPoints.length < 3) return false;
  if (!n.keyPoints.every((p) => typeof p === "string" && p.trim().length > 0)) return false;
  if (typeof n.closing !== "string") return false;
  return true;
}

function buildCompactLevelContent(levelId: number, levelTitle: string, levelGoal: string): string {
  const lessons = LESSONS.filter((lesson) => lesson.level === levelId);
  const lines: string[] = [];
  lines.push(`Level ${levelId}: ${levelTitle}`);
  lines.push(`Goal: ${levelGoal}`);
  lines.push("");
  for (const lesson of lessons) {
    lines.push(`- ${lesson.title}: ${lesson.summary}`);
  }
  return lines.join("\n");
}

export async function POST(request: Request) {

  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const cookieHeader = request.headers.get("cookie") ?? "";
  const session = readCookie(cookieHeader, SESSION_COOKIE);
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const levelId = typeof body.level === "number" ? body.level : NaN;
  if (!Number.isFinite(levelId)) {
    return NextResponse.json({ error: "missing_level" }, { status: 400 });
  }

  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) {
    return NextResponse.json({ error: "unknown_level" }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ notes: buildLocalFallback(levelId) });
  }

  const compact = buildCompactLevelContent(level.id, level.title, level.goal);

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Write study notes for this level. Keep it short.\n\n${compact}`,
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.55,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        "[learning-notes] groq error",
        response.status,
        detail.slice(0, 300),
      );
      return NextResponse.json({ notes: buildLocalFallback(levelId) });
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = payload.choices?.[0]?.message?.content ?? "";

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("[learning-notes] invalid json", text.slice(0, 200));
      return NextResponse.json({ notes: buildLocalFallback(levelId) });
    }

    if (!isValidAI(parsed)) {
      console.error(
        "[learning-notes] schema mismatch",
        JSON.stringify(parsed).slice(0, 200),
      );
      return NextResponse.json({ notes: buildLocalFallback(levelId) });
    }

    return NextResponse.json({
      notes: { ...parsed, source: "ai" as const },
    });
  } catch (err) {
    console.error("[learning-notes] fetch failed", err);
    return NextResponse.json({ notes: buildLocalFallback(levelId) });
  }
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}
