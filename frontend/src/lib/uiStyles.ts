import type { CSSProperties } from "react";

export const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text)",
  marginBottom: "6px",
};

export const fieldStyle: CSSProperties = {
  marginBottom: "14px",
};

export const inputStyle: CSSProperties = {
  width: "100%",
  height: "42px",
  padding: "0 12px",
  fontSize: "14px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-strong)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text)",
  transition: "border-color 120ms ease, box-shadow 120ms ease",
};

export const inputErrorStyle: CSSProperties = {
  borderColor: "var(--color-danger)",
};

export const fieldErrorStyle: CSSProperties = {
  margin: "6px 0 0",
  fontSize: "12px",
  color: "var(--color-danger)",
};

export const helperTextStyle: CSSProperties = {
  margin: "6px 0 0",
  fontSize: "12px",
  color: "var(--color-text-muted)",
};

export const primaryButtonStyle: CSSProperties = {
  width: "100%",
  height: "44px",
  border: "none",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 500,
  cursor: "pointer",
};

export const primaryLinkStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "44px",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 500,
  textDecoration: "none",
};

export const ghostButtonStyle: CSSProperties = {
  width: "100%",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-strong)",
  borderRadius: "var(--radius-sm)",
  color: "var(--color-text)",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
};

export const linkStyle: CSSProperties = {
  color: "var(--color-primary)",
  fontWeight: 500,
  textDecoration: "none",
};

export const alertStyle: CSSProperties = {
  background: "var(--color-danger-soft)",
  border: "1px solid #fecaca",
  color: "var(--color-danger)",
  fontSize: "13px",
  padding: "10px 12px",
  borderRadius: "var(--radius-sm)",
  marginBottom: "14px",
};

export const successAlertStyle: CSSProperties = {
  background: "var(--color-success-soft)",
  border: "1px solid #bbf7d0",
  color: "var(--color-success)",
  fontSize: "13px",
  padding: "10px 12px",
  borderRadius: "var(--radius-sm)",
  marginBottom: "14px",
};

export const dividerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "18px 0",
};

export const dividerLineStyle: CSSProperties = {
  flex: 1,
  height: "1px",
  background: "var(--color-border)",
};

export const dividerTextStyle: CSSProperties = {
  fontSize: "12px",
  color: "var(--color-text-muted)",
};

export const rowBetweenStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "4px 0 18px",
  fontSize: "13px",
};

export const checkboxLabelStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  color: "var(--color-text)",
  fontSize: "13px",
  cursor: "pointer",
};

export const passwordWrapStyle: CSSProperties = {
  position: "relative",
};

export const passwordInputStyle: CSSProperties = {
  paddingRight: "64px",
};

export const showButtonStyle: CSSProperties = {
  position: "absolute",
  right: "8px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "transparent",
  border: "none",
  color: "var(--color-text-muted)",
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "4px",
};


export const successStyle = {
  padding: "14px 16px",
  borderRadius: 10,
  background: "var(--color-tint-green-bg, #f0fdf4)",
  border: "1px solid var(--color-tint-green-border, #bbf7d0)",
  color: "var(--color-tint-green-fg, #15803d)",
  fontSize: 13.5,
  lineHeight: 1.6,
} as const;
