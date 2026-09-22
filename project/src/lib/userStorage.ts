





const OWNER_KEY = "praxis_storage_owner";
const VERSION_KEY = "praxis_storage_version";
const STORAGE_VERSION = 2;

const PRESERVE = new Set([
  "praxis_storage_owner",
  "praxis_storage_version",
  "praxis_theme",
]);

export type ClaimResult = {
  switched: boolean;
  clearedLocal: number;
  clearedSession: number;
  reason: "same-user" | "owner-mismatch" | "version-bump";
};

function enumerate(storage: Storage): string[] {
  const out: string[] = [];
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i);
    if (k) out.push(k);
  }
  return out;
}

export function claimStorageForUser(userId: string): ClaimResult {
  if (typeof window === "undefined") {
    return { switched: false, clearedLocal: 0, clearedSession: 0, reason: "same-user" };
  }

  const owner = window.localStorage.getItem(OWNER_KEY);
  const version = Number(window.localStorage.getItem(VERSION_KEY) ?? "0");

  const ownerMismatch = owner !== null && owner !== userId;
  const versionBump = version < STORAGE_VERSION;

  if (!ownerMismatch && !versionBump && owner === userId) {
    return { switched: false, clearedLocal: 0, clearedSession: 0, reason: "same-user" };
  }

  const reason = ownerMismatch ? "owner-mismatch" : versionBump ? "version-bump" : "same-user";
  let clearedLocal = 0;
  let clearedSession = 0;

  for (const key of enumerate(window.localStorage)) {
    if (!key.startsWith("praxis")) continue;
    if (PRESERVE.has(key)) continue;
    window.localStorage.removeItem(key);
    clearedLocal++;
  }

  for (const key of enumerate(window.sessionStorage)) {
    if (!key.startsWith("praxis")) continue;
    window.sessionStorage.removeItem(key);
    clearedSession++;
  }

  window.localStorage.setItem(OWNER_KEY, userId);
  window.localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));

  
  console.log(
    "[storage] claimed for " + userId + " (" + reason + "), " +
    clearedLocal + " local key(s), " + clearedSession + " session key(s) cleared"
  );

  return { switched: true, clearedLocal, clearedSession, reason };
}
