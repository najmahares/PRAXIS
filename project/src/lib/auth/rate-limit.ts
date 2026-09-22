









type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const MAX_ENTRIES = 10_000; 

function sweep(): void {
  if (buckets.size < MAX_ENTRIES) return;
  const now = Date.now();
  for (const [key, b] of buckets.entries()) {
    if (b.resetAt < now) buckets.delete(key);
  }
}

export type RateLimitConfig = {
  
  windowMs: number;
  
  max: number;
};

export type RateLimitCheck = {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitCheck {
  const now = Date.now();
  sweep();

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + config.windowMs });
    return { ok: true, remaining: config.max - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= config.max) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: config.max - bucket.count,
    retryAfterSeconds: 0,
  };
}





export function clientIpFrom(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}






export const AUTH_LIMITS = {
  login: { windowMs: 2 * 60 * 1000, max: 10 },       
  signup: { windowMs: 10 * 60 * 1000, max: 5 },      
  passwordReset: { windowMs: 15 * 60 * 1000, max: 3 }, 
} as const;
