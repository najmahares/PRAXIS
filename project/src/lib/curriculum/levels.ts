import type { Level, LevelTier } from "./types";

export const LEVELS: Level[] = [
  
  {
    id: 0,
    tier: "foundations",
    title: "Foundations",
    goal: "Understand what a company is, what a share represents, and why markets exist.",
    prerequisite: "None",
  },
  {
    id: 1,
    tier: "foundations",
    title: "Market Mechanics",
    goal: "Understand how orders are placed, matched, and settled.",
    prerequisite: "Level 0",
  },
  {
    id: 2,
    tier: "foundations",
    title: "Company Analysis",
    goal: "Read an income statement, a balance sheet, and a cash flow statement.",
    prerequisite: "Level 1",
  },
  {
    id: 3,
    tier: "foundations",
    title: "Valuation",
    goal: "Compare a share price to a company's financial performance.",
    prerequisite: "Level 2",
  },
  {
    id: 4,
    tier: "foundations",
    title: "Risk and Return",
    goal: "Understand the tradeoff between higher potential return and higher risk.",
    prerequisite: "Level 3",
  },
  {
    id: 5,
    tier: "foundations",
    title: "Portfolio Construction",
    goal: "Build a portfolio that reduces risk without sacrificing return.",
    prerequisite: "Level 4",
  },
  {
    id: 6,
    tier: "foundations",
    title: "Reading Charts",
    goal: "Read a price chart and understand what it tells you about the past.",
    prerequisite: "Level 5",
  },
  {
    id: 7,
    tier: "foundations",
    title: "Economic Environment",
    goal: "Understand how interest rates, inflation, and growth affect markets.",
    prerequisite: "Level 6",
  },

  
  {
    id: 8,
    tier: "asset-deep-dives",
    title: "Stocks Deep Dive",
    goal: "Multiples, styles, dividends, capital actions, and screening. For equity investors who want to go deeper.",
    prerequisite: "Level 7",
  },
  {
    id: 9,
    tier: "asset-deep-dives",
    title: "Bonds Deep Dive",
    goal: "Yield curves, duration, credit, and the strategies that sit behind fixed income.",
    prerequisite: "Level 7",
  },
  {
    id: 10,
    tier: "asset-deep-dives",
    title: "Funds and ETFs",
    goal: "Mutual funds, ETFs, expense ratios, tracking error, and how to pick a fund.",
    prerequisite: "Level 7",
  },
  {
    id: 11,
    tier: "asset-deep-dives",
    title: "FX and Currency",
    goal: "Exchange rates, major pairs, leverage, and currency as a trade or a hedge.",
    prerequisite: "Level 7",
  },
  {
    id: 12,
    tier: "asset-deep-dives",
    title: "Commodities and Alternatives",
    goal: "Gold, energy, agriculture, real estate, private markets, and an honest look at crypto.",
    prerequisite: "Level 7",
  },

  
  {
    id: 13,
    tier: "universal-skills",
    title: "Investor Direction",
    goal: "Name what kind of investor you are, and understand what that implies for everything else.",
    prerequisite: "Level 7",
  },
  {
    id: 14,
    tier: "universal-skills",
    title: "Building a Thesis",
    goal: "Research a company, form a view, size a position, and know when to exit.",
    prerequisite: "Level 7",
  },
  {
    id: 15,
    tier: "universal-skills",
    title: "Investor Psychology",
    goal: "Recognise the biases that lead investors to make poor decisions, and build habits that counter them.",
    prerequisite: "Level 7",
  },
  {
    id: 16,
    tier: "universal-skills",
    title: "Investor Best Practices",
    goal: "Turn investing into a habit: records, tax, contributions, reviews, and when to get help.",
    prerequisite: "Level 7",
  },
  {
    id: 17,
    tier: "universal-skills",
    title: "International Investing",
    goal: "Invest beyond the NSE. Access routes, currency risk, tax, and common pitfalls for Kenyans.",
    prerequisite: "Level 7",
  },
];

export const TIER_META: {
  key: LevelTier;
  label: string;
  description: string;
  layout: "path" | "grid";
}[] = [
  {
    key: "foundations",
    label: "Foundations",
    description:
      "Eight levels every learner takes, in order. Read a company, value it, understand risk, and see the economy.",
    layout: "path",
  },
  {
    key: "asset-deep-dives",
    label: "Asset Deep Dives",
    description:
      "Pick the asset classes you want to go deep on. Nothing here is sequential. Start with whatever interests you.",
    layout: "grid",
  },
  {
    key: "universal-skills",
    label: "Universal Skills",
    description:
      "The skills that matter regardless of what you invest in, plus how to invest beyond Kenya.",
    layout: "grid",
  },
];

export const FOUNDATIONS_COMPLETE_LEVEL = 7;
