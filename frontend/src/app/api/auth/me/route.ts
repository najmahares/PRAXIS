import { NextResponse } from "next/server";
import { readSession, getCachedUser, clearSessionCookieHeader } from "@/lib/auth/server";
import { verifySession } from "@/lib/auth/sessions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = readSession(request);
  if (!session) return NextResponse.json({ ok: true, user: null });

  const valid = await verifySession(session.userId, session.token);
  if (!valid) {
    const response = NextResponse.json({ ok: true, user: null });
    response.headers.append("Set-Cookie", clearSessionCookieHeader());
    return response;
  }

  const user = await getCachedUser(session.userId);
  if (!user) {
    const response = NextResponse.json({ ok: true, user: null });
    response.headers.append("Set-Cookie", clearSessionCookieHeader());
    return response;
  }

  return NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
