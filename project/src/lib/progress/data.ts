import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { buildPortfolioView, getTrades } from "@/lib/practice/api";
import { getAllLevels, getLessonsForLevel } from "@/lib/curriculumApi";
import { PRACTICE_CARDS, type CardType } from "@/lib/practice/cards";



export type ConceptLevel = "Strong" | "Developing" | "Needs practice";

export type ConceptSignal = {
  concept: string;
  level: ConceptLevel;
  memoryCount: number;
  gapCount: number;
  score: number;
};

export type PracticeProgress = {
  scenariosCompleted: number;
  scenariosTotal: number;
  drillsCompleted: number;
  drillsTotal: number;
  missionsCompleted: number;
  missionsTotal: number;
  passedCount: number;
  reviewedCount: number;
};

export type PortfolioSnapshot = {
  hasPortfolio: boolean;
  totalValue: number;
  returnPct: number;
  returnAbs: number;
  startingCapital: number;
  positions: number;
  trades: number;
  daysOld: number;
};

export type Activity = {
  id: string;
  kind: "practice" | "trade" | "memory";
  title: string;
  detail?: string;
  href?: string;
  at: string;
};

export type ProgressSnapshot = {
  practice: PracticeProgress;
  portfolio: PortfolioSnapshot;
  signals: ConceptSignal[];
  activity: Activity[];
  
  totalLessons: number;
  totalPracticeCards: number;
  curriculum: {
    levelId: number;
    lessonIds: string[];
  }[];
};



const GAP_PATTERN =
  /(missed|confused|not sure|struggl|needs practice|didn'?t|unclear|gap|weak|struggled|unsure|difficulty)/i;
const SUCCESS_PATTERN =
  /(completed|passed|held|strong|understood|good call|got it|mastered|confident)/i;

function deriveSignals(
  memories: { id: string; fact: string; concept: string; createdAt: string }[]
): ConceptSignal[] {
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

  const signals: ConceptSignal[] = [];
  for (const [concept, entry] of byConcept.entries()) {
    const total = entry.gaps + entry.successes;
    
    
    const score = entry.successes * 2 - entry.gaps * 3;
    let level: ConceptLevel;
    if (total === 0) continue;
    if (score >= 4) level = "Strong";
    else if (score >= -1) level = "Developing";
    else level = "Needs practice";

    signals.push({
      concept,
      level,
      memoryCount: Math.round(total),
      gapCount: entry.gaps,
      score,
    });
  }

  
  signals.sort((a, b) => Math.abs(b.score) - Math.abs(a.score));
  return signals.slice(0, 12);
}



export async function getServerProgress(): Promise<ProgressSnapshot> {
  
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", {
    headers: { cookie: cookieHeader },
  });
  const userId = await getUserIdFromRequest(req);

  const sb = getSupabaseAdmin();

  
  const levels = getAllLevels();
  const curriculum: ProgressSnapshot["curriculum"] = levels.map((l) => ({
    levelId: l.id,
    lessonIds: getLessonsForLevel(l.id).map((lesson) => lesson.id),
  }));
  const totalLessons = curriculum.reduce((s, l) => s + l.lessonIds.length, 0);
  const totalPracticeCards = PRACTICE_CARDS.length;

  
  const cardTotals: Record<CardType, number> = {
    scenario: 0,
    drill: 0,
    mission: 0,
  };
  for (const c of PRACTICE_CARDS) cardTotals[c.type] += 1;

  
  const emptyPractice: PracticeProgress = {
    scenariosCompleted: 0,
    scenariosTotal: cardTotals.scenario,
    drillsCompleted: 0,
    drillsTotal: cardTotals.drill,
    missionsCompleted: 0,
    missionsTotal: cardTotals.mission,
    passedCount: 0,
    reviewedCount: 0,
  };

  const emptyPortfolio: PortfolioSnapshot = {
    hasPortfolio: false,
    totalValue: 0,
    returnPct: 0,
    returnAbs: 0,
    startingCapital: 0,
    positions: 0,
    trades: 0,
    daysOld: 0,
  };

  if (!userId || !sb) {
    return {
      practice: emptyPractice,
      portfolio: emptyPortfolio,
      signals: [],
      activity: [],
      totalLessons,
      totalPracticeCards,
      curriculum,
    };
  }

  
  const [completionsRes, memoriesRes, portfolioRes, tradesRes] =
    await Promise.all([
      sb
        .from("practice_completed")
        .select("card_id, card_type, passed, completed_at")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false }),
      sb
        .from("mentor_memories")
        .select("id, fact, concept, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(200),
      buildPortfolioView(userId).catch(() => null),
      getTrades(userId).catch(() => []),
    ]);

  
  const completions = (completionsRes.data ?? []) as Array<{
    card_id: string;
    card_type: CardType;
    passed: boolean;
    completed_at: string;
  }>;

  
  
  const seedIds = new Set(PRACTICE_CARDS.map((c) => c.id));
  const seedCompletions = completions.filter((c) => seedIds.has(c.card_id));

  const practice: PracticeProgress = {
    scenariosCompleted: seedCompletions.filter((c) => c.card_type === "scenario").length,
    scenariosTotal: cardTotals.scenario,
    drillsCompleted: seedCompletions.filter((c) => c.card_type === "drill").length,
    drillsTotal: cardTotals.drill,
    missionsCompleted: seedCompletions.filter((c) => c.card_type === "mission").length,
    missionsTotal: cardTotals.mission,
    passedCount: seedCompletions.filter((c) => c.passed).length,
    reviewedCount: seedCompletions.filter((c) => !c.passed).length,
  };

  
  const memories = (memoriesRes.data ?? []) as Array<{
    id: string;
    fact: string;
    concept: string;
    created_at: string;
  }>;
  const signals = deriveSignals(
    memories.map((m) => ({
      id: m.id,
      fact: m.fact,
      concept: m.concept,
      createdAt: m.created_at,
    }))
  );

  
  let portfolio: PortfolioSnapshot = emptyPortfolio;
  if (portfolioRes) {
    portfolio = {
      hasPortfolio: true,
      totalValue: portfolioRes.totalValue,
      returnPct: portfolioRes.totalPnlPct,
      returnAbs: portfolioRes.totalPnl,
      startingCapital: portfolioRes.portfolio.starting_capital,
      positions: portfolioRes.holdings.length,
      trades: tradesRes.length,
      daysOld: portfolioRes.daysOld,
    };
  }

  
  const activity: Activity[] = [];

  for (const c of seedCompletions.slice(0, 15)) {
    activity.push({
      id: "practice-" + c.card_id,
      kind: "practice",
      title: c.passed ? "Passed a practice card" : "Reviewed a practice card",
      detail: c.card_id.startsWith("L") ? c.card_id.split("-")[0] : undefined,
      href: "/practice/" + c.card_id,
      at: c.completed_at,
    });
  }

  for (const t of tradesRes.slice(0, 15)) {
    const verb = t.side === "buy" ? "Bought" : "Sold";
    activity.push({
      id: "trade-" + t.id,
      kind: "trade",
      title: verb + " " + t.shares + " " + t.ticker,
      detail: "at KSh " + t.price.toFixed(2),
      href: "/portfolio",
      at: t.executed_at,
    });
  }

  
  
  
  const DUPLICATE_PREFIXES = [
    "Completed a practice",
    "Started a practice portfolio",
    "Made the first practice trade",
    "Made 10 trades",
    "Reset practice portfolio",
    "Completed a practice scenario",
    "Completed a practice drill",
    "Completed a practice mission",
  ];

  for (const m of memories.slice(0, 40)) {
    const fact = m.fact ?? "";
    if (DUPLICATE_PREFIXES.some((prefix) => fact.startsWith(prefix))) continue;
    activity.push({
      id: "memory-" + m.id,
      kind: "memory",
      title: "Jema noted",
      detail: fact.slice(0, 100),
      at: m.created_at,
    });
  }

  activity.sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  );

  return {
    practice,
    portfolio,
    signals,
    activity: activity.slice(0, 20),
    totalLessons,
    totalPracticeCards,
    curriculum,
  };
}
