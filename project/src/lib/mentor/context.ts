"use client";

import type { ConceptSignal, MentorContext } from "./types";

function getPageLabel(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Home";
  if (pathname.startsWith("/learning")) return "My Learning";
  if (pathname.startsWith("/practice")) return "Practice Library";
  if (pathname.startsWith("/market")) return "Market";
  if (pathname.startsWith("/portfolio")) return "Portfolio";
  if (pathname.startsWith("/progress")) return "Progress";
  if (pathname.startsWith("/bookmarks")) return "Bookmarks";
  if (pathname.startsWith("/community")) return "Community";
  if (pathname.startsWith("/mentor")) return "Mentor";
  if (pathname.startsWith("/settings")) return "Settings";
  return "PRAXIS";
}



let practiceSummaryCache: string | null = null;

export function registerPracticeSummary(summary: string | null): void {
  practiceSummaryCache = summary;
}

function detectScenario(pathname: string): string | undefined {
  if (pathname.startsWith("/practice/group/")) return "an active practice set";
  if (pathname.startsWith("/practice/")) return "a practice card";
  return undefined;
}

export function buildMentorContext(): MentorContext {
  if (typeof window === "undefined") return {};
  const pathname = window.location.pathname;

  const context: MentorContext = {
    page: getPageLabel(pathname),
  };

  if (
    (pathname.startsWith("/portfolio") || pathname.startsWith("/practice")) &&
    practiceSummaryCache
  ) {
    context.portfolioSummary = practiceSummaryCache;
  }

  const scenario = detectScenario(pathname);
  if (scenario) context.scenario = scenario;

  return context;
}



export function getConceptSignals(): ConceptSignal[] {
  return [];
}
