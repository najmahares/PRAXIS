import type { ReactNode } from "react";
import SettingsSubNav from "@/components/settings/SettingsSubNav";
import "./settings.css";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav aria-label="Breadcrumb" style={breadcrumbStyle}>
        <span style={crumbMutedStyle}>Home</span>
        <span style={crumbDividerStyle} aria-hidden="true">
          /
        </span>
        <span style={crumbCurrentStyle} aria-current="page">
          Settings
        </span>
      </nav>
      <h1 style={titleStyle}>Settings</h1>
      <p style={subtitleStyle}>
        Manage your account, preferences, and practice experience.
      </p>
      <div className="praxis-settings-shell" style={{ marginTop: 28 }}>
        <SettingsSubNav />
        <div className="praxis-settings-content">{children}</div>
      </div>
    </div>
  );
}

const breadcrumbStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  marginBottom: 12,
} as const;

const crumbMutedStyle = { color: "var(--color-text-muted)" } as const;
const crumbDividerStyle = { color: "var(--color-border-strong)" } as const;
const crumbCurrentStyle = {
  color: "var(--color-text)",
  fontWeight: 500,
} as const;

const titleStyle = {
  margin: 0,
  fontSize: 26,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: "var(--color-text)",
} as const;

const subtitleStyle = {
  margin: "6px 0 0",
  fontSize: 15,
  color: "var(--color-text-muted)",
} as const;
