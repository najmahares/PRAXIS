

export type ConceptLevel = "Strong" | "Developing" | "Needs practice";

export type ConceptSummary = {
  label: string;
  level: ConceptLevel;
  count: number;
};

export type DashboardActivity = {
  kind: "trade" | "practice" | "memory";
  title: string;
  subtitle: string;
  href: string;
  at: string;
};

export type DashboardPortfolio = {
  hasPortfolio: boolean;
  totalValueKsh: number;
  changeAbsKsh: number;
  changePct: number;
  startingBalanceKsh: number;
  cashKsh: number;
  cashPct: number;
  decisionCount: number;
  assetCount: number;
  topHolding: { ticker: string; name: string } | null;
  daysOld: number;
};

export type DashboardHolding = {
  ticker: string;
  name: string;
  sector: string | null;
  shares: number;
  currentValue: number;
  pnl: number;
  pnlPct: number | null;
};

export type WeeklyBar = {
  label: string;
  trades: number;
  practice: number;
  total: number;
};

export type SectorSlice = {
  sector: string;
  value: number;
  pct: number;
  color: string;
};

export type DashboardRecommendation = {
  title: string;
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minutes: number;
  href: string;
};

export type DashboardData = {
  firstName: string;
  portfolio: DashboardPortfolio;
  holdings: DashboardHolding[];
  sectors: SectorSlice[];
  weeklyBars: WeeklyBar[];
  concepts: ConceptSummary[];
  recentActivity: DashboardActivity[];
  recommendation: DashboardRecommendation | null;
  stats: {
    lessonsCompleted: number;
    totalLessons: number;
    practiceCompleted: number;
    practiceTotal: number;
    daysActive: number;
    streak: number;
  };
};
