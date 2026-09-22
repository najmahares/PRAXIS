import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications/server";
import { getCachedUser } from "@/lib/auth/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";
const SESSION_COOKIE = "praxis_session";

const MAX_REPLY_LENGTH = 4000;
const MAX_FACTS = 4;

const EXTRACT_PROMPT = `You extract durable facts about a learner from a mentor conversation turn. Always refer to the learner by their first name (given below), never "the learner", "the user", or "Learner".

Return JSON only. No prose. No markdown fences.

Shape:
{ "facts": [ { "fact": "one short sentence", "concept": "two to four words" } ] }

Extract only facts that are durable and about the learner, their reasoning, their preferences, or their gaps in understanding.

Good facts:
- "{userName} said they feel unsure about how bond coupons work."
- "{userName} confused revenue with profit on the balance sheet."
- "{userName} prefers examples with small numbers."
- "{userName} held through a sector dip instead of selling."

Bad facts (do not extract):
- "{userName} asked about position sizing." (just a question)
- "The mentor explained stop-losses." (about the mentor)
- "Amina is in a practice scenario." (transient context)
- Any financial advice, price predictions, or facts about real markets.

Rules:
- At most ${MAX_FACTS} facts per turn.
- Each fact under 25 words.
- Concept is a short reusable label, e.g. "bond mechanics", "balance sheet", "position sizing", "risk management".
- If nothing durable was said, return { "facts": [] }.
- Never invent details that were not in the conversation.`;

function normalizeFactName(fact: string, name: string): string {
  
  
  return fact
    .replace(/^\s*(The\s+)?Learner\b/i, name)
    .replace(/^\s*(The\s+)?User\b/i, name)
    .replace(/^\s*Amina\b/, name)
    .replace(/^\s*Admin\b/, name);
}

type Body = {
  userMessage?: string;
  assistantReply?: string;
  page?: string;
};

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const rawSession = readCookie(cookieHeader, SESSION_COOKIE);
  const parsed = parseSession(rawSession);
  if (!parsed) {
    return NextResponse.json({ facts: [] });
  }
  const userId = parsed.userId;

  
  let firstName = "you";
  {
    const sbInit = getSupabaseAdmin();
    if (sbInit) {
      try {
        const { data: u } = await sbInit.auth.admin.getUserById(userId);
        const meta = (u?.user?.user_metadata ?? {}) as Record<string, unknown>;
        const n = typeof meta.name === "string" ? meta.name.trim() : "";
        if (n) firstName = n.split(/\s+/)[0];
      } catch {
        
      }
    }
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ facts: [] });
  }

  const userMessage = typeof body.userMessage === "string" ? body.userMessage.slice(0, 1500) : "";
  const assistantReply =
    typeof body.assistantReply === "string" ? body.assistantReply.slice(0, MAX_REPLY_LENGTH) : "";
  const page = typeof body.page === "string" ? body.page.slice(0, 60) : "";

  if (!userMessage || !assistantReply) {
    return NextResponse.json({ facts: [] });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ facts: [] });
  }

  const convo = `${firstName} said: ${userMessage}\n\nMentor replied: ${assistantReply}\n\nPage: ${page || "unknown"}`;

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
          { role: "system", content: EXTRACT_PROMPT + "\n\nThe learner's first name is: " + firstName },
          { role: "user", content: convo },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ facts: [] });
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = payload.choices?.[0]?.message?.content ?? "";

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ facts: [] });
    }

    const raw = (parsed as { facts?: unknown }).facts;
    if (!Array.isArray(raw)) return NextResponse.json({ facts: [] });

    const facts = raw
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const f = item as { fact?: unknown; concept?: unknown };
        if (typeof f.fact !== "string" || typeof f.concept !== "string") return null;
        const fact = f.fact.trim();
        const concept = f.concept.trim();
        if (!fact || fact.length < 8 || fact.length > 240) return null;
        return { fact, concept: concept || "general" };
      })
      .filter((item): item is { fact: string; concept: string } => item !== null)
      .slice(0, MAX_FACTS);

    if (facts.length > 0) {
      const sb = getSupabaseAdmin();
      if (sb) {
        const rows = facts.map((f) => ({
          user_id: userId,
          fact: normalizeFactName(f.fact, firstName),
          concept: f.concept,
        }));
        const { error } = await sb.from("mentor_memories").insert(rows);
        if (error && process.env.NODE_ENV !== "production") {
          console.error("[extract] supabase insert error:", error.message);
        }
        if (!error) {
          
          
          const MILESTONE_CONCEPTS = new Set([
            "behaviour",
            "thesis",
            "direction",
            "risk management",
            "psychology",
            "discipline",
            "review",
          ]);
          const milestone = facts.find((f) =>
            MILESTONE_CONCEPTS.has(f.concept.toLowerCase()),
          );
          if (milestone) {
            await createNotification(userId, {
              kind: "mentor",
              title: "Jema noted a milestone",
              body: milestone.fact.slice(0, 200),
              href: "/mentor",
            });
          }
        }
      }
    }

    return NextResponse.json({ facts });
  } catch {
    return NextResponse.json({ facts: [] });
  }
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}

function parseSession(value: string | null): { token: string; userId: string } | null {
  if (!value) return null;
  const [token, userId] = value.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}
