import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  buildPortfolioView,
  getPortfolio,
  getTrades,
  getCurrentPrice,
  writeMemory,
} from "@/lib/practice/api";
import { formatKsh } from "@/lib/practice/math";

export const runtime = "nodejs";

type Body = {
  ticker?: string;
  side?: "buy" | "sell";
  shares?: number;
  reason?: string;
};

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

  const ticker = typeof body.ticker === "string" ? body.ticker.toUpperCase().trim() : "";
  const side = body.side === "buy" || body.side === "sell" ? body.side : null;
  const shares = typeof body.shares === "number" ? body.shares : NaN;
  const reason = typeof body.reason === "string" ? body.reason.slice(0, 300).trim() : null;

  if (!ticker || !side || !Number.isFinite(shares) || shares <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });
  }

  const portfolio = await getPortfolio(userId);
  if (!portfolio) {
    return NextResponse.json({ ok: false, error: "no_portfolio" }, { status: 404 });
  }

  const price = await getCurrentPrice(ticker);
  if (price === null || price <= 0) {
    return NextResponse.json({ ok: false, error: "no_quote" }, { status: 404 });
  }

  const total = Math.round(shares * price * 100) / 100;

  if (side === "buy") {
    if (total > portfolio.cash) {
      return NextResponse.json(
        { ok: false, error: "insufficient_cash", cash: portfolio.cash, needed: total },
        { status: 400 }
      );
    }

    const newCash = Math.round((portfolio.cash - total) * 100) / 100;

    
    const { data: updated, error: updErr } = await sb
      .from("practice_portfolios")
      .update({ cash: newCash })
      .eq("id", portfolio.id)
      .eq("cash", portfolio.cash)
      .select("id, cash")
      .maybeSingle();

    if (updErr || !updated) {
      return NextResponse.json({ ok: false, error: "concurrent_trade" }, { status: 409 });
    }

    const { error: insErr } = await sb.from("practice_trades").insert({
      user_id: userId,
      portfolio_id: portfolio.id,
      ticker,
      side: "buy",
      shares,
      price,
      total,
      reason,
    });

    if (insErr) {
      
      await sb
        .from("practice_portfolios")
        .update({ cash: portfolio.cash })
        .eq("id", portfolio.id);
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
    }

    
    const trades = await getTrades(userId);
    if (trades.length === 1) {
      await writeMemory(
        userId,
        "Made the first practice trade: bought " + shares + " " + ticker + " at " + formatKsh(price) + (reason ? " because: " + reason : ""),
        "practice"
      );
    }
    if (trades.length === 10) {
      const days = Math.floor(
        (Date.now() - new Date(portfolio.created_at).getTime()) / (1000 * 60 * 60 * 24)
      );
      await writeMemory(
        userId,
        "Made 10 trades in " + days + " days, first behaviour pattern emerging",
        "behaviour"
      );
    }
  } else {
    
    const existing = await getTrades(userId);
    
    let owned = 0;
    for (const t of [...existing].sort(
      (a, b) => new Date(a.executed_at).getTime() - new Date(b.executed_at).getTime()
    )) {
      if (t.ticker !== ticker) continue;
      owned += t.side === "buy" ? t.shares : -t.shares;
    }
    if (shares > owned + 0.0001) {
      return NextResponse.json(
        { ok: false, error: "insufficient_shares", owned },
        { status: 400 }
      );
    }

    
    let totalCost = 0;
    let shareCount = 0;
    for (const t of [...existing].sort(
      (a, b) => new Date(a.executed_at).getTime() - new Date(b.executed_at).getTime()
    )) {
      if (t.ticker !== ticker) continue;
      if (t.side === "buy") {
        shareCount += t.shares;
        totalCost += t.total;
      } else {
        const avg = shareCount > 0 ? totalCost / shareCount : 0;
        shareCount -= t.shares;
        totalCost -= avg * t.shares;
      }
    }
    const avgCost = shareCount > 0 ? totalCost / shareCount : 0;
    const realizedPnlPct = avgCost > 0 ? ((price - avgCost) / avgCost) * 100 : 0;

    const newCash = Math.round((portfolio.cash + total) * 100) / 100;

    const { data: updated, error: updErr } = await sb
      .from("practice_portfolios")
      .update({ cash: newCash })
      .eq("id", portfolio.id)
      .eq("cash", portfolio.cash)
      .select("id, cash")
      .maybeSingle();

    if (updErr || !updated) {
      return NextResponse.json({ ok: false, error: "concurrent_trade" }, { status: 409 });
    }

    const { error: insErr } = await sb.from("practice_trades").insert({
      user_id: userId,
      portfolio_id: portfolio.id,
      ticker,
      side: "sell",
      shares,
      price,
      total,
      reason,
    });

    if (insErr) {
      await sb
        .from("practice_portfolios")
        .update({ cash: portfolio.cash })
        .eq("id", portfolio.id);
      return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 });
    }

    if (realizedPnlPct < 0) {
      await writeMemory(
        userId,
        "Sold " + ticker + " at a loss of " + realizedPnlPct.toFixed(1) + "%" + (reason ? ", reason: " + reason : ""),
        "behaviour"
      );
    } else if (realizedPnlPct > 0) {
      await writeMemory(
        userId,
        "Sold " + ticker + " at a gain of " + realizedPnlPct.toFixed(1) + "%" + (reason ? ", reason: " + reason : ""),
        "behaviour"
      );
    }
  }

  const view = await buildPortfolioView(userId);
  return NextResponse.json({ ok: true, view });
}
