"use client";

import { useEffect, useRef, useState } from "react";
import "./community.css";

export type MenuAction = "edit" | "delete" | "report";

export default function PostMenu({
  isOwn,
  onAction,
  align = "right",
}: {
  isOwn: boolean;
  onAction: (action: MenuAction) => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function fire(action: MenuAction) {
    setOpen(false);
    onAction(action);
  }

  return (
    <div className="praxis-post-menu" ref={ref}>
      <button
        type="button"
        className="praxis-post-menu-trigger"
        aria-label="Post options"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      </button>

      {open ? (
        <div
          className={"praxis-post-menu-dropdown " + (align === "left" ? "is-left" : "is-right")}
          role="menu"
        >
          {isOwn ? (
            <>
              <button
                type="button"
                role="menuitem"
                className="praxis-post-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fire("edit");
                }}
              >
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                className="praxis-post-menu-item is-danger"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  fire("delete");
                }}
              >
                Delete
              </button>
            </>
          ) : (
            <button
              type="button"
              role="menuitem"
              className="praxis-post-menu-item is-danger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fire("report");
              }}
            >
              Report
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
