"use client";

import type { CSSProperties } from "react";

type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  label: string;
};

export default function Toggle({
  id,
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={
        disabled
          ? { ...trackStyle, opacity: 0.55, cursor: "not-allowed" }
          : trackStyle
      }
      data-checked={checked ? "true" : "false"}
      className="praxis-toggle"
    >
      <span
        aria-hidden="true"
        style={
          checked
            ? { ...thumbStyle, transform: "translateX(18px)" }
            : thumbStyle
        }
      />
    </button>
  );
}

const trackStyle: CSSProperties = {
  position: "relative",
  width: 40,
  height: 22,
  padding: 0,
  border: "none",
  borderRadius: 999,
  background: "var(--color-border-strong)",
  cursor: "pointer",
  transition: "background-color 140ms ease",
  flexShrink: 0,
};

const thumbStyle: CSSProperties = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "#ffffff",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.25)",
  transition: "transform 140ms ease",
};
