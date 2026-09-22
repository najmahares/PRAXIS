"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import JemaMark from "@/components/ui/JemaMark";
import { buildMentorContext } from "@/lib/mentor/context";
import MentorMarkdown from "@/components/ui/MentorMarkdown";
import MentorMessageActions from "@/components/ui/MentorMessageActions";

type Memory = { id: string; fact: string; concept: string; createdAt: number };
type Msg = { id: string; role: "user" | "assistant"; content: string };

const CONCEPT_TO_LESSON: Record<string, { id: string; label: string }> = {
  practice: { id: "16.6", label: "16.6 · Building the habit" },
  behaviour: { id: "15.2", label: "15.2 · Loss aversion" },
  thesis: { id: "14.5", label: "14.5 · The one-page thesis" },
  valuation: { id: "14.3", label: "14.3 · Valuation" },
  "position sizing": { id: "14.4", label: "14.4 · Position sizing" },
  "risk management": { id: "13.2", label: "13.2 · Risk tolerance" },
  "bond mechanics": { id: "9.1", label: "9.1 · Bond basics" },
  "balance sheet": { id: "2.4", label: "2.4 · The balance sheet" },
  diversification: { id: "12.4", label: "12.4 · Diversifiers" },
  direction: { id: "13.1", label: "13.1 · Why direction comes first" },
  tax: { id: "16.1", label: "16.1 · Records and tax" },
};

function pageLabelFromPathname(p: string): string {
  if (p.startsWith("/dashboard")) return "Home";
  if (p.startsWith("/learning")) return "My Learning";
  if (p.startsWith("/practice")) return "Practice";
  if (p.startsWith("/market")) return "Market";
  if (p.startsWith("/portfolio")) return "Portfolio";
  if (p.startsWith("/mentor")) return "Mentor";
  return "PRAXIS";
}

export default function JemaSidePanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/memories", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setMemories((d.memories ?? []) as Memory[]))
      .catch(() => {});
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function sendPrefilled(text: string) {
    if (streaming) return;
    setInput("");
    setError(null);

    const userMsg: Msg = {
      id: "u-" + Date.now(),
      role: "user",
      content: text,
    };
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages([...messages, userMsg]);

    const assistantId = "a-" + Date.now();
    setMessages((cur) => [...cur, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const ctx = buildMentorContext();
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, context: ctx }),
      });
      if (!res.ok || !res.body) throw new Error("unavailable");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((cur) =>
          cur.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
        );
      }
    } catch {
      setError("Jema is unavailable right now. Try again in a moment.");
      setMessages((cur) => cur.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    setError(null);

    const userMsg: Msg = {
      id: "u-" + Date.now(),
      role: "user",
      content: text,
    };
    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const next = [...messages, userMsg];
    setMessages(next);

    const assistantId = "a-" + Date.now();
    setMessages((cur) => [...cur, { id: assistantId, role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const ctx = buildMentorContext();
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history,
          context: ctx,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Mentor unavailable");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((cur) =>
          cur.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
        );
      }
    } catch {
      setError("Jema is unavailable right now. Try again in a moment.");
      setMessages((cur) => cur.filter((m) => m.id !== assistantId));
    } finally {
      setStreaming(false);
    }
  }

  const page = pageLabelFromPathname(pathname ?? "");
  const visibleMemories = memories.slice(0, 3);

  return (
    <>
      <button
        type="button"
        className="praxis-jema-launcher"
        data-active={open ? "true" : "false"}
        onClick={() => (open ? onClose() : undefined)}
        aria-label={open ? "Close Jema" : "Open Jema"}
        aria-expanded={open}
        aria-controls="jema-panel"
      >
        <JemaMark size={22} />
        {!open && <span className="praxis-jema-launcher-dot" aria-hidden="true" />}
      </button>

      <aside
        id="jema-panel"
        className="praxis-jema-panel"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <header className="praxis-jema-head">
          <div className="praxis-jema-head-left">
            <JemaMark size={22} />
            <div className="praxis-jema-head-text">
              <span className="praxis-jema-head-title">Jema</span>
              <span className="praxis-jema-head-sub">On {page}</span>
            </div>
          </div>
          <button
            type="button"
            className="praxis-jema-close"
            onClick={onClose}
            aria-label="Close Jema panel"
          >
            {"\u00D7"}
          </button>
        </header>

        <div className="praxis-jema-scroll" ref={scrollRef}>
          {visibleMemories.length > 0 ? (
            <section className="praxis-jema-section" aria-label="Notes">
              <span className="praxis-jema-section-title">Notes</span>
              <ul className="praxis-jema-notes">
                {visibleMemories.map((m) => {
                  const lesson = CONCEPT_TO_LESSON[m.concept.toLowerCase()];
                  return (
                    <li key={m.id} className="praxis-jema-note">
                      <button
                        type="button"
                        className="praxis-jema-note-btn"
                        onClick={() => void sendPrefilled("Tell me more about: " + m.fact)}
                        disabled={streaming}
                      >
                        <p className="praxis-jema-note-fact">{m.fact}</p>
                        <div className="praxis-jema-note-foot">
                          <span className="praxis-jema-note-concept">{m.concept}</span>
                        </div>
                      </button>
                      {lesson ? (
                        <Link
                          href={"/learning/lesson/" + lesson.id.replace(".", "-")}
                          className="praxis-jema-note-lesson"
                          onClick={onClose}
                        >
                          {lesson.label}
                        </Link>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            <section className="praxis-jema-section">
              <span className="praxis-jema-section-title">Notes</span>
              <p className="praxis-jema-empty">
                Jema will remember what you learn as you go. Nothing yet.
              </p>
            </section>
          )}

          {messages.length > 0 ? (
            <section className="praxis-jema-section" aria-label="Conversation">
              <span className="praxis-jema-section-title">Conversation</span>
              <ul className="praxis-jema-chat">
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className={
                      "praxis-jema-msg " +
                      (m.role === "user" ? "is-user" : "is-jema")
                    }
                  >
                    {m.role === "assistant" && !m.content ? (
                      <span className="praxis-jema-typing">Jema is thinking…</span>
                    ) : m.role === "assistant" ? (
                      <>
                      <MentorMarkdown content={m.content} />
                      {!streaming && (
                        <MentorMessageActions
                          content={m.content}
                          canRetry={messages[messages.length - 1]?.id === m.id}
                          onRetry={() => void sendPrefilled(messages.filter((x) => x.role === "user").slice(-1)[0]?.content ?? "")}
                        />
                      )}
                    </>
                    ) : (
                      <span className="praxis-jema-msg-text">{m.content}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {error ? <p className="praxis-jema-error">{error}</p> : null}
        </div>

        <form
          className="praxis-jema-compose"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <textarea
            className="praxis-jema-input"
            rows={2}
            placeholder="Ask Jema about this page, your portfolio, or a concept…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            disabled={streaming}
          />
          <button
            type="submit"
            className="praxis-jema-send"
            disabled={streaming || !input.trim()}
          >
            {streaming ? "…" : "Send"}
          </button>
        </form>
      </aside>
    </>
  );
}
