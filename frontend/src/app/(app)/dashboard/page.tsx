"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardSummary } from "@/lib/dashboardApi";
import type { DashboardData } from "@/lib/dashboard/types";
import { useSession } from "@/lib/auth/useSession";
import { getProgress, getCompletedLessonIds } from "@/lib/curriculumProgress";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import { shouldShowTour } from "@/components/dashboard/TourModal";
import "./dashboard.css";
import Arrow from "@/components/ui/Arrow";

type LoadStatus = "loading" | "ready" | "error";

export default function DashboardPage() {
  const { user, status: sessionStatus } = useSession();
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardData | null>(null);
  const [status, setStatus] = useState<LoadStatus>("loading");
  const [retryKey, setRetryKey] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  useEffect(() => {
    if (sessionStatus !== "authenticated" || !user) return;
    let cancelled = false;
    setStatus("loading");
    getDashboardSummary(user)
      .then((data) => {
        if (cancelled) return;
        setSummary(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [user, sessionStatus, retryKey]);

  useEffect(() => {
    setLessonsCompleted(getCompletedLessonIds(getProgress()).length);
  }, []);

  if (sessionStatus === "loading" || status === "loading") {
    return null;
  }

  if (status === "error" || !summary) {
    return (
      <div className="praxis-dash-stack">
        <div className="praxis-dash-card">
          <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14 }}>
            Could not load your dashboard.
          </p>
          <button
            type="button"
            onClick={() => setRetryKey((k) => k + 1)}
            className="praxis-practice-primary"
            style={{ marginTop: 12 }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const p = summary.portfolio;
  const isUp = p.changeAbsKsh >= 0;
  const maxBar = Math.max(1, ...summary.weeklyBars.map((b) => b.total));
  const cashFill = Math.min(100, Math.max(0, p.cashPct));
  const investedPct = 100 - cashFill;

  const isEmpty =
    lessonsCompleted === 0 &&
    summary.stats.practiceCompleted === 0 &&
    p.decisionCount === 0 &&
    !p.hasPortfolio;

  if (isEmpty) {
    
    
    
    
    
    if (shouldShowTour()) {
      router.replace("/onboarding");
      return null;
    }
    return <WelcomeCard firstName={summary.firstName} />;
  }

  const showPortfolio = p.hasPortfolio;
  const showActivity =
    summary.stats.practiceCompleted > 0 ||
    p.decisionCount > 0 ||
    summary.weeklyBars.some((b) => b.total > 0);
  const showConcepts = summary.concepts.length > 0;
  const showHoldings = showPortfolio && summary.holdings.length > 0;
  const showAllocation = showPortfolio && summary.sectors.length > 0;

  const hasRow2 = showActivity || showPortfolio;
  const hasRow3 = showHoldings || showAllocation || showConcepts;

  const row2Count = (showActivity ? 1 : 0) + (showPortfolio ? 1 : 0);
  const row3Count =
    (showHoldings ? 1 : 0) + (showAllocation ? 1 : 0) + (showConcepts ? 1 : 0);

  const row2Class =
    "praxis-dash-row-2" + (row2Count === 1 ? " praxis-dash-row-single" : "");
  const row3Class =
    "praxis-dash-row-3" +
    (row3Count === 1
      ? " praxis-dash-row-single"
      : row3Count === 2
        ? " praxis-dash-row-double"
        : "");

  return (
    <div className="praxis-dash-stack">
      <section className="praxis-dash-hero">
        <div className="praxis-dash-hero-left">
          <span className="praxis-dash-hero-kicker">Welcome back</span>
          <h1 className="praxis-dash-hero-title">Hi, {summary.firstName}.</h1>
          <p className="praxis-dash-hero-sub">
            {p.hasPortfolio
              ? "Day " +
                p.daysOld +
                " of your practice portfolio. " +
                (p.assetCount === 0
                  ? "No positions yet, open Market to make your first trade."
                  : "You hold " +
                    p.assetCount +
                    " position" +
                    (p.assetCount === 1 ? "" : "s") +
                    " across " +
                    summary.sectors.filter((s) => s.sector !== "Cash").length +
                    " sector" +
                    (summary.sectors.filter((s) => s.sector !== "Cash").length === 1
                      ? ""
                      : "s") +
                    ".")
              : "Set up a practice portfolio to start tracking real decisions."}
          </p>
          {summary.stats.streak > 1 ? (
            <span className="praxis-dash-streak">
              🔥 {summary.stats.streak} day streak
            </span>
          ) : null}
        </div>
        <div className="praxis-dash-hero-right">
          {p.hasPortfolio ? (
            <>
              <span className="praxis-dash-hero-label">Portfolio value</span>
              <span className="praxis-dash-hero-value">
                KSh {Math.round(p.totalValueKsh).toLocaleString("en-KE")}
              </span>
              <span
                className={"praxis-dash-hero-change " + (isUp ? "is-up" : "is-down")}
              >
                {isUp ? "▲" : "▼"} {Math.abs(p.changePct).toFixed(2)}% ·{" "}
                {(isUp ? "+" : "") + Math.round(p.changeAbsKsh).toLocaleString("en-KE")}
              </span>
            </>
          ) : (
            <Link href="/portfolio/setup" className="praxis-dash-hero-cta">
              Set up portfolio <Arrow size={14} />
            </Link>
          )}
        </div>
      </section>

      {hasRow2 ? (
        <div className={row2Class}>
          {showActivity ? (
            <section className="praxis-dash-card praxis-dash-activity-chart">
              <div className="praxis-dash-card-head">
                <div>
                  <span className="praxis-dash-card-label">Activity</span>
                  <span className="praxis-dash-card-sub">Last 8 weeks</span>
                </div>
                <div className="praxis-dash-legend">
                  <span className="praxis-dash-legend-item">
                    <span className="praxis-dash-legend-dot is-trade" /> Trades
                  </span>
                  <span className="praxis-dash-legend-item">
                    <span className="praxis-dash-legend-dot is-practice" /> Practice
                  </span>
                </div>
              </div>
              <div className="praxis-dash-bars" role="img" aria-label="Weekly activity">
                {summary.weeklyBars.map((b, i) => {
                  const tradeH = (b.trades / maxBar) * 100;
                  const practiceH = (b.practice / maxBar) * 100;
                  const isEmptyBar = b.total === 0;
                  return (
                    <div key={i} className="praxis-dash-bar-col">
                      <div className="praxis-dash-bar-track">
                        {isEmptyBar ? (
                          <div className="praxis-dash-bar-empty" />
                        ) : (
                          <>
                            <div
                              className="praxis-dash-bar-segment is-practice"
                              style={{ height: practiceH + "%" }}
                            />
                            <div
                              className="praxis-dash-bar-segment is-trade"
                              style={{ height: tradeH + "%" }}
                            />
                          </>
                        )}
                      </div>
                      <span className="praxis-dash-bar-label">{b.label}</span>
                    </div>
                  );
                })}
              </div>
              {summary.weeklyBars.every((b) => b.total === 0) ? (
                <p className="praxis-dash-hint">
                  Bars fill in as you place trades and complete practice cards.
                </p>
              ) : null}
            </section>
          ) : null}

          {showPortfolio ? (
            <section className="praxis-dash-card praxis-dash-balance">
              <span className="praxis-dash-balance-label">Cash vs invested</span>
              <span className="praxis-dash-balance-value">
                KSh {Math.round(p.totalValueKsh).toLocaleString("en-KE")}
              </span>
              <span className="praxis-dash-balance-sub">
                {cashFill.toFixed(1)}% cash · {investedPct.toFixed(1)}% invested
              </span>

              <div className="praxis-dash-balance-bar" aria-hidden="true">
                <div
                  className="praxis-dash-balance-fill is-cash"
                  style={{ width: cashFill + "%" }}
                />
                <div
                  className="praxis-dash-balance-fill is-invested"
                  style={{ width: investedPct + "%" }}
                />
              </div>

              <dl className="praxis-dash-balance-grid">
                <div>
                  <dt>Cash</dt>
                  <dd>KSh {Math.round(p.cashKsh).toLocaleString("en-KE")}</dd>
                </div>
                <div>
                  <dt>Starting</dt>
                  <dd>
                    KSh {Math.round(p.startingBalanceKsh).toLocaleString("en-KE")}
                  </dd>
                </div>
                <div>
                  <dt>Trades</dt>
                  <dd>{p.decisionCount}</dd>
                </div>
                <div>
                  <dt>Positions</dt>
                  <dd>{p.assetCount}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>
      ) : null}

      {hasRow3 ? (
        <div className={row3Class}>
          {showHoldings ? (
            <section className="praxis-dash-card praxis-dash-holdings">
              <div className="praxis-dash-card-head">
                <span className="praxis-dash-card-label">Holdings</span>
                <Link href="/portfolio" className="praxis-dash-card-link">
                  Open <Arrow size={14} />
                </Link>
              </div>
              <ul className="praxis-dash-holdings-list">
                {summary.holdings.slice(0, 6).map((h) => (
                  <li key={h.ticker}>
                    <Link href={"/market/" + h.ticker} className="praxis-dash-holding">
                      <span className="praxis-dash-holding-avatar" aria-hidden="true">
                        {h.ticker.slice(0, 2)}
                      </span>
                      <div className="praxis-dash-holding-main">
                        <span className="praxis-dash-holding-ticker">{h.ticker}</span>
                        <span className="praxis-dash-holding-name">
                          {h.sector ?? h.name}
                        </span>
                      </div>
                      <div className="praxis-dash-holding-right">
                        <span className="praxis-dash-holding-value">
                          KSh {Math.round(h.currentValue).toLocaleString("en-KE")}
                        </span>
                        <span
                          className={
                            "praxis-dash-holding-pnl " +
                            (h.pnl >= 0 ? "is-up" : "is-down")
                          }
                        >
                          {h.pnlPct === null
                            ? "-"
                            : (h.pnl >= 0 ? "+" : "") + h.pnlPct.toFixed(2) + "%"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {showAllocation ? (
            <section className="praxis-dash-card praxis-dash-sector">
              <div className="praxis-dash-card-head">
                <span className="praxis-dash-card-label">Allocation</span>
              </div>
              <div className="praxis-dash-sector-body">
                <SectorDonut slices={summary.sectors} total={p.totalValueKsh} />
                <ul className="praxis-dash-sector-legend">
                  {summary.sectors.slice(0, 6).map((s) => (
                    <li key={s.sector} className="praxis-dash-sector-row">
                      <span
                        className="praxis-dash-sector-dot"
                        style={{ background: s.color }}
                      />
                      <span className="praxis-dash-sector-name">{s.sector}</span>
                      <span className="praxis-dash-sector-pct">
                        {s.pct.toFixed(1)}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : null}

          {showConcepts ? (
            <section className="praxis-dash-card praxis-dash-concepts">
              <div className="praxis-dash-card-head">
                <span className="praxis-dash-card-label">Concept signals</span>
                <Link href="/progress" className="praxis-dash-card-link">
                  See all <Arrow size={14} />
                </Link>
              </div>
              <ul className="praxis-dash-concepts-list">
                {summary.concepts.map((c) => (
                  <li
                    key={c.label}
                    className={"praxis-dash-concept is-" + levelClass(c.level)}
                  >
                    <span className="praxis-dash-concept-dot" aria-hidden="true" />
                    <span className="praxis-dash-concept-name">{c.label}</span>
                    <span className="praxis-dash-concept-count">{c.count}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      <div className="praxis-dash-row-2">
        <section className="praxis-dash-card praxis-dash-progress">
          <div className="praxis-dash-card-head">
            <span className="praxis-dash-card-label">Your progress</span>
            <Link href="/progress" className="praxis-dash-card-link">
              Open <Arrow size={14} />
            </Link>
          </div>
          <div className="praxis-dash-progress-row">
            <span className="praxis-dash-progress-label">Lessons</span>
            <div className="praxis-dash-progress-track">
              <div
                className="praxis-dash-progress-fill"
                style={{
                  width:
                    summary.stats.totalLessons === 0
                      ? "0%"
                      : (lessonsCompleted / summary.stats.totalLessons) * 100 + "%",
                }}
              />
            </div>
            <span className="praxis-dash-progress-count">
              {lessonsCompleted} / {summary.stats.totalLessons}
            </span>
          </div>
          <div className="praxis-dash-progress-row">
            <span className="praxis-dash-progress-label">Practice</span>
            <div className="praxis-dash-progress-track">
              <div
                className="praxis-dash-progress-fill is-practice"
                style={{
                  width:
                    summary.stats.practiceTotal === 0
                      ? "0%"
                      : (summary.stats.practiceCompleted /
                          summary.stats.practiceTotal) *
                          100 +
                        "%",
                }}
              />
            </div>
            <span className="praxis-dash-progress-count">
              {summary.stats.practiceCompleted} / {summary.stats.practiceTotal}
            </span>
          </div>
          <div className="praxis-dash-progress-stats">
            <div>
              <span className="praxis-dash-progress-num">
                {summary.stats.daysActive}
              </span>
              <span className="praxis-dash-progress-lbl">Active days</span>
            </div>
            <div>
              <span className="praxis-dash-progress-num">{summary.stats.streak}</span>
              <span className="praxis-dash-progress-lbl">Current streak</span>
            </div>
            <div>
              <span className="praxis-dash-progress-num">{p.decisionCount}</span>
              <span className="praxis-dash-progress-lbl">Trades placed</span>
            </div>
          </div>

          <div className="praxis-dash-progress-week">
            <div className="praxis-dash-progress-week-head">
              <span className="praxis-dash-progress-week-title">This week</span>
              <span className="praxis-dash-progress-week-range">
                {summary.weeklyBars[summary.weeklyBars.length - 1]?.label ?? ""}
              </span>
            </div>
            <div className="praxis-dash-progress-week-row">
              <div className="praxis-dash-progress-week-cell">
                <span className="praxis-dash-progress-num">
                  {summary.weeklyBars[summary.weeklyBars.length - 1]?.practice ?? 0}
                </span>
                <span className="praxis-dash-progress-lbl">Practice cards</span>
              </div>
              <div className="praxis-dash-progress-week-cell">
                <span className="praxis-dash-progress-num">
                  {summary.weeklyBars[summary.weeklyBars.length - 1]?.trades ?? 0}
                </span>
                <span className="praxis-dash-progress-lbl">Trades</span>
              </div>
              <div className="praxis-dash-progress-week-cell">
                <span className="praxis-dash-progress-num">
                  {summary.weeklyBars[summary.weeklyBars.length - 1]?.total ?? 0}
                </span>
                <span className="praxis-dash-progress-lbl">Total actions</span>
              </div>
            </div>
          </div>
        </section>

        <section className="praxis-dash-card praxis-dash-recent">
          <div className="praxis-dash-card-head">
            <span className="praxis-dash-card-label">Recent activity</span>
          </div>
          {summary.recentActivity.length === 0 ? (
            <p className="praxis-dash-empty">
              Nothing yet. Complete a lesson, a practice card, or place a trade.
            </p>
          ) : (
            <ul className="praxis-dash-activity">
              {summary.recentActivity.map((a, i) => (
                <li key={a.kind + i} className="praxis-dash-activity-item">
                  <Link href={a.href} className="praxis-dash-activity-link">
                    <span
                      className={"praxis-dash-activity-dot is-" + a.kind}
                      aria-hidden="true"
                    />
                    <span className="praxis-dash-activity-text">
                      <span className="praxis-dash-activity-title">{a.title}</span>
                      <span className="praxis-dash-activity-sub">{a.subtitle}</span>
                    </span>
                    <span className="praxis-dash-activity-time">
                      {relative(a.at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {summary.recommendation ? (
        <section className="praxis-dash-recommend" aria-label="Next up">
          <div className="praxis-dash-recommend-left">
            <span className="praxis-dash-card-label">Recommended next</span>
            <span className="praxis-dash-recommend-title">
              {summary.recommendation.title}
            </span>
            <span className="praxis-dash-recommend-meta">
              {summary.recommendation.topic} · {summary.recommendation.difficulty} ·{" "}
              {summary.recommendation.minutes} min
            </span>
          </div>
          <button
            type="button"
            className="praxis-dash-jema-cta"
            onClick={() => {
              window.dispatchEvent(new Event("praxis:open-jema"));
            }}
          >
            <span className="praxis-dash-jema-cta-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 5.5c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5z" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <span>Talk to Jema</span>
          </button>
        </section>
      ) : null}
    </div>
  );
}

function SectorDonut({
  slices,
  total,
}: {
  slices: { value: number; color: string; sector: string }[];
  total: number;
}) {
  const sum = slices.reduce((a, s) => a + s.value, 0) || 1;
  const R = 54;
  const C = 2 * Math.PI * R;
  let cumulative = 0;
  return (
    <div className="praxis-dash-donut-wrap">
      <svg viewBox="0 0 140 140" className="praxis-dash-donut">
        <circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="16"
          opacity="0.4"
        />
        {slices.map((s, i) => {
          const frac = s.value / sum;
          const dashLen = frac * C;
          const dashArray = dashLen + " " + (C - dashLen);
          const offset = -cumulative * C;
          cumulative += frac;
          return (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth="16"
              strokeDasharray={dashArray}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
            />
          );
        })}
      </svg>
      <div className="praxis-dash-donut-center">
        <span className="praxis-dash-donut-label">Total</span>
        <span className="praxis-dash-donut-value">
          KSh {Math.round(total).toLocaleString("en-KE")}
        </span>
      </div>
    </div>
  );
}

function levelClass(level: string): string {
  if (level === "Strong") return "strong";
  if (level === "Needs practice") return "needs";
  return "developing";
}

function relative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + "d ago";
  return Math.floor(days / 30) + "mo ago";
}
