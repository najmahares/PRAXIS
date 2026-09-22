import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";














export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const secret = process.env.CRON_SECRET ?? "";
  const isDev = process.env.NODE_ENV !== "production";

  if (secret && authHeader !== "Bearer " + secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!secret && !isDev) {
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET not configured" },
      { status: 503 }
    );
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  
  const [tradesRes, completionsRes, communityRes, postsRes] = await Promise.all([
    sb.from("practice_trades").select("user_id").gte("executed_at", weekAgo),
    sb.from("practice_completed").select("user_id").gte("completed_at", weekAgo),
    sb.from("community_replies").select("user_id").gte("created_at", weekAgo),
    sb.from("community_posts").select("user_id").gte("created_at", weekAgo),
  ]);

  const stats = new Map<
    string,
    { trades: number; practice: number; community: number }
  >();

  const bump = (userId: string, field: "trades" | "practice" | "community") => {
    if (!userId) return;
    const entry = stats.get(userId) ?? { trades: 0, practice: 0, community: 0 };
    entry[field] += 1;
    stats.set(userId, entry);
  };

  for (const row of (tradesRes.data ?? []) as Array<{ user_id: string }>) {
    bump(row.user_id, "trades");
  }
  for (const row of (completionsRes.data ?? []) as Array<{ user_id: string }>) {
    bump(row.user_id, "practice");
  }
  for (const row of (communityRes.data ?? []) as Array<{ user_id: string }>) {
    bump(row.user_id, "community");
  }
  for (const row of (postsRes.data ?? []) as Array<{ user_id: string }>) {
    bump(row.user_id, "community");
  }

  let sent = 0;
  const summaryTitle = "Your week in PRAXIS";

  for (const [userId, s] of stats.entries()) {
    const total = s.trades + s.practice + s.community;
    if (total === 0) continue;

    
    await sb
      .from("notifications")
      .delete()
      .eq("user_id", userId)
      .eq("title", summaryTitle)
      .gte("created_at", weekAgo);

    const parts: string[] = [];
    if (s.practice > 0) parts.push(s.practice + " practice card" + (s.practice === 1 ? "" : "s"));
    if (s.trades > 0) parts.push(s.trades + " trade" + (s.trades === 1 ? "" : "s"));
    if (s.community > 0) parts.push(s.community + " community action" + (s.community === 1 ? "" : "s"));

    await createNotification(userId, {
      kind: "achievement",
      title: summaryTitle,
      body: "You completed " + parts.join(", ") + " this week. Open Progress to see how your concept signals moved.",
      href: "/progress",
    });
    sent += 1;
  }

  return NextResponse.json({ ok: true, sent });
}


export const GET = POST;
