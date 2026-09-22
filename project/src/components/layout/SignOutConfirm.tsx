"use client";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

export default function SignOutConfirm({
  open,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const modalRef = useModalA11y(open, onCancel);

  if (!open) return null;
  return (
    <div ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="signout-title"
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, zIndex: 200,
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        padding: 24, width: "100%", maxWidth: 380,
      }}>
        <h3 id="signout-title" style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "var(--color-text)" }}>
          Sign out of PRAXIS?
        </h3>
        <p style={{ margin: "10px 0 18px", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-muted)" }}>
          You can sign back in any time. Your progress is saved to your account.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              height: 40, padding: "0 20px",
              background: "var(--color-surface)", color: "var(--color-text)",
              fontSize: 14, fontWeight: 500,
              border: "1px solid var(--color-border-strong)",
              borderRadius: 6, cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              height: 40, padding: "0 20px",
              background: "var(--color-primary)", color: "#fff",
              fontSize: 14, fontWeight: 500,
              border: "none", borderRadius: 6, cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
