import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { buildPortfolioView } from "@/lib/practice/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const view = await buildPortfolioView(userId);
  if (!view) {
    return NextResponse.json({ ok: true, portfolio: null });
  }
  return NextResponse.json({ ok: true, view });
}
