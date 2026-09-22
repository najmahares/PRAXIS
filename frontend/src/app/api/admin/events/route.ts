import { getSupabaseAdmin } from "@/lib/supabase/server";
import { requireAdmin } from "../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PER_PAGE = 50;
const MAX_PER_PAGE = 200;

export async function GET(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const url = new URL(request.url);
  const severity = url.searchParams.get("severity");
  const eventType = url.searchParams.get("type");
  const userQuery = (url.searchParams.get("user") ?? "").trim().toLowerCase();
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const perPage = Math.min(
    MAX_PER_PAGE,
    Math.max(10, parseInt(url.searchParams.get("perPage") ?? String(DEFAULT_PER_PAGE), 10) || DEFAULT_PER_PAGE),
  );

  let q = sb
    .from("platform_events")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (severity && ["info", "warn", "critical"].includes(severity)) {
    q = q.eq("severity", severity);
  }
  if (eventType) {
    q = q.eq("event_type", eventType);
  }
  if (userQuery) {
    
    q = q.or(`user_id.ilike.${userQuery}%,metadata->>email.ilike.%${userQuery}%`);
  }

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const { data, count, error } = await q.range(from, to);

  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  
  const userIds = Array.from(new Set((data ?? []).map((e: any) => e.user_id).filter(Boolean)));
  const emailMap = new Map<string, string>();
  await Promise.all(userIds.map(async (id: string) => {
    try {
      const { data: u } = await sb.auth.admin.getUserById(id);
      if (u?.user) emailMap.set(id, u.user.email ?? "");
    } catch {  }
  }));

  const rows = (data ?? []).map((e: any) => ({
    ...e,
    user_email: e.user_id ? (emailMap.get(e.user_id) ?? null) : null,
  }));

  const total = count ?? 0;
  return Response.json({
    ok: true,
    events: rows,
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  });
}
