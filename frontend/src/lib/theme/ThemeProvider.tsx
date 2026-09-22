"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (next: Theme) => void;
  hydrateFromServer: () => Promise<void>;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "praxis_theme";

function readSystem(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStored(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    
  }
  return "system";
}

function applyTheme(resolved: ResolvedTheme): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const initial = readStored();
    const resolved = initial === "system" ? readSystem() : initial;
    setThemeState(initial);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme !== "system") return;
      const next: ResolvedTheme = mq.matches ? "dark" : "light";
      setResolvedTheme(next);
      applyTheme(next);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const applyLocal = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      
    }
    const resolved = next === "system" ? readSystem() : next;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      applyLocal(next);
      
      
      void fetch("/api/settings", {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: next }),
      }).catch(() => {});
    },
    [applyLocal]
  );

  const hydrateFromServer = useCallback(async () => {
    try {
      const res = await fetch("/api/settings", {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as {
        ok: boolean;
        settings?: { appearance?: { theme?: Theme } };
      };
      const serverTheme = data.settings?.appearance?.theme;
      if (
        serverTheme === "light" ||
        serverTheme === "dark" ||
        serverTheme === "system"
      ) {
        if (serverTheme !== readStored()) {
          applyLocal(serverTheme);
        }
      }
    } catch {
      
    }
  }, [applyLocal]);

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, hydrateFromServer }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
