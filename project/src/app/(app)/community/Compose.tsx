"use client";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

import { useState } from "react";
import type { PostKind } from "@/lib/community/types";
import { KIND_LABELS } from "@/lib/community/types";
import "./community.css";

const KINDS: PostKind[] = ["discussion", "question", "win", "challenge"];

export default function Compose({ onClose, onPosted }: { onClose: () => void; onPosted: () => void }) {
  const [kind, setKind] = useState<PostKind>("discussion");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/community/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, title, body }) });
      const data = await res.json();
      if (!data.ok) { setError(data.error ?? "Could not post."); return; }
      onPosted();
    } catch { setError("Network error."); } finally { setBusy(false); }
  }

  return (
    <div className="praxis-community-modal-backdrop" onClick={onClose}>
      <div className="praxis-community-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="praxis-community-modal-head">
          <h2 className="praxis-community-modal-title">Start a post</h2>
          <button type="button" className="praxis-community-modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="praxis-community-modal-body">
          <div className="praxis-community-kind-row">
            {KINDS.map((k) => (
              <button key={k} type="button" className={"praxis-community-chip" + (kind === k ? " is-active" : "")} onClick={() => setKind(k)}>{KIND_LABELS[k]}</button>
            ))}
          </div>
          <label className="praxis-community-field">
            <span>Title</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} placeholder="A short, specific title" />
          </label>
          <label className="praxis-community-field">
            <span>Body</span>
            <textarea rows={7} value={body} onChange={(e) => setBody(e.target.value)} maxLength={6000} placeholder="What are you thinking about? Be specific. No price predictions on tickers." />
          </label>
          <p className="praxis-community-modal-note">Posts are moderated. Promises of returns, contact requests, and specific price predictions are blocked automatically.</p>
          {error ? <p className="praxis-community-error">{error}</p> : null}
        </div>
        <footer className="praxis-community-modal-foot">
          <button type="button" className="praxis-practice-secondary" onClick={onClose}>Cancel</button>
          <button type="button" className="praxis-practice-primary" onClick={submit} disabled={busy || title.trim().length < 4 || body.trim().length < 4}>{busy ? "Posting…" : "Post"}</button>
        </footer>
      </div>
    </div>
  );
}
