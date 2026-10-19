"use client";
import { Suspense } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { signIn } from "@/lib/authApi";
import { safeNextPath } from "@/lib/http";
import { validateLogin } from "@/lib/validation";
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
  rowBetweenStyle,
  showButtonStyle,
} from "@/lib/uiStyles";

type Touched = { email?: boolean; password?: boolean };

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status, setUser } = useSession();
  const nextPath = safeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
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

  const errors = validateLogin({ email, password });
  const show = (field: keyof Touched) =>
    Boolean(errors[field]) && (touched[field] || submitAttempted);

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
    const result = await signIn(email, password);
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
      title="Welcome back"
      subtitle="Continue building better judgment."
      quote="The intelligent investor is a realist who sells to optimists and buys from pessimists."
      attribution="Benjamin Graham"
      footer={
        <>
          New to PRAXIS?{" "}
          <Link href="/register" style={linkStyle}>
            Create an account
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
          <label htmlFor="login-email" style={labelStyle}>
            Email
          </label>
          <input
            id="login-email"
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
            aria-describedby={show("email") ? "login-email-error" : undefined}
          />
          {show("email") ? (
            <p id="login-email-error" style={fieldErrorStyle}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="login-password" style={labelStyle}>
            Password
          </label>
          <div style={passwordWrapStyle}>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
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
              aria-describedby={
                show("password") ? "login-password-error" : undefined
              }
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
          {show("password") ? (
            <p id="login-password-error" style={fieldErrorStyle}>
              {errors.password}
            </p>
          ) : null}
        </div>

        <div style={rowBetweenStyle}>
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              disabled={submitting}
            />
            Remember me
          </label>
          <Link href="/forgot" style={linkStyle}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="praxis-primary"
          style={primaryButtonStyle}
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

      </form>
    </AuthShell>
  );
}



export default function LoginPagePage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "var(--color-text-muted)",
          }}
        >
          Loading…
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
