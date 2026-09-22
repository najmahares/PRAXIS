"use client";

import { LESSONS } from "./curriculum/lessons";
import { LEVELS, FOUNDATIONS_COMPLETE_LEVEL } from "./curriculum/levels";
import { fetchBootstrap } from "./authApi";

const STORAGE_KEY = "praxis_learning_progress";
const NOTES_KEY = "praxis_level_notes";
const CELEBRATED_KEY = "praxis_level_celebrated";

export type LevelQuizResult = {
  score: number;
  correct: number;
  total: number;
  passed: boolean;
  takenAt: number;
};

type ProgressState = {
  completedLessons: string[];
  levelQuizzes: Record<string, LevelQuizResult>;
};

export type NodeState = "locked" | "active" | "completed";

export function toSlug(id: string): string {
  return id.replace(/\./g, "-");
}

export function fromSlug(slug: string): string {
  return slug.replace(/-/g, ".");
}

function loadState(): ProgressState {
  if (typeof window === "undefined") return { completedLessons: [], levelQuizzes: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], levelQuizzes: {} };
    const parsed = JSON.parse(raw);
    const completedLessons = Array.isArray(parsed.completedLessons)
      ? parsed.completedLessons.filter((x: unknown) => typeof x === "string")
      : [];
    const levelQuizzes =
      parsed.levelQuizzes && typeof parsed.levelQuizzes === "object"
        ? parsed.levelQuizzes
        : {};

    
    
    
    
    for (const [lvl, r] of Object.entries(
      levelQuizzes as Record<string, { passed?: boolean }>,
    )) {
      if (r && r.passed) {
        const marker = "quiz-" + lvl;
        if (!completedLessons.includes(marker)) completedLessons.push(marker);
      }
    }

    return { completedLessons, levelQuizzes };
  } catch {
    return { completedLessons: [], levelQuizzes: {} };
  }
}

function saveState(state: ProgressState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    
  }
}

export function getProgress(): ProgressState {
  return loadState();
}

export function getCompletedLessonIds(progress: ProgressState): string[] {
  
  
  const realIds = new Set(LESSONS.map((l) => l.id));
  return progress.completedLessons.filter(
    (id) => !id.startsWith("quiz-") && realIds.has(id),
  );
}

export function isLessonRead(id: string): boolean {
  return loadState().completedLessons.includes(id);
}

export function markLessonRead(id: string): ProgressState {
  const state = loadState();
  if (!state.completedLessons.includes(id)) state.completedLessons.push(id);
  saveState(state);
  return state;
}

export function getLevelLessons(levelId: number): string[] {
  return LESSONS.filter((lesson) => lesson.level === levelId).map((lesson) => lesson.id);
}

export function isLevelLessonsDone(levelId: number, progress: ProgressState): boolean {
  const lessonIds = getLevelLessons(levelId);
  if (lessonIds.length === 0) return false;
  return lessonIds.every((id) => progress.completedLessons.includes(id));
}

export function isLevelQuizPassed(levelId: number): boolean {
  const state = loadState();
  
  if (state.completedLessons.includes("quiz-" + levelId)) return true;
  
  const result = state.levelQuizzes[String(levelId)];
  return result?.passed === true;
}

export function getLevelQuizResult(levelId: number): LevelQuizResult | null {
  const state = loadState();
  return state.levelQuizzes[String(levelId)] ?? null;
}

export function markLevelQuizPassed(
  levelId: number,
  result: LevelQuizResult,
): ProgressState {
  const state = loadState();
  const existing = state.levelQuizzes[String(levelId)];
  const keepPassed = existing?.passed === true || result.passed;
  state.levelQuizzes[String(levelId)] = { ...result, passed: keepPassed };

  
  
  if (keepPassed) {
    const marker = "quiz-" + levelId;
    if (!state.completedLessons.includes(marker)) {
      state.completedLessons.push(marker);
    }
  }
  saveState(state);

  
  
  if (keepPassed) {
    void syncLessonToServer("quiz-" + levelId);
  }

  return state;
}

export function isLevelUnlocked(levelId: number, progress: ProgressState): boolean {
  if (levelId === 0) return true;

  const level = LEVELS.find((l) => l.id === levelId);
  if (!level) return false;

  if (level.tier === "asset-deep-dives" || level.tier === "universal-skills") {
    const hasContent = getLevelLessons(levelId).length > 0;
    if (!hasContent) return false;
    return isLevelCompleted(FOUNDATIONS_COMPLETE_LEVEL, progress);
  }

  const previousLessonIds = getLevelLessons(levelId - 1);
  if (previousLessonIds.length === 0) return false;
  const lessonsRead = previousLessonIds.every((id) =>
    progress.completedLessons.includes(id),
  );
  return lessonsRead && isLevelQuizPassed(levelId - 1);
}

export type LevelDisplayState = "active" | "completed" | "locked" | "coming-soon";

export function getLevelDisplayState(
  levelId: number,
  progress: ProgressState,
): LevelDisplayState {
  const lessons = getLevelLessons(levelId);
  if (lessons.length === 0) return "coming-soon";
  if (isLevelCompleted(levelId, progress)) return "completed";
  if (!isLevelUnlocked(levelId, progress)) return "locked";
  return "active";
}

export function isLevelCompleted(levelId: number, progress: ProgressState): boolean {
  return isLevelLessonsDone(levelId, progress) && isLevelQuizPassed(levelId);
}

export function getLevelState(levelId: number, progress: ProgressState): NodeState {
  if (isLevelCompleted(levelId, progress)) return "completed";
  if (!isLevelUnlocked(levelId, progress)) return "locked";
  return "active";
}

export function isLessonUnlocked(lessonId: string, progress: ProgressState): boolean {
  const index = LESSONS.findIndex((lesson) => lesson && lesson.id === lessonId);
  if (index === -1) return false;
  if (index === 0) return true;

  const lesson = LESSONS[index];
  if (!lesson) return false;

  const siblings = LESSONS.filter((l) => l && l.level === lesson.level);
  const firstSibling = siblings[0];
  const isFirstInLevel = firstSibling ? firstSibling.id === lesson.id : false;

  if (isFirstInLevel) {
    return isLevelUnlocked(lesson.level, progress);
  }

  const previous = LESSONS[index - 1];
  if (!previous) return false;
  return progress.completedLessons.includes(previous.id);
}

export function getLessonState(lessonId: string, progress: ProgressState): NodeState {
  if (progress.completedLessons.includes(lessonId)) return "completed";
  if (!isLessonUnlocked(lessonId, progress)) return "locked";
  return "active";
}

export function getNextUnlockedLesson(progress: ProgressState): string | null {
  for (const lesson of LESSONS) {
    if (!lesson) continue;
    if (!progress.completedLessons.includes(lesson.id)) {
      if (isLessonUnlocked(lesson.id, progress)) return lesson.id;
    }
  }
  return null;
}

export function isLastLessonOfLevel(lessonId: string): boolean {
  const lesson = LESSONS.find((l) => l && l.id === lessonId);
  if (!lesson) return false;
  const siblings = LESSONS.filter((l) => l && l.level === lesson.level);
  if (siblings.length === 0) return false;
  const sorted = [...siblings].sort((a, b) => a.id.localeCompare(b.id));
  const last = sorted[sorted.length - 1];
  return last ? last.id === lessonId : false;
}

export function getUnlockedLevelCount(): number {
  const progress = loadState();
  return LEVELS.filter((level) => isLevelUnlocked(level.id, progress)).length;
}



export function hasCelebrated(levelId: number): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(CELEBRATED_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return false;
    return parsed.includes(levelId);
  } catch {
    return false;
  }
}

export function markCelebrated(levelId: number): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(CELEBRATED_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const list: number[] = Array.isArray(parsed) ? parsed : [];
    if (!list.includes(levelId)) list.push(levelId);
    window.localStorage.setItem(CELEBRATED_KEY, JSON.stringify(list));
  } catch {
    
  }
}



export function getLevelNotes(levelId: number): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = window.localStorage.getItem(NOTES_KEY);
    if (!raw) return "";
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return "";
    const value = (parsed as Record<string, unknown>)[String(levelId)];
    return typeof value === "string" ? value : "";
  } catch {
    return "";
  }
}

export function saveLevelNotes(levelId: number, notes: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(NOTES_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const map: Record<string, string> =
      parsed && typeof parsed === "object" ? (parsed as Record<string, string>) : {};
    map[String(levelId)] = notes;
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(map));
  } catch {
    
  }
}

export function hasAnyNotes(levelId: number): boolean {
  return getLevelNotes(levelId).trim().length > 0;
}










const SYNC_FLAG = "praxis-lesson-sync-v1";





export async function syncProgressDown(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  
  try { await drainLessonQueue(); } catch {  }
  try {
    
    
    
    const payload = await fetchBootstrap();
    const serverLessons = payload.completedLessons ?? [];
    if (!Array.isArray(serverLessons)) return false;
    const data = { ok: true, completedLessons: serverLessons };

    const local = getProgress();
    const merged = new Set<string>([
      ...local.completedLessons,
      ...data.completedLessons,
    ]);

    
    const raw = window.localStorage.getItem("praxis_learning_progress");
    let parsed: Record<string, unknown> = {};
    try {
      parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    } catch {
      parsed = {};
    }
    parsed.completedLessons = Array.from(merged);
    window.localStorage.setItem(
      "praxis_learning_progress",
      JSON.stringify(parsed)
    );

    
    const localOnly = local.completedLessons.filter(
      (id) => !data.completedLessons.includes(id)
    );
    if (localOnly.length > 0) {
      await fetch("/api/lesson-progress", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "replace-all",
          lessonIds: Array.from(merged),
        }),
      }).catch(() => {});
    }

    window.localStorage.setItem(SYNC_FLAG, "true");
    return true;
  } catch {
    return false;
  }
}





export async function syncLessonToServer(lessonId: string): Promise<void> {
  await pushOp("mark", lessonId);
}




export async function syncUnmarkToServer(lessonId: string): Promise<void> {
  await pushOp("unmark", lessonId);
}


const QUEUE_KEY = "praxis-lesson-queue-v1";
let drainInFlight: Promise<number> | null = null;

type QueuedOp = {
  action: "mark" | "unmark";
  lessonId: string;
  ts: number;
};

function readQueue(): QueuedOp[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QueuedOp[]) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedOp[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    
  }
}

function enqueue(op: QueuedOp): void {
  const current = readQueue();
  const filtered = current.filter((q) => q.lessonId !== op.lessonId);
  filtered.push(op);
  writeQueue(filtered);
}


export async function drainLessonQueue(): Promise<number> {
  
  
  
  if (drainInFlight) return drainInFlight;

  drainInFlight = (async () => {
    const queue = readQueue();
    if (queue.length === 0) return 0;

    const remaining: QueuedOp[] = [];
    for (const op of queue) {
      try {
        const res = await fetch("/api/lesson-progress", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(op),
        });
        if (!res.ok) remaining.push(op);
      } catch {
        remaining.push(op);
      }
    }
    writeQueue(remaining);
    return remaining.length;
  })();

  try {
    return await drainInFlight;
  } finally {
    drainInFlight = null;
  }
}


async function pushOp(action: "mark" | "unmark", lessonId: string): Promise<void> {
  if (typeof window === "undefined") return;
  enqueue({ action, lessonId, ts: Date.now() });
  await drainLessonQueue();
}


export async function resetAllProgress(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem("praxis_learning_progress");
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      parsed.completedLessons = [];
      window.localStorage.setItem(
        "praxis_learning_progress",
        JSON.stringify(parsed)
      );
    }
    window.localStorage.removeItem(QUEUE_KEY);
    await fetch("/api/lesson-progress", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "replace-all", lessonIds: [] }),
    });
  } catch {
    
  }
}
