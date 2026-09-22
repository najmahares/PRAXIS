"use client";

export type Memory = {
  id: string;
  fact: string;
  concept: string;
  createdAt: number;
};

export async function fetchMemories(): Promise<Memory[]> {
  try {
    const response = await fetch("/api/memories", { method: "GET" });
    if (!response.ok) return [];
    const data = (await response.json()) as { memories?: Memory[] };
    return data.memories ?? [];
  } catch {
    return [];
  }
}
