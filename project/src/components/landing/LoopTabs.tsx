"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const STEPS = [
  {
    n: "01",
    title: "Learn",
    body:
      "Short, interactive explanations of how the market actually works. Shares, exchanges, price movements, and the vocabulary you will need. No textbooks, no lectures, no video walls.",
    bg: "var(--color-tint-blue-bg)",
    border: "var(--color-tint-blue-border)",
    accent: "var(--color-tint-blue-fg)",
  },
  {
    n: "02",
    title: "Research",
    body:
      "Explore real companies, prices, sectors, and basic financials with beginner-friendly context. Read what Safaricom actually does, why Equity Group moves, and how EABL earns its money.",
    bg: "var(--color-tint-teal-bg)",
    border: "var(--color-tint-teal-border)",
    accent: "var(--color-tint-teal-fg)",
  },
  {
    n: "03",
    title: "Decide",
    body:
      "Buy, sell, hold, or rebalance with the virtual capital you choose. Every decision is yours to explain, and none of it touches real money or a real brokerage account.",
    bg: "var(--color-tint-purple-bg)",
    border: "var(--color-tint-purple-border)",
    accent: "var(--color-tint-purple-fg)",
  },
  {
    n: "04",
    title: "Experience",
    body:
      "See what happens as the simulated market reacts to your choice. Prices move, news lands, and the outcome is not scripted to be kind to you. That is the point.",
    bg: "var(--color-tint-amber-bg)",
    border: "var(--color-tint-amber-border)",
    accent: "var(--color-tint-amber-fg)",
  },
  {
    n: "05",
    title: "Reflect",
    body:
      "Explain your reasoning and hear what your mentor noticed. What did you see in the data? What did you miss? What would you do differently next time, and why?",
    bg: "var(--color-tint-rose-bg)",
    border: "var(--color-tint-rose-border)",
    accent: "var(--color-tint-rose-fg)",
  },
  {
    n: "06",
    title: "Improve",
    body:
      "Get new practice scenarios that target what you struggled with. The system tracks the concepts you need reps on and quietly builds them into your next session.",
    bg: "var(--color-tint-green-bg)",
    border: "var(--color-tint-green-border)",
    accent: "var(--color-tint-green-fg)",
  },
];

const AUTO_ADVANCE_MS = 3600;
const TRANSITION_MS = 500;

export default function LoopTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastAdvanceRef = useRef<number>(Date.now());

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibility = () => {
      if (document.hidden) {
        setPaused(true);
      } else {
        lastAdvanceRef.current = Date.now();
        setPaused(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const elapsed = Date.now() - lastAdvanceRef.current;
    const remaining = Math.max(0, AUTO_ADVANCE_MS - elapsed);

    const id = window.setTimeout(() => {
      lastAdvanceRef.current = Date.now();
      setActive((prev) => (prev + 1) % STEPS.length);
    }, remaining);

    return () => window.clearTimeout(id);
  }, [reducedMotion, paused, active]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="The PRAXIS loop"
      style={rootStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div style={viewportStyle}>
        <div
          style={{
            ...trackStyle,
            transform: `translateX(-${active * 100}%)`,
            transition: reducedMotion
              ? "none"
              : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {STEPS.map((step, index) => (
            <div
              key={step.n}
              role="group"
              aria-roledescription="slide"
              aria-label={`Step ${index + 1} of ${STEPS.length}: ${step.title}`}
              aria-hidden={index !== active}
              className="praxis-loop-panel"
              style={{
                background: step.bg,
                borderColor: step.border,
              }}
            >
              <span
                style={{ ...panelNumberStyle, color: step.accent }}
                aria-hidden="true"
              >
                {step.n}
              </span>
              <div style={panelTextColumnStyle}>
                <h3 style={{ ...panelTitleStyle, color: step.accent }}>
                  {step.title}
                </h3>
                <p style={panelBodyStyle}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p aria-live="polite" aria-atomic="true" style={srOnlyStyle}>
        {`Step ${active + 1} of ${STEPS.length}: ${STEPS[active].title}`}
      </p>
    </div>
  );
}

const rootStyle: CSSProperties = { width: "100%" };
const viewportStyle: CSSProperties = { overflow: "hidden", borderRadius: "var(--radius-lg)" };
const trackStyle: CSSProperties = { display: "flex", width: "100%", willChange: "transform" };
const panelNumberStyle: CSSProperties = {
  fontSize: "clamp(4rem, 8vw, 7rem)",
  fontWeight: 800,
  letterSpacing: "-0.05em",
  lineHeight: 1,
  flexShrink: 0,
  opacity: 0.28,
};
const panelTextColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  minWidth: 0,
};
const panelTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2rem, 3.4vw, 2.8rem)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.1,
};
const panelBodyStyle: CSSProperties = {
  margin: 0,
  fontSize: "18px",
  lineHeight: 1.65,
  color: "var(--color-text)",
  maxWidth: "620px",
};
const srOnlyStyle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};
