"use client";

import Link from "next/link";
import type { Company } from "@/lib/market/companies";
import type { KenyaStock, HistoryPoint } from "@/lib/market/types";
import "../market.css";

export default function CompanyClient({
  ticker,
  company,
  live,
  history,
}: {
  ticker: string;
  company: Company | null;
  live: KenyaStock | null;
  history: HistoryPoint[];
}) {
  const displayTicker = company?.ticker ?? live?.ticker ?? ticker;
  const displayName = company?.name ?? live?.name ?? ticker;
  const sector = company?.sector ?? live?.sector ?? "Unclassified";
  const displayPrice = live?.priceKsh ?? company?.priceKsh ?? 0;
  const changePct = live?.changePct ?? null;
  const changeKsh = live?.changeKsh ?? null;
  const volume = live?.volume ?? null;

  const sectorClass =
    "praxis-market-sector praxis-market-sector-" +
    String(sector).toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="praxis-terminal">
      <Link href="/market" className="praxis-terminal-back">
        <span className="praxis-terminal-back-arrow" aria-hidden="true">{"\u2190"}</span>
        <span>Back to Market</span>
      </Link>

      <header className="praxis-terminal-hero">
        <div className="praxis-terminal-hero-left">
          <span className="praxis-terminal-ticker">{displayTicker}</span>
          <h1 className="praxis-terminal-name">{displayName}</h1>
          <div className="praxis-terminal-meta">
            <span className={sectorClass}>{sector}</span>
            {live ? (
              <span className="praxis-terminal-badge-live">Live NSE</span>
            ) : (
              <span className="praxis-terminal-badge-stale">Snapshot</span>
            )}
          </div>
        </div>

        <div className="praxis-terminal-hero-right">
          <span className="praxis-terminal-price">
            KSh {displayPrice.toFixed(2)}
          </span>
          {changePct !== null ? (
            <span
              className={
                "praxis-terminal-change " +
                (changePct >= 0 ? "is-up" : "is-down")
              }
            >
              {changePct >= 0 ? "\u25B2" : "\u25BC"}{" "}
              {Math.abs(changePct).toFixed(2)}%
              {changeKsh !== null && changeKsh !== 0
                ? " (" +
                  (changeKsh >= 0 ? "+" : "\u2212") +
                  "KSh " +
                  Math.abs(changeKsh).toFixed(2) +
                  ")"
                : ""}
            </span>
          ) : null}
          <span className="praxis-terminal-source">
            {live
              ? "Delayed NSE quote \u00B7 source: Mansa Markets"
              : "Live quote unavailable \u00B7 showing snapshot"}
          </span>
        </div>
      </header>

      <div className="praxis-terminal-stats">
        <Stat
          label="Volume"
          value={volume === null ? "\u2014" : volume.toLocaleString("en-KE")}
        />
        <Stat
          label="Market cap"
          value={company ? "KSh " + company.marketCapB + "B" : "\u2014"}
        />
        <Stat
          label="P/E"
          value={
            company && company.pe !== null ? company.pe.toFixed(1) : "\u2014"
          }
        />
        <Stat
          label="Dividend yield"
          value={
            company && company.dividendYieldPct !== null
              ? company.dividendYieldPct.toFixed(2) + "%"
              : "\u2014"
          }
        />
      </div>

      <section className="praxis-terminal-chart" aria-label="Price chart">
        <div className="praxis-terminal-chart-header">
          <span className="praxis-terminal-chart-title">Price</span>
          <span className="praxis-terminal-chart-sub">
            {history.length >= 2
              ? history.length +
                " sample" +
                (history.length === 1 ? "" : "s") +
                " \u00B7 since " +
                new Date(history[0].t).toLocaleDateString("en-KE")
              : "History begins once the feed is polled"}
          </span>
        </div>
        <PriceChart
          points={history}
          currentPrice={displayPrice}
          changeKsh={changeKsh}
          ticker={displayTicker}
        />
      </section>

      {company ? (
        <>
          <section className="praxis-terminal-block">
            <h2 className="praxis-terminal-block-title">About</h2>
            <p className="praxis-terminal-block-text">{company.description}</p>
          </section>

          <section className="praxis-terminal-block">
            <h2 className="praxis-terminal-block-title">What to know</h2>
            <div className="praxis-detail-notes">
              <div className="praxis-detail-note praxis-detail-note-strength">
                <span className="praxis-detail-note-title">Strengths</span>
                <p className="praxis-detail-note-body">{company.strengthNote}</p>
              </div>
              <div className="praxis-detail-note praxis-detail-note-risk">
                <span className="praxis-detail-note-title">Risks</span>
                <p className="praxis-detail-note-body">{company.riskNote}</p>
              </div>
            </div>
          </section>

          <section className="praxis-terminal-block">
            <h2 className="praxis-terminal-block-title">Fundamentals</h2>
            <p className="praxis-terminal-block-note">
              Drawn from {company.name}&rsquo;s {company.fiscalYear} report,
              period ended {company.fiscalPeriodEnded}.
            </p>
            <div className="praxis-detail-grid">
              <Stat
                label="Market cap"
                value={"KSh " + company.marketCapB + "B"}
              />
              <Stat
                label="P/E ratio"
                value={company.pe === null ? "\u2014" : company.pe.toFixed(1)}
              />
              <Stat
                label="EPS"
                value={
                  company.eps === null ? "\u2014" : "KSh " + company.eps.toFixed(2)
                }
              />
              <Stat
                label="Dividend"
                value={
                  company.dividendKsh === null
                    ? "\u2014"
                    : "KSh " + company.dividendKsh.toFixed(2)
                }
              />
              <Stat
                label="Dividend yield"
                value={
                  company.dividendYieldPct === null
                    ? "\u2014"
                    : company.dividendYieldPct.toFixed(2) + "%"
                }
              />
              <Stat label="Revenue" value={"KSh " + company.revenueB + "B"} />
              <Stat
                label="Net income"
                value={"KSh " + company.netIncomeB + "B"}
              />
              <Stat label="Fiscal period" value={company.fiscalYear} />
            </div>
          </section>
        </>
      ) : (
        <section className="praxis-terminal-block">
          <h2 className="praxis-terminal-block-title">About</h2>
          <p className="praxis-terminal-block-text">
            PRAXIS does not yet hold fundamentals for {displayTicker}. The live
            quote and chart above are sourced from Mansa Markets.
          </p>
        </section>
      )}

      <div className="praxis-detail-footnote">
        Live price is a delayed NSE quote sourced from Mansa Markets. Fundamentals
        are the last reported annual figures. PRAXIS does not trade real securities
        and this is not investment advice.
      </div>

      <aside className="praxis-terminal-actions" aria-label="Actions">
        <Link
          href={"/portfolio/trade?ticker=" + displayTicker}
          className="praxis-terminal-action praxis-terminal-action-primary"
        >
          Trade {displayTicker}
        </Link>
        <Link
          href={"/practice?ticker=" + displayTicker + "&mode=thesis"}
          className="praxis-terminal-action"
        >
          Build a thesis
        </Link>
        <Link
          href={"/market/compare?a=" + displayTicker}
          className="praxis-terminal-action"
        >
          Compare {displayTicker}
        </Link>
        <Link href="/mentor" className="praxis-terminal-action">
          Ask Jema
        </Link>

        {live ? (
          <div className="praxis-terminal-side-note">
            <span className="praxis-terminal-side-note-title">Quote feed</span>
            <span className="praxis-terminal-side-note-body">
              Prices refresh every 5 minutes while the site is open. Chart history
              accumulates automatically.
            </span>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

function PriceChart({
  points,
  currentPrice,
  changeKsh,
  ticker,
}: {
  points: HistoryPoint[];
  currentPrice: number;
  changeKsh: number | null;
  ticker: string;
}) {
  const W = 900;
  const H = 260;
  const PAD_X = 40;
  const PAD_Y = 26;

  if (points.length >= 2) {
    const prices = points.map((p) => p.p);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const rawRange = max - min;
    const threshold = currentPrice * 0.002; 

    
    
    if (rawRange < threshold) {
      const yMid = H / 2;
      return (
        <div className="praxis-terminal-chart-fallback">
          <svg
            viewBox={"0 0 " + W + " " + H}
            preserveAspectRatio="none"
            className="praxis-terminal-chart-svg"
            role="img"
            aria-label={"Price unchanged for " + ticker}
          >
            <line
              x1={PAD_X}
              y1={H / 2}
              x2={W - PAD_X}
              y2={H / 2}
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
            <line
              x1={PAD_X}
              y1={yMid}
              x2={W - PAD_X}
              y2={yMid}
              stroke="#2563eb"
              strokeWidth="2"
            />
            <circle cx={W - PAD_X} cy={yMid} r="5" fill="#2563eb" />
            <text
              x={W / 2}
              y={yMid - 14}
              textAnchor="middle"
              fill="var(--color-text-muted)"
              fontSize="12"
            >
              {"Price unchanged at KSh " + currentPrice.toFixed(2)}
            </text>
          </svg>
          <div className="praxis-terminal-chart-legend">
            <span className="praxis-terminal-chart-legend-item">
              <span
                className="praxis-terminal-chart-legend-dot"
                style={{ background: "#2563eb" }}
              />
              {points.length} sample{points.length === 1 ? "" : "s"} · no movement yet
            </span>
          </div>
        </div>
      );
    }

    const range = rawRange;
    const stepX = (W - PAD_X * 2) / (points.length - 1);
    const pt = points.map((p, i) => {
      const x = PAD_X + i * stepX;
      const y = PAD_Y + (1 - (p.p - min) / range) * (H - PAD_Y * 2);
      return [x, y] as const;
    });
    const lineD = pt
      .map(([x, y], i) => (i === 0 ? "M" : "L") + " " + x.toFixed(1) + " " + y.toFixed(1))
      .join(" ");
    const areaD =
      lineD +
      " L " +
      pt[pt.length - 1][0].toFixed(1) +
      " " +
      (H - PAD_Y) +
      " L " +
      pt[0][0].toFixed(1) +
      " " +
      (H - PAD_Y) +
      " Z";
    const up = prices[prices.length - 1] >= prices[0];
    const stroke = up ? "#15803d" : "#b91c1c";
    const fill = up ? "rgba(21,128,61,0.08)" : "rgba(185,28,28,0.08)";
    return (
      <svg
        viewBox={"0 0 " + W + " " + H}
        preserveAspectRatio="none"
        className="praxis-terminal-chart-svg"
        role="img"
        aria-label="Price chart"
      >
        <path d={areaD} fill={fill} />
        <path d={lineD} fill="none" stroke={stroke} strokeWidth="2" />
        <circle
          cx={pt[pt.length - 1][0]}
          cy={pt[pt.length - 1][1]}
          r="4"
          fill={stroke}
        />
      </svg>
    );
  }

  const prevClose = changeKsh !== null ? currentPrice - changeKsh : currentPrice;
  const moved = prevClose !== currentPrice;
  const low = Math.min(prevClose, currentPrice);
  const high = Math.max(prevClose, currentPrice);
  const range = high - low || currentPrice * 0.001;
  const yPrev = moved
    ? PAD_Y + (1 - (prevClose - low) / range) * (H - PAD_Y * 2)
    : H / 2;
  const yCurr = moved
    ? PAD_Y + (1 - (currentPrice - low) / range) * (H - PAD_Y * 2)
    : H / 2;
  const up = currentPrice >= prevClose;
  const stroke = up ? "#15803d" : "#b91c1c";
  const x0 = PAD_X;
  const x1 = W - PAD_X;

  return (
    <div className="praxis-terminal-chart-fallback">
      <svg
        viewBox={"0 0 " + W + " " + H}
        preserveAspectRatio="none"
        className="praxis-terminal-chart-svg"
        role="img"
        aria-label={"Today's move for " + ticker}
      >
        <line
          x1={PAD_X}
          y1={H / 2}
          x2={W - PAD_X}
          y2={H / 2}
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        {moved ? (
          <>
            <rect
              x={x0}
              y={Math.min(yPrev, yCurr)}
              width={x1 - x0}
              height={Math.max(2, Math.abs(yCurr - yPrev))}
              fill={up ? "rgba(21,128,61,0.14)" : "rgba(185,28,28,0.14)"}
            />
            <line
              x1={x0}
              y1={yPrev}
              x2={x1}
              y2={yPrev}
              stroke="var(--color-text-muted)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            <line x1={x0} y1={yCurr} x2={x1} y2={yCurr} stroke={stroke} strokeWidth="2" />
            <circle cx={x1} cy={yCurr} r="5" fill={stroke} />
            <circle cx={x0} cy={yPrev} r="3" fill="var(--color-text-muted)" />
          </>
        ) : (
          <line x1={x0} y1={H / 2} x2={x1} y2={H / 2} stroke={stroke} strokeWidth="2" />
        )}
        <text
          x={PAD_X - 6}
          y={yPrev + 4}
          textAnchor="end"
          fill="var(--color-text-muted)"
          fontSize="11"
        >
          prev
        </text>
        <text x={PAD_X - 6} y={yCurr + 4} textAnchor="end" fill={stroke} fontSize="11">
          now
        </text>
      </svg>
      <div className="praxis-terminal-chart-legend">
        <span className="praxis-terminal-chart-legend-item">
          <span
            className="praxis-terminal-chart-legend-dot"
            style={{ background: "var(--color-text-muted)" }}
          />
          Previous close KSh {prevClose.toFixed(2)}
        </span>
        <span className="praxis-terminal-chart-legend-item">
          <span
            className="praxis-terminal-chart-legend-dot"
            style={{ background: stroke }}
          />
          Current KSh {currentPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="praxis-detail-stat">
      <span className="praxis-detail-stat-label">{label}</span>
      <span className="praxis-detail-stat-value">{value}</span>
    </div>
  );
}
