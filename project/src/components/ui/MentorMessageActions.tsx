"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MentorMessageActionsProps = {
  content: string;
  canRetry: boolean;
  onRetry: () => void;
};

type Feedback = "up" | "down" | null;

export default function MentorMessageActions({
  content,
  canRetry,
  onRetry,
}: MentorMessageActionsProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [speaking, setSpeaking] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (!shareOpen) return;
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (shareRef.current && !shareRef.current.contains(target)) {
        setShareOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setShareOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [shareOpen]);

  function flash(text: string) {
    setNote(text);
    window.setTimeout(() => setNote(null), 1800);
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      flash("Could not copy");
    }
  }, [content]);

  const handleRetry = useCallback(() => {
    if (!canRetry) return;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
    onRetry();
  }, [canRetry, onRetry]);

  const handleFeedback = useCallback((next: Feedback) => {
    setFeedback(next);
    flash(next === "up" ? "Thanks for the feedback" : "We will work on it");
  }, []);

  const handleSpeak = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      flash("Read aloud not supported");
      return;
    }
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(utterance);
  }, [content, speaking]);

  const formattedShare = `Jema (PRAXIS), educational guidance, not investment advice.\n\n${content}`;
  const sharePreview =
    formattedShare.length > 1800 ? `${formattedShare.slice(0, 1800)}...` : formattedShare;

  const shareOptions = [
    {
      label: "Copy as text",
      run: async () => {
        try {
          await navigator.clipboard.writeText(formattedShare);
          flash("Copied with attribution");
        } catch {
          flash("Could not copy");
        }
      },
    },
    {
      label: "Share via email",
      run: () => {
        const subject = encodeURIComponent("Jema · PRAXIS");
        const body = encodeURIComponent(sharePreview);
        window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
      },
    },
    {
      label: "Share to WhatsApp",
      run: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(sharePreview)}`, "_blank");
      },
    },
    {
      label: "Share to X",
      run: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePreview.slice(0, 250))}`,
          "_blank",
        );
      },
    },
  ];

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  async function runNativeShare() {
    try {
      await navigator.share({ title: "Jema · PRAXIS", text: sharePreview });
    } catch {
      
    }
  }

  return (
    <div style={rowStyle}>
      <div style={buttonsStyle}>
        <ActionButton label={copied ? "Copied" : "Copy"} onClick={handleCopy} active={copied}>
          <CopyIcon />
        </ActionButton>

        <ActionButton label="Retry" onClick={handleRetry} disabled={!canRetry}>
          <RetryIcon />
        </ActionButton>

        <ActionButton
          label={feedback === "up" ? "Thanks" : "Good reply"}
          onClick={() => handleFeedback("up")}
          active={feedback === "up"}
        >
          <ThumbUpIcon />
        </ActionButton>

        <ActionButton
          label={feedback === "down" ? "Noted" : "Bad reply"}
          onClick={() => handleFeedback("down")}
          active={feedback === "down"}
        >
          <ThumbDownIcon />
        </ActionButton>

        <ActionButton
          label={speaking ? "Stop reading" : "Read aloud"}
          onClick={handleSpeak}
          active={speaking}
        >
          <SpeakerIcon />
        </ActionButton>

        <div ref={shareRef} style={shareWrapStyle}>
          <ActionButton
            label="Share"
            onClick={() => setShareOpen((value) => !value)}
            active={shareOpen}
          >
            <ShareIcon />
          </ActionButton>

          {shareOpen ? (
            <div role="menu" aria-label="Share options" style={menuStyle}>
              {hasNativeShare ? (
                <button
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    setShareOpen(false);
                    await runNativeShare();
                  }}
                  style={menuItemStyle}
                >
                  Share using device
                </button>
              ) : null}
              {shareOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  role="menuitem"
                  onClick={async () => {
                    setShareOpen(false);
                    await option.run();
                  }}
                  style={menuItemStyle}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {note ? (
        <span role="status" style={noteStyle}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  children,
  disabled = false,
  active = false,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="praxis-mentor-action"
      style={
        disabled
          ? { ...buttonStyle, opacity: 0.35, cursor: "not-allowed" }
          : active
            ? { ...buttonStyle, ...buttonActiveStyle }
            : buttonStyle
      }
    >
      {children}
    </button>
  );
}

const ICON_SIZE = 18;
const ICON_STROKE = 2;

function CopyIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function RetryIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

function ThumbUpIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l3.34-6.67A2 2 0 0 1 12.15 2h.85a2 2 0 0 1 2 2v1.88z" />
    </svg>
  );
}

function ThumbDownIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17v12l-3.34 6.67A2 2 0 0 1 11.85 22h-.85a2 2 0 0 1-2-2v-1.88z" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ICON_STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 12,
  minHeight: 30,
};

const buttonsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const buttonStyle: CSSProperties = {
  width: 32,
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: 8,
  color: "var(--color-text-muted)",
  cursor: "pointer",
};

const buttonActiveStyle: CSSProperties = {
  background: "var(--color-tint-blue-bg)",
  border: "1px solid var(--color-tint-blue-border)",
  color: "var(--color-tint-blue-fg)",
};

const shareWrapStyle: CSSProperties = {
  position: "relative",
};

const menuStyle: CSSProperties = {
  position: "absolute",
  bottom: "calc(100% + 8px)",
  left: 0,
  minWidth: 200,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 10,
  boxShadow: "var(--shadow-md)",
  padding: 6,
  zIndex: 60,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const menuItemStyle: CSSProperties = {
  display: "block",
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text)",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: 6,
};

const noteStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--color-text-muted)",
};
