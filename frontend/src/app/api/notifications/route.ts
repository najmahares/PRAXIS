import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { listNotifications, unreadCount } from "@/lib/notifications/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: true, notifications: [], unread: 0 });
  const [notifications, unread] = await Promise.all([
    listNotifications(userId),
    unreadCount(userId),
  ]);
  return NextResponse.json({ ok: true, notifications, unread });
}
