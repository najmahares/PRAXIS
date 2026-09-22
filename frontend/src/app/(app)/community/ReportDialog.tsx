"use client";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

import { useState } from "react";
import "./community.css";

const REASONS = [
  { id: "scam", label: "Scam or fraud" },
  { id: "advice", label: "Investment advice" },
  { id: "abuse", label: "Abuse or harassment" },
  { id: "spam", label: "Spam or advertising" },
  { id: "offtopic", label: "Off-topic" },
  { id: "other", label: "Something else" },
];

export default function ReportDialog({ targetType, targetId, targetLabel, onClose, onSubmitted }: { targetType: "post" | "reply"; targetId: string; targetLabel: string; onClose: () => void; onSubmitted: () => void }) {
  const [reason, setReason] = useState<string>("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    if (!reason) { setError("Choose a reason."); return; }
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/community/reports", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason, note: note.trim() || null }) });
      const data = await res.json();
      if (!data.ok) { setError(data.error ?? "Could not submit."); return; }
      setDone(true);
      setTimeout(onSubmitted, 900);
    } catch { setError("Network error."); } finally { setBusy(false); }
  }

  return (
    <div className="praxis-community-modal-backdrop" onClick={onClose}>
      <div className="praxis-community-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="praxis-community-modal-head">
          <h2 className="praxis-community-modal-title">Report {targetType}</h2>
          <button type="button" className="praxis-community-modal-close" onClick={onClose} aria-label="Close">×</button>
        </header>
        {done ? (
          <div className="praxis-community-modal-body">
            <p className="praxis-community-modal-note">Thanks. We will look at this {targetType} and take action if it breaks the rules.</p>
          </div>
        ) : (
          <>
            <div className="praxis-community-modal-body">
              <p className="praxis-community-modal-note" style={{ marginTop: 0 }}>Reporting: <strong>{targetLabel.slice(0, 80)}</strong></p>
              <div className="praxis-community-kind-row">
                {REASONS.map((r) => (
                  <button key={r.id} type="button" className={"praxis-community-chip" + (reason === r.id ? " is-active" : "")} onClick={() => setReason(r.id)}>{r.label}</button>
                ))}
              </div>
              <label className="praxis-community-field">
                <span>Anything else? (optional)</span>
                <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} maxLength={400} placeholder="Add context if it helps." />
              </label>
              {error ? <p className="praxis-community-error">{error}</p> : null}
            </div>
            <footer className="praxis-community-modal-foot">
              <button type="button" className="praxis-practice-secondary" onClick={onClose}>Cancel</button>
              <button type="button" className="praxis-practice-primary" onClick={submit} disabled={busy || !reason}>{busy ? "Reporting…" : "Report"}</button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
