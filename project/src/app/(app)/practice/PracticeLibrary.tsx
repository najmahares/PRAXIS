"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PracticeCard, CardType } from "@/lib/practice/cards";
import { getProgress, isLevelLessonsDone } from "@/lib/curriculumProgress";
import "./practice.css";

const LEVEL_TITLES: Record<number, string> = {
  0: "Foundations",
  1: "Market Mechanics",
  2: "Company Analysis",
  3: "Valuation",
  4: "Risk and Return",
  5: "Portfolio Construction",
  6: "Price Charts",
  7: "Macro",
  8: "Stocks Deep Dive",
  9: "Bonds Deep Dive",
  10: "Funds and ETFs",
  11: "FX and Currency",
  12: "Commodities and Alternatives",
  13: "Investor Direction",
  14: "Building a Thesis",
  15: "Investor Psychology",
  16: "Investor Best Practices",
  17: "International Investing",
};

const TYPE_LABELS: Record<CardType, string> = {
  scenario: "Scenario",
  drill: "Drill",
  mission: "Mission",
};

const TYPE_TAGLINE: Record<CardType, string> = {
  scenario: "Decision points with pressure. Fail one and Jema writes the full answer.",
  drill: "Apply a framework to a real company. Submit your thinking, get coaching.",
  mission: "A goal in your actual portfolio, verified against what you own.",
};

export default function PracticeLibrary({
  cards,
  completedIds,
}: {
  cards: PracticeCard[];
  completedIds: string[];
}) {
  const done = new Set(completedIds);
  const [unlockedLevels, setUnlockedLevels] = useState<Set<number> | null>(null);

  useEffect(() => {
    const progress = getProgress();
    const allLevels = new Set<number>();
    for (const c of cards) allLevels.add(c.level);
    const unlocked = new Set<number>();
    for (const lvl of allLevels) {
      if (isLevelLessonsDone(lvl, progress)) unlocked.add(lvl);
    }
    setUnlockedLevels(unlocked);
  }, [cards]);

  const byLevel = new Map<number, PracticeCard[]>();
  for (const c of cards) {
    if (!byLevel.has(c.level)) byLevel.set(c.level, []);
    byLevel.get(c.level)!.push(c);
  }

  const header = (
    <header className="praxis-practice-lib-head">
      <div>
        <span className="praxis-practice-kicker">Practice Library</span>
        <h1 className="praxis-practice-title">Practice</h1>
        <p className="praxis-practice-lib-sub">
          Pick a level, then a type. Each type holds a set of items you work through.
        </p>
      </div>
    </header>
  );

  if (unlockedLevels === null) {
    return <div className="praxis-practice-lib">{header}</div>;
  }

  const levels = [...byLevel.keys()]
    .filter((l) => unlockedLevels.has(l))
    .sort((a, b) => a - b);

  if (levels.length === 0) {
    return (
      <div className="praxis-practice-lib">
        {header}
        <section className="praxis-practice-empty">
          <h2 className="praxis-practice-empty-title">
            Practice unlocks as you learn.
          </h2>
          <p className="praxis-practice-empty-body">
            Complete every lesson in a level to open its scenarios, drills, and missions.
            Start with Foundations in My Learning.
          </p>
          <Link href="/learning" className="praxis-practice-primary">
            Go to My Learning
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="praxis-practice-lib">
      {header}
      {levels.map((lvl) => {
        const group = byLevel.get(lvl)!;
        const types: CardType[] = ["scenario", "drill", "mission"];

        return (
          <section key={lvl} className="praxis-practice-level">
            <div className="praxis-practice-level-head">
              <span className="praxis-practice-level-tag">Level {lvl}</span>
              <h2 className="praxis-practice-level-title">
                {LEVEL_TITLES[lvl] ?? "Level " + lvl}
              </h2>
            </div>

            <div className="praxis-practice-group-grid">
              {types.map((type) => {
                const items = group.filter((c) => c.type === type);
                const doneCount = items.filter((c) => done.has(c.id)).length;
                const slug = lvl + "-" + type;

                return (
                  <Link
                    key={type}
                    href={"/practice/group/" + slug}
                    className="praxis-practice-group-card"
                  >
                    <div className="praxis-practice-group-head">
                      <span className={"praxis-practice-group-tag is-" + type}>
                        {TYPE_LABELS[type]}
                      </span>
                      <span className="praxis-practice-group-count">
                        {doneCount} / {items.length}
                      </span>
                    </div>
                    <h3 className="praxis-practice-group-title">
                      Level {lvl} · {TYPE_LABELS[type]}
                    </h3>
                    <p className="praxis-practice-group-tagline">{TYPE_TAGLINE[type]}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
