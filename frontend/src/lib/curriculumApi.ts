import { LEVELS } from "./curriculum/levels";
import { LESSONS as RAW_LESSONS } from "./curriculum/lessons";
import type { Lesson, LessonMeta, Level } from "./curriculum/types";

function isLesson(value: unknown): value is Lesson {
  if (!value || typeof value !== "object") return false;
  const l = value as Partial<Lesson>;
  return (
    typeof l.id === "string" &&
    typeof l.level === "number" &&
    typeof l.title === "string" &&
    typeof l.concept === "string" &&
    typeof l.minutes === "number" &&
    typeof l.summary === "string" &&
    Array.isArray(l.body)
  );
}

const LESSONS: Lesson[] = (RAW_LESSONS as unknown[]).filter(isLesson);

export function getAllLevels(): Level[] {
  return LEVELS;
}

export function getLevel(id: number): Level | null {
  return LEVELS.find((level) => level.id === id) ?? null;
}

export function getLessonsForLevel(levelId: number): Lesson[] {
  return LESSONS.filter((lesson) => lesson.level === levelId);
}

export function getLessonMetaForLevel(levelId: number): LessonMeta[] {
  return getLessonsForLevel(levelId).map(({ body: _body, ...meta }) => meta);
}

export function getLesson(id: string): Lesson | null {
  return LESSONS.find((lesson) => lesson.id === id) ?? null;
}

export function getNextLesson(id: string): LessonMeta | null {
  const index = LESSONS.findIndex((lesson) => lesson.id === id);
  if (index === -1 || index === LESSONS.length - 1) return null;
  const next = LESSONS[index + 1];
  if (!next) return null;
  const { body: _body, ...meta } = next;
  return meta;
}

export function getPreviousLesson(id: string): LessonMeta | null {
  const index = LESSONS.findIndex((lesson) => lesson.id === id);
  if (index <= 0) return null;
  const prev = LESSONS[index - 1];
  if (!prev) return null;
  const { body: _body, ...meta } = prev;
  return meta;
}

export function getTotalLessons(): number {
  return LESSONS.length;
}

export function getTotalLevels(): number {
  return LEVELS.length;
}

export function hasContent(id: string): boolean {
  const lesson = getLesson(id);
  return Boolean(lesson && lesson.body.length > 0);
}

export function placeholderMinutes(): number {
  return 5;
}
