import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logEvent } from "@/lib/events/logger";

export const runtime = "nodejs";

const ALLOWED = ["scam", "advice", "abuse", "spam", "offtopic", "other"];

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let payload: { targetType?: "post" | "reply"; targetId?: string; reason?: string; note?: string | null };
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
  const { targetType, targetId, reason } = payload;
  const note = typeof payload.note === "string" ? payload.note.slice(0, 400) : null;

  if ((targetType !== "post" && targetType !== "reply") || !targetId || !reason || !ALLOWED.includes(reason)) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const { error } = await sb.from("community_reports").insert({
    reporter_user_id: userId,
    target_type: targetType,
    target_id: targetId,
    reason,
    note,
  });

  if (error && error.code !== "23505") {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { count } = await sb
    .from("community_reports")
    .select("*", { count: "exact", head: true })
    .eq("target_type", targetType)
    .eq("target_id", targetId);

  const total = count ?? 0;

  logEvent({
    userId,
    eventType: "community.report_created",
    request,
    metadata: { targetType, targetId, reason, totalReports: total },
  });

  
  if (total >= 3) {
    const table = targetType === "post" ? "community_posts" : "community_replies";
    await sb.from(table).update({ flagged: true, flag_reason: "auto" }).eq("id", targetId);

    logEvent({
      eventType: "community.report_threshold_reached",
      request,
      metadata: { targetType, targetId, totalReports: total },
    });
  }

  return NextResponse.json({ ok: true });
}
