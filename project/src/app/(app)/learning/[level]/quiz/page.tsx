"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { getLevel, getLessonsForLevel, getLesson } from "@/lib/curriculumApi";
import {
  getProgress,
  isLevelLessonsDone,
  getLevelQuizResult,
  markLevelQuizPassed,
} from "@/lib/curriculumProgress";
import Confetti from "@/components/ui/Confetti";
import "../../learning.css";

type Phase = "intro" | "loading" | "playing" | "done" | "error";
type QuizLength = 5 | 10 | 15;

type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept?: string;
  sourceLesson?: string;
};

type Quiz = {
  title: string;
  questions: Question[];
};

const PASS_THRESHOLD = 70;

function normalizeQuestion(raw: unknown): Question | null {
  if (!raw || typeof raw !== "object") return null;
  const q = raw as Record<string, unknown>;
  if (typeof q.prompt !== "string" || q.prompt.trim().length < 3) return null;
  if (!Array.isArray(q.options) || q.options.length < 2) return null;
  const options: string[] = [];
  for (const opt of q.options) {
    if (typeof opt !== "string" || opt.trim().length === 0) return null;
    options.push(opt);
  }
  if (typeof q.correctIndex !== "number") return null;
  if (q.correctIndex < 0 || q.correctIndex >= options.length) return null;
  if (typeof q.explanation !== "string") return null;
  return {
    prompt: q.prompt,
    options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    concept: typeof q.concept === "string" ? q.concept : undefined,
    sourceLesson: typeof q.sourceLesson === "string" ? q.sourceLesson : undefined,
  };
}

function normalizeQuiz(raw: unknown): Quiz | null {
  if (!raw || typeof raw !== "object") return null;
  const q = raw as Record<string, unknown>;
  if (typeof q.title !== "string" || q.title.trim().length === 0) return null;
  if (!Array.isArray(q.questions) || q.questions.length === 0) return null;
  const questions: Question[] = [];
  for (const item of q.questions) {
    const normalized = normalizeQuestion(item);
    if (normalized) questions.push(normalized);
  }
  if (questions.length === 0) return null;
  return { title: q.title, questions };
}

function shuffleQuestion(q: Question): Question {
  const n = q.options.length;
  if (n < 2) return q;
  const indices = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
  }
  const newOptions = indices.map((orig) => q.options[orig]);
  const newCorrect = indices.indexOf(q.correctIndex);
  return { ...q, options: newOptions, correctIndex: newCorrect >= 0 ? newCorrect : 0 };
}

export default function LevelQuizPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params.level);
  const level = getLevel(levelId);
  const lessons = useMemo(
    () => (level ? getLessonsForLevel(level.id) : []),
    [level],
  );

  const [phase, setPhase] = useState<Phase>("intro");
  const [length, setLength] = useState<QuizLength>(10);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState("");
  const [previousResult, setPreviousResult] = useState<
    { score: number; correct: number; total: number } | null
  >(null);

  useEffect(() => {
    if (!level) {
      router.replace("/learning");
      return;
    }
    const progress = getProgress();
    if (!isLevelLessonsDone(level.id, progress)) {
      router.replace(`/learning/${level.id}`);
      return;
    }
    const existing = getLevelQuizResult(level.id);
    if (existing) {
      setPreviousResult({
        score: existing.score,
        correct: existing.correct,
        total: existing.total,
      });
    }
  }, [level, router]);

  async function startFresh(len: QuizLength) {
    if (!level) return;
    setLength(len);
    setPhase("loading");
    setError("");
    try {
      const response = await fetch("/api/learning/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level: level.id, count: len }),
      });
      if (!response.ok) throw new Error(`http_${response.status}`);
      const payload = (await response.json()) as { quiz?: unknown };
      const normalized = normalizeQuiz(payload.quiz);
      if (!normalized) throw new Error("invalid_quiz");
      const shuffled: Quiz = {
        title: normalized.title,
        questions: normalized.questions.map(shuffleQuestion),
      };
      setQuiz(shuffled);
      setAnswers(new Array(shuffled.questions.length).fill(-1));
      setIndex(0);
      setRevealed(false);
      setPhase("playing");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[quiz] failed", err);
      }
      setError("We could not generate the quiz. Try again in a moment.");
      setPhase("error");
    }
  }

  function retakeSameQuiz() {
    if (!quiz) {
      void startFresh(length);
      return;
    }
    setAnswers(new Array(quiz.questions.length).fill(-1));
    setIndex(0);
    setRevealed(false);
    setError("");
    setPhase("playing");
  }

  function retakeWithNewQuestions() {
    void startFresh(length);
  }

  function choose(optionIndex: number) {
    if (revealed || !quiz) return;
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
    setRevealed(true);
  }

  function next() {
    if (!quiz) return;
    if (index === quiz.questions.length - 1) {
      finish();
      return;
    }
    setIndex((value) => value + 1);
    setRevealed(false);
  }

  function finish() {
    if (!quiz || !level) return;
    const correct = answers.reduce((sum, ans, i) => {
      return sum + (ans === quiz.questions[i].correctIndex ? 1 : 0);
    }, 0);
    const percent = Math.round((correct / quiz.questions.length) * 100);
    const passed = percent >= PASS_THRESHOLD;
    markLevelQuizPassed(level.id, {
      score: percent,
      correct,
      total: quiz.questions.length,
      passed,
      takenAt: Date.now(),
    });
    setPhase("done");
  }

  if (!level) return null;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
        <Link href="/dashboard">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/learning">My Learning</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/learning/${level.id}`}>Level {level.id}</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--color-text)", fontWeight: 500 }}>Quiz</span>
      </nav>

      {phase === "intro" ? (
        <div className="praxis-lq-wrap">
          <header className="praxis-lq-intro">
            <span className="praxis-learn-level-tag">
              Level {level.id} · {lessons.length} lessons read
            </span>
            <h1 className="praxis-lq-title">{level.title} quiz</h1>
            <p className="praxis-lq-sub">
              Fresh questions every attempt. They are written from what you just read, so
              no two quizzes are the same.
            </p>
            <div className="praxis-lq-pass-note">
              <span className="praxis-lq-pass-pill">Pass mark</span>
              <span className="praxis-lq-pass-text">
                You need {PASS_THRESHOLD}% or more to complete this level.
              </span>
            </div>

            {previousResult ? (
              <div className="praxis-lq-previous">
                <span className="praxis-lq-previous-label">Last attempt</span>
                <span className="praxis-lq-previous-score">
                  {previousResult.correct}/{previousResult.total} · {previousResult.score}%
                </span>
              </div>
            ) : null}

            <div className="praxis-lq-length" role="radiogroup" aria-label="Quiz length">
              {([5, 10, 15] as QuizLength[]).map((len) => (
                <button
                  key={len}
                  type="button"
                  role="radio"
                  aria-checked={length === len}
                  className={
                    length === len
                      ? "praxis-lq-length-chip praxis-lq-length-active"
                      : "praxis-lq-length-chip"
                  }
                  onClick={() => setLength(len)}
                >
                  <span className="praxis-lq-length-num">{len}</span>
                  <span className="praxis-lq-length-label">questions</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="praxis-lq-start"
              onClick={() => void startFresh(length)}
            >
              Start quiz
            </button>
          </header>
        </div>
      ) : null}

      {phase === "loading" ? (
        <div className="praxis-lq-wrap">
          <div className="praxis-lq-loading" role="status">
            <div className="praxis-lq-loading-dots" aria-hidden="true">
              <span className="praxis-lq-dot" />
              <span className="praxis-lq-dot" />
              <span className="praxis-lq-dot" />
            </div>
            <p className="praxis-lq-loading-text">
              Preparing your quiz. This usually takes a few seconds.
            </p>
          </div>
        </div>
      ) : null}

      {phase === "error" ? (
        <div className="praxis-lq-wrap">
          <div className="praxis-lq-error" role="alert">
            <p className="praxis-lq-error-text">{error}</p>
            <div className="praxis-lq-error-actions">
              <button
                type="button"
                className="praxis-lq-start"
                onClick={() => void startFresh(length)}
              >
                Try again
              </button>
              <Link href={`/learning/${level.id}`} className="praxis-lq-cancel">
                Back to level
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {phase === "playing" && quiz && quiz.questions[index] ? (
        <div className="praxis-lq-wrap">
          <header className="praxis-lq-progress">
            <span className="praxis-lq-progress-label">
              Question {index + 1} of {quiz.questions.length}
            </span>
            <div className="praxis-lq-progress-track" aria-hidden="true">
              <div
                className="praxis-lq-progress-fill"
                style={{
                  width: `${((index + (revealed ? 1 : 0)) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </header>

          <div className="praxis-lq-card">
            {quiz.questions[index].sourceLesson &&
            getLesson(quiz.questions[index].sourceLesson!) ? (
              <span className="praxis-lq-source">
                From Lesson {quiz.questions[index].sourceLesson} ·{" "}
                {getLesson(quiz.questions[index].sourceLesson!)!.title}
              </span>
            ) : null}

            <h2 className="praxis-lq-question">{quiz.questions[index].prompt}</h2>

            <div
              role="radiogroup"
              aria-label="Answer choices"
              className="praxis-lq-options"
            >
              {quiz.questions[index].options.map((option, optionIndex) => {
                const isSelected = answers[index] === optionIndex;
                const isCorrect = optionIndex === quiz.questions[index].correctIndex;
                const showCorrect = revealed && isCorrect;
                const showWrong = revealed && isSelected && !isCorrect;

                const style: CSSProperties = {
                  ...lqOptionStyle,
                  ...(isSelected && !revealed ? lqOptionSelectedStyle : {}),
                  ...(showCorrect ? lqOptionCorrectStyle : {}),
                  ...(showWrong ? lqOptionWrongStyle : {}),
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
                    <span style={lqOptionKeyStyle} aria-hidden="true">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {revealed ? (
              <div
                role="status"
                className={
                  answers[index] === quiz.questions[index].correctIndex
                    ? "praxis-lq-feedback praxis-lq-feedback-correct"
                    : "praxis-lq-feedback praxis-lq-feedback-wrong"
                }
              >
                <strong>
                  {answers[index] === quiz.questions[index].correctIndex
                    ? "Correct. "
                    : "Not quite. "}
                </strong>
                {quiz.questions[index].explanation}
              </div>
            ) : null}

            <div className="praxis-lq-actions">
              {revealed ? (
                <button type="button" className="praxis-lq-start" onClick={next}>
                  {index === quiz.questions.length - 1 ? "See results" : "Next question"}
                </button>
              ) : (
                <span className="praxis-lq-hint">Pick an answer to continue.</span>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {phase === "done" && quiz ? (
        <LevelQuizDone
          quiz={quiz}
          answers={answers}
          levelId={level.id}
          levelTitle={level.title}
          onRetakeSame={retakeSameQuiz}
          onRetakeNew={retakeWithNewQuestions}
        />
      ) : null}
    </div>
  );
}

function LevelQuizDone({
  quiz,
  answers,
  levelId,
  levelTitle,
  onRetakeSame,
  onRetakeNew,
}: {
  quiz: Quiz;
  answers: number[];
  levelId: number;
  levelTitle: string;
  onRetakeSame: () => void;
  onRetakeNew: () => void;
}) {
  const correct = answers.reduce((sum, ans, i) => {
    return sum + (ans === quiz.questions[i].correctIndex ? 1 : 0);
  }, 0);
  const total = quiz.questions.length;
  const percent = Math.round((correct / total) * 100);
  const passed = percent >= PASS_THRESHOLD;
  const wrong = quiz.questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== -1 && answers[i] !== q.correctIndex);

  const concepts = Array.from(
    new Set(wrong.map(({ q }) => q.concept).filter((c): c is string => Boolean(c))),
  );

  return (
    <div className="praxis-lq-wrap">
      {passed ? <Confetti /> : null}
      <div
        className={
          passed
            ? "praxis-lq-result praxis-lq-result-pass"
            : "praxis-lq-result praxis-lq-result-fail"
        }
      >
        <span className="praxis-lq-result-tag">
          {passed ? `Level ${levelId} passed` : "Not quite yet"}
        </span>
        <h1 className="praxis-lq-result-title">{levelTitle} quiz</h1>
        <div className="praxis-lq-score">
          <span className="praxis-lq-score-big">
            {correct}/{total}
          </span>
          <span className="praxis-lq-score-pct">{percent}%</span>
        </div>
        <p className="praxis-lq-result-body">
          {passed
            ? `You cleared the ${PASS_THRESHOLD}% pass mark. Level ${levelId} is complete.`
            : `You need ${PASS_THRESHOLD}% or more to pass. You got ${percent}%. Review what you missed below, then try again when you are ready.`}
        </p>

        <div className="praxis-lq-result-actions">
          {passed ? (
            <>
              <Link
                href="/practice"
                className="praxis-lq-start"
              >
                Go to practice
              </Link>
              <button
                type="button"
                className="praxis-lq-cancel"
                onClick={onRetakeSame}
              >
                Retake same quiz
              </button>
              <button
                type="button"
                className="praxis-lq-cancel"
                onClick={onRetakeNew}
              >
                Try new questions
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="praxis-lq-start"
                onClick={onRetakeSame}
              >
                Retake same quiz
              </button>
              <button
                type="button"
                className="praxis-lq-cancel"
                onClick={onRetakeNew}
              >
                Try new questions
              </button>
              <Link href={`/learning/${levelId}`} className="praxis-lq-cancel">
                Back to level
              </Link>
            </>
          )}
        </div>
      </div>

      {wrong.length > 0 ? (
        <div className="praxis-lq-review">
          <h2 className="praxis-lq-review-title">Review the ones you missed</h2>
          {concepts.length > 0 ? (
            <p className="praxis-lq-review-sub">
              Concepts to revisit: {concepts.join(", ")}.
            </p>
          ) : null}
          <ul className="praxis-lq-review-list">
            {wrong.map(({ q, i }) => (
              <li key={i} className="praxis-lq-review-item">
                <span className="praxis-lq-review-prompt">{q.prompt}</span>
                <span className="praxis-lq-review-correct">
                  Correct: {q.options[q.correctIndex]}
                </span>
                <span className="praxis-lq-review-explain">{q.explanation}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

const lqOptionStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  padding: "14px 16px",
  background: "var(--color-surface)",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "var(--color-border-strong)",
  borderRadius: 10,
  fontSize: 14.5,
  color: "var(--color-text)",
  textAlign: "left",
  cursor: "pointer",
  lineHeight: 1.5,
};

const lqOptionSelectedStyle: CSSProperties = {
  borderColor: "var(--color-primary)",
  background: "var(--color-tint-blue-bg)",
};

const lqOptionCorrectStyle: CSSProperties = {
  borderColor: "var(--color-success)",
  background: "var(--color-success-soft)",
};

const lqOptionWrongStyle: CSSProperties = {
  borderColor: "var(--color-danger)",
  background: "var(--color-danger-soft)",
};

const lqOptionKeyStyle: CSSProperties = {
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
  marginTop: 1,
};
