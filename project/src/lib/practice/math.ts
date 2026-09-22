import type { Holding, PortfolioRow, TradeRow } from "./types";

export function deriveHoldings(
  trades: TradeRow[],
  livePrices: Map<string, number>,
  liveNames: Map<string, string>,
  liveSectors: Map<string, string>,
  currentCash: number
): Holding[] {
  type Acc = {
    ticker: string;
    shares: number;
    totalCost: number;
    firstBoughtAt: string;
    lastTradeAt: string;
    lastReason: string | null;
  };
  const accs = new Map<string, Acc>();

  const sorted = [...trades].sort(
    (a, b) => new Date(a.executed_at).getTime() - new Date(b.executed_at).getTime()
  );

  for (const t of sorted) {
    const existing = accs.get(t.ticker);
    const acc: Acc = existing ?? {
      ticker: t.ticker,
      shares: 0,
      totalCost: 0,
      firstBoughtAt: t.executed_at,
      lastTradeAt: t.executed_at,
      lastReason: t.reason ?? null,
    };

    if (t.side === "buy") {
      acc.shares += t.shares;
      acc.totalCost += t.total;
    } else {
      const avgCost = acc.shares > 0 ? acc.totalCost / acc.shares : 0;
      const soldCost = avgCost * t.shares;
      acc.shares -= t.shares;
      acc.totalCost -= soldCost;
      if (acc.shares <= 0.0001) {
        acc.shares = 0;
        acc.totalCost = 0;
      }
    }
    acc.lastTradeAt = t.executed_at;
    if (t.reason) acc.lastReason = t.reason;
    accs.set(t.ticker, acc);
  }

  const open = [...accs.values()].filter((a) => a.shares > 0.0001);

  const valued = open.map((a) => {
    const price = livePrices.get(a.ticker) ?? null;
    const value = price === null ? null : price * a.shares;
    return { acc: a, price, value };
  });

  const equityValue = valued.reduce((sum, v) => sum + (v.value ?? 0), 0);
  const totalPortfolioValue = equityValue + currentCash;
  const now = Date.now();

  return valued.map(({ acc, price, value }) => {
    const averageCost = acc.shares > 0 ? acc.totalCost / acc.shares : 0;
    const pnl = value === null ? null : value - acc.totalCost;
    const pnlPct =
      value === null || acc.totalCost === 0 ? null : (pnl! / acc.totalCost) * 100;
    const portfolioPct =
      value === null || totalPortfolioValue === 0
        ? null
        : (value / totalPortfolioValue) * 100;
    const daysHeld = Math.max(
      0,
      Math.floor((now - new Date(acc.firstBoughtAt).getTime()) / (1000 * 60 * 60 * 24))
    );

    return {
      ticker: acc.ticker,
      name: liveNames.get(acc.ticker) ?? null,
      sector: liveSectors.get(acc.ticker) ?? null,
      shares: acc.shares,
      averageCost,
      totalCost: acc.totalCost,
      currentPrice: price,
      currentValue: value,
      unrealizedPnl: pnl,
      unrealizedPnlPct: pnlPct,
      portfolioPct,
      daysHeld,
      firstBoughtAt: acc.firstBoughtAt,
      lastTradeAt: acc.lastTradeAt,
      lastReason: acc.lastReason,
    } satisfies Holding;
  });
}

export function computeTotals(portfolio: PortfolioRow, holdings: Holding[]) {
  const totalInvested = holdings.reduce((s, h) => s + (h.currentValue ?? 0), 0);
  const totalCostBasis = holdings.reduce((s, h) => s + h.totalCost, 0);
  const totalValue = portfolio.cash + totalInvested;
  const totalPnl = totalValue - portfolio.starting_capital;
  const totalPnlPct =
    portfolio.starting_capital === 0
      ? 0
      : (totalPnl / portfolio.starting_capital) * 100;
  const cashPct = totalValue === 0 ? 0 : (portfolio.cash / totalValue) * 100;
  const daysOld = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(portfolio.created_at).getTime()) / (1000 * 60 * 60 * 24)
    )
  );
  return {
    totalValue,
    totalInvested,
    totalCostBasis,
    totalPnl,
    totalPnlPct,
    cashPct,
    daysOld,
    tradeCount: holdings.length,
  };
}

export function formatKsh(n: number): string {
  return "KSh " + Math.round(n).toLocaleString("en-KE");
}

export function formatPct(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return sign + n.toFixed(2) + "%";
}
