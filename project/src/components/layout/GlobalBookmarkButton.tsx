"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getLesson } from "@/lib/curriculumApi";
import { getCompany } from "@/lib/market/companies";
import Icon from "@/components/ui/Icon";

type Savable = {
  targetType: "concept" | "company" | "scenario";
  targetId: string;
  title: string;
  description: string;
  href: string;
};

function resolveFromPath(pathname: string): Savable | null {
  
  const lessonMatch = pathname.match(/^\/learning\/lesson\/([^/]+)$/);
  if (lessonMatch) {
    const slug = decodeURIComponent(lessonMatch[1]);
    const id = slug.replace("-", ".");
    const lesson = getLesson(id);
    if (lesson) {
      return {
        targetType: "concept",
        targetId: lesson.id,
        title: lesson.title,
        description: lesson.summary.slice(0, 140),
        href: "/learning/lesson/" + slug,
      };
    }
  }

  
  const companyMatch = pathname.match(/^\/market\/([A-Z]+)$/i);
  if (companyMatch) {
    const ticker = companyMatch[1].toUpperCase();
    const c = getCompany(ticker);
    if (c) {
      return {
        targetType: "company",
        targetId: ticker,
        title: c.name,
        description: c.sector + " · NSE",
        href: "/market/" + ticker,
      };
    }
  }

  
  const practiceMatch = pathname.match(/^\/practice\/([^/]+)$/);
  if (practiceMatch && !pathname.startsWith("/practice/group")) {
    const id = decodeURIComponent(practiceMatch[1]);
    
    if (/^(L\d+-(scenario|drill|mission)|gen-)/.test(id)) {
      return {
        targetType: "scenario",
        targetId: id,
        title: id.replace(/[-_]/g, " "),
        description: "Practice card",
        href: "/practice/" + id,
      };
    }
  }

  return null;
}

export default function GlobalBookmarkButton() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const savable = resolveFromPath(pathname);

  
  useEffect(() => {
    setOpen(false);
    setSaved(null);
    setHint(null);
  }, [pathname]);

  
  useEffect(() => {
    if (!savable) {
      setSaved(null);
      return;
    }
    let cancelled = false;
    fetch(
      "/api/bookmarks/check?type=" +
        encodeURIComponent(savable.targetType) +
        "&id=" +
        encodeURIComponent(savable.targetId),
      { credentials: "same-origin", cache: "no-store" }
    )
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setSaved(Boolean(d.saved));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [savable?.targetType, savable?.targetId, savable]);

  async function toggle() {
    if (!savable || busy) return;
    setBusy(true);
    setHint(null);
    const next = !saved;
    setSaved(next);
    try {
      if (next) {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetType: savable.targetType,
            targetId: savable.targetId,
            title: savable.title,
            description: savable.description,
            href: savable.href,
          }),
        });
        const data = await res.json();
        if (!data.ok) {
          setSaved(false);
          setHint(data.error ?? "Could not save.");
        } else {
          setHint("Saved to your bookmarks.");
        }
      } else {
        const res = await fetch(
          "/api/bookmarks/by-target?type=" +
            encodeURIComponent(savable.targetType) +
            "&id=" +
            encodeURIComponent(savable.targetId),
          { method: "DELETE", credentials: "same-origin" }
        );
        const data = await res.json();
        if (!data.ok) {
          setSaved(true);
          setHint(data.error ?? "Could not remove.");
        } else {
          setHint("Removed from bookmarks.");
        }
      }
    } catch {
      setSaved(!next);
      setHint("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Bookmark this page"
        title={
          savable
            ? saved
              ? "Bookmarked, click to manage"
              : "Save this page to your bookmarks"
            : "Nothing to bookmark here"
        }
        style={{
          position: "relative",
          width: 36,
          height: 36,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "1px solid transparent",
          borderRadius: 8,
          color: saved ? "var(--color-primary)" : "var(--color-text-muted)",
          cursor: "pointer",
        }}
      >
        <Icon name="bookmark" size={20} />
      </button>

      {open ? (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: 260,
            maxWidth: 320,
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            boxShadow: "var(--shadow-md)",
            padding: 14,
            zIndex: 50,
          }}
        >
          {savable ? (
            <>
              <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--color-primary)", marginBottom: 6 }}>
                {saved ? "Saved" : "Bookmark this page"}
              </span>
              <span style={{ display: "block", fontSize: 13.5, fontWeight: 600, color: "var(--color-text)", marginBottom: 4 }}>
                {savable.title}
              </span>
              <span style={{ display: "block", fontSize: 12, color: "var(--color-text-muted)", marginBottom: 12 }}>
                {savable.description}
              </span>
              <button
                type="button"
                onClick={toggle}
                disabled={busy}
                style={{
                  width: "100%",
                  height: 38,
                  background: saved ? "var(--color-surface)" : "var(--color-primary)",
                  color: saved ? "var(--color-text)" : "#fff",
                  border: saved ? "1px solid var(--color-border-strong)" : "none",
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: 600,
                  cursor: busy ? "not-allowed" : "pointer",
                }}
              >
                {busy ? "…" : saved ? "Remove bookmark" : "Save to bookmarks"}
              </button>
              {hint ? (
                <p style={{ margin: "10px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
                  {hint}
                </p>
              ) : null}
            </>
          ) : (
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
              Open a lesson, a company page, or a practice card to bookmark it.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
