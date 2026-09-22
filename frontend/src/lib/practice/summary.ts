import type { PortfolioView } from "./types";
import { formatKsh, formatPct } from "./math";

export function buildPortfolioSummaryForJema(view: PortfolioView): string {
  const { portfolio, holdings, totalValue, totalPnlPct, cashPct, daysOld } = view;

  const parts: string[] = [];
  parts.push(
    formatKsh(totalValue) +
      " (" +
      formatPct(totalPnlPct) +
      " since start of " +
      formatKsh(portfolio.starting_capital) +
      ")"
  );
  parts.push(
    "Cash " +
      cashPct.toFixed(1) +
      "% (" +
      formatKsh(portfolio.cash) +
      "), equities " +
      (100 - cashPct).toFixed(1) +
      "% across " +
      holdings.length +
      (holdings.length === 1 ? " position" : " positions")
  );
  parts.push("Portfolio is " + daysOld + (daysOld === 1 ? " day" : " days") + " old");

  if (holdings.length > 0) {
    const top = [...holdings].sort(
      (a, b) => (b.currentValue ?? 0) - (a.currentValue ?? 0)
    )[0];
    const topPct = top.portfolioPct;
    const topPnlPct = top.unrealizedPnlPct;
    if (topPct !== null) {
      const label = top.ticker + " (" + topPct.toFixed(0) + "% of portfolio";
      const ret = topPnlPct !== null ? ", " + formatPct(topPnlPct) + " return" : "";
      parts.push("Top holding: " + label + ret + ")");
    }
  }

  return parts.join(". ");
}
