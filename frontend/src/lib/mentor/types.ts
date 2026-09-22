export type MentorRole = "user" | "assistant";

export type MentorMessage = {
  id: string;
  role: MentorRole;
  content: string;
  createdAt: number;
};

export type ConceptSignal = {
  label: string;
  level: "Strong" | "Developing" | "Needs practice";
};

export type MemoryItem = {
  id: string;
  fact: string;
  concept: string;
  createdAt: number;
};

export type MentorContext = {
  page?: string;
  scenario?: string;
  portfolioSummary?: string;
  conceptSignals?: ConceptSignal[];
  memories?: MemoryItem[];
};

export type ChatRequest = {
  message: string;
  history: MentorMessage[];
  context: MentorContext;
};
