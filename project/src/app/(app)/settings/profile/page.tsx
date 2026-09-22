"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSettings, updateProfile } from "@/lib/settingsApi";
import type { AccountInfo, PracticeStats, ProfileInfo } from "@/lib/settingsMock";
import "./profile.css";

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const letters = parts.map((part) => part.charAt(0).toUpperCase()).join("");
  return letters || "P";
}

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [stats, setStats] = useState<PracticeStats | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getSettings().then((data) => {
      if (!active) return;
      setProfile(data.profile);
      setStats(data.stats);
      setAccount(data.account);
      setFullName(data.profile.fullName);
      setBio(data.profile.bio);
    });
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile || saving) return;
    setError("");
    setSavedAt(null);

    const trimmed = fullName.trim();
    if (!trimmed) {
      setError("Your name cannot be empty.");
      return;
    }
    if (trimmed.length > 80) {
      setError("Your name must be 80 characters or fewer.");
      return;
    }
    if (bio.length > 240) {
      setError("Your bio must be 240 characters or fewer.");
      return;
    }

    setSaving(true);
    await updateProfile({
      fullName: trimmed,
      email: profile.email,
      bio,
      joinedAt: profile.joinedAt,
    });
    setProfile({ ...profile, fullName: trimmed, bio });
    setSaving(false);
    setSavedAt(new Date().toLocaleTimeString());
  }

  if (!profile || !stats || !account) {
    return <p style={{ fontSize: 14, color: "var(--color-text-muted)" }}>Loading profile…</p>;
  }

  const initials = initialsFrom(profile.fullName);

  return (
    <div className="praxis-profile-grid">
      <aside className="praxis-profile-side">
        <div className="praxis-settings-card">
          <div className="praxis-profile-avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="praxis-profile-identity">
            <span className="praxis-profile-name">{profile.fullName}</span>
            <span className="praxis-profile-email">{profile.email}</span>
          </div>
          <dl className="praxis-profile-meta">
            <div className="praxis-profile-meta-row">
              <dt className="praxis-profile-meta-label">Member since</dt>
              <dd className="praxis-profile-meta-value" style={{ margin: 0 }}>
                {profile.joinedAt}
              </dd>
            </div>
            <div className="praxis-profile-meta-row">
              <dt className="praxis-profile-meta-label">Practice level</dt>
              <dd className="praxis-profile-meta-value" style={{ margin: 0 }}>
                {stats.practiceLevel}
              </dd>
            </div>
            <div className="praxis-profile-meta-row">
              <dt className="praxis-profile-meta-label">Email status</dt>
              <dd style={{ margin: 0 }}>
                <span
                  className={
                    account.emailVerified
                      ? "praxis-profile-badge praxis-profile-badge-ok"
                      : "praxis-profile-badge praxis-profile-badge-warn"
                  }
                >
                  {account.emailVerified ? "Verified" : "Unverified"}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </aside>

      <div className="praxis-profile-side">
        <form className="praxis-settings-card" onSubmit={handleSubmit} noValidate>
          <h2 style={cardTitleStyle}>Edit profile</h2>
          <p style={cardSubtitleStyle}>Change how PRAXIS addresses you.</p>

          <div className="praxis-profile-field">
            <label className="praxis-profile-label" htmlFor="profile-name">
              Full name
            </label>
            <input
              id="profile-name"
              type="text"
              className="praxis-profile-input"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={saving}
              autoComplete="name"
              maxLength={80}
            />
          </div>

          <div className="praxis-profile-field">
            <label className="praxis-profile-label" htmlFor="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              className="praxis-profile-input"
              value={profile.email}
              disabled
              readOnly
            />
            <span className="praxis-profile-hint">
              Email changes require verification and are not available here yet.
            </span>
          </div>

          <div className="praxis-profile-field">
            <label className="praxis-profile-label" htmlFor="profile-bio">
              Short bio
            </label>
            <textarea
              id="profile-bio"
              className="praxis-profile-textarea"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              disabled={saving}
              maxLength={240}
            />
            <span className="praxis-profile-hint">{bio.length}/240</span>
          </div>

          {error ? (
            <div role="alert" className="praxis-profile-alert">
              {error}
            </div>
          ) : null}

          <div className="praxis-profile-actions">
            {savedAt ? (
              <span role="status" className="praxis-profile-saved">
                Saved at {savedAt}
              </span>
            ) : null}
            <button type="submit" className="praxis-profile-save" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>

        <section className="praxis-settings-card">
          <h2 style={cardTitleStyle}>Practice snapshot</h2>
          <p style={cardSubtitleStyle}>A quick view of your activity so far.</p>
          <div className="praxis-profile-stats">
            <div className="praxis-profile-stat-row">
              <span className="praxis-profile-stat-label">Current streak</span>
              <span className="praxis-profile-stat-value">{stats.streakDays} days</span>
            </div>
            <div className="praxis-profile-stat-row">
              <span className="praxis-profile-stat-label">Scenarios completed</span>
              <span className="praxis-profile-stat-value">{stats.scenariosCompleted}</span>
            </div>
            <div className="praxis-profile-stat-row">
              <span className="praxis-profile-stat-label">Decisions made</span>
              <span className="praxis-profile-stat-value">{stats.decisionsMade}</span>
            </div>
            <div className="praxis-profile-stat-row">
              <span className="praxis-profile-stat-label">Last password change</span>
              <span className="praxis-profile-stat-value">{account.lastPasswordChange}</span>
            </div>
          </div>
        </section>

        <section className="praxis-settings-card">
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--color-text)" }}>
            Account
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.55, color: "var(--color-text-muted)" }}>
            Sign out or permanently delete your account.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <SignOutButton />
            <DeleteAccountCard onDeleted={() => router.push("/login")} />
          </div>
        </section>
      </div>
    </div>
  );
}

function DeleteAccountCard({ onDeleted }: { onDeleted: () => void }) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    if (confirmText.trim() !== "DELETE") return;
    setWorking(true);
    setError(null);
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        credentials: "same-origin",
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not delete account.");
        return;
      }
      onDeleted();
    } catch {
      setError("Network error.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          height: 40,
          padding: "0 20px",
          background: "var(--color-surface)",
          color: "var(--color-text)",
          fontSize: 14,
          fontWeight: 500,
          border: "1px solid var(--color-border-strong)",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Delete account
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, zIndex: 100,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: 24, width: "100%", maxWidth: 420,
          }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-text)" }}>
              Delete your PRAXIS account?
            </h3>
            <p style={{ margin: "10px 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-muted)" }}>
              This permanently removes your account and everything in it. Type DELETE to confirm.
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              autoFocus
              className="praxis-profile-input"
              style={{ width: "100%" }}
            />
            {error ? (
              <p style={{ color: "var(--color-danger)", fontSize: 13, margin: "10px 0 0" }}>
                {error}
              </p>
            ) : null}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={working}
                style={{
                  height: 40, padding: "0 20px",
                  background: "var(--color-surface)", color: "var(--color-text)",
                  fontSize: 14, fontWeight: 500,
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: 6, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={confirmText.trim() !== "DELETE" || working}
                style={{
                  height: 40, padding: "0 20px",
                  background: "var(--color-surface)", color: "var(--color-text)",
                  fontSize: 14, fontWeight: 500,
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: 6, cursor: working ? "not-allowed" : "pointer",
                  opacity: confirmText.trim() !== "DELETE" ? 0.5 : 1,
                }}
              >
                {working ? "Deleting…" : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="praxis-settings-card" style={{ marginTop: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--color-text)" }}>
              Onboarding tour
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--color-text-muted)", maxWidth: 460, lineHeight: 1.5 }}>
              Replay the introduction to PRAXIS - what it is, how the levels work, and what Jema does.
            </p>
          </div>
          <Link
            href="/onboarding"
            style={{
              display: "inline-block",
              padding: "9px 18px",
              borderRadius: 8,
              border: "1px solid var(--color-border-strong)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Replay tour
          </Link>
        </div>
      </section>
    </>
  );
}

function SignOutButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function confirm() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    router.push("/login");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          height: 40,
          padding: "0 20px",
          background: "var(--color-surface)",
          color: "var(--color-text)",
          fontSize: 14,
          fontWeight: 500,
          border: "1px solid var(--color-border-strong)",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Sign out
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, zIndex: 200,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            padding: 24, width: "100%", maxWidth: 380,
          }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-text)" }}>
              Sign out of PRAXIS?
            </h3>
            <p style={{ margin: "10px 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-muted)" }}>
              You can sign back in any time.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  height: 40, padding: "0 20px",
                  background: "var(--color-surface)", color: "var(--color-text)",
                  fontSize: 14, fontWeight: 500,
                  border: "1px solid var(--color-border-strong)",
                  borderRadius: 6, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirm}
                style={{
                  height: 40, padding: "0 20px",
                  background: "var(--color-primary)", color: "#fff",
                  fontSize: 14, fontWeight: 500,
                  border: "none", borderRadius: 6, cursor: "pointer",
                }}
              >
                Sign out
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
