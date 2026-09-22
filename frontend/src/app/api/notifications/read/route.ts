import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { isUuid } from "@/lib/validate";
import { markAllRead, markOneRead } from "@/lib/notifications/server";

export const runtime = "nodejs";

type Body = { id?: string | null };

export async function POST(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });

  let body: Body = {};
  try { body = (await request.json()) as Body; } catch {  }

  if (body.id && isUuid(body.id)) {
    await markOneRead(userId, body.id);
  } else if (!body.id) {
    await markAllRead(userId);
  } else {
    return NextResponse.json({ ok: false, error: "invalid_id" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
