"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ProgressSnapshot, ConceptSignal } from "@/lib/progress/data";
import { getAllLevels, getLessonsForLevel } from "@/lib/curriculumApi";
import { getProgress, getNextUnlockedLesson, toSlug } from "@/lib/curriculumProgress";
import type { LevelTier } from "@/lib/curriculum/types";
import "./progress.css";
import Arrow from "@/components/ui/Arrow";

const TIER_LABELS: Record<LevelTier, string> = {
  foundations: "Foundations",
  "asset-deep-dives": "Asset Deep Dives",
  "universal-skills": "Universal Skills",
};

const SIGNAL_STYLES: Record<ConceptSignal["level"], string> = {
  Strong: "is-strong",
  Developing: "is-developing",
  "Needs practice": "is-needs",
};

export default function ProgressClient({
  initial,
}: {
  initial: ProgressSnapshot;
}) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [nextLessonId, setNextLessonId] = useState<string | null>(null);
  const [showAllActivity, setShowAllActivity] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    
    setCompletedLessons(
      progress.completedLessons.filter((id) => !id.startsWith("quiz-")),
    );
    setNextLessonId(getNextUnlockedLesson(progress));
  }, []);

  const levels = useMemo(() => getAllLevels(), []);

  
  const tierStats = useMemo(() => {
    const byTier: Record<LevelTier, { completed: number; total: number; active: number | null }> = {
      foundations: { completed: 0, total: 0, active: null },
      "asset-deep-dives": { completed: 0, total: 0, active: null },
      "universal-skills": { completed: 0, total: 0, active: null },
    };

    for (const level of levels) {
      const lessonIds = getLessonsForLevel(level.id).map((l) => l.id);
      const done = lessonIds.filter((id) => completedLessons.includes(id)).length;
      const stats = byTier[level.tier];
      stats.total += 1;
      if (lessonIds.length > 0 && done === lessonIds.length) stats.completed += 1;
      if (done > 0 && done < lessonIds.length && stats.active === null) {
        stats.active = level.id;
      }
    }
    return byTier;
  }, [levels, completedLessons]);

  
  const lessonsCompleted = completedLessons.length;
  const practiceCompleted =
    initial.practice.scenariosCompleted +
    initial.practice.drillsCompleted +
    initial.practice.missionsCompleted;
  const practiceTotal =
    initial.practice.scenariosTotal +
    initial.practice.drillsTotal +
    initial.practice.missionsTotal;

  const overallTotal = initial.totalLessons + practiceTotal;
  const overallDone = lessonsCompleted + practiceCompleted;
  const overallPct = overallTotal === 0 ? 0 : Math.round((overallDone / overallTotal) * 100);

  return (
    <div className="praxis-progress">
      <header className="praxis-progress-header">
        <div>
          <span className="praxis-progress-kicker">Progress</span>
          <h1 className="praxis-progress-title">What is getting better</h1>
          <p className="praxis-progress-sub">
            Inferred from your lessons, practice, and Jema&rsquo;s notes. Not a
            formal assessment.
          </p>
        </div>
        {initial.portfolio.hasPortfolio ? (
          <span className="praxis-progress-day-chip">
            Day {initial.portfolio.daysOld}
          </span>
        ) : null}
      </header>

      
      <section className="praxis-progress-overall">
        <div className="praxis-progress-overall-row">
          <div className="praxis-progress-overall-left">
            <span className="praxis-progress-overall-label">Overall</span>
            <span className="praxis-progress-overall-value">{overallPct}%</span>
          </div>
          <div className="praxis-progress-overall-right">
            <span>
              {lessonsCompleted} of {initial.totalLessons} lessons
            </span>
            <span>
              {practiceCompleted} of {practiceTotal} practice cards
            </span>
          </div>
        </div>
        <div className="praxis-progress-overall-track" aria-hidden="true">
          <div
            className="praxis-progress-overall-fill"
            style={{ width: overallPct + "%" }}
          />
        </div>
      </section>

      
      <section className="praxis-progress-signals">
        <h2 className="praxis-progress-section-title">Concept signals</h2>
        {initial.signals.length === 0 ? (
          <p className="praxis-progress-empty">
            Signals appear as you complete lessons and practice. Jema notes what
            you talk about, and this page reads those notes.
          </p>
        ) : (
          <div className="praxis-progress-signals-grid">
            {(["Strong", "Developing", "Needs practice"] as const).map((band) => {
              const items = initial.signals.filter((s) => s.level === band);
              if (items.length === 0) return null;
              return (
                <div
                  key={band}
                  className={"praxis-progress-band " + SIGNAL_STYLES[band]}
                >
                  <span className="praxis-progress-band-label">{band}</span>
                  <ul className="praxis-progress-band-list">
                    {items.map((s) => (
                      <li key={s.concept} className="praxis-progress-band-item">
                        <span className="praxis-progress-band-concept">
                          {s.concept}
                        </span>
                        <span className="praxis-progress-band-count">
                          {s.memoryCount}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </section>

      
      <div className="praxis-progress-grid">
        <section className="praxis-progress-panel">
          <h2 className="praxis-progress-section-title">Learning</h2>
          <ul className="praxis-progress-tier-list">
            {(Object.keys(tierStats) as LevelTier[]).map((tier) => {
              const stats = tierStats[tier];
              return (
                <li key={tier} className="praxis-progress-tier">
                  <span className="praxis-progress-tier-name">
                    {TIER_LABELS[tier]}
                  </span>
                  <span className="praxis-progress-tier-stat">
                    {stats.completed} / {stats.total} levels
                  </span>
                </li>
              );
            })}
          </ul>
          {nextLessonId ? (
            <Link
              href={"/learning/lesson/" + toSlug(nextLessonId)}
              className="praxis-progress-cta"
            >
              Continue with Lesson {nextLessonId} <Arrow size={14} />
            </Link>
          ) : (
            <Link href="/learning" className="praxis-progress-cta">
              Open curriculum <Arrow size={14} />
            </Link>
          )}
        </section>

        <section className="praxis-progress-panel">
          <h2 className="praxis-progress-section-title">Practice</h2>
          <ul className="praxis-progress-practice-list">
            <PracticeRow
              label="Scenarios"
              done={initial.practice.scenariosCompleted}
              total={initial.practice.scenariosTotal}
            />
            <PracticeRow
              label="Drills"
              done={initial.practice.drillsCompleted}
              total={initial.practice.drillsTotal}
            />
            <PracticeRow
              label="Missions"
              done={initial.practice.missionsCompleted}
              total={initial.practice.missionsTotal}
            />
          </ul>
          <div className="praxis-progress-practice-meta">
            <span>
              {initial.practice.passedCount} passed ·{" "}
              {initial.practice.reviewedCount} reviewed
            </span>
          </div>
          <Link href="/practice" className="praxis-progress-cta">
            Open practice library <Arrow size={14} />
          </Link>
        </section>
      </div>

      
      {initial.portfolio.hasPortfolio ? (
        <section className="praxis-progress-portfolio">
          <h2 className="praxis-progress-section-title">Portfolio</h2>
          <div className="praxis-progress-portfolio-row">
            <div className="praxis-progress-portfolio-cell">
              <span className="praxis-progress-cell-label">Total value</span>
              <span className="praxis-progress-cell-value">
                KSh {Math.round(initial.portfolio.totalValue).toLocaleString("en-KE")}
              </span>
            </div>
            <div className="praxis-progress-portfolio-cell">
              <span className="praxis-progress-cell-label">Return</span>
              <span
                className={
                  "praxis-progress-cell-value " +
                  (initial.portfolio.returnPct >= 0 ? "is-up" : "is-down")
                }
              >
                {(initial.portfolio.returnPct >= 0 ? "+" : "") +
                  initial.portfolio.returnPct.toFixed(2) +
                  "%"}
              </span>
            </div>
            <div className="praxis-progress-portfolio-cell">
              <span className="praxis-progress-cell-label">Positions</span>
              <span className="praxis-progress-cell-value">
                {initial.portfolio.positions}
              </span>
            </div>
            <div className="praxis-progress-portfolio-cell">
              <span className="praxis-progress-cell-label">Trades</span>
              <span className="praxis-progress-cell-value">
                {initial.portfolio.trades}
              </span>
            </div>
          </div>
          <Link href="/portfolio" className="praxis-progress-cta">
            Open portfolio <Arrow size={14} />
          </Link>
        </section>
      ) : (
        <section className="praxis-progress-portfolio praxis-progress-portfolio--empty">
          <h2 className="praxis-progress-section-title">Portfolio</h2>
          <p className="praxis-progress-empty">
            Set up a practice portfolio to start placing trades and tracking
            returns.
          </p>
          <Link href="/portfolio/setup" className="praxis-progress-cta">
            Set up portfolio <Arrow size={14} />
          </Link>
        </section>
      )}

      
      <section className="praxis-progress-activity">
        <div className="praxis-progress-activity-head">
          <h2 className="praxis-progress-section-title">Recent activity</h2>
          {initial.activity.length > 6 ? (
            <button
              type="button"
              className="praxis-progress-activity-toggle"
              onClick={() => setShowAllActivity((s) => !s)}
              aria-expanded={showAllActivity}
            >
              {showAllActivity
                ? "Show less"
                : "Show " + (initial.activity.length - 6) + " more"}
            </button>
          ) : null}
        </div>
        {initial.activity.length === 0 ? (
          <p className="praxis-progress-empty">
            Nothing yet. Complete a lesson, a practice card, or place a trade.
          </p>
        ) : (
          <ul className="praxis-progress-timeline">
            {(showAllActivity ? initial.activity : initial.activity.slice(0, 6)).map(
              (a, i) => {
                const prev = (showAllActivity ? initial.activity : initial.activity.slice(0, 6))[i - 1];
                const showDayHeader =
                  i === 0 || dayLabel(prev.at) !== dayLabel(a.at);
                return (
                  <li key={a.id} className="praxis-progress-timeline-item">
                    {showDayHeader ? (
                      <div className="praxis-progress-day-header">
                        {dayLabel(a.at)}
                      </div>
                    ) : null}
                    <div className={"praxis-progress-event is-" + a.kind}>
                      <span className="praxis-progress-event-dot" aria-hidden="true" />
                      <div className="praxis-progress-event-body">
                        <span className="praxis-progress-event-title">
                          {a.href ? <Link href={a.href}>{a.title}</Link> : a.title}
                        </span>
                        {a.detail ? (
                          <span className="praxis-progress-event-detail">
                            {a.detail}
                          </span>
                        ) : null}
                      </div>
                      <span className="praxis-progress-event-time">
                        {relativeTime(a.at)}
                      </span>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        )}
      </section>
    </div>
  );
}

function PracticeRow({
  label,
  done,
  total,
}: {
  label: string;
  done: number;
  total: number;
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <li className="praxis-progress-practice-row">
      <span className="praxis-progress-practice-label">{label}</span>
      <div className="praxis-progress-practice-bar" aria-hidden="true">
        <div
          className="praxis-progress-practice-fill"
          style={{ width: pct + "%" }}
        />
      </div>
      <span className="praxis-progress-practice-count">
        {done} / {total}
      </span>
    </li>
  );
}

function dayLabel(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const that = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((today.getTime() - that.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return diff + " days ago";
  if (diff < 30) return Math.floor(diff / 7) + " weeks ago";
  return d.toLocaleDateString("en-KE", { month: "long", year: "numeric" });
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + "d ago";
  const months = Math.floor(days / 30);
  return months + "mo ago";
}
