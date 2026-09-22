#!/usr/bin/env node
/**
 * Deletes all e2e test users from Supabase auth.
 * Run occasionally to keep the auth table clean.
 *
 *   node scripts/cleanup-e2e-users.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}
const env = loadEnv();
const sb = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, {
  auth: { persistSession: false },
});

let deleted = 0;
let page = 1;
while (true) {
  const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) throw error;
  const toDelete = data.users.filter((u) =>
    (u.email ?? "").includes("@praxis-test.local")
  );
  for (const u of toDelete) {
    await sb.auth.admin.deleteUser(u.id);
    deleted += 1;
    console.log(`  deleted ${u.email}`);
  }
  if (data.users.length < 1000) break;
  page += 1;
}
console.log(`\n  ${deleted} test user(s) removed`);
