import { getSupabaseAdmin } from "@/lib/supabase/server";
import { requireAdmin } from "../../_guard";

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

  const [total24, critical24, warn24, failed7, signups7] = await Promise.all([
    sb.from("platform_events").select("id", { count: "exact", head: true }).gte("created_at", d1),
    sb.from("platform_events").select("id", { count: "exact", head: true }).gte("created_at", d1).eq("severity", "critical"),
    sb.from("platform_events").select("id", { count: "exact", head: true }).gte("created_at", d1).eq("severity", "warn"),
    sb.from("platform_events").select("id", { count: "exact", head: true }).gte("created_at", d7).eq("event_type", "auth.login.failed"),
    sb.from("platform_events").select("id", { count: "exact", head: true }).gte("created_at", d7).eq("event_type", "auth.signup"),
  ]);

  return Response.json({
    ok: true,
    summary: {
      total_24h: total24.count ?? 0,
      critical_24h: critical24.count ?? 0,
      warn_24h: warn24.count ?? 0,
      failed_logins_7d: failed7.count ?? 0,
      signups_7d: signups7.count ?? 0,
      top_types_7d: [],
    },
  });
}
