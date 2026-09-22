import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { clearSessionCookieHeader } from "@/lib/auth/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  
  await Promise.all([
    sb.from("lesson_progress").delete().eq("user_id", userId),
    sb.from("practice_trades").delete().eq("user_id", userId),
    sb.from("practice_completed").delete().eq("user_id", userId),
    sb.from("practice_generated_cards").delete().eq("user_id", userId),
    sb.from("practice_portfolios").delete().eq("user_id", userId),
    sb.from("mentor_memories").delete().eq("user_id", userId),
    sb.from("notifications").delete().eq("user_id", userId),
    sb.from("bookmarks").delete().eq("user_id", userId),
    sb.from("user_settings").delete().eq("user_id", userId),
    sb.from("community_posts").delete().eq("user_id", userId),
    sb.from("community_replies").delete().eq("user_id", userId),
    sb.from("community_reactions").delete().eq("user_id", userId),
    sb.from("community_reports").delete().eq("reporter_user_id", userId),
    sb.from("community_profiles").delete().eq("user_id", userId),
  ]);

  
  const { error } = await sb.auth.admin.deleteUser(userId);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true });
  response.headers.append("Set-Cookie", clearSessionCookieHeader());
  return response;
}
