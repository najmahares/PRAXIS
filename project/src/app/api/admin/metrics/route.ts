import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAdminUserList, resolveUserEmails } from "@/lib/admin/userCache";
import { requireAdmin } from "../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const now = Date.now();
  const d1 = new Date(now - 86400000).toISOString();
  const d7 = new Date(now - 7 * 86400000).toISOString();
  const d14 = new Date(now - 14 * 86400000).toISOString();

  
  const [
    users,
    openReportsRes,
    postsRes,
    repliesRes,
    memoriesRes,
    sessionsRes,
    posts7Res,
    reports14Res,
    recentActionsRes,
  ] = await Promise.all([
    getAdminUserList(),
    sb.from("community_reports").select("id", { count: "exact", head: true }).eq("status", "open"),
    sb.from("community_posts").select("id", { count: "exact", head: true }),
    sb.from("community_replies").select("id", { count: "exact", head: true }),
    sb.from("mentor_memories").select("id", { count: "exact", head: true }),
    sb.from("sessions").select("id", { count: "exact", head: true }).is("revoked_at", null),
    sb.from("community_posts").select("id", { count: "exact", head: true }).gte("created_at", d7),
    sb.from("community_reports").select("reason, status, created_at").gte("created_at", d14),
    sb.from("admin_actions").select("*").order("created_at", { ascending: false }).limit(6),
  ]);

  const signups7d = users.filter(u => u.created_at && u.created_at >= d7).length;
  const activeLast24h = users.filter(u => u.last_sign_in_at && u.last_sign_in_at >= d1).length;

  
  const signupSeries: { date: string; label: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date(now - i * 86400000);
    day.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setDate(day.getDate() + 1);
    const count = users.filter(u => {
      if (!u.created_at) return false;
      const t = new Date(u.created_at).getTime();
      return t >= day.getTime() && t < dayEnd.getTime();
    }).length;
    signupSeries.push({
      date: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("en-KE", { day: "numeric", month: "short" }),
      count,
    });
  }

  const reasonMap = new Map<string, number>();
  for (const r of (reports14Res.data ?? []) as Array<{ reason: string }>) {
    reasonMap.set(r.reason, (reasonMap.get(r.reason) ?? 0) + 1);
  }
  const reportReasons = [...reasonMap.entries()]
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  
  const recentRaw = (recentActionsRes.data ?? []) as Array<{
    id: string;
    admin_user_id: string;
    action: string;
    target_type: string;
    target_id: string | null;
    created_at: string;
  }>;
  const adminIds = Array.from(new Set(recentRaw.map(a => a.admin_user_id)));
  const lookup = await resolveUserEmails(adminIds);

  return Response.json({
    ok: true,
    metrics: {
      total_users: users.length,
      signups_7d: signups7d,
      open_reports: openReportsRes.count ?? 0,
      total_posts: postsRes.count ?? 0,
      total_replies: repliesRes.count ?? 0,
      total_memories: memoriesRes.count ?? 0,
      active_sessions: sessionsRes.count ?? 0,
      posts_7d: posts7Res.count ?? 0,
      active_24h: activeLast24h,
    },
    signupSeries,
    reportReasons,
    recentActions: recentRaw.map(a => ({
      ...a,
      admin_name: lookup.get(a.admin_user_id)?.name ?? lookup.get(a.admin_user_id)?.email ?? "admin",
    })),
  });
}
