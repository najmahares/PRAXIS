import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { isQuiz, type Quiz } from "@/lib/mentor/quizTypes";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";
const SESSION_COOKIE = "praxis_session";

const MAX_TOPIC_LENGTH = 120;
const MIN_COUNT = 3;
const MAX_COUNT = 10;

const QUIZ_SYSTEM_PROMPT = `You generate multiple-choice quizzes for PRAXIS, a beginner-focused stock market learning app.

Return only valid JSON. No prose. No markdown fences. The JSON must match this exact shape:

{
  "title": "short quiz title",
  "topic": "the topic you were asked about",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "questions": [
    {
      "prompt": "the question",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "one or two sentences explaining why the correct answer is right",
      "concept": "a two to four word concept name that this question tests"
    }
  ]
}

Rules:
- Every question has exactly four options.
- correctIndex is 0, 1, 2, or 3.
- Exactly one option is correct.
- Distractors must be plausible. Do not make them obviously wrong.
- No emojis. No markdown. No "all of the above".
- Keep prompts under 25 words. Options under 12 words. Explanations under 35 words.
- The concept field is a short, reusable label. Use the same label for two questions testing the same idea so the app can group them. Examples: "share ownership", "fixed income", "maturity date", "market volatility", "risk and return".
- Difficulty calibrates question depth:
  - beginner: definitions, recognition, one-step reasoning.
  - intermediate: application, comparison, cause-effect.
  - advanced: tradeoffs, edge cases, multi-step reasoning.
- Never recommend specific trades.`;

type Body = {
  topic?: string;
  difficulty?: string;
  count?: number;
};

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

  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  if (!topic) {
    return NextResponse.json({ error: "missing_topic" }, { status: 400 });
  }
  if (topic.length > MAX_TOPIC_LENGTH) {
    return NextResponse.json({ error: "topic_too_long" }, { status: 400 });
  }

  const difficulty =
    body.difficulty === "intermediate" || body.difficulty === "advanced"
      ? body.difficulty
      : "beginner";

  const rawCount = typeof body.count === "number" ? body.count : 5;
  const count = Math.min(MAX_COUNT, Math.max(MIN_COUNT, Math.round(rawCount)));

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ error: "no_provider_configured" }, { status: 503 });
  }

  const userPrompt = `Generate a ${count}-question ${difficulty} quiz on: ${topic}`;

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
          { role: "system", content: QUIZ_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.6,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[quiz] groq error", response.status, detail.slice(0, 400));
      return NextResponse.json({ error: "provider_error" }, { status: 502 });
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = payload.choices?.[0]?.message?.content ?? "";

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("[quiz] invalid json", text.slice(0, 200));
      return NextResponse.json({ error: "invalid_quiz" }, { status: 502 });
    }

    if (!isQuiz(parsed)) {
      console.error("[quiz] schema mismatch", JSON.stringify(parsed).slice(0, 300));
      return NextResponse.json({ error: "invalid_quiz" }, { status: 502 });
    }

    return NextResponse.json({ quiz: parsed as Quiz });
  } catch (err) {
    console.error("[quiz] fetch failed", err);
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}
