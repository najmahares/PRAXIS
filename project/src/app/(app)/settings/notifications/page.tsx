"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/ui/Toggle";
import { getSettings, updateNotificationPrefs } from "@/lib/settingsApi";
import type { NotificationPrefs } from "@/lib/settingsMock";

type Row = {
  key: keyof NotificationPrefs;
  label: string;
  description: string;
};

const ROWS: Row[] = [
  { key: "dailyReminder", label: "Daily practice reminder", description: "A short nudge when it is time to practice." },
  { key: "weeklySummary", label: "Weekly progress summary", description: "A recap of your week every Monday." },
  { key: "achievements", label: "Achievements", description: "When you unlock a new skill or complete a milestone." },
  { key: "mentorReplies", label: "Mentor replies", description: "When your mentor leaves you a note." },
  { key: "communityReplies", label: "Community replies", description: "When someone responds to you in the community." },
  { key: "productUpdates", label: "Product updates", description: "New features and improvements to PRAXIS." },
];

export default function NotificationSettingsPage() {
  const [prefs, setPrefs] = useState<NotificationPrefs | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSettings().then((data) => {
      if (!active) return;
      setPrefs(data.notifications);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleToggle(key: keyof NotificationPrefs, next: boolean) {
    if (!prefs) return;
    const updated = { ...prefs, [key]: next };
    setPrefs(updated);
    await updateNotificationPrefs(updated);
    setSavedAt(new Date().toLocaleTimeString());
  }

  if (!prefs) {
    return <p style={mutedStyle}>Loading preferences…</p>;
  }

  return (
    <section className="praxis-settings-card">
      <h2 style={cardTitleStyle}>Notification preferences</h2>
      <p style={cardSubtitleStyle}>
        Control what PRAXIS sends you. We never send more than one reminder per day.
      </p>

      {ROWS.map((row) => (
        <div key={row.key} className="praxis-settings-row">
          <div style={rowTextStyle}>
            <label htmlFor={`notif-${row.key}`} style={rowLabelStyle}>
              {row.label}
            </label>
            <p style={rowDescriptionStyle}>{row.description}</p>
          </div>
          <Toggle
            id={`notif-${row.key}`}
            label={row.label}
            checked={prefs[row.key]}
            onChange={(next) => handleToggle(row.key, next)}
          />
        </div>
      ))}

      {savedAt ? (
        <p role="status" style={savedStyle}>
          Saved at {savedAt}
        </p>
      ) : null}
    </section>
  );
}

const cardTitleStyle = { margin: 0, fontSize: 16, fontWeight: 600, color: "var(--color-text)" } as const;
const cardSubtitleStyle = { margin: "4px 0 20px", fontSize: 13, color: "var(--color-text-muted)" } as const;
const rowTextStyle = { display: "flex", flexDirection: "column", gap: 3, minWidth: 0 } as const;
const rowLabelStyle = { fontSize: 14, fontWeight: 500, color: "var(--color-text)" } as const;
const rowDescriptionStyle = { margin: 0, fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 } as const;
const savedStyle = { margin: "14px 0 0", fontSize: 13, color: "var(--color-success)" } as const;
const mutedStyle = { fontSize: 14, color: "var(--color-text-muted)" } as const;
