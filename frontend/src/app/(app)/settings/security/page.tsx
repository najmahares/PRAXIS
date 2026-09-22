"use client";

import { useState, type FormEvent } from "react";

export default function SecuritySettingsPage() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [memoryState, setMemoryState] = useState<"idle" | "working" | "done" | "error">(
    "idle",
  );
  const [memoryConfirmOpen, setMemoryConfirmOpen] = useState(false);

  async function clearMemory() {
    setMemoryState("working");
    try {
      const response = await fetch("/api/memories/clear", { method: "DELETE" });
      if (!response.ok) throw new Error("failed");
      setMemoryState("done");
      setMemoryConfirmOpen(false);
      window.setTimeout(() => setMemoryState("idle"), 2400);
    } catch {
      setMemoryState("error");
    }
  }


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!current) {
      setError("Enter your current password.");
      return;
    }
    if (next.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }
    if (!/[A-Za-z]/.test(next) || !/\d/.test(next)) {
      setError("Your new password must include a letter and a number.");
      return;
    }
    if (next !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    setMessage("Password updated.");
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  return (
    <>
      <section className="praxis-settings-card">
        <h2 style={cardTitleStyle}>Change password</h2>
        <p style={cardSubtitleStyle}>
          Use a password you have not used elsewhere.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={fieldStackStyle}>
            <label style={labelStyle} htmlFor="sec-current">
              Current password
            </label>
            <input
              id="sec-current"
              type="password"
              className="praxis-settings-input"
              value={current}
              onChange={(event) => setCurrent(event.target.value)}
              disabled={saving}
              autoComplete="current-password"
            />
          </div>
          <div style={fieldStackStyle}>
            <label style={labelStyle} htmlFor="sec-new">
              New password
            </label>
            <input
              id="sec-new"
              type="password"
              className="praxis-settings-input"
              value={next}
              onChange={(event) => setNext(event.target.value)}
              disabled={saving}
              autoComplete="new-password"
            />
          </div>
          <div style={fieldStackStyle}>
            <label style={labelStyle} htmlFor="sec-confirm">
              Confirm new password
            </label>
            <input
              id="sec-confirm"
              type="password"
              className="praxis-settings-input"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              disabled={saving}
              autoComplete="new-password"
            />
          </div>

          {error ? (
            <div role="alert" style={alertStyle}>
              {error}
            </div>
          ) : null}
          {message ? (
            <div role="status" style={successStyle}>
              {message}
            </div>
          ) : null}

          <div style={actionsStyle}>
            <button type="submit" style={primaryButtonStyle} disabled={saving}>
              {saving ? "Updating…" : "Update password"}
            </button>
          </div>
        </form>
      </section>

      <section className="praxis-settings-card">
        <h2 style={cardTitleStyle}>Sessions</h2>
        <p style={cardSubtitleStyle}>
          Where your PRAXIS account is currently signed in.
        </p>
        <div className="praxis-settings-row">
          <div>
            <span style={rowLabelStyle}>This browser</span>
            <p style={rowDescriptionStyle}>Active now</p>
          </div>
        </div>
        <p style={hintStyle}>
          Signing out of every device is not available yet.
        </p>
      </section>

      <section className="praxis-settings-card">
        <h2 style={cardTitleStyle}>AI memory</h2>
        <p style={cardSubtitleStyle}>
          Jema stores short factual notes about your learning so future sessions feel
          continuous. They are private to your account and never shown to other users.
        </p>
        <div className="praxis-settings-row">
          <div>
            <span style={rowLabelStyle}>Clear all memories</span>
            <p style={rowDescriptionStyle}>
              Permanently deletes everything Jema has learned about you.
            </p>
          </div>
        </div>
        {memoryState === "done" ? (
          <div role="status" style={successStyle}>
            Your memory has been cleared.
          </div>
        ) : null}
        {memoryState === "error" ? (
          <div role="alert" style={alertStyle}>
            We could not clear your memory. Please try again.
          </div>
        ) : null}
        <div style={actionsStyle}>
          <button
            type="button"
            style={dangerButtonStyle}
            onClick={() => setMemoryConfirmOpen(true)}
            disabled={memoryState === "working"}
          >
            {memoryState === "working" ? "Clearing…" : "Clear memory"}
          </button>
        </div>

        {memoryConfirmOpen ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-memory-title"
            style={dialogBackdropStyle}
            onClick={(event) => {
              if (event.target === event.currentTarget) setMemoryConfirmOpen(false);
            }}
          >
            <div style={dialogStyle}>
              <h3 id="clear-memory-title" style={dialogTitleStyle}>
                Clear Jema&rsquo;s memory?
              </h3>
              <p style={dialogBodyStyle}>
                All facts Jema has learned about your reasoning and preferences will be
                permanently removed. This cannot be undone.
              </p>
              <div style={dialogActionsStyle}>
                <button
                  type="button"
                  style={ghostButtonStyle}
                  onClick={() => setMemoryConfirmOpen(false)}
                  disabled={memoryState === "working"}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={dangerButtonStyle}
                  onClick={() => void clearMemory()}
                  disabled={memoryState === "working"}
                >
                  {memoryState === "working" ? "Clearing…" : "Yes, clear memory"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
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
const fieldStackStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginBottom: 16,
} as const;
const labelStyle = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text)",
} as const;
const hintStyle = {
  margin: "12px 0 0",
  fontSize: 12,
  color: "var(--color-text-muted)",
} as const;
const rowLabelStyle = {
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text)",
} as const;
const rowDescriptionStyle = {
  margin: "2px 0 0",
  fontSize: 13,
  color: "var(--color-text-muted)",
} as const;
const alertStyle = {
  marginBottom: 14,
  padding: "10px 12px",
  fontSize: 13,
  color: "var(--color-danger)",
  background: "var(--color-danger-soft)",
  border: "1px solid #fecaca",
  borderRadius: 6,
} as const;
const successStyle = {
  marginBottom: 14,
  padding: "10px 12px",
  fontSize: 13,
  color: "var(--color-success)",
  background: "var(--color-success-soft)",
  border: "1px solid #bbf7d0",
  borderRadius: 6,
} as const;
const actionsStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 12,
} as const;
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
