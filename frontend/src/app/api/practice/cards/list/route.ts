import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { PRACTICE_CARDS } from "@/lib/practice/cards";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  const sb = getSupabaseAdmin();

  const completed = new Map<string, { passed: boolean; completedAt: string; response: string | null; choiceId: string | null }>();

  if (userId && sb) {
    const { data } = await sb
      .from("practice_completed")
      .select("card_id, passed, completed_at, response, choice_id")
      .eq("user_id", userId);
    if (data) {
      for (const row of data as Array<{ card_id: string; passed: boolean; completed_at: string; response: string | null; choice_id: string | null }>) {
        completed.set(row.card_id, {
          passed: row.passed,
          completedAt: row.completed_at,
          response: row.response,
          choiceId: row.choice_id,
        });
      }
    }
  }

  const cards = PRACTICE_CARDS.map((c) => ({
    ...c,
    completed: completed.get(c.id) ?? null,
  }));

  return NextResponse.json({ ok: true, cards });
}
