"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  style?: CSSProperties;
};

export default function Reveal({ children, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const className =
    "praxis-reveal" +
    (visible ? " praxis-reveal-visible" : "") +
    (delay > 0 ? ` praxis-reveal-delay-${delay}` : "");

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
