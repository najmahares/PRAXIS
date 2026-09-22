"use client";

import { useEffect, useState } from "react";
import Toggle from "@/components/ui/Toggle";
import { useTheme, type Theme } from "@/lib/theme/useTheme";
import { getSettings, updateAppearancePrefs } from "@/lib/settingsApi";

type StoredAppearance = {
  textSize: "compact" | "default" | "large";
  reduceMotion: boolean;
};

const THEMES: { key: Theme; label: string; hint: string }[] = [
  { key: "light", label: "Light", hint: "Always light" },
  { key: "dark", label: "Dark", hint: "Always dark" },
  { key: "system", label: "System", hint: "Follow your device" },
];

export default function AppearanceSettingsPage() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [prefs, setPrefs] = useState<StoredAppearance | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getSettings().then((data) => {
      if (!active) return;
      setPrefs({
        textSize: data.appearance.textSize,
        reduceMotion: data.appearance.reduceMotion,
      });
    });
    return () => {
      active = false;
    };
  }, []);

  async function save(next: StoredAppearance) {
    setPrefs(next);
    await updateAppearancePrefs({
      theme: theme === "dark" ? "system" : "light",
      textSize: next.textSize,
      reduceMotion: next.reduceMotion,
    });
    setSavedAt(new Date().toLocaleTimeString());
  }

  if (!prefs) {
    return <p style={mutedStyle}>Loading preferences…</p>;
  }

  return (
    <section className="praxis-settings-card">
      <h2 style={cardTitleStyle}>Appearance</h2>
      <p style={cardSubtitleStyle}>How PRAXIS looks on your screen.</p>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Theme</legend>
        <div style={themeGridStyle}>
          {THEMES.map((option) => {
            const selected = theme === option.key;
            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setTheme(option.key)}
                aria-pressed={selected}
                style={selected ? { ...themeCardStyle, ...themeCardActiveStyle } : themeCardStyle}
              >
                <ThemePreview variant={option.key} />
                <span style={themeLabelStyle}>{option.label}</span>
                <span style={themeHintStyle}>{option.hint}</span>
              </button>
            );
          })}
        </div>
        <p style={hintStyle}>
          Currently showing {resolvedTheme === "dark" ? "dark" : "light"}.
        </p>
      </fieldset>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Text size</legend>
        <div style={radioRowStyle}>
          {(["compact", "default", "large"] as const).map((size) => (
            <label key={size} style={radioLabelStyle}>
              <input
                type="radio"
                name="textSize"
                value={size}
                checked={prefs.textSize === size}
                onChange={() => save({ ...prefs, textSize: size })}
              />
              <span style={{ textTransform: "capitalize" }}>{size}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="praxis-settings-row" style={{ marginTop: 8 }}>
        <div style={rowTextStyle}>
          <label htmlFor="app-reduce-motion" style={rowLabelStyle}>
            Reduce motion
          </label>
          <p style={rowDescriptionStyle}>
            Turn off non-essential animations across PRAXIS.
          </p>
        </div>
        <Toggle
          id="app-reduce-motion"
          label="Reduce motion"
          checked={prefs.reduceMotion}
          onChange={(next) => save({ ...prefs, reduceMotion: next })}
        />
      </div>

      {savedAt ? (
        <p role="status" style={savedStyle}>
          Saved at {savedAt}
        </p>
      ) : null}
    </section>
  );
}

function ThemePreview({ variant }: { variant: Theme }) {
  if (variant === "light") {
    return (
      <div style={previewWrapLightStyle} aria-hidden="true">
        <span style={{ ...previewLineStyle, width: "70%", background: "#94a3b8" }} />
        <span style={{ ...previewLineStyle, width: "90%", background: "#cbd5e1" }} />
        <span style={{ ...previewLineStyle, width: "50%", background: "#cbd5e1" }} />
      </div>
    );
  }
  if (variant === "dark") {
    return (
      <div style={previewWrapDarkStyle} aria-hidden="true">
        <span style={{ ...previewLineStyle, width: "70%", background: "#94a3b8" }} />
        <span style={{ ...previewLineStyle, width: "90%", background: "#475569" }} />
        <span style={{ ...previewLineStyle, width: "50%", background: "#475569" }} />
      </div>
    );
  }
  return (
    <div style={previewSplitStyle} aria-hidden="true">
      <div style={previewSplitHalfLightStyle}>
        <span style={{ ...previewLineStyle, width: "70%", background: "#94a3b8" }} />
        <span style={{ ...previewLineStyle, width: "50%", background: "#cbd5e1" }} />
      </div>
      <div style={previewSplitHalfDarkStyle}>
        <span style={{ ...previewLineStyle, width: "70%", background: "#94a3b8" }} />
        <span style={{ ...previewLineStyle, width: "50%", background: "#475569" }} />
      </div>
    </div>
  );
}

const cardTitleStyle = { margin: 0, fontSize: 16, fontWeight: 600, color: "var(--color-text)" } as const;
const cardSubtitleStyle = { margin: "4px 0 20px", fontSize: 13, color: "var(--color-text-muted)" } as const;
const fieldsetStyle = { border: "none", padding: 0, margin: "0 0 20px" } as const;
const legendStyle = { fontSize: 13, fontWeight: 500, color: "var(--color-text)", padding: 0, marginBottom: 10 } as const;
const themeGridStyle = { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 } as const;
const themeCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 6,
  padding: 12,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  cursor: "pointer",
  textAlign: "left",
} as const;
const themeCardActiveStyle = {
  borderColor: "var(--color-primary)",
  boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.18)",
} as const;
const themeLabelStyle = { fontSize: 14, fontWeight: 600, color: "var(--color-text)" } as const;
const themeHintStyle = { fontSize: 12, color: "var(--color-text-muted)" } as const;
const hintStyle = { margin: "10px 0 0", fontSize: 12, color: "var(--color-text-muted)" } as const;
const previewWrapLightStyle = {
  width: "100%",
  height: 48,
  padding: 8,
  borderRadius: 6,
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  gap: 4,
} as const;
const previewWrapDarkStyle = {
  width: "100%",
  height: 48,
  padding: 8,
  borderRadius: 6,
  background: "#111827",
  border: "1px solid #1f2937",
  display: "flex",
  flexDirection: "column",
  gap: 4,
} as const;
const previewSplitStyle = {
  width: "100%",
  height: 48,
  borderRadius: 6,
  border: "1px solid #e5e7eb",
  overflow: "hidden",
  display: "flex",
} as const;
const previewSplitHalfLightStyle = {
  flex: 1,
  padding: 8,
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  gap: 4,
} as const;
const previewSplitHalfDarkStyle = {
  flex: 1,
  padding: 8,
  background: "#111827",
  display: "flex",
  flexDirection: "column",
  gap: 4,
} as const;
const previewLineStyle = { display: "block", height: 4, borderRadius: 2 } as const;
const radioRowStyle = { display: "flex", flexWrap: "wrap", gap: 18 } as const;
const radioLabelStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--color-text)",
  cursor: "pointer",
} as const;
const rowTextStyle = { display: "flex", flexDirection: "column", gap: 3 } as const;
const rowLabelStyle = { fontSize: 14, fontWeight: 500, color: "var(--color-text)" } as const;
const rowDescriptionStyle = { margin: 0, fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 } as const;
const savedStyle = { margin: "14px 0 0", fontSize: 13, color: "var(--color-success)" } as const;
const mutedStyle = { fontSize: 14, color: "var(--color-text-muted)" } as const;
