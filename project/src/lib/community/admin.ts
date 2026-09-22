import { getSupabaseAdmin } from "@/lib/supabase/server";

function parseAdminList(): string[] {
  const raw = process.env.PRAXIS_ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

export function adminEmailList(): string[] {
  return parseAdminList();
}

export async function isAdminUser(userId: string): Promise<boolean> {
  const admins = parseAdminList();
  if (admins.length === 0) return false;

  const sb = getSupabaseAdmin();
  if (!sb) return false;

  const { data } = await sb.auth.admin.getUserById(userId);
  const email = data?.user?.email?.toLowerCase();
  if (!email) return false;
  return admins.includes(email);
}
