#!/usr/bin/env node
/**
 * Creates (or resets) a test user and seeds every table so the app
 * shows a fully-populated demo account: all 131 lessons complete,
 * all 18 levels unlocked, portfolio, trades, practice, memories,
 * notifications, bookmarks, community.
 *
 * Usage:  node scripts/seed-test-user.mjs
 *   or:   npm run seed:test
 *
 * Configurable via env vars:
 *   TEST_EMAIL=test@praxis.dev
 *   TEST_PASSWORD=Test1234!
 *   TEST_NAME="Test User"
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load .env.local ────────────────────────────────────────────────
function loadEnv() {
  const raw = readFileSync(resolve(__dirname, "..", ".env.local"), "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return out;
}
const env = loadEnv();
const URL = env.SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const sb = createClient(URL, KEY, { auth: { persistSession: false } });

// ── Config ─────────────────────────────────────────────────────────
const EMAIL = process.env.TEST_EMAIL || "test@praxis.dev";
const PASSWORD = process.env.TEST_PASSWORD || "Test1234!";
const NAME = process.env.TEST_NAME || "Test User";

// ── Read real lesson IDs from source (no hardcoded counts) ─────────
function loadLessonIds() {
  const src = readFileSync(
    resolve(__dirname, "..", "src", "lib", "curriculum", "lessons.ts"),
    "utf8",
  );
  const ids = new Set();
  for (const m of src.matchAll(/id:\s*"(\d+\.\d+)"/g)) {
    ids.add(m[1]);
  }
  return [...ids].sort((a, b) => {
    const [a1, a2] = a.split(".").map(Number);
    const [b1, b2] = b.split(".").map(Number);
    return a1 - b1 || a2 - b2;
  });
}

const LESSON_IDS = loadLessonIds();
const LEVELS = [
  ...new Set(LESSON_IDS.map((id) => parseInt(id.split(".")[0], 10))),
].sort((a, b) => a - b);

console.log(
  "Loaded " +
    LESSON_IDS.length +
    " lessons across " +
    LEVELS.length +
    " levels",
);

// ── Time helpers ───────────────────────────────────────────────────
const DAY = 86400000;
const HOUR = 3600000;
const NOW = Date.now();
const daysAgo = (d, h = 10) => new Date(NOW - d * DAY + h * HOUR).toISOString();

// ── Find or create the user ────────────────────────────────────────
async function findOrCreateUser() {
  const listed = await sb.auth.admin.listUsers({ page: 1, perPage: 1000 });
  let user = listed.data?.users.find(
    (u) => (u.email || "").toLowerCase() === EMAIL.toLowerCase(),
  );

  if (user) {
    console.log("User exists: " + user.id + " (" + user.email + ")");
    // Reset password + metadata so credentials are always the documented ones
    await sb.auth.admin.updateUserById(user.id, {
      password: PASSWORD,
      user_metadata: { ...(user.user_metadata ?? {}), name: NAME },
      email_confirm: true,
    });
    return user;
  }

  const created = await sb.auth.admin.createUser({
    email: EMAIL,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: { name: NAME },
  });
  if (created.error) throw created.error;
  console.log("Created user: " + created.data.user.id);
  return created.data.user;
}

// ── Wipe existing rows for this user ───────────────────────────────
async function wipe(userId) {
  const tables = [
    ["practice_snapshots", "user_id"],
    ["practice_trades", "user_id"],
    ["practice_completed", "user_id"],
    ["practice_generated_cards", "user_id"],
    ["practice_portfolios", "user_id"],
    ["mentor_memories", "user_id"],
    ["notifications", "user_id"],
    ["bookmarks", "user_id"],
    ["lesson_progress", "user_id"],
    ["community_replies", "user_id"],
    ["community_reactions", "user_id"],
    ["community_reports", "reporter_user_id"],
    ["community_posts", "user_id"],
    ["community_profiles", "user_id"],
    ["sessions", "user_id"],
  ];
  for (const [table, col] of tables) {
    const { error } = await sb.from(table).delete().eq(col, userId);
    if (error && !/does not exist/.test(error.message)) {
      console.log("  wipe " + table + ": " + error.message);
    }
  }
  console.log("  wiped existing data");
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  SEED TEST USER");
  console.log("════════════════════════════════════════════");
  console.log("");
  console.log("  email:    " + EMAIL);
  console.log("  password: " + PASSWORD);
  console.log("");

  const user = await findOrCreateUser();
  const userId = user.id;
  await wipe(userId);

  // ── 1. Portfolio ───────────────────────────────────────────────
  const START = 100_000;
  const START_DAYS = 180;
  const { data: portfolio, error: pfErr } = await sb
    .from("practice_portfolios")
    .insert({
      user_id: userId,
      starting_capital: START,
      cash: START,
      created_at: daysAgo(START_DAYS, 9),
    })
    .select("id")
    .single();
  if (pfErr) throw pfErr;
  const portfolioId = portfolio.id;
  console.log("  portfolio created (180 days old)");

  // ── 2. Trades ──────────────────────────────────────────────────
  // Format: [daysAgo, hour, side, ticker, shares, price, reason]
  // Scale factor keeps total buys under START so cash stays positive.
  const T = [
    [178, 10, "buy", "SCOM", 800, 26.1, "Opening position. Market leader."],
    [176, 11, "buy", "EQTY", 300, 40.2, "Regional expansion thesis."],
    [174, 14, "buy", "KCB", 500, 32.4, "Trading below book."],
    [172, 10, "buy", "EABL", 150, 158.0, "Consumer staple."],
    [170, 15, "buy", "BAMB", 200, 52.4, "Small-cap exploration."],
    [166, 10, "buy", "SCOM", 200, 27.8, "Adding on weakness."],
    [163, 11, "sell", "BAMB", 50, 60.8, "Taking profit."],
    [160, 15, "buy", "KCB", 300, 34.2, "Bank results approaching."],
    [158, 10, "buy", "COOP", 400, 12.2, "Second bank."],
    [155, 12, "sell", "EQTY", 100, 46.2, "Trimming."],
    [152, 10, "buy", "SCOM", 300, 28.8, "Adding to winner."],
    [148, 14, "buy", "SCBK", 20, 180.0, "Third bank."],
    [145, 11, "sell", "EABL", 50, 168.0, "Trimmed consumer."],
    [140, 10, "buy", "KCB", 200, 31.8, "Adding at better price."],
    [136, 15, "buy", "SCOM", 200, 29.6, "Strong M-Pesa."],
    [132, 10, "sell", "COOP", 150, 14.2, "Taking profit."],
    [128, 14, "buy", "BAMB", 100, 56.4, "Re-entry."],
    [124, 10, "buy", "EQTY", 100, 47.8, "Back to full."],
    [120, 11, "sell", "SCBK", 5, 188.0, "Testing liquidity."],
    [116, 15, "buy", "SCOM", 300, 30.2, "Data revenue growing."],
    [112, 10, "buy", "ABSA", 400, 14.6, "Fourth bank."],
    [108, 14, "sell", "KCB", 200, 36.2, "Taking some off."],
    [104, 10, "buy", "KEGN", 500, 5.1, "Energy thesis."],
    [100, 11, "sell", "ABSA", 100, 16.4, "Partial profit."],
    [96, 15, "buy", "SCOM", 200, 31.8, "Steady accumulation."],
    [92, 10, "buy", "EQTY", 100, 48.6, "Before dividend."],
    [88, 14, "sell", "BAMB", 100, 58.2, "Profit on second round."],
    [84, 10, "buy", "KCB", 300, 33.4, "Back to full."],
    [80, 15, "buy", "SCOM", 150, 32.1, "Final add."],
    [76, 11, "sell", "KEGN", 100, 5.6, "Small profit."],
    [72, 10, "buy", "COOP", 200, 14.4, "Re-entry."],
    [68, 14, "sell", "EQTY", 50, 50.2, "Trimmed into strength."],
    [64, 10, "buy", "SCOM", 200, 32.8, "Last trade of month."],
    [60, 15, "buy", "KCB", 100, 34.2, "Adding on momentum."],
    [56, 10, "buy", "ABSA", 300, 15.4, "Rebuilding."],
    [52, 14, "sell", "COOP", 100, 15.8, "Trimming."],
    [48, 10, "buy", "SCOM", 200, 33.6, "Consistent accumulation."],
    [44, 11, "buy", "EQTY", 100, 51.2, "Dividend increase."],
    [40, 15, "sell", "KCB", 200, 37.8, "Taking profit."],
    [36, 10, "buy", "KEGN", 400, 5.4, "Rebuilding energy."],
    [32, 14, "buy", "BAMB", 150, 60.2, "Third round."],
    [28, 10, "buy", "SCOM", 200, 34.0, "Steady accumulation."],
    [24, 11, "sell", "ABSA", 200, 16.2, "Taking profit."],
    [20, 15, "buy", "KCB", 200, 35.4, "Back to full."],
    [16, 10, "buy", "EQTY", 100, 52.4, "Before earnings."],
    [12, 14, "sell", "SCOM", 100, 34.8, "Rebalancing."],
    [10, 10, "buy", "SCBK", 10, 195.0, "Small add."],
    [8, 15, "buy", "KCB", 200, 36.2, "Adding on weakness."],
    [6, 10, "sell", "KEGN", 200, 5.8, "Taking profit."],
    [4, 14, "buy", "COOP", 200, 16.1, "Third entry."],
    [3, 10, "buy", "SCOM", 200, 35.2, "Continuing plan."],
    [2, 15, "sell", "EQTY", 50, 54.8, "Position too large."],
    [1, 10, "buy", "KCB", 100, 37.4, "Adding on earnings."],
    [0, 15, "buy", "SCOM", 100, 36.1, "Final trade."],
  ];

  const SCALE = 0.42;
  let cash = START;
  const tradeRows = T.map(
    ([days, hour, side, ticker, rawShares, price, reason]) => {
      const shares = Math.max(1, Math.round(rawShares * SCALE));
      const total = Math.round(shares * price * 100) / 100;
      if (side === "buy") cash -= total;
      else cash += total;
      return {
        user_id: userId,
        portfolio_id: portfolioId,
        ticker,
        side,
        shares,
        price,
        total,
        reason,
        executed_at: daysAgo(days, hour),
      };
    },
  );
  const { error: tErr } = await sb.from("practice_trades").insert(tradeRows);
  if (tErr) throw tErr;
  console.log(
    "  inserted " +
      tradeRows.length +
      " trades (cash now KSh " +
      Math.round(cash).toLocaleString() +
      ")",
  );

  await sb
    .from("practice_portfolios")
    .update({ cash: Math.round(cash * 100) / 100 })
    .eq("id", portfolioId);

  // ── 3. Weekly snapshots ────────────────────────────────────────
  const finalValue = cash + 4_200_00;
  const snapshots = [];
  for (let w = 26; w >= 0; w--) {
    const progress = 1 - w / 26;
    const baseline = START + (finalValue - START) * progress;
    const noise = Math.sin(w * 2.1) * 1800 + Math.cos(w * 0.7) * 900;
    const totalValue = Math.round((baseline + noise) * 100) / 100;
    const cashPortion = Math.round(cash * (0.7 + 0.3 * progress));
    snapshots.push({
      user_id: userId,
      portfolio_id: portfolioId,
      total_value: totalValue,
      cash: cashPortion,
      invested: Math.round((totalValue - cashPortion) * 100) / 100,
      taken_at: daysAgo(w * 7, 16),
    });
  }
  const { error: sErr } = await sb.from("practice_snapshots").insert(snapshots);
  if (sErr && !/does not exist/.test(sErr.message)) {
    console.log("  snapshots: " + sErr.message);
  } else if (!sErr) {
    console.log("  inserted " + snapshots.length + " snapshots");
  }

  // ── 4. Practice completions ────────────────────────────────────
  const types = ["scenario", "drill", "mission"];
  const practiceRows = [];
  let dayCursor = 178;
  for (let lvl = 0; lvl <= 17; lvl++) {
    for (let i = 0; i < 3; i++) {
      const t = types[i];
      practiceRows.push({
        user_id: userId,
        card_id: "L" + lvl + "-" + t,
        card_type: t,
        choice_id: t === "scenario" ? ["a", "b", "c"][i] : null,
        passed: (lvl + i) % 7 !== 0,
        response: t === "drill" ? "See framework in brief." : null,
        completed_at: daysAgo(Math.max(0, dayCursor), 14),
      });
      dayCursor -= 0.8;
    }
  }
  const { error: cErr } = await sb
    .from("practice_completed")
    .insert(practiceRows);
  if (cErr) throw cErr;
  console.log("  inserted " + practiceRows.length + " practice completions");

  // ── 5. Mentor memories ─────────────────────────────────────────
  const facts = [
    [
      "correctly identified why a low P/E ratio can signal a value trap",
      "valuation",
    ],
    [
      "prefers working with smaller numbers when learning position sizing",
      "position sizing",
    ],
    ["confused duration with maturity in the bond lesson", "bond mechanics"],
    ["held through a 6% portfolio dip without selling", "behaviour"],
    ["feels confident reading a balance sheet now", "balance sheet"],
    ["correctly predicted the impact of a rate cut on banks", "macro"],
    ["asked how withholding tax affects dividend returns", "tax"],
    [
      "is still unsure about how currencies move with interest rates",
      "currency",
    ],
    [
      "wanted to understand why REITs behave differently from equities",
      "real estate",
    ],
    ["used to confuse revenue with profit before Level 2", "income statement"],
    ["reviewed a company's cash flow statement before trading it", "cash flow"],
    [
      "mentioned wanting to hold three positions across sectors",
      "diversification",
    ],
    ["correctly compared two banks using P/E and P/B together", "valuation"],
    ["found the efficient frontier concept abstract", "portfolio theory"],
    ["understood why oil shocks hit consumer goods first", "commodities"],
    ["avoids banks when NPL ratios rise above 12%", "risk management"],
    ["confused REIT distributions with dividends for tax purposes", "tax"],
    ["asked what a bond's credit rating actually measures", "credit"],
    [
      "correctly described the difference between ETFs and index funds",
      "funds",
    ],
    ["wants to hold through at least one full market cycle", "behaviour"],
    ["uses a written direction document before every trade", "direction"],
    ["asked how the Fed's rate decisions affect the shilling", "macro"],
    ["would not use leverage in FX", "risk management"],
    ["correctly identified why commodities are diversifiers", "commodities"],
    ["checks the reason field before every trade", "behaviour"],
    ["is now confident with P/E comparisons across peer banks", "valuation"],
    ["wants to review their portfolio every three months", "behaviour"],
    ["prefers value investing over growth", "styles"],
    ["asked about the tax treatment of REIT distributions", "tax"],
    ["correctly calculated the current yield on a bond", "bond mechanics"],
    ["found the currency section harder than equities", "currency"],
    [
      "avoided adding to a losing position when the thesis was intact",
      "behaviour",
    ],
    ["wants to understand options before using them", "derivatives"],
    ["correctly identified a bull trap on a daily candle chart", "charts"],
    ["prefers explicit limits on position size", "position sizing"],
    ["wrote a one-page thesis before their most recent buy", "thesis"],
    ["caught themselves about to chase a rally and stopped", "behaviour"],
    [
      "identified the difference between a dividend and a buyback",
      "capital actions",
    ],
    ["wants to learn more about emerging market ETFs", "funds"],
    [
      "said the direction document has been the most useful exercise",
      "direction",
    ],
    [
      "correctly named the three main asset classes in their portfolio",
      "asset classes",
    ],
    ["would rather hold cash than buy without a thesis", "behaviour"],
    ["asked whether bonds still make sense at current yields", "bonds"],
    ["wants to write their own annual review this year", "review"],
    [
      "would not invest in a company they cannot explain in one paragraph",
      "thesis",
    ],
    ["said the biggest lesson was to stop checking prices daily", "behaviour"],
    ["correctly distinguished risk from volatility", "risk"],
    ["asked what the fair P/E for a Kenyan bank should be", "valuation"],
    ["prefers funds over individual stocks for now", "funds"],
    ["still finds charts harder than fundamentals", "charts"],
    ["is learning to sit on their hands between trades", "behaviour"],
    [
      "noticed their portfolio has three banks and asked if that was too concentrated",
      "diversification",
    ],
    ["wants to review their position sizing monthly", "position sizing"],
    ["prefers to write before they buy", "thesis"],
    [
      "said the direction document changed how they think about risk",
      "direction",
    ],
  ];
  const firstName = NAME.split(/\s+/)[0] || "you";
  const memRows = facts.map(([fact, concept], i) => ({
    user_id: userId,
    fact: firstName + " " + fact + ".",
    concept,
    created_at: daysAgo(Math.max(1, 178 - i * 3), 11),
  }));
  const { error: mErr } = await sb.from("mentor_memories").insert(memRows);
  if (mErr) throw mErr;
  console.log("  inserted " + memRows.length + " memories");

  // ── 6. Notifications ───────────────────────────────────────────
  const notifs = [
    [
      "system",
      "Welcome to PRAXIS",
      "Start with Foundations in My Learning.",
      "/learning",
      true,
      180,
    ],
    [
      "practice",
      "Portfolio ready",
      "You have KSh 100,000 to practice with.",
      "/market",
      true,
      180,
    ],
    [
      "practice",
      "First trade placed",
      "You bought SCOM at KSh 26.10.",
      "/portfolio",
      true,
      178,
    ],
    [
      "achievement",
      "First practice card complete",
      "You have started.",
      "/practice",
      true,
      177,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You correctly identified why a low P/E ratio can signal a value trap.",
      "/mentor",
      true,
      178,
    ],
    [
      "community",
      "First community post",
      "You put something into the open.",
      "/community",
      true,
      168,
    ],
    [
      "practice",
      "10 trades placed",
      "You have placed 10 trades.",
      "/portfolio/journal",
      true,
      155,
    ],
    [
      "achievement",
      "10 lessons complete",
      "You are building momentum.",
      "/progress",
      true,
      150,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You feel confident reading a balance sheet now.",
      "/mentor",
      true,
      148,
    ],
    [
      "practice",
      "Mission complete",
      "L0-mission is done.",
      "/practice",
      true,
      145,
    ],
    [
      "achievement",
      "25 practice cards complete",
      "You are building a habit.",
      "/progress",
      true,
      138,
    ],
    [
      "practice",
      "25 trades placed",
      "A serious body of practice.",
      "/progress",
      true,
      128,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You correctly predicted the impact of a rate cut on banks.",
      "/mentor",
      true,
      120,
    ],
    [
      "community",
      "New reply on your post",
      "Brian Otieno replied to your post about liquidity.",
      "/community",
      true,
      110,
    ],
    [
      "achievement",
      "50 practice cards complete",
      "Halfway to a hundred.",
      "/progress",
      true,
      100,
    ],
    [
      "practice",
      "50 trades placed",
      "That is real commitment.",
      "/progress",
      true,
      90,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You held through a 6% portfolio dip without selling.",
      "/mentor",
      false,
      80,
    ],
    [
      "community",
      "New reply on your post",
      "Brian Otieno replied to your post about NPLs.",
      "/community",
      false,
      70,
    ],
    [
      "achievement",
      "5 levels complete",
      "You are making progress across the curriculum.",
      "/learning",
      false,
      60,
    ],
    [
      "practice",
      "Mission complete",
      "L5-mission is done.",
      "/practice",
      false,
      55,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You check the reason field before every trade.",
      "/mentor",
      false,
      45,
    ],
    [
      "community",
      "New reply on your post",
      "Brian Otieno replied to your post about the 6% dip.",
      "/community",
      false,
      35,
    ],
    [
      "achievement",
      "75 practice cards complete",
      "You are now well past half.",
      "/progress",
      false,
      30,
    ],
    [
      "practice",
      "Mission complete",
      "L14-mission is done.",
      "/practice",
      false,
      25,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You wrote a one-page thesis before your most recent buy.",
      "/mentor",
      false,
      20,
    ],
    [
      "community",
      "New reply on your post",
      "Brian Otieno replied to your post about NPLs.",
      "/community",
      false,
      15,
    ],
    [
      "achievement",
      "100 practice cards complete",
      "A serious body of work.",
      "/dashboard",
      false,
      12,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You caught yourself about to chase a rally and stopped.",
      "/mentor",
      false,
      6,
    ],
    [
      "community",
      "New reply on your post",
      "Brian Otieno replied to your thesis post.",
      "/community",
      false,
      3,
    ],
    [
      "mentor",
      "Jema left you a note",
      "You asked whether bonds still make sense at current yields.",
      "/mentor",
      false,
      1,
    ],
  ];
  const notifRows = notifs.map(([kind, title, body, href, read, d]) => ({
    user_id: userId,
    kind,
    title,
    body,
    href,
    read,
    created_at: daysAgo(d, 9),
  }));
  const { error: nErr } = await sb.from("notifications").insert(notifRows);
  if (nErr) throw nErr;
  console.log(
    "  inserted " +
      notifRows.length +
      " notifications (" +
      notifRows.filter((n) => !n.read).length +
      " unread)",
  );

  // ── 7. Bookmarks ───────────────────────────────────────────────
  const bms = [
    [
      "concept",
      "14.4",
      "Position sizing",
      "How much of a portfolio goes into one idea.",
      "/learning/lesson/14-4",
    ],
    [
      "company",
      "SCOM",
      "Safaricom PLC",
      "Telecommunications, NSE",
      "/market/SCOM",
    ],
    [
      "concept",
      "2.4",
      "Reading a balance sheet",
      "Assets, liabilities, what they mean.",
      "/learning/lesson/2-4",
    ],
    [
      "company",
      "EQTY",
      "Equity Group Holdings",
      "Banking, NSE",
      "/market/EQTY",
    ],
    [
      "concept",
      "13.6",
      "Writing your direction document",
      "One page, six sections.",
      "/learning/lesson/13-6",
    ],
    ["company", "KCB", "KCB Group", "Banking, NSE", "/market/KCB"],
    [
      "concept",
      "15.2",
      "Loss aversion",
      "Why losses hurt twice as much.",
      "/learning/lesson/15-2",
    ],
    [
      "company",
      "EABL",
      "East African Breweries",
      "Consumer Goods, NSE",
      "/market/EABL",
    ],
    [
      "concept",
      "3.3",
      "P/E in context",
      "A P/E ratio means nothing on its own.",
      "/learning/lesson/3-3",
    ],
    [
      "concept",
      "5.4",
      "Concentration risk",
      "When too much of a portfolio sits in one holding.",
      "/learning/lesson/5-4",
    ],
    ["company", "COOP", "Co-operative Bank", "Banking, NSE", "/market/COOP"],
    [
      "concept",
      "12.5",
      "Real estate and REITs",
      "How REITs make real estate accessible.",
      "/learning/lesson/12-5",
    ],
    [
      "concept",
      "16.3",
      "The annual review",
      "Two rebalancing dates a year.",
      "/learning/lesson/16-3",
    ],
    ["company", "KEGN", "KenGen", "Energy, NSE", "/market/KEGN"],
    [
      "concept",
      "17.3",
      "Currency risk",
      "USD/KES moves affect your US holdings.",
      "/learning/lesson/17-3",
    ],
  ];
  const bmRows = bms.map(([ttype, tid, title, desc, href], i) => ({
    user_id: userId,
    target_type: ttype,
    target_id: tid,
    title,
    description: desc,
    href,
    created_at: daysAgo(Math.max(1, 160 - i * 8), 15),
  }));
  const { error: bErr } = await sb.from("bookmarks").insert(bmRows);
  if (bErr) throw bErr;
  console.log("  inserted " + bmRows.length + " bookmarks");

  // ── 8. Lesson progress (ALL lessons + quiz markers) ────────────
  const lessonRows = LESSON_IDS.map((id, i) => ({
    user_id: userId,
    lesson_id: id,
    completed_at: daysAgo(Math.max(0, 178 - Math.floor(i * 1.3)), 8),
  }));
  const { error: lErr } = await sb.from("lesson_progress").insert(lessonRows);
  if (lErr) throw lErr;
  console.log("  inserted " + lessonRows.length + " lessons");

  const quizRows = LEVELS.map((lvl) => ({
    user_id: userId,
    lesson_id: "quiz-" + lvl,
    completed_at: new Date().toISOString(),
  }));
  const { error: qErr } = await sb.from("lesson_progress").insert(quizRows);
  if (qErr) throw qErr;
  console.log(
    "  inserted " + quizRows.length + " quiz markers (all levels unlocked)",
  );

  // ── 9. Community ───────────────────────────────────────────────
  const initials =
    NAME.split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "TU";
  const posts = [
    {
      kind: "question",
      title: "How do you evaluate a bank when NPLs are rising?",
      body: "I'm looking at a bank trading below book. Their NPL ratio went from 8% to 11% in the last two quarters. Is the discount justified, or is this an opportunity?",
      tags: ["banking", "valuation"],
      replies: 2,
      helpful: 4,
      days: 165,
    },
    {
      kind: "win",
      title: "Held through a 6% dip without selling",
      body: "My portfolio dropped 6% in a week and I didn't sell anything. Six months ago I would have panic-sold. The direction document really does help.",
      tags: ["psychology", "direction"],
      replies: 2,
      helpful: 6,
      days: 150,
    },
    {
      kind: "discussion",
      title: "Why I stopped comparing P/E across industries",
      body: "Used to think a bank at 5x was always cheaper than a consumer name at 15x. Then I read Level 3 properly. The context matters more than the number.",
      tags: ["valuation"],
      replies: 2,
      helpful: 5,
      days: 135,
    },
    {
      kind: "question",
      title: "Bond duration: does it matter for Kenyan retail?",
      body: "Most Kenyan bond exposure is short-term T-bills. Does duration even matter if you're holding to maturity?",
      tags: ["bonds"],
      replies: 1,
      helpful: 3,
      days: 120,
    },
    {
      kind: "challenge",
      title: "Committed to writing a thesis for every new position",
      body: "Starting this week, I will not place a buy without a one-page thesis.",
      tags: ["thesis", "discipline"],
      replies: 2,
      helpful: 8,
      days: 105,
    },
    {
      kind: "win",
      title: "First positive month after eight months of practice",
      body: "Finally had a month where my portfolio outperformed the NASI. Small win but encouraging.",
      tags: ["psychology"],
      replies: 2,
      helpful: 4,
      days: 90,
    },
    {
      kind: "discussion",
      title: "What does a direction document actually look like?",
      body: "People keep mentioning this. Here's mine, would welcome feedback. Goals, horizon, capacity, tolerance, constraints, values. One page.",
      tags: ["direction"],
      replies: 2,
      helpful: 6,
      days: 72,
    },
    {
      kind: "question",
      title:
        "Should I rebalance when the market moves, or wait for the calendar?",
      body: "I set 1 January and 1 July as my rebalance dates. But the market moved a lot this quarter.",
      tags: ["rebalancing"],
      replies: 2,
      helpful: 4,
      days: 60,
    },
    {
      kind: "discussion",
      title: "Three banks is too many. Here's why I'm changing it",
      body: "I realized my portfolio is 60% banking. It works until it doesn't. Adding a manufacturing position this month.",
      tags: ["diversification"],
      replies: 1,
      helpful: 5,
      days: 45,
    },
    {
      kind: "win",
      title: "Wrote my first annual review",
      body: "Reviewed every position against the thesis I wrote. Sold two because the thesis broke.",
      tags: ["review"],
      replies: 2,
      helpful: 7,
      days: 30,
    },
    {
      kind: "challenge",
      title: "30-day no-trade challenge",
      body: "Committed to not placing a single trade for 30 days. Learning to sit on my hands.",
      tags: ["psychology"],
      replies: 2,
      helpful: 4,
      days: 15,
    },
    {
      kind: "discussion",
      title: "The number I stopped watching",
      body: "I stopped checking my portfolio value daily. Two months in. It's made me a better investor.",
      tags: ["psychology"],
      replies: 1,
      helpful: 9,
      days: 6,
    },
  ];
  const { data: postRows, error: cpErr } = await sb
    .from("community_posts")
    .insert(
      posts.map((p) => ({
        user_id: userId,
        author_name: NAME,
        author_initials: initials,
        author_color: "#2563eb",
        kind: p.kind,
        title: p.title,
        body: p.body,
        tags: p.tags,
        reply_count: p.replies,
        helpful_count: p.helpful,
        created_at: daysAgo(p.days, 13),
        updated_at: daysAgo(p.days, 13),
      })),
    )
    .select("id, title");
  if (cpErr) throw cpErr;
  console.log("  inserted " + postRows.length + " community posts");

  // Replies from "another user"
  const replyRows = [];
  for (const row of postRows) {
    const count = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < count; i++) {
      replyRows.push({
        post_id: row.id,
        user_id: "demo-other-user",
        author_name: "Brian Otieno",
        author_initials: "BO",
        author_color: "#0d9488",
        body: "Good insight. This matches what I've been seeing in my own portfolio.",
        helpful_count: Math.floor(Math.random() * 4),
        created_at: daysAgo(Math.max(1, 60 - i * 10), 9),
      });
    }
  }
  const { error: rErr } = await sb.from("community_replies").insert(replyRows);
  if (rErr && !/duplicate/.test(rErr.message)) throw rErr;
  console.log("  inserted " + replyRows.length + " community replies");

  // ── Done ──────────────────────────────────────────────────────
  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  SEED COMPLETE");
  console.log("════════════════════════════════════════════");
  console.log("");
  console.log("  Login:         " + EMAIL);
  console.log("  Password:      " + PASSWORD);
  console.log("");
  console.log(
    "  Lessons:       " + lessonRows.length + " / " + LESSON_IDS.length,
  );
  console.log(
    "  Quiz markers:  " +
      quizRows.length +
      " (all " +
      LEVELS.length +
      " levels unlocked)",
  );
  console.log("  Trades:        " + tradeRows.length);
  console.log("  Snapshots:     " + snapshots.length);
  console.log("  Practice:      " + practiceRows.length);
  console.log("  Memories:      " + memRows.length);
  console.log(
    "  Notifications: " +
      notifRows.length +
      " (" +
      notifRows.filter((n) => !n.read).length +
      " unread)",
  );
  console.log("  Bookmarks:     " + bmRows.length);
  console.log(
    "  Community:     " +
      postRows.length +
      " posts, " +
      replyRows.length +
      " replies",
  );
  console.log("");
  console.log("  Final cash:    KSh " + Math.round(cash).toLocaleString());
  console.log("");
}

main().catch((err) => {
  console.error("");
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
});
