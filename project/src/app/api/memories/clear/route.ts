import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SESSION_COOKIE = "praxis_session";

export async function DELETE(request: Request) {

  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const rawSession = readCookie(request.headers.get("cookie") ?? "", SESSION_COOKIE);
  const parsed = parseSession(rawSession);
  if (!parsed) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ ok: true });
  }

  const { error } = await sb
    .from("mentor_memories")
    .delete()
    .eq("user_id", parsed.userId);

  if (error) {
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}

function parseSession(value: string | null): { token: string; userId: string } | null {
  if (!value) return null;
  const [token, userId] = value.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}
