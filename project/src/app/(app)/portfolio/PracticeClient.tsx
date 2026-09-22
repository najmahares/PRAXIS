"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { PortfolioView } from "@/lib/practice/types";
import { formatKsh, formatPct } from "@/lib/practice/math";
import { registerPracticeSummary } from "@/lib/mentor/context";
import "./practice.css";

const PALETTE = [
  "#2563eb", "#0d9488", "#7c3aed", "#d97706",
  "#dc2626", "#15803d", "#0ea5e9", "#a855f7",
];

type StatTone = "blue" | "green" | "amber" | "purple";

const TONES: Record<StatTone, { accent: string; soft: string }> = {
  blue:   { accent: "#2563eb", soft: "rgba(37, 99, 235, 0.10)" },
  green:  { accent: "#15803d", soft: "rgba(21, 128, 61, 0.10)" },
  amber:  { accent: "#d97706", soft: "rgba(217, 119, 6, 0.10)" },
  purple: { accent: "#7c3aed", soft: "rgba(124, 58, 237, 0.10)" },
};

type Milestone = {
  id: string;
  title: string;
  body: string;
  lessonId?: string;
  lessonLabel?: string;
};

const SEEN_KEY = "praxis-practice-seen-milestones-v1";

function readSeen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function writeSeen(set: Set<string>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify([...set]));
  } catch {}
}

function computeMilestones(view: PortfolioView): Milestone[] {
  const out: Milestone[] = [];
  const { daysOld, trades, totalPnlPct, holdings } = view;

  if (daysOld >= 30 && daysOld < 90) {
    out.push({
      id: "thirty-days",
      title: "One month in",
      body: "Thirty days is a real review interval. Check whether your reasons still hold.",
      lessonId: "16.3",
      lessonLabel: "Read 16.3 · The annual review",
    });
  }
  if (daysOld >= 90 && daysOld < 365) {
    out.push({
      id: "ninety-days",
      title: "Ninety days in",
      body: "This is where patterns show up. Trade frequency, holding period, which decisions you repeat.",
      lessonId: "15.2",
      lessonLabel: "Read 15.2 · Loss aversion",
    });
  }
  if (daysOld >= 365) {
    out.push({
      id: "one-year",
      title: "One year of practice",
      body: "A full market cycle has passed. Look at what you learned, not just what you earned.",
      lessonId: "16.3",
      lessonLabel: "Read 16.3 · The annual review",
    });
  }
  if (trades.length >= 5 && trades.length < 10) {
    out.push({
      id: "five-trades",
      title: "Five trades in",
      body: "Enough activity to look at. Are you averaging down, or adding to winners?",
      lessonId: "14.4",
      lessonLabel: "Read 14.4 · Position sizing",
    });
  }
  if (trades.length >= 10) {
    out.push({
      id: "ten-trades",
      title: "Ten trades in",
      body: "Your first behaviour pattern is emerging. The journal has the evidence.",
      lessonId: "15.2",
      lessonLabel: "Read 15.2 · The disposition effect",
    });
  }
  if (holdings.length === 1 && trades.length >= 1) {
    out.push({
      id: "concentrated",
      title: "One holding only",
      body: "A portfolio needs more than one position. Market has 60+ tickers to explore.",
      lessonId: "12.4",
      lessonLabel: "Read 12.4 · Diversifiers",
    });
  }
  if (totalPnlPct >= 20) {
    out.push({
      id: "up-20",
      title: "Portfolio up 20%",
      body: "Do you know why it went up? Write it down before you forget.",
      lessonId: "14.5",
      lessonLabel: "Read 14.5 · Write a thesis",
    });
  }
  if (totalPnlPct <= -15) {
    out.push({
      id: "down-15",
      title: "Portfolio down 15%",
      body: "This is what a drawdown feels like. Reread the direction plan before doing anything.",
      lessonId: "13.7",
      lessonLabel: "Read 13.7 · Direction doesn't move",
    });
  }

  return out;
}

export default function PracticeClient({
  initialView,
  nasiChangePct,
}: {
  initialView: PortfolioView | null;
  nasiChangePct: number | null;
}) {
  const [view, setView] = useState<PortfolioView | null>(initialView);
  const [busy, setBusy] = useState(false);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setSeen(readSeen());
  }, []);

  useEffect(() => {
    registerPracticeSummary(view ? view.summaryForJema : null);
    return () => registerPracticeSummary(null);
  }, [view]);

  async function refresh() {
    setBusy(true);
    try {
      const res = await fetch("/api/practice/portfolio", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) setView(data.view);
    } finally {
      setBusy(false);
      router.refresh();
    }
  }

  function dismissMilestone(id: string) {
    const next = new Set(seen);
    next.add(id);
    setSeen(next);
    writeSeen(next);
  }

  if (!view) {
    return (
      <div className="praxis-pf">
        <header className="praxis-pf-header">
          <h1 className="praxis-pf-title">Portfolio</h1>
        </header>
        <div className="praxis-pf-empty">
          <h2 className="praxis-pf-empty-title">Set up your practice portfolio</h2>
          <p className="praxis-pf-empty-body">
            Choose your starting capital and begin. Every trade is simulated. No real money involved.
          </p>
          <Link href="/portfolio/setup" className="praxis-pf-btn praxis-pf-btn--primary">
            Choose starting capital
          </Link>
        </div>
      </div>
    );
  }

  const {
    portfolio, holdings, trades,
    totalValue, totalPnl, totalPnlPct, cashPct, daysOld,
  } = view;
  const up = totalPnl >= 0;
  const vsNasi = nasiChangePct !== null ? totalPnlPct - nasiChangePct : null;
  const beatMarket = vsNasi !== null && vsNasi >= 0;
  const milestones = computeMilestones(view).filter((m) => !seen.has(m.id));

  return (
    <div className="praxis-pf">
      <header className="praxis-pf-header">
        <div className="praxis-pf-header-left">
          <div className="praxis-pf-title-row">
            <h1 className="praxis-pf-title">Portfolio</h1>
            <span className="praxis-pf-day-chip">Day {daysOld}</span>
          </div>
          <nav className="praxis-pf-nav" aria-label="Portfolio sections">
            <Link href="/portfolio" className={"praxis-pf-nav-link" + (pathname === "/portfolio" ? " is-active" : "")}>Overview</Link>
            <Link href="/portfolio/journal" className={"praxis-pf-nav-link" + (pathname.startsWith("/portfolio/journal") ? " is-active" : "")}>Journal</Link>
            <Link href="/portfolio/reset" className={"praxis-pf-nav-link" + (pathname.startsWith("/portfolio/reset") ? " is-active" : "")}>Reset</Link>
          </nav>
        </div>
        <div className="praxis-pf-header-right">
          <button type="button" onClick={refresh} disabled={busy} className="praxis-pf-btn praxis-pf-btn--ghost">
            {busy ? "Refreshing..." : "Refresh"}
          </button>
          <Link href="/portfolio/trade" className="praxis-pf-btn praxis-pf-btn--primary">
            <span className="praxis-pf-btn-plus" aria-hidden="true">+</span>
            New trade
          </Link>
        </div>
      </header>

      {milestones.length > 0 ? (
        <section className="praxis-pf-milestones" aria-label="Milestones">
          {milestones.map((m) => (
            <article key={m.id} className="praxis-pf-milestone">
              <div className="praxis-pf-milestone-body">
                <span className="praxis-pf-milestone-title">{m.title}</span>
                <p className="praxis-pf-milestone-text">{m.body}</p>
                {m.lessonId ? (
                  <Link
                    href={"/learning/lesson/" + m.lessonId.replace(".", "-")}
                    className="praxis-pf-milestone-link"
                  >
                    {m.lessonLabel ?? "Read the lesson"}
                  </Link>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismissMilestone(m.id)}
                className="praxis-pf-milestone-dismiss"
                aria-label="Dismiss"
              >
                {"\u00D7"}
              </button>
            </article>
          ))}
        </section>
      ) : null}

      <section className="praxis-pf-stats" aria-label="Portfolio summary">
        <StatCard tone="blue" label="Total value" value={formatKsh(totalValue)}
          sub={formatPct(totalPnlPct) + " all time"} subTone={up ? "up" : "down"} />
        <StatCard tone={up ? "green" : "amber"} label="Total return"
          value={(up ? "+" : "\u2212") + formatKsh(Math.abs(totalPnl))}
          valueTone={up ? "up" : "down"}
          sub={"Since " + formatKsh(portfolio.starting_capital) + " start"} />
        <StatCard tone="purple" label="Cash balance" value={formatKsh(portfolio.cash)}
          sub={cashPct.toFixed(1) + "% of portfolio"} />
        <StatCard tone="blue" label="Positions" value={String(holdings.length)}
          sub={trades.length + (trades.length === 1 ? " trade" : " trades")} />
      </section>

      {nasiChangePct !== null ? (
        <section className="praxis-pf-benchmark" aria-label="Benchmark">
          <div className="praxis-pf-benchmark-row">
            <div className="praxis-pf-benchmark-col">
              <span className="praxis-pf-benchmark-label">Your portfolio</span>
              <span className={"praxis-pf-benchmark-value " + (up ? "is-up" : "is-down")}>
                {formatPct(totalPnlPct)}
              </span>
            </div>
            <div className="praxis-pf-benchmark-col">
              <span className="praxis-pf-benchmark-label">NASI (YTD)</span>
              <span className={"praxis-pf-benchmark-value " + (nasiChangePct >= 0 ? "is-up" : "is-down")}>
                {formatPct(nasiChangePct)}
              </span>
            </div>
            <div className="praxis-pf-benchmark-col praxis-pf-benchmark-col--wide">
              <span className="praxis-pf-benchmark-label">Difference</span>
              <span className={"praxis-pf-benchmark-value " + (beatMarket ? "is-up" : "is-down")}>
                {(vsNasi !== null && vsNasi >= 0 ? "+" : "") + (vsNasi?.toFixed(2) ?? "0") + "%"}
              </span>
              <span className="praxis-pf-benchmark-note">
                {beatMarket
                  ? "You are ahead of the market this year. Note what worked."
                  : "You are behind the market this year. Read 14.3 on valuation."}
              </span>
            </div>
          </div>
        </section>
      ) : null}

      <section className="praxis-pf-chart" aria-label="Portfolio value">
        <div className="praxis-pf-chart-head">
          <div className="praxis-pf-chart-head-left">
            <span className="praxis-pf-chart-title">Value</span>
            <span className="praxis-pf-chart-sub">
              {"Since start \u00B7 "}{daysOld} {daysOld === 1 ? "day" : "days"}
            </span>
          </div>
          <span className={"praxis-pf-chart-value " + (up ? "is-up" : "is-down")}>
            {formatKsh(totalValue)}
          </span>
        </div>
        <TrajectoryLine startingValue={portfolio.starting_capital} currentValue={totalValue} />
        <p className="praxis-pf-chart-foot">
          Chart refines as the portfolio ages. From starting capital to today.
        </p>
      </section>

      <div className="praxis-pf-grid">
        <section className="praxis-pf-panel" aria-label="Top holdings">
          <h2 className="praxis-pf-panel-title">Top holdings</h2>
          {holdings.length === 0 ? (
            <p className="praxis-pf-panel-empty">
              No positions yet. Head to Market and pick your first company.
            </p>
          ) : (
            <ul className="praxis-pf-holdings-list">
              {holdings.map((h) => (
                <li key={h.ticker}>
                  <Link href={"/portfolio/holding/" + h.ticker} className="praxis-pf-holding-row">
                    <div className="praxis-pf-holding-left">
                      <span className="praxis-pf-holding-sym">{h.ticker}</span>
                      <span className="praxis-pf-holding-name">{h.sector ?? h.name ?? "\u2014"}</span>
                    </div>
                    <span className="praxis-pf-holding-val">
                      {h.currentValue === null ? "\u2014" : formatKsh(h.currentValue)}
                    </span>
                    <span className={"praxis-pf-holding-pct " + ((h.unrealizedPnl ?? 0) >= 0 ? "is-up" : "is-down")}>
                      {h.unrealizedPnlPct === null ? "\u2014" : formatPct(h.unrealizedPnlPct)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="praxis-pf-panel" aria-label="Allocation by sector">
          <h2 className="praxis-pf-panel-title">Allocation by sector</h2>
          <SectorDonut view={view} />
        </section>
      </div>

      <section className="praxis-pf-summary" aria-label="Summary metrics">
        <SummaryCell tone="blue" label="Invested" value={formatKsh(view.totalInvested)} />
        <SummaryCell tone={up ? "green" : "amber"} label="Total return"
          value={(up ? "+" : "\u2212") + formatKsh(Math.abs(totalPnl))}
          valueTone={up ? "up" : "down"} />
        <SummaryCell tone={up ? "green" : "amber"} label="Return %"
          value={formatPct(totalPnlPct)} valueTone={up ? "up" : "down"} />
        <SummaryCell tone="purple" label="Starting capital" value={formatKsh(portfolio.starting_capital)} />
      </section>
    </div>
  );
}

function StatCard({
  tone, label, value, valueTone, sub, subTone,
}: {
  tone: StatTone; label: string; value: string;
  valueTone?: "up" | "down"; sub?: string; subTone?: "up" | "down";
}) {
  const t = TONES[tone];
  return (
    <div className="praxis-pf-stat" style={{
      ["--accent" as never]: t.accent,
      ["--soft" as never]: t.soft,
    } as React.CSSProperties}>
      <span className="praxis-pf-stat-label">{label}</span>
      <span className={"praxis-pf-stat-value " + (valueTone === "up" ? "is-up" : valueTone === "down" ? "is-down" : "")}>
        {value}
      </span>
      {sub ? (
        <span className={"praxis-pf-stat-sub " + (subTone === "up" ? "is-up" : subTone === "down" ? "is-down" : "")}>
          {sub}
        </span>
      ) : null}
    </div>
  );
}

function SummaryCell({ tone, label, value, valueTone }: {
  tone: StatTone; label: string; value: string; valueTone?: "up" | "down";
}) {
  const t = TONES[tone];
  return (
    <div className="praxis-pf-summary-cell" style={{ ["--accent" as never]: t.accent } as React.CSSProperties}>
      <span className="praxis-pf-summary-label">{label}</span>
      <span className={"praxis-pf-summary-value " + (valueTone === "up" ? "is-up" : valueTone === "down" ? "is-down" : "")}>
        {value}
      </span>
    </div>
  );
}

function TrajectoryLine({ startingValue, currentValue }: { startingValue: number; currentValue: number }) {
  const W = 900, H = 220, PAD_X = 40, PAD_Y = 26;
  const min = Math.min(startingValue, currentValue);
  const max = Math.max(startingValue, currentValue);
  const rawRange = max - min;
  const pad = rawRange === 0 ? Math.max(max * 0.05, 100) : rawRange * 0.15;
  const lo = min - pad, hi = max + pad, span = hi - lo;
  const y0 = PAD_Y + (1 - (startingValue - lo) / span) * (H - PAD_Y * 2);
  const y1 = PAD_Y + (1 - (currentValue - lo) / span) * (H - PAD_Y * 2);
  const up = currentValue >= startingValue;
  const stroke = up ? "#15803d" : "#b91c1c";
  return (
    <svg viewBox={"0 0 " + W + " " + H} preserveAspectRatio="none"
      className="praxis-pf-chart-svg" role="img" aria-label="Portfolio value over time">
      <defs>
        <linearGradient id="pfTrajFill" x1="0" y1="0" x2="0" y2="1">
          {up ? (<><stop offset="0%" stopColor="#15803d" stopOpacity="0.22" /><stop offset="60%" stopColor="#15803d" stopOpacity="0.06" /><stop offset="100%" stopColor="#15803d" stopOpacity="0" /></>) : (<><stop offset="0%" stopColor="#b91c1c" stopOpacity="0.22" /><stop offset="60%" stopColor="#b91c1c" stopOpacity="0.06" /><stop offset="100%" stopColor="#b91c1c" stopOpacity="0" /></>)}
        </linearGradient>
        <linearGradient id="pfTrajStroke" x1="0" y1="0" x2="1" y2="0">
          {up ? (<><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#15803d" /></>) : (<><stop offset="0%" stopColor="#f87171" /><stop offset="100%" stopColor="#b91c1c" /></>)}
        </linearGradient>
      </defs>
      <line x1={PAD_X} y1={PAD_Y} x2={W - PAD_X} y2={PAD_Y} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 6" />
      <line x1={PAD_X} y1={H - PAD_Y} x2={W - PAD_X} y2={H - PAD_Y} stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 6" />
      <path d={"M " + PAD_X + " " + y0 + " L " + (W - PAD_X) + " " + y1 + " L " + (W - PAD_X) + " " + (H - PAD_Y) + " L " + PAD_X + " " + (H - PAD_Y) + " Z"} fill="url(#pfTrajFill)" />
      <path d={"M " + PAD_X + " " + y0 + " L " + (W - PAD_X) + " " + y1} fill="none" stroke="url(#pfTrajStroke)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={PAD_X} cy={y0} r="5" fill="#fff" stroke="var(--color-text-muted)" strokeWidth="2" />
      <circle cx={W - PAD_X} cy={y1} r="9" fill={stroke} opacity="0.15" />
      <circle cx={W - PAD_X} cy={y1} r="5" fill={stroke} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

function SectorDonut({ view }: { view: PortfolioView }) {
  const { holdings, portfolio, totalValue } = view;
  const bySector = new Map<string, number>();
  for (const h of holdings) {
    const key = h.sector ?? "Unclassified";
    bySector.set(key, (bySector.get(key) ?? 0) + (h.currentValue ?? 0));
  }
  const segments: { label: string; value: number; color: string }[] = [];
  const sortedSectors = [...bySector.entries()].sort((a, b) => b[1] - a[1]);
  sortedSectors.forEach(([sector, value], i) => {
    segments.push({ label: sector, value, color: PALETTE[i % PALETTE.length] });
  });
  if (portfolio.cash > 0) {
    segments.push({ label: "Cash", value: portfolio.cash, color: "#cbd5e1" });
  }
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 60;
  const C = 2 * Math.PI * R;
  let cumulative = 0;
  return (
    <div className="praxis-pf-donut-wrap">
      <div className="praxis-pf-donut-stack">
        <svg viewBox="0 0 160 160" className="praxis-pf-donut">
          <circle cx="80" cy="80" r={R} fill="none" stroke="var(--color-border)" strokeWidth="18" opacity="0.5" />
          {segments.map((seg, i) => {
            const frac = seg.value / total;
            const dashLen = frac * C;
            const dashArray = dashLen + " " + (C - dashLen);
            const offset = -cumulative * C;
            cumulative += frac;
            return (
              <circle key={i} cx="80" cy="80" r={R} fill="none" stroke={seg.color} strokeWidth="18"
                strokeDasharray={dashArray} strokeDashoffset={offset} transform="rotate(-90 80 80)" strokeLinecap="butt" />
            );
          })}
        </svg>
        <div className="praxis-pf-donut-center">
          <span className="praxis-pf-donut-center-label">Total</span>
          <span className="praxis-pf-donut-center-value">{formatKsh(totalValue)}</span>
        </div>
      </div>
      {segments.length > 0 ? (
        <ul className="praxis-pf-legend">
          {segments.map((seg, i) => {
            const pct = (seg.value / total) * 100;
            return (
              <li key={i} className="praxis-pf-legend-row">
                <span className="praxis-pf-legend-dot" style={{ background: seg.color }} />
                <span className="praxis-pf-legend-label">{seg.label}</span>
                <span className="praxis-pf-legend-bar">
                  <span className="praxis-pf-legend-bar-fill" style={{ width: pct.toFixed(1) + "%", background: seg.color }} />
                </span>
                <span className="praxis-pf-legend-value">{pct.toFixed(1)}%</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="praxis-pf-panel-empty">Appears once you own positions.</p>
      )}
    </div>
  );
}
