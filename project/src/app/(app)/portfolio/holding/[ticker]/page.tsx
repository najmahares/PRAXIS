import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserIdFromRequest, cookieHeaderFrom } from "@/lib/practice/session";
import { buildPortfolioView } from "@/lib/practice/api";
import { formatKsh, formatPct } from "@/lib/practice/math";
import "../../practice.css";
import Arrow from "@/components/ui/Arrow";

export const dynamic = "force-dynamic";

export default async function HoldingPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();

  const cookieStore = await cookies();
  const cookieHeader = cookieHeaderFrom(cookieStore);
  const req = new Request("http://local/", { headers: { cookie: cookieHeader } });
  const userId = await getUserIdFromRequest(req);

  if (!userId) notFound();
  const view = await buildPortfolioView(userId).catch(() => null);
  if (!view) notFound();

  const holding = view.holdings.find((h) => h.ticker === upper);
  if (!holding) notFound();

  const trades = view.trades
    .filter((t) => t.ticker === upper)
    .sort(
      (a, b) =>
        new Date(b.executed_at).getTime() - new Date(a.executed_at).getTime()
    );

  const up = (holding.unrealizedPnl ?? 0) >= 0;
  const portfolioPct = holding.portfolioPct ?? 0;

  return (
    <div className="praxis-card-run">
      <Link href="/portfolio" className="praxis-practice-back">
        <Arrow size={14} direction="left" />
        <span>Back to portfolio</span>
      </Link>

      <header className="praxis-holding-hero">
        <div className="praxis-holding-hero-left">
          <span className="praxis-holding-tag">Holding</span>
          <h1 className="praxis-holding-name">
            {holding.ticker}
            {holding.name ? (
              <span className="praxis-holding-fullname">{holding.name}</span>
            ) : null}
          </h1>
          {holding.sector ? (
            <span className="praxis-holding-sector">{holding.sector}</span>
          ) : null}
        </div>

        <div className="praxis-holding-hero-right">
          <span className="praxis-holding-value-label">Position value</span>
          <span className="praxis-holding-value">
            {holding.currentValue === null
              ? "-"
              : formatKsh(holding.currentValue)}
          </span>
          {holding.unrealizedPnl !== null ? (
            <span
              className={
                "praxis-holding-pnl-big " + (up ? "is-up" : "is-down")
              }
            >
              {up ? "▲" : "▼"} {formatPct(holding.unrealizedPnlPct ?? 0)} ·{" "}
              {up ? "+" : ""}
              {formatKsh(Math.abs(holding.unrealizedPnl))}
            </span>
          ) : null}
        </div>
      </header>

      <section className="praxis-holding-stats">
        <Stat label="Shares" value={String(holding.shares)} />
        <Stat label="Avg cost" value={formatKsh(holding.averageCost)} />
        <Stat
          label="Current price"
          value={
            holding.currentPrice === null
              ? "-"
              : formatKsh(holding.currentPrice)
          }
        />
        <Stat label="Cost basis" value={formatKsh(holding.totalCost)} />
        <Stat
          label="Portfolio weight"
          value={portfolioPct.toFixed(1) + "%"}
        />
        <Stat
          label="Days held"
          value={holding.daysHeld === 0 ? "today" : String(holding.daysHeld)}
        />
      </section>

      {holding.lastReason ? (
        <section className="praxis-holding-thesis">
          <span className="praxis-holding-thesis-label">
            Your most recent note
          </span>
          <p className="praxis-holding-thesis-body">
            &ldquo;{holding.lastReason}&rdquo;
          </p>
          <Link href="/portfolio/journal" className="praxis-holding-thesis-link">
            Open journal <Arrow size={14} />
          </Link>
        </section>
      ) : null}

      <section className="praxis-holding-trades">
        <div className="praxis-holding-trades-head">
          <h2 className="praxis-holding-trades-title">
            {trades.length} {trades.length === 1 ? "trade" : "trades"}
          </h2>
          <Link href="/portfolio/journal" className="praxis-holding-trades-link">
            All journal <Arrow size={14} />
          </Link>
        </div>
        <ul className="praxis-holding-trades-list">
          {trades.map((t) => (
            <li key={t.id} className="praxis-holding-trade">
              <span
                className={
                  "praxis-holding-trade-side " +
                  (t.side === "buy" ? "is-buy" : "is-sell")
                }
              >
                {t.side === "buy" ? "Bought" : "Sold"}
              </span>
              <span className="praxis-holding-trade-detail">
                {t.shares} @ {formatKsh(t.price)}
              </span>
              <span className="praxis-holding-trade-total">
                {formatKsh(t.total)}
              </span>
              <span className="praxis-holding-trade-date">
                {new Date(t.executed_at).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="praxis-holding-actions">
        <Link
          href={"/portfolio/trade?ticker=" + holding.ticker}
          className="praxis-practice-primary"
        >
          Trade {holding.ticker}
        </Link>
        <Link
          href={"/market/" + holding.ticker}
          className="praxis-practice-secondary"
        >
          View on Market
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="praxis-holding-stat">
      <span className="praxis-holding-stat-label">{label}</span>
      <span className="praxis-holding-stat-value">{value}</span>
    </div>
  );
}
