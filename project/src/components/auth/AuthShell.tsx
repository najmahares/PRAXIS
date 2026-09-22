import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const DEFAULT_QUOTE = "“An investment in knowledge pays the best interest.”";
const DEFAULT_ATTRIBUTION = "- Benjamin Franklin";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  quote?: string;
  attribution?: string;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footer,
  quote = DEFAULT_QUOTE,
  attribution = DEFAULT_ATTRIBUTION,
}: AuthShellProps) {
  return (
    <div style={shellStyle}>
      <header style={headerStyle}>
        <Link href="/" style={brandStyle}>
          PRAXIS
        </Link>
        <nav style={navStyle}>
          <Link href="/login" style={navLinkStyle}>
            Sign in
          </Link>
          <Link href="/register" style={navCtaStyle}>
            Get started
          </Link>
        </nav>
      </header>
      <main className="praxis-auth-main" style={mainStyle}>
        <section style={formColumnStyle}>
          <div style={cardStyle}>
            <h1 style={titleStyle}>{title}</h1>
            <p style={subtitleStyle}>{subtitle}</p>
            {children}
            <div style={cardFooterStyle}>{footer}</div>
          </div>
          <p style={termsStyle}>
            By continuing, you agree to the PRAXIS Terms and Privacy Policy.
          </p>
        </section>
        <aside className="praxis-auth-quote" style={quoteColumnStyle}>
          <blockquote style={quoteStyle}>{quote}</blockquote>
          <p style={attributionStyle}>{attribution}</p>
        </aside>
      </main>
    </div>
  );
}

const shellStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "var(--color-background)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 32px",
  background: "var(--color-surface)",
  borderBottom: "1px solid var(--color-border)",
  flexShrink: 0,
};

const brandStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "var(--color-text)",
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const navLinkStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--color-text)",
  padding: "8px 12px",
  borderRadius: "var(--radius-sm)",
};

const navCtaStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#ffffff",
  background: "var(--color-primary)",
  padding: "9px 16px",
  borderRadius: "var(--radius-sm)",
};

const mainStyle: CSSProperties = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "minmax(0, 440px) minmax(0, 380px)",
  gap: "88px",
  justifyContent: "center",
  alignItems: "center",
  padding: "48px 40px",
  width: "100%",
};

const formColumnStyle: CSSProperties = {
  width: "100%",
  maxWidth: "440px",
  justifySelf: "center",
};

const cardStyle: CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "32px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
};

const subtitleStyle: CSSProperties = {
  margin: "6px 0 24px",
  fontSize: "14px",
  color: "var(--color-text-muted)",
};

const cardFooterStyle: CSSProperties = {
  marginTop: "22px",
  textAlign: "center",
  fontSize: "13px",
  color: "var(--color-text-muted)",
};

const termsStyle: CSSProperties = {
  margin: "16px 0 0",
  textAlign: "center",
  fontSize: "11px",
  color: "var(--color-text-muted)",
};

const quoteColumnStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifySelf: "start",
  maxWidth: "380px",
};

const quoteStyle: CSSProperties = {
  margin: 0,
  fontSize: "22px",
  fontWeight: 500,
  lineHeight: 1.4,
  letterSpacing: "-0.01em",
  color: "var(--color-text)",
};

const attributionStyle: CSSProperties = {
  margin: 0,
  fontSize: "13px",
  color: "var(--color-text-muted)",
};
