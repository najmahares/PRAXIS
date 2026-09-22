import Link from "next/link";
import { getCompany } from "@/lib/market/companies";
import { getLiveQuote, getPriceHistory, type HistoryPoint } from "@/lib/market/mcp";
import CompanyClient from "./CompanyClient";
import "../market.css";

export const revalidate = 300;

export const metadata = { title: "Company" };

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();
  const company = getCompany(upper);
  const [live, history] = await Promise.all([
    getLiveQuote(upper).catch(() => null),
    getPriceHistory(upper).catch(() => [] as HistoryPoint[]),
  ]);

  return (
    <div>
      <CompanyClient
        ticker={upper}
        company={company ?? null}
        live={live}
        history={history}
      />
    </div>
  );
}
