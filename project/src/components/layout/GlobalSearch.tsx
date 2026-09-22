"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllLevels, getLessonsForLevel } from "@/lib/curriculumApi";
import { COMPANIES } from "@/lib/market/companies";
import { PRACTICE_CARDS } from "@/lib/practice/cards";
import Icon from "@/components/ui/Icon";

type Result = {
  id: string;
  kind: "lesson" | "company" | "practice";
  title: string;
  subtitle: string;
  href: string;
};

const KIND_LABELS: Record<Result["kind"], string> = {
  lesson: "Lesson",
  company: "Company",
  practice: "Practice",
};

function buildIndex(): Result[] {
  const out: Result[] = [];

  
  for (const level of getAllLevels()) {
    for (const lesson of getLessonsForLevel(level.id)) {
      out.push({
        id: "lesson-" + lesson.id,
        kind: "lesson",
        title: lesson.title,
        subtitle: "Level " + level.id + " · " + lesson.concept,
        href: "/learning/lesson/" + lesson.id.replace(".", "-"),
      });
    }
  }

  
  for (const c of COMPANIES) {
    out.push({
      id: "company-" + c.ticker,
      kind: "company",
      title: c.ticker + " · " + c.name,
      subtitle: c.sector,
      href: "/market/" + c.ticker,
    });
  }

  
  for (const p of PRACTICE_CARDS) {
    out.push({
      id: "practice-" + p.id,
      kind: "practice",
      title: p.title,
      subtitle: "Level " + p.level + " · " + p.type,
      href: "/practice/" + p.id,
    });
  }

  return out;
}

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const index = useMemo(() => buildIndex(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        (document.activeElement as HTMLElement)?.blur();
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[active];
      if (r) go(r.href);
    }
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", flex: 1, maxWidth: 460 }}>
      <span
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--color-text-muted)",
          display: "inline-flex",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <Icon name="search" size={16} />
      </span>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Search lessons, companies, practice"
        aria-label="Search"
        className="praxis-shell-search-input"
        style={{
          width: "100%",
          height: 38,
          paddingLeft: 36,
          paddingRight: 12,
          background: "var(--color-surface-muted)",
          border: "1px solid var(--color-border)",
          borderRadius: 8,
          fontSize: 14,
          color: "var(--color-text)",
        }}
      />

      {open && query.trim().length >= 2 ? (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            maxHeight: 420,
            overflowY: "auto",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            boxShadow: "var(--shadow-md)",
            padding: 6,
            zIndex: 60,
          }}
        >
          {results.length === 0 ? (
            <p style={{ padding: "14px 12px", margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((r, i) => (
              <button
                key={r.id}
                type="button"
                role="option"
                aria-selected={i === active}
                onClick={() => go(r.href)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: 12,
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  background: i === active ? "rgba(37, 99, 235, 0.08)" : "transparent",
                  color: "inherit",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#2563eb",
                  }}
                >
                  {KIND_LABELS[r.kind]}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: "var(--color-text)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {r.title}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      color: "var(--color-text-muted)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {r.subtitle}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--color-text-muted)",
                    opacity: i === active ? 1 : 0,
                  }}
                  aria-hidden="true"
                >
                  ↵
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
