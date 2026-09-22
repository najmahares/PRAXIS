"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  signOut as apiSignOut,
  type AuthUser,
} from "@/lib/authApi";
import { syncProgressDown, drainLessonQueue } from "@/lib/curriculumProgress";
import { claimStorageForUser } from "@/lib/userStorage";

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export type SessionContextValue = {
  user: AuthUser | null;
  status: SessionStatus;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  const refresh = useCallback(async () => {
    setStatus("loading");
    const current = await getCurrentUser();
    if (current) {
      
      
      
      claimStorageForUser(current.id);
    }
    setUserState(current);
    setStatus(current ? "authenticated" : "unauthenticated");
  }, []);

  const handleSignOut = useCallback(async () => {
    await apiSignOut();
    setUserState(null);
    setStatus("unauthenticated");
    router.push("/login");
  }, [router]);

  const setUser = useCallback((next: AuthUser | null) => {
    
    
    
    if (next?.id) {
      claimStorageForUser(next.id);
    }
    setUserState(next);
    setStatus(next ? "authenticated" : "unauthenticated");
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  
  
  useEffect(() => {
    if (status !== "authenticated") return;
    void syncProgressDown();
  }, [status]);

  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      void drainLessonQueue();
    };
    window.addEventListener("online", handler);
    return () => {
      window.removeEventListener("online", handler);
    };
  }, []);

  return (
    <SessionContext.Provider
      value={{ user, status, refresh, signOut: handleSignOut, setUser }}
    >
      {children}
    </SessionContext.Provider>
  );
}
