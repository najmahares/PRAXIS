import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { moderate } from "@/lib/community/moderation";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let payload: { body?: string };
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const body = (payload.body ?? "").trim();
  if (body.length < 2) return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });

  const mod = moderate(body);
  if (!mod.ok) return NextResponse.json({ ok: false, error: mod.reason }, { status: 400 });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const { data: existing } = await sb
    .from("community_replies")
    .select("user_id")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (existing.user_id !== userId) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const { error } = await sb
    .from("community_replies")
    .update({ body: body.slice(0, 4000) })
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
    .from("community_replies")
    .select("user_id, post_id")
    .eq("id", id)
    .maybeSingle();
  if (!existing) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  if (existing.user_id !== userId) return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });

  const { error } = await sb.from("community_replies").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  const { data: postRow } = await sb
    .from("community_posts")
    .select("reply_count")
    .eq("id", existing.post_id)
    .maybeSingle();
  if (postRow) {
    await sb
      .from("community_posts")
      .update({ reply_count: Math.max(0, Number(postRow.reply_count ?? 0) - 1) })
      .eq("id", existing.post_id);
  }
  return NextResponse.json({ ok: true });
}
