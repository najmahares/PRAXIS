"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useMentor, type MentorStatus } from "@/lib/mentor/useMentor";
import type { MentorMessage } from "@/lib/mentor/types";
import Icon from "@/components/ui/Icon";
import JemaMark from "@/components/ui/JemaMark";
import MentorMarkdown from "@/components/ui/MentorMarkdown";
import MentorMessageActions from "@/components/ui/MentorMessageActions";
import "./mentor.css";

const STARTER_PROMPTS = [
  "What should I think about before buying a stock?",
  "Explain the P/E ratio like I am new to this.",
  "Why does a share price move even when nothing changed?",
  "Walk me through how a market order executes.",
];

export default function MentorPage() {
  const [draft, setDraft] = useState("");
  const [quizPending, setQuizPending] = useState<Record<string, boolean>>({});
  const {
    messages,
    memories,
    status,
    error,
    incomplete,
    cooldown,
    sendMessage,
    retry,
    clear,
  } = useMentor();
  const endRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const streaming = status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (streaming) return;
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    await sendMessage(text);
    textareaRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="praxis-mentor-shell">
      <aside className="praxis-mentor-sidebar">
        <div className="praxis-mentor-sidebar-header">
          <h2 style={sidebarTitleStyle}>Conversations</h2>
        </div>

        <button
          type="button"
          onClick={clear}
          className="praxis-mentor-new"
          disabled={streaming || messages.length === 0}
        >
          <Icon name="message" size={14} />
          New chat
        </button>

        <nav
          aria-label="Conversation history"
          className="praxis-mentor-thread-list"
        >
          <button
            type="button"
            className="praxis-mentor-thread praxis-mentor-thread-active"
            aria-current="true"
          >
            <span style={threadTitleStyle}>
              {messages.length === 0
                ? "New conversation"
                : deriveThreadTitle(messages)}
            </span>
            <span style={threadMetaStyle}>
              {messages.length === 0
                ? "Start typing"
                : `${countTurns(messages)} exchange${countTurns(messages) === 1 ? "" : "s"}`}
            </span>
          </button>
        </nav>

        <div style={sidebarNoteStyle}>
          <span style={sidebarNoteTitleStyle}>Memory</span>
          <span style={sidebarNoteBodyStyle}>
            Jema remembers durable facts about your progress and uses them to
            personalise future sessions. Your memories stay on your account.
          </span>
        </div>
      </aside>

      <section className="praxis-mentor-main">
        <header className="praxis-mentor-header">
          <div>
            <h1 style={headerBrandStyle}>
              <span style={headerMarkStyle} aria-hidden="true">
                <JemaMark size={18} />
              </span>
              Jema
            </h1>
            <p style={mainSubtitleStyle}>
              Educational guidance. Not investment advice.
            </p>
          </div>
          <span className="praxis-mentor-status" aria-live="polite">
            <span style={statusDotStyle(status)} aria-hidden="true" />
            {statusLabel(status)}
          </span>
        </header>

        <div className="praxis-mentor-scroll">
          {messages.length === 0 ? (
            <EmptyState
              onPick={(text) => void sendMessage(text)}
              disabled={streaming}
              memories={memories}
            />
          ) : (
            <ul className="praxis-mentor-messages" style={listStyle}>
              {messages.map((entry) => (
                <li
                  key={entry.id}
                  style={
                    entry.role === "user" ? userRowStyle : assistantRowStyle
                  }
                >
                  {entry.role === "assistant" ? (
                    <span style={avatarStyle} aria-hidden="true">
                      <JemaMark size={14} />
                    </span>
                  ) : null}
                  <div
                    style={
                      entry.role === "user"
                        ? userBubbleStyle
                        : assistantBodyStyle
                    }
                  >
                    {entry.content.length > 0 ? (
                      entry.role === "assistant" ? (
                        <MentorMarkdown
                          content={entry.content}
                          onTeachConcept={(concept) =>
                            void sendMessage(concept)
                          }
                          onQuizReady={() =>
                            setQuizPending((prev) => ({ ...prev, [entry.id]: true }))
                          }
                        />
                      ) : (
                        entry.content
                      )
                    ) : (
                      <span
                        style={typingRowStyle}
                        aria-label="Mentor is typing"
                      >
                        <span className="praxis-mentor-dot" />
                        <span className="praxis-mentor-dot" />
                        <span className="praxis-mentor-dot" />
                      </span>
                    )}
                    {entry.role === "assistant" &&
                    entry.content.length > 0 &&
                    !streaming ? (
                      <MentorMessageActions
                        content={entry.content}
                        canRetry={
                          entry.id ===
                          messages
                            .filter((m) => m.role === "assistant")
                            .slice(-1)[0]?.id
                        }
                        onRetry={() => void retry()}
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div ref={endRef} />
        </div>

        {error ? (
          <div role="alert" className="praxis-mentor-error">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => void retry()}
              style={retryInlineStyle}
              disabled={cooldown > 0}
            >
              {cooldown > 0 ? `${cooldown}s` : incomplete ? "Continue" : "Retry"}
            </button>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="praxis-mentor-input-bar">
          <div className="praxis-mentor-textarea-wrap">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your mentor anything about what you are practicing."
              rows={2}
              disabled={streaming}
              className="praxis-mentor-textarea"
              aria-label="Message to your mentor"
            />
            <button
              type="submit"
              className="praxis-mentor-send"
              disabled={streaming || draft.trim().length === 0}
              aria-label="Send message"
            >
              <Icon name="arrow-right" size={16} />
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function EmptyState({
  onPick,
  disabled,
  memories,
}: {
  onPick: (text: string) => void;
  disabled: boolean;
  memories: Array<{ fact: string; concept: string }>;
}) {
  const promptSet = buildDynamicPrompts(memories);
  return (
    <div className="praxis-mentor-empty">
      <div style={emptyAvatarStyle} aria-hidden="true">
        <JemaMark size={28} />
      </div>
      <h2 style={emptyTitleStyle}>Ask your mentor anything.</h2>
      <p style={emptyBodyStyle}>
        Your mentor knows what you are working on. It will not tell you what to
        buy. It will help you reason through the decision yourself.
      </p>
      <ul style={emptyPromptsStyle}>
        {promptSet.map((prompt) => (
          <li key={prompt}>
            <button
              type="button"
              onClick={() => onPick(prompt)}
              className="praxis-mentor-prompt"
              disabled={disabled}
            >
              {prompt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PROMPT_TOPIC = /\b(stock|share|equity|market|nse|portfolio|dividend|valuation|p\/e|earnings|revenue|profit|risk|bond|order|position|liquidity|inflation|interest|chart|company|balance|capital|invest|sector|trade|allocation|diversif)/i;


function buildDynamicPrompts(
  memories: Array<{ fact: string; concept: string }>,
): string[] {
  const concepts = Array.from(
    new Set(
      memories
        .slice(-10)
        .map((m) => m.concept)
        .filter((c): c is string =>
          typeof c === "string" && c.length > 0 && PROMPT_TOPIC.test(c),
        ),
    ),
  ).slice(0, 2);

  const out: string[] = [];
  for (const concept of concepts) out.push("Quiz me on " + concept);
  for (const p of STARTER_PROMPTS) {
    if (out.length >= 4) break;
    out.push(p);
  }
  return out.slice(0, 4);
}

const TOPIC_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\b(quiz|test me)\b/i, label: "Quiz session" },
  { pattern: /\b(position siz|risk per trade|stop[- ]loss|shares to buy)/i, label: "Position sizing" },
  { pattern: /\b(revenue|profit|income statement|gross profit|net profit|earnings|margin)/i, label: "Revenue and profit" },
  { pattern: /\b(portfolio|allocation|diversif|concentration|sector exposure|holdings)/i, label: "Portfolio construction" },
  { pattern: /\b(dividend|yield|payout)/i, label: "Dividends" },
  { pattern: /\b(p\/e|price[- ]to[- ]earnings|valuation|price to book|undervalued|overvalued)/i, label: "Valuation" },
  { pattern: /\b(balance sheet|assets|liabilities|equity|debt)/i, label: "Balance sheet" },
  { pattern: /\b(cash[- ]flow|operating cash|free cash)/i, label: "Cash flow" },
  { pattern: /\b(bond|coupon|fixed income|maturity)/i, label: "Bonds" },
  { pattern: /\b(order|bid|ask|execution|settle|broker|exchange|volume|liquidit)/i, label: "Market mechanics" },
  { pattern: /\b(interest rate|inflation|recession|economic|gdp)/i, label: "Economic environment" },
  { pattern: /\b(volatility|risk|return)/i, label: "Risk and return" },
  { pattern: /\b(stock|share|equity|ownership)/i, label: "Stocks" },
  { pattern: /\b(market|index|nse|safaricom|equity group|kcb|eabl)/i, label: "Market context" },
];

function deriveThreadTitle(messages: MentorMessage[]): string {
  const first = messages.find((entry) => entry.role === "user");
  if (!first) return "New conversation";
  const text = first.content.trim();
  for (const { pattern, label } of TOPIC_PATTERNS) {
    if (pattern.test(text)) return label;
  }
  const words = text.split(/\s+/).slice(0, 5).join(" ");
  return words.length > 34 ? `${words.slice(0, 34)}...` : words;
}

function countTurns(messages: MentorMessage[]): number {
  return messages.filter((entry) => entry.role === "user").length;
}

function statusLabel(status: MentorStatus): string {
  if (status === "streaming") return "Thinking";
  if (status === "error") return "Needs retry";
  return "Ready";
}

const statusDotStyle = (status: MentorStatus): CSSProperties => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background:
    status === "streaming"
      ? "var(--color-primary)"
      : status === "error"
        ? "var(--color-danger)"
        : "var(--color-success)",
});

const sidebarTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
};

const threadTitleStyle: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "var(--color-text)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  textAlign: "left",
};

const threadMetaStyle: CSSProperties = {
  fontSize: 11,
  color: "var(--color-text-muted)",
  textAlign: "left",
};

const sidebarNoteStyle: CSSProperties = {
  marginTop: 12,
  padding: 12,
  background: "var(--color-surface-muted)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

const sidebarNoteTitleStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--color-text)",
};

const sidebarNoteBodyStyle: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.5,
  color: "var(--color-text-muted)",
  whiteSpace: "pre-line",
};

const mainSubtitleStyle: CSSProperties = {
  margin: "2px 0 0",
  fontSize: 13,
  color: "var(--color-text-muted)",
};

const listStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const userRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
};

const assistantRowStyle: CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
};

const avatarStyle: CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginTop: 2,
};

const userBubbleStyle: CSSProperties = {
  maxWidth: "70%",
  background: "var(--color-primary)",
  color: "#ffffff",
  padding: "10px 14px",
  borderRadius: "14px 14px 4px 14px",
  fontSize: 14,
  lineHeight: 1.55,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};

const assistantBodyStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
};

const typingRowStyle: CSSProperties = {
  display: "inline-flex",
  gap: 4,
  paddingTop: 6,
};

const retryInlineStyle: CSSProperties = {
  background: "transparent",
  border: "1px solid currentColor",
  color: "inherit",
  padding: "3px 10px",
  borderRadius: 6,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
};

const emptyAvatarStyle: CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
};

const emptyTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
};

const emptyBodyStyle: CSSProperties = {
  margin: "8px 0 24px",
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
  maxWidth: 420,
};

const emptyPromptsStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
  maxWidth: 480,
};

const headerBrandStyle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const headerMarkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: "50%",
  background: "var(--color-primary)",
  color: "#ffffff",
  flexShrink: 0,
};
