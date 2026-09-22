"use client";

const CACHE_KEY = "praxis_level_notes_v2";

export type LevelNote = {
  title: string;
  summary: string;
  keyPoints: string[];
  closing: string;
  source: "ai" | "local";
};

type CacheMap = Record<string, LevelNote>;

function readCache(): CacheMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as CacheMap;
  } catch {
    return {};
  }
}

function writeCache(map: CacheMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(map));
  } catch {
    
  }
}

export function getCachedNotes(levelId: number): LevelNote | null {
  const cache = readCache();
  return cache[String(levelId)] ?? null;
}

export function setCachedNotes(levelId: number, notes: LevelNote): void {
  const cache = readCache();
  cache[String(levelId)] = notes;
  writeCache(cache);
}

export function clearCachedNotes(levelId: number): void {
  const cache = readCache();
  delete cache[String(levelId)];
  writeCache(cache);
}

export type NotesFetchResult =
  | { ok: true; notes: LevelNote }
  | { ok: false; error: string };

export async function fetchLevelNotes(levelId: number): Promise<NotesFetchResult> {
  const cached = getCachedNotes(levelId);
  if (cached) return { ok: true, notes: cached };

  try {
    const response = await fetch("/api/learning/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: levelId }),
    });

    if (!response.ok) {
      let detail = `http_${response.status}`;
      try {
        const data = (await response.json()) as { error?: string };
        if (data.error) detail = data.error;
      } catch {
        
      }
      if (process.env.NODE_ENV !== "production") {
        console.error("[notes] request failed", response.status, detail);
      }
      return { ok: false, error: detail };
    }

    const data = (await response.json()) as { notes?: LevelNote };
    if (!data.notes) return { ok: false, error: "empty_response" };
    setCachedNotes(levelId, data.notes);
    return { ok: true, notes: data.notes };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[notes] network error", err);
    }
    return { ok: false, error: "network_error" };
  }
}
