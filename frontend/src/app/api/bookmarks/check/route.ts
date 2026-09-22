import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { isBookmarked } from "@/lib/bookmarks-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: true, saved: false });

  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const id = url.searchParams.get("id");

  if (
    (type !== "concept" && type !== "company" && type !== "scenario") ||
    !id
  ) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const saved = await isBookmarked(userId, type, id);
  return NextResponse.json({ ok: true, saved });
}
