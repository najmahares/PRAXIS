export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export type QuizQuestion = {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  concept?: string;
};

export type Quiz = {
  title: string;
  topic: string;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
};

export function isQuiz(value: unknown): value is Quiz {
  if (!value || typeof value !== "object") return false;
  const q = value as Quiz;
  if (typeof q.title !== "string" || typeof q.topic !== "string") return false;
  if (q.difficulty !== "beginner" && q.difficulty !== "intermediate" && q.difficulty !== "advanced") {
    return false;
  }
  if (!Array.isArray(q.questions) || q.questions.length === 0) return false;
  for (const item of q.questions) {
    if (!item || typeof item !== "object") return false;
    if (typeof item.prompt !== "string") return false;
    if (!Array.isArray(item.options) || item.options.length !== 4) return false;
    if (!item.options.every((opt) => typeof opt === "string")) return false;
    if (typeof item.correctIndex !== "number") return false;
    if (item.correctIndex < 0 || item.correctIndex > 3) return false;
    if (typeof item.explanation !== "string") return false;
    if (item.concept !== undefined && typeof item.concept !== "string") return false;
  }
  return true;
}
