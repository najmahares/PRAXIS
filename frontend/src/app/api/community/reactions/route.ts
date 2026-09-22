import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications/server";

export const runtime = "nodejs";

type Body = {
  targetType?: "post" | "reply";
  targetId?: string;
  kind?: "helpful" | "agree" | "respect";
};

const REACTION_LABELS: Record<string, string> = {
  helpful: "Helpful",
  agree: "Agree",
  respect: "Respect",
};

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let payload: Body;
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const { targetType, targetId, kind } = payload;
  if (
    (targetType !== "post" && targetType !== "reply") ||
    !targetId ||
    (kind !== "helpful" && kind !== "agree" && kind !== "respect")
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const { data: existing } = await sb
    .from("community_reactions")
    .select("id")
    .eq("user_id", userId)
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("kind", kind)
    .maybeSingle();

  const table = targetType === "post" ? "community_posts" : "community_replies";

  if (existing) {
    
    await sb.from("community_reactions").delete().eq("id", existing.id);
    const { data: row } = await sb.from(table).select("helpful_count").eq("id", targetId).maybeSingle();
    if (row) {
      await sb.from(table)
        .update({ helpful_count: Math.max(0, Number(row.helpful_count ?? 0) - 1) })
        .eq("id", targetId);
    }
    return NextResponse.json({ ok: true, added: false });
  }

  await sb.from("community_reactions").insert({
    user_id: userId,
    target_type: targetType,
    target_id: targetId,
    kind,
  });
  const { data: row } = await sb.from(table).select("helpful_count").eq("id", targetId).maybeSingle();
  if (row) {
    await sb.from(table)
      .update({ helpful_count: Number(row.helpful_count ?? 0) + 1 })
      .eq("id", targetId);
  }

  
  try {
    if (targetType === "post") {
      const { data: post } = await sb
        .from("community_posts")
        .select("user_id, title")
        .eq("id", targetId)
        .maybeSingle();
      if (post && post.user_id && post.user_id !== userId) {
        const { data: actor } = await sb.auth.admin.getUserById(userId);
        const actorMeta = (actor?.user?.user_metadata ?? {}) as Record<string, unknown>;
        const actorName =
          (actorMeta.name as string | undefined) ||
          (actor?.user?.email ?? "").split("@")[0] ||
          "Someone";
        await createNotification(post.user_id as string, {
          kind: "community",
          title: actorName + " found your post " + REACTION_LABELS[kind].toLowerCase(),
          body: (post.title as string | undefined) ?? "Your community post",
          href: "/community/" + targetId,
        });
      }
    } else {
      const { data: reply } = await sb
        .from("community_replies")
        .select("user_id, post_id, body")
        .eq("id", targetId)
        .maybeSingle();
      if (reply && reply.user_id && reply.user_id !== userId) {
        const { data: actor } = await sb.auth.admin.getUserById(userId);
        const actorMeta = (actor?.user?.user_metadata ?? {}) as Record<string, unknown>;
        const actorName =
          (actorMeta.name as string | undefined) ||
          (actor?.user?.email ?? "").split("@")[0] ||
          "Someone";
        await createNotification(reply.user_id as string, {
          kind: "community",
          title: actorName + " found your reply " + REACTION_LABELS[kind].toLowerCase(),
          body: String(reply.body ?? "").slice(0, 120),
          href: "/community/" + String(reply.post_id),
        });
      }
    }
  } catch {
    
  }

  return NextResponse.json({ ok: true, added: true });
}
