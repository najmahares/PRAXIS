"use client";

import Link from "next/link";

function Arrow({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M3 10 H16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M11 4.5 L16.5 10 L11 15.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TilePortfolio() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20 L3 10 M9 20 L9 4 M15 20 L15 14 M21 20 L21 8" />
    </svg>
  );
}

function TileJema() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6 a2 2 0 0 1 2 -2 h12 a2 2 0 0 1 2 2 v8 a2 2 0 0 1 -2 2 h-8 l-6 4 z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function TileMarket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17 L9 11 L13 15 L21 6" />
      <path d="M15 6 L21 6 L21 12" />
    </svg>
  );
}

export default function WelcomeCard({ firstName }: { firstName: string }) {
  return (
    <div className="praxis-home">
      <section className="praxis-home-hero">
        <div className="praxis-home-hero-content">
          <span className="praxis-home-hero-kicker">Welcome to PRAXIS</span>
          <h1 className="praxis-home-hero-title">Hi, {firstName}.</h1>
          <p className="praxis-home-hero-sub">
            The market rewards patience and clear thinking. This is where you build both.
          </p>
          <Link href="/learning" className="praxis-home-hero-cta">
            <span>Start Foundations</span>
            <Arrow size={20} />
          </Link>
        </div>
        <div className="praxis-home-hero-art" aria-hidden="true">
          <svg viewBox="0 0 320 220" fill="none">
            <path d="M20 180 L80 130 L140 150 L210 80 L280 55" stroke="rgba(255,255,255,0.55)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 200 L80 155 L140 172 L210 110 L280 90" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="80" cy="130" r="5" fill="#ffffff" />
            <circle cx="210" cy="80" r="5" fill="#ffffff" />
            <circle cx="280" cy="55" r="7" fill="#ffffff" />
          </svg>
        </div>
      </section>

      <section className="praxis-home-section">
        <header className="praxis-home-section-head">
          <h2 className="praxis-home-section-title">Get started</h2>
        </header>
        <div className="praxis-home-tiles">
          <Link href="/portfolio/setup" className="praxis-home-tile">
            <div className="praxis-home-tile-head">
              <span className="praxis-home-tile-icon"><TilePortfolio /></span>
              <span className="praxis-home-tile-arrow"><Arrow size={18} /></span>
            </div>
            <h3 className="praxis-home-tile-title">Set up a practice portfolio</h3>
            <p className="praxis-home-tile-sub">Pick your starting capital. Real NSE companies, real prices.</p>
          </Link>
          <Link href="/mentor" className="praxis-home-tile">
            <div className="praxis-home-tile-head">
              <span className="praxis-home-tile-icon"><TileJema /></span>
              <span className="praxis-home-tile-arrow"><Arrow size={18} /></span>
            </div>
            <h3 className="praxis-home-tile-title">Meet Jema</h3>
            <p className="praxis-home-tile-sub">Your AI mentor. Ask questions, get feedback on your decisions.</p>
          </Link>
          <Link href="/market" className="praxis-home-tile">
            <div className="praxis-home-tile-head">
              <span className="praxis-home-tile-icon"><TileMarket /></span>
              <span className="praxis-home-tile-arrow"><Arrow size={18} /></span>
            </div>
            <h3 className="praxis-home-tile-title">Browse the Market</h3>
            <p className="praxis-home-tile-sub">See real NSE companies and how their prices move.</p>
          </Link>
        </div>
      </section>

      <section className="praxis-home-section">
        <header className="praxis-home-section-head">
          <h2 className="praxis-home-section-title">How PRAXIS works</h2>
        </header>
        <div className="praxis-home-steps">
          <div className="praxis-home-step">
            <span className="praxis-home-step-num">01</span>
            <h3 className="praxis-home-step-title">Learn</h3>
            <p className="praxis-home-step-sub">Five lessons on the fundamentals. About two hours.</p>
          </div>
          <div className="praxis-home-step">
            <span className="praxis-home-step-num">02</span>
            <h3 className="praxis-home-step-title">Practice</h3>
            <p className="praxis-home-step-sub">Build a practice portfolio with real companies.</p>
          </div>
          <div className="praxis-home-step">
            <span className="praxis-home-step-num">03</span>
            <h3 className="praxis-home-step-title">Reflect</h3>
            <p className="praxis-home-step-sub">See what your decisions did. Learn from them.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
