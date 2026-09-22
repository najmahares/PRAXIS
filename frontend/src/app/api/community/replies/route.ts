import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAuthorForUser } from "@/lib/community/server";
import { moderate, initialsFrom } from "@/lib/community/moderation";
import { createNotification } from "@/lib/notifications/server";

export const runtime = "nodejs";

type Body = { postId?: string; parentReplyId?: string | null; body?: string };

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let payload: Body;
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const postId = (payload.postId ?? "").trim();
  const parentReplyId =
    typeof payload.parentReplyId === "string" && payload.parentReplyId.length > 0
      ? payload.parentReplyId
      : null;
  const text = (payload.body ?? "").trim();

  if (!postId || text.length < 2) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const mod = moderate(text);
  if (!mod.ok) return NextResponse.json({ ok: false, error: mod.reason }, { status: 400 });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  
  if (parentReplyId) {
    const { data: parent } = await sb
      .from("community_replies")
      .select("user_id")
      .eq("id", parentReplyId)
      .maybeSingle();
    if (parent && parent.user_id === userId) {
      return NextResponse.json(
        { ok: false, error: "You cannot reply to your own comment." },
        { status: 400 }
      );
    }
  } else {
    const { data: post } = await sb
      .from("community_posts")
      .select("user_id")
      .eq("id", postId)
      .maybeSingle();
    if (post && post.user_id === userId) {
      return NextResponse.json(
        { ok: false, error: "You cannot reply to your own post. Edit it instead." },
        { status: 400 }
      );
    }
  }

  const author = await getAuthorForUser(userId);

  const { data, error } = await sb
    .from("community_replies")
    .insert({
      post_id: postId,
      parent_reply_id: parentReplyId,
      user_id: userId,
      author_name: author.name,
      author_initials: author.initials || initialsFrom(author.name),
      author_color: author.color,
      body: text.slice(0, 4000),
    })
    .select("id")
    .maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  
  const { data: postRow } = await sb
    .from("community_posts")
    .select("reply_count, user_id, title")
    .eq("id", postId)
    .maybeSingle();

  if (postRow) {
    await sb
      .from("community_posts")
      .update({ reply_count: Number(postRow.reply_count ?? 0) + 1 })
      .eq("id", postId);

    
    const ownerId = postRow.user_id as string | undefined;
    if (ownerId && ownerId !== userId) {
      await createNotification(ownerId, {
        kind: "community",
        title: parentReplyId
          ? author.name + " replied to your comment"
          : author.name + " replied to your post",
        body: text.slice(0, 200),
        href: "/community/" + postId,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    id: data?.id,
    authorName: author.name,
    authorInitials: author.initials || initialsFrom(author.name),
    authorColor: author.color,
  });
}
