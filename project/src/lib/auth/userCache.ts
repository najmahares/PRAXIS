import { getSupabaseAdmin } from "@/lib/supabase/server";

type CachedUser = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  emailConfirmed: boolean;
  expires: number;
};

const TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, CachedUser>();
let lastSweep = Date.now();

function sweep(now: number) {
  if (now - lastSweep < TTL_MS) return;
  for (const [k, v] of cache) {
    if (v.expires < now) cache.delete(k);
  }
  lastSweep = now;
}

export async function getAuthUserCached(userId: string): Promise<CachedUser | null> {
  const now = Date.now();
  sweep(now);
  const hit = cache.get(userId);
  if (hit && hit.expires > now) return hit;

  const sb = getSupabaseAdmin();
  if (!sb) return null;
  const { data, error } = await sb.auth.admin.getUserById(userId);
  if (error || !data.user) return null;
  const u = data.user;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (meta.name as string | undefined) ??
    (u.email ?? "").split("@")[0] ??
    "User";
  const entry: CachedUser = {
    id: u.id,
    email: u.email ?? "",
    name,
    createdAt: u.created_at ?? new Date().toISOString(),
    emailConfirmed: Boolean(u.email_confirmed_at),
    expires: now + TTL_MS,
  };
  cache.set(userId, entry);
  return entry;
}

export function invalidateAuthUserCache(userId: string): void {
  cache.delete(userId);
}
