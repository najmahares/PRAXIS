import crypto from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const SESSION_TTL_DAYS = 30;

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function newSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createSession(
  userId: string,
  meta: { userAgent?: string; ip?: string } = {}
): Promise<string> {
  const sb = getSupabaseAdmin();
  const token = newSessionToken();
  if (!sb) return token;

  const expiresAt = new Date(
    Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  await sb.from("sessions").insert({
    user_id: userId,
    token_hash: hashToken(token),
    expires_at: expiresAt,
    user_agent: meta.userAgent?.slice(0, 200) ?? null,
    ip: meta.ip?.slice(0, 64) ?? null,
  });

  return token;
}




type VerifyCacheEntry = { valid: boolean; expires: number };
const verifyCache = new Map<string, VerifyCacheEntry>();
const VERIFY_TTL_MS = 60_000;
const VERIFY_CACHE_MAX = 500;

export async function verifySession(
  userId: string,
  token: string
): Promise<boolean> {
  const key = userId + ":" + hashToken(token);
  const now = Date.now();

  const cached = verifyCache.get(key);
  if (cached && cached.expires > now) return cached.valid;

  const sb = getSupabaseAdmin();
  if (!sb) return false;

  const { data } = await sb
    .from("sessions")
    .select("id, expires_at, revoked_at")
    .eq("token_hash", hashToken(token))
    .eq("user_id", userId)
    .maybeSingle();

  let valid = false;
  if (data && !data.revoked_at) {
    valid = new Date(data.expires_at as string).getTime() > now;
  }

  verifyCache.set(key, { valid, expires: now + VERIFY_TTL_MS });

  
  if (verifyCache.size > VERIFY_CACHE_MAX) {
    for (const [k, v] of verifyCache) {
      if (v.expires <= now) verifyCache.delete(k);
    }
  }

  return valid;
}

export async function revokeSession(token: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("token_hash", hashToken(token));
  
  const h = hashToken(token);
  for (const k of verifyCache.keys()) {
    if (k.endsWith(":" + h)) verifyCache.delete(k);
  }
}

export async function revokeAllSessions(userId: string): Promise<void> {
  const sb = getSupabaseAdmin();
  if (!sb) return;
  await sb
    .from("sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("user_id", userId)
    .is("revoked_at", null);
}
