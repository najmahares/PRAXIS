"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { getLevel, getLessonsForLevel } from "@/lib/curriculumApi";
import {
  getProgress,
  getLessonState,
  isLevelLessonsDone,
  getLevelQuizResult,
  toSlug,
  type NodeState,
} from "@/lib/curriculumProgress";
import "../learning.css";

export default function LevelPage() {
  const params = useParams();
  const levelId = Number(params.level);
  const level = getLevel(levelId);
  const lessons = level ? getLessonsForLevel(level.id) : [];
  const [completed, setCompleted] = useState<string[]>([]);
  const [states, setStates] = useState<Record<string, NodeState>>({});
  const [lessonsDone, setLessonsDone] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizResult, setQuizResult] = useState<{ correct: number; total: number; score: number } | null>(null);

  useEffect(() => {
    const progress = getProgress();
    setCompleted(progress.completedLessons);
    const map: Record<string, NodeState> = {};
    for (const lesson of lessons) {
      if (!lesson || typeof lesson.id !== "string") continue;
      map[lesson.id] = getLessonState(lesson.id, progress);
    }
    setStates(map);

    if (level) {
      setLessonsDone(isLevelLessonsDone(level.id, progress));
      const result = getLevelQuizResult(level.id);
      if (result) {
        setQuizPassed(result.passed);
        setQuizResult({ correct: result.correct, total: result.total, score: result.score });
      }
    }
  }, [lessons.length, levelId, level]);

  if (!level) {
    return (
      <div>
        <h1 className="praxis-learn-title">Level not found</h1>
        <p style={fallbackStyle}>
          <Link href="/learning" style={linkStyle}>
            Back to My Learning
          </Link>
        </p>
      </div>
    );
  }

  const completedInLevel = lessons.filter((lesson) =>
    completed.includes(lesson.id),
  ).length;

  return (
    <div>
      <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
        <Link href="/dashboard">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/learning">My Learning</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
          Level {level.id}
        </span>
      </nav>

      <header className="praxis-learn-header">
        <span className="praxis-learn-level-tag">Level {level.id}</span>
        <h1 className="praxis-learn-title" style={{ marginTop: 8 }}>
          {level.title}
        </h1>
        <p className="praxis-learn-subtitle">{level.goal}</p>
        {lessons.length > 0 ? (
          <p style={progressLineStyle}>
            {completedInLevel} of {lessons.length} lessons complete
            {level.prerequisite !== "None" ? ` · Unlocks from ${level.prerequisite}` : ""}
          </p>
        ) : null}
      </header>

      {lessons.length === 0 ? (
        <div className="praxis-learn-coming-soon">
          <h2 className="praxis-learn-coming-soon-title">
            Lessons for this level are being written.
          </h2>
          <p className="praxis-learn-coming-soon-body">
            Level {level.id} has not been published yet. Return to My Learning to browse
            the levels that are ready.
          </p>
          <div className="praxis-learn-coming-soon-actions">
            <Link href="/learning" className="praxis-learn-coming-soon-cta">
              Back to My Learning
            </Link>
          </div>
        </div>
      ) : (
        <div className="praxis-learn-lesson-list">
          {lessons.map((lesson) => {
            const state = states[lesson.id] ?? "locked";
            const body = (
              <div className={`praxis-learn-lesson praxis-lesson-${state}`}>
                <span className={`praxis-learn-lesson-number praxis-number-${state}`}>
                  {state === "completed" ? "✓" : state === "locked" ? <LockMini /> : lesson.id}
                </span>
                <div className="praxis-learn-lesson-body">
                  <span className="praxis-learn-lesson-title">{lesson.title}</span>
                  <span className="praxis-learn-lesson-summary">{lesson.summary}</span>
                </div>
                <span className="praxis-learn-lesson-meta">
                  <span>{lesson.concept}</span>
                  <span>{lesson.minutes} min</span>
                </span>
              </div>
            );

            if (state === "locked") {
              return <div key={lesson.id}>{body}</div>;
            }

            return (
              <Link
                key={lesson.id}
                href={`/learning/lesson/${toSlug(lesson.id)}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {body}
              </Link>
            );
          })}
        </div>
      )}

      {lessons.length > 0 ? (
        <section className="praxis-lq-cta">
          <div className="praxis-lq-cta-body">
            <span className="praxis-lq-cta-tag">Level {level.id} quiz</span>
            <h2 className="praxis-lq-cta-title">
              {quizPassed
                ? `You have passed this level quiz${quizResult ? ` with ${quizResult.correct}/${quizResult.total}` : ""}`
                : lessonsDone
                  ? "You finished every lesson. Take the level quiz to complete the level."
                  : "Finish every lesson to unlock the level quiz."}
            </h2>
            <p className="praxis-lq-cta-sub">
              {quizPassed
                ? "You can retake it any time. Each attempt generates fresh questions."
                : "The quiz is generated fresh from the lessons. You need 70% to pass."}
            </p>
          </div>
          <div className="praxis-lq-cta-actions">
            {lessonsDone || quizPassed ? (
              <Link
                href={`/learning/${level.id}/quiz`}
                className="praxis-lq-cta-primary"
              >
                {quizPassed ? "Retake level quiz" : "Take level quiz"}
              </Link>
            ) : (
              <span className="praxis-lq-cta-disabled">Locked until lessons are done</span>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function LockMini() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

const progressLineStyle: CSSProperties = {
  margin: "12px 0 0",
  fontSize: 13,
  color: "var(--color-text-muted)",
};

const fallbackStyle: CSSProperties = {
  margin: "12px 0 0",
  fontSize: 14,
};

const linkStyle: CSSProperties = {
  color: "var(--color-primary)",
  fontWeight: 500,
  textDecoration: "none",
};
