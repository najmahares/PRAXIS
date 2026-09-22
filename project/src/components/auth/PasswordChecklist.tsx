import type { CSSProperties } from "react";
import { passwordRules } from "@/lib/validation";

type PasswordChecklistProps = {
  value: string;
  visible: boolean;
};

export default function PasswordChecklist({
  value,
  visible,
}: PasswordChecklistProps) {
  if (!visible) return null;
  return (
    <ul style={listStyle} aria-label="Password requirements">
      {passwordRules.map((rule) => {
        const met = rule.test(value);
        return (
          <li
            key={rule.id}
            style={met ? { ...itemStyle, ...itemMetStyle } : itemStyle}
          >
            <span
              style={met ? { ...dotStyle, ...dotMetStyle } : dotStyle}
              aria-hidden="true"
            >
              {met ? "✓" : ""}
            </span>
            <span>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

const listStyle: CSSProperties = {
  listStyle: "none",
  margin: "8px 0 0",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const itemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "12px",
  color: "var(--color-text-muted)",
  transition: "color 120ms ease",
};

const itemMetStyle: CSSProperties = {
  color: "var(--color-success)",
};

const dotStyle: CSSProperties = {
  width: "14px",
  height: "14px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  border: "1px solid var(--color-border-strong)",
  background: "var(--color-surface)",
  fontSize: "10px",
  fontWeight: 700,
  lineHeight: 1,
  flexShrink: 0,
  transition:
    "background-color 120ms ease, border-color 120ms ease, color 120ms ease",
};

const dotMetStyle: CSSProperties = {
  borderColor: "var(--color-success)",
  background: "var(--color-success)",
  color: "#ffffff",
};
