import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import {
  listBookmarks,
  addBookmark,
  removeBookmark,
} from "@/lib/bookmarks-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: true, bookmarks: [] });
  const bookmarks = await listBookmarks(userId);
  return NextResponse.json({ ok: true, bookmarks });
}

type PostBody = {
  targetType?: "concept" | "company" | "scenario";
  targetId?: string;
  title?: string;
  description?: string | null;
  href?: string;
};

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: PostBody;
  try { body = await request.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const targetType = body.targetType;
  const targetId = (body.targetId ?? "").trim();
  const title = (body.title ?? "").trim();
  const href = (body.href ?? "").trim();

  if (
    (targetType !== "concept" && targetType !== "company" && targetType !== "scenario") ||
    !targetId ||
    !title ||
    !href
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const res = await addBookmark(userId, {
    target_type: targetType,
    target_id: targetId,
    title,
    description: body.description ?? null,
    href,
  });

  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true, id: res.id });
}

export async function DELETE(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const res = await removeBookmark(userId, id);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
