import { NextResponse } from "next/server";
import { logEvent } from "@/lib/events/logger";
import { getAnonClient, sessionCookieHeader, sessionCookieValueFromToken } from "@/lib/auth/server";
import { createSession } from "@/lib/auth/sessions";
import { checkRateLimit, clientIpFrom, AUTH_LIMITS } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

type Body = { email?: string; password?: string };

export async function POST(request: Request) {
  const ip = clientIpFrom(request);
  const rl = checkRateLimit("login:" + ip, AUTH_LIMITS.login);
  if (!rl.ok) {
    logEvent({
      eventType: "rate_limit.hit",
      request,
      metadata: { scope: "login" },
    });
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in " + rl.retryAfterSeconds + "s." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "Enter your email and password." },
      { status: 400 }
    );
  }

  const anon = getAnonClient();
  if (!anon) {
    return NextResponse.json(
      { ok: false, error: "Auth is not configured on the server." },
      { status: 503 }
    );
  }

  const { data, error } = await anon.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    logEvent({
      eventType: "auth.login.failed",
      request,
      metadata: { email },
    });
    return NextResponse.json(
      { ok: false, error: "Incorrect email or password." },
      { status: 401 }
    );
  }

  const userId = data.user.id;
  const metaName = (data.user.user_metadata?.name as string | undefined) ?? "";
  const name = metaName.trim() || email.split("@")[0];

  const token = await createSession(userId, {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? undefined,
  });

  const response = NextResponse.json({
    ok: true,
    user: { id: userId, name, email },
  });

  response.headers.append(
    "Set-Cookie",
    sessionCookieHeader(sessionCookieValueFromToken(token, userId))
  );

  logEvent({
    userId,
    eventType: "auth.login.success",
    request,
    metadata: { email },
  });

  return response;
}
