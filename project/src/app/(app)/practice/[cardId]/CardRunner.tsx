"use client";

import Link from "next/link";
import { useState } from "react";
import type { PracticeCard } from "@/lib/practice/cards";
import { buildMentorContext } from "@/lib/mentor/context";
import { MISSION_STEPS, deriveSteps } from "@/lib/practice/mission-steps";
import "../practice.css";

type Existing = {
  passed: boolean;
  response: string | null;
  choiceId: string | null;
} | null;


function stripMarkdown(input: string): string {
  let out = input;
  
  out = out.replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, ""));
  
  out = out.replace(/`([^`]+)`/g, "$1");
  
  out = out.replace(/\*\*([^*]+)\*\*/g, "$1");
  out = out.replace(/__([^_]+)__/g, "$1");
  out = out.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1$2");
  out = out.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, "$1$2");
  
  out = out.replace(/^#{1,6}\s+/gm, "");
  
  out = out.replace(/^>\s?/gm, "");
  
  out = out.replace(/^\s*[-*+]\s+/gm, "• ");
  
  
  
  out = out.replace(/\n{3,}/g, "\n\n");
  
  out = out
    .replace(/(\w)[ \t]*\u2014[ \t]*(\w)/g, "$1, $2")
    .replace(/[ \t]+\u2014[ \t]+/g, ", ")
    .replace(/\u2014/g, "-")
    .replace(/(\w)[ \t]*\u2013[ \t]*(\w)/g, "$1-$2")
    .replace(/\u2013/g, "-");
  return out.trim();
}

export default function CardRunner({
  card,
  existing,
  nextCardId,
  nextCardTitle,
}: {
  card: PracticeCard;
  existing: Existing;
  nextCardId: string | null;
  nextCardTitle: string | null;
}) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(
    existing?.choiceId ?? null
  );
  const [response, setResponse] = useState(existing?.response ?? "");
  const [submitted, setSubmitted] = useState(Boolean(existing));
  const [passed, setPassed] = useState(Boolean(existing?.passed));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [missionResult, setMissionResult] = useState<{ passed: boolean; detail: string } | null>(
    null
  );
  const [jemaFeedback, setJemaFeedback] = useState("");
  const [jemaStreaming, setJemaStreaming] = useState(false);
  const [jemaAnswer, setJemaAnswer] = useState("");
  const [jemaAnswerStreaming, setJemaAnswerStreaming] = useState(false);

  async function streamMentor(message: string, onChunk: (acc: string) => void): Promise<void> {
    const res = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: [], context: buildMentorContext() }),
    });
    if (!res.ok || !res.body) throw new Error("unavailable");
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      onChunk(stripMarkdown(acc));
    }
  }

  async function generateJemaAnswer() {
    if (jemaAnswerStreaming || jemaAnswer) return;
    setJemaAnswerStreaming(true);
    const best = card.choices?.find((c) => c.best);
    const wrong = card.choices?.find((c) => c.id === selectedChoice);
    const message =
      "A learner just got a practice scenario wrong. Explain why, in detail. " +
      "Scenario: " + card.brief + " " +
      "Question: " + card.prompt + " " +
      "They picked: \"" + (wrong?.label ?? "") + "\" " +
      "The strongest answer was: \"" + (best?.label ?? "") + "\" " +
      "Write 3 short paragraphs: (1) why their choice was tempting but weaker, " +
      "(2) why the strongest answer is strongest, (3) one rule they can carry forward. " +
      "Plain prose only. No markdown. No asterisks. No bold. No headers. No numbered lists. No bullet points. No backticks. Just sentences. Under 200 words.";
    try {
      await streamMentor(message, setJemaAnswer);
    } catch {
      setJemaAnswer("Jema is unavailable right now.");
    } finally {
      setJemaAnswerStreaming(false);
    }
  }

  async function generateMissionGuidance(detail: string) {
    if (jemaAnswerStreaming || jemaAnswer) return;
    setJemaAnswerStreaming(true);
    const message =
      "A learner's mission is not yet complete. Explain how to satisfy it. " +
      "Mission: " + card.brief + " " +
      "Goal: " + card.prompt + " " +
      "Current state: " + detail + " " +
      "Write 2 short paragraphs: (1) what is missing and why, " +
      "(2) exactly what portfolio action would change that. " +
      "Plain prose only. No markdown. No asterisks. No bold. No headers. No numbered lists. No bullet points. No backticks. Just sentences. Under 150 words.";
    try {
      await streamMentor(message, setJemaAnswer);
    } catch {
      setJemaAnswer("Jema is unavailable right now.");
    } finally {
      setJemaAnswerStreaming(false);
    }
  }

  async function submitScenario(choiceId: string) {
    setSelectedChoice(choiceId);
    setSubmitted(true);
    const c = card.choices?.find((x) => x.id === choiceId);
    const isBest = Boolean(c?.best);
    setPassed(isBest);
    setJemaAnswer("");
    try {
      fetch("/api/practice/cards/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, choiceId }),
      }).catch(() => {});
    } catch {  }
    if (!isBest) void generateJemaAnswer();
  }

  async function submitDrill() {
    const trimmed = response.trim();
    if (trimmed.length < 20) {
      setError("Write at least a couple of sentences before submitting.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/practice/cards/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, response }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setPassed(Boolean(data.passed));
      } else {
        setSubmitted(true);
      }
      
      void getJemaFeedback();
    } catch {
      setSubmitted(true);
      void getJemaFeedback();
    } finally {
      setBusy(false);
    }
  }

  async function checkMission() {
    setBusy(true);
    setError(null);
    setJemaAnswer("");
    try {
      const res = await fetch(
        "/api/practice/cards/verify?cardId=" + encodeURIComponent(card.id),
        { cache: "no-store" }
      );
      const data = await res.json();
      if (data.ok) {
        setMissionResult({ passed: Boolean(data.passed), detail: String(data.detail ?? "") });
        if (!data.passed) void generateMissionGuidance(String(data.detail ?? ""));
      } else {
        setError(data.error ?? "Could not check.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  async function submitMission(didPass: boolean) {
    setBusy(true);
    try {
      await fetch("/api/practice/cards/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id }),
      });
      setSubmitted(true);
      setPassed(didPass);
    } catch {
      setSubmitted(true);
      setPassed(didPass);
    } finally {
      setBusy(false);
    }
  }

  async function getJemaFeedback() {
    if (jemaStreaming || jemaFeedback) return;
    setJemaFeedback("");
    setJemaStreaming(true);
    const frameworkText = (card.framework ?? []).map((f, i) => i + 1 + ". " + f).join(" ");
    const message =
      "I just completed a practice drill. The brief was: " + card.brief +
      " The question was: " + card.prompt +
      " My answer was: " + response +
      " Please give specific coaching feedback. Did I address: " + frameworkText +
      " Point out what was strong, what was missing, and one thing to look at next. " +
      "Write 2 to 3 short paragraphs of plain prose. " +
      "No markdown. No asterisks. No bold. No italics. No headers. No numbered lists. No bullet points. No backticks. " +
      "Just sentences. Under 200 words.";
    try {
      await streamMentor(message, setJemaFeedback);
    } catch {
      setJemaFeedback("Jema is unavailable right now.");
    } finally {
      setJemaStreaming(false);
    }
  }

  const steps =
    card.steps && card.steps.length > 0
      ? card.steps
      : MISSION_STEPS[card.id] ?? deriveSteps(card.verify);

  return (
    <div className="praxis-card-run">
      <Link href={"/practice/group/" + card.level + "-" + card.type} className="praxis-practice-back">
        <span aria-hidden="true">{"\u2190"}</span>
        <span>Back to set</span>
      </Link>

      <header className="praxis-card-run-head">
        <span className={"praxis-card-run-tag is-" + card.type}>
          Level {card.level} · {card.type}
        </span>
        <h1 className="praxis-card-run-title">{card.title}</h1>
        {card.linkedLessonLabel ? (
          <p className="praxis-card-run-lesson">From {card.linkedLessonLabel}</p>
        ) : null}
      </header>

      <section className="praxis-card-run-brief" aria-label="Situation">
        <p>{card.brief}</p>
      </section>

      <section className="praxis-card-run-body" aria-label="Prompt">
        <h2 className="praxis-card-run-prompt">{card.prompt}</h2>

        {card.type === "scenario" ? (
          <div className="praxis-card-run-choices">
            {card.choices?.map((c) => {
              const isSelected = selectedChoice === c.id;
              const showAsBest = submitted && c.best;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => submitScenario(c.id)}
                  disabled={busy || submitted}
                  className={
                    "praxis-card-run-choice" +
                    (isSelected ? " is-selected" : "") +
                    (showAsBest ? " is-best" : "")
                  }
                >
                  <span className="praxis-card-run-choice-label">{c.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {card.type === "drill" ? (
          <div className="praxis-card-run-drill">
            {submitted ? (
              <div className="praxis-card-run-answer">
                <span className="praxis-card-run-answer-label">Your answer</span>
                <p>{response}</p>
              </div>
            ) : (
              <>
                <textarea
                  className="praxis-card-run-textarea"
                  rows={5}
                  placeholder="Write your answer in a few sentences…"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  disabled={busy}
                />
                <button
                  type="button"
                  className="praxis-practice-primary"
                  onClick={submitDrill}
                  disabled={busy}
                >
                  {busy ? "Submitting…" : "Submit answer"}
                </button>
              </>
            )}
            {submitted ? (
              <div className="praxis-card-run-jema">
                <div className="praxis-card-run-jema-head">
                  <span className="praxis-card-run-jema-title">Jema&apos;s feedback</span>
                </div>
                {jemaFeedback ? (
                  <p className="praxis-card-run-jema-body">{jemaFeedback}</p>
                ) : jemaStreaming ? (
                  <p className="praxis-card-run-jema-body praxis-card-run-jema-typing">
                    Jema is reading your answer…
                  </p>
                ) : (
                  <p className="praxis-card-run-jema-empty">
                    Preparing feedback…
                  </p>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {card.type === "mission" ? (
          <div className="praxis-card-run-mission">
            {steps.length > 0 ? (
              <div className="praxis-card-run-steps">
                <span className="praxis-card-run-steps-title">How to complete this</span>
                <ol className="praxis-card-run-steps-list">
                  {steps.map((s, i) => (
                    <li key={i} className="praxis-card-run-steps-item">
                      <span className="praxis-card-run-steps-num">{i + 1}</span>
                      <span className="praxis-card-run-steps-text">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {missionResult ? (
              <div className={"praxis-card-run-mission-result " + (missionResult.passed ? "is-pass" : "is-fail")}>
                <span className="praxis-card-run-mission-result-title">
                  {missionResult.passed ? "Mission complete" : "Not yet"}
                </span>
                <p>{missionResult.detail}</p>
                {missionResult.passed && !submitted ? (
                  <button type="button" className="praxis-practice-primary" onClick={() => submitMission(true)} disabled={busy}>
                    Mark complete
                  </button>
                ) : null}
              </div>
            ) : (
              <button type="button" className="praxis-practice-primary" onClick={checkMission} disabled={busy}>
                {busy ? "Checking…" : "Check my portfolio"}
              </button>
            )}
          </div>
        ) : null}

        {error ? <p className="praxis-card-run-error">{error}</p> : null}

        {jemaAnswer || jemaAnswerStreaming ? (
          <div className="praxis-card-run-jema-answer">
            <div className="praxis-card-run-jema-answer-head">
              <span className="praxis-card-run-jema-answer-title">Jema explains</span>
            </div>
            {jemaAnswer ? (
              <p className="praxis-card-run-jema-answer-body">{jemaAnswer}</p>
            ) : (
              <p className="praxis-card-run-jema-answer-body praxis-card-run-jema-answer-typing">
                Jema is preparing the full answer…
              </p>
            )}
          </div>
        ) : null}
      </section>

      {submitted ? (
        <div className="praxis-card-run-continue">
          {nextCardId ? (
            <Link
              href={"/practice/" + nextCardId}
              className="praxis-card-run-continue-btn"
            >
              <span className="praxis-card-run-continue-label">Next up</span>
              <span className="praxis-card-run-continue-title">
                {nextCardTitle ?? "Next card"}
              </span>
              <span className="praxis-card-run-continue-arrow" aria-hidden="true">{"\u2192"}</span>
            </Link>
          ) : (
            <div className="praxis-card-run-continue-end">
              <p>You have finished this set.</p>
              <Link
                href={"/practice/group/" + card.level + "-" + card.type}
                className="praxis-practice-primary"
              >
                Back to set
              </Link>
            </div>
          )}
        </div>
      ) : null}

      <footer className="praxis-card-run-foot">
        {card.linkedLessonId ? (
          <Link href={"/learning/lesson/" + card.linkedLessonId.replace(".", "-")} className="praxis-card-run-foot-link">
            Review {card.linkedLessonLabel}
          </Link>
        ) : null}
        <Link href={"/practice/group/" + card.level + "-" + card.type} className="praxis-card-run-foot-link is-muted">
          Back to set
        </Link>
        <Link href="/practice" className="praxis-card-run-foot-link is-muted">
          Library
        </Link>
      </footer>
    </div>
  );
}
