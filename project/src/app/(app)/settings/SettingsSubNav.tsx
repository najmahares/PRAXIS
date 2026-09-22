"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/settings/profile", label: "Profile" },
  { href: "/settings/notifications", label: "Notifications" },
  { href: "/settings/practice-preferences", label: "Practice preferences" },
  { href: "/settings/appearance", label: "Appearance" },
  { href: "/settings/security", label: "Security" },
];

export default function SettingsSubNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Settings sections" className="praxis-settings-nav">
      {ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="praxis-settings-nav-link"
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
