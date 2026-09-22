"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Icon from "@/components/ui/Icon";
import { useSession } from "@/lib/auth/useSession";
import { fetchBootstrap } from "@/lib/authApi";
import { getUnreadCount } from "@/lib/notificationsApi";
import SignOutConfirm from "./SignOutConfirm";
import GlobalBookmarkButton from "./GlobalBookmarkButton";
import GlobalSearch from "./GlobalSearch";
import Arrow from "@/components/ui/Arrow";

type TopBarProps = {
  onOpenDrawer: () => void;
};

function initialsFrom(name: string | undefined): string {
  if (!name) return "P";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("");
}

export default function TopBar({ onOpenDrawer }: TopBarProps) {
  const { user, signOut } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchBootstrap().then((p) => {
      if (!cancelled) setIsAdmin(Boolean(p.isAdmin));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const POLL_INTERVAL_MS = 60_000;
    let cancelled = false;

    function refresh() {
      if (cancelled) return;
      getUnreadCount()
        .then((n) => {
          if (!cancelled) setUnreadCount(n);
        })
        .catch(() => {});
    }

    
    refresh();

    
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") refresh();
    }, POLL_INTERVAL_MS);

    
    
    const onFocus = () => refresh();
    const onVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  function requestSignOut() {
    setMenuOpen(false);
    setSignOutOpen(true);
  }

  async function confirmSignOut() {
    setSignOutOpen(false);
    await signOut();
  }

  const initials = initialsFrom(user?.name);

  return (
    <header className="praxis-shell-topbar">
      <button
        type="button"
        className="praxis-shell-mobile-menu"
        onClick={onOpenDrawer}
        aria-label="Open navigation"
        style={iconButtonStyle}
      >
        <Icon name="menu" size={20} />
      </button>

      <GlobalSearch />

      <div style={rightClusterStyle}>
        <GlobalBookmarkButton />

        <Link
          href="/notifications"
          style={bellLinkStyle}
          aria-label={
            unreadCount > 0
              ? `Notifications, ${unreadCount} unread`
              : "Notifications"
          }
        >
          <Icon name="bell" size={20} />
          {unreadCount > 0 ? (
            <span style={badgeStyle} aria-hidden="true">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Link>

        <div style={avatarWrapStyle}>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Account menu"
            style={avatarButtonStyle}
          >
            <span style={avatarCircleStyle} aria-hidden="true">
              {initials}
            </span>
            <span style={avatarNameStyle}>{user?.name ?? "Learner"}</span>
            <Icon name="chevron-down" size={14} />
          </button>

          {menuOpen ? (
            <div ref={menuRef} role="menu" aria-label="Account" style={menuStyle}>
              <div style={menuHeaderStyle}>
                <span style={menuNameStyle}>{user?.name ?? "Learner"}</span>
                <span style={menuEmailStyle}>{user?.email ?? ""}</span>
              </div>
              <Link
                href="/settings/profile"
                role="menuitem"
                style={menuItemStyle}
                onClick={() => setMenuOpen(false)}
              >
      {isAdmin ? (
        <Link
          href="/admin"
          onClick={() => setMenuOpen(false)}
          style={{
            display: "block",
            padding: "8px 14px",
            fontSize: 13,
            fontWeight: 700,
            color: "#b45309",
            textDecoration: "none",
          }}
        >
          Admin console <Arrow size={14} />
        </Link>
      ) : null}

                Profile and settings
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={requestSignOut}
                style={menuItemDangerStyle}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <SignOutConfirm
        open={signOutOpen}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={confirmSignOut}
      />
    </header>
  );
}

const iconButtonStyle: CSSProperties = {
  width: 36,
  height: 36,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: 8,
  color: "var(--color-text-muted)",
  cursor: "pointer",
};

const bellLinkStyle: CSSProperties = {
  position: "relative",
  width: 36,
  height: 36,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: 8,
  color: "var(--color-text-muted)",
  textDecoration: "none",
};

const badgeStyle: CSSProperties = {
  position: "absolute",
  top: 2,
  right: 2,
  minWidth: 14,
  height: 14,
  padding: "0 3px",
  background: "var(--color-danger)",
  color: "#ffffff",
  fontSize: 9,
  fontWeight: 700,
  lineHeight: "14px",
  textAlign: "center",
  borderRadius: 999,
  border: "1.5px solid var(--color-surface)",
  boxSizing: "border-box",
  pointerEvents: "none",
};

const searchWrapStyle: CSSProperties = {
  position: "relative",
  flex: 1,
  maxWidth: 460,
};

const searchIconStyle: CSSProperties = {
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  color: "var(--color-text-muted)",
  display: "inline-flex",
};

const searchInputStyle: CSSProperties = {
  width: "100%",
  height: 38,
  paddingLeft: 36,
  paddingRight: 12,
  background: "var(--color-surface-muted)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 14,
  color: "var(--color-text)",
};

const rightClusterStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginLeft: "auto",
};

const avatarWrapStyle: CSSProperties = {
  position: "relative",
};

const avatarButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "5px 10px 5px 5px",
  background: "transparent",
  border: "1px solid transparent",
  borderRadius: 999,
  cursor: "pointer",
  color: "var(--color-text)",
};

const avatarCircleStyle: CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  background: "var(--color-tint-blue-bg)",
  color: "var(--color-tint-blue-fg)",
  fontSize: 12,
  fontWeight: 600,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  letterSpacing: "0.02em",
};

const avatarNameStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
};

const menuStyle: CSSProperties = {
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  minWidth: 240,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  boxShadow: "var(--shadow-md)",
  padding: 6,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const menuHeaderStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  padding: "10px 12px 12px",
  borderBottom: "1px solid var(--color-border)",
  marginBottom: 4,
};

const menuNameStyle: CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--color-text)",
};

const menuEmailStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--color-text-muted)",
};

const menuItemStyle: CSSProperties = {
  display: "block",
  padding: "9px 12px",
  fontSize: 14,
  color: "var(--color-text)",
  textDecoration: "none",
  borderRadius: 6,
};

const menuItemDangerStyle: CSSProperties = {
  display: "block",
  padding: "9px 12px",
  fontSize: 14,
  color: "var(--color-danger)",
  background: "transparent",
  border: "none",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: 6,
};
