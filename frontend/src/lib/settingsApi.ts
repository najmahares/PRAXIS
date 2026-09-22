import type {
  PracticePrefs,
  ProfileInfo,
  SettingsState,
} from "@/lib/settingsMock";

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...init,
      credentials: "same-origin",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<SettingsState> {
  const res = await fetchJson<{ ok: boolean; settings: SettingsState }>("/api/settings");
  if (res?.ok && res.settings) return res.settings;
  
  return {
    profile: { fullName: "", email: "", bio: "", joinedAt: "recently" },
    stats: {
      practiceLevel: "Beginner",
      streakDays: 0,
      scenariosCompleted: 0,
      decisionsMade: 0,
    },
    account: { emailVerified: false, lastPasswordChange: "-" },
    notifications: {
      dailyReminder: false,
      weeklySummary: false,
      achievements: true,
      productUpdates: false,
      mentorReplies: true,
      communityReplies: true,
    },
    practice: {
      dailyReminder: false,
      weeklySummary: false,
      showMarketContext: true,
      learningGoal: "Build confidence with market reasoning",
    },
    appearance: { theme: "system", textSize: "default", reduceMotion: false },
    security: { lastPasswordChange: "-", activeSessions: 1 },
  };
}

export async function updateProfile(_next: ProfileInfo): Promise<void> {
  
  
  
  
}

export async function updatePracticePrefs(next: PracticePrefs): Promise<void> {
  await fetchJson("/api/settings", {
    method: "PATCH",
    body: JSON.stringify({
      dailyReminder: next.dailyReminder,
      weeklySummary: next.weeklySummary,
      learningGoal: next.learningGoal,
    }),
  });
}

export async function updateNotificationPrefs(
  next: SettingsState["notifications"]
): Promise<void> {
  await fetchJson("/api/settings", {
    method: "PATCH",
    body: JSON.stringify({
      dailyReminder: next.dailyReminder,
      weeklySummary: next.weeklySummary,
      achievements: next.achievements,
      productUpdates: next.productUpdates,
      mentorReplies: next.mentorReplies,
      communityReplies: next.communityReplies,
    }),
  });
}

export async function updateAppearancePrefs(
  next: SettingsState["appearance"]
): Promise<void> {
  
  
  await fetchJson("/api/settings", {
    method: "PATCH",
    body: JSON.stringify({
      theme: next.theme,
      textSize: next.textSize,
      reduceMotion: next.reduceMotion,
    }),
  });
}
