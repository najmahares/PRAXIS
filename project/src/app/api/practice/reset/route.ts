import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getPortfolio, writeMemory, buildPortfolioView } from "@/lib/practice/api";
import { formatKsh } from "@/lib/practice/math";
import { CAPITAL_CHOICES } from "@/lib/practice/types";

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
  const previousValue = existing ? formatKsh(existing.cash) : "empty";

  await sb.from("practice_trades").delete().eq("user_id", userId);
  await sb.from("practice_snapshots").delete().eq("user_id", userId);
  await sb.from("practice_portfolios").delete().eq("user_id", userId);

  const { error } = await sb.from("practice_portfolios").insert({
    user_id: userId,
    starting_capital: amount,
    cash: amount,
    reset_count: existing ? existing.reset_count + 1 : 0,
  });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  await writeMemory(
    userId,
    "Reset practice portfolio (was at " + previousValue + "). New starting capital: " + formatKsh(amount),
    "practice"
  );
  const view = await buildPortfolioView(userId);
  return NextResponse.json({ ok: true, view });
}
