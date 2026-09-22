import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { removeBookmarkByTarget } from "@/lib/bookmarks-server";

export const runtime = "nodejs";

export async function DELETE(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");

  if (
    (type !== "concept" && type !== "company" && type !== "scenario") ||
    !id
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const res = await removeBookmarkByTarget(userId, type, id);
  if (!res.ok) return NextResponse.json({ ok: false, error: res.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
