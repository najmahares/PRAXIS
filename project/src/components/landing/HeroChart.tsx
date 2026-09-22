"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const TARGET_VALUE = 112450;

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function useCountUp(target: number, active: boolean, durationMs = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, durationMs]);
  return value;
}

function formatKsh(value: number): string {
  return `KSh ${value.toLocaleString("en-KE")}`;
}

export default function HeroChart() {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const value = useCountUp(TARGET_VALUE, inView);

  return (
    <div ref={ref} style={wrapStyle}>
      <div style={labelRowStyle}>
        <span style={labelStyle}>Practice portfolio</span>
        <span style={livePillStyle} aria-hidden="true">
          <span style={liveDotStyle} />
          Live
        </span>
      </div>

      <div style={valueRowStyle}>
        <span style={valueStyle}>{formatKsh(value)}</span>
        <span style={deltaStyle}>+12.4%</span>
      </div>

      <svg
        viewBox="0 0 400 220"
        role="img"
        aria-label="Line chart showing a practice portfolio rising over time while a comparison line falls, illustrating that both outcomes can be explored safely."
        style={svgStyle}
      >
        <defs>
          <pattern
            id="praxis-hero-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect width="400" height="220" fill="url(#praxis-hero-grid)" />

        <line
          x1="20"
          y1="130"
          x2="380"
          y2="130"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        <path
          d="M 20 130 C 80 120, 140 100, 180 90 S 260 60, 300 52 S 370 34, 380 30"
          fill="none"
          pathLength={1}
          className={
            "praxis-chart-line" + (inView ? " praxis-chart-visible" : "")
          }
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <path
          d="M 20 130 C 80 140, 140 160, 180 172 S 260 190, 300 196 S 370 208, 380 210"
          fill="none"
          pathLength={1}
          className={
            "praxis-chart-line" + (inView ? " praxis-chart-visible" : "")
          }
          stroke="var(--color-danger)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1"
          style={{ strokeDasharray: "6 6" }}
        />

        <circle
          cx="380"
          cy="30"
          r="5"
          fill="var(--color-primary)"
          className={
            "praxis-chart-dot" + (inView ? " praxis-chart-visible" : "")
          }
          style={{ transformOrigin: "380px 30px" }}
        />

        <circle
          cx="380"
          cy="210"
          r="5"
          fill="var(--color-danger)"
          className={
            "praxis-chart-dot" + (inView ? " praxis-chart-visible" : "")
          }
          style={{ transformOrigin: "380px 210px" }}
        />
      </svg>

      <div style={legendStyle}>
        <span style={legendItemStyle}>
          <span
            style={{ ...legendSwatchStyle, background: "var(--color-primary)" }}
          />
          Portfolio value
        </span>
        <span style={legendItemStyle}>
          <span
            style={{ ...legendSwatchStyle, background: "var(--color-danger)" }}
          />
          What if it goes the other way
        </span>
      </div>
    </div>
  );
}

const wrapStyle: CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "22px",
  width: "100%",
};

const labelRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "4px",
};

const labelStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "var(--color-text-muted)",
};

const livePillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--color-success)",
  background: "var(--color-success-soft)",
  border: "1px solid #bbf7d0",
  borderRadius: "999px",
  padding: "3px 9px",
};

const liveDotStyle: CSSProperties = {
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "var(--color-success)",
};

const valueRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
  marginBottom: "14px",
};

const valueStyle: CSSProperties = {
  fontSize: "30px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
  fontVariantNumeric: "tabular-nums",
};

const deltaStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--color-success)",
};

const svgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const legendStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "14px",
  marginTop: "14px",
};

const legendItemStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  fontSize: "13.5px",
  color: "var(--color-text-muted)",
};

const legendSwatchStyle: CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "2px",
  flexShrink: 0,
};
