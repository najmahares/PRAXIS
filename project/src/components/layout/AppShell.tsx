"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import PageLoading from "@/components/ui/PageLoading";
import JemaSidePanel from "@/components/jema/JemaSidePanel";
import { useSession } from "@/lib/auth/useSession";
import "./shell.css";

type AppShellProps = {
  children: ReactNode;
};

const FULL_WIDTH_PREFIXES = ["/mentor"];

function isFullWidth(pathname: string | null): boolean {
  if (!pathname) return false;
  return FULL_WIDTH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [nuruOpen, setNuruOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
    setNuruOpen(false);
  }, [pathname]);

  
  
  useEffect(() => {
    function onOpen() {
      setNuruOpen(true);
    }
    window.addEventListener("praxis:open-jema", onOpen);
    return () => window.removeEventListener("praxis:open-jema", onOpen);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      const next = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?next=${next}`);
    }
  }, [status, router, pathname]);

  if (status === "unauthenticated") {
    return (
      <div style={gateStyle} role="status">
        Redirecting to sign in…
      </div>
    );
  }

  const full = isFullWidth(pathname);

  return (
    <div className="praxis-shell" data-full={full ? "true" : "false"} data-jema={nuruOpen ? "true" : "false"}>
      <a href="#app-content" className="praxis-skip-link">
        Skip to content
      </a>
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div
        className="praxis-shell-backdrop"
        data-open={drawerOpen ? "true" : "false"}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <div className="praxis-shell-main">
        <TopBar onOpenDrawer={() => setDrawerOpen(true)} />
        <main
          id="app-content"
          className="praxis-shell-content"
          data-full={full ? "true" : "false"}
        >
          {status === "loading" ? <PageLoading label="Loading" /> : children}
        </main>
      </div>
      <JemaSidePanel open={nuruOpen} onClose={() => setNuruOpen(false)} />
      {!nuruOpen ? (
        <button
          type="button"
          className="praxis-jema-launcher"
          onClick={() => setNuruOpen(true)}
          aria-label="Ask Jema"
          aria-expanded={false}
          aria-controls="jema-panel"
        >
          <NuruIcon />
        </button>
      ) : null}
    </div>
  );
}

function NuruIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="url(#nuruGrad)" />
      <path
        d="M12 5.5c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5z"
        fill="#fff"
      />
      <defs>
        <linearGradient id="nuruGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const gateStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  color: "var(--color-text-muted)",
  background: "var(--color-background)",
};
