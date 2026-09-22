import { getSupabaseAdmin } from "@/lib/supabase/server";
import { requireAdmin } from "../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;

  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "open";

  const { data: reports, error } = await sb
    .from("community_reports")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  const rows = reports ?? [];
  const postIds = rows.filter(r => r.target_type === "post").map(r => r.target_id);
  const replyIds = rows.filter(r => r.target_type === "reply").map(r => r.target_id);

  const [postsRes, repliesRes] = await Promise.all([
    postIds.length
      ? sb.from("community_posts").select("id, title, body, author_name, user_id, flagged, flag_reason, created_at").in("id", postIds)
      : Promise.resolve({ data: [] as unknown[] }),
    replyIds.length
      ? sb.from("community_replies").select("id, body, author_name, user_id, post_id, created_at").in("id", replyIds)
      : Promise.resolve({ data: [] as unknown[] }),
  ]);
  const postsById = new Map((postsRes.data ?? []).map((p: any) => [p.id, p]));
  const repliesById = new Map((repliesRes.data ?? []).map((r: any) => [r.id, r]));

  const reporterIds = Array.from(new Set(rows.map(r => r.reporter_user_id)));
  const reporters = new Map<string, { id: string; name: string; email: string }>();
  await Promise.all(reporterIds.map(async (id) => {
    try {
      const { data } = await sb.auth.admin.getUserById(id);
      if (data?.user) {
        reporters.set(id, {
          id: data.user.id,
          name: (data.user.user_metadata?.name as string) ?? data.user.email ?? "Unknown",
          email: data.user.email ?? "",
        });
      }
    } catch {  }
  }));

  const enriched = rows.map(r => {
    const target = r.target_type === "post" ? postsById.get(r.target_id) : repliesById.get(r.target_id);
    return { ...r, reporter: reporters.get(r.reporter_user_id) ?? null, target: target ?? null, target_missing: !target };
  });

  return Response.json({ ok: true, reports: enriched });
}
