import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { listPosts, getAuthorForUser } from "@/lib/community/server";
import { moderate, initialsFrom } from "@/lib/community/moderation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const posts = await listPosts(kind, userId);
  return NextResponse.json({ ok: true, posts });
}

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let payload: { kind?: string; title?: string; body?: string; tags?: string[] };
  try { payload = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const kind = ["discussion", "question", "win", "challenge"].includes(payload.kind ?? "") ? payload.kind! : null;
  const title = (payload.title ?? "").trim();
  const body = (payload.body ?? "").trim();

  if (!kind || title.length < 4 || body.length < 4) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const mod = moderate(title + "\n\n" + body);
  if (!mod.ok) return NextResponse.json({ ok: false, error: mod.reason }, { status: 400 });

  const sb = getSupabaseAdmin();
  if (!sb) return NextResponse.json({ ok: false, error: "no_db" }, { status: 503 });

  const author = await getAuthorForUser(userId);

  const { data, error } = await sb.from("community_posts").insert({
    user_id: userId,
    author_name: author.name,
    author_initials: author.initials || initialsFrom(author.name),
    author_color: author.color,
    kind,
    title: title.slice(0, 200),
    body: body.slice(0, 6000),
    tags: (payload.tags ?? []).slice(0, 5),
  }).select("id").maybeSingle();

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data?.id });
}
