"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MentorContext, MentorMessage } from "./types";
import { fetchMemories, type Memory } from "./memory";
import { buildMentorContext } from "./context";

const API_URL = "/api/mentor";
const EXTRACT_URL = "/api/mentor/extract";
const STORAGE_KEY = "praxis_mentor_thread";
const IMAGE_TRIGGERS =
  /(show me an image|show me a picture|generate an image|generate a picture|illustrate|draw|picture of|image of|visuali[sz]e)/i;

export type MentorStatus = "idle" | "streaming" | "error";

export type UseMentorResult = {
  messages: MentorMessage[];
  memories: Memory[];
  status: MentorStatus;
  error: string;
  incomplete: boolean;
  cooldown: number;
  sendMessage: (text: string) => Promise<void>;
  retry: () => Promise<void>;
  clear: () => void;
};

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function nonEmptyHistory(messages: MentorMessage[]): MentorMessage[] {
  return messages.filter(
    (entry) => entry.content.trim().length > 0 && entry.role !== undefined,
  );
}

function loadStoredMessages(): MentorMessage[] {
  
  
  return [];
}

function persistMessages(_messages: MentorMessage[]): void {
  
}

function clearStoredMessages() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    
  }
}

export function useMentor(): UseMentorResult {
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [status, setStatus] = useState<MentorStatus>("idle");
  const [error, setError] = useState("");
  const [incomplete, setIncomplete] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const lastUserRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const stored = loadStoredMessages();
    setMessages(stored);
    const lastUser = [...stored].reverse().find((m) => m.role === "user");
    if (lastUser) lastUserRef.current = lastUser.content;
    setHydrated(true);

    void fetchMemories().then(setMemories);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistMessages(messages);
  }, [messages, hydrated]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = window.setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [cooldown]);

  const buildContext = useCallback((_query: string): MentorContext => {
    if (typeof window === "undefined") return {};
    return buildMentorContext();
  }, []);

  const extractMemories = useCallback(
    async (userMessage: string, assistantReply: string) => {
      try {
        const response = await fetch(EXTRACT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage,
            assistantReply,
            page: typeof window !== "undefined" ? window.location.pathname : "",
          }),
        });
        if (!response.ok) return;
        const data = (await response.json()) as {
          facts?: Array<{ fact: string; concept: string }>;
        };
        if (!data.facts || data.facts.length === 0) return;
        const refreshed = await fetchMemories();
        setMemories(refreshed);
      } catch {
        
      }
    },
    [],
  );

  const runTurn = useCallback(
    async (userText: string, historySnapshot: MentorMessage[]) => {
      const controller = new AbortController();
      abortRef.current = controller;
      setStatus("streaming");
      setError("");
      setIncomplete(false);

      const assistantId = createId();
      const assistantMessage: MentorMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      let accumulated = "";

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            history: nonEmptyHistory(historySnapshot),
            context: buildContext(userText),
          }),
          signal: controller.signal,
        });

        if (response.status === 429) throw new Error("rate_limited");
        if (response.status === 401) throw new Error("unauthorized");
        if (!response.ok || !response.body) throw new Error("request_failed");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((entry) =>
              entry.id === assistantId ? { ...entry, content: accumulated } : entry,
            ),
          );
        }

        if (!IMAGE_TRIGGERS.test(userText)) {
          const hadImage = /\[\[image:[^\]]+\]\]/i.test(accumulated);
          accumulated = accumulated.replace(/\[\[image:[^\]]+\]\]/gi, "").trim();
          if (hadImage) {
            accumulated +=
              "\n\nIf you would like an illustration, just ask me to show you one.";
          }
          setMessages((prev) =>
            prev.map((entry) =>
              entry.id === assistantId ? { ...entry, content: accumulated } : entry,
            ),
          );
        }

        setStatus("idle");
        setCooldown(0);
        void extractMemories(userText, accumulated);
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") {
          setStatus("idle");
          return;
        }

        const code = (err as Error).message;
        const hadContent = accumulated.trim().length > 0;

        if (code === "rate_limited") {
          const wait = 60;
          setCooldown(wait);
          setError(`You are sending messages too quickly. Try again in ${wait} seconds.`);
        } else if (code === "unauthorized") {
          setError("Your session has expired. Sign in again.");
        } else if (hadContent) {
          setError("The reply stopped before it finished.");
          setIncomplete(true);
        } else {
          setError("The mentor could not reply. Try again.");
        }

        setStatus("error");
        setMessages((prev) =>
          prev.filter((entry) => entry.id !== assistantId || entry.content.length > 0),
        );
      } finally {
        abortRef.current = null;
      }
    },
    [buildContext, extractMemories],
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming" || cooldown > 0) return;
      lastUserRef.current = trimmed;
      const snapshot = messages;
      const userMessage: MentorMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, userMessage]);
      await runTurn(trimmed, snapshot);
    },
    [messages, status, cooldown, runTurn],
  );

  const retry = useCallback(async () => {
    if (!lastUserRef.current || status === "streaming" || cooldown > 0) return;

    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserIndex = i;
        break;
      }
    }
    if (lastUserIndex === -1) return;

    const historyForCall = messages.slice(0, lastUserIndex);
    const truncated = messages.slice(0, lastUserIndex + 1);
    setMessages(truncated);
    setError("");
    setIncomplete(false);

    await runTurn(lastUserRef.current, historyForCall);
  }, [messages, status, cooldown, runTurn]);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus("idle");
    setError("");
    setIncomplete(false);
    setCooldown(0);
    lastUserRef.current = "";
    clearStoredMessages();
  }, []);

  return {
    messages,
    memories,
    status,
    error,
    incomplete,
    cooldown,
    sendMessage,
    retry,
    clear,
  };
}
