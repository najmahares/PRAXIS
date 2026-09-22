import { NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/practice/session";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getDashboardData } from "@/lib/dashboard/server";
import { getAuthUserCached } from "@/lib/auth/userCache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  let userName = "";
  if (admin) {
    const { data } = await admin.auth.admin.getUserById(userId);
    const meta = (data?.user?.user_metadata ?? {}) as Record<string, unknown>;
    userName =
      (meta.name as string | undefined) ??
      (data?.user?.email ?? "").split("@")[0];
  }

  const data = await getDashboardData(userId, userName);
  return NextResponse.json({ ok: true, data });
}
