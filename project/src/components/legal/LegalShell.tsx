import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type LegalShellProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

export default function LegalShell({
  title,
  updated,
  children,
}: LegalShellProps) {
  return (
    <div style={shellStyle}>
      <a href="#main" className="praxis-skip-link">
        Skip to content
      </a>

      <div style={subBarStyle}>
        <Link href="/" style={subBarLinkStyle}>
          <span aria-hidden="true" style={arrowStyle}>{"\u2190"}</span>
          <span>Back to home</span>
        </Link>
        <Link href="/register" style={subBarCtaStyle}>
          Back to sign up
        </Link>
      </div>

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
        <article style={articleStyle}>
          <h1 style={titleStyle}>{title}</h1>
          <p style={updatedStyle}>Last updated {updated}</p>
          {children}
        </article>

        <nav style={backNavStyle} aria-label="Return">
          <Link href="/" style={backNavLinkStyle}>
            <span aria-hidden="true" style={arrowStyle}>{"\u2190"}</span>
            <span>Back to home</span>
          </Link>
          <Link href="/register" style={backNavCtaStyle}>
            Back to sign up
          </Link>
        </nav>
      </main>
    </div>
  );
}

export const legalHeadingStyle: CSSProperties = {
  margin: "36px 0 10px",
  fontSize: "20px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
};

export const legalBodyStyle: CSSProperties = {
  margin: "10px 0 0",
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--color-text-muted)",
};

export const legalListStyle: CSSProperties = {
  margin: "12px 0 0",
  paddingLeft: "20px",
  fontSize: "16px",
  lineHeight: 1.7,
  color: "var(--color-text-muted)",
};

const shellStyle: CSSProperties = {
  minHeight: "100vh",
  background: "var(--color-surface)",
  color: "var(--color-text)",
};

const subBarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 36px",
  background: "var(--color-surface-muted)",
  borderBottom: "1px solid var(--color-border)",
};

const subBarLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13.5,
  fontWeight: 500,
  color: "var(--color-text-muted)",
  textDecoration: "none",
};

const subBarCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 13.5,
  fontWeight: 600,
  color: "var(--color-primary)",
  textDecoration: "none",
};

const arrowStyle: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 15,
  lineHeight: 1,
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
  maxWidth: "760px",
  margin: "0 auto",
  padding: "56px 24px 96px",
};

const articleStyle: CSSProperties = {
  maxWidth: "100%",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2rem, 4vw, 2.6rem)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "var(--color-text)",
};

const updatedStyle: CSSProperties = {
  margin: "10px 0 0",
  fontSize: "14px",
  color: "var(--color-text-muted)",
};

const backNavStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 56,
  paddingTop: 24,
  borderTop: "1px solid var(--color-border)",
};

const backNavLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  fontWeight: 500,
  color: "var(--color-text-muted)",
  textDecoration: "none",
};

const backNavCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontSize: 14,
  fontWeight: 600,
  color: "#ffffff",
  background: "var(--color-primary)",
  padding: "10px 18px",
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
};
