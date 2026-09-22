import { cookies } from "next/headers";
import Link from "next/link";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { buildPortfolioView } from "@/lib/practice/api";
import { formatKsh } from "@/lib/practice/math";
import "../practice.css";
import Arrow from "@/components/ui/Arrow";

export const dynamic = "force-dynamic";
export const metadata = { title: "Journal" };

export default async function JournalPage() {
  const cookieStore = await cookies();
  const req = new Request("http://local/", { headers: { cookie: cookieStore.toString() } });
  const userId = await getUserIdFromRequest(req);
  const view = userId ? await buildPortfolioView(userId).catch(() => null) : null;

  return (
    <div className="praxis-practice">
      <Link href="/portfolio" className="praxis-practice-back">
        <Arrow size={14} direction="left" />
        <span>Back to portfolio</span>
      </Link>

      <header className="praxis-practice-header">
        <h1 className="praxis-practice-title">Journal</h1>
        <p className="praxis-practice-trade-sub">Every trade, with the reason you gave.</p>
      </header>

      {!view || view.trades.length === 0 ? (
        <div className="praxis-practice-empty-state">
          <h2 className="praxis-practice-empty-title">No trades recorded yet.</h2>
          <p className="praxis-practice-empty-body">Place your first trade to begin your journal.</p>
        </div>
      ) : (
        <ul className="praxis-practice-journal">
          {view.trades.map((t) => (
            <li key={t.id} className="praxis-practice-journal-item">
              <div className="praxis-practice-journal-top">
                <span className={"praxis-practice-journal-side " + (t.side === "buy" ? "is-buy" : "is-sell")}>
                  {t.side === "buy" ? "Bought" : "Sold"}
                </span>
                <span className="praxis-practice-journal-ticker">{t.ticker}</span>
                <span className="praxis-practice-journal-shares">{t.shares} @ {formatKsh(t.price)}</span>
                <span className="praxis-practice-journal-total">{formatKsh(t.total)}</span>
                <span className="praxis-practice-journal-date">
                  {new Date(t.executed_at).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              {t.reason ? <div className="praxis-practice-journal-reason">&ldquo;{t.reason}&rdquo;</div> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
