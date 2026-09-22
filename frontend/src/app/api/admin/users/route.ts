import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAdminUserList } from "@/lib/admin/userCache";
import { requireAdmin } from "../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PER_PAGE = 25;
const MAX_PER_PAGE = 100;

export async function GET(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const perPage = Math.min(
    MAX_PER_PAGE,
    Math.max(5, parseInt(url.searchParams.get("perPage") ?? String(DEFAULT_PER_PAGE), 10) || DEFAULT_PER_PAGE),
  );

  
  const all = await getAdminUserList();

  const filtered = q
    ? all.filter(u =>
        u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q))
    : all;

  const sorted = [...filtered].sort((a, b) =>
    new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime(),
  );

  const total = sorted.length;
  const start = (page - 1) * perPage;
  const slice = sorted.slice(start, start + perPage);

  
  
  const ids = slice.map(u => u.id);
  const counts = { posts: new Map<string, number>(), memories: new Map<string, number>(), sessions: new Map<string, number>() };

  if (ids.length > 0) {
    const [postsRes, memRes, sessRes] = await Promise.all([
      sb.from("community_posts").select("user_id").in("user_id", ids),
      sb.from("mentor_memories").select("user_id").in("user_id", ids),
      sb.from("sessions").select("user_id").is("revoked_at", null).in("user_id", ids),
    ]);
    for (const r of (postsRes.data ?? []) as Array<{ user_id: string }>) {
      counts.posts.set(r.user_id, (counts.posts.get(r.user_id) ?? 0) + 1);
    }
    for (const r of (memRes.data ?? []) as Array<{ user_id: string }>) {
      counts.memories.set(r.user_id, (counts.memories.get(r.user_id) ?? 0) + 1);
    }
    for (const r of (sessRes.data ?? []) as Array<{ user_id: string }>) {
      counts.sessions.set(r.user_id, (counts.sessions.get(r.user_id) ?? 0) + 1);
    }
  }

  const enriched = slice.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    created_at: u.created_at,
    last_sign_in_at: u.last_sign_in_at,
    banned_until: u.banned_until,
    posts: counts.posts.get(u.id) ?? 0,
    memories: counts.memories.get(u.id) ?? 0,
    active_sessions: counts.sessions.get(u.id) ?? 0,
  }));

  return Response.json({
    ok: true,
    users: enriched,
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  });
}
