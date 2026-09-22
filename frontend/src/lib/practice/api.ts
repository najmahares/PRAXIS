import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getKenyaStocks, getLiveQuote } from "@/lib/market/mcp";
import { deriveHoldings, computeTotals } from "./math";
import { buildPortfolioSummaryForJema } from "./summary";
import type {
  PortfolioRow,
  TradeRow,
  PortfolioView,
  Holding,
} from "./types";

export async function getPortfolio(userId: string): Promise<PortfolioRow | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb
    .from("practice_portfolios")
    .select("id, user_id, starting_capital, cash, created_at, reset_count")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return data as PortfolioRow;
}

export async function getTrades(userId: string): Promise<TradeRow[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("practice_trades")
    .select("id, user_id, portfolio_id, ticker, side, shares, price, total, reason, executed_at")
    .eq("user_id", userId)
    .order("executed_at", { ascending: false })
    .limit(500);
  if (error || !data) return [];
  return data as TradeRow[];
}

export async function buildPortfolioView(userId: string): Promise<PortfolioView | null> {
  const portfolio = await getPortfolio(userId);
  if (!portfolio) return null;
  const trades = await getTrades(userId);

  const liveStocks = await getKenyaStocks().catch(() => []);
  const prices = new Map<string, number>();
  const names = new Map<string, string>();
  const sectors = new Map<string, string>();
  for (const s of liveStocks) {
    prices.set(s.ticker, s.priceKsh);
    names.set(s.ticker, s.name);
    if (s.sector) sectors.set(s.ticker, s.sector);
  }

  const holdings: Holding[] = deriveHoldings(
    trades,
    prices,
    names,
    sectors,
    portfolio.cash
  );
  const totals = computeTotals(portfolio, holdings);
  const view: PortfolioView = {
    portfolio,
    holdings: holdings.sort(
      (a, b) => (b.currentValue ?? 0) - (a.currentValue ?? 0)
    ),
    trades,
    ...totals,
    summaryForJema: "",
  };
  view.summaryForJema = buildPortfolioSummaryForJema(view);
  return view;
}

export async function getCurrentPrice(ticker: string): Promise<number | null> {
  const quote = await getLiveQuote(ticker).catch(() => null);
  return quote?.priceKsh ?? null;
}

export async function writeMemory(
  userId: string,
  fact: string,
  concept: string
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb.from("mentor_memories").insert({ user_id: userId, fact, concept });
}
