"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { requestPasswordReset } from "@/lib/authApi";
import {
  alertStyle,
  fieldStyle,
  inputErrorStyle,
  inputStyle,
  labelStyle,
  linkStyle,
  primaryButtonStyle,
  successStyle,
} from "@/lib/uiStyles";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError("");
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email address.");
      return;
    }
    setSubmitting(true);
    const result = await requestPasswordReset(trimmed);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSent(true);
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="We'll send you a link to set a new one."
      footer={
        <>
          Remembered it?{" "}
          <Link href="/login" style={linkStyle}>
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div style={successStyle} role="status">
          <strong style={{ display: "block", marginBottom: 6 }}>Check your inbox.</strong>
          If <strong>{email}</strong> is registered, you'll receive a password reset link
          in the next few minutes. The link expires in 1 hour.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {error ? <div role="alert" style={alertStyle}>{error}</div> : null}

          <div style={fieldStyle}>
            <label htmlFor="forgot-email" style={labelStyle}>
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              className="praxis-input"
              style={error ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
            />
          </div>

          <button
            type="submit"
            className="praxis-primary"
            style={primaryButtonStyle}
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
