"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminModal from "@/components/admin/AdminModal";

type Reporter = { id: string; name: string; email: string };
type Target = {
  id: string;
  title?: string;
  body: string;
  author_name: string;
  user_id: string;
  post_id?: string;
};
type Report = {
  id: string;
  target_type: "post" | "reply";
  target_id: string;
  reason: string;
  note: string | null;
  created_at: string;
  reporter: Reporter | null;
  target: Target | null;
  target_missing: boolean;
};

type Filter = "open" | "dismissed" | "resolved";

type ModalState =
  | { kind: "none" }
  | { kind: "delete-post"; reportId: string; postId: string; authorName: string }
  | { kind: "delete-reply"; reportId: string; replyId: string; authorName: string }
  | { kind: "ban"; reportId: string; userId: string; authorName: string };

export default function AdminReportsPage() {
  const [filter, setFilter] = useState<Filter>("open");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ kind: "none" });

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reports?status=" + filter, {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) { setError("Could not load reports."); setReports([]); return; }
      const d = await res.json();
      setReports(d.reports ?? []);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { void load(); }, [load]);

  async function act(
    action: string,
    payload: Record<string, unknown>,
    id: string,
  ) {
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
        await load();
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <header className="praxis-adminpage-head">
        <span className="praxis-adminpage-kicker">Moderation</span>
        <h1 className="praxis-adminpage-title">Reports queue</h1>
        <p className="praxis-adminpage-sub">
          Content reported by users. Dismiss, remove, or ban the author.
        </p>
      </header>

      <div className="praxis-admin-bar">
        {(["open", "dismissed", "resolved"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className="praxis-admin-tab"
            data-active={filter === f}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button type="button" className="praxis-admin-btn" onClick={() => void load()}>
          Refresh
        </button>
      </div>

      {error ? <div className="praxis-admin-banner">{error}</div> : null}

      {loading ? (
        <div className="praxis-admin-empty">Loading…</div>
      ) : reports.length === 0 ? (
        <div className="praxis-admin-empty">No {filter} reports.</div>
      ) : (
        <div className="praxis-admin-card">
          <table className="praxis-admin-table">
            <thead>
              <tr>
                <th style={{ width: 130 }}>Reason</th>
                <th>Reported content</th>
                <th style={{ width: 180 }}>Reporter</th>
                <th style={{ width: 260 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const t = r.target;
                const isPost = r.target_type === "post";
                return (
                  <tr key={r.id}>
                    <td>
                      <span className="praxis-admin-pill praxis-admin-pill-reason">{r.reason}</span>
                    </td>
                    <td>
                      {r.target_missing ? (
                        <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                          ({r.target_type} already removed)
                        </span>
                      ) : t ? (
                        <>
                          {isPost && t.title ? (
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                          ) : null}
                          <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--color-text-muted)" }}>
                            {t.body.slice(0, 220)}
                            {t.body.length > 220 ? "…" : ""}
                          </div>
                          <div style={{ fontSize: 11.5, color: "var(--color-text-muted)", marginTop: 6 }}>
                            by {t.author_name} ·{" "}
                            <span className="praxis-admin-mono">{t.user_id.slice(0, 8)}</span>
                          </div>
                          {r.note ? (
                            <div style={{ fontSize: 11.5, color: "var(--color-text-muted)", marginTop: 6, fontStyle: "italic" }}>
                              Reporter note: {r.note}
                            </div>
                          ) : null}
                        </>
                      ) : null}
                    </td>
                    <td>
                      {r.reporter ? (
                        <>
                          <div style={{ fontSize: 12.5 }}>{r.reporter.name}</div>
                          <div className="praxis-admin-mono">{r.reporter.email}</div>
                        </>
                      ) : (
                        <span className="praxis-admin-mono">-</span>
                      )}
                    </td>
                    <td>
                      <div className="praxis-admin-actions">
                        {t && isPost ? (
                          <Link href={"/community/" + t.id} className="praxis-admin-btn" target="_blank">
                            Open
                          </Link>
                        ) : t && t.post_id ? (
                          <Link href={"/community/" + t.post_id} className="praxis-admin-btn" target="_blank">
                            Thread
                          </Link>
                        ) : null}

                        {filter === "open" ? (
                          <>
                            <button
                              type="button"
                              className="praxis-admin-btn"
                              disabled={busyId === r.id}
                              onClick={() => void act("dismiss-report", { reportId: r.id }, r.id)}
                            >
                              Dismiss
                            </button>
                            {t ? (
                              <button
                                type="button"
                                className="praxis-admin-btn praxis-admin-btn-danger"
                                disabled={busyId === r.id}
                                onClick={() =>
                                  setModal(
                                    isPost
                                      ? { kind: "delete-post", reportId: r.id, postId: t.id, authorName: t.author_name }
                                      : { kind: "delete-reply", reportId: r.id, replyId: t.id, authorName: t.author_name },
                                  )
                                }
                              >
                                Delete
                              </button>
                            ) : null}
                            {t ? (
                              <button
                                type="button"
                                className="praxis-admin-btn praxis-admin-btn-danger"
                                disabled={busyId === r.id}
                                onClick={() =>
                                  setModal({ kind: "ban", reportId: r.id, userId: t.user_id, authorName: t.author_name })
                                }
                              >
                                Ban
                              </button>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal
        open={modal.kind === "delete-post"}
        title="Delete this post?"
        description={
          modal.kind === "delete-post"
            ? `The post by ${modal.authorName} and all its replies, reactions, and reports will be removed. The author will be notified.`
            : undefined
        }
        tone="danger"
        submitLabel="Delete post"
        reasonField
        reasonLabel="Reason shown to the author"
        onCancel={() => setModal({ kind: "none" })}
        onSubmit={(p) => {
          if (modal.kind !== "delete-post") return;
          void act("delete-post", { postId: modal.postId, reason: p.reason }, modal.reportId);
        }}
      />

      <AdminModal
        open={modal.kind === "delete-reply"}
        title="Delete this reply?"
        description={
          modal.kind === "delete-reply"
            ? `The reply by ${modal.authorName} will be removed. The author will be notified.`
            : undefined
        }
        tone="danger"
        submitLabel="Delete reply"
        reasonField
        reasonLabel="Reason shown to the author"
        onCancel={() => setModal({ kind: "none" })}
        onSubmit={(p) => {
          if (modal.kind !== "delete-reply") return;
          void act("delete-reply", { replyId: modal.replyId, reason: p.reason }, modal.reportId);
        }}
      />

      <AdminModal
        open={modal.kind === "ban"}
        title="Ban this user?"
        description={
          modal.kind === "ban"
            ? `${modal.authorName} will be blocked from signing in and all their sessions will be revoked. They will be notified with your reason.`
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
          void act(
            "ban-user",
            { userId: modal.userId, durationDays: p.number, reason: p.reason },
            modal.reportId,
          );
        }}
      />
    </>
  );
}
