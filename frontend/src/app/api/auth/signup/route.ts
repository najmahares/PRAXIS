import { NextResponse } from "next/server";
import { getAdminClient, sessionCookieHeader, emailLooksValid, sessionCookieValueFromToken } from "@/lib/auth/server";
import { checkRateLimit, clientIpFrom, AUTH_LIMITS } from "@/lib/auth/rate-limit";
import { createSession } from "@/lib/auth/sessions";
import { createNotification } from "@/lib/notifications/server";
import { logEvent } from "@/lib/events/logger";
import { invalidateAdminUserCache } from "@/lib/admin/userCache";

export const runtime = "nodejs";

type Body = { name?: string; email?: string; password?: string };

export async function POST(request: Request) {
  const ip = clientIpFrom(request);
  const rl = checkRateLimit("signup:" + ip, AUTH_LIMITS.signup);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many signup attempts. Try again in " + rl.retryAfterSeconds + "s." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  let body: Body;
  try { body = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Enter your name." }, { status: 400 });
  if (!emailLooksValid(email)) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ ok: false, error: "Password must be at least 8 characters." }, { status: 400 });

  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ ok: false, error: "Auth is not configured on the server." }, { status: 503 });

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("already") || msg.includes("exists") || msg.includes("duplicate")) {
      return NextResponse.json({ ok: false, error: "An account with this email already exists." }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  const userId = data.user?.id;
  if (!userId) return NextResponse.json({ ok: false, error: "Could not create account." }, { status: 500 });

  logEvent({
    userId,
    eventType: "auth.signup",
    request,
    metadata: { email },
  });
  invalidateAdminUserCache();

  
  await createNotification(userId, {
    kind: "system",
    title: "Welcome to PRAXIS",
    body: "Start with Foundations in My Learning, or dive into the practice portfolio. Jema is here when you have questions.",
    href: "/learning",
  });

  const response = NextResponse.json({
    ok: true,
    user: { id: userId, name, email },
  });
  const token = await createSession(userId, {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? undefined,
  });
  response.headers.append(
    "Set-Cookie",
    sessionCookieHeader(sessionCookieValueFromToken(token, userId))
  );
  return response;
}
