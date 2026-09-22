import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";

const SESSION_COOKIE = "praxis_session";

export async function GET(request: Request) {

  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const rawSession = readCookie(request.headers.get("cookie") ?? "", SESSION_COOKIE);
  const parsed = parseSession(rawSession);
  if (!parsed) return NextResponse.json({ memories: [] });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ memories: [] });

  const { data, error } = await sb
    .from("mentor_memories")
    .select("id, fact, concept, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error || !data) return NextResponse.json({ memories: [] });

  const memories = data.map((row) => ({
    id: row.id as string,
    fact: row.fact as string,
    concept: row.concept as string,
    createdAt: new Date(row.created_at as string).getTime(),
  }));

  return NextResponse.json({ memories });
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
