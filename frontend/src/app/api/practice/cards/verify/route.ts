import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { buildPortfolioView } from "@/lib/practice/api";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getCard, type MissionVerify, type PracticeCard } from "@/lib/practice/cards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function resolveCard(id: string, userId: string | null): Promise<PracticeCard | null> {
  const seed = getCard(id);
  if (seed) return seed;
  if (!userId) return null;
  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data } = await sb
    .from("practice_generated_cards")
    .select("payload")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (!data?.payload) return null;
  return data.payload as PracticeCard;
}

function checkMission(
  verify: MissionVerify,
  view: Awaited<ReturnType<typeof buildPortfolioView>>
): { passed: boolean; detail: string } {
  if (!view) return { passed: false, detail: "No portfolio yet. Open Portfolio and set one up first." };

  const { holdings, trades, portfolio } = view;

  switch (verify.kind) {
    case "first_trade":
      return {
        passed: trades.length >= 1,
        detail:
          trades.length >= 1
            ? "You made your first trade."
            : "You have not placed any trades yet. Open Portfolio and buy any NSE stock.",
      };

    case "holdings_count":
      return {
        passed: holdings.length >= verify.min,
        detail:
          holdings.length >= verify.min
            ? "You hold " + holdings.length + " positions."
            : "You hold " + holdings.length + " of " + verify.min + " required positions. Add more from Market.",
      };

    case "sector_count": {
      const sectors = new Set(holdings.map((h) => h.sector).filter(Boolean) as string[]);
      return {
        passed: sectors.size >= verify.min,
        detail:
          sectors.size >= verify.min
            ? "You hold " + sectors.size + " sectors."
            : "You hold " + sectors.size + " of " + verify.min + " sectors. Add a company from a different sector.",
      };
    }

    case "ticker_held": {
      const held = holdings.some((h) => h.ticker === verify.ticker);
      return {
        passed: held,
        detail: held ? "You hold " + verify.ticker + "." : "Add " + verify.ticker + " to your portfolio.",
      };
    }

    case "any_dividend_stock": {
      const DIVIDEND_TICKERS = [
        "SCOM", "KCB", "EQTY", "COOP", "ABSA", "NCBA", "SCBK",
        "BAMB", "EABL", "BAT", "KEGN", "CIC", "BRIT", "JUB",
      ];
      const found = holdings.find((h) => DIVIDEND_TICKERS.includes(h.ticker));
      return {
        passed: Boolean(found),
        detail: found
          ? "You hold " + found.ticker + ", a dividend payer."
          : "None of your holdings pay a dividend. Add one from Market.",
      };
    }

    case "journal_length": {
      const longest = trades.reduce((max, t) => Math.max(max, (t.reason ?? "").length), 0);
      return {
        passed: longest >= verify.minChars,
        detail:
          longest >= verify.minChars
            ? "Your longest journal note is " + longest + " characters."
            : "Longest note is " + longest + " characters. Target is " + verify.minChars + ".",
      };
    }

    case "cash_pct": {
      const pct = view.totalValue > 0 ? (portfolio.cash / view.totalValue) * 100 : 0;
      const ok = pct >= verify.min && pct <= verify.max;
      return {
        passed: ok,
        detail:
          "Cash is " + pct.toFixed(1) + "% of your portfolio (target " + verify.min + " to " + verify.max + "%).",
      };
    }

    default:
      return { passed: false, detail: "This mission cannot be checked automatically." };
  }
}

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const cardId = url.searchParams.get("cardId");
  if (!cardId) {
    return NextResponse.json({ ok: false, error: "missing_card_id" }, { status: 400 });
  }

  const card = await resolveCard(cardId, userId);
  if (!card) {
    return NextResponse.json({ ok: false, error: "card_not_found" }, { status: 404 });
  }

  if (card.type !== "mission" || !card.verify) {
    return NextResponse.json(
      { ok: false, error: "not_a_mission", detail: "Card type is " + card.type },
      { status: 400 }
    );
  }

  const view = await buildPortfolioView(userId).catch(() => null);
  const result = checkMission(card.verify, view);
  return NextResponse.json({ ok: true, ...result });
}
