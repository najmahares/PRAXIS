import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { unreadCount } from "@/lib/notifications/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: true, count: 0 });
  const count = await unreadCount(userId);
  return NextResponse.json({ ok: true, count });
}
