export type CapitalChoice = {
  amount: number;
  label: string;
  blurb: string;
};

export const CAPITAL_CHOICES: CapitalChoice[] = [
  { amount: 10000, label: "Explorer", blurb: "Learn the mechanics with small positions." },
  { amount: 50000, label: "Starter", blurb: "A small real-feeling portfolio." },
  { amount: 100000, label: "Standard", blurb: "A good starting point for most learners." },
  { amount: 250000, label: "Serious", blurb: "Meaningful position sizes." },
  { amount: 500000, label: "Ambitious", blurb: "Full portfolio management." },
];

export type PortfolioRow = {
  id: string;
  user_id: string;
  starting_capital: number;
  cash: number;
  created_at: string;
  reset_count: number;
};

export type TradeRow = {
  id: string;
  user_id: string;
  portfolio_id: string;
  ticker: string;
  side: "buy" | "sell";
  shares: number;
  price: number;
  total: number;
  reason: string | null;
  executed_at: string;
};

export type Holding = {
  ticker: string;
  name: string | null;
  sector: string | null;
  shares: number;
  averageCost: number;
  totalCost: number;
  currentPrice: number | null;
  currentValue: number | null;
  unrealizedPnl: number | null;
  unrealizedPnlPct: number | null;
  portfolioPct: number | null;
  daysHeld: number;
  firstBoughtAt: string;
  lastTradeAt: string;
  lastReason: string | null;
};

export type PortfolioView = {
  portfolio: PortfolioRow;
  holdings: Holding[];
  trades: TradeRow[];
  totalValue: number;
  totalInvested: number;
  totalCostBasis: number;
  totalPnl: number;
  totalPnlPct: number;
  cashPct: number;
  daysOld: number;
  tradeCount: number;
  summaryForJema: string;
};
