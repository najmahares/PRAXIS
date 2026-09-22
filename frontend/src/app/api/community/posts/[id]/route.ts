import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getPost, listReplies } from "@/lib/community/server";
import { moderate } from "@/lib/community/moderation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserIdFromRequest(request);
  const [post, replies] = await Promise.all([getPost(id, userId), listReplies(id, userId)]);
  if (!post) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, post, replies });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let payload: { title?: string; body?: string };
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const title = (payload.title ?? "").trim();
  const body = (payload.body ?? "").trim();
  if (title.length < 4 || body.length < 4) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const mod = moderate(title + "\n\n" + body);
  if (!mod.ok) return NextResponse.json({ ok: false, error: mod.reason }, { status: 400 });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const { data: existing } = await sb
    .from("community_posts")
    .select("user_id")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (existing.user_id !== userId) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const { error } = await sb
    .from("community_posts")
    .update({ title: title.slice(0, 200), body: body.slice(0, 6000), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const { data: existing } = await sb
    .from("community_posts")
    .select("user_id")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (existing.user_id !== userId) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const { error } = await sb.from("community_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
