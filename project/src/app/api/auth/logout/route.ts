import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events/logger";
import { clearSessionCookieHeader, SESSION_COOKIE, readCookie } from "@/lib/auth/server";
import { revokeSession } from "@/lib/auth/sessions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const m = cookieHeader.match(/praxis_session=([^;]+)/);
    if (m) {
      const raw = decodeURIComponent(m[1]);
      const [token, userId] = raw.split("|");
      if (userId) {
        logEvent({
          userId,
          eventType: "auth.logout",
          request,
        });
      }
    }
  } catch {  }
  const raw = readCookie(request.headers.get("cookie") ?? "", SESSION_COOKIE);
  if (raw) {
    const [token] = raw.split("|");
    if (token) {
      await revokeSession(token);
    }
  }
  const response = NextResponse.json({ ok: true });
  response.headers.append("Set-Cookie", clearSessionCookieHeader());
  return response;
}
