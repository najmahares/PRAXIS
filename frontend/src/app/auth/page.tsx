import Link from "next/link";
import type { CSSProperties } from "react";

export const metadata = {
  title: "Google sign-in",
};

export default function GooglePendingPage() {
  return (
    <div style={shellStyle}>
      <header style={headerStyle}>
        <Link href="/" style={brandStyle} aria-label="PRAXIS home">
          PRAXIS
        </Link>
        <nav style={navStyle} aria-label="Primary">
          <Link href="/login" style={navLinkStyle}>
            Sign in
          </Link>
          <Link href="/register" style={navCtaStyle}>
            Get started
          </Link>
        </nav>
      </header>
      <main id="main" style={mainStyle}>
        <span style={tagStyle}>Coming soon</span>
        <h1 style={titleStyle}>Google sign-in is on its way.</h1>
        <p style={bodyStyle}>
          We are still finishing the Google integration. In the meantime you can
          create an account with your email in about thirty seconds.
        </p>
        <div style={ctaRowStyle}>
          <Link href="/register" style={primaryCtaStyle}>
            Create an account
          </Link>
          <Link href="/login" style={secondaryCtaStyle}>
            Back to sign in
          </Link>
        </div>
      </main>
    </div>
  );
}

const shellStyle: CSSProperties = {
  minHeight: "100vh",
  background: "var(--color-surface)",
  color: "var(--color-text)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px 36px",
  background: "var(--color-surface)",
  borderBottom: "1px solid var(--color-border)",
};

const brandStyle: CSSProperties = {
  fontSize: "17px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "var(--color-text)",
  textDecoration: "none",
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const navLinkStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--color-text)",
  padding: "9px 14px",
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
};

const navCtaStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#ffffff",
  background: "var(--color-primary)",
  padding: "10px 18px",
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
};

const mainStyle: CSSProperties = {
  maxWidth: "640px",
  margin: "0 auto",
  padding: "96px 24px",
  textAlign: "center",
};

const tagStyle: CSSProperties = {
  display: "inline-block",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.14em",
  color: "var(--color-primary)",
  marginBottom: "20px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "var(--color-text)",
};

const bodyStyle: CSSProperties = {
  margin: "14px auto 0",
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "480px",
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
  marginTop: "30px",
};

const primaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "48px",
  padding: "0 24px",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: 500,
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  border: "1px solid var(--color-primary)",
};

const secondaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "48px",
  padding: "0 22px",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: "15px",
  fontWeight: 500,
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  border: "1px solid var(--color-border-strong)",
};
