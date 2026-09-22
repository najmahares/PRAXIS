import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-120b";

const LEVEL_TITLES: Record<number, string> = {
  0: "Foundations, what a company is, what a share is, how prices form",
  1: "Market Mechanics, orders, spread, liquidity, settlement, indices",
  2: "Company Analysis, revenue, profit, EPS, balance sheet, cash flow, dividends",
  3: "Valuation, market cap, P/E, P/B, peer comparison",
  4: "Risk and Return, risk vs volatility, tolerance, time horizon",
  5: "Portfolio Construction, asset classes, diversification, allocation, rebalancing",
  6: "Price Charts, candles, trends, support/resistance, moving averages",
  7: "Macro, interest rates, inflation, GDP, exchange rates, recessions, shocks",
  8: "Stocks Deep Dive, rights, multiples, growth vs value, dividends, splits",
  9: "Bonds Deep Dive, yield, duration, credit, strategies, funds",
  10: "Funds and ETFs, mutual funds, ETFs, expense ratios, tracking error, active vs passive",
  11: "FX and Currency, majors, central bank policy, leverage, hedging",
  12: "Commodities and Alternatives, gold, oil, agriculture, REITs, crypto",
  13: "Investor Direction, goals, horizon, capacity, tolerance, written direction",
  14: "Building a Thesis, catalyst, risks, conviction, exit, one-page thesis",
  15: "Investor Psychology, biases, loss aversion, FOMO, scams, counter-measures",
  16: "Investor Best Practices, tax, records, automation, reviews, IPS",
  17: "International Investing, access routes, currency risk, DTAs, global ETFs",
};

type GenRequest = {
  level?: number;
  type?: "scenario" | "drill" | "mission";
  count?: number;
  mode?: "generate" | "replace";
  difficulty?: "easy" | "medium" | "hard";
};

function buildPrompt(level: number, type: string, count: number, difficulty: "easy" | "medium" | "hard"): string {
  const levelTitle = LEVEL_TITLES[level] ?? "Level " + level;
  const difficultyDirective =
    difficulty === "easy"
      ? "Difficulty: EASY. Use very simple setups, one concept per card, obvious choices. Assume the learner is new. "
      : difficulty === "hard"
      ? "Difficulty: HARD. Use multi-step reasoning, subtler trade-offs, and edge cases. Expect the learner to already know the basics. "
      : "Difficulty: MEDIUM. Standard difficulty. Some reasoning required, but each card tests one clear idea. ";
  const baseContext =
    difficultyDirective +
    "You are writing practice cards for PRAXIS, a Kenyan financial education app. " +
    "The learner is a beginner using virtual money. " +
    "Level " + level + ": " + levelTitle + ". " +
    "Use Kenyan context: NSE tickers (SCOM, EQTY, KCB, ABSA, EABL, BAMB, COOP, NCBA), " +
    "KSh amounts, CBK rates, CMA rules. No US context. No made-up numbers. " +
    "If you cite a specific price or ratio, use realistic Kenyan values. " +
    "Return JSON only, no prose, no markdown fences. Shape: { \"cards\": [...] }. Field values must be plain prose with no markdown characters. ";

  if (type === "scenario") {
    return (
      baseContext +
      "Generate " + count + " scenarios. Each scenario: " +
      "{ \"title\": short, \"brief\": 1-2 sentence situation, \"prompt\": question, " +
      "\"choices\": [ { \"id\": \"a\", \"label\": short, \"feedback\": 1-2 sentences, \"best\": true|false } ] }. " +
      "Exactly 3 choices per scenario. Exactly one has best=true. " +
      "Feedback must teach, not just praise or scold. " +
      "Situations must be decision points a beginner actually faces."
    );
  }
  if (type === "drill") {
    return (
      baseContext +
      "Generate " + count + " drills. Each drill: " +
      "{ \"title\": short, \"brief\": 1 sentence telling them what to open, " +
      "\"prompt\": the analytical question, \"framework\": [ 3 short bullets naming what a good answer addresses ] }. " +
      "Briefs may reference Market (e.g. \"Open Market. Look at ...\"). " +
      "Prompts must be answerable in 2-3 sentences, not research essays."
    );
  }
  return (
    baseContext +
    "Generate " + count + " missions. Each mission: " +
    "{ \"title\": short, \"brief\": 1 sentence on why this matters, " +
    "\"prompt\": the goal, " +
    "\"steps\": [ 3 to 5 short numbered steps the learner follows inside the PRAXIS app. " +
    "Each step must name a real UI action: Open Market, Open Portfolio, click New trade, select a ticker, enter a share count, confirm buy, or write in the Why field. " +
    "Do NOT use vague verbs like consider, think about, review. Only concrete clicks. ], " +
    "\"verify\": { \"kind\": one of [\"first_trade\",\"holdings_count\",\"sector_count\",\"ticker_held\",\"any_dividend_stock\",\"cash_pct\"], " +
    "and either \"min\" (number) or \"min\"/\"max\" for cash_pct, or \"ticker\" for ticker_held } }. " +
    "Missions must be verifiable from portfolio state. No ambiguous goals."
  );
}

function extractJson(text: string): unknown {
  try { return JSON.parse(text); } catch {  }
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) return null;
  try { return JSON.parse(text.slice(start, end + 1)); } catch { return null; }
}

function randomId(level: number, type: string): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const ts = Date.now().toString(36).slice(-4);
  return "gen-" + level + "-" + type + "-" + rand + ts;
}

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: GenRequest;
  try {
    body = (await request.json()) as GenRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const level = typeof body.level === "number" ? body.level : NaN;
  const type = body.type === "scenario" || body.type === "drill" || body.type === "mission" ? body.type : null;
  const count = Math.min(Math.max(body.count ?? 5, 1), 10);
  const mode = body.mode === "replace" ? "replace" : "generate";

  if (!Number.isFinite(level) || !type) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ ok: false, error: "no_provider" }, { status: 503 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });
  }

  const difficultyValue: "easy" | "medium" | "hard" = body.difficulty === "easy" || body.difficulty === "hard" ? body.difficulty : "medium";
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + groqKey,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: buildPrompt(level, type, count, difficultyValue) },
        { role: "user", content: "Generate now." },
      ],
      response_format: { type: "json_object" },
      temperature: 0.85,
      max_tokens: 3000,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json({ ok: false, error: "provider_error", detail: text.slice(0, 200) }, { status: 502 });
  }

  const payload = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const raw = payload.choices?.[0]?.message?.content ?? "";
  const parsed = extractJson(raw) as { cards?: unknown[] } | null;
  const rawCards = Array.isArray(parsed?.cards) ? parsed!.cards! : [];
  if (rawCards.length === 0) {
    return NextResponse.json({ ok: false, error: "empty_generation" }, { status: 502 });
  }

  
  if (mode === "replace") {
    await sb.from("practice_generated_cards")
      .delete()
      .eq("user_id", userId)
      .eq("level", level)
      .eq("card_type", type);
  }

  const rows: Array<{ id: string; user_id: string; level: number; card_type: string; payload: Record<string, unknown> }> = [];

  for (const raw of rawCards) {
    if (!raw || typeof raw !== "object") continue;
    const card = raw as Record<string, unknown>;
    const id = randomId(level, type);
    const normalised: Record<string, unknown> = {
      id,
      level,
      type,
      title: typeof card.title === "string" ? card.title.slice(0, 120) : "Untitled",
      brief: typeof card.brief === "string" ? card.brief.slice(0, 500) : "",
      prompt: typeof card.prompt === "string" ? card.prompt.slice(0, 400) : "",
      linkedLessonId: "",
      linkedLessonLabel: "",
      generated: true,
    };
    if (type === "scenario" && Array.isArray(card.choices)) {
      normalised.choices = (card.choices as Array<Record<string, unknown>>).slice(0, 5).map((ch, i) => ({
        id: typeof ch.id === "string" ? ch.id : String.fromCharCode(97 + i),
        label: typeof ch.label === "string" ? ch.label.slice(0, 200) : "",
        feedback: typeof ch.feedback === "string" ? ch.feedback.slice(0, 400) : "",
        best: Boolean(ch.best),
      }));
    }
    if (type === "drill" && Array.isArray(card.framework)) {
      normalised.framework = (card.framework as unknown[]).slice(0, 5).map((f) => String(f).slice(0, 150));
    }
    if (type === "mission") {
      
      if (Array.isArray(card.steps)) {
        const cleanedSteps = (card.steps as unknown[])
          .map((s) => (typeof s === "string" ? s.trim() : ""))
          .filter((s) => s.length > 0)
          .slice(0, 6);
        if (cleanedSteps.length > 0) {
          normalised.steps = cleanedSteps;
        }
      }
      
      if (card.verify && typeof card.verify === "object") {
        const v = card.verify as Record<string, unknown>;
        const kind = String(v.kind ?? "");
        const allowed = ["first_trade", "holdings_count", "sector_count", "ticker_held", "any_dividend_stock", "cash_pct"];
        if (allowed.includes(kind)) {
          const verify: Record<string, unknown> = { kind };
          if (typeof v.min === "number") verify.min = v.min;
          if (typeof v.max === "number") verify.max = v.max;
          if (typeof v.ticker === "string") verify.ticker = v.ticker.toUpperCase().slice(0, 10);
          normalised.verify = verify;
        }
      }
    }
    rows.push({ id, user_id: userId, level, card_type: type, payload: normalised });
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: false, error: "nothing_valid" }, { status: 502 });
  }

  const { error } = await sb.from("practice_generated_cards").insert(rows);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, generated: rows.length });
}
