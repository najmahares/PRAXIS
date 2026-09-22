import { getSupabaseAdmin } from "@/lib/supabase/server";
import { requireAdmin } from "../../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const { id } = await params;

  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const [userRes, postsRes, repliesRes, memRes, sessRes, progressRes] = await Promise.all([
    sb.auth.admin.getUserById(id),
    sb.from("community_posts").select("id, title, kind, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
    sb.from("community_replies").select("id, body, post_id, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
    sb.from("mentor_memories").select("id, fact, concept, created_at").eq("user_id", id).order("created_at", { ascending: false }).limit(30),
    sb.from("sessions").select("id, created_at, expires_at, revoked_at, user_agent, ip").eq("user_id", id).order("created_at", { ascending: false }).limit(20),
    sb.from("lesson_progress").select("lesson_id").eq("user_id", id),
  ]);

  const u = userRes.data?.user;
  if (!u) return Response.json({ ok: false, error: "not_found" }, { status: 404 });

  const lessons = (progressRes.data ?? []) as Array<{ lesson_id: string }>;
  const realLessons = lessons.filter(l => !l.lesson_id.startsWith("quiz-")).length;
  const quizzes = lessons.filter(l => l.lesson_id.startsWith("quiz-")).length;

  return Response.json({
    ok: true,
    user: {
      id: u.id,
      email: u.email ?? "",
      name: (u.user_metadata?.name as string) ?? "",
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      banned_until: (u as any).banned_until ?? null,
      email_confirmed: Boolean(u.email_confirmed_at),
    },
    posts: postsRes.data ?? [],
    replies: repliesRes.data ?? [],
    memories: memRes.data ?? [],
    sessions: sessRes.data ?? [],
    stats: { lessons: realLessons, quizzes },
  });
}
