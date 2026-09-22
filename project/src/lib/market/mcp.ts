




import { getSectorForTicker } from "./tickerSectors";
import { recordSnapshot, getPriceHistory } from "./history";
export { getPriceHistory } from "./history";

const MCP_URL = "https://mcp.mansamarkets.com/mcp";
const MCP_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  "Accept": "application/json, text/event-stream",
};
const FETCH_TIMEOUT_MS = 8000;
const SESSION_TTL_MS = 5 * 60 * 1000;



import type { KenyaStock, KenyaMover, KenyaIndex, HistoryPoint } from "./types";
export type { KenyaStock, KenyaMover, KenyaIndex, HistoryPoint } from "./types";



let sessionCache: { sid: string; expires: number } | null = null;

async function fetchWithTimeout(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

async function openSession(): Promise<string> {
  if (sessionCache && sessionCache.expires > Date.now()) {
    return sessionCache.sid;
  }
  const initRes = await fetchWithTimeout(MCP_URL, {
    method: "POST",
    headers: MCP_HEADERS,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "praxis", version: "1.0.0" },
      },
    }),
  });
  if (!initRes.ok) throw new Error("MCP initialize failed: " + initRes.status);
  const sid = initRes.headers.get("mcp-session-id") ?? "";
  await fetchWithTimeout(MCP_URL, {
    method: "POST",
    headers: { ...MCP_HEADERS, "Mcp-Session-Id": sid },
    body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
  });
  sessionCache = { sid, expires: Date.now() + SESSION_TTL_MS };
  return sid;
}



function extractJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    
  }
  const dataLines = text.split("\n").filter((l) => l.startsWith("data:"));
  for (const line of dataLines) {
    try {
      const parsed = JSON.parse(line.slice(5).trim());
      if (parsed && (parsed.result || parsed.error)) return parsed;
    } catch {
      
    }
  }
  return null;
}

async function callToolOnce(name: string, args: Record<string, unknown>): Promise<unknown> {
  const sid = await openSession();
  const res = await fetchWithTimeout(MCP_URL, {
    method: "POST",
    headers: { ...MCP_HEADERS, "Mcp-Session-Id": sid },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Math.floor(Math.random() * 1e9),
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const raw = await res.text();
  const envelope = extractJson(raw) as {
    result?: { content?: Array<{ text?: string }> };
  } | null;
  const inner = envelope?.result?.content?.[0]?.text;
  if (typeof inner !== "string") return null;
  try {
    return JSON.parse(inner);
  } catch {
    return null;
  }
}

async function callToolInner(name: string, args: Record<string, unknown>): Promise<unknown> {
  const sid = await openSession();
  const res = await fetchWithTimeout(MCP_URL, {
    method: "POST",
    headers: { ...MCP_HEADERS, "Mcp-Session-Id": sid },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Math.floor(Math.random() * 1e9),
      method: "tools/call",
      params: { name, arguments: args },
    }),
  });
  const raw = await res.text();
  const envelope = extractJson(raw) as {
    result?: { content?: Array<{ text?: string }> };
  } | null;
  const inner = envelope?.result?.content?.[0]?.text;
  if (typeof inner !== "string") return null;
  try {
    return JSON.parse(inner);
  } catch {
    return null;
  }
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  return withRetry(async () => {
    try {
      return await callToolInner(name, args);
    } catch {
      
      sessionCache = null;
      throw new Error("mcp_retry");
    }
  });
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const n = Number(v.replace(/[^0-9.\-]/g, ""));
      if (Number.isFinite(n)) return n;
    }
  }
  return null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.trim().length) return v;
  }
  return null;
}

function normalizeStock(raw: Record<string, unknown>): KenyaStock | null {
  const ticker = pickString(raw, ["ticker", "symbol", "code"]);
  if (!ticker) return null;
  const upper = ticker.toUpperCase();
  const name =
    pickString(raw, ["name", "company_name", "company", "security"]) ?? upper;
  const price =
    pickNumber(raw, ["price", "close", "last_price", "lastPrice", "last_traded_price"]) ?? 0;
  const changeKsh =
    pickNumber(raw, ["change", "price_change", "net_change"]) ?? 0;
  const changePct =
    pickNumber(raw, ["change_pct", "change_percent", "percent_change", "pct_change"]) ?? 0;
  const volume = pickNumber(raw, ["volume", "vol", "traded_volume"]);
  const marketCapRaw = pickNumber(raw, ["market_cap", "marketCap", "market_cap_b"]);
  const marketCapB =
    marketCapRaw === null ? null : marketCapRaw > 1e6 ? marketCapRaw / 1e9 : marketCapRaw;
  const sector =
    pickString(raw, ["sector", "industry"]) ?? getSectorForTicker(upper) ?? null;
  return {
    ticker: upper,
    name,
    priceKsh: price,
    changeKsh,
    changePct,
    volume,
    marketCapB,
    sector,
  };
}

function extractArray(payload: unknown, keys: string[]): Record<string, unknown>[] {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];
  if (typeof payload !== "object") return [];
  const obj = payload as Record<string, unknown>;
  for (const k of keys) {
    const v = obj[k];
    if (Array.isArray(v)) return v as Record<string, unknown>[];
  }
  for (const v of Object.values(obj)) {
    if (Array.isArray(v)) return v as Record<string, unknown>[];
  }
  return [];
}



type CacheEntry<T> = { value: T; expires: number; soft: number };
const memory = new Map<string, CacheEntry<unknown>>();
const TTL_MS = 5 * 60 * 1000;             
const STALE_TTL_MS = 30 * 60 * 1000;      

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = memory.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;

  try {
    const value = await fn();
    const now = Date.now();
    memory.set(key, {
      value,
      expires: now + TTL_MS,
      soft: now + TTL_MS + STALE_TTL_MS,
    });
    return value;
  } catch {
    
    if (hit && hit.soft > Date.now()) return hit.value as T;
    throw new Error("MCP unavailable and no cached value for " + key);
  }
}






async function sleepBackoff(attempt: number): Promise<void> {
  const ms = Math.min(2000, 200 * Math.pow(2, attempt));
  await new Promise((r) => setTimeout(r, ms));
}





async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < maxAttempts - 1) await sleepBackoff(attempt);
    }
  }
  throw lastErr;
}



export async function getKenyaStocks(): Promise<KenyaStock[]> {
  return cached("kenya-stocks", async () => {
    const payload = await callTool("get_african_exchange_stocks", {
      exchange: "kenya",
      limit: 200,
      sort_by: "market_cap",
      order: "desc",
    });
    const rows = extractArray(payload, ["stocks", "data", "results"]);
    const parsed = rows
      .map((r) => normalizeStock(r))
      .filter((s): s is KenyaStock => s !== null);
    void recordSnapshot(parsed);
    return parsed;
  });
}

export async function getKenyaMovers(): Promise<{ gainers: KenyaMover[]; losers: KenyaMover[] }> {
  return cached("kenya-movers", async () => {
    const payload = await callTool("get_african_exchange_movers", {
      exchange: "kenya",
      limit: 6,
      type: "both",
    });
    const obj = (payload ?? {}) as Record<string, unknown>;
    const gainersRaw = (obj.gainers ?? []) as Record<string, unknown>[];
    const losersRaw = (obj.losers ?? []) as Record<string, unknown>[];

    const gainers: KenyaMover[] = gainersRaw
      .map((r): KenyaMover | null => {
        const s = normalizeStock(r);
        return s ? { ...s, direction: "gainers" } : null;
      })
      .filter((x): x is KenyaMover => x !== null);

    const losers: KenyaMover[] = losersRaw
      .map((r): KenyaMover | null => {
        const s = normalizeStock(r);
        return s ? { ...s, direction: "losers" } : null;
      })
      .filter((x): x is KenyaMover => x !== null);

    return { gainers, losers };
  });
}

export async function getKenyaIndex(): Promise<KenyaIndex | null> {
  return cached("kenya-index", async () => {
    const payload = await callTool("get_african_indices", {});
    const rows = extractArray(payload, ["indices"]);
    const kenya = rows.find((r) => {
      const mid = (r.market_id ?? r.market ?? r.exchange ?? "") as string;
      return String(mid).toLowerCase() === "kenya";
    });
    if (!kenya) return null;
    return {
      name: (pickString(kenya, ["index_name", "name"]) ?? "NASI") as string,
      value: pickNumber(kenya, ["index_value", "value"]) ?? 0,
      change: pickNumber(kenya, ["index_change", "change"]),
      changePct: pickNumber(kenya, ["index_change_pct", "change_pct", "percent_change"]),
      ytdChange: pickString(kenya, ["ytd_change"]),
      scrapedAt: pickString(kenya, ["scraped_at"]),
    };
  });
}

export async function getLiveQuote(ticker: string): Promise<KenyaStock | null> {
  const stocks = await getKenyaStocks();
  const upper = ticker.toUpperCase();
  return stocks.find((s) => s.ticker === upper) ?? null;
}
