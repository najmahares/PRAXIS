"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import PasswordChecklist from "@/components/auth/PasswordChecklist";
import { resetPassword } from "@/lib/authApi";
import { useSession } from "@/lib/auth/useSession";
import {
  alertStyle,
  fieldStyle,
  inputStyle,
  labelStyle,
  linkStyle,
  passwordInputStyle,
  passwordWrapStyle,
  primaryButtonStyle,
  showButtonStyle,
} from "@/lib/uiStyles";

function ResetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession();

  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  
  
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const checklistVisible = password.length > 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError("");

    
    const pw = passwordRef.current?.value ?? password;
    const cf = confirmRef.current?.value ?? confirm;

    if (pw.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (pw !== cf) {
      setError("Passwords don't match. Check both fields.");
      return;
    }

    setSubmitting(true);
    const result = await resetPassword(token, email, pw);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    try {
      const res = await fetch("/api/auth/me", {
        credentials: "same-origin",
        cache: "no-store",
      });
      const data = await res.json();
      if (data?.user) setUser(data.user);
    } catch {
      
    }

    router.replace("/dashboard");
  }

  if (!token || !email) {
    return (
      <AuthShell
        title="Reset link missing"
        subtitle="This page needs a valid reset link."
        footer={
          <Link href="/forgot" style={linkStyle}>
            Request a new reset link
          </Link>
        }
      >
        <div style={alertStyle}>
          The link you followed doesn't include a reset token. Request a new password
          reset to get a fresh link.
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle={`For ${email}`}
      footer={
        <Link href="/login" style={linkStyle}>
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        {error ? (
          <div role="alert" style={alertStyle}>
            {error}
          </div>
        ) : null}

        <div style={fieldStyle}>
          <label htmlFor="reset-password" style={labelStyle}>
            New password
          </label>
          <div style={passwordWrapStyle}>
            <input
              id="reset-password"
              ref={passwordRef}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={submitting}
              className="praxis-input"
              style={{ ...inputStyle, ...passwordInputStyle }}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              disabled={submitting}
              style={showButtonStyle}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <PasswordChecklist value={password} visible={checklistVisible} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label htmlFor="reset-confirm" style={labelStyle}>
            Confirm new password
          </label>
          <div style={passwordWrapStyle}>
            <input
              id="reset-confirm"
              ref={confirmRef}
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                if (error) setError("");
              }}
              disabled={submitting}
              className="praxis-input"
              style={{ ...inputStyle, ...passwordInputStyle }}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              disabled={submitting}
              style={showButtonStyle}
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="praxis-primary"
          style={primaryButtonStyle}
          disabled={submitting}
        >
          {submitting ? "Updating…" : "Set new password"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
          Loading…
        </div>
      }
    >
      <ResetInner />
    </Suspense>
  );
}
