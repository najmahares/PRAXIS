import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function listCompletedLessonIds(userId: string): Promise<string[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];
  const { data, error } = await sb
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", userId);
  if (error || !data) return [];
  return (data as Array<{ lesson_id: string }>).map((r) => r.lesson_id);
}

export async function markLessonComplete(
  userId: string,
  lessonId: string
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("lesson_progress")
    .upsert(
      { user_id: userId, lesson_id: lessonId },
      { onConflict: "user_id,lesson_id" }
    );
}

export async function unmarkLesson(
  userId: string,
  lessonId: string
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("lesson_progress")
    .delete()
    .eq("user_id", userId)
    .eq("lesson_id", lessonId);
}





export async function replaceAllProgress(
  userId: string,
  lessonIds: string[]
): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  if (lessonIds.length === 0) return;

  const rows = lessonIds.map((id) => ({ user_id: userId, lesson_id: id }));
  await sb
    .from("lesson_progress")
    .upsert(rows, { onConflict: "user_id,lesson_id" });
}
