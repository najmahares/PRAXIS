"use client";

import { useEffect, useState, type FormEvent } from "react";
import Toggle from "@/components/ui/Toggle";
import { getSettings, updatePracticePrefs } from "@/lib/settingsApi";
import { LEARNING_GOALS, type PracticePrefs } from "@/lib/settingsMock";
import { resetAllProgress } from "@/lib/curriculumProgress";

export default function PracticePreferencesPage() {
  const [prefs, setPrefs] = useState<PracticePrefs | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSettings().then((data) => {
      if (!active) return;
      setPrefs(data.practice);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prefs || saving) return;
    setSaving(true);
    await updatePracticePrefs(prefs);
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  }

  if (!prefs) {
    return <p style={mutedStyle}>Loading preferences…</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <section className="praxis-settings-card">
        <h2 style={cardTitleStyle}>Practice preferences</h2>
        <p style={cardSubtitleStyle}>
          How PRAXIS schedules your practice and shows scenarios.
        </p>

        <div className="praxis-settings-row">
          <div style={rowTextStyle}>
            <label htmlFor="pref-daily" style={rowLabelStyle}>
              Daily practice reminder
            </label>
            <p style={rowDescriptionStyle}>
              Get a nudge when it is time to practice.
            </p>
          </div>
          <Toggle
            id="pref-daily"
            label="Daily practice reminder"
            checked={prefs.dailyReminder}
            onChange={(next) => setPrefs({ ...prefs, dailyReminder: next })}
          />
        </div>

        <div className="praxis-settings-row">
          <div style={rowTextStyle}>
            <label htmlFor="pref-weekly" style={rowLabelStyle}>
              Weekly progress summary
            </label>
            <p style={rowDescriptionStyle}>Receive a summary every Monday.</p>
          </div>
          <Toggle
            id="pref-weekly"
            label="Weekly progress summary"
            checked={prefs.weeklySummary}
            onChange={(next) => setPrefs({ ...prefs, weeklySummary: next })}
          />
        </div>

        <div className="praxis-settings-row">
          <div style={rowTextStyle}>
            <label htmlFor="pref-context" style={rowLabelStyle}>
              Show market context
            </label>
            <p style={rowDescriptionStyle}>
              Include background information inside scenarios.
            </p>
          </div>
          <Toggle
            id="pref-context"
            label="Show market context"
            checked={prefs.showMarketContext}
            onChange={(next) => setPrefs({ ...prefs, showMarketContext: next })}
          />
        </div>

        <div style={fieldStackStyle}>
          <label htmlFor="pref-goal" style={labelStyle}>
            Learning goal
          </label>
          <select
            id="pref-goal"
            className="praxis-settings-select"
            value={prefs.learningGoal}
            onChange={(event) =>
              setPrefs({ ...prefs, learningGoal: event.target.value })
            }
          >
            {LEARNING_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
          <p style={hintStyle}>
            This shapes which scenarios PRAXIS recommends first.
          </p>
        </div>

        <div style={actionsStyle}>
          {savedAt ? (
            <span role="status" style={savedStyle}>
              Saved at {savedAt}
            </span>
          ) : null}
          <button type="submit" style={primaryButtonStyle} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </section>

      <section className="praxis-settings-card">
        <h2 style={cardTitleStyle}>Reset learning progress</h2>
        <p style={cardSubtitleStyle}>
          Clear all completed lessons. Your practice portfolio, community
          posts, and Jema memories stay untouched.
        </p>
        <div style={{ marginTop: 14 }}>
          <ResetProgressCard />
        </div>
      </section>

    </form>
  );
}

function ResetProgressCard() {
  const [open, setOpen] = useState(false);
  const [working, setWorking] = useState(false);
  const [done, setDone] = useState(false);

  async function handleReset() {
    setWorking(true);
    try {
      await resetAllProgress();
      setDone(true);
      setOpen(false);
      
      window.dispatchEvent(new Event("praxis-progress-reset"));
    } finally {
      setWorking(false);
    }
  }

  if (done) {
    return (
      <p style={{ fontSize: 13, color: "var(--color-success)", margin: 0 }}>
        Progress cleared. Reload to see the fresh state.
      </p>
    );
  }

  return (
    <>
      <button
        type="button"
        style={resetButtonStyle}
        onClick={() => setOpen(true)}
      >
        Reset progress
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-title"
          style={dialogBackdropStyle}
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div style={dialogStyle}>
            <h3 id="reset-title" style={dialogTitleStyle}>
              Reset all lesson progress?
            </h3>
            <p style={dialogBodyStyle}>
              Every completed lesson will be unmarked. This cannot be undone.
              Your portfolio and community activity are not affected.
            </p>
            <div style={dialogActionsStyle}>
              <button
                type="button"
                style={ghostButtonStyle}
                onClick={() => setOpen(false)}
                disabled={working}
              >
                Cancel
              </button>
              <button
                type="button"
                style={dangerButtonStyle}
                onClick={handleReset}
                disabled={working}
              >
                {working ? "Resetting…" : "Reset progress"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

const cardTitleStyle = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: "var(--color-text)",
} as const;
const cardSubtitleStyle = {
  margin: "4px 0 20px",
  fontSize: 13,
  color: "var(--color-text-muted)",
} as const;
const rowTextStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 3,
  minWidth: 0,
} as const;
const rowLabelStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text)",
} as const;
const rowDescriptionStyle = {
  margin: 0,
  fontSize: 13,
  color: "var(--color-text-muted)",
  lineHeight: 1.5,
} as const;
const fieldStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginTop: 20,
} as const;
const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text)",
} as const;
const hintStyle = {
  margin: "2px 0 0",
  fontSize: 12,
  color: "var(--color-text-muted)",
} as const;
const actionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: 14,
  marginTop: 20,
  paddingTop: 16,
  borderTop: "1px solid var(--color-border)",
} as const;
const savedStyle = { fontSize: 13, color: "var(--color-success)" } as const;
const primaryButtonStyle = {
  height: 40,
  padding: "0 20px",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
} as const;
const dangerTitleStyle = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: "var(--color-danger)",
} as const;
const dangerBodyStyle = {
  margin: "6px 0 0",
  fontSize: 14,
  lineHeight: 1.55,
  color: "var(--color-text-muted)",
} as const;
const resetButtonStyle = {
  height: 40,
  padding: "0 20px",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 14,
  fontWeight: 500,
  border: "1px solid var(--color-border-strong)",
  borderRadius: 6,
  cursor: "pointer",
} as const;
const dangerButtonStyle = {
  height: 40,
  padding: "0 20px",
  background: "#ffffff",
  color: "var(--color-danger)",
  fontSize: 14,
  fontWeight: 500,
  border: "1px solid var(--color-danger)",
  borderRadius: 6,
  cursor: "pointer",
} as const;
const ghostButtonStyle = {
  height: 40,
  padding: "0 20px",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 14,
  fontWeight: 500,
  border: "1px solid var(--color-border-strong)",
  borderRadius: 6,
  cursor: "pointer",
} as const;
const dialogBackdropStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  zIndex: 100,
} as const;
const dialogStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: 24,
  width: "100%",
  maxWidth: 420,
} as const;
const dialogTitleStyle = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  color: "var(--color-text)",
} as const;
const dialogBodyStyle = {
  margin: "10px 0 18px",
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
} as const;
const dialogActionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 20,
} as const;
const mutedStyle = { fontSize: 14, color: "var(--color-text-muted)" } as const;
