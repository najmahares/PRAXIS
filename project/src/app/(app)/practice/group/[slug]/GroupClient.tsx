"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PracticeCard, CardType } from "@/lib/practice/cards";
import "../../practice.css";

const TYPE_LABELS: Record<CardType, string> = {
  scenario: "Scenario",
  drill: "Drill",
  mission: "Mission",
};

const TARGET = 10;

type Difficulty = "easy" | "medium" | "hard";

const DIFFICULTY_HINT: Record<Difficulty, string> = {
  easy: "Simple setups. One concept per card. Good for a first pass.",
  medium: "Standard. Some reasoning required, one idea per card.",
  hard: "Multi-step reasoning. Subtler trade-offs. For when you feel ready.",
};

export default function GroupClient({
  level,
  type,
  seed,
  generatedCount,
  initialItems,
  initialCompletedIds,
  isAuthed,
}: {
  level: number;
  type: CardType;
  seed: PracticeCard[];
  generatedCount: number;
  initialItems: PracticeCard[];
  initialCompletedIds: string[];
  isAuthed: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<PracticeCard[]>(initialItems);
  const [completed, setCompleted] = useState<Set<string>>(new Set(initialCompletedIds));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const autoTriggered = useRef(false);

  useEffect(() => {
    if (!isAuthed) return;
    if (generatedCount > 0) return;
    if (items.length > seed.length) return;
    if (autoTriggered.current) return;
    autoTriggered.current = true;
    void generate("generate", "medium", true);
  }, [isAuthed, generatedCount, items.length, seed.length]);

  async function generate(mode: "generate" | "replace", diff: Difficulty, silent = false) {
    setBusy(true);
    setStatus(silent ? "Preparing your set…" : "Preparing a fresh set…");
    setError(null);
    try {
      const res = await fetch("/api/practice/cards/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, type, count: TARGET, mode, difficulty: diff }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not generate cards.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error while generating.");
    } finally {
      setBusy(false);
      setStatus(null);
    }
  }

  useEffect(() => {
    setItems(initialItems);
    setCompleted(new Set(initialCompletedIds));
  }, [initialItems, initialCompletedIds]);

  const doneCount = items.filter((c) => completed.has(c.id)).length;
  const allDone = items.length > 0 && doneCount === items.length;
  const isPreparing = busy && items.length <= seed.length;
  const remaining = items.length - doneCount;

  return (
    <div className="praxis-card-run">
      <Link href="/practice" className="praxis-practice-back">
        <span aria-hidden="true">{"\u2190"}</span>
        <span>Back to library</span>
      </Link>

      <header className="praxis-card-run-head">
        <span className={"praxis-card-run-tag is-" + type}>
          Level {level} · {TYPE_LABELS[type]}
        </span>
        <h1 className="praxis-card-run-title">
          Level {level} {TYPE_LABELS[type]}s
        </h1>
        <p className="praxis-card-run-lesson">
          {doneCount} of {items.length} completed
          {remaining > 0 ? " · " + remaining + " to go" : ""}
        </p>
      </header>

      {isPreparing ? (
        <div className="praxis-group-preparing">
          <span className="praxis-group-preparing-spinner" aria-hidden="true" />
          <div>
            <span className="praxis-group-preparing-title">Preparing your set</span>
            <p className="praxis-group-preparing-body">
              Jema is writing 10 {TYPE_LABELS[type].toLowerCase()}s for Level {level}. This takes about 15 seconds the first time.
            </p>
          </div>
        </div>
      ) : null}

      {status && !isPreparing ? <p className="praxis-group-status">{status}</p> : null}
      {error ? <p className="praxis-practice-lib-error">{error}</p> : null}

      <ul className="praxis-group-list">
        {items.map((it) => {
          const isDone = completed.has(it.id);
          return (
            <li key={it.id}>
              <Link
                href={"/practice/" + it.id}
                className={"praxis-group-item" + (isDone ? " is-done" : "")}
              >
                <div className="praxis-group-item-main">
                  <span className="praxis-group-item-title">{it.title}</span>
                  <span className="praxis-group-item-brief">{it.brief}</span>
                </div>
                <span className="praxis-group-item-status">
                  {isDone ? "\u2713" : "\u2192"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {isAuthed ? (
        <div className="praxis-group-foot">
          {allDone ? (
            <>
              <p className="praxis-group-foot-note">
                You have finished this set. Choose a difficulty for the next batch.
              </p>

              <div className="praxis-group-diff-panel" aria-label="Next batch difficulty">
                <div className="praxis-group-difficulty" role="radiogroup" aria-label="Difficulty">
                  {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={difficulty === d}
                      onClick={() => setDifficulty(d)}
                      className={"praxis-group-difficulty-btn" + (difficulty === d ? " is-active" : "")}
                    >
                      {d.charAt(0).toUpperCase() + d.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="praxis-group-diff-hint">{DIFFICULTY_HINT[difficulty]}</p>
              </div>

              <div className="praxis-group-foot-actions">
                <button
                  type="button"
                  className="praxis-practice-primary"
                  onClick={() => generate("generate", difficulty)}
                  disabled={busy}
                >
                  {busy ? "Generating…" : "Generate 10 more"}
                </button>
                <button
                  type="button"
                  className="praxis-practice-secondary"
                  onClick={() => generate("replace", difficulty)}
                  disabled={busy}
                >
                  {busy ? "Generating…" : "Start a fresh set"}
                </button>
              </div>
            </>
          ) : (
            <p className="praxis-group-foot-locked">
              Complete all {items.length} items to unlock a fresh batch.
              {remaining > 0 ? " " + remaining + " to go." : ""}
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
