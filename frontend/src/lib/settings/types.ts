



export type NotificationPrefs = {
  dailyReminder: boolean;
  weeklySummary: boolean;
  achievements: boolean;
  productUpdates: boolean;
  mentorReplies: boolean;
  communityReplies: boolean;
};

export type PracticePrefs = {
  dailyReminder: boolean;
  weeklySummary: boolean;
  showMarketContext: boolean;
  learningGoal: string;
};

export type AppearancePrefs = {
  theme: "light" | "system";
  textSize: "compact" | "default" | "large";
  reduceMotion: boolean;
};

export type ProfileInfo = {
  fullName: string;
  email: string;
  bio: string;
  joinedAt: string;
};

export type PracticeStats = {
  practiceLevel: string;
  streakDays: number;
  scenariosCompleted: number;
  decisionsMade: number;
};

export type AccountInfo = {
  emailVerified: boolean;
  lastPasswordChange: string;
};

export type SettingsState = {
  profile: ProfileInfo;
  stats: PracticeStats;
  account: AccountInfo;
  notifications: NotificationPrefs;
  practice: PracticePrefs;
  appearance: AppearancePrefs;
  security: {
    lastPasswordChange: string;
    activeSessions: number;
  };
};

export const LEARNING_GOALS = [
  "Build confidence with market reasoning",
  "Understand how prices move",
  "Learn to read a balance sheet",
  "Practice managing concentration risk",
  "Prepare for real investing later",
];
