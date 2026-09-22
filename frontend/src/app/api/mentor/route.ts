import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/mentor/persona";
import { checkRateLimit } from "@/lib/mentor/rateLimit";
import { getSupabaseAdmin, type MemoryRow } from "@/lib/supabase/server";
import type { ChatRequest, MentorMessage } from "@/lib/mentor/types";





async function withGroqRetry(
  fn: () => Promise<Response>,
  maxAttempts = 2
): Promise<Response> {
  let lastRes: Response | null = null;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await fn();
    if (res.status !== 429) return res;
    lastRes = res;
    if (attempt < maxAttempts - 1) {
      const retryAfter = Number(res.headers.get("retry-after") ?? "1");
      await new Promise((r) => setTimeout(r, Math.min(3000, retryAfter * 1000)));
    }
  }
  return lastRes!;
}


export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent";

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY = 40;
const MAX_MEMORIES = 60;
const TOP_MEMORIES = 6;

const SESSION_COOKIE = "praxis_session";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const rawSession = readCookie(cookieHeader, SESSION_COOKIE);
  const parsed = parseSession(rawSession);
  if (!parsed) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const sessionKey = parsed.token;
  const userId = parsed.userId;

  const limit = checkRateLimit(sessionKey);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter: limit.retryAfter },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfter) },
      },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "message_too_long" }, { status: 400 });
  }

  const history: MentorMessage[] = Array.isArray(body.history)
    ? body.history
        .filter((entry): entry is MentorMessage => {
          if (!entry || typeof entry !== "object") return false;
          const role = (entry as MentorMessage).role;
          const content = (entry as MentorMessage).content;
          return (
            (role === "user" || role === "assistant") &&
            typeof content === "string" &&
            content.trim().length > 0
          );
        })
        .slice(-MAX_HISTORY)
    : [];

  const context = body.context && typeof body.context === "object" ? body.context : {};

  const sb = getSupabaseAdmin();
  const serverMemories: MemoryRow[] = [];
  if (sb) {
    const { data, error } = await sb
      .from("mentor_memories")
      .select("id, user_id, fact, concept, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(MAX_MEMORIES);
    if (!error && data) {
      serverMemories.push(...(data as MemoryRow[]));
    }
  }

  function tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((t) => t.length > 2);
  }

  const queryTokens = new Set(tokenize(message));
  const scored = serverMemories.map((m) => {
    const tokens = tokenize(`${m.fact} ${m.concept}`);
    let overlap = 0;
    for (const t of tokens) {
      if (queryTokens.has(t)) overlap += 1;
    }
    const recency = new Date(m.created_at).getTime() / 1_000_000_000_000;
    return { m, score: overlap + recency * 0.1 };
  });
  const topMemories = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_MEMORIES)
    .map((s) => ({
      id: s.m.id,
      fact: s.m.fact,
      concept: s.m.concept,
      createdAt: new Date(s.m.created_at).getTime(),
    }));

  const contextWithMemories = { ...context, memories: topMemories };

  const imageTriggers =
    /(show me an image|show me a picture|generate an image|generate a picture|illustrate|draw|picture of|image of|visuali[sz]e)/i;
  const allowImage = imageTriggers.test(message);
  const systemPrompt = buildSystemPrompt(contextWithMemories, allowImage);

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!groqKey && !geminiKey) {
    return NextResponse.json({ error: "no_provider_configured" }, { status: 503 });
  }

  if (groqKey) {
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
            ...history.map((entry) => ({ role: entry.role, content: entry.content })),
            { role: "user", content: message },
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (response.ok && response.body) {
        return streamFromGroq(response.body);
      }

      if (response.status !== 429) {
        const text = await response.text().catch(() => "");
        console.error("[mentor] groq error", response.status, text.slice(0, 400));
        return NextResponse.json({ error: "provider_error" }, { status: 502 });
      }
    } catch (err) {
      console.error("[mentor] groq fetch failed", err);
      if (!geminiKey) {
        return NextResponse.json({ error: "provider_error" }, { status: 502 });
      }
    }
  }

  if (geminiKey) {
    try {
      const response = await fetch(`${GEMINI_URL}?alt=sse&key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...history.map((entry) => ({
              role: entry.role === "assistant" ? "model" : "user",
              parts: [{ text: entry.content }],
            })),
            { role: "user", parts: [{ text: message }] },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
        }),
      });

      if (response.ok && response.body) {
        return streamFromGemini(response.body);
      }

      const text = await response.text().catch(() => "");
      console.error("[mentor] gemini error", response.status, text.slice(0, 400));
    } catch (err) {
      console.error("[mentor] gemini fetch failed", err);
    }
  }

  return NextResponse.json({ error: "no_provider_available" }, { status: 503 });
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}

function streamFromGroq(source: ReadableStream<Uint8Array>): Response {
  return buildStream(source, (line) => {
    if (!line.startsWith("data:")) return null;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") return null;
    try {
      const parsed = JSON.parse(payload) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const delta = parsed.choices?.[0]?.delta?.content;
      return typeof delta === "string" ? delta : null;
    } catch {
      return null;
    }
  });
}

function streamFromGemini(source: ReadableStream<Uint8Array>): Response {
  return buildStream(source, (line) => {
    if (!line.startsWith("data:")) return null;
    const payload = line.slice(5).trim();
    if (!payload) return null;
    try {
      const parsed = JSON.parse(payload) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
      return typeof text === "string" ? text : null;
    } catch {
      return null;
    }
  });
}

function buildStream(
  source: ReadableStream<Uint8Array>,
  extract: (line: string) => string | null,
): Response {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";

  const output = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = source.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const piece = extract(line);
            if (piece) controller.enqueue(encoder.encode(piece));
          }
        }
      } catch {
        
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
    cancel() {
      source.cancel().catch(() => {
        
      });
    },
  });

  return new Response(output, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

function parseSession(value: string | null): { token: string; userId: string } | null {
  if (!value) return null;
  const [token, userId] = value.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}
