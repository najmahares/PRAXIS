import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logEvent } from "@/lib/events/logger";

let limiter: Ratelimit | null = null;
let warnedOnce = false;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(120, "1 m"),
      prefix: "praxis:rl",
      analytics: false,
    });
  }
  return limiter;
}

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  reset: number;
};






export async function checkUserRateLimit(userId: string): Promise<RateLimitResult> {
  const l = getLimiter();
  if (!l) {
    if (!warnedOnce && process.env.NODE_ENV !== "production") {
      console.info("[rate-limit] Upstash not configured, rate limiting disabled");
      warnedOnce = true;
    }
    return { ok: true, limit: Infinity, remaining: Infinity, reset: 0 };
  }
  try {
    const res = await l.limit(userId);
    if (!res.success) {
      logEvent({
        userId,
        eventType: "rate_limit.hit",
        metadata: {
          limit: res.limit,
          remaining: res.remaining,
          reset: res.reset,
        },
      });
    }
    return {
      ok: res.success,
      limit: res.limit,
      remaining: res.remaining,
      reset: res.reset,
    };
  } catch {
    return { ok: true, limit: Infinity, remaining: Infinity, reset: 0 };
  }
}
