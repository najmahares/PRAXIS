import Link from "next/link";
import type { CSSProperties } from "react";
import Reveal from "@/components/landing/Reveal";
import HeroChart from "@/components/landing/HeroChart";
import MentorChat from "@/components/landing/MentorChat";
import LoopTabs from "@/components/landing/LoopTabs";
import PartnersMarquee from "@/components/landing/PartnersMarquee";
import "./landing.css";

const CAPABILITIES = [
  {
    title: "Learn the fundamentals",
    body: "Shares, exchanges, indexes, dividends, risk, and the mechanics behind price movements.",
    accent: "#2563eb",
  },
  {
    title: "Explore real companies",
    body: "Read prices, history, sectors, and basic financials with beginner-friendly context.",
    accent: "#0d9488",
  },
  {
    title: "Build a virtual portfolio",
    body: "Start with practice capital you choose. No brokerage, no deposits, no risk.",
    accent: "#7c3aed",
  },
  {
    title: "Get honest feedback",
    body: "Your decisions, your reasoning, and a mentor that helps you see what you missed.",
    accent: "#d97706",
  },
];

const COMPARE_ROWS = [
  { course: "You read a chapter.", praxis: "You make a decision." },
  { course: "You watch a video.", praxis: "You see the outcome." },
  {
    course: "You memorize a definition.",
    praxis: "You explain your reasoning.",
  },
  { course: "You move on.", praxis: "You practice what you missed." },
];

const CONCEPTS = [
  {
    label: "Reading a balance sheet",
    level: "Strong",
    value: 82,
    tone: "success" as const,
  },
  {
    label: "Position sizing",
    level: "Developing",
    value: 54,
    tone: "warning" as const,
  },
  {
    label: "Diversification",
    level: "Needs practice",
    value: 28,
    tone: "danger" as const,
  },
];

export default function LandingPage() {
  return (
    <div style={shellStyle}>
      <a href="#main" className="praxis-skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <HeroBand />
        <BigStatement />
        <LoopSection />
        <WhatYouDo />
        <Comparison />
        <Mentor />
        <VirtualMoney />
        <TrustStrip />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header style={headerStyle}>
      <Link href="/" style={brandStyle} aria-label="PRAXIS home">
        PRAXIS
      </Link>
      <nav style={navStyle} aria-label="Primary">
        <Link
          href="/login"
          style={navLinkStyle}
          className="praxis-landing-link"
        >
          Sign in
        </Link>
        <Link
          href="/register"
          style={navCtaStyle}
          className="praxis-landing-button"
        >
          Get started
        </Link>
      </nav>
    </header>
  );
}

function HeroBand() {
  return (
    <div className="praxis-hero-band">
      <section aria-labelledby="hero-heading" style={heroSectionStyle}>
        <div className="praxis-hero-grid">
          <Reveal>
            <h1 id="hero-heading" style={heroHeadingStyle}>
              Your first portfolio doesn&rsquo;t have to be real.
            </h1>
            <p style={heroSubStyle}>
              PRAXIS is a practice environment for the stock market. Learn how
              shares work, explore real companies, build a portfolio with the
              virtual capital you choose, and see what happens, without risking
              a shilling.
            </p>
            <div style={ctaRowStyle}>
              <Link
                href="/register"
                className="praxis-landing-button"
                style={primaryCtaStyle}
              >
                Start practicing
              </Link>
              <a
                href="#loop"
                className="praxis-landing-link"
                style={secondaryCtaStyle}
              >
                See how it works
              </a>
            </div>
            <p style={safetyLineStyle}>
              No real money. No brokerage. Just practice.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <HeroChart />
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function BigStatement() {
  return (
    <section aria-labelledby="statement-heading" style={statementSectionStyle}>
      <Reveal>
        <h2 id="statement-heading" style={statementHeadingStyle}>
          Learn the market
          <br />
          by practicing it.
        </h2>
        <p style={statementSubStyle}>
          Reading about the market is not the same as making a decision in it.
          You can watch every video and still freeze when a real choice appears.
          PRAXIS gives you reps.
        </p>
      </Reveal>
    </section>
  );
}

function LoopSection() {
  return (
    <section id="loop" aria-labelledby="loop-heading" style={sectionStyle}>
      <Reveal>
        <span className="praxis-eyebrow">The loop</span>
        <h2 id="loop-heading" style={sectionHeadingStyle}>
          Six steps, every scenario.
        </h2>
        <p style={paragraphStyle}>
          You do them, not watch them. Each scenario ends with a reflection and
          a new scenario chosen for what you missed.
        </p>
      </Reveal>

      <div style={{ marginTop: "36px" }}>
        <LoopTabs />
      </div>
    </section>
  );
}

function WhatYouDo() {
  return (
    <section aria-labelledby="what-heading" style={sectionStyle}>
      <Reveal>
        <span className="praxis-eyebrow">What you do</span>
        <h2 id="what-heading" style={sectionHeadingStyle}>
          Everything a beginner needs, in one place.
        </h2>
      </Reveal>

      <div className="praxis-steps-grid" style={{ marginTop: "32px" }}>
        {CAPABILITIES.map((item, index) => (
          <Reveal key={item.title} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <article className="praxis-card-hover" style={capabilityCardStyle}>
              <span
                style={{ ...capabilityRuleStyle, background: item.accent }}
                aria-hidden="true"
              />
              <h3 style={capabilityTitleStyle}>{item.title}</h3>
              <p style={capabilityBodyStyle}>{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Comparison() {
  return (
    <section aria-labelledby="compare-heading" style={sectionStyle}>
      <Reveal>
        <span className="praxis-eyebrow">Why not just a course</span>
        <h2 id="compare-heading" style={sectionHeadingStyle}>
          Watching vs doing.
        </h2>
      </Reveal>

      <div className="praxis-comparison-grid" style={{ marginTop: "36px" }}>
        <Reveal>
          <div style={compareColMutedStyle}>
            <h3 style={compareTitleMutedStyle}>A finance course</h3>
            <ul style={compareListStyle}>
              {COMPARE_ROWS.map((row) => (
                <li key={row.course} style={compareRowMutedStyle}>
                  <span style={compareMarkMutedStyle} aria-hidden="true">
                    &ndash;
                  </span>
                  <span>{row.course}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div style={compareColActiveStyle}>
            <h3 style={compareTitleActiveStyle}>PRAXIS</h3>
            <ul style={compareListStyle}>
              {COMPARE_ROWS.map((row) => (
                <li key={row.praxis} style={compareRowActiveStyle}>
                  <span style={compareMarkActiveStyle} aria-hidden="true">
                    &#10003;
                  </span>
                  <span>{row.praxis}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mentor() {
  return (
    <section aria-labelledby="mentor-heading" style={tintedBandStyle}>
      <div style={tintedInnerStyle}>
        <div className="praxis-mentor-grid">
          <Reveal>
            <span className="praxis-eyebrow">AI Market Mentor</span>
            <h2 id="mentor-heading" style={sectionHeadingStyle}>
              Jema asks better questions.
            </h2>
            <p style={paragraphStyle}>
              Your mentor knows what you are working on, what you own, and what
              you have been struggling with. It will not tell you what to buy.
              It will help you reason through why you would.
            </p>
            <ul style={mentorListStyle}>
              <li style={mentorListItemStyle}>
                Explains concepts in plain language
              </li>
              <li style={mentorListItemStyle}>
                Challenges your reasoning, gently
              </li>
              <li style={mentorListItemStyle}>
                Recommends the next scenario to try
              </li>
            </ul>
            <p style={smallNoteStyle}>
              Educational guidance. Not investment advice.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <MentorChat />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function VirtualMoney() {
  return (
    <section aria-labelledby="money-heading" style={moneyBandStyle}>
      <div style={tintedInnerStyle}>
        <Reveal>
          <span className="praxis-eyebrow" style={{ color: "#15803d" }}>
            Virtual capital
          </span>
          <h2 id="money-heading" style={moneyHeadingStyle}>
            Practice money you choose.
          </h2>
          <p style={moneyBodyStyle}>
            Because you are not risking a shilling, you can experiment freely.
            Make a bad call. See what happens. Understand why. Try again.
          </p>

          <div style={conceptsStyle}>
            {CONCEPTS.map((concept, index) => (
              <Reveal key={concept.label} delay={(index % 3) as 0 | 1 | 2 | 3}>
                <ConceptRow
                  label={concept.label}
                  level={concept.level}
                  value={concept.value}
                  tone={concept.tone}
                />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section aria-labelledby="partners-heading" style={partnersSectionStyle}>
      <Reveal>
        <p id="partners-heading" style={partnersLeadStyle}>
          Practice with the companies you already know. All prices and events
          are simulated.
        </p>
      </Reveal>
      <PartnersMarquee />
    </section>
  );
}

function ConceptRow({
  label,
  level,
  value,
  tone,
}: {
  label: string;
  level: string;
  value: number;
  tone: "success" | "warning" | "danger";
}) {
  const colors = {
    success: { bg: "var(--color-success)", soft: "#dcfce7", fg: "#15803d" },
    warning: { bg: "#f59e0b", soft: "#fef3c7", fg: "#b45309" },
    danger: { bg: "var(--color-danger)", soft: "#fee2e2", fg: "#b91c1c" },
  }[tone];

  return (
    <div style={conceptRowStyle}>
      <div style={conceptHeaderStyle}>
        <span style={conceptLabelStyle}>{label}</span>
        <span
          style={{
            ...conceptLevelStyle,
            background: colors.soft,
            color: colors.fg,
          }}
        >
          {level}
        </span>
      </div>
      <div
        style={barTrackStyle}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${level}`}
      >
        <div
          className="praxis-progress-fill"
          style={{ ...barFillStyle, width: `${value}%`, background: colors.bg }}
        />
      </div>
    </div>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="cta-heading" style={finalSectionStyle}>
      <Reveal>
        <div style={finalCardStyle}>
          <h2 id="cta-heading" style={finalHeadingStyle}>
            Practice the market. Before you play the market.
          </h2>
          <p style={finalBodyStyle}>
            Create a free account and choose your starting virtual capital. No
            card. No brokerage. No risk.
          </p>
          <div style={finalCtaRowStyle}>
            <Link
              href="/register"
              className="praxis-landing-button"
              style={primaryCtaStyle}
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="praxis-landing-link"
              style={secondaryCtaStyle}
            >
              I already have one
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
function SiteFooter() {
  return (
    <footer style={footerStyle}>
      <div style={footerInnerStyle}>
        <div style={footerLeftStyle}>
          <span style={footerBrandStyle}>PRAXIS</span>
          <p style={footerDisclaimerStyle}>
            A practice environment for learning the market. No real money. No
            brokerage. Nothing on PRAXIS is financial advice.
          </p>
          <span style={footerCopyStyle}>&copy; 2026 PRAXIS</span>
        </div>
        <nav style={footerLinksStyle} aria-label="Legal">
          <Link href="/terms" style={footerLinkStyle}>
            Terms
          </Link>
          <Link href="/privacy" style={footerLinkStyle}>
            Privacy
          </Link>
          <a href="mailto:hello@praxis.example" style={footerLinkStyle}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
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
  position: "sticky",
  top: 0,
  zIndex: 20,
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

const heroSectionStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "72px 36px 80px",
};

const heroHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)",
  fontWeight: 600,
  letterSpacing: "-0.024em",
  lineHeight: 1.05,
  color: "var(--color-text)",
};

const heroSubStyle: CSSProperties = {
  margin: "22px 0 0",
  fontSize: "18px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "560px",
};

const ctaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "30px",
};

const primaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "52px",
  padding: "0 26px",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 500,
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  border: "1px solid var(--color-primary)",
};

const secondaryCtaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "52px",
  padding: "0 24px",
  background: "var(--color-surface)",
  color: "var(--color-text)",
  fontSize: "16px",
  fontWeight: 500,
  borderRadius: "var(--radius-sm)",
  textDecoration: "none",
  border: "1px solid var(--color-border-strong)",
};

const safetyLineStyle: CSSProperties = {
  margin: "18px 0 0",
  fontSize: "14px",
  color: "var(--color-text-muted)",
};

const partnersSectionStyle: CSSProperties = {
  background: "var(--color-surface)",
  paddingTop: "48px",
  paddingBottom: "16px",
};

const partnersLeadStyle: CSSProperties = {
  margin: 0,
  textAlign: "center",
  fontSize: "15px",
  color: "var(--color-text-muted)",
  padding: "0 36px",
};

const statementSectionStyle: CSSProperties = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "96px 36px 72px",
  textAlign: "center",
};

const statementHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2.4rem, 4.8vw, 3.6rem)",
  fontWeight: 600,
  letterSpacing: "-0.024em",
  lineHeight: 1.08,
  color: "var(--color-text)",
};

const statementSubStyle: CSSProperties = {
  margin: "26px auto 0",
  fontSize: "18px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "620px",
};

const sectionStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "72px 36px",
};

const sectionHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.8rem, 2.8vw, 2.3rem)",
  fontWeight: 600,
  letterSpacing: "-0.02em",
  lineHeight: 1.2,
  color: "var(--color-text)",
  maxWidth: "760px",
};

const paragraphStyle: CSSProperties = {
  margin: "16px 0 0",
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "640px",
};

const capabilityCardStyle: CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "24px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const capabilityRuleStyle: CSSProperties = {
  display: "block",
  width: "28px",
  height: "3px",
  borderRadius: "2px",
  marginBottom: "18px",
};

const capabilityTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "17px",
  fontWeight: 600,
  color: "var(--color-text)",
};

const capabilityBodyStyle: CSSProperties = {
  margin: "8px 0 0",
  fontSize: "15px",
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
};

const compareColMutedStyle: CSSProperties = {
  background: "var(--color-surface-muted)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: "28px",
  height: "100%",
};

const compareColActiveStyle: CSSProperties = {
  background: "var(--color-tint-blue-bg)",
  border: "1px solid #bfdbfe",
  borderRadius: "var(--radius-lg)",
  padding: "28px",
  height: "100%",
};

const compareTitleMutedStyle: CSSProperties = {
  margin: "0 0 20px",
  fontSize: "16px",
  fontWeight: 600,
  color: "var(--color-text-muted)",
};

const compareTitleActiveStyle: CSSProperties = {
  margin: "0 0 20px",
  fontSize: "16px",
  fontWeight: 600,
  color: "var(--color-tint-blue-fg)",
};

const compareListStyle: CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const compareRowMutedStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  fontSize: "15px",
  lineHeight: 1.5,
  color: "var(--color-text-muted)",
};

const compareRowActiveStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  fontSize: "15px",
  lineHeight: 1.5,
  color: "var(--color-text)",
  fontWeight: 500,
};

const compareMarkMutedStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  color: "var(--color-text-muted)",
  flexShrink: 0,
  marginTop: "2px",
  fontSize: "14px",
};

const compareMarkActiveStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  color: "#2563eb",
  flexShrink: 0,
  marginTop: "2px",
  fontSize: "14px",
  fontWeight: 700,
};

const tintedBandStyle: CSSProperties = {
  background: "var(--color-surface-muted)",
  borderTop: "1px solid var(--color-border)",
  borderBottom: "1px solid var(--color-border)",
};

const moneyBandStyle: CSSProperties = {
  background: "var(--color-tint-green-bg)",
  borderTop: "1px solid #bbf7d0",
  borderBottom: "1px solid #bbf7d0",
};

const tintedInnerStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "72px 36px",
};

const mentorListStyle: CSSProperties = {
  listStyle: "none",
  margin: "22px 0 0",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const mentorListItemStyle: CSSProperties = {
  position: "relative",
  paddingLeft: "22px",
  fontSize: "16px",
  color: "var(--color-text)",
};

const smallNoteStyle: CSSProperties = {
  margin: "22px 0 0",
  fontSize: "13px",
  color: "var(--color-text-muted)",
};

const moneyHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 600,
  letterSpacing: "-0.024em",
  lineHeight: 1.1,
  color: "var(--color-text)",
};

const moneyBodyStyle: CSSProperties = {
  margin: "18px 0 0",
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "640px",
};

const conceptsStyle: CSSProperties = {
  marginTop: "34px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  maxWidth: "640px",
};

const conceptRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const conceptHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

const conceptLabelStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 500,
  color: "var(--color-text)",
};

const conceptLevelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  padding: "4px 11px",
  borderRadius: "999px",
};

const barTrackStyle: CSSProperties = {
  height: "10px",
  borderRadius: "999px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  overflow: "hidden",
};

const barFillStyle: CSSProperties = {
  height: "100%",
  borderRadius: "999px",
};

const finalSectionStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "32px 36px 88px",
};

const finalCardStyle: CSSProperties = {
  background: "var(--color-tint-blue-bg)",
  border: "1px solid #bfdbfe",
  borderRadius: "var(--radius-lg)",
  padding: "56px 40px",
  textAlign: "center",
};

const finalHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)",
  fontWeight: 600,
  letterSpacing: "-0.022em",
  lineHeight: 1.2,
  color: "var(--color-text)",
};

const finalBodyStyle: CSSProperties = {
  margin: "16px auto 0",
  fontSize: "17px",
  lineHeight: 1.65,
  color: "var(--color-text-muted)",
  maxWidth: "580px",
};

const finalCtaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
  marginTop: "28px",
};

const footerStyle: CSSProperties = {
  borderTop: "1px solid var(--color-border)",
  background: "var(--color-surface)",
};

const footerInnerStyle: CSSProperties = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "48px 36px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "32px",
};

const footerLeftStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "480px",
};

const footerBrandStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: "var(--color-text)",
};

const footerDisclaimerStyle: CSSProperties = {
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.6,
  color: "var(--color-text-muted)",
};

const footerCopyStyle: CSSProperties = {
  fontSize: "12px",
  color: "var(--color-text-muted)",
};

const footerLinksStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "22px",
  alignItems: "center",
};

const footerLinkStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--color-text-muted)",
  textDecoration: "none",
};
