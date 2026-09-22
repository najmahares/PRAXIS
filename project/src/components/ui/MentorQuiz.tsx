"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Quiz, QuizDifficulty } from "@/lib/mentor/quizTypes";

type MentorQuizProps = {
  topic: string;
  difficulty: QuizDifficulty;
  count: number;
  onTeachConcept?: (concept: string) => void;
  onReady?: () => void;
};

type Phase = "loading" | "intro" | "playing" | "done" | "error";

export default function MentorQuiz({
  topic,
  difficulty,
  count,
  onTeachConcept,
  onReady,
}: MentorQuizProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);

  const onReadyRef = useRef(onReady);
  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    let active = true;
    setPhase("loading");
    fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, difficulty, count }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("request_failed");
        const data = (await response.json()) as { quiz: Quiz };
        if (!active) return;
        setQuiz(data.quiz);
        setAnswers(new Array(data.quiz.questions.length).fill(-1));
        setPhase("intro");
        onReadyRef.current?.();
      })
      .catch(() => {
        if (!active) return;
        setError("The quiz could not be generated. Try again in a moment.");
        setPhase("error");
        onReadyRef.current?.();
      });
    return () => {
      active = false;
    };
  }, [topic, difficulty, count]);

  if (phase === "loading") {
    return (
      <div style={cardStyle} aria-busy="true">
        <p style={mutedStyle}>Preparing your quiz…</p>
      </div>
    );
  }
  if (phase === "error" || !quiz) {
    return (
      <div style={cardStyle} role="alert">
        <p style={errorStyle}>{error}</p>
      </div>
    );
  }
  if (phase === "intro") {
    return (
      <div style={cardStyle}>
        <span style={pillStyle}>{quiz.difficulty}</span>
        <h3 style={titleStyle}>{quiz.title}</h3>
        <p style={subtitleStyle}>
          {quiz.questions.length} questions on {quiz.topic}
        </p>
        <button type="button" style={primaryButtonStyle} onClick={() => setPhase("playing")}>
          Start quiz
        </button>
      </div>
    );
  }
  if (phase === "playing") {
    const question = quiz.questions[index];
    const selected = answers[index];
    const isLast = index === quiz.questions.length - 1;

    function choose(optionIndex: number) {
      if (revealed) return;
      const next = [...answers];
      next[index] = optionIndex;
      setAnswers(next);
      setRevealed(true);
    }

    function next() {
      if (isLast) {
        setPhase("done");
        return;
      }
      setIndex((value) => value + 1);
      setRevealed(false);
    }

    return (
      <div style={cardStyle} aria-live="polite">
        <div style={progressRowStyle}>
          <span style={progressTextStyle}>
            Question {index + 1} of {quiz.questions.length}
          </span>
          <div style={progressTrackStyle} aria-hidden="true">
            <div
              style={{
                ...progressFillStyle,
                width: `${((index + (revealed ? 1 : 0)) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h3 style={questionStyle}>{question.prompt}</h3>

        <div role="radiogroup" aria-label="Answer choices" style={optionsStyle}>
          {question.options.map((option, optionIndex) => {
            const isSelected = selected === optionIndex;
            const isCorrect = optionIndex === question.correctIndex;
            const showCorrect = revealed && isCorrect;
            const showWrong = revealed && isSelected && !isCorrect;

            const style: CSSProperties = {
              ...optionButtonStyle,
              ...(isSelected && !revealed ? optionSelectedStyle : {}),
              ...(showCorrect ? optionCorrectStyle : {}),
              ...(showWrong ? optionWrongStyle : {}),
            };

            return (
              <button
                key={optionIndex}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => choose(optionIndex)}
                disabled={revealed}
                style={style}
              >
                <span style={optionKeyStyle} aria-hidden="true">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {revealed ? (
          <div
            style={selected === question.correctIndex ? feedbackCorrectStyle : feedbackWrongStyle}
            role="status"
          >
            <strong style={feedbackLabelStyle}>
              {selected === question.correctIndex ? "Correct." : "Not quite."}
            </strong>{" "}
            {question.explanation}
          </div>
        ) : null}

        <div style={actionsStyle}>
          {revealed ? (
            <button type="button" style={primaryButtonStyle} onClick={next}>
              {isLast ? "See results" : "Next question"}
            </button>
          ) : (
            <span style={hintStyle}>Pick an answer to continue.</span>
          )}
        </div>
      </div>
    );
  }

  const correctCount = answers.reduce((total, answer, i) => {
    return total + (answer === quiz.questions[i].correctIndex ? 1 : 0);
  }, 0);
  const total = quiz.questions.length;
  const percent = Math.round((correctCount / total) * 100);

  const wrongQuestions = quiz.questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== -1 && answers[i] !== q.correctIndex);

  const weakConcepts = Array.from(
    new Set(
      wrongQuestions
        .map(({ q }) => q.concept)
        .filter((c): c is string => typeof c === "string" && c.trim().length > 0),
    ),
  );

  const wrongPrompts = wrongQuestions.map(({ q }) => q.prompt);

  let verdict = "Keep practicing.";
  let verdictDetail = "Review the questions below and try again when ready.";
  if (percent >= 90) {
    verdict = "Excellent.";
    verdictDetail = "That concept is solid. Move on when you are ready.";
  } else if (percent >= 70) {
    verdict = "Good work.";
    verdictDetail = "A little polish and this is mastered.";
  } else if (percent >= 50) {
    verdict = "You are getting there.";
    verdictDetail = "Review the misses below, then ask for a teach-back.";
  }

  function handleTeachConcept(concept: string) {
    if (!onTeachConcept) return;
    onTeachConcept(
      `I just got a quiz question on "${concept}" wrong. Walk me through that concept from the start. Give one clear explanation, one example, and one question to check I understood.`,
    );
  }

  function handleTeachAll() {
    if (!onTeachConcept) return;
    const list = weakConcepts.length > 0 ? weakConcepts.join(", ") : topic;
    onTeachConcept(
      `I just finished a quiz on ${topic} and got ${correctCount} out of ${total}. Help me understand the ones I missed: ${list}. Go through each concept clearly, one at a time.`,
    );
  }

  return (
    <div style={cardStyle}>
      <span style={pillStyle}>Quiz complete</span>
      <h3 style={titleStyle}>{quiz.title}</h3>

      <div style={scoreRowStyle}>
        <span style={scoreBigStyle}>
          {correctCount}/{total}
        </span>
        <span style={scorePercentStyle}>{percent}%</span>
      </div>

      <div>
        <p style={verdictStyle}>{verdict}</p>
        <p style={verdictDetailStyle}>{verdictDetail}</p>
      </div>

      <div style={reviewHeaderStyle}>Review</div>
      <ul style={reviewListStyle}>
        {quiz.questions.map((q, i) => {
          const wasCorrect = answers[i] === q.correctIndex;
          return (
            <li key={i} style={reviewItemStyle}>
              <span
                style={wasCorrect ? reviewDotCorrectStyle : reviewDotWrongStyle}
                aria-hidden="true"
              />
              <div style={reviewBodyStyle}>
                <span style={reviewPromptStyle}>{q.prompt}</span>
                {!wasCorrect ? (
                  <span style={reviewExplainStyle}>{q.explanation}</span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {wrongQuestions.length > 0 ? (
        <>
          <div style={reviewHeaderStyle}>What to practice next</div>
          <p style={nextStepsLeadStyle}>
            You missed {wrongQuestions.length} question
            {wrongQuestions.length === 1 ? "" : "s"}. The underlying ideas are below. Click any
            one to have Jema walk you through it.
          </p>
          <div style={conceptChipsStyle}>
            {(weakConcepts.length > 0 ? weakConcepts : wrongPrompts).map((item, i) => (
              <button
                key={i}
                type="button"
                style={conceptChipStyle}
                onClick={() => handleTeachConcept(item)}
                disabled={!onTeachConcept}
              >
                {item}
              </button>
            ))}
          </div>
          <div style={actionsStyle}>
            <button
              type="button"
              style={primaryButtonStyle}
              onClick={handleTeachAll}
              disabled={!onTeachConcept}
            >
              Walk me through all of them
            </button>
            <button
              type="button"
              style={ghostButtonStyle}
              onClick={() => {
                setIndex(0);
                setAnswers(new Array(quiz.questions.length).fill(-1));
                setRevealed(false);
                setPhase("intro");
              }}
            >
              Retake quiz
            </button>
          </div>
        </>
      ) : (
        <div style={actionsStyle}>
          <button
            type="button"
            style={ghostButtonStyle}
            onClick={() => {
              setIndex(0);
              setAnswers(new Array(quiz.questions.length).fill(-1));
              setRevealed(false);
              setPhase("intro");
            }}
          >
            Retake quiz
          </button>
        </div>
      )}
    </div>
  );
}

const cardStyle: CSSProperties = {
  width: "100%",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: 24,
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const pillStyle: CSSProperties = {
  alignSelf: "flex-start",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-tint-blue-fg)",
  background: "var(--color-tint-blue-bg)",
  border: "1px solid var(--color-tint-blue-border)",
  padding: "3px 9px",
  borderRadius: 999,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
};

const subtitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "var(--color-text-muted)",
};

const mutedStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "var(--color-text-muted)",
};

const errorStyle: CSSProperties = {
  margin: 0,
  fontSize: 14,
  color: "var(--color-danger)",
};

const primaryButtonStyle: CSSProperties = {
  alignSelf: "flex-start",
  height: 40,
  padding: "0 20px",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};

const ghostButtonStyle: CSSProperties = {
  alignSelf: "flex-start",
  height: 40,
  padding: "0 18px",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: 14,
  fontWeight: 500,
  border: "1px solid var(--color-border-strong)",
  borderRadius: 8,
  cursor: "pointer",
};

const progressRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

const progressTextStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  color: "var(--color-text-muted)",
  flexShrink: 0,
};

const progressTrackStyle: CSSProperties = {
  flex: 1,
  height: 4,
  background: "var(--color-surface-muted)",
  borderRadius: 999,
  overflow: "hidden",
};

const progressFillStyle: CSSProperties = {
  height: "100%",
  background: "var(--color-primary)",
  transition: "width 220ms ease",
};

const questionStyle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.4,
  color: "var(--color-text)",
};

const optionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const optionButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "12px 14px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-strong)",
  borderRadius: 10,
  fontSize: 14,
  color: "var(--color-text)",
  textAlign: "left",
  cursor: "pointer",
};

const optionSelectedStyle: CSSProperties = {
  borderColor: "var(--color-primary)",
  background: "var(--color-tint-blue-bg)",
};

const optionCorrectStyle: CSSProperties = {
  borderColor: "var(--color-success)",
  background: "var(--color-success-soft)",
};

const optionWrongStyle: CSSProperties = {
  borderColor: "var(--color-danger)",
  background: "var(--color-danger-soft)",
};

const optionKeyStyle: CSSProperties = {
  width: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
  background: "var(--color-surface-muted)",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--color-text-muted)",
  flexShrink: 0,
};

const feedbackCorrectStyle: CSSProperties = {
  padding: "10px 12px",
  fontSize: 13.5,
  lineHeight: 1.55,
  background: "var(--color-success-soft)",
  border: "1px solid #bbf7d0",
  color: "var(--color-success)",
  borderRadius: 8,
};

const feedbackWrongStyle: CSSProperties = {
  padding: "10px 12px",
  fontSize: 13.5,
  lineHeight: 1.55,
  background: "var(--color-danger-soft)",
  border: "1px solid #fecaca",
  color: "var(--color-danger)",
  borderRadius: 8,
};

const feedbackLabelStyle: CSSProperties = {
  fontWeight: 600,
};

const actionsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 10,
  marginTop: 4,
};

const hintStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--color-text-muted)",
};

const scoreRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
};

const scoreBigStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  color: "var(--color-text)",
  fontVariantNumeric: "tabular-nums",
};

const scorePercentStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  color: "var(--color-primary)",
};

const verdictStyle: CSSProperties = {
  margin: 0,
  fontSize: 15,
  fontWeight: 600,
  color: "var(--color-text)",
};

const verdictDetailStyle: CSSProperties = {
  margin: "2px 0 0",
  fontSize: 13.5,
  lineHeight: 1.5,
  color: "var(--color-text-muted)",
};

const reviewHeaderStyle: CSSProperties = {
  marginTop: 6,
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  borderTop: "1px solid var(--color-border)",
  paddingTop: 14,
};

const reviewListStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const reviewItemStyle: CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
};

const reviewDotCorrectStyle: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "var(--color-success)",
  marginTop: 6,
  flexShrink: 0,
};

const reviewDotWrongStyle: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "var(--color-danger)",
  marginTop: 6,
  flexShrink: 0,
};

const reviewBodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  minWidth: 0,
};

const reviewPromptStyle: CSSProperties = {
  fontSize: 13.5,
  lineHeight: 1.5,
  color: "var(--color-text)",
};

const reviewExplainStyle: CSSProperties = {
  fontSize: 12.5,
  lineHeight: 1.55,
  color: "var(--color-text-muted)",
};

const nextStepsLeadStyle: CSSProperties = {
  margin: 0,
  fontSize: 13.5,
  lineHeight: 1.55,
  color: "var(--color-text-muted)",
};

const conceptChipsStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const conceptChipStyle: CSSProperties = {
  padding: "8px 14px",
  background: "var(--color-tint-blue-bg)",
  border: "1px solid var(--color-tint-blue-border)",
  color: "var(--color-tint-blue-fg)",
  fontSize: 13,
  fontWeight: 500,
  borderRadius: 999,
  cursor: "pointer",
};

