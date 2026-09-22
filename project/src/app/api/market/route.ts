import { NextRequest, NextResponse } from "next/server";
import { getKenyaStocks, getKenyaMovers, getKenyaIndex } from "@/lib/market/mcp";

export const runtime = "nodejs";



const WINDOW_MS = 60 * 1000;
const MAX_REQ = 20;
const buckets = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_REQ) return false;
  bucket.count += 1;
  return true;
}

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Rate limit exceeded. Try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const [stocks, movers, index] = await Promise.all([
      getKenyaStocks().catch(() => []),
      getKenyaMovers().catch(() => ({ gainers: [], losers: [] })),
      getKenyaIndex().catch(() => null),
    ]);
    return NextResponse.json(
      { ok: true, stocks, movers, index },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, stocks: [], movers: { gainers: [], losers: [] }, index: null },
      { status: 200 }
    );
  }
}
