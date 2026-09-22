import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import {
  listCompletedLessonIds,
  markLessonComplete,
  unmarkLesson,
  replaceAllProgress,
} from "@/lib/lesson-progress/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: true, completedLessons: [] });
  const completedLessons = await listCompletedLessonIds(userId);
  return NextResponse.json({ ok: true, completedLessons });
}

type Body =
  | { action: "mark"; lessonId: string }
  | { action: "unmark"; lessonId: string }
  | { action: "replace-all"; lessonIds: string[] };

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: Body;
  try { body = (await request.json()) as Body; } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (body.action === "mark" && typeof body.lessonId === "string") {
    await markLessonComplete(userId, body.lessonId);
    return NextResponse.json({ ok: true });
  }
  if (body.action === "unmark" && typeof body.lessonId === "string") {
    await unmarkLesson(userId, body.lessonId);
    return NextResponse.json({ ok: true });
  }
  if (body.action === "replace-all" && Array.isArray(body.lessonIds)) {
    const clean = body.lessonIds
      .filter((id) => typeof id === "string" && id.length > 0)
      .slice(0, 2000);
    if (clean.length === 0) {
      
      const { getSupabaseAdmin } = await import("@/lib/supabase/server");
      const sb = getSupabaseAdmin();
      if (sb) {
        await sb.from("lesson_progress").delete().eq("user_id", userId);
      }
      return NextResponse.json({ ok: true, count: 0, reset: true });
    }
    await replaceAllProgress(userId, clean);
    return NextResponse.json({ ok: true, count: clean.length });
  }

  return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
}
