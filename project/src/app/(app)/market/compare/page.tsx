import Link from "next/link";
import { getCompany } from "@/lib/market/companies";
import { getKenyaStocks, type KenyaStock } from "@/lib/market/mcp";
import "../market.css";

export const revalidate = 300;

export const metadata = { title: "Compare" };

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string; b?: string }>;
}) {
  const { a, b } = await searchParams;
  const tickerA = (a ?? "").toUpperCase();
  const tickerB = (b ?? "").toUpperCase();

  const stocks = await getKenyaStocks().catch(() => [] as KenyaStock[]);
  const liveByTicker = new Map(stocks.map((s) => [s.ticker, s]));
  const staticA = tickerA ? getCompany(tickerA) : null;
  const staticB = tickerB ? getCompany(tickerB) : null;
  const liveA = tickerA ? liveByTicker.get(tickerA) ?? null : null;
  const liveB = tickerB ? liveByTicker.get(tickerB) ?? null : null;

  const notFoundA = Boolean(tickerA) && !staticA && !liveA;
  const notFoundB = Boolean(tickerB) && !staticB && !liveB;

  return (
    <div>
      <header className="praxis-market-header">
        <h1 className="praxis-market-title">Compare companies</h1>
        <p className="praxis-market-subtitle">
          Pick two NSE tickers and see how they line up on the metrics that matter.
        </p>
      </header>

      <form method="get" className="praxis-compare-form">
        <label className="praxis-compare-field">
          <span>Company A</span>
          <input name="a" defaultValue={tickerA} placeholder="e.g. SCOM" />
        </label>
        <label className="praxis-compare-field">
          <span>Company B</span>
          <input name="b" defaultValue={tickerB} placeholder="e.g. EQTY" />
        </label>
        <button type="submit" className="praxis-compare-submit">Compare</button>
      </form>

      {notFoundA || notFoundB ? (
        <div className="praxis-market-empty">
          <h2 className="praxis-market-empty-title">
            We could not find {notFoundA && notFoundB ? "either ticker" : notFoundA ? tickerA : tickerB}.
          </h2>
          <p className="praxis-market-empty-body">
            Try two NSE-listed tickers such as SCOM, EQTY, KCB, ABSA, EABL, or BAMB.
          </p>
        </div>
      ) : tickerA && tickerB ? (
        <div className="praxis-compare-grid">
          <CompareSide ticker={tickerA} company={staticA} live={liveA} />
          <CompareSide ticker={tickerB} company={staticB} live={liveB} />
        </div>
      ) : (
        <div className="praxis-market-empty">
          <h2 className="praxis-market-empty-title">Enter two tickers to compare.</h2>
          <p className="praxis-market-empty-body">
            Try SCOM, EQTY, KCB, ABSA, EABL, BAMB, or any other NSE-listed ticker.
          </p>
        </div>
      )}
    </div>
  );
}

function CompareSide({
  ticker,
  company,
  live,
}: {
  ticker: string;
  company: ReturnType<typeof getCompany>;
  live: KenyaStock | null;
}) {
  const name = company?.name ?? live?.name ?? ticker;
  const price = live?.priceKsh ?? company?.priceKsh ?? 0;
  const changePct = live?.changePct ?? null;
  const sector = company?.sector ?? live?.sector ?? "-";

  return (
    <section className="praxis-compare-side">
      <header className="praxis-compare-side-header">
        <Link href={"/market/" + ticker} className="praxis-compare-ticker">
          {ticker}
        </Link>
        <h2 className="praxis-compare-name">{name}</h2>
        <span className="praxis-compare-sector">{sector}</span>
      </header>

      <dl className="praxis-compare-list">
        <Row label="Price" value={"KSh " + price.toFixed(2)} />
        <Row
          label="Today"
          value={
            changePct === null
              ? "-"
              : (changePct >= 0 ? "+" : "") + changePct.toFixed(2) + "%"
          }
        />
        <Row
          label="Market cap"
          value={company && company.marketCapB > 0 ? "KSh " + company.marketCapB + "B" : "-"}
        />
        <Row
          label="P/E"
          value={company && company.pe !== null ? company.pe.toFixed(1) : "-"}
        />
        <Row
          label="Dividend yield"
          value={
            company && company.dividendYieldPct !== null
              ? company.dividendYieldPct.toFixed(2) + "%"
              : "-"
          }
        />
        <Row
          label="EPS"
          value={company && company.eps !== null ? "KSh " + company.eps.toFixed(2) : "-"}
        />
        <Row label="Revenue" value={company && company.revenueB > 0 ? "KSh " + company.revenueB + "B" : "-"} />
        <Row label="Net income" value={company && company.netIncomeB > 0 ? "KSh " + company.netIncomeB + "B" : "-"} />
      </dl>

      {company ? (
        <div className="praxis-compare-notes">
          <div className="praxis-detail-note praxis-detail-note-strength">
            <span className="praxis-detail-note-title">Strengths</span>
            <p className="praxis-detail-note-body">{company.strengthNote}</p>
          </div>
          <div className="praxis-detail-note praxis-detail-note-risk">
            <span className="praxis-detail-note-title">Risks</span>
            <p className="praxis-detail-note-body">{company.riskNote}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="praxis-compare-row">
      <dt className="praxis-compare-label">{label}</dt>
      <dd className="praxis-compare-value">{value}</dd>
    </div>
  );
}
