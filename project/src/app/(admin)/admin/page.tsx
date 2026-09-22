"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "@/components/ui/Arrow";

type Metrics = {
  total_users: number;
  signups_7d: number;
  open_reports: number;
  total_posts: number;
  total_replies: number;
  total_memories: number;
  active_sessions: number;
  posts_7d: number;
  active_24h: number;
};

type SignupDay = { date: string; label: string; count: number };
type ReasonRow = { reason: string; count: number };
type RecentAction = {
  id: string;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: string | null;
  created_at: string;
};

export default function AdminOverviewPage() {
  const [m, setM] = useState<Metrics | null>(null);
  const [series, setSeries] = useState<SignupDay[]>([]);
  const [reasons, setReasons] = useState<ReasonRow[]>([]);
  const [recent, setRecent] = useState<RecentAction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/metrics", { credentials: "same-origin", cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("failed");
        const d = await r.json();
        setM(d.metrics);
        setSeries(d.signupSeries ?? []);
        setReasons(d.reportReasons ?? []);
        setRecent(d.recentActions ?? []);
      })
      .catch(() => setError("Could not load metrics."));
  }, []);

  if (error) return <div className="praxis-admin-banner">{error}</div>;
  if (!m) return <div className="praxis-admin-empty">Loading dashboard…</div>;

  const maxSignup = Math.max(1, ...series.map(s => s.count));
  const maxReason = Math.max(1, ...reasons.map(r => r.count));
  const totalActivity = m.total_posts + m.total_replies + m.total_memories;

  return (
    <>
      <header className="praxis-adminpage-head">
        <span className="praxis-adminpage-kicker">Overview</span>
        <h1 className="praxis-adminpage-title">Console</h1>
        <p className="praxis-adminpage-sub">
          Live signals across the platform. Report queue, user activity, and platform health.
        </p>
      </header>

      
      <div className="praxis-admin-hero">
        <div className="praxis-admin-hero-cell">
          <span className="praxis-admin-hero-label">Active last 24h</span>
          <span className="praxis-admin-hero-value">{m.active_24h.toLocaleString()}</span>
          <span className="praxis-admin-hero-sub">of {m.total_users} users</span>
        </div>
        <div className={"praxis-admin-hero-cell" + (m.open_reports > 0 ? " is-alert" : "")}>
          <span className="praxis-admin-hero-label">Open reports</span>
          <span className="praxis-admin-hero-value">{m.open_reports.toLocaleString()}</span>
          <span className="praxis-admin-hero-sub">
            {m.open_reports === 0 ? "queue is clear" : "needs review"}
          </span>
        </div>
        <div className="praxis-admin-hero-cell">
          <span className="praxis-admin-hero-label">Live sessions</span>
          <span className="praxis-admin-hero-value">{m.active_sessions.toLocaleString()}</span>
          <span className="praxis-admin-hero-sub">right now</span>
        </div>
      </div>

      
      <div className="praxis-admin-split">
        <div className="praxis-admin-card">
          <div className="praxis-admin-card-head">
            <div>
              <h2 className="praxis-admin-card-title">Signups · last 14 days</h2>
              <p className="praxis-admin-card-sub">Daily new accounts.</p>
            </div>
            <span className="praxis-admin-chip">{m.signups_7d} in 7d</span>
          </div>
          <div className="praxis-admin-sparkwrap">
            <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="praxis-admin-spark">
              {series.map((d, i) => {
                const h = (d.count / maxSignup) * 76;
                const x = i * (400 / series.length) + 6;
                const w = 400 / series.length - 12;
                return (
                  <g key={d.date}>
                    <rect
                      x={x}
                      y={86 - h}
                      width={w}
                      height={h}
                      rx={3}
                      fill="url(#signupGrad)"
                    />
                    <title>{d.label}: {d.count}</title>
                  </g>
                );
              })}
              <defs>
                <linearGradient id="signupGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1e40af" stopOpacity="0.55" />
                </linearGradient>
              </defs>
            </svg>
            <div className="praxis-admin-sparklabels">
              <span>{series[0]?.label ?? ""}</span>
              <span>today</span>
            </div>
          </div>
        </div>

        <div className="praxis-admin-card">
          <div className="praxis-admin-card-head">
            <div>
              <h2 className="praxis-admin-card-title">Report reasons</h2>
              <p className="praxis-admin-card-sub">Last 14 days · {reasons.reduce((a, r) => a + r.count, 0)} reports</p>
            </div>
          </div>
          {reasons.length === 0 ? (
            <div style={{ padding: "32px 22px", textAlign: "center", color: "var(--color-text-muted)", fontSize: 13 }}>
              No reports in the last 14 days. Nice.
            </div>
          ) : (
            <ul className="praxis-admin-reasons">
              {reasons.map((r) => (
                <li key={r.reason} className="praxis-admin-reason">
                  <span className="praxis-admin-reason-label">{r.reason}</span>
                  <div className="praxis-admin-reason-bar">
                    <div
                      className="praxis-admin-reason-fill"
                      style={{ width: `${(r.count / maxReason) * 100}%` }}
                    />
                  </div>
                  <span className="praxis-admin-reason-count">{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      
      <div className="praxis-admin-split">
        <div className="praxis-admin-card">
          <div className="praxis-admin-card-head">
            <div>
              <h2 className="praxis-admin-card-title">Platform content</h2>
              <p className="praxis-admin-card-sub">{totalActivity.toLocaleString()} objects total</p>
            </div>
          </div>
          <div className="praxis-admin-content-grid">
            <StatCell label="Posts" value={m.total_posts} />
            <StatCell label="Replies" value={m.total_replies} />
            <StatCell label="Memories" value={m.total_memories} />
            <StatCell label="Posts (7d)" value={m.posts_7d} />
          </div>
        </div>

        <div className="praxis-admin-card">
          <div className="praxis-admin-card-head">
            <div>
              <h2 className="praxis-admin-card-title">Recent admin actions</h2>
              <p className="praxis-admin-card-sub">Latest 6 events.</p>
            </div>
            <Link href="/admin/audit" className="praxis-admin-chip praxis-admin-chip-link">
              See all <Arrow size={14} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <div style={{ padding: "24px 22px", textAlign: "center", color: "var(--color-text-muted)", fontSize: 13 }}>
              No admin actions yet.
            </div>
          ) : (
            <ul className="praxis-admin-recent">
              {recent.map((a) => (
                <li key={a.id} className="praxis-admin-recent-row">
                  <span className="praxis-admin-recent-dot" />
                  <div className="praxis-admin-recent-body">
                    <span className="praxis-admin-recent-title">
                      <strong>{a.admin_name}</strong> · {a.action}
                    </span>
                    <span className="praxis-admin-recent-sub">
                      {a.target_type}{a.target_id ? ":" + a.target_id.slice(0, 8) : ""} ·{" "}
                      {timeAgo(a.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      
      <div className="praxis-admin-card">
        <div className="praxis-admin-card-head">
          <div>
            <h2 className="praxis-admin-card-title">Jump to</h2>
            <p className="praxis-admin-card-sub">The tools you use most.</p>
          </div>
        </div>
        <div style={{ padding: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/admin/reports" className="praxis-admin-btn praxis-admin-btn-primary">
            Review reports {m.open_reports > 0 ? `(${m.open_reports})` : ""}
          </Link>
          <Link href="/admin/users" className="praxis-admin-btn">
            Find a user
          </Link>
          <Link href="/admin/audit" className="praxis-admin-btn">
            Audit log
          </Link>
        </div>
      </div>
    </>
  );
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="praxis-admin-contentcell">
      <span className="praxis-admin-contentcell-label">{label}</span>
      <span className="praxis-admin-contentcell-value">{value.toLocaleString()}</span>
    </div>
  );
}

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  return Math.floor(hrs / 24) + "d ago";
}
