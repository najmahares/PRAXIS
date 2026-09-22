"use client";

import { useEffect, useState } from "react";

type Action = {
  id: string;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: string | null;
  payload: Record<string, unknown> | null;
  created_at: string;
};

export default function AdminAuditPage() {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/audit", { credentials: "same-origin", cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("failed");
        const d = await r.json();
        setActions(d.actions ?? []);
      })
      .catch(() => setError("Could not load audit log."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="praxis-adminpage-head">
        <span className="praxis-adminpage-kicker">History</span>
        <h1 className="praxis-adminpage-title">Audit log</h1>
        <p className="praxis-adminpage-sub">
          Every admin action - who, what, when, on whom.
        </p>
      </header>

      {error ? <div className="praxis-admin-banner">{error}</div> : null}

      {loading ? (
        <div className="praxis-admin-empty">Loading…</div>
      ) : actions.length === 0 ? (
        <div className="praxis-admin-empty">No admin actions yet.</div>
      ) : (
        <div className="praxis-admin-card">
          <table className="praxis-admin-table">
            <thead>
              <tr>
                <th style={{ width: 180 }}>When</th>
                <th style={{ width: 160 }}>Admin</th>
                <th style={{ width: 180 }}>Action</th>
                <th>Target</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((a) => (
                <tr key={a.id}>
                  <td className="praxis-admin-mono" style={{ fontSize: 12 }}>
                    {new Date(a.created_at).toLocaleString("en-KE")}
                  </td>
                  <td>{a.admin_name}</td>
                  <td>
                    <span className="praxis-admin-pill praxis-admin-pill-reason">{a.action}</span>
                  </td>
                  <td>
                    <span className="praxis-admin-mono">
                      {a.target_type}
                      {a.target_id ? ":" + a.target_id.slice(0, 8) : ""}
                    </span>
                    {a.payload && Object.keys(a.payload).length > 0 ? (
                      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }} className="praxis-admin-mono">
                        {JSON.stringify(a.payload)}
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
