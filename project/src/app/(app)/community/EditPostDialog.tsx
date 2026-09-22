"use client";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

import { useState } from "react";
import "./community.css";

export default function EditPostDialog({
  postId,
  initialTitle,
  initialBody,
  onClose,
  onSaved,
}: {
  postId: string;
  initialTitle: string;
  initialBody: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/community/posts/" + postId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Could not save.");
        return;
      }
      onSaved();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="praxis-community-modal-backdrop" onClick={onClose}>
      <div className="praxis-community-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="praxis-community-modal-head">
          <h2 className="praxis-community-modal-title">Edit post</h2>
          <button type="button" className="praxis-community-modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="praxis-community-modal-body">
          <label className="praxis-community-field">
            <span>Title</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
          </label>
          <label className="praxis-community-field">
            <span>Body</span>
            <textarea rows={7} value={body} onChange={(e) => setBody(e.target.value)} maxLength={6000} />
          </label>
          {error ? <p className="praxis-community-error">{error}</p> : null}
        </div>
        <footer className="praxis-community-modal-foot">
          <button type="button" className="praxis-practice-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="praxis-practice-primary" onClick={save} disabled={busy || title.trim().length < 4 || body.trim().length < 4}>{busy ? "Saving…" : "Save"}</button>
        </footer>
      </div>
    </div>
  );
}
