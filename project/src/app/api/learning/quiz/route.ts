import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { LESSONS } from "@/lib/curriculum/lessons";
import { LEVELS } from "@/lib/curriculum/levels";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";
const SESSION_COOKIE = "praxis_session";

const ALLOWED_COUNTS = [5, 10, 15];
const MAX_TOKENS = 4000;

function buildSystemPrompt(count: number): string {
  return `You generate multiple-choice quizzes for PRAXIS, a beginner-focused stock market learning platform based in Kenya.

The learner just finished every lesson in a level of the curriculum. Generate ${count} multiple-choice questions that test whether they understood the concepts in that level.

Return only valid JSON. No prose. No markdown fences. Shape:

{
  "title": "short quiz title",
  "questions": [
    {
      "prompt": "the question",
      "options": ["option A", "option B", "option C", "option D"],
      "correctIndex": 0,
      "explanation": "one or two sentences explaining why the correct answer is right and what mistake the most common wrong answer represents",
      "concept": "two to four word concept this question tests",
      "sourceLesson": "the exact lesson ID this question came from, e.g. 1.3"
    }
  ]
}

Rules:
- Every question has exactly 4 options.
- correctIndex is 0, 1, 2, or 3.
- Exactly one correct answer per question.
- Distractors must be plausible. They should represent common misconceptions, not obvious mistakes.
- No trick questions. No "all of the above" or "none of the above".
- No emojis. No markdown in question text or options.
- Prompts under 25 words. Options under 15 words. Explanations under 40 words.
- Every question must be answerable from the lesson content provided below. Do not test outside knowledge.
- The sourceLesson field MUST be one of the lesson IDs listed in the level content (e.g. "1.1", "1.3", "1.6"). Never invent a lesson ID.
- Every question must be traceable to exactly one lesson. The learner must be able to open that lesson and find the answer.
- Mix three question types roughly evenly:
  1. Definition: confirms the learner understands a term.
  2. Application: presents a real company scenario and asks the learner to apply a concept.
  3. Judgement: presents a plausible situation and asks what it means or what to do.
- Use Kenyan market context (NSE-listed companies like Safaricom, Equity Group, KCB, EABL) where application or judgement questions call for a concrete example.
- Never recommend specific trades or say a company is a good or bad investment.
- Cover the concepts across the whole level. Do not repeat the same concept in more than two questions.
- Generate fresh questions every time you are called. Do not reuse the sample questions provided in the lesson content verbatim. Use them only as a signal of the level and tone.`;
}

function buildLevelContent(levelId: number, levelTitle: string, levelGoal: string): string {
  const lessons = LESSONS.filter((lesson) => lesson.level === levelId);
  const lines: string[] = [];
  lines.push(`Level ${levelId}: ${levelTitle}`);
  lines.push(`Goal: ${levelGoal}`);
  lines.push("");

  for (const lesson of lessons) {
    lines.push(`--- Lesson ${lesson.id}: ${lesson.title} ---`);
    lines.push(`Summary: ${lesson.summary}`);
    for (const block of lesson.body) {
      if (block.kind === "paragraph") lines.push(block.text.replace(/\*\*/g, ""));
      else if (block.kind === "example") lines.push(`Example: ${block.text}`);
      else if (block.kind === "takeaway") lines.push(`Key takeaway: ${block.text}`);
      else if (block.kind === "check") {
        lines.push(
          `Reference question: ${block.question} (correct answer: ${block.options[block.correct]})`,
        );
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}

type Body = {
  level?: number;
  count?: number;
};

type GeneratedQuestion = {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  concept?: string;
  sourceLesson: string;
};

type GeneratedQuiz = {
  title: string;
  questions: GeneratedQuestion[];
};

function isValidQuiz(value: unknown): value is GeneratedQuiz {
  if (!value || typeof value !== "object") return false;
  const q = value as GeneratedQuiz;
  if (typeof q.title !== "string") return false;
  if (!Array.isArray(q.questions) || q.questions.length === 0) return false;
  for (const item of q.questions) {
    if (!item || typeof item !== "object") return false;
    if (typeof item.prompt !== "string" || item.prompt.trim().length < 4) return false;
    if (!Array.isArray(item.options) || item.options.length !== 4) return false;
    if (!item.options.every((o) => typeof o === "string" && o.trim().length > 0)) return false;
    if (typeof item.correctIndex !== "number") return false;
    if (item.correctIndex < 0 || item.correctIndex > 3) return false;
    if (typeof item.explanation !== "string" || item.explanation.trim().length < 4) return false;
    if (typeof item.sourceLesson !== "string" || item.sourceLesson.trim().length < 1) return false;
  }
  return true;
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

  const rawCount = typeof body.count === "number" ? body.count : 10;
  const count = ALLOWED_COUNTS.includes(rawCount) ? rawCount : 10;

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ error: "no_provider_configured" }, { status: 503 });
  }

  const levelContent = buildLevelContent(level.id, level.title, level.goal);
  const systemPrompt = buildSystemPrompt(count);
  const userMessage = `Generate ${count} questions for this level.\n\n${levelContent}`;

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
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        response_format: { type: "json_object" },
        temperature: 0.85,
        max_tokens: MAX_TOKENS,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[learning-quiz] groq error", response.status, detail.slice(0, 400));
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
      console.error("[learning-quiz] invalid json", text.slice(0, 200));
      return NextResponse.json({ error: "invalid_quiz" }, { status: 502 });
    }

    if (!isValidQuiz(parsed)) {
      console.error("[learning-quiz] schema mismatch", JSON.stringify(parsed).slice(0, 300));
      return NextResponse.json({ error: "invalid_quiz" }, { status: 502 });
    }

    const normalized = {
      title: parsed.title,
      questions: parsed.questions.slice(0, count).map((q) => ({
        prompt: q.prompt,
        options: q.options,
        correctIndex: q.correctIndex as 0 | 1 | 2 | 3,
        explanation: q.explanation,
        concept: q.concept,
        sourceLesson: q.sourceLesson,
      })),
    };

    return NextResponse.json({ quiz: normalized });
  } catch (err) {
    console.error("[learning-quiz] fetch failed", err);
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}
