"use client";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

import { useState } from "react";
import "./community.css";

export default function ConfirmDeleteDialog({
  label,
  onCancel,
  onConfirm,
}: {
  label: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);

  async function go() {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="praxis-community-modal-backdrop" onClick={onCancel}>
      <div className="praxis-community-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="praxis-community-modal-head">
          <h2 className="praxis-community-modal-title">Delete {label}?</h2>
          <button type="button" className="praxis-community-modal-close" onClick={onCancel} aria-label="Close">×</button>
        </header>
        <div className="praxis-community-modal-body">
          <p className="praxis-community-modal-note" style={{ marginTop: 0 }}>
            This cannot be undone. Any replies will also be removed.
          </p>
        </div>
        <footer className="praxis-community-modal-foot">
          <button type="button" className="praxis-practice-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="praxis-practice-primary is-danger" onClick={go} disabled={busy}>{busy ? "Deleting…" : "Delete"}</button>
        </footer>
      </div>
    </div>
  );
}
