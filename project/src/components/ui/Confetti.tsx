"use client";

import { useEffect, useMemo, useState } from "react";

type ConfettiProps = {
  pieces?: number;
  duration?: number;
};

const COLORS = [
  "#2563eb",
  "#0d9488",
  "#7c3aed",
  "#d97706",
  "#dc2626",
  "#15803d",
  "#f59e0b",
  "#0891b2",
];

export default function Confetti({ pieces = 80, duration = 4200 }: ConfettiProps) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setActive(false), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  const parts = useMemo(() => {
    return Array.from({ length: pieces }, (_, i) => {
      const isCircle = Math.random() > 0.55;
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 900,
        duration: 2000 + Math.random() * 1800,
        rotateStart: Math.random() * 360,
        drift: -40 + Math.random() * 80,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        width: 6 + Math.random() * 6,
        height: isCircle ? 6 + Math.random() * 6 : 10 + Math.random() * 8,
        round: isCircle,
      };
    });
  }, [pieces]);

  if (!active) return null;

  return (
    <div className="praxis-confetti" aria-hidden="true">
      {parts.map((part) => (
        <span
          key={part.id}
          className="praxis-confetti-piece"
          style={{
            left: `${part.left}%`,
            width: part.width,
            height: part.height,
            background: part.color,
            borderRadius: part.round ? "50%" : "2px",
            animationDelay: `${part.delay}ms`,
            animationDuration: `${part.duration}ms`,
            ["--praxis-confetti-rotate-start" as string]: `${part.rotateStart}deg`,
            ["--praxis-confetti-drift" as string]: `${part.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
