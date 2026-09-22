"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllLevels, getLessonsForLevel } from "@/lib/curriculumApi";
import { TIER_META } from "@/lib/curriculum/levels";
import type { Level, LevelTier } from "@/lib/curriculum/types";
import {
  getProgress,
  getCompletedLessonIds,
  getLevelDisplayState,
  getNextUnlockedLesson,
  toSlug,
  type LevelDisplayState,
} from "@/lib/curriculumProgress";
import "./learning.css";

type ProgressView = {
  completedLessons: string[];
};

const EMPTY_PROGRESS: ProgressView = { completedLessons: [] };

export default function LearningPage() {
  const levels = getAllLevels();
  const [progress, setProgress] = useState<ProgressView>(EMPTY_PROGRESS);
  const [nextLesson, setNextLesson] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const full = getProgress();
    setProgress({ completedLessons: full.completedLessons });
    setNextLesson(getNextUnlockedLesson(full));
    setHydrated(true);
  }, []);

  const totalLessons = levels.reduce(
    (sum, level) => sum + getLessonsForLevel(level.id).length,
    0,
  );
  const totalCompleted = progress.completedLessons.filter((id) => !id.startsWith("quiz-")).length;
  const overallPercent =
    hydrated && totalLessons > 0
      ? Math.round((totalCompleted / totalLessons) * 100)
      : 0;

  const levelsByTier: Record<LevelTier, Level[]> = {
    foundations: [],
    "asset-deep-dives": [],
    "universal-skills": [],
  };
  for (const level of levels) {
    levelsByTier[level.tier].push(level);
  }
  for (const key of Object.keys(levelsByTier) as LevelTier[]) {
    levelsByTier[key].sort((a, b) => a.id - b.id);
  }

  return (
    <div>
      <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
        <span>Home</span>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
          My Learning
        </span>
      </nav>

      <header className="praxis-learn-header">
        <h1 className="praxis-learn-title">My Learning</h1>
        <p className="praxis-learn-subtitle">
          Foundations first. Then pick the asset classes and skills you actually
          want to go deep on.
        </p>

        <div className="praxis-learn-overall">
          <div className="praxis-learn-overall-track" aria-hidden="true">
            <div
              className="praxis-learn-overall-fill"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <span className="praxis-learn-overall-label">
            {hydrated
              ? `${totalCompleted} / ${totalLessons}`
              : `- / ${totalLessons}`}
          </span>
        </div>

        {hydrated && nextLesson ? (
          <Link
            href={`/learning/lesson/${toSlug(nextLesson)}`}
            className="praxis-learn-continue"
          >
            Continue with Lesson {nextLesson}
          </Link>
        ) : null}
      </header>

      {TIER_META.map((tier) => {
        const tierLevels = levelsByTier[tier.key];
        if (tierLevels.length === 0) return null;

        return (
          <section key={tier.key} className="praxis-tier">
            <div className="praxis-tier-divider" aria-hidden="true">
              <span className="praxis-tier-divider-node" />
              <span className="praxis-tier-divider-line" />
            </div>

            <header className="praxis-tier-header">
              <h2 className="praxis-tier-label">{tier.label}</h2>
              <span className="praxis-tier-count">
                {tierLevels.length}{" "}
                {tierLevels.length === 1 ? "level" : "levels"}
              </span>
            </header>
            <p className="praxis-tier-description">{tier.description}</p>

            {true ? (
              <div className="praxis-path">
                {tierLevels.map((level, index) => {
                  const lessons = getLessonsForLevel(level.id);
                  const completedInLevel = progress.completedLessons.filter(
                    (id) => lessons.some((lesson) => lesson.id === id),
                  ).length;
                  const displayState: LevelDisplayState = hydrated
                    ? getLevelDisplayState(level.id, {
                        completedLessons: progress.completedLessons,
                        levelQuizzes: {},
                      })
                    : level.id === 0
                      ? "active"
                      : "locked";
                  const percent =
                    lessons.length === 0 || !hydrated
                      ? 0
                      : Math.round((completedInLevel / lessons.length) * 100);
                  const isLast = index === tierLevels.length - 1;

                  const row = (
                    <div
                      className={`praxis-path-row${isLast ? " praxis-path-row-last" : ""}`}
                      data-state={displayState}
                    >
                      <div className="praxis-path-node-col">
                        <div
                          className={`praxis-path-node praxis-node-${displayState}`}
                        >
                          {displayState === "completed" ? (
                            <CheckIcon />
                          ) : displayState === "locked" ||
                            displayState === "coming-soon" ? (
                            <LockIcon />
                          ) : (
                            <span className="praxis-path-node-number">
                              {level.id}
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className={`praxis-path-info praxis-info-${displayState}`}
                      >
                        <div className="praxis-path-info-head">
                          <span className="praxis-path-level-tag">
                            Level {level.id}
                          </span>
                          {displayState === "completed" ? (
                            <span className="praxis-path-done-tag">
                              Completed
                            </span>
                          ) : null}
                        </div>
                        <h3 className="praxis-path-title">{level.title}</h3>
                        <p className="praxis-path-goal">{level.goal}</p>
                        {lessons.length > 0 ? (
                          <div className="praxis-path-footer">
                            <div
                              className="praxis-path-track"
                              aria-hidden="true"
                            >
                              <div
                                className={`praxis-path-fill praxis-fill-${displayState}`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="praxis-path-count">
                              {completedInLevel} / {lessons.length}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );

                  if (
                    displayState === "locked" ||
                    displayState === "coming-soon"
                  ) {
                    return <div key={level.id}>{row}</div>;
                  }

                  return (
                    <Link
                      key={level.id}
                      href={`/learning/${level.id}`}
                      className="praxis-path-link"
                    >
                      {row}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="praxis-module-grid">
                {tierLevels.map((level) => {
                  const lessons = getLessonsForLevel(level.id);
                  const completedInLevel = progress.completedLessons.filter(
                    (id) => lessons.some((lesson) => lesson.id === id),
                  ).length;
                  const displayState: LevelDisplayState = hydrated
                    ? getLevelDisplayState(level.id, {
                        completedLessons: progress.completedLessons,
                        levelQuizzes: {},
                      })
                    : "coming-soon";

                  return (
                    <ModuleCard
                      key={level.id}
                      level={level}
                      lessonCount={lessons.length}
                      completedCount={completedInLevel}
                      state={displayState}
                    />
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function ModuleCard({
  level,
  lessonCount,
  completedCount,
  state,
}: {
  level: Level;
  lessonCount: number;
  completedCount: number;
  state: LevelDisplayState;
}) {
  const isAvailable = state !== "coming-soon" && state !== "locked";

  const nodeClass =
    state === "completed"
      ? "praxis-module-node praxis-module-node-completed"
      : state === "active"
        ? "praxis-module-node praxis-module-node-active"
        : "praxis-module-node praxis-module-node-locked";

  const badgeClass =
    state === "completed"
      ? "praxis-module-badge praxis-module-badge-completed"
      : state === "active"
        ? "praxis-module-badge praxis-module-badge-available"
        : "praxis-module-badge praxis-module-badge-soon";

  const badgeText =
    state === "completed"
      ? "Completed"
      : state === "coming-soon"
        ? "Coming soon"
        : state === "locked"
          ? "Locked"
          : `${completedCount} / ${lessonCount} lessons`;

  const card = (
    <div
      className={`praxis-module-card${isAvailable ? "" : " praxis-module-card-locked"}`}
    >
      <div className="praxis-module-card-top">
        <div className={nodeClass} aria-hidden="true">
          {state === "completed" ? (
            <CheckIcon />
          ) : state === "coming-soon" || state === "locked" ? (
            <LockIcon />
          ) : (
            <span className="praxis-module-node-number">{level.id}</span>
          )}
        </div>
        <div className="praxis-module-card-meta">
          <span className="praxis-module-tag">Level {level.id}</span>
          <span className={badgeClass}>{badgeText}</span>
        </div>
      </div>
      <h3 className="praxis-module-title">{level.title}</h3>
      <p className="praxis-module-goal">{level.goal}</p>
    </div>
  );

  if (!isAvailable) {
    return <div>{card}</div>;
  }

  return (
    <Link href={`/learning/${level.id}`} className="praxis-module-link">
      {card}
    </Link>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="5 13 10 18 19 7" />
    </svg>
  );
}
