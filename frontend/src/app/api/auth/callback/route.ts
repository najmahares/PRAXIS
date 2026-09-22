import { NextResponse, type NextRequest } from "next/server";
import { createSession } from "@/lib/auth/sessions";
import {
  sessionCookieHeader,
  sessionCookieValueFromToken,
} from "@/lib/auth/server";
import { createNotification } from "@/lib/notifications/server";
import { logEvent } from "@/lib/events/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON =
  process.env.SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

function safeNext(value: string | undefined): string {
  if (!value) return "/dashboard";
  if (!value.startsWith("/")) return "/dashboard";
  if (value.startsWith("//")) return "/dashboard";
  if (value.includes("\\")) return "/dashboard";
  return value;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errParam = url.searchParams.get("error");
  const errDesc = url.searchParams.get("error_description");

  if (errParam) {
    logEvent({
      eventType: "auth.google_callback",
      request,
      metadata: { error: errParam, description: errDesc },
    });
    return NextResponse.redirect(
      new URL("/login?error=" + encodeURIComponent(errParam), request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_no_code", request.url)
    );
  }

  
  const cookieHeader = request.headers.get("cookie") ?? "";
  const m = cookieHeader.match(/(?:^|;\s*)praxis_oauth=([^;]+)/);
  if (!m) {
    return NextResponse.redirect(
      new URL("/login?error=google_no_verifier", request.url)
    );
  }
  const decoded = decodeURIComponent(m[1]);
  const [verifier, nextRaw] = decoded.split("|");
  if (!verifier) {
    return NextResponse.redirect(
      new URL("/login?error=google_no_verifier", request.url)
    );
  }

  
  const tokenRes = await fetch(
    SUPABASE_URL + "/auth/v1/token?grant_type=pkce",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON,
        Authorization: "Bearer " + ANON,
      },
      body: JSON.stringify({ auth_code: code, code_verifier: verifier }),
    }
  );

  if (!tokenRes.ok) {
    const bodyText = await tokenRes.text();
    logEvent({
      eventType: "auth.google_callback",
      request,
      metadata: {
        error: "token_exchange_failed",
        status: tokenRes.status,
        body: bodyText.slice(0, 300),
      },
    });
    return NextResponse.redirect(
      new URL("/login?error=google_token", request.url)
    );
  }

  const session = (await tokenRes.json()) as {
    user?: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
      created_at?: string;
    };
  };
  const user = session.user;
  if (!user?.id) {
    return NextResponse.redirect(
      new URL("/login?error=google_no_user", request.url)
    );
  }

  
  const token = await createSession(user.id, {
    userAgent: request.headers.get("user-agent") ?? undefined,
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? undefined,
  });

  
  const isNew = user.created_at
    ? Date.now() - new Date(user.created_at).getTime() < 10_000
    : false;

  if (isNew) {
    try {
      await createNotification(user.id, {
        kind: "system",
        title: "Welcome to PRAXIS",
        body: "You signed up with Google. Start with Foundations in My Learning, or jump into the practice portfolio.",
        href: "/learning",
      });
    } catch {
      
    }
  }

  logEvent({
    userId: user.id,
    eventType: "auth.google_callback",
    request,
    metadata: { email: user.email, new_user: isNew },
  });

  const next = safeNext(nextRaw);
  const response = NextResponse.redirect(new URL(next, request.url));

  response.headers.append(
    "Set-Cookie",
    sessionCookieHeader(sessionCookieValueFromToken(token, user.id))
  );

  
  response.headers.append(
    "Set-Cookie",
    "praxis_oauth=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );

  return response;
}
