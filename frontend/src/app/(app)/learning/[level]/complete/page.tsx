"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  getAllLevels,
  getLevel,
  getLessonsForLevel,
} from "@/lib/curriculumApi";
import {
  getProgress,
  getLevelNotes,
  saveLevelNotes,
  markCelebrated,
  hasCelebrated,
  isLevelLessonsDone,
  getLevelLessons,
  toSlug,
} from "@/lib/curriculumProgress";
import {
  fetchLevelNotes,
  getCachedNotes,
  type LevelNote,
} from "@/lib/levelNotesCache";
import Confetti from "@/components/ui/Confetti";
import "../../learning.css";

const NOTES_MIN = 10;
const NOTES_MAX = 2000;
const NOTES_COLLAPSE_AT = 220;
const MAX_BOOTSTRAP_ATTEMPTS = 8;
const BOOTSTRAP_DELAY_MS = 250;

export default function LevelCompletePage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params.level);
  const level = getLevel(levelId);
  const lessons = useMemo(
    () => (level ? getLessonsForLevel(level.id) : []),
    [level],
  );

  const [notesAI, setNotesAI] = useState<LevelNote | null>(null);
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);

  const [userNotes, setUserNotes] = useState("");
  const [userNotesDraft, setUserNotesDraft] = useState("");
  const [userNotesEditing, setUserNotesEditing] = useState(false);
  const [userNotesExpanded, setUserNotesExpanded] = useState(false);
  const [userNotesError, setUserNotesError] = useState("");

  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!level) {
      router.replace("/learning");
      return;
    }

    let cancelled = false;
    let attempts = 0;

    function bootstrap() {
      if (cancelled || !level) return;
      const progress = getProgress();
      const lessonsDone = isLevelLessonsDone(level.id, progress);

      if (!lessonsDone) {
        if (attempts < MAX_BOOTSTRAP_ATTEMPTS) {
          attempts += 1;
          window.setTimeout(bootstrap, BOOTSTRAP_DELAY_MS);
          return;
        }
        if (process.env.NODE_ENV !== "production") {
          const missing = getLevelLessons(level.id).filter(
            (id) => !progress.completedLessons.includes(id),
          );
          console.warn("[celebrate] level not complete, redirecting", {
            levelId: level.id,
            missing,
          });
        }
        router.replace(`/learning/${level.id}`);
        return;
      }

      const cached = getCachedNotes(level.id);
      if (cached) {
        setNotesAI(cached);
        setNotesLoading(false);
      } else {
        void fetchLevelNotes(level.id).then((result) => {
          if (cancelled) return;
          if (result && result.ok) {
            setNotesAI(result.notes);
          }
          setNotesLoading(false);
        });
      }

      const existing = getLevelNotes(level.id);
      setUserNotes(existing);
      setUserNotesDraft(existing);
      setUserNotesEditing(existing.trim().length === 0);

      const already = hasCelebrated(level.id);
      setShowConfetti(!already);
      markCelebrated(level.id);

      setReady(true);
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, [level, router]);

  const nextLevelWithContent = useMemo(() => {
    if (!level) return null;
    const allLevels = getAllLevels();
    const sorted = [...allLevels].sort((a, b) => a.id - b.id);
    for (const candidate of sorted) {
      if (candidate.id <= level.id) continue;
      if (getLessonsForLevel(candidate.id).length > 0) return candidate;
    }
    return null;
  }, [level]);

  const isEndOfFoundations = level?.tier === "foundations" && level.id === 7;

  const nextLevelFirstLesson = useMemo(() => {
    if (!nextLevelWithContent) return null;
    return getLessonsForLevel(nextLevelWithContent.id)[0] ?? null;
  }, [nextLevelWithContent]);

  const lastLesson = useMemo(
    () => (lessons.length ? lessons[lessons.length - 1] : null),
    [lessons],
  );

  async function handleRetryNotes() {
    if (!level) return;
    setNotesLoading(true);
    try {
      const result = await fetchLevelNotes(level.id);
      if (result && result.ok) {
        setNotesAI(result.notes);
      }
    } catch {
      
    }
    setNotesLoading(false);
  }

  function startEditingNotes() {
    setUserNotesDraft(userNotes);
    setUserNotesEditing(true);
    setUserNotesError("");
    setUserNotesExpanded(true);
  }

  function cancelEditingNotes() {
    setUserNotesDraft(userNotes);
    setUserNotesError("");
    setUserNotesEditing(userNotes.trim().length === 0);
  }

  function handleSaveUserNotes() {
    if (!level) return;
    const trimmed = userNotesDraft.trim();
    if (trimmed.length < NOTES_MIN) {
      setUserNotesError(`Write at least ${NOTES_MIN} characters before saving.`);
      return;
    }
    if (userNotesDraft.length > NOTES_MAX) {
      setUserNotesError(`Keep your notes under ${NOTES_MAX} characters.`);
      return;
    }
    saveLevelNotes(level.id, trimmed);
    setUserNotes(trimmed);
    setUserNotesEditing(false);
    setUserNotesError("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  const notesAreLong = userNotes.length > NOTES_COLLAPSE_AT;
  const notesPreview = notesAreLong
    ? `${userNotes.slice(0, NOTES_COLLAPSE_AT).trimEnd()}…`
    : userNotes;

  if (!ready || !level) {
    return (
      <p style={{ fontSize: 14, color: "var(--color-text-muted)", padding: 40 }}>
        Loading…
      </p>
    );
  }

  return (
    <div className="praxis-celebrate">
      {showConfetti ? <Confetti /> : null}
      <div className="praxis-celebrate-glow" aria-hidden="true" />

      <section className="praxis-celebrate-hero">
        <div className="praxis-celebrate-badge" aria-hidden="true">
          <CheckBurst />
        </div>
        <span className="praxis-celebrate-eyebrow">Level {level.id} complete</span>
        <h1 className="praxis-celebrate-title">{level.title}</h1>
        <p className="praxis-celebrate-body">
          {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"} read, level quiz
          passed. Notes from this level are below.
        </p>
      </section>

      <section
        className="praxis-celebrate-card praxis-celebrate-card-notes"
        aria-labelledby="notes-ai-heading"
      >
        <div className="praxis-celebrate-card-head">
          <div>
            <h2 id="notes-ai-heading" className="praxis-celebrate-card-title">
              Study notes
            </h2>
            <p className="praxis-celebrate-card-sub">
              A short recap you can revisit any time.
            </p>
          </div>
        </div>

        {notesLoading ? (
          <div className="praxis-notes-loading" role="status">
            <span className="praxis-notes-loading-dot" />
            <span className="praxis-notes-loading-dot" />
            <span className="praxis-notes-loading-dot" />
            <span className="praxis-notes-loading-text">Preparing your notes.</span>
          </div>
        ) : notesAI ? (
          <div className="praxis-notes">
            <h3 className="praxis-notes-title">{notesAI.title}</h3>
            <p className="praxis-notes-summary">{notesAI.summary}</p>

            {notesOpen ? (
              <>
                <ul className="praxis-notes-list">
                  {notesAI.keyPoints.map((point, index) => (
                    <li key={index} className="praxis-notes-item">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="praxis-notes-closing">{notesAI.closing}</p>
                <button
                  type="button"
                  className="praxis-notes-toggle"
                  onClick={() => setNotesOpen(false)}
                >
                  Show less
                </button>
              </>
            ) : (
              <button
                type="button"
                className="praxis-notes-toggle praxis-notes-toggle-more"
                onClick={() => setNotesOpen(true)}
              >
                Read the full notes
              </button>
            )}
          </div>
        ) : (
          <div className="praxis-notes-error-block">
            <p className="praxis-notes-error">
              We could not load your notes. You can try again, or continue with the key
              concepts below.
            </p>
            <button
              type="button"
              className="praxis-notes-retry"
              onClick={() => void handleRetryNotes()}
            >
              Try again
            </button>
          </div>
        )}
      </section>

      <section className="praxis-celebrate-card" aria-labelledby="concepts-heading">
        <div className="praxis-celebrate-card-head">
          <div>
            <h2 id="concepts-heading" className="praxis-celebrate-card-title">
              Key concepts
            </h2>
            <p className="praxis-celebrate-card-sub">
              One line per concept from this level.
            </p>
          </div>
        </div>
        <ul className="praxis-celebrate-concept-list">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="praxis-celebrate-concept-row">
              <span className="praxis-celebrate-concept-dot" aria-hidden="true" />
              <span className="praxis-celebrate-concept-name">{lesson.concept}</span>
              <span className="praxis-celebrate-concept-summary">
                {lesson.summary}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="praxis-celebrate-card" aria-labelledby="user-notes-heading">
        <div className="praxis-celebrate-card-head">
          <div>
            <h2 id="user-notes-heading" className="praxis-celebrate-card-title">
              Your notes
            </h2>
            <p className="praxis-celebrate-card-sub">
              Optional. Write anything in your own words. Saved on this device.
            </p>
          </div>
          {saved ? (
            <span className="praxis-celebrate-saved" role="status">
              Saved
            </span>
          ) : null}
        </div>

        {userNotesEditing ? (
          <div className="praxis-user-notes-editor">
            <textarea
              value={userNotesDraft}
              onChange={(event) => {
                setUserNotesDraft(event.target.value);
                if (userNotesError) setUserNotesError("");
              }}
              placeholder="Anything you want to remember. Questions you still have. Aha moments."
              className="praxis-celebrate-notes"
              rows={6}
              maxLength={NOTES_MAX + 200}
              aria-label={`Your notes for Level ${level.id}`}
            />
            <div className="praxis-user-notes-meta">
              <span
                className={
                  userNotesDraft.length > NOTES_MAX
                    ? "praxis-user-notes-count praxis-user-notes-count-over"
                    : "praxis-user-notes-count"
                }
              >
                {userNotesDraft.length} / {NOTES_MAX}
              </span>
              <span className="praxis-user-notes-hint">
                {NOTES_MIN} characters minimum
              </span>
            </div>
            {userNotesError ? (
              <p className="praxis-user-notes-error" role="alert">
                {userNotesError}
              </p>
            ) : null}
            <div className="praxis-celebrate-notes-actions">
              {userNotes.trim().length > 0 ? (
                <button
                  type="button"
                  onClick={cancelEditingNotes}
                  className="praxis-celebrate-notes-close"
                >
                  Cancel
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleSaveUserNotes}
                className="praxis-celebrate-save"
                disabled={
                  userNotesDraft.trim().length < NOTES_MIN ||
                  userNotesDraft.length > NOTES_MAX
                }
              >
                Save notes
              </button>
            </div>
          </div>
        ) : userNotes.trim().length > 0 ? (
          <div className="praxis-user-notes-saved">
            <p className="praxis-user-notes-body">
              {userNotesExpanded || !notesAreLong ? userNotes : notesPreview}
            </p>
            <div className="praxis-user-notes-footer">
              {notesAreLong ? (
                <button
                  type="button"
                  className="praxis-user-notes-toggle"
                  onClick={() => setUserNotesExpanded((value) => !value)}
                >
                  {userNotesExpanded ? "Show less" : "Show more"}
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                className="praxis-user-notes-edit"
                onClick={startEditingNotes}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={startEditingNotes}
            className="praxis-celebrate-notes-open"
          >
            <PlusIcon />
            Add your own notes
          </button>
        )}
      </section>

      <section className="praxis-celebrate-practice" aria-labelledby="practice-heading">
        <div className="praxis-celebrate-practice-body">
          <span className="praxis-celebrate-practice-eyebrow">Practice Level {level.id}</span>
          <h2 id="practice-heading" className="praxis-celebrate-practice-title">
            Now practice what you just learned.
          </h2>
          <p className="praxis-celebrate-practice-sub">
            Scenarios, drills, and missions for this level are now unlocked.
          </p>
        </div>
        <Link href="/practice" className="praxis-celebrate-practice-cta">
          Go to practice
        </Link>
      </section>

      {nextLevelWithContent ? (
        <section className="praxis-celebrate-next" aria-labelledby="next-heading">
          <span className="praxis-celebrate-next-tag">Up next</span>
          <h2 id="next-heading" className="praxis-celebrate-next-title">
            Level {nextLevelWithContent.id}: {nextLevelWithContent.title}
          </h2>
          <p className="praxis-celebrate-next-body">{nextLevelWithContent.goal}</p>
          <div className="praxis-celebrate-next-actions">
            {nextLevelFirstLesson ? (
              <Link
                href={`/learning/lesson/${toSlug(nextLevelFirstLesson.id)}`}
                className="praxis-celebrate-next-cta"
              >
                Start {nextLevelFirstLesson.title}
              </Link>
            ) : (
              <Link
                href={`/learning/${nextLevelWithContent.id}`}
                className="praxis-celebrate-next-cta"
              >
                Open Level {nextLevelWithContent.id}
              </Link>
            )}
            <Link href="/learning" className="praxis-celebrate-next-secondary">
              Back to My Learning
            </Link>
          </div>
        </section>
      ) : (
        <section className="praxis-celebrate-next praxis-celebrate-finale">
          <span className="praxis-celebrate-next-tag">
            {isEndOfFoundations ? "Foundations complete" : "Curriculum complete"}
          </span>
          <h2 id="next-heading" className="praxis-celebrate-next-title">
            {isEndOfFoundations
              ? "You finished every Foundation level."
              : "You have finished the entire current curriculum."}
          </h2>
          <p className="praxis-celebrate-next-body">
            {isEndOfFoundations
              ? "The Foundations tier is done. Now the platform opens up. Choose the asset classes and skills you want to go deep on."
              : "Deep dives and further levels are being written. In the meantime, keep practising with what you have already learned."}
          </p>
          <div className="praxis-celebrate-next-actions">
            <Link href="/learning" className="praxis-celebrate-next-cta">
              {isEndOfFoundations ? "Choose your path" : "Back to My Learning"}
            </Link>
          </div>
        </section>
      )}

      <div className="praxis-celebrate-footer">
        {lastLesson ? (
          <Link
            href={`/learning/lesson/${toSlug(lastLesson.id)}`}
            className="praxis-celebrate-footer-link"
          >
            Last lesson: {lastLesson.title}
          </Link>
        ) : null}
        <Link href="/learning" className="praxis-celebrate-footer-link">
          All levels
        </Link>
      </div>
    </div>
  );
}

function CheckBurst() {
  return (
    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" aria-hidden="true">
      <circle cx="52" cy="52" r="50" stroke="currentColor" strokeWidth="1" opacity="0.15" fill="none" />
      <circle cx="52" cy="52" r="42" stroke="currentColor" strokeWidth="1.5" opacity="0.3" fill="none" className="praxis-check-ring" />
      <circle cx="52" cy="52" r="34" fill="currentColor" className="praxis-check-disc" />
      <polyline points="38 53 48 63 68 42" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="praxis-check-stroke" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
