import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createNotification } from "@/lib/notifications/server";
import { requireAdmin, logAdminAction } from "../_guard";
import { invalidateAdminUserCache } from "@/lib/admin/userCache";

export const runtime = "nodejs";

type Body = {
  action:
    | "dismiss-report"
    | "delete-post"
    | "delete-reply"
    | "ban-user"
    | "unban-user"
    | "kill-sessions";
  reportId?: string;
  postId?: string;
  replyId?: string;
  userId?: string;
  durationDays?: number;
  reason?: string;
};



function humanizeError(raw: string): string {
  const s = raw.toLowerCase();
  if (s.includes("invalid format for ban duration") || s.includes("unknown unit")) {
    return "Supabase rejected the ban duration format. Please report this - the action layer should send hours, not days.";
  }
  if (s.includes("user not found") || s.includes("user does not exist")) {
    return "That user no longer exists in Supabase Auth. Refresh the list.";
  }
  if (s.includes("already banned") || s.includes("user is banned")) {
    return "This user is already banned. Unban first, then re-ban if you want to change the duration.";
  }
  if (s.includes("permission") || s.includes("unauthorized") || s.includes("jwt")) {
    return "Server lacks permission to perform this action. Check that SUPABASE_SERVICE_KEY is set.";
  }
  if (s.includes("rate") || s.includes("too many")) {
    return "Supabase rate-limited the request. Wait a moment and try again.";
  }
  
  return "Action failed: " + raw;
}

function cleanReason(input: string | undefined): string {
  return (input ?? "")
    .replace(/\s+/g, " ")         
    .replace(/[<>]/g, "")          
    .trim()
    .slice(0, 240);                
}


function daysToGoDuration(days: number): string {
  const safeDays = Math.max(1, Math.min(3650, Math.floor(days)));
  return safeDays * 24 + "h";
}

export async function POST(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const { adminId } = g;

  let body: Body;
  try { body = await request.json(); } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }
  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "Server has no database connection." }, { status: 503 });

  switch (body.action) {
    case "dismiss-report": {
      if (!body.reportId) return Response.json({ ok: false, error: "Missing report id." }, { status: 400 });
      const { error } = await sb.from("community_reports").update({
        status: "dismissed",
        resolved_at: new Date().toISOString(),
        resolved_by: adminId,
      }).eq("id", body.reportId);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });
      await logAdminAction({ adminUserId: adminId, action: "dismiss-report", targetType: "report", targetId: body.reportId });
      return Response.json({ ok: true });
    }

    case "delete-post": {
      if (!body.postId) return Response.json({ ok: false, error: "Missing post id." }, { status: 400 });

      const { data: post } = await sb
        .from("community_posts")
        .select("user_id, title")
        .eq("id", body.postId)
        .maybeSingle();

      const { data: replyRows } = await sb.from("community_replies").select("id").eq("post_id", body.postId);
      const replyIds = (replyRows ?? []).map((r: any) => r.id);

      if (replyIds.length > 0) {
        await sb.from("community_replies").delete().in("id", replyIds);
        await sb.from("community_reports").delete().eq("target_type", "reply").in("target_id", replyIds);
      }
      await sb.from("community_reports").delete().eq("target_type", "post").eq("target_id", body.postId);
      await sb.from("community_reactions").delete().eq("target_type", "post").eq("target_id", body.postId);

      const { error } = await sb.from("community_posts").delete().eq("id", body.postId);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });

      if (post?.user_id) {
        const reason = cleanReason(body.reason) || "Content policy violation";
        try {
          await createNotification(post.user_id, {
            kind: "system",
            title: "Your post was removed",
            body: `"${(post.title ?? "Your post").slice(0, 80)}" was removed by a moderator. Reason: ${reason}`,
            href: "/community/guidelines",
          });
        } catch {  }
      }

      await logAdminAction({
        adminUserId: adminId,
        action: "delete-post",
        targetType: "post",
        targetId: body.postId,
        payload: { reason: cleanReason(body.reason), author: post?.user_id ?? null },
      });
      return Response.json({ ok: true });
    }

    case "delete-reply": {
      if (!body.replyId) return Response.json({ ok: false, error: "Missing reply id." }, { status: 400 });

      const { data: reply } = await sb
        .from("community_replies")
        .select("user_id, post_id")
        .eq("id", body.replyId)
        .maybeSingle();

      await sb.from("community_reports").delete().eq("target_type", "reply").eq("target_id", body.replyId);
      await sb.from("community_reactions").delete().eq("target_type", "reply").eq("target_id", body.replyId);
      const { error } = await sb.from("community_replies").delete().eq("id", body.replyId);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });

      if (reply?.user_id) {
        const reason = cleanReason(body.reason) || "Content policy violation";
        try {
          await createNotification(reply.user_id, {
            kind: "system",
            title: "Your reply was removed",
            body: `A reply you posted was removed by a moderator. Reason: ${reason}`,
            href: reply.post_id ? "/community/" + reply.post_id : "/community",
          });
        } catch {  }
      }

      await logAdminAction({
        adminUserId: adminId,
        action: "delete-reply",
        targetType: "reply",
        targetId: body.replyId,
        payload: { reason: cleanReason(body.reason) },
      });
      return Response.json({ ok: true });
    }

    case "ban-user": {
      if (!body.userId) return Response.json({ ok: false, error: "Missing user id." }, { status: 400 });
      const days = Math.max(1, Math.min(3650, Number(body.durationDays) || 30));

      
      const { error } = await sb.auth.admin.updateUserById(body.userId, {
        ban_duration: daysToGoDuration(days),
      } as any);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });

      await sb
        .from("sessions")
        .update({ revoked_at: new Date().toISOString() })
        .eq("user_id", body.userId)
        .is("revoked_at", null);

      const reason = cleanReason(body.reason) || "Community policy violation";
      try {
        await createNotification(body.userId, {
          kind: "system",
          title: "Your account has been suspended",
          body: `You have been suspended for ${days} day${days === 1 ? "" : "s"}. Reason: ${reason}. If you believe this is a mistake, contact support.`,
          href: "/settings/profile",
        });
      } catch {  }

      await logAdminAction({
        adminUserId: adminId,
        action: "ban-user",
        targetType: "user",
        targetId: body.userId,
        payload: { days, reason },
      });
      invalidateAdminUserCache();
      return Response.json({ ok: true });
    }

    case "unban-user": {
      if (!body.userId) return Response.json({ ok: false, error: "Missing user id." }, { status: 400 });
      const { error } = await sb.auth.admin.updateUserById(body.userId, { ban_duration: "none" } as any);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });

      try {
        await createNotification(body.userId, {
          kind: "system",
          title: "Your account has been restored",
          body: "Your suspension has been lifted. You can use PRAXIS normally again.",
          href: "/dashboard",
        });
      } catch {  }

      await logAdminAction({ adminUserId: adminId, action: "unban-user", targetType: "user", targetId: body.userId });
      invalidateAdminUserCache();
      return Response.json({ ok: true });
    }

    case "kill-sessions": {
      if (!body.userId) return Response.json({ ok: false, error: "Missing user id." }, { status: 400 });
      const { error } = await sb
        .from("sessions")
        .update({ revoked_at: new Date().toISOString() })
        .eq("user_id", body.userId)
        .is("revoked_at", null);
      if (error) return Response.json({ ok: false, error: humanizeError(error.message) }, { status: 500 });

      try {
        await createNotification(body.userId, {
          kind: "system",
          title: "You were signed out",
          body: "A moderator signed you out of all devices. If this wasn't you, reset your password.",
          href: "/settings/profile",
        });
      } catch {  }

      await logAdminAction({ adminUserId: adminId, action: "kill-sessions", targetType: "user", targetId: body.userId });
      return Response.json({ ok: true });
    }

    default:
      return Response.json({ ok: false, error: "Unknown action." }, { status: 400 });
  }
}
