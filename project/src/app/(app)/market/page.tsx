import {
  getKenyaIndex,
  getKenyaMovers,
  getKenyaStocks,
  type KenyaIndex,
  type KenyaMover,
  type KenyaStock,
} from "@/lib/market/mcp";
import MarketClient from "./MarketClient";
import "./market.css";

export const revalidate = 300;

export const metadata = { title: "Market" };

export default async function MarketPage() {
  const [stocks, movers, index] = await Promise.all([
    getKenyaStocks().catch(() => [] as KenyaStock[]),
    getKenyaMovers().catch(() => ({ gainers: [] as KenyaMover[], losers: [] as KenyaMover[] })),
    getKenyaIndex().catch(() => null as KenyaIndex | null),
  ]);

  return <MarketClient stocks={stocks} movers={movers} index={index} />;
}
