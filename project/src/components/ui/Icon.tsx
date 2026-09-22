import type { CSSProperties } from "react";

export type IconName =
  | "home"
  | "book"
  | "play"
  | "chart"
  | "pie"
  | "trend"
  | "bookmark"
  | "users"
  | "message"
  | "settings"
  | "bell"
  | "search"
  | "menu"
  | "close"
  | "chevron-down"
  | "arrow-right"
  | "shield";

type IconProps = {
  name: IconName;
  size?: number;
  style?: CSSProperties;
};

export default function Icon({ name, size = 16, style }: IconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    style,
  };

  switch (name) {
    case "home":
      return (
        <svg {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "book":
      return (
        <svg {...props}>
          <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" />
          <path d="M18 4h2v16h-2" />
        </svg>
      );
    case "play":
      return (
        <svg {...props}>
          <path d="M6 4l14 8-14 8z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V8" />
          <path d="M10 20V4" />
          <path d="M16 20v-8" />
          <path d="M22 20V10" />
        </svg>
      );
    case "pie":
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 1 0 9 9h-9z" />
          <path d="M12 3v9h9A9 9 0 0 0 12 3z" />
        </svg>
      );
    case "trend":
      return (
        <svg {...props}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case "bookmark":
      return (
        <svg {...props}>
          <path d="M6 3h12v18l-6-4-6 4z" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M17 10a3 3 0 1 0 0-6" />
          <path d="M21.5 20a6.5 6.5 0 0 0-4-6" />
        </svg>
      );
    case "message":
      return (
        <svg {...props}>
          <path d="M21 12a8 8 0 0 1-11.6 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2.5" />
          <path d="M12 18.5V21" />
          <path d="M3 12h2.5" />
          <path d="M18.5 12H21" />
          <path d="M5.6 5.6l1.8 1.8" />
          <path d="M16.6 16.6l1.8 1.8" />
          <path d="M5.6 18.4l1.8-1.8" />
          <path d="M16.6 7.4l1.8-1.8" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "menu":
      return (
        <svg {...props}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...props}>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...props}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l8 3v6c0 4.5-3.2 8.4-8 9.5-4.8-1.1-8-5-8-9.5V6z" />
        </svg>
      );
    default:
      return null;
  }
}
