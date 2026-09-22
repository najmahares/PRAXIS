"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  match: (p: string) => boolean;
  icon: React.ReactNode;
  badge?: number;
};

export default function AdminSidebar({
  adminName,
  adminEmail,
}: {
  adminName: string;
  adminEmail: string;
}) {
  const pathname = usePathname();
  const [openReports, setOpenReports] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/metrics", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.metrics) setOpenReports(d.metrics.open_reports ?? 0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const items: NavItem[] = [
    {
      href: "/admin",
      label: "Overview",
      match: (p) => p === "/admin",
      icon: <IconHome />,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      match: (p) => p.startsWith("/admin/reports"),
      icon: <IconFlag />,
      badge: openReports,
    },
    {
      href: "/admin/users",
      label: "Users",
      match: (p) => p.startsWith("/admin/users"),
      icon: <IconUsers />,
    },
    {
      href: "/admin/audit",
      label: "Audit log",
      match: (p) => p.startsWith("/admin/audit"),
      icon: <IconScroll />,
    },
    {
      href: "/admin/events",
      label: "Events",
      match: (p) => p.startsWith("/admin/events"),
      icon: <IconPulse />,
    },
  ];

  const initials = (adminName || adminEmail || "A")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "A";

  return (
    <aside className="praxis-adminrail" aria-label="Admin navigation">
      <div className="praxis-adminrail-brand">
        <div className="praxis-adminrail-word">
          PRAXIS <span>ADMIN</span>
        </div>
      </div>

      <nav className="praxis-adminrail-nav">
        <div className="praxis-adminrail-section">Moderation</div>
        {items.map((it) => {
          const active = it.match(pathname ?? "");
          return (
            <Link
              key={it.href}
              href={it.href}
              className="praxis-adminrail-item"
              aria-current={active ? "page" : undefined}
            >
              {it.icon}
              <span>{it.label}</span>
              {it.badge && it.badge > 0 ? (
                <span className="praxis-adminrail-count">{it.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="praxis-adminrail-foot">
        <div className="praxis-adminrail-user">
          <span className="praxis-adminrail-user-avatar">{initials}</span>
          <div className="praxis-adminrail-user-text">
            <span className="praxis-adminrail-user-name">{adminName || adminEmail}</span>
            <span className="praxis-adminrail-user-role">Root</span>
          </div>
        </div>
        <Link href="/dashboard" className="praxis-adminrail-back">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12 H5" />
            <path d="M11 18 L5 12 L11 6" />
          </svg>
          Back to app
        </Link>
      </div>
    </aside>
  );
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 L12 3 L21 11" />
      <path d="M5 11 V21 H19 V11" />
    </svg>
  );
}

function IconFlag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 V4" />
      <path d="M4 4 H18 L15 10 L18 16 H4" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21 a7 7 0 0 1 14 0" />
      <path d="M17 4 a4 4 0 0 1 0 8" />
      <path d="M22 21 a7 7 0 0 0 -6 -6.9" />
    </svg>
  );
}

function IconScroll() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3 H18 V21 H6 Z" />
      <path d="M9 8 H15" />
      <path d="M9 12 H15" />
      <path d="M9 16 H13" />
    </svg>
  );
}

function IconPulse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12 H8 L10 6 L14 18 L16 12 H21" />
    </svg>
  );
}
