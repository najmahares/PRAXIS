"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "idle" | "user" | "typing" | "reply";

export default function MentorChat() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setPhase("reply");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            setPhase("reply");
          } else {
            const t1 = window.setTimeout(() => setPhase("user"), 150);
            const t2 = window.setTimeout(() => setPhase("typing"), 900);
            const t3 = window.setTimeout(() => setPhase("reply"), 2100);
            observer.disconnect();
            return () => {
              window.clearTimeout(t1);
              window.clearTimeout(t2);
              window.clearTimeout(t3);
            };
          }
          observer.disconnect();
          return;
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showUser = phase === "user" || phase === "typing" || phase === "reply";
  const showTyping = phase === "typing";
  const showReply = phase === "reply";

  return (
    <div ref={ref} style={chatStyle} aria-label="Example mentor conversation">
      <div style={chatHeaderStyle}>
        <span style={avatarStyle} aria-hidden="true">
          M
        </span>
        <div>
          <div style={chatNameStyle}>PRAXIS Mentor</div>
          <div style={chatRoleStyle}>Educational guidance</div>
        </div>
      </div>

      <div style={messagesStyle}>
        {showUser ? (
          <div style={{ ...rowStyle, justifyContent: "flex-end" }}>
            <div style={userBubbleStyle}>
              I bought 20 shares of Safaricom. Did I do the right thing?
            </div>
          </div>
        ) : null}

        {showTyping ? (
          <div style={rowStyle}>
            <div style={typingBubbleStyle} aria-label="Mentor is typing">
              <span className="praxis-typing-dot" />
              <span className="praxis-typing-dot" />
              <span className="praxis-typing-dot" />
            </div>
          </div>
        ) : null}

        {showReply ? (
          <div style={rowStyle}>
            <div style={mentorBubbleStyle}>
              <p style={bubbleTextStyle}>
                That depends on why you bought it. Walk me through your
                thinking.
              </p>
              <p style={bubbleTextStyle}>
                What did you expect to happen, and what would tell you the idea
                was wrong?
              </p>
              <div style={chipsStyle}>
                <span style={chipStyle}>Explain this simply</span>
                <span style={chipStyle}>Quiz me</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div style={inputBarStyle} aria-hidden="true">
        <span style={inputTextStyle}>Ask your mentor…</span>
        <span style={sendStyle}>Send</span>
      </div>
    </div>
  );
}

const chatStyle: CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  overflow: "hidden",
  width: "100%",
};

const chatHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 16px",
  borderBottom: "1px solid var(--color-border)",
  background: "var(--color-surface-muted)",
};

const avatarStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const chatNameStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const chatRoleStyle: CSSProperties = {
  fontSize: "11px",
  color: "var(--color-text-muted)",
};

const messagesStyle: CSSProperties = {
  padding: "18px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  minHeight: "260px",
};

const rowStyle: CSSProperties = {
  display: "flex",
};

const userBubbleStyle: CSSProperties = {
  maxWidth: "80%",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "14px",
  lineHeight: 1.5,
  padding: "10px 14px",
  borderRadius: "14px 14px 4px 14px",
};

const mentorBubbleStyle: CSSProperties = {
  maxWidth: "88%",
  background: "var(--color-surface-muted)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text)",
  fontSize: "14px",
  lineHeight: 1.55,
  padding: "12px 14px",
  borderRadius: "14px 14px 14px 4px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const bubbleTextStyle: CSSProperties = {
  margin: 0,
};

const chipsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginTop: "2px",
};

const chipStyle: CSSProperties = {
  fontSize: "11px",
  fontWeight: 500,
  color: "var(--color-primary)",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-strong)",
  borderRadius: "999px",
  padding: "4px 10px",
};

const typingBubbleStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  background: "var(--color-surface-muted)",
  border: "1px solid var(--color-border)",
  borderRadius: "14px 14px 14px 4px",
  padding: "12px 16px",
};

const inputBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderTop: "1px solid var(--color-border)",
  background: "var(--color-surface-muted)",
};

const inputTextStyle: CSSProperties = {
  fontSize: "13px",
  color: "var(--color-text-muted)",
};

const sendStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: "var(--color-text-muted)",
};
