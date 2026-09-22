import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SERVICE = process.env.SUPABASE_SERVICE_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const SESSION_COOKIE = "praxis_session";
const IS_PROD = process.env.NODE_ENV === "production";

let _anon: SupabaseClient | null = null;
let _admin: SupabaseClient | null = null;

export function getAnonClient(): SupabaseClient | null {
  if (!URL || !ANON) return null;
  if (_anon) return _anon;
  _anon = createClient(URL, ANON, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return _anon;
}

export function getAdminClient(): SupabaseClient | null {
  if (!URL || !SERVICE) return null;
  if (_admin) return _admin;
  _admin = createClient(URL, SERVICE, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  return _admin;
}

export function sessionCookieValueFromToken(token: string, userId: string): string {
  return `${token}|${userId}`;
}

export function readSession(request: Request): { token: string; userId: string } | null {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(new RegExp("(?:^|;\\s*)" + SESSION_COOKIE + "=([^;]+)"));
  if (!match) return null;
  const raw = decodeURIComponent(match[1]).trim();
  const [token, userId] = raw.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}

export function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}











export function sessionCookieHeader(value: string, maxAgeSeconds = 60 * 60 * 24 * 30): string {
  const parts = [
    SESSION_COOKIE + "=" + encodeURIComponent(value),
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=" + maxAgeSeconds,
  ];
  if (IS_PROD) parts.push("Secure");
  return parts.join("; ");
}

export function clearSessionCookieHeader(): string {
  const parts = [
    SESSION_COOKIE + "=",
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (IS_PROD) parts.push("Secure");
  return parts.join("; ");
}

export function emailLooksValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}







export async function parseJsonBody<T>(
  request: Request,
  maxBytes = 64 * 1024
): Promise<T | null> {
  const len = Number(request.headers.get("content-length") ?? "0");
  if (len > maxBytes) return null;
  try {
    const text = await request.text();
    if (text.length > maxBytes) return null;
    if (!text) return null;
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}







export type CachedUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string | null;
};

type UserCacheEntry = { user: CachedUser; expires: number };
const userCache = new Map<string, UserCacheEntry>();
const USER_TTL_MS = 5 * 60 * 1000;
const USER_CACHE_MAX = 500;

export async function getCachedUser(userId: string): Promise<CachedUser | null> {
  const now = Date.now();
  const cached = userCache.get(userId);
  if (cached && cached.expires > now) return cached.user;

  const admin = getAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data?.user) return null;

  const u = data.user;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (meta.name as string | undefined) ??
    (u.email ?? "").split("@")[0];

  const user: CachedUser = {
    id: u.id,
    name,
    email: u.email ?? "",
    emailVerified: Boolean(u.email_confirmed_at),
    createdAt: u.created_at ?? null,
  };

  userCache.set(userId, { user, expires: now + USER_TTL_MS });

  if (userCache.size > USER_CACHE_MAX) {
    for (const [k, v] of userCache) {
      if (v.expires <= now) userCache.delete(k);
    }
  }

  return user;
}

export function invalidateCachedUser(userId: string): void {
  userCache.delete(userId);
}
