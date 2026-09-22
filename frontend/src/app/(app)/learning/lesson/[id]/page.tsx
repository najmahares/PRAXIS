"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getLevel,
  getLesson,
  getLessonsForLevel,
  getNextLesson,
  getPreviousLesson,
} from "@/lib/curriculumApi";
import { LESSON_FIGURES } from "@/lib/curriculum/figures";
import {
    syncLessonToServer,
    getProgress,
    markLessonRead,
    getLessonState,
    isLastLessonOfLevel,
    fromSlug,
    toSlug,
    
} from "@/lib/curriculumProgress";
import LessonFigure from "@/components/ui/LessonFigure";
import "../../learning.css";
import Arrow from "@/components/ui/Arrow";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = fromSlug(String(params.id));
  const lesson = getLesson(lessonId);

  const [completed, setCompleted] = useState<string[]>([]);
  const [hasRead, setHasRead] = useState(false);
  const [locked, setLocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const progress = getProgress();
    setCompleted(progress.completedLessons);
    setHasRead(progress.completedLessons.includes(lessonId));
    if (lesson) {
      setLocked(getLessonState(lesson.id, progress) === "locked");
    }
    setHydrated(true);
  }, [lessonId, lesson]);

  if (!hydrated || !lesson) {
    if (hydrated && !lesson) {
      return (
        <div>
          <h1 className="praxis-learn-title">Lesson not found</h1>
          <p style={{ fontSize: 14, marginTop: 12 }}>
            <Link
              href="/learning"
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              Back to My Learning
            </Link>
          </p>
        </div>
      );
    }
    return (
      <div>
        <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
          <Link href="/dashboard">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/learning">My Learning</Link>
        </nav>
        <p style={{ fontSize: 14, color: "var(--color-text-muted)", marginTop: 20 }}>
          Loading lesson…
        </p>
      </div>
    );
  }

  if (locked) {
    return (
      <div>
        <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
          <Link href="/learning">My Learning</Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
            Level {lesson.level}
          </span>
        </nav>
        <div className="praxis-learn-coming-soon">
          <h2 className="praxis-learn-coming-soon-title">This lesson is locked.</h2>
          <p className="praxis-learn-coming-soon-body">
            Finish the previous lesson first to unlock {lesson.id} {lesson.title}.
          </p>
        </div>
      </div>
    );
  }

  const level = getLevel(lesson.level);
  const siblings = getLessonsForLevel(lesson.level);
  const next = getNextLesson(lesson.id);
  const prev = getPreviousLesson(lesson.id);
  const lastInLevel = isLastLessonOfLevel(lesson.id);
  const figure = LESSON_FIGURES[lesson.id];

  const contentBlocks = lesson.body.filter((block) => block.kind !== "check");
  const beforeFigure = contentBlocks.filter((block) => block.kind !== "takeaway");
  const afterFigure = contentBlocks.filter((block) => block.kind === "takeaway");

  function finishLesson() {
    if (!lesson) return;
    const updated = markLessonRead(lesson.id);
    setCompleted(updated.completedLessons);
    setHasRead(true);
    void syncLessonToServer(lesson.id);

    if (lastInLevel) {
      router.push(`/learning/${lesson.level}/quiz`);
    } else if (next) {
      router.push(`/learning/lesson/${toSlug(next.id)}`);
    } else {
      router.push(`/learning/${lesson.level}`);
    }
  }

  function goNext() {
    if (!lesson) return;
    if (lastInLevel) {
      router.push(`/learning/${lesson.level}/quiz`);
    } else if (next) {
      router.push(`/learning/lesson/${toSlug(next.id)}`);
    } else {
      router.push(`/learning/${lesson.level}`);
    }
  }

  return (
    <div>
      <nav aria-label="Breadcrumb" className="praxis-learn-breadcrumb">
        <Link href="/dashboard">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/learning">My Learning</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/learning/${lesson.level}`}>Level {lesson.level}</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: "var(--color-text)", fontWeight: 500 }}>{lesson.id}</span>
      </nav>

      <div className="praxis-learn-lesson-body-wrap">
        <div className="praxis-learn-lesson-main">
          <header className="praxis-learn-header">
            <span className="praxis-learn-level-tag">
              Lesson {lesson.id} · {lesson.concept}
            </span>
            <h1 className="praxis-learn-title" style={{ marginTop: 8 }}>
              {lesson.title}
            </h1>
            <p className="praxis-learn-subtitle">
              {lesson.summary} · {lesson.minutes} min read
            </p>
          </header>

          <div className="praxis-learn-blocks">
            {beforeFigure.map((block, index) => {
              if (block.kind === "paragraph") {
                return (
                  <p
                    key={index}
                    className="praxis-learn-paragraph"
                    dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
                  />
                );
              }
              if (block.kind === "example") {
                return (
                  <div key={index} className="praxis-learn-example">
                    <span className="praxis-learn-example-title">{block.title}</span>
                    <p
                      className="praxis-learn-example-text"
                      dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
                    />
                  </div>
                );
              }
              return null;
            })}

            {figure ? <LessonFigure block={figure} /> : null}

            {afterFigure.map((block, index) => {
              if (block.kind === "takeaway") {
                return (
                  <div
                    key={index}
                    className="praxis-learn-takeaway"
                    dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
                  />
                );
              }
              return null;
            })}
          </div>

          {hasRead ? (
            <div className="praxis-learn-read-note" role="status">
              You have already finished this lesson.
            </div>
          ) : null}

          <div className="praxis-learn-lesson-cta">
            {hasRead ? (
              <button type="button" className="praxis-learn-cta-primary" onClick={goNext}>
                {lastInLevel
                  ? "Take the Level quiz"
                  : next
                    ? `Next lesson: ${next.title}`
                    : "Back to level"}
              </button>
            ) : (
              <>
                <p className="praxis-learn-lesson-cta-hint">
                  Read through, then mark this lesson as finished. The level quiz comes
                  after the last lesson.
                </p>
                <button
                  type="button"
                  className="praxis-learn-cta-primary"
                  onClick={finishLesson}
                >
                  {lastInLevel
                    ? "Finish and start the level quiz"
                    : next
                      ? `Finish and continue to “${next.title}”`
                      : "Finish this lesson"}
                </button>
              </>
            )}
          </div>

          <nav className="praxis-learn-nav" aria-label="Lesson navigation">
            {prev ? (
              <Link
                href={`/learning/lesson/${toSlug(prev.id)}`}
                className="praxis-learn-nav-link"
              >
                <Arrow size={14} direction="left" /> {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/learning/lesson/${toSlug(next.id)}`}
                className="praxis-learn-nav-link"
              >
                {next.title} <Arrow size={14} />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="praxis-learn-side" aria-label="Level contents">
          <span className="praxis-learn-side-title">
            Level {lesson.level}: {level?.title ?? ""}
          </span>
          {siblings.map((sibling) => {
            const done = completed.includes(sibling.id);
            const isCurrent = sibling.id === lesson.id;
            return (
              <Link
                key={sibling.id}
                href={`/learning/lesson/${toSlug(sibling.id)}`}
                className={`praxis-learn-side-item${done ? " praxis-done" : ""}`}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span className="praxis-learn-side-dot" aria-hidden="true" />
                <span>{sibling.title}</span>
              </Link>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

function formatInline(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
