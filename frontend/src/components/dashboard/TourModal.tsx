"use client";

import { useEffect, useState } from "react";
import Arrow from "@/components/ui/Arrow";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import "./tour.css";

const TOUR_SEEN_KEY = "praxis_tour_seen_v1";

type IconName = "welcome" | "learn" | "practice" | "mentor";

type Slide = {
  icon: IconName;
  kicker: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

const SLIDES: Slide[] = [
  {
    icon: "welcome",
    kicker: "Welcome",
    title: "Learn to think about markets.",
    body: "PRAXIS is a practice space for the Kenyan stock market. Real prices, real companies, no real money. You make decisions, see what happens, and build judgment over time.",
  },
  {
    icon: "learn",
    kicker: "Step 01 - Learn",
    title: "Start with Foundations.",
    body: "Five lessons. About two hours. What a share is, how prices move, what a company actually does. Everything else in PRAXIS assumes you know this.",
    cta: { label: "Open Foundations", href: "/learning" },
  },
  {
    icon: "practice",
    kicker: "Step 02 - Practice",
    title: "Build a real portfolio.",
    body: "Choose your starting virtual capital. Buy real NSE companies at real prices. Watch what happens. No consequences, real lessons.",
    cta: { label: "Set up portfolio", href: "/portfolio/setup" },
  },
  {
    icon: "mentor",
    kicker: "Step 03 - Ask",
    title: "Jema is your mentor.",
    body: "Stuck on a lesson? Curious why a stock moved? Jema answers questions, gives feedback on your decisions, and lives on the right edge of every page.",
  },
];

export function shouldShowTour(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(TOUR_SEEN_KEY) !== "1";
}

export function markTourSeen(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOUR_SEEN_KEY, "1");
}

function SlideIcon({ name }: { name: IconName }) {
  if (name === "welcome") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M33 15 L21 21 L15 33 L27 27 Z" />
      </svg>
    );
  }
  if (name === "learn") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 12 C18 8 10 8 6 10 L6 38 C10 36 18 36 24 40" />
        <path d="M24 12 C30 8 38 8 42 10 L42 38 C38 36 30 36 24 40" />
        <path d="M24 12 L24 40" />
      </svg>
    );
  }
  if (name === "practice") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 38 L16 26 L24 32 L42 10" />
        <path d="M34 10 L42 10 L42 18" />
        <path d="M6 42 L42 42" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="10" width="32" height="24" rx="4" />
      <path d="M16 34 L16 42 L24 34" />
      <circle cx="18" cy="22" r="1.4" fill="currentColor" />
      <circle cx="24" cy="22" r="1.4" fill="currentColor" />
      <circle cx="30" cy="22" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function TourModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setStep((s) => Math.min(SLIDES.length - 1, s + 1));
      if (e.key === "ArrowLeft") setStep((s) => Math.max(0, s - 1));
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const slide = SLIDES[step];
  const isLast = step === SLIDES.length - 1;
  const isFirst = step === 0;
  const pct = ((step + 1) / SLIDES.length) * 100;

  function finish() {
    markTourSeen();
    onClose();
  }

  function goToCta() {
    if (!slide.cta) return;
    markTourSeen();
    router.push(slide.cta.href);
    onClose();
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div className="praxis-tour-full" role="dialog" aria-modal="true" aria-label="Product tour">
      <header className="praxis-tour-top">
        <span className="praxis-tour-brand">PRAXIS</span>
        <div className="praxis-tour-top-right">
          <span className="praxis-tour-step">
            {String(step + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button type="button" className="praxis-tour-close" onClick={finish}>
            Skip
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </header>

      <div className="praxis-tour-progress" aria-hidden="true">
        <div className="praxis-tour-progress-fill" style={{ width: pct + "%" }} />
      </div>

      <main className="praxis-tour-stage">
        <div className="praxis-tour-icon" aria-hidden="true">
          <SlideIcon name={slide.icon} />
        </div>
        <span className="praxis-tour-slide-kicker">{slide.kicker}</span>
        <h1 className="praxis-tour-slide-title">{slide.title}</h1>
        <p className="praxis-tour-slide-body">{slide.body}</p>
        {slide.cta ? (
          <button type="button" className="praxis-tour-slide-cta" onClick={goToCta}>
            {slide.cta.label}
            <span aria-hidden="true"></span>
          </button>
        ) : null}
      </main>

      <footer className="praxis-tour-bottom">
        <button
          type="button"
          className="praxis-tour-btn praxis-tour-btn-ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={isFirst}
        >
          <Arrow size={16} direction="left" /> Back
        </button>

        <div className="praxis-tour-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={"praxis-tour-dot" + (i === step ? " is-active" : "")}
              onClick={() => setStep(i)}
              aria-label={"Go to step " + (i + 1)}
            />
          ))}
        </div>

        {isLast ? (
          <button type="button" className="praxis-tour-btn praxis-tour-btn-primary" onClick={finish}>
            Finish
          </button>
        ) : (
          <button
            type="button"
            className="praxis-tour-btn praxis-tour-btn-primary"
            onClick={() => setStep((s) => Math.min(SLIDES.length - 1, s + 1))}
          >
            Next <Arrow size={16} />
          </button>
        )}
      </footer>
    </div>,
    document.body,
  );

}
