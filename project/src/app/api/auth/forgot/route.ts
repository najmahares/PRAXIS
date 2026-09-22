import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { sendPasswordResetEmail } from "@/lib/email/resend";
import { checkRateLimit, clientIpFrom, AUTH_LIMITS } from "@/lib/auth/rate-limit";
import { logEvent } from "@/lib/events/logger";
import { emailLooksValid, parseJsonBody } from "@/lib/auth/server";

export const runtime = "nodejs";

type Body = { email?: string };

export async function POST(request: Request) {
  const ip = clientIpFrom(request);
  const rl = checkRateLimit("forgot:" + ip, AUTH_LIMITS.login);
  if (!rl.ok) {
    logEvent({
      eventType: "rate_limit.hit",
      request,
      metadata: { scope: "forgot" },
    });
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in " + rl.retryAfterSeconds + "s." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  const body = await parseJsonBody<Body>(request);
  const email = (body?.email ?? "").trim().toLowerCase();

  
  
  
  const SUCCESS = {
    ok: true,
    message: "If that email is registered, a reset link is on its way.",
  };

  if (!emailLooksValid(email)) {
    return NextResponse.json(SUCCESS);
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: false, error: "Server not configured." }, { status: 503 });
  }

  try {
    
    
    const { data, error } = await sb.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo:
          (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
          "/reset-password",
      },
    });

    if (error || !data?.properties?.hashed_token) {
      
      logEvent({
        eventType: "auth.password_reset_request",
        request,
        metadata: { email, error: error?.message ?? "no_token" },
      });
      return NextResponse.json(SUCCESS);
    }

    const token = data.properties.hashed_token;
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
    const resetUrl =
      origin +
      "/reset-password?token=" +
      encodeURIComponent(token) +
      "&email=" +
      encodeURIComponent(email);

    const meta = (data.user?.user_metadata ?? {}) as Record<string, unknown>;
    const name = typeof meta.name === "string" ? meta.name : "";

    const sent = await sendPasswordResetEmail({
      to: email,
      name,
      resetUrl,
    });

    logEvent({
      userId: data.user?.id,
      eventType: "auth.password_reset_request",
      request,
      metadata: { email, sent_ok: sent.ok, send_error: sent.error ?? null },
    });

    return NextResponse.json(SUCCESS);
  } catch (e) {
    logEvent({
      eventType: "auth.password_reset_request",
      request,
      metadata: { email, error: String(e) },
    });
    return NextResponse.json(SUCCESS);
  }
}
