


export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResult =
  | { ok: true; user?: AuthUser; message?: string }
  | { ok: false; error: string };









export type BootstrapPayload = {
  user: AuthUser | null;
  unreadCount: number;
  completedLessons: string[];
  isAdmin: boolean;
};

const EMPTY_BOOTSTRAP: BootstrapPayload = {
  user: null,
  unreadCount: 0,
  completedLessons: [],
  isAdmin: false,
};

let _bootstrapPromise: Promise<BootstrapPayload> | null = null;
let _bootstrapCache: BootstrapPayload | null = null;
let _bootstrapCacheUntil = 0;
const BOOTSTRAP_TTL_MS = 30_000;

export async function fetchBootstrap(force = false): Promise<BootstrapPayload> {
  if (typeof window === "undefined") return EMPTY_BOOTSTRAP;

  const now = Date.now();
  if (!force && _bootstrapCache && _bootstrapCacheUntil > now) {
    return _bootstrapCache;
  }
  if (!force && _bootstrapPromise) return _bootstrapPromise;

  _bootstrapPromise = (async () => {
    try {
      const res = await fetch("/api/bootstrap", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!res.ok) throw new Error("bootstrap_failed");
      const data = (await res.json()) as {
        ok: boolean;
        user: AuthUser | null;
        unreadCount: number;
        completedLessons: string[];
      };
      const payload: BootstrapPayload = {
        user: data.user ?? null,
        unreadCount: data.unreadCount ?? 0,
        completedLessons: data.completedLessons ?? [],
        isAdmin: Boolean((data as { isAdmin?: boolean }).isAdmin),
      };
      _bootstrapCache = payload;
      _bootstrapCacheUntil = Date.now() + BOOTSTRAP_TTL_MS;
      return payload;
    } catch {
      return EMPTY_BOOTSTRAP;
    } finally {
      _bootstrapPromise = null;
    }
  })();

  return _bootstrapPromise;
}

export function invalidateBootstrap(): void {
  _bootstrapCache = null;
  _bootstrapCacheUntil = 0;
  _bootstrapPromise = null;
}

export function getCachedBootstrap(): BootstrapPayload | null {
  return _bootstrapCache;
}

async function postJson<T>(url: string, body: unknown): Promise<T | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "same-origin",
    });
    const data = await res.json();
    return data as T;
  } catch {
    return { ok: false, error: "Network error. Check your connection and try again." };
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const res = await postJson<AuthResult>("/api/auth/login", { email, password });
  invalidateBootstrap();
  return res as AuthResult;
}

export async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  const res = await postJson<AuthResult>("/api/auth/signup", { name, email, password });
  invalidateBootstrap();
  return res as AuthResult;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const payload = await fetchBootstrap();
  return payload.user;
}

export async function signOut(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    
  }
  invalidateBootstrap();
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const res = await postJson<AuthResult>("/api/auth/forgot", { email });
  return res as AuthResult;
}

export async function resetPassword(
  token: string,
  email: string,
  newPassword: string,
): Promise<AuthResult> {
  const res = await postJson<AuthResult>("/api/auth/reset-password", {
    token,
    email,
    password: newPassword,
  });
  return res as AuthResult;
}

export function startGoogleAuth(): void {
  if (typeof window === "undefined") return;
  const next = new URLSearchParams(window.location.search).get("next") ?? "/dashboard";
  window.location.href = "/api/auth/google?next=" + encodeURIComponent(next);
}

export function parseSessionCookieValue(value: string | null | undefined): {
  token: string;
  userId: string;
} | null {
  if (!value) return null;
  const [token, userId] = value.split("|");
  if (!token || !userId) return null;
  return { token, userId };
}
