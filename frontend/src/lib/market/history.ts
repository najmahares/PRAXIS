



import { promises as fs } from "fs";
import type { HistoryPoint } from "./types";

type HistoryMap = Record<string, HistoryPoint[]>;
import path from "path";


const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? "";
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
const REDIS_KEY = "praxis:market:history";
const HAS_REDIS = REDIS_URL.length > 0 && REDIS_TOKEN.length > 0;

const HISTORY_FILE = path.join(process.cwd(), "data", "market-history.json");
const HISTORY_FILE_TMP = HISTORY_FILE + ".tmp";

async function redisCommand(cmd: string[]): Promise<unknown> {
  const res = await fetch(REDIS_URL + "/" + cmd.map(encodeURIComponent).join("/"), {
    headers: { Authorization: "Bearer " + REDIS_TOKEN },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("redis " + res.status);
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function readHistory(): Promise<HistoryMap> {
  if (HAS_REDIS) {
    try {
      const raw = await redisCommand(["GET", REDIS_KEY]);
      if (typeof raw === "string" && raw.length > 0) {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? (parsed as HistoryMap) : {};
      }
      return {};
    } catch {
      return {};
    }
  }
  
  try {
    const raw = await fs.readFile(HISTORY_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as HistoryMap) : {};
  } catch {
    return {};
  }
}

async function writeHistory(h: HistoryMap): Promise<void> {
  if (HAS_REDIS) {
    try {
      await redisCommand(["SET", REDIS_KEY, JSON.stringify(h)]);
    } catch {
      
    }
    return;
  }
  try {
    await fs.mkdir(path.dirname(HISTORY_FILE), { recursive: true });
    await fs.writeFile(HISTORY_FILE_TMP, JSON.stringify(h), "utf8");
    await fs.rename(HISTORY_FILE_TMP, HISTORY_FILE);
  } catch {
    
  }
}

export async function recordSnapshot(
  stocks: { ticker: string; priceKsh: number }[]
): Promise<void> {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const history = await readHistory();
  for (const s of stocks) {
    if (!s.ticker || !Number.isFinite(s.priceKsh) || s.priceKsh <= 0) continue;
    const arr = history[s.ticker] ?? [];
    const last = arr[arr.length - 1];
    if (
      last &&
      last.p === s.priceKsh &&
      now - new Date(last.t).getTime() < 30 * 60 * 1000
    ) {
      continue;
    }
    arr.push({ t: nowIso, p: s.priceKsh });
    if (arr.length > 2000) arr.splice(0, arr.length - 2000);
    history[s.ticker] = arr;
  }
  await writeHistory(history);
}

export async function getPriceHistory(ticker: string): Promise<HistoryPoint[]> {
  const history = await readHistory();
  return history[ticker.toUpperCase()] ?? [];
}

export function historyBackend(): "redis" | "fs" {
  return HAS_REDIS ? "redis" : "fs";
}
