import { getUserIdFromRequest } from "@/lib/practice/session";
import { isAdminUser } from "@/lib/community/admin";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { logEvent } from "@/lib/events/logger";

export async function requireAdmin(request: Request): Promise<
  { ok: true; adminId: string } | { ok: false; response: Response }
> {
  const adminId = await getUserIdFromRequest(request);
  if (!adminId) {
    return { ok: false, response: Response.json({ ok: false, error: "unauthorized" }, { status: 401 }) };
  }
  if (!(await isAdminUser(adminId))) {
    return { ok: false, response: Response.json({ ok: false, error: "forbidden" }, { status: 403 }) };
  }
  return { ok: true, adminId };
}





export async function logAdminAction(input: {
  adminUserId: string;
  action: string;
  targetType: string;
  targetId?: string | null;
  payload?: Record<string, unknown>;
}): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  try {
    await sb.from("admin_actions").insert({
      admin_user_id: input.adminUserId,
      action: input.action,
      target_type: input.targetType,
      target_id: input.targetId ?? null,
      payload: input.payload ?? null,
    });
  } catch {  }

  
  logEvent({
    userId: input.adminUserId,
    eventType: "admin.action",
    metadata: {
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId ?? null,
      ...(input.payload ?? {}),
    },
  });
}
