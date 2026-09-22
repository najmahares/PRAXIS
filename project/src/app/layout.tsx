import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import "./brand.css";
import AppErrorBoundary from "@/components/errors/AppErrorBoundary";
import { SessionProvider } from "@/lib/auth/SessionProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const DESCRIPTION =
  "Learn the stock market by practicing it. Choose your starting virtual capital, build a portfolio, make decisions, and see what happens. No real money.";

const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("praxis_theme")||"light";var r=s==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s;document.documentElement.setAttribute("data-theme",r);document.documentElement.style.colorScheme=r;}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PRAXIS",
    template: "%s · PRAXIS",
  },
  description: DESCRIPTION,
  applicationName: "PRAXIS",
  openGraph: {
    type: "website",
    siteName: "PRAXIS",
    title: "PRAXIS · Your first portfolio doesn't have to be real.",
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "PRAXIS · Your first portfolio doesn't have to be real.",
    description: DESCRIPTION,
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script
          id="praxis-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
        />
      </head>
      <body>
        <AppErrorBoundary>
          <ThemeProvider>
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
        </AppErrorBoundary>
      </body>
    </html>
  );
}
