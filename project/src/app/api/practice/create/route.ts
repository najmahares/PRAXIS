import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { CAPITAL_CHOICES } from "@/lib/practice/types";
import { getPortfolio, writeMemory, buildPortfolioView } from "@/lib/practice/api";
import { createNotification } from "@/lib/notifications/server";

export const runtime = "nodejs";

type Body = { startingCapital?: number };

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const amount = body.startingCapital;
  if (typeof amount !== "number" || !CAPITAL_CHOICES.some((c) => c.amount === amount)) {
    return NextResponse.json({ ok: false, error: "invalid_amount" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  
  const existing = await getPortfolio(userId);
  if (existing) {
    const view = await buildPortfolioView(userId);
    return NextResponse.json({ ok: true, view, existed: true });
  }

  const { error } = await sb.from("practice_portfolios").insert({
    user_id: userId,
    starting_capital: amount,
    cash: amount,
  });

  if (error) {
    
    if (error.code === "23505") {
      const view = await buildPortfolioView(userId);
      return NextResponse.json({ ok: true, view, existed: true });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  await writeMemory(
    userId,
    "Started a practice portfolio with KSh " + amount.toLocaleString("en-KE"),
    "practice"
  );

  await createNotification(userId, {
    kind: "practice",
    title: "Portfolio ready",
    body: "You have KSh " + amount.toLocaleString("en-KE") + " to practice with. Browse Market to make your first trade.",
    href: "/market",
  });
  const view = await buildPortfolioView(userId);
  return NextResponse.json({ ok: true, view });
}
