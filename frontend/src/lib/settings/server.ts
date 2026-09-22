import { getCachedUser } from "@/lib/auth/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAuthUserCached } from "@/lib/auth/userCache";
import { getTrades } from "@/lib/practice/api";
import type {
  NotificationPrefs,
  PracticePrefs,
  AppearancePrefs,
  ProfileInfo,
  PracticeStats,
  AccountInfo,
  SettingsState,
} from "./types";

export type {
  NotificationPrefs,
  PracticePrefs,
  AppearancePrefs,
  ProfileInfo,
  PracticeStats,
  AccountInfo,
  SettingsState,
} from "./types";

export { LEARNING_GOALS } from "./types";

export type SettingsRow = {
  user_id: string;
  daily_reminder: boolean;
  weekly_summary: boolean;
  achievements: boolean;
  mentor_replies: boolean;
  community_replies: boolean;
  product_updates: boolean;
  learning_goal: string | null;
  practice_difficulty: string | null;
  appearance_theme: string | null;
  appearance_text_size: string | null;
  appearance_reduce_motion: boolean | null;
  updated_at: string;
};

const DB_DEFAULTS = {
  daily_reminder: false,
  weekly_summary: false,
  achievements: true,
  mentor_replies: true,
  community_replies: true,
  product_updates: false,
  learning_goal: null,
  practice_difficulty: null,
  appearance_theme: null,
  appearance_text_size: null,
  appearance_reduce_motion: null,
};

export async function getSettingsRow(userId: string): Promise<SettingsRow> {
  const sb = getSupabaseAdmin();
  if (!sb) {
    return {
      user_id: userId,
      ...DB_DEFAULTS,
      updated_at: new Date().toISOString(),
    };
  }
  const { data } = await sb
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) {
    return {
      user_id: userId,
      ...DB_DEFAULTS,
      updated_at: new Date().toISOString(),
    };
  }
  return data as SettingsRow;
}

export async function updateSettingsRow(
  userId: string,
  patch: Partial<Omit<SettingsRow, "user_id" | "updated_at">>
): Promise<{ ok: boolean; row?: SettingsRow; error?: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, error: "no_db" };

  const clean: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const key of [
    "daily_reminder",
    "weekly_summary",
    "achievements",
    "mentor_replies",
    "community_replies",
    "product_updates",
    "appearance_reduce_motion",
  ] as const) {
    const v = patch[key];
    if (typeof v === "boolean") clean[key] = v;
  }
  for (const key of [
    "learning_goal",
    "practice_difficulty",
    "appearance_theme",
    "appearance_text_size",
  ] as const) {
    const v = patch[key];
    if (typeof v === "string") clean[key] = v.slice(0, 80);
    else if (v === null) clean[key] = null;
  }

  const { data, error } = await sb
    .from("user_settings")
    .upsert({ user_id: userId, ...clean }, { onConflict: "user_id" })
    .select("*")
    .maybeSingle();

  if (error) return { ok: false, error: error.message };
  return { ok: true, row: data as SettingsRow };
}

function formatJoinedAt(iso: string | null | undefined): string {
  if (!iso) return "recently";
  try {
    return new Date(iso).toLocaleDateString("en-KE", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "recently";
  }
}

export async function buildSettingsState(userId: string): Promise<SettingsState> {
  const sb = getSupabaseAdmin();

  
  const [row, user, trades, completionsResult] = await Promise.all([
    getSettingsRow(userId),
    getCachedUser(userId),
    getTrades(userId).catch(() => []),
    sb
      ? sb
          .from("practice_completed")
          .select("completed_at")
          .eq("user_id", userId)
      : Promise.resolve({ data: [] as Array<{ completed_at: string }> }),
  ]);

  let fullName = "";
  let email = "";
  let emailVerified = false;
  let joinedAt = "recently";

  if (user) {
    fullName = user.name;
    email = user.email;
    emailVerified = user.emailVerified;
    joinedAt = formatJoinedAt(user.createdAt);
  }

  const completions = (completionsResult?.data ?? []) as Array<{ completed_at: string }>;
  const scenariosCompleted = completions.length;

  const days = new Set<string>();
  for (const t of trades) days.add(t.executed_at.slice(0, 10));
  for (const c of completions) days.add(c.completed_at.slice(0, 10));

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) streak += 1;
    else if (i === 0) continue;
    else break;
  }

  const practiceLevel =
    scenariosCompleted >= 50
      ? "Experienced"
      : scenariosCompleted >= 15
        ? "Intermediate"
        : "Beginner";

  return {
    profile: {
      fullName,
      email,
      bio: "",
      joinedAt,
    },
    stats: {
      practiceLevel,
      streakDays: streak,
      scenariosCompleted,
      decisionsMade: trades.length,
    },
    account: {
      emailVerified,
      lastPasswordChange: "-",
    },
    notifications: {
      dailyReminder: row.daily_reminder,
      weeklySummary: row.weekly_summary,
      achievements: row.achievements,
      productUpdates: row.product_updates,
      mentorReplies: row.mentor_replies,
      communityReplies: row.community_replies,
    },
    practice: {
      dailyReminder: row.daily_reminder,
      weeklySummary: row.weekly_summary,
      showMarketContext: true,
      learningGoal: row.learning_goal ?? "Build confidence with market reasoning",
    },
    appearance: {
      theme: (row.appearance_theme as AppearancePrefs["theme"]) ?? "system",
      textSize: (row.appearance_text_size as AppearancePrefs["textSize"]) ?? "default",
      reduceMotion: row.appearance_reduce_motion ?? false,
    },
    security: {
      lastPasswordChange: "-",
      activeSessions: 1,
    },
  };
}
