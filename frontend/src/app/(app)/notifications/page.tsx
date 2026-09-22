"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { getNotifications, markAllAsRead, markAsRead } from "@/lib/notificationsApi";
import type { AppNotification, NotificationKind } from "@/lib/notificationsMock";
import "./notifications.css";

type Filter = "all" | NotificationKind;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "practice", label: "Practice" },
  { key: "achievement", label: "Achievements" },
  { key: "system", label: "System" },
];

export default function NotificationsPage() {
  const [items, setItems] = useState<AppNotification[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [unreadOnly, setUnreadOnly] = useState(false);

  useEffect(() => {
    let active = true;
    getNotifications().then((data) => {
      if (!active) return;
      setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const unreadCount = useMemo(
    () => (items ?? []).filter((n) => !n.read).length,
    [items]
  );

  const visible = useMemo(() => {
    if (!items) return [];
    return items.filter((n) => {
      if (filter !== "all" && n.kind !== filter) return false;
      if (unreadOnly && n.read) return false;
      return true;
    });
  }, [items, filter, unreadOnly]);

  async function handleMarkAllRead() {
    if (!items) return;
    await markAllAsRead();
    setItems(items.map((n) => ({ ...n, read: true })));
  }

  return (
    <div>
      <nav aria-label="Breadcrumb" style={breadcrumbStyle}>
        <span style={crumbMutedStyle}>Home</span>
        <span style={crumbDividerStyle} aria-hidden="true">/</span>
        <span style={crumbCurrentStyle} aria-current="page">Notifications</span>
      </nav>

      <header style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Notifications</h1>
          <p style={subtitleStyle}>Stay up to date with your practice and progress.</p>
        </div>
        <button
          type="button"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          style={unreadCount === 0 ? disabledLinkStyle : linkButtonStyle}
        >
          Mark all as read
        </button>
      </header>

      <div className="praxis-notif-layout" style={{ marginTop: 24 }}>
        <section className="praxis-notif-card" aria-label="Notifications list">
          <div className="praxis-notif-tabrow" role="tablist" aria-label="Notification filters">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className="praxis-notif-tab"
              >
                {f.label}
              </button>
            ))}
          </div>

          <div style={unreadBarStyle}>
            <label style={unreadLabelStyle}>
              <input
                type="checkbox"
                checked={unreadOnly}
                onChange={(event) => setUnreadOnly(event.target.checked)}
              />
              Unread only
            </label>
          </div>

          {items === null ? (
            <p style={emptyStyle}>Loading notifications…</p>
          ) : visible.length === 0 ? (
            <div style={emptyStateStyle}>
              <p style={emptyTitleStyle}>Nothing here yet</p>
              <p style={emptyBodyStyle}>
                {unreadOnly
                  ? "You have read everything in this filter."
                  : "Notifications for this filter will appear as you practice."}
              </p>
            </div>
          ) : (
            <ul style={listStyle}>
              {visible.map((n) => (
                <li key={n.id}>
                  <Link
                    href={n.href ?? "/notifications"}
                    className="praxis-notif-item"
                    aria-label={n.title + ". " + n.body}
                    onClick={() => {
                      if (!n.read) {
                        void markAsRead(n.id);
                        setItems((prev) =>
                          prev
                            ? prev.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x
                              )
                            : prev
                        );
                      }
                    }}
                  >
                    <span
                      style={n.read ? dotReadStyle : dotUnreadStyle}
                      aria-hidden="true"
                    />
                    <div style={itemBodyStyle}>
                      <span style={itemTitleStyle}>{n.title}</span>
                      <span style={itemSubtitleStyle}>{n.body}</span>
                    </div>
                    <span style={itemWhenStyle}>{relative(n.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside style={rhythmCardStyle} aria-label="Your notification rhythm">
          <h2 style={rhythmTitleStyle}>Your notification rhythm</h2>
          <p style={rhythmBigStyle}>
            {unreadCount} {unreadCount === 1 ? "update" : "updates"}
          </p>
          <p style={rhythmBodyStyle}>
            {unreadCount === 0
              ? "You are all caught up."
              : "You are getting useful reminders without the noise."}
          </p>
          <Link href="/settings/notifications" style={rhythmLinkStyle}>
            View notification settings
          </Link>
        </aside>
      </div>
    </div>
  );
}

function relative(ts: number): string {
  const ms = Date.now() - ts;
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return mins + "m ago";
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + "h ago";
  const days = Math.floor(hrs / 24);
  if (days < 30) return days + "d ago";
  return Math.floor(days / 30) + "mo ago";
}

const breadcrumbStyle: CSSProperties = {
  display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 12,
};
const crumbMutedStyle: CSSProperties = { color: "var(--color-text-muted)" };
const crumbDividerStyle: CSSProperties = { color: "var(--color-border-strong)" };
const crumbCurrentStyle: CSSProperties = { color: "var(--color-text)", fontWeight: 500 };

const headerStyle: CSSProperties = {
  display: "flex", alignItems: "flex-end", justifyContent: "space-between",
  gap: 16, flexWrap: "wrap",
};

const titleStyle: CSSProperties = {
  margin: 0, fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em",
  color: "var(--color-text)",
};

const subtitleStyle: CSSProperties = {
  margin: "6px 0 0", fontSize: 15, color: "var(--color-text-muted)",
};

const linkButtonStyle: CSSProperties = {
  background: "transparent", border: "none", padding: 0, fontSize: 14,
  fontWeight: 500, color: "var(--color-primary)", cursor: "pointer", textDecoration: "none",
};

const disabledLinkStyle: CSSProperties = {
  ...linkButtonStyle, color: "var(--color-text-muted)", cursor: "not-allowed",
};

const unreadBarStyle: CSSProperties = {
  display: "flex", justifyContent: "flex-end", padding: "12px 20px",
  borderBottom: "1px solid var(--color-border)", background: "var(--color-surface)",
};

const unreadLabelStyle: CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13,
  color: "var(--color-text)", cursor: "pointer",
};

const listStyle: CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const dotReadStyle: CSSProperties = {
  width: 8, height: 8, borderRadius: "50%",
  background: "var(--color-border-strong)", marginTop: 8,
};

const dotUnreadStyle: CSSProperties = {
  width: 8, height: 8, borderRadius: "50%",
  background: "var(--color-primary)", marginTop: 8,
};

const itemBodyStyle: CSSProperties = {
  display: "flex", flexDirection: "column", gap: 3, minWidth: 0,
};

const itemTitleStyle: CSSProperties = {
  fontSize: 14, fontWeight: 600, color: "var(--color-text)",
};

const itemSubtitleStyle: CSSProperties = {
  fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5,
};

const itemWhenStyle: CSSProperties = {
  fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap",
};

const emptyStateStyle: CSSProperties = { padding: "40px 24px", textAlign: "center" };

const emptyTitleStyle: CSSProperties = {
  margin: 0, fontSize: 15, fontWeight: 600, color: "var(--color-text)",
};

const emptyBodyStyle: CSSProperties = {
  margin: "6px 0 0", fontSize: 14, color: "var(--color-text-muted)",
};

const emptyStyle: CSSProperties = {
  padding: 24, fontSize: 14, color: "var(--color-text-muted)",
};

const rhythmCardStyle: CSSProperties = {
  background: "var(--color-tint-blue-bg)",
  border: "1px solid #bfdbfe",
  borderRadius: "var(--radius-lg)",
  padding: 24, display: "flex", flexDirection: "column", gap: 10,
};

const rhythmTitleStyle: CSSProperties = {
  margin: 0, fontSize: 14, fontWeight: 600, color: "var(--color-tint-blue-fg)",
};

const rhythmBigStyle: CSSProperties = {
  margin: "4px 0 0", fontSize: 22, fontWeight: 600,
  letterSpacing: "-0.02em", color: "var(--color-text)",
};

const rhythmBodyStyle: CSSProperties = {
  margin: 0, fontSize: 13, lineHeight: 1.55, color: "var(--color-text-muted)",
};

const rhythmLinkStyle: CSSProperties = {
  marginTop: 8, fontSize: 13, fontWeight: 500,
  color: "var(--color-primary)", textDecoration: "none",
};
