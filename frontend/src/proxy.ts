import { NextResponse, type NextRequest } from "next/server";
import { checkUserRateLimit } from "@/lib/rate-limit";

const SESSION_COOKIE = "praxis_session";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/learning",
  "/practice",
  "/market",
  "/portfolio",
  "/progress",
  "/mentor",
  "/bookmarks",
  "/settings",
  "/community",
];

function matchesAny(pathname: string, prefixes: string[]): boolean {
  return prefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );
}

function safeNextPath(value: string, fallback = "/dashboard"): string {
  if (!value) return fallback;
  if (!value.startsWith("/")) return fallback;
  if (value.startsWith("//")) return fallback;
  if (value.includes("\\")) return fallback;
  if (/[\r\n\t\0]/.test(value)) return fallback;
  return value;
}

function parseUserId(request: NextRequest): string | null {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const decoded = decodeURIComponent(raw);
  const [token, userId] = decoded.split("|");
  if (!token || !userId) return null;
  return userId;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  
  
  
  const method = request.method.toUpperCase();
  const isWrite =
    method === "POST" || method === "PATCH" || method === "PUT" || method === "DELETE";

  if (pathname.startsWith("/api/") && isWrite) {
    const userId = parseUserId(request);
    const isAuthRoute = pathname.startsWith("/api/auth/");
    if (userId && !isAuthRoute) {
      const rl = await checkUserRateLimit(userId);
      if (!rl.ok) {
        return new NextResponse(
          JSON.stringify({ ok: false, error: "rate_limited" }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Retry-After": String(
                Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000))
              ),
            },
          }
        );
      }
    }
  }

  if (matchesAny(pathname, PROTECTED_PREFIXES) && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", safeNextPath(pathname + search));
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
