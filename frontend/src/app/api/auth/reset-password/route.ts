import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { createSession } from "@/lib/auth/sessions";
import {
  sessionCookieHeader,
  sessionCookieValueFromToken,
  parseJsonBody,
} from "@/lib/auth/server";
import { logEvent } from "@/lib/events/logger";

export const runtime = "nodejs";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

type Body = { token?: string; email?: string; password?: string };

export async function POST(request: Request) {
  const body = await parseJsonBody<Body>(request);
  const token = (body?.token ?? "").trim();
  const email = (body?.email ?? "").trim().toLowerCase();
  const password = body?.password ?? "";

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Missing reset token. Open the reset link from your email." },
      { status: 400 }
    );
  }
  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Missing email. Open the reset link from your email." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  if (!SUPABASE_URL || !ANON) {
    return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 503 });
  }

  
  
  
  const anon = createClient(SUPABASE_URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data, error } = await anon.auth.verifyOtp({
    type: "recovery",
    token_hash: token,
  });

  if (error || !data?.user) {
    logEvent({
      eventType: "auth.password_change",
      request,
      metadata: {
        email,
        stage: "verify_failed",
        error: error?.message ?? "no_user",
      },
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "This reset link is invalid or has already been used. Request a new one from the login page.",
      },
      { status: 400 }
    );
  }

  const userId = data.user.id;

  
  const admin = getSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 503 });
  }

  const update = await admin.auth.admin.updateUserById(userId, { password });
  if (update.error) {
    logEvent({
      userId,
      eventType: "auth.password_change",
      request,
      metadata: { email, stage: "update_failed", error: update.error.message },
    });
    return NextResponse.json(
      { ok: false, error: "Could not update your password. Try again." },
      { status: 500 }
    );
  }

  
  const sessionToken = await createSession(userId, {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? undefined,
  });

  logEvent({
    userId,
    eventType: "auth.password_change",
    request,
    metadata: { email, stage: "success" },
  });

  const response = NextResponse.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    sessionCookieHeader(sessionCookieValueFromToken(sessionToken, userId))
  );
  return response;
}
