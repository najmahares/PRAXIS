"use client";

import { useEffect, useState, type ReactNode } from "react";

type AdminModalProps = {
  open: boolean;
  title: string;
  description?: string;
  tone?: "default" | "danger";
  submitLabel?: string;
  submitDisabled?: boolean;
  reasonField?: boolean;
  reasonLabel?: string;
  numberField?: boolean;
  numberLabel?: string;
  numberDefault?: number;
  onCancel: () => void;
  onSubmit: (payload: { reason?: string; number?: number }) => void;
  children?: ReactNode;
};

export default function AdminModal({
  open,
  title,
  description,
  tone = "default",
  submitLabel = "Confirm",
  submitDisabled = false,
  reasonField = false,
  reasonLabel = "Reason",
  numberField = false,
  numberLabel = "Days",
  numberDefault = 30,
  onCancel,
  onSubmit,
  children,
}: AdminModalProps) {
  const [reason, setReason] = useState("");
  const [number, setNumber] = useState(numberDefault);

  useEffect(() => {
    if (open) {
      setReason("");
      setNumber(numberDefault);
    }
  }, [open, numberDefault]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = tone === "danger";
  const reasonRequired = reasonField;
  const disabled = submitDisabled || (reasonRequired && reason.trim().length < 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adminmodal-title"
      className="praxis-adminmodal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="praxis-adminmodal">
        <div className="praxis-adminmodal-head">
          <span
            className={
              "praxis-adminmodal-badge " +
              (isDanger ? "is-danger" : "is-default")
            }
          >
            {isDanger ? "Destructive" : "Confirm"}
          </span>
          <h2 id="adminmodal-title" className="praxis-adminmodal-title">
            {title}
          </h2>
          {description ? (
            <p className="praxis-adminmodal-desc">{description}</p>
          ) : null}
        </div>

        <div className="praxis-adminmodal-body">
          {children}

          {numberField ? (
            <label className="praxis-adminmodal-field">
              <span className="praxis-adminmodal-label">{numberLabel}</span>
              <input
                type="number"
                min={1}
                max={3650}
                value={number}
                onChange={(e) => setNumber(Math.max(1, parseInt(e.target.value, 10) || 1))}
                autoFocus={!reasonField}
                className="praxis-adminmodal-input"
              />
            </label>
          ) : null}

          {reasonField ? (
            <label className="praxis-adminmodal-field">
              <span className="praxis-adminmodal-label">
                {reasonLabel}
                <span className="praxis-adminmodal-required">required</span>
              </span>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value.slice(0, 300))}
                placeholder="This will be shown to the user."
                rows={3}
                autoFocus
                className="praxis-adminmodal-input"
              />
              <span className="praxis-adminmodal-count">
                {reason.length} / 300
              </span>
            </label>
          ) : null}
        </div>

        <div className="praxis-adminmodal-foot">
          <button
            type="button"
            onClick={onCancel}
            className="praxis-admin-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSubmit({ reason: reason.trim(), number })}
            className={
              "praxis-admin-btn " +
              (isDanger ? "praxis-admin-btn-danger-solid" : "praxis-admin-btn-primary")
            }
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
