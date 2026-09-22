"use client";

import { useCallback, useEffect, useState } from "react";
import AdminModal from "@/components/admin/AdminModal";
import Arrow from "@/components/ui/Arrow";

type UserRow = {
  id: string;
  email: string;
  name: string;
  created_at: string | null;
  last_sign_in_at: string | null;
  banned_until: string | null;
  posts: number;
  memories: number;
  active_sessions: number;
};

type ModalState =
  | { kind: "none" }
  | { kind: "ban"; userId: string; email: string; name: string }
  | { kind: "kill"; userId: string; email: string; name: string };

const PER_PAGE = 25;

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });

  
  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(query);
      setPage(1);
    }, 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const load = useCallback(async (q: string, p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/users?q=${encodeURIComponent(q)}&page=${p}&perPage=${PER_PAGE}`,
        { credentials: "same-origin", cache: "no-store" },
      );
      if (!res.ok) { setError("Could not load users."); return; }
      const d = await res.json();
      setUsers(d.users ?? []);
      setTotal(d.total ?? 0);
      setTotalPages(d.totalPages ?? 1);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(debouncedQ, page);
  }, [debouncedQ, page, load]);

  async function act(action: string, payload: Record<string, unknown>, id: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action, ...payload }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Action failed.");
      } else {
        setModal({ kind: "none" });
        await load(debouncedQ, page);
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusyId(null);
    }
  }

  const fromIdx = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const toIdx = Math.min(page * PER_PAGE, total);

  return (
    <>
      <header className="praxis-adminpage-head">
        <span className="praxis-adminpage-kicker">Directory</span>
        <h1 className="praxis-adminpage-title">Users</h1>
        <p className="praxis-adminpage-sub">
          Search by email or name. Ban, unban, or revoke sessions.
        </p>
      </header>

      <div className="praxis-admin-bar">
        <span style={{ fontSize: 12.5, color: "var(--color-text-muted)" }}>
          {total === 0 ? "0 users" : `${fromIdx}-${toIdx} of ${total}`}
        </span>
        <div className="praxis-admin-search">
          <input
            type="search"
            placeholder="Search email or name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {error ? <div className="praxis-admin-banner">{error}</div> : null}

      {loading ? (
        <div className="praxis-admin-empty">Loading…</div>
      ) : users.length === 0 ? (
        <div className="praxis-admin-empty">
          {debouncedQ ? "No users match your search." : "No users yet."}
        </div>
      ) : (
        <>
          <div className="praxis-admin-card">
            <table className="praxis-admin-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th style={{ width: 160 }}>Joined</th>
                  <th style={{ width: 200 }}>Activity</th>
                  <th style={{ width: 110 }}>Status</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const banned = u.banned_until && new Date(u.banned_until).getTime() > Date.now();
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{u.name || "-"}</div>
                        <div className="praxis-admin-mono">{u.email}</div>
                        <div className="praxis-admin-mono" style={{ fontSize: 10.5 }}>{u.id.slice(0, 8)}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: 12.5 }}>
                          {u.created_at ? new Date(u.created_at).toLocaleDateString("en-KE") : "-"}
                        </div>
                        <div className="praxis-admin-mono" style={{ fontSize: 10.5 }}>
                          last {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString("en-KE") : "never"}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 12.5 }}>
                          {u.posts} posts · {u.memories} memories
                        </div>
                        <div className="praxis-admin-mono" style={{ fontSize: 10.5 }}>
                          {u.active_sessions} session{u.active_sessions === 1 ? "" : "s"}
                        </div>
                      </td>
                      <td>
                        {banned ? (
                          <span className="praxis-admin-pill praxis-admin-pill-danger">Banned</span>
                        ) : (
                          <span className="praxis-admin-pill praxis-admin-pill-success">Active</span>
                        )}
                      </td>
                      <td>
                        <div className="praxis-admin-actions">
                          {banned ? (
                            <button
                              type="button"
                              className="praxis-admin-btn"
                              disabled={busyId === u.id}
                              onClick={() => void act("unban-user", { userId: u.id }, u.id)}
                            >
                              Unban
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="praxis-admin-btn praxis-admin-btn-danger"
                              disabled={busyId === u.id}
                              onClick={() =>
                                setModal({ kind: "ban", userId: u.id, email: u.email, name: u.name || u.email })
                              }
                            >
                              Ban
                            </button>
                          )}
                          <button
                            type="button"
                            className="praxis-admin-btn"
                            disabled={busyId === u.id || u.active_sessions === 0}
                            onClick={() =>
                              setModal({ kind: "kill", userId: u.id, email: u.email, name: u.name || u.email })
                            }
                          >
                            Kill
                          </button>
                        </div>
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

      <AdminModal
        open={modal.kind === "ban"}
        title="Ban this user?"
        description={
          modal.kind === "ban"
            ? `${modal.name} will be blocked from signing in and all their sessions will be revoked. They will be notified with your reason.`
            : undefined
        }
        tone="danger"
        submitLabel="Ban user"
        reasonField
        reasonLabel="Reason shown to the user"
        numberField
        numberLabel="Ban duration (days)"
        numberDefault={30}
        onCancel={() => setModal({ kind: "none" })}
        onSubmit={(p) => {
          if (modal.kind !== "ban") return;
          void act("ban-user", { userId: modal.userId, durationDays: p.number, reason: p.reason }, modal.userId);
        }}
      />

      <AdminModal
        open={modal.kind === "kill"}
        title="Sign this user out everywhere?"
        description={
          modal.kind === "kill"
            ? `All active sessions for ${modal.name} will be revoked. They will be notified.`
            : undefined
        }
        submitLabel="Revoke sessions"
        onCancel={() => setModal({ kind: "none" })}
        onSubmit={() => {
          if (modal.kind !== "kill") return;
          void act("kill-sessions", { userId: modal.userId }, modal.userId);
        }}
      />
    </>
  );
}
