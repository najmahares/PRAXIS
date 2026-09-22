"use client";

import { useContext } from "react";
import { SessionContext, type SessionContextValue } from "./SessionProvider";

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
