import type { CSSProperties } from "react";

export default function PageLoading({
  label = "Loading",
}: {
  label?: string;
}) {
  return (
    <div style={wrapStyle} role="status" aria-live="polite">
      <div style={cardStyle}>
        <span style={spinnerStyle} aria-hidden="true" />
        <span style={labelStyle}>{label}</span>
      </div>
    </div>
  );
}

const wrapStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "60vh",
  width: "100%",
  boxSizing: "border-box",
  padding: "48px 24px",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 20,
  padding: "40px 60px",
  borderRadius: 16,
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.06)",
  minWidth: 220,
};

const spinnerStyle: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "3px solid rgba(37, 99, 235, 0.18)",
  borderTopColor: "#2563eb",
  animation: "praxis-page-spin 0.85s linear infinite",
};

const labelStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text-muted)",
  letterSpacing: "0.01em",
};
