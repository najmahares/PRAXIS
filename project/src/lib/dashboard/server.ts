import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAuthUserCached } from "@/lib/auth/userCache";
import { buildPortfolioView, getTrades } from "@/lib/practice/api";
import { getAllLevels, getLessonsForLevel } from "@/lib/curriculumApi";
import { PRACTICE_CARDS } from "@/lib/practice/cards";

export type {
  ConceptLevel,
  ConceptSummary,
  DashboardActivity,
  DashboardPortfolio,
  DashboardHolding,
  WeeklyBar,
  SectorSlice,
  DashboardRecommendation,
  DashboardData,
} from "./types";

import type {
  ConceptLevel,
  ConceptSummary,
  DashboardActivity,
  DashboardPortfolio,
  DashboardHolding,
  WeeklyBar,
  SectorSlice,
  DashboardRecommendation,
  DashboardData,
} from "./types";

const GAP_PATTERN =
  /(missed|confused|not sure|struggl|needs practice|didn'?t|unclear|gap|weak|struggled|unsure|difficulty)/i;
const SUCCESS_PATTERN =
  /(completed|passed|held|strong|understood|good call|got it|mastered|confident)/i;

const SECTOR_COLORS: Record<string, string> = {
  Cash: "#94a3b8",
  Telecommunications: "#2563eb",
  Banking: "#7c3aed",
  Energy: "#059669",
  "Consumer Goods": "#ea580c",
  Manufacturing: "#dc2626",
  Insurance: "#0891b2",
  Investment: "#db2777",
  Construction: "#ca8a04",
  Agriculture: "#16a34a",
  "Commercial Services": "#e11d48",
  Technology: "#4f46e5",
  "Real Estate": "#b45309",
  Automobiles: "#0369a1",
  "Exchange Traded Funds": "#9333ea",
};

const SECTOR_FALLBACK = [
  "#2563eb", "#7c3aed", "#059669", "#ea580c",
  "#dc2626", "#0891b2", "#db2777", "#ca8a04",
  "#16a34a", "#e11d48",
];

function colorForSector(name: string, index: number): string {
  return SECTOR_COLORS[name] ?? SECTOR_FALLBACK[index % SECTOR_FALLBACK.length];
}

function deriveConcepts(memories: { fact: string; concept: string }[]): ConceptSummary[] {
  const byConcept = new Map<string, { gaps: number; successes: number }>();
  for (const m of memories) {
    const concept = (m.concept ?? "").trim().toLowerCase();
    if (!concept || concept === "practice" || concept === "general") continue;
    const entry = byConcept.get(concept) ?? { gaps: 0, successes: 0 };
    const fact = m.fact ?? "";
    if (GAP_PATTERN.test(fact)) entry.gaps += 1;
    else if (SUCCESS_PATTERN.test(fact)) entry.successes += 1;
    else entry.successes += 0.5;
    byConcept.set(concept, entry);
  }
  const out: ConceptSummary[] = [];
  for (const [concept, entry] of byConcept.entries()) {
    const total = entry.gaps + entry.successes;
    if (total < 0.5) continue;
    const score = entry.successes * 2 - entry.gaps * 3;
    const level: ConceptLevel =
      score >= 4 ? "Strong" : score >= -1 ? "Developing" : "Needs practice";
    out.push({ label: concept, level, count: Math.round(total) });
  }
  out.sort((a, b) => b.count - a.count);
  return out.slice(0, 6);
}

function firstNameFrom(name: string): string {
  const t = name.trim();
  if (!t) return "there";
  return t.split(/\s+/)[0];
}

function computeWeeklyBars(
  trades: { executed_at: string }[],
  completions: { completed_at: string }[]
): WeeklyBar[] {
  const now = new Date();
  const dow = now.getDay();
  const mondayOffset = dow === 0 ? 6 : dow - 1;
  const currentMonday = new Date(now);
  currentMonday.setDate(now.getDate() - mondayOffset);
  currentMonday.setHours(0, 0, 0, 0);

  const bars: WeeklyBar[] = [];
  for (let i = 7; i >= 0; i--) {
    const start = new Date(currentMonday);
    start.setDate(currentMonday.getDate() - i * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const label = start.toLocaleDateString("en-KE", { day: "numeric", month: "short" });
    bars.push({ label, trades: 0, practice: 0, total: 0 });
  }

  function bump(dateIso: string, field: "trades" | "practice") {
    const d = new Date(dateIso).getTime();
    for (let i = 0; i < bars.length; i++) {
      const offset = bars.length - 1 - i;
      const start = new Date(currentMonday);
      start.setDate(currentMonday.getDate() - offset * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      if (d >= start.getTime() && d < end.getTime()) {
        bars[i][field] += 1;
        bars[i].total += 1;
        return;
      }
    }
  }

  for (const t of trades) bump(t.executed_at, "trades");
  for (const c of completions) bump(c.completed_at, "practice");

  return bars;
}

function computeSectors(
  holdings: DashboardHolding[],
  cash: number
): SectorSlice[] {
  const map = new Map<string, number>();
  for (const h of holdings) {
    const key = h.sector ?? "Unclassified";
    map.set(key, (map.get(key) ?? 0) + h.currentValue);
  }
  if (cash > 0) map.set("Cash", cash);

  const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
  return [...map.entries()]
    .map(([sector, value], i) => ({
      sector,
      value,
      pct: (value / total) * 100,
      color: colorForSector(sector, i),
    }))
    .sort((a, b) => b.value - a.value);
}

function computeStreak(
  trades: { executed_at: string }[],
  completions: { completed_at: string }[]
): number {
  const days = new Set<string>();
  for (const t of trades) days.add(t.executed_at.slice(0, 10));
  for (const c of completions) days.add(c.completed_at.slice(0, 10));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak += 1;
    } else if (i === 0) {
      continue; 
    } else {
      break;
    }
  }
  return streak;
}

function computeDaysActive(
  trades: { executed_at: string }[],
  completions: { completed_at: string }[]
): number {
  const days = new Set<string>();
  for (const t of trades) days.add(t.executed_at.slice(0, 10));
  for (const c of completions) days.add(c.completed_at.slice(0, 10));
  return days.size;
}

export async function getDashboardData(
  userId: string,
  userName: string
): Promise<DashboardData> {
  const sb = getSupabaseAdmin();

  const [portfolio, trades, memoriesRes, completionsRes] = await Promise.all([
    buildPortfolioView(userId).catch(() => null),
    getTrades(userId).catch(() => []),
    sb
      ? sb
          .from("mentor_memories")
          .select("fact, concept, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(100)
      : Promise.resolve({ data: [], error: null } as { data: unknown[]; error: null }),
    sb
      ? sb
          .from("practice_completed")
          .select("card_id, card_type, passed, completed_at")
          .eq("user_id", userId)
          .order("completed_at", { ascending: false })
          .limit(100)
      : Promise.resolve({ data: [], error: null } as { data: unknown[]; error: null }),
  ]);

  const memories = (memoriesRes.data ?? []) as Array<{
    fact: string;
    concept: string;
    created_at: string;
  }>;
  const completions = (completionsRes.data ?? []) as Array<{
    card_id: string;
    card_type: string;
    passed: boolean;
    completed_at: string;
  }>;

  
  let portfolioData: DashboardPortfolio = {
    hasPortfolio: false,
    totalValueKsh: 0,
    changeAbsKsh: 0,
    changePct: 0,
    startingBalanceKsh: 0,
    cashKsh: 0,
    cashPct: 0,
    decisionCount: 0,
    assetCount: 0,
    topHolding: null,
    daysOld: 0,
  };

  let holdings: DashboardHolding[] = [];

  if (portfolio) {
    const top = portfolio.holdings[0];
    portfolioData = {
      hasPortfolio: true,
      totalValueKsh: portfolio.totalValue,
      changeAbsKsh: portfolio.totalPnl,
      changePct: portfolio.totalPnlPct,
      startingBalanceKsh: portfolio.portfolio.starting_capital,
      cashKsh: portfolio.portfolio.cash,
      cashPct: portfolio.cashPct,
      decisionCount: trades.length,
      assetCount: portfolio.holdings.length,
      topHolding: top ? { ticker: top.ticker, name: top.name ?? top.ticker } : null,
      daysOld: portfolio.daysOld,
    };
    holdings = portfolio.holdings.map((h) => ({
      ticker: h.ticker,
      name: h.name ?? h.ticker,
      sector: h.sector,
      shares: h.shares,
      currentValue: h.currentValue ?? 0,
      pnl: h.unrealizedPnl ?? 0,
      pnlPct: h.unrealizedPnlPct,
    }));
  }

  const sectors = computeSectors(holdings, portfolioData.cashKsh);
  const weeklyBars = computeWeeklyBars(trades, completions);
  const streak = computeStreak(trades, completions);
  const daysActive = computeDaysActive(trades, completions);

  const concepts = deriveConcepts(
    memories.map((m) => ({ fact: m.fact, concept: m.concept }))
  );

  const activity: DashboardActivity[] = [];
  for (const c of completions.slice(0, 5)) {
    activity.push({
      kind: "practice",
      title: c.passed ? "Passed a practice card" : "Reviewed a practice card",
      subtitle: c.card_id.startsWith("L") ? c.card_id.split("-")[0] : c.card_id,
      href: "/practice/" + c.card_id,
      at: c.completed_at,
    });
  }
  for (const t of trades.slice(0, 5)) {
    activity.push({
      kind: "trade",
      title: (t.side === "buy" ? "Bought " : "Sold ") + t.shares + " " + t.ticker,
      subtitle: "at KSh " + t.price.toFixed(2),
      href: "/portfolio",
      at: t.executed_at,
    });
  }
  activity.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  const completedIds = new Set(completions.map((c) => c.card_id));
  const nextCard = PRACTICE_CARDS.find((c) => !completedIds.has(c.id));
  const recommendation: DashboardRecommendation | null = nextCard
    ? {
        title: nextCard.title,
        topic: "Level " + nextCard.level + " · " + nextCard.type,
        difficulty:
          nextCard.level <= 3
            ? "Beginner"
            : nextCard.level <= 9
              ? "Intermediate"
              : "Advanced",
        minutes: 6,
        href: "/practice/" + nextCard.id,
      }
    : null;

  const levels = getAllLevels();
  const totalLessons = levels.reduce(
    (sum, l) => sum + getLessonsForLevel(l.id).length,
    0
  );

  return {
    firstName: firstNameFrom(userName),
    portfolio: portfolioData,
    holdings: holdings.sort((a, b) => b.currentValue - a.currentValue),
    sectors,
    weeklyBars,
    concepts,
    recentActivity: activity.slice(0, 6),
    recommendation,
    stats: {
      lessonsCompleted: 0,
      totalLessons,
      practiceCompleted: completions.length,
      practiceTotal: PRACTICE_CARDS.length,
      daysActive,
      streak,
    },
  };
}
