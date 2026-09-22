import { getSupabaseAdmin } from "@/lib/supabase/server";










type AdminUser = {
  id: string;
  email: string;
  name: string;
  created_at: string | null;
  last_sign_in_at: string | null;
  banned_until: string | null;
  email_confirmed_at: string | null;
};

let cache: { users: AdminUser[]; expires: number } | null = null;
let inflight: Promise<AdminUser[]> | null = null;
const TTL_MS = 60_000;

function normalize(u: any): AdminUser {
  return {
    id: u.id,
    email: u.email ?? "",
    name: (u.user_metadata?.name as string) ?? "",
    created_at: u.created_at ?? null,
    last_sign_in_at: u.last_sign_in_at ?? null,
    banned_until: (u as any).banned_until ?? null,
    email_confirmed_at: u.email_confirmed_at ?? null,
  };
}

export async function getAdminUserList(): Promise<AdminUser[]> {
  const now = Date.now();
  if (cache && cache.expires > now) return cache.users;
  if (inflight) return inflight;

  inflight = (async () => {
    const sb = getSupabaseAdmin();
    if (!sb) return [];

    
    
    
    const all: AdminUser[] = [];
    const MAX_PAGES = 5;
    for (let p = 1; p <= MAX_PAGES; p++) {
      const res = await sb.auth.admin.listUsers({ page: p, perPage: 1000 });
      const batch = res.data?.users ?? [];
      for (const u of batch) all.push(normalize(u));
      if (batch.length < 1000) break;
    }

    cache = { users: all, expires: Date.now() + TTL_MS };
    inflight = null;
    return all;
  })();

  return inflight;
}

export function invalidateAdminUserCache(): void {
  cache = null;
  inflight = null;
}

export function getCachedAdminUser(id: string): AdminUser | null {
  if (!cache) return null;
  return cache.users.find((u) => u.id === id) ?? null;
}



export async function resolveUserEmails(
  ids: string[],
): Promise<Map<string, { email: string; name: string }>> {
  const out = new Map<string, { email: string; name: string }>();
  if (ids.length === 0) return out;

  const cached = await getAdminUserList();
  const lookup = new Map(cached.map((u) => [u.id, u]));

  const missing: string[] = [];
  for (const id of ids) {
    const hit = lookup.get(id);
    if (hit) out.set(id, { email: hit.email, name: hit.name });
    else missing.push(id);
  }

  if (missing.length > 0) {
    const sb = getSupabaseAdmin();
    if (sb) {
      await Promise.all(
        missing.map(async (id) => {
          try {
            const { data } = await sb.auth.admin.getUserById(id);
            if (data?.user) {
              const u = normalize(data.user);
              out.set(id, { email: u.email, name: u.name });
            }
          } catch {
            
          }
        }),
      );
    }
  }

  return out;
}
