import { getSupabaseAdmin } from "@/lib/supabase/server";
import { resolveUserEmails } from "@/lib/admin/userCache";
import { requireAdmin } from "../_guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const g = await requireAdmin(request);
  if (!g.ok) return g.response;
  const sb = getSupabaseAdmin();
  if (!sb) return Response.json({ ok: false, error: "no_db" }, { status: 503 });

  const { data, error } = await sb
    .from("admin_actions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  const adminIds = Array.from(new Set((data ?? []).map((a: any) => a.admin_user_id)));
  const lookup = await resolveUserEmails(adminIds);

  return Response.json({
    ok: true,
    actions: (data ?? []).map((a: any) => ({
      ...a,
      admin_name: lookup.get(a.admin_user_id)?.name ?? lookup.get(a.admin_user_id)?.email ?? a.admin_user_id.slice(0, 8),
    })),
  });
}
