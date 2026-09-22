import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { buildSettingsState, updateSettingsRow } from "@/lib/settings/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const state = await buildSettingsState(userId);
  return NextResponse.json({ ok: true, settings: state });
}

type PatchBody = {
  dailyReminder?: boolean;
  weeklySummary?: boolean;
  achievements?: boolean;
  mentorReplies?: boolean;
  communityReplies?: boolean;
  productUpdates?: boolean;
  learningGoal?: string | null;
  practiceDifficulty?: string | null;
  theme?: "light" | "system";
  textSize?: "compact" | "default" | "large";
  reduceMotion?: boolean;
};

export async function PATCH(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: PatchBody;
  try { body = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.dailyReminder === "boolean") patch.daily_reminder = body.dailyReminder;
  if (typeof body.weeklySummary === "boolean") patch.weekly_summary = body.weeklySummary;
  if (typeof body.achievements === "boolean") patch.achievements = body.achievements;
  if (typeof body.mentorReplies === "boolean") patch.mentor_replies = body.mentorReplies;
  if (typeof body.communityReplies === "boolean") patch.community_replies = body.communityReplies;
  if (typeof body.productUpdates === "boolean") patch.product_updates = body.productUpdates;
  if (typeof body.learningGoal === "string" || body.learningGoal === null) {
    patch.learning_goal = body.learningGoal;
  }
  if (typeof body.practiceDifficulty === "string" || body.practiceDifficulty === null) {
    patch.practice_difficulty = body.practiceDifficulty;
  }
  if (typeof body.theme === "string") patch.appearance_theme = body.theme;
  if (typeof body.textSize === "string") patch.appearance_text_size = body.textSize;
  if (typeof body.reduceMotion === "boolean") patch.appearance_reduce_motion = body.reduceMotion;

  const res = await updateSettingsRow(userId, patch);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
