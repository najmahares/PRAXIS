"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import type { PortfolioView } from "@/lib/practice/types";
import { formatKsh } from "@/lib/practice/math";
import "./../practice.css";

type KenyaStockLocal = {
  ticker: string;
  name: string;
  priceKsh: number;
  changePct: number;
};

function TradeInner() {
  const params = useSearchParams();
  const router = useRouter();
  const initialTicker = (params.get("ticker") ?? "").toUpperCase();

  const [view, setView] = useState<PortfolioView | null>(null);
  const [stocks, setStocks] = useState<KenyaStockLocal[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState(initialTicker);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch("/api/practice/portfolio", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/market", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([p, m]) => {
        if (!mounted) return;
        setView(p?.view ?? null);
        setStocks(m?.stocks ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const selected = useMemo(() => stocks.find((s) => s.ticker === ticker) ?? null, [stocks, ticker]);
  const ownedShares = useMemo(() => {
    if (!view) return 0;
    return view.holdings.find((x) => x.ticker === ticker)?.shares ?? 0;
  }, [view, ticker]);

  const shareCount = Number(shares);
  const total = selected && Number.isFinite(shareCount) && shareCount > 0 ? shareCount * selected.priceKsh : 0;
  const cashAfter = view ? view.portfolio.cash - (side === "buy" ? total : -total) : 0;
  const positionPct = view && view.totalValue > 0 ? (total / view.totalValue) * 100 : 0;

  async function execute() {
    if (!ticker || !Number.isFinite(shareCount) || shareCount <= 0) {
      setError("Enter a share count greater than zero.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/practice/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticker, side, shares: shareCount, reason: reason.trim() || undefined }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(humanError(data));
        return;
      }
      setSuccess((side === "buy" ? "Bought " : "Sold ") + shareCount + " " + ticker);
      setTimeout(() => router.push("/portfolio"), 900);
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  
  if (loading) {
    return (
      <div className="praxis-page-loading">
        <div className="praxis-page-loading-inner">
          <span className="praxis-page-loading-spinner" aria-hidden="true" />
          <span className="praxis-page-loading-text">Loading trade ticket…</span>
        </div>
      </div>
    );
  }

  
  if (!view) {
    return (
      <div className="praxis-practice">
        <div className="praxis-practice-empty">
          <h1 className="praxis-practice-empty-title">Set up a portfolio first</h1>
          <Link href="/portfolio/setup" className="praxis-practice-primary">Choose starting capital</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="praxis-practice-trade">
      <Link href="/portfolio" className="praxis-practice-back">
        <span aria-hidden="true">{"\u2190"}</span>
        <span>Back to portfolio</span>
      </Link>

      <header className="praxis-practice-trade-header">
        <h1 className="praxis-practice-title">Place a trade</h1>
        <p className="praxis-practice-trade-sub">Cash available: {formatKsh(view.portfolio.cash)}</p>
      </header>

      {success ? <div className="praxis-practice-success">{success}</div> : null}

      <div className="praxis-practice-trade-card">
        <label className="praxis-practice-field">
          <span className="praxis-practice-field-label">Ticker</span>
          <select value={ticker} onChange={(e) => setTicker(e.target.value)} className="praxis-practice-select">
            <option value="">Select a company</option>
            {stocks.map((s) => (
              <option key={s.ticker} value={s.ticker}>{s.ticker}, {s.name}</option>
            ))}
          </select>
        </label>

        {selected ? (
          <div className="praxis-practice-quote">
            <span className="praxis-practice-quote-ticker">{selected.ticker}</span>
            <span className="praxis-practice-quote-name">{selected.name}</span>
            <span className={"praxis-practice-quote-price " + (selected.changePct >= 0 ? "is-up" : "is-down")}>
              {formatKsh(selected.priceKsh)} {selected.changePct >= 0 ? "+" : ""}{selected.changePct.toFixed(2)}%
            </span>
          </div>
        ) : null}

        <div className="praxis-practice-side-row" role="tablist">
          <button type="button" role="tab" aria-pressed={side === "buy"} onClick={() => setSide("buy")} className={"praxis-practice-side" + (side === "buy" ? " is-active" : "")}>
            Buy
          </button>
          <button type="button" role="tab" aria-pressed={side === "sell"} onClick={() => setSide("sell")} className={"praxis-practice-side" + (side === "sell" ? " is-active" : "")}>
            Sell {ownedShares > 0 ? "(" + ownedShares + " held)" : ""}
          </button>
        </div>

        <label className="praxis-practice-field">
          <span className="praxis-practice-field-label">
            Shares {side === "sell" && ownedShares > 0 ? "(max " + ownedShares + ")" : ""}
          </span>
          <input type="number" value={shares} onChange={(e) => setShares(e.target.value)} className="praxis-practice-input" placeholder="0" min="0" />
        </label>

        <label className="praxis-practice-field">
          <span className="praxis-practice-field-label">Why are you making this trade? (optional)</span>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="praxis-practice-input" placeholder="One sentence. This goes into your journal." maxLength={300} />
        </label>

        {selected && total > 0 ? (
          <div className="praxis-practice-summary">
            <Row label="Price" value={formatKsh(selected.priceKsh)} />
            <Row label="Shares" value={String(shareCount)} />
            <Row label={side === "buy" ? "Total cost" : "Total proceeds"} value={formatKsh(total)} />
            <Row label="Cash after" value={formatKsh(Math.max(0, cashAfter))} />
            {side === "buy" ? <Row label="Position size" value={positionPct.toFixed(2) + "% of portfolio"} /> : null}
          </div>
        ) : null}

        {error ? <div className="praxis-practice-error">{error}</div> : null}

        <div className="praxis-practice-trade-actions">
          <Link href="/portfolio" className="praxis-practice-secondary">Cancel</Link>
          <button type="button" className="praxis-practice-primary" onClick={execute} disabled={busy || !selected || total <= 0}>
            {busy ? "Placing…" : side === "buy" ? "Confirm buy" : "Confirm sell"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="praxis-practice-summary-row">
      <span className="praxis-practice-summary-label">{label}</span>
      <span className="praxis-practice-summary-value">{value}</span>
    </div>
  );
}

function humanError(data: { error?: string; cash?: number; needed?: number; owned?: number }): string {
  switch (data.error) {
    case "insufficient_cash":
      return "Not enough cash. Need " + formatKsh(data.needed ?? 0) + ", have " + formatKsh(data.cash ?? 0) + ".";
    case "insufficient_shares":
      return "You own " + (data.owned ?? 0) + " shares of this ticker.";
    case "no_quote":
      return "Live quote unavailable for this ticker. Try again in a minute.";
    case "concurrent_trade":
      return "Another trade was processed at the same time. Try again.";
    case "no_portfolio":
      return "Portfolio not found. Set one up first.";
    default:
      return "Trade could not be placed. Try again.";
  }
}

export default function TradePage() {
  return (
    <Suspense fallback={
      <div className="praxis-page-loading">
        <div className="praxis-page-loading-inner">
          <span className="praxis-page-loading-spinner" aria-hidden="true" />
          <span className="praxis-page-loading-text">Loading trade ticket…</span>
        </div>
      </div>
    }>
      <TradeInner />
    </Suspense>
  );
}
