"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  COMPANIES,
  getAllSectors,
  type Company,
  type Sector,
} from "@/lib/market/companies";
import { getSectorForTicker } from "@/lib/market/tickerSectors";
import type { KenyaIndex, KenyaMover, KenyaStock } from "@/lib/market/types";
import "./market.css";

type SortKey = "marketCap" | "ticker" | "pe" | "dividend" | "change";

type MergedCompany = Company & {
  livePrice: number | null;
  liveChangePct: number | null;
  liveVolume: number | null;
  isLive: boolean;
};

const PAGE_SIZE = 12;
const HARD_CAP = 60;

function merge(stocks: KenyaStock[]): MergedCompany[] {
  const live = new Map(stocks.map((s) => [s.ticker, s]));
  const merged: MergedCompany[] = COMPANIES.map((c) => {
    const q = live.get(c.ticker);
    return {
      ...c,
      livePrice: q?.priceKsh ?? null,
      liveChangePct: q?.changePct ?? null,
      liveVolume: q?.volume ?? null,
      isLive: Boolean(q),
    };
  });

  const known = new Set(COMPANIES.map((c) => c.ticker));
  for (const s of stocks) {
    if (known.has(s.ticker)) continue;
    const inferredSector = (s.sector ?? getSectorForTicker(s.ticker) ?? "Commercial Services") as Sector;
    merged.push({
      ticker: s.ticker,
      name: s.name,
      sector: inferredSector,
      description: "Live NSE listing.",
      priceKsh: s.priceKsh,
      marketCapB: s.marketCapB ?? 0,
      pe: null,
      eps: null,
      dividendKsh: null,
      dividendYieldPct: null,
      revenueB: 0,
      netIncomeB: 0,
      fiscalYear: "-",
      fiscalPeriodEnded: "-",
      riskNote: "Not covered by PRAXIS fundamentals yet.",
      strengthNote: "Live NSE listing.",
      livePrice: s.priceKsh,
      liveChangePct: s.changePct,
      liveVolume: s.volume,
      isLive: true,
    });
  }
  return merged;
}

function useDebounced<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export default function MarketClient({
  stocks,
  movers,
  index,
}: {
  stocks: KenyaStock[];
  movers: { gainers: KenyaMover[]; losers: KenyaMover[] };
  index: KenyaIndex | null;
}) {
  const sectors = useMemo(() => getAllSectors(), []);
  const [activeSector, setActiveSector] = useState<Sector | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const debouncedQuery = useDebounced(query, 180);
  const all = useMemo(() => merge(stocks), [stocks]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    let result = all;
    if (activeSector !== "all") {
      result = result.filter((c) => c.sector === activeSector);
    }
    if (q) {
      result = result.filter(
        (c) =>
          c.ticker.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      );
    }
    const sorted = [...result].sort((a, b) => {
      if (sortKey === "ticker") return a.ticker.localeCompare(b.ticker);
      if (sortKey === "pe") return (a.pe ?? 9999) - (b.pe ?? 9999);
      if (sortKey === "dividend")
        return (b.dividendYieldPct ?? -1) - (a.dividendYieldPct ?? -1);
      if (sortKey === "change")
        return (b.liveChangePct ?? -9999) - (a.liveChangePct ?? -9999);
      return b.marketCapB - a.marketCapB;
    });
    return sorted;
  }, [all, activeSector, debouncedQuery, sortKey]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeSector, debouncedQuery, sortKey]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const liveCount = all.filter((c) => c.isLive).length;
  const pulseLine = buildPulseLine(index, movers, liveCount);

  return (
    <div>
      <header className="praxis-market-header">
        <h1 className="praxis-market-title">Market</h1>
        <p className="praxis-market-subtitle">
          Live NSE quotes, sector view, and the movers that matter today.
        </p>
        <span className="praxis-market-snapshot">
          {index?.scrapedAt ? (
            <>
              Last updated{" "}
              <strong>{new Date(index.scrapedAt).toLocaleString("en-KE")}</strong>{" "}
              · source: Mansa Markets
            </>
          ) : (
            <>Live quote feed temporarily unavailable · showing snapshot</>
          )}
        </span>
      </header>

      <section className="praxis-market-pulse" aria-label="Market pulse">
        <p className="praxis-market-pulse-text">{pulseLine}</p>
        {index ? (
          <div className="praxis-market-pulse-index">
            <span className="praxis-market-pulse-index-name">{index.name}</span>
            <span className="praxis-market-pulse-index-value">
              {index.value.toFixed(2)}
            </span>
            {index.changePct !== null ? (
              <span
                className={
                  "praxis-market-pulse-index-change " +
                  (index.changePct >= 0 ? "is-up" : "is-down")
                }
              >
                {index.changePct >= 0 ? "+" : ""}
                {index.changePct.toFixed(2)}%
              </span>
            ) : null}
          </div>
        ) : null}
      </section>

      {(movers.gainers.length > 0 || movers.losers.length > 0) ? (
        <section className="praxis-market-movers" aria-label="Today's movers">
          <MoversColumn title="Top gainers" items={movers.gainers} />
          <MoversColumn title="Top losers" items={movers.losers} />
        </section>
      ) : null}

      <div className="praxis-market-search-row">
        <input
          type="search"
          className="praxis-market-search"
          placeholder="Search by ticker or company name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search companies"
        />
        {query ? (
          <button
            type="button"
            className="praxis-market-search-clear"
            onClick={() => setQuery("")}
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="praxis-market-filters" role="tablist" aria-label="Filter by sector">
        <button
          type="button"
          role="tab"
          aria-pressed={activeSector === "all"}
          className="praxis-market-chip"
          onClick={() => setActiveSector("all")}
        >
          All sectors
        </button>
        {sectors.map((sector) => (
          <button
            key={sector}
            type="button"
            role="tab"
            aria-pressed={activeSector === sector}
            className="praxis-market-chip"
            onClick={() => setActiveSector(sector)}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="praxis-market-meta">
        <span>
          Showing {visible.length} of {filtered.length}{" "}
          {filtered.length === 1 ? "company" : "companies"}
          {activeSector !== "all" ? " in " + activeSector : ""}
          {debouncedQuery ? " matching \u201c" + debouncedQuery + "\u201d" : ""}
        </span>
        <label className="praxis-market-sort">
          <span>Sort by</span>
          <select
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
          >
            <option value="marketCap">Market cap</option>
            <option value="change">Today&rsquo;s change</option>
            <option value="ticker">Ticker</option>
            <option value="pe">P/E ratio</option>
            <option value="dividend">Dividend yield</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="praxis-market-empty">
          <h2 className="praxis-market-empty-title">No companies match.</h2>
          <p className="praxis-market-empty-body">
            Try a different sector, or clear the search.
          </p>
        </div>
      ) : (
        <>
          <div className="praxis-market-grid">
            {visible.map((company) => (
              <CompanyCard key={company.ticker} company={company} />
            ))}
          </div>
          {hasMore ? (
            <div className="praxis-market-loadmore-row">
              <button
                type="button"
                className="praxis-market-loadmore"
                onClick={() =>
                  setVisibleCount((n) => Math.min(n + PAGE_SIZE, HARD_CAP))
                }
                disabled={visibleCount >= HARD_CAP}
              >
                {visibleCount >= HARD_CAP
                  ? "Showing first " + HARD_CAP
                  : "Show " + Math.min(PAGE_SIZE, filtered.length - visibleCount) + " more"}
              </button>
              <button
                type="button"
                className="praxis-market-loadmore-secondary"
                onClick={() =>
                  setVisibleCount(Math.min(filtered.length, HARD_CAP))
                }
                disabled={visibleCount >= HARD_CAP}
              >
                Show first {Math.min(filtered.length, HARD_CAP)}
              </button>
            </div>
          ) : null}
          {filtered.length > HARD_CAP ? (
            <p className="praxis-market-cap-note">
              Refine by sector or search to see beyond the first {HARD_CAP}.
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

function buildPulseLine(
  index: KenyaIndex | null,
  movers: { gainers: KenyaMover[]; losers: KenyaMover[] },
  liveCount: number
): string {
  if (!index && liveCount === 0) {
    return "Live feed is not responding right now. Fundamentals remain available on every company page.";
  }
  const parts: string[] = [];
  if (index) {
    const dir = (index.changePct ?? 0) >= 0 ? "up" : "down";
    parts.push(
      "The " +
        index.name +
        " is " +
        dir +
        " " +
        Math.abs(index.changePct ?? 0).toFixed(2) +
        "% today at " +
        index.value.toFixed(2) +
        "."
    );
  }
  if (movers.gainers.length > 0) {
    const top = movers.gainers[0];
    parts.push("Leading gainer is " + top.ticker + " at +" + top.changePct.toFixed(2) + "%.");
  }
  if (movers.losers.length > 0) {
    const bot = movers.losers[0];
    parts.push("Leading decliner is " + bot.ticker + " at " + bot.changePct.toFixed(2) + "%.");
  }
  return parts.join(" ");
}

function MoversColumn({ title, items }: { title: string; items: KenyaMover[] }) {
  if (items.length === 0) return null;
  return (
    <div className="praxis-market-movers-col">
      <span className="praxis-market-movers-title">{title}</span>
      <ul className="praxis-market-movers-list">
        {items.map((m) => (
          <li key={m.ticker} className="praxis-market-movers-item">
            <Link href={"/market/" + m.ticker} className="praxis-market-movers-link">
              <span className="praxis-market-movers-ticker">{m.ticker}</span>
              <span className="praxis-market-movers-price">
                KSh {m.priceKsh.toFixed(2)}
              </span>
              <span
                className={
                  "praxis-market-movers-change " +
                  (m.changePct >= 0 ? "is-up" : "is-down")
                }
              >
                {m.changePct >= 0 ? "+" : ""}
                {m.changePct.toFixed(2)}%
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CompanyCard({ company }: { company: MergedCompany }) {
  const sectorClass =
    "praxis-market-sector praxis-market-sector-" +
    company.sector.toLowerCase().replace(/\s+/g, "-");

  const displayPrice = company.livePrice ?? company.priceKsh;
  const changeClass =
    company.liveChangePct === null
      ? "praxis-market-price-change"
      : company.liveChangePct >= 0
        ? "praxis-market-price-change is-up"
        : "praxis-market-price-change is-down";

  const hasMarketCap = company.marketCapB > 0;
  const hasPe = company.pe !== null;
  const hasYield = company.dividendYieldPct !== null;
  const hasAnyStat = hasMarketCap || hasPe || hasYield;

  return (
    <Link href={"/market/" + company.ticker} className="praxis-market-card">
      <div className="praxis-market-card-top">
        <div>
          <span className="praxis-market-card-ticker">{company.ticker}</span>
          <h2 className="praxis-market-card-name">{company.name}</h2>
        </div>
        <span className={sectorClass}>{company.sector}</span>
      </div>

      <div className="praxis-market-card-price">
        <span className="praxis-market-price-value">
          KSh {displayPrice.toFixed(2)}
        </span>
        {company.liveChangePct !== null ? (
          <span className={changeClass}>
            {company.liveChangePct >= 0 ? "+" : ""}
            {company.liveChangePct.toFixed(2)}% today
          </span>
        ) : (
          <span className="praxis-market-price-label">
            {company.isLive ? "Live NSE quote" : "Snapshot price"}
          </span>
        )}
      </div>

      {hasAnyStat ? (
        <div className="praxis-market-card-stats">
          {hasMarketCap ? (
            <div className="praxis-market-stat">
              <span className="praxis-market-stat-label">Market cap</span>
              <span className="praxis-market-stat-value">
                KSh {company.marketCapB}B
              </span>
            </div>
          ) : null}
          {hasPe ? (
            <div className="praxis-market-stat">
              <span className="praxis-market-stat-label">P/E</span>
              <span className="praxis-market-stat-value">
                {company.pe!.toFixed(1)}
              </span>
            </div>
          ) : null}
          {hasYield ? (
            <div className="praxis-market-stat">
              <span className="praxis-market-stat-label">Yield</span>
              <span className="praxis-market-stat-value">
                {company.dividendYieldPct!.toFixed(2)}%
              </span>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="praxis-market-card-stats-note">
          Fundamentals not yet covered, live quote above.
        </div>
      )}
    </Link>
  );
}
