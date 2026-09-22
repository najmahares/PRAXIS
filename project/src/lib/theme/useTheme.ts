"use client";

import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}



export type { Theme, ResolvedTheme, ThemeContextValue } from "./ThemeProvider";
