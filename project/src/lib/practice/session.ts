import { verifySession } from "@/lib/auth/sessions";

export const SESSION_COOKIE = "praxis_session";

export function readCookie(header: string, name: string): string | null {
  const match = header.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  if (!match) return null;
  const value = decodeURIComponent(match[1]).trim();
  return value || null;
}

export function parseSession(
  value: string | null
): { token: string; userId: string } | null {
  if (!value) return null;
  const [token, userId] = value.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}

export async function getUserIdFromRequest(
  request: Request
): Promise<string | null> {
  const raw = readCookie(request.headers.get("cookie") ?? "", SESSION_COOKIE);
  const parsed = parseSession(raw);
  if (!parsed) return null;
  const ok = await verifySession(parsed.userId, parsed.token);
  if (!ok) return null;
  return parsed.userId;
}

export function cookieHeaderFrom(store: {
  getAll: () => { name: string; value: string }[];
}): string {
  try {
    return store
      .getAll()
      .map((c) => c.name + "=" + c.value)
      .join("; ");
  } catch {
    return "";
  }
}
