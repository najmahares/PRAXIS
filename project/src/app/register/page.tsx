"use client";
import { Suspense } from "react";
import type React from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import PasswordChecklist from "@/components/auth/PasswordChecklist";
import { signUp } from "@/lib/authApi";
import { safeNextPath } from "@/lib/http";
import { validateRegister } from "@/lib/validation";
import { useSession } from "@/lib/auth/useSession";
import {
  alertStyle,
  checkboxLabelStyle,
  fieldErrorStyle,
  fieldStyle,
  inputErrorStyle,
  inputStyle,
  labelStyle,
  linkStyle,
  passwordInputStyle,
  passwordWrapStyle,
  primaryButtonStyle,
  showButtonStyle,
} from "@/lib/uiStyles";

type Touched = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  confirm?: boolean;
  terms?: boolean;
};

function RegisterPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, setUser } = useSession();
  const nextPath = safeNextPath(searchParams.get("next"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [status, router, nextPath]);

  const errors = validateRegister({ name, email, password, confirm, terms });
  const show = (field: keyof Touched) =>
    Boolean(errors[field]) && (touched[field] || submitAttempted);
  const showChecklist =
    password.length > 0 || touched.password || submitAttempted;

  function blur(field: keyof Touched) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitAttempted(true);
    setFormError("");
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    const result = await signUp(name, email, password);
    setSubmitting(false);

    if (!result.ok || !result.user) {
      setFormError(
        result.ok ? "Something went wrong. Please try again." : result.error,
      );
      return;
    }
    setUser(result.user);
    router.replace(nextPath);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start practicing financial decisions in a safe environment."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" style={linkStyle}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        {formError ? (
          <div role="alert" style={alertStyle}>
            {formError}
          </div>
        ) : null}

        <div style={fieldStyle}>
          <label htmlFor="register-name" style={labelStyle}>
            Full name
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder="Amina Wanjiru"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => blur("name")}
            disabled={submitting}
            className="praxis-input"
            style={
              show("name") ? { ...inputStyle, ...inputErrorStyle } : inputStyle
            }
            aria-invalid={show("name") ? true : undefined}
            aria-describedby={show("name") ? "register-name-error" : undefined}
          />
          {show("name") ? (
            <p id="register-name-error" style={fieldErrorStyle}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="register-email" style={labelStyle}>
            Email
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => blur("email")}
            disabled={submitting}
            className="praxis-input"
            style={
              show("email") ? { ...inputStyle, ...inputErrorStyle } : inputStyle
            }
            aria-invalid={show("email") ? true : undefined}
            aria-describedby={
              show("email") ? "register-email-error" : undefined
            }
          />
          {show("email") ? (
            <p id="register-email-error" style={fieldErrorStyle}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="register-password" style={labelStyle}>
            Password
          </label>
          <div style={passwordWrapStyle}>
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => blur("password")}
              disabled={submitting}
              className="praxis-input"
              style={
                show("password")
                  ? { ...inputStyle, ...passwordInputStyle, ...inputErrorStyle }
                  : { ...inputStyle, ...passwordInputStyle }
              }
              aria-invalid={show("password") ? true : undefined}
              aria-describedby="register-password-rules"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              disabled={submitting}
              style={showButtonStyle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div id="register-password-rules">
            <PasswordChecklist value={password} visible={showChecklist} />
          </div>
          {show("password") ? (
            <p style={fieldErrorStyle}>{errors.password}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="register-confirm" style={labelStyle}>
            Confirm password
          </label>
          <input
            id="register-confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            onBlur={() => blur("confirm")}
            disabled={submitting}
            className="praxis-input"
            style={
              show("confirm")
                ? { ...inputStyle, ...inputErrorStyle }
                : inputStyle
            }
            aria-invalid={show("confirm") ? true : undefined}
            aria-describedby={
              show("confirm") ? "register-confirm-error" : undefined
            }
          />
          {show("confirm") ? (
            <p id="register-confirm-error" style={fieldErrorStyle}>
              {errors.confirm}
            </p>
          ) : null}
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) => {
                setTerms(event.target.checked);
                setTouched((prev) => ({ ...prev, terms: true }));
              }}
              disabled={submitting}
            />
            I agree to the{" "}
            <Link href="/terms" style={linkStyle}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" style={linkStyle}>
              Privacy Policy
            </Link>
          </label>
          {show("terms") ? <p style={fieldErrorStyle}>{errors.terms}</p> : null}
        </div>

        <button
          type="submit"
          className="praxis-primary"
          style={primaryButtonStyle}
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>

              </form>
    </AuthShell>
  );
}





export default function RegisterPagePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
          Loading…
        </div>
      }
    >
      <RegisterPageInner />
    </Suspense>
  );
}
