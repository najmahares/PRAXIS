"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { BookmarkRow } from "@/lib/bookmarks/types";
import "./bookmarks.css";
import Arrow from "@/components/ui/Arrow";

type Filter = "all" | "concept" | "company" | "scenario";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "concept", label: "Concepts" },
  { id: "company", label: "Companies" },
  { id: "scenario", label: "Scenarios" },
];

const TYPE_LABEL: Record<BookmarkRow["target_type"], string> = {
  concept: "Concept",
  company: "Company",
  scenario: "Scenario",
};

export default function BookmarksClient({
  initialBookmarks,
  isAuthed,
}: {
  initialBookmarks: BookmarkRow[];
  isAuthed: boolean;
}) {
  const [items, setItems] = useState<BookmarkRow[]>(initialBookmarks);
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((b) => b.target_type === filter)),
    [items, filter]
  );

  async function remove(id: string) {
    setBusyId(id);
    const prev = items;
    setItems(items.filter((b) => b.id !== id));
    try {
      const res = await fetch("/api/bookmarks?id=" + encodeURIComponent(id), {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.ok) {
        
        setItems(prev);
      }
    } catch {
      setItems(prev);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="praxis-bookmarks">
      <header className="praxis-bookmarks-header">
        <div>
          <span className="praxis-bookmarks-kicker">Saved</span>
          <h1 className="praxis-bookmarks-title">Bookmarks</h1>
          <p className="praxis-bookmarks-sub">
            Concepts, companies, and scenarios you want to come back to. Saved to
            your account, not just this device.
          </p>
        </div>
        <span className="praxis-bookmarks-count">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </header>

      <nav className="praxis-bookmarks-filters" aria-label="Filter">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={"praxis-bookmarks-chip" + (filter === f.id ? " is-active" : "")}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </nav>

      {visible.length === 0 ? (
        <div className="praxis-bookmarks-empty">
          <h2 className="praxis-bookmarks-empty-title">
            {filter === "all" ? "No bookmarks yet." : "Nothing in this filter."}
          </h2>
          <p className="praxis-bookmarks-empty-body">
            {filter === "all"
              ? isAuthed
                ? "Open a lesson, a company page, or a practice card and tap save to add it here."
                : "Sign in to save content you want to revisit."
              : "Try a different filter, or clear it to see everything."}
          </p>
          {filter !== "all" ? (
            <button
              type="button"
              className="praxis-bookmarks-empty-btn"
              onClick={() => setFilter("all")}
            >
              Show all bookmarks
            </button>
          ) : (
            <Link href="/learning" className="praxis-bookmarks-empty-btn">
              Browse the curriculum
            </Link>
          )}
        </div>
      ) : (
        <ul className="praxis-bookmarks-grid">
          {visible.map((b) => (
            <li key={b.id} className="praxis-bookmarks-card">
              <div className="praxis-bookmarks-card-head">
                <span className={"praxis-bookmarks-tag is-" + b.target_type}>
                  {TYPE_LABEL[b.target_type]}
                </span>
                <button
                  type="button"
                  className="praxis-bookmarks-remove"
                  aria-label={"Remove " + b.title}
                  onClick={() => remove(b.id)}
                  disabled={busyId === b.id}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              <h3 className="praxis-bookmarks-card-title">{b.title}</h3>
              {b.description ? (
                <p className="praxis-bookmarks-card-desc">{b.description}</p>
              ) : null}

              <div className="praxis-bookmarks-card-foot">
                <span className="praxis-bookmarks-card-saved">
                  Saved {relative(b.created_at)}
                </span>
                <Link href={b.href} className="praxis-bookmarks-card-open">
                  Open
                  <Arrow size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function relative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return days + " days ago";
  if (days < 14) return "last week";
  if (days < 30) return Math.floor(days / 7) + " weeks ago";
  return Math.floor(days / 30) + " months ago";
}
