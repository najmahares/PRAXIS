"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import Icon, { type IconName } from "@/components/ui/Icon";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
};

const PRIMARY_NAV: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: "home" },
  { href: "/learning", label: "My Learning", icon: "book" },
  { href: "/practice", label: "Practice Library", icon: "play" },
  { href: "/market", label: "Market", icon: "chart" },
  { href: "/portfolio", label: "Portfolio", icon: "pie" },
  { href: "/progress", label: "Progress", icon: "trend" },
];

const WORKSPACE_NAV: NavItem[] = [
  { href: "/bookmarks", label: "Bookmarks", icon: "bookmark" },
  { href: "/community", label: "Community", icon: "users" },
  { href: "/mentor", label: "Mentor", icon: "message" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside
      className="praxis-shell-sidebar"
      data-open={open ? "true" : "false"}
      aria-label="Primary navigation"
    >
      <Link href="/dashboard" style={brandStyle} onClick={onClose}>
        PRAXIS
      </Link>

      <nav aria-label="Main" style={navStyle}>
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="praxis-sidebar-item"
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={onClose}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={sectionLabelStyle}>Workspace</div>

      <nav aria-label="Workspace" style={navStyle}>
        {WORKSPACE_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="praxis-sidebar-item"
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={onClose}
          >
            <Icon name={item.icon} size={16} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={spacerStyle} />

    </aside>
  );
}

const brandStyle: CSSProperties = {
  display: "inline-block",
  fontSize: 15,
  fontWeight: 800,
  letterSpacing: "0.16em",
  color: "#ffffff",
  textDecoration: "none",
  padding: "4px 12px 20px",
};

const navStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const sectionLabelStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255, 255, 255, 0.55)",
  padding: "24px 12px 8px",
};

const spacerStyle: CSSProperties = {
  flex: 1,
  minHeight: 24,
};

