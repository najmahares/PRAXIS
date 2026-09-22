"use client";

import { useCallback, useEffect, useState } from "react";
import Arrow from "@/components/ui/Arrow";

type Event = {
  id: string;
  user_id: string | null;
  user_email: string | null;
  event_type: string;
  severity: "info" | "warn" | "critical";
  ip: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown> | null;
  retain_forever: boolean;
  created_at: string;
};

type Summary = {
  total_24h: number;
  critical_24h: number;
  warn_24h: number;
  failed_logins_7d: number;
  signups_7d: number;
  top_types_7d: { type: string; count: number }[];
};

const PER_PAGE = 50;

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [severity, setSeverity] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [debouncedUser, setDebouncedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedUser(userQuery);
      setPage(1);
    }, 300);
    return () => window.clearTimeout(id);
  }, [userQuery]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        perPage: String(PER_PAGE),
      });
      if (severity) params.set("severity", severity);
      if (typeFilter) params.set("type", typeFilter);
      if (debouncedUser) params.set("user", debouncedUser);

      const [evRes, sumRes] = await Promise.all([
        fetch("/api/admin/events?" + params.toString(), { credentials: "same-origin", cache: "no-store" }),
        fetch("/api/admin/events/summary", { credentials: "same-origin", cache: "no-store" }),
      ]);
      if (!evRes.ok) { setError("Could not load events."); return; }
      const d = await evRes.json();
      setEvents(d.events ?? []);
      setTotal(d.total ?? 0);
      setTotalPages(d.totalPages ?? 1);
      if (sumRes.ok) {
        const s = await sumRes.json();
        setSummary(s.summary);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [page, severity, typeFilter, debouncedUser]);

  useEffect(() => { void load(); }, [load]);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <>
      <header className="praxis-adminpage-head">
        <span className="praxis-adminpage-kicker">Security</span>
        <h1 className="praxis-adminpage-title">Platform events</h1>
        <p className="praxis-adminpage-sub">
          Authentication, security, and admin activity. Retained by severity - critical 3y, warn 1y, info 90d.
        </p>
      </header>

      {summary ? (
        <div className="praxis-admin-hero" style={{ marginBottom: 18 }}>
          <div className="praxis-admin-hero-cell">
            <span className="praxis-admin-hero-label">Events · 24h</span>
            <span className="praxis-admin-hero-value">{summary.total_24h.toLocaleString()}</span>
            <span className="praxis-admin-hero-sub">{summary.signups_7d} signups in 7d</span>
          </div>
          <div className={"praxis-admin-hero-cell" + (summary.critical_24h > 0 ? " is-alert" : "")}>
            <span className="praxis-admin-hero-label">Critical · 24h</span>
            <span className="praxis-admin-hero-value">{summary.critical_24h.toLocaleString()}</span>
            <span className="praxis-admin-hero-sub">{summary.warn_24h} warnings</span>
          </div>
          <div className={"praxis-admin-hero-cell" + (summary.failed_logins_7d > 10 ? " is-alert" : "")}>
            <span className="praxis-admin-hero-label">Failed logins · 7d</span>
            <span className="praxis-admin-hero-value">{summary.failed_logins_7d.toLocaleString()}</span>
            <span className="praxis-admin-hero-sub">
              {summary.failed_logins_7d > 10 ? "watch for brute force" : "normal range"}
            </span>
          </div>
        </div>
      ) : null}

      <div className="praxis-admin-bar">
        <span style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>
          {total.toLocaleString()} event{total === 1 ? "" : "s"}
        </span>
        <select
          value={severity}
          onChange={(e) => { setSeverity(e.target.value); setPage(1); }}
          className="praxis-admin-select"
        >
          <option value="">All severities</option>
          <option value="critical">Critical</option>
          <option value="warn">Warning</option>
          <option value="info">Info</option>
        </select>
        <input
          type="text"
          placeholder="Filter by type (e.g. auth.login)"
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
          className="praxis-admin-select"
          style={{ minWidth: 220 }}
        />
        <div className="praxis-admin-search">
          <input
            type="search"
            placeholder="User email or id…"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
          />
        </div>
      </div>

      {error ? <div className="praxis-admin-banner">{error}</div> : null}

      {loading ? (
        <div className="praxis-admin-empty">Loading events…</div>
      ) : events.length === 0 ? (
        <div className="praxis-admin-empty">No events match these filters.</div>
      ) : (
        <>
          <div className="praxis-admin-card">
            <table className="praxis-admin-table">
              <thead>
                <tr>
                  <th style={{ width: 160 }}>When</th>
                  <th style={{ width: 130 }}>Severity</th>
                  <th style={{ width: 200 }}>Event</th>
                  <th style={{ width: 220 }}>User</th>
                  <th>Metadata</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => {
                  const isOpen = expanded.has(e.id);
                  return (
                    <tr key={e.id}>
                      <td className="praxis-admin-mono" style={{ fontSize: 12 }}>
                        {new Date(e.created_at).toLocaleString("en-KE")}
                      </td>
                      <td>
                        <span className={"praxis-admin-pill praxis-admin-pill-sev-" + e.severity}>
                          {e.severity}
                        </span>
                      </td>
                      <td>
                        <span className="praxis-admin-event-type">{e.event_type}</span>
                        {e.retain_forever ? (
                          <span className="praxis-admin-event-lock" title="Retained forever">🔒</span>
                        ) : null}
                      </td>
                      <td>
                        {e.user_email ? (
                          <>
                            <div style={{ fontSize: 12.5 }}>{e.user_email}</div>
                            {e.user_id ? (
                              <div className="praxis-admin-mono" style={{ fontSize: 10.5 }}>
                                {e.user_id.slice(0, 8)}
                              </div>
                            ) : null}
                          </>
                        ) : e.user_id ? (
                          <span className="praxis-admin-mono">{e.user_id.slice(0, 12)}</span>
                        ) : (
                          <span className="praxis-admin-mono">-</span>
                        )}
                        {e.ip ? (
                          <div className="praxis-admin-mono" style={{ fontSize: 10.5, marginTop: 4 }}>
                            {e.ip}
                          </div>
                        ) : null}
                      </td>
                      <td>
                        {e.metadata && Object.keys(e.metadata).length > 0 ? (
                          <>
                            <button
                              type="button"
                              className="praxis-admin-btn"
                              style={{ padding: "4px 10px", fontSize: 11.5 }}
                              onClick={() => toggle(e.id)}
                            >
                              {isOpen ? "Hide" : "Show"}
                            </button>
                            {isOpen ? (
                              <pre className="praxis-admin-json">
                                {JSON.stringify(e.metadata, null, 2)}
                              </pre>
                            ) : null}
                          </>
                        ) : (
                          <span className="praxis-admin-mono">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="praxis-admin-pagination">
            <button
              type="button"
              className="praxis-admin-btn"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Arrow size={14} direction="left" /> Previous
            </button>
            <span className="praxis-admin-pagination-info">
              Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              type="button"
              className="praxis-admin-btn"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next <Arrow size={14} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
