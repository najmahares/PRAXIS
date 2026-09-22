"use client";
import { Suspense } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { signIn, startGoogleAuth } from "@/lib/authApi";
import { safeNextPath } from "@/lib/http";
import { validateLogin } from "@/lib/validation";
import { useSession } from "@/lib/auth/useSession";
import {
  alertStyle,
  checkboxLabelStyle,
  dividerLineStyle,
  dividerStyle,
  dividerTextStyle,
  fieldErrorStyle,
  fieldStyle,
  ghostButtonStyle,
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
      quote="Practice turns knowledge into judgment."
      attribution="PRAXIS learner"
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

        <div style={dividerStyle}>
          <span style={dividerLineStyle} />
          <span style={dividerTextStyle}>or</span>
          <span style={dividerLineStyle} />
        </div>

        <button
          type="button"
          onClick={() => startGoogleAuth()}
          disabled={submitting}
          style={ghostButtonStyle}
          aria-label="Continue with Google"
        >
          <GoogleMark />
          <span style={{ marginLeft: 10 }}>Continue with Google</span>
        </button>

        
              <p className="praxis-oauth-note">
          You'll be redirected to Google. Authentication is handled securely by our provider.
        </p>
        </form>
    </AuthShell>
  );
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function LoginPagePage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: 40, textAlign: "center", color: "var(--color-text-muted)" }}>
          Loading…
        </div>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
