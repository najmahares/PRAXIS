"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import "../community.css";
import Arrow from "@/components/ui/Arrow";

type Reporter = { id: string; name: string; email: string };

type PostTarget = {
  id: string;
  title: string;
  body: string;
  author_name: string;
  user_id: string;
  flagged: boolean;
  flag_reason: string | null;
  created_at: string;
};

type ReplyTarget = {
  id: string;
  body: string;
  author_name: string;
  user_id: string;
  post_id: string;
  created_at: string;
};

type Report = {
  id: string;
  reporter_user_id: string;
  target_type: "post" | "reply";
  target_id: string;
  reason: string;
  note: string | null;
  status: string;
  created_at: string;
  reporter: Reporter | null;
  target: PostTarget | ReplyTarget | null;
  target_missing: boolean;
};

type Filter = "open" | "dismissed" | "resolved";

export default function ModerationPage() {
  const [filter, setFilter] = useState<Filter>("open");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reports?status=" + filter, {
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) {
        setError(res.status === 403 ? "Not authorised." : "Could not load reports.");
        setReports([]);
        return;
      }
      const data = await res.json();
      setReports(data.reports ?? []);
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function act(action: string, payload: Record<string, unknown>, idForBusy: string) {
    setBusyId(idForBusy);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ action, ...payload }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Action failed.");
      } else {
        await load();
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="praxis-community">
      <Link href="/community" className="praxis-community-back">
        <Arrow size={14} direction="left" />
        <span>Back to community</span>
      </Link>

      <header className="praxis-community-header">
        <div>
          <span className="praxis-community-kicker">Moderation</span>
          <h1 className="praxis-community-title">Reports queue</h1>
          <p className="praxis-community-sub">
            Review reported content. Dismiss or remove.
          </p>
        </div>
      </header>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["open", "dismissed", "resolved"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid",
              borderColor: filter === f ? "#1e40af" : "var(--color-border)",
              background: filter === f ? "#1e40af" : "transparent",
              color: filter === f ? "#ffffff" : "var(--color-text)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => void load()}
          style={{
            marginLeft: "auto",
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            background: "transparent",
            color: "var(--color-text)",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div
          role="alert"
          style={{
            padding: 12,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: 8,
            color: "#b91c1c",
            fontSize: 13,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="praxis-community-empty-body">Loading…</p>
      ) : reports.length === 0 ? (
        <p className="praxis-community-empty-body">
          No {filter} reports.
        </p>
      ) : (
        <ul className="praxis-community-feed">
          {reports.map((r) => {
            const target = r.target;
            const isPost = r.target_type === "post";
            const post = isPost ? (target as PostTarget) : null;
            const reply = !isPost ? (target as ReplyTarget) : null;

            return (
              <li key={r.id} className="praxis-community-post">
                <div className="praxis-community-post-inner">
                  <div className="praxis-community-post-head">
                    <span className="praxis-community-post-author">
                      {r.reporter?.name ?? "Unknown reporter"}
                    </span>
                    <span className="praxis-community-post-time">
                      {new Date(r.created_at).toLocaleString("en-KE")}
                    </span>
                    <span className="praxis-community-post-kind is-win">
                      {r.reason}
                    </span>
                  </div>

                  {r.note ? (
                    <p style={{ fontSize: 12.5, color: "var(--color-text-muted)", margin: "8px 0" }}>
                      Note from reporter: {r.note}
                    </p>
                  ) : null}

                  {r.target_missing ? (
                    <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
                      The reported {r.target_type} no longer exists.
                    </p>
                  ) : isPost && post ? (
                    <>
                      <h3 className="praxis-community-post-title">{post.title}</h3>
                      <p className="praxis-community-post-body">
                        {post.body.slice(0, 400)}
                        {post.body.length > 400 ? "…" : ""}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                        By {post.author_name}
                      </p>
                    </>
                  ) : reply ? (
                    <>
                      <p className="praxis-community-post-body">{reply.body.slice(0, 400)}</p>
                      <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
                        Reply by {reply.author_name}
                      </p>
                    </>
                  ) : null}

                  <div className="praxis-community-post-foot" style={{ flexWrap: "wrap", gap: 8 }}>
                    {isPost && post ? (
                      <Link
                        href={"/community/" + post.id}
                        className="praxis-community-post-stat-link"
                      >
                        Open post
                      </Link>
                    ) : reply ? (
                      <Link
                        href={"/community/" + reply.post_id}
                        className="praxis-community-post-stat-link"
                      >
                        Open thread
                      </Link>
                    ) : null}

                    {filter === "open" ? (
                      <>
                        <button
                          type="button"
                          disabled={busyId === r.id}
                          onClick={() => void act("dismiss-report", { reportId: r.id }, r.id)}
                          style={btnStyle("ghost")}
                        >
                          Dismiss
                        </button>
                        {target && !r.target_missing ? (
                          <>
                            <button
                              type="button"
                              disabled={busyId === r.id}
                              onClick={() =>
                                void act(
                                  isPost ? "delete-post" : "delete-reply",
                                  isPost ? { postId: target.id } : { replyId: target.id },
                                  r.id,
                                )
                              }
                              style={btnStyle("danger")}
                            >
                              Delete {isPost ? "post" : "reply"}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === r.id}
                              onClick={() => {
                                const daysStr = window.prompt(
                                  "Ban duration (days, default 30):",
                                  "30",
                                );
                                if (daysStr === null) return;
                                const days = Math.max(1, parseInt(daysStr, 10) || 30);
                                void act(
                                  "ban-user",
                                  { userId: target.user_id, durationDays: days },
                                  r.id,
                                );
                              }}
                              style={btnStyle("danger")}
                            >
                              Ban author
                            </button>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function btnStyle(kind: "ghost" | "danger"): React.CSSProperties {
  if (kind === "danger") {
    return {
      padding: "6px 14px",
      borderRadius: 8,
      border: "1px solid #fecaca",
      background: "#fef2f2",
      color: "#b91c1c",
      fontSize: 12.5,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
    };
  }
  return {
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid var(--color-border)",
    background: "transparent",
    color: "var(--color-text)",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  };
}
