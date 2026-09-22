#!/usr/bin/env node
/**
 * Rich demo seed for PRAXIS, extended version.
 * Usage:  npm run seed -- you@example.com
 * Idempotent: wipes the user's existing rows before inserting.
 *
 * Produces roughly:
 *   practice_trades             65
 *   practice_snapshots          26 (weekly)
 *   practice_completed         130
 *   mentor_memories             55
 *   notifications               30
 *   bookmarks                   15
 *   lesson_progress            110
 *   community_posts             12
 *   community_replies           20
 *   community_reactions         30
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
const URL = env.SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL || !KEY) { console.error("Missing SUPABASE_URL or SERVICE_KEY"); process.exit(1); }

const email = process.argv[2];
if (!email) { console.error("Usage: npm run seed -- <email>"); process.exit(1); }

const sb = createClient(URL, KEY, { auth: { persistSession: false } });

const DAY = 86400000;
const HOUR = 3600000;
const NOW = Date.now();
const daysAgo = (d, h = 10) => new Date(NOW - d * DAY + h * HOUR).toISOString();

async function findUser(email) {
  const t = email.trim().toLowerCase();
  let page = 1;
  while (true) {
    const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    const u = data.users.find((x) => (x.email ?? "").toLowerCase() === t);
    if (u) return u;
    if (data.users.length < 1000) return null;
    page += 1;
  }
}

async function main() {
  console.log("Seeding expanded demo data for " + email + "...\n");

  const user = await findUser(email);
  if (!user) {
    const { data } = await sb.auth.admin.listUsers({ page: 1, perPage: 20 });
    console.error("No user found. Available: " + (data?.users ?? []).map((u) => u.email).join(", "));
    process.exit(1);
  }
  const userId = user.id;
  const userName = user.user_metadata?.name || (user.email ?? "").split("@")[0];
  const userFirstName = userName.split(/\s+/)[0] || "you";
  const initials = userName.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "??";
  console.log("  user: " + userId + " (" + userName + ")");

  // ── wipe ─────────────────────────────────────────────────────────
  const wipe = [
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
  ];
  for (const [t, c] of wipe) {
    const { error } = await sb.from(t).delete().eq(c, userId);
    if (error && !/does not exist/.test(error.message)) {
      console.log("  wipe " + t + ": " + error.message);
    }
  }
  console.log("  wiped existing data");

  // ── portfolio ────────────────────────────────────────────────────
  const START = 100_000;
  const START_DAYS = 180;
  const { data: pf, error: pfErr } = await sb
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
  const portfolioId = pf.id;
  console.log("  portfolio created (180 days old)");

  // ── trades ───────────────────────────────────────────────────────
  // Format: [daysAgo, hour, side, ticker, shares, price, reason]
  const T = [
    // Month 1: opening positions
    [178, 10, "buy", "SCOM", 800, 26.10, "Opening position. Market leader, M-Pesa revenue compounding."],
    [176, 11, "buy", "EQTY", 300, 40.20, "Regional expansion thesis. Strong retail franchise in DRC."],
    [174, 14, "buy", "KCB", 500, 32.40, "Trading below book. Classic value setup."],
    [172, 10, "buy", "EABL", 150, 158.00, "Consumer staple. Testing whether the sector is oversold."],
    [170, 15, "buy", "BAMB", 200, 52.40, "Small cap exploration. Testing liquidity tolerance."],
    // Month 2: adding
    [166, 10, "buy", "SCOM", 200, 27.80, "Adding on weakness. Same thesis holds."],
    [163, 11, "sell", "BAMB", 50, 60.80, "Taking some profit on the small-cap experiment."],
    [160, 15, "buy", "KCB", 300, 34.20, "Adding. Bank results season approaching."],
    [158, 10, "buy", "COOP", 400, 12.20, "Second bank position. Smaller, faster growing."],
    [155, 12, "sell", "EQTY", 100, 46.20, "Trimming. Position grew past 8% of portfolio."],
    [152, 10, "buy", "SCOM", 300, 28.80, "Earnings beat. Adding to the winner."],
    [148, 14, "buy", "SCBK", 20, 180.00, "Third bank. Standard Chartered for stability."],
    [145, 11, "sell", "EABL", 50, 168.00, "Trimmed consumer exposure. Position flat."],
    // Month 3
    [140, 10, "buy", "KCB", 200, 31.80, "Bank sell-off. Adding at a better price."],
    [136, 15, "buy", "SCOM", 200, 29.60, "M-Pesa growth commentary was strong."],
    [132, 10, "sell", "COOP", 150, 14.20, "Taking profit. Up 16% in six weeks."],
    [128, 14, "buy", "BAMB", 100, 56.40, "Re-entering the agricultural position."],
    [124, 10, "buy", "EQTY", 100, 47.80, "Back to a full position after the trim."],
    [120, 11, "sell", "SCBK", 5, 188.00, "Small sale to test pricing on a low-volume name."],
    [116, 15, "buy", "SCOM", 300, 30.20, "Adding. Data revenue continues to grow."],
    // Month 4
    [112, 10, "buy", "ABSA", 400, 14.60, "Fourth bank. Diversifying within the sector."],
    [108, 14, "sell", "KCB", 200, 36.20, "Bank rally. Taking some off the table."],
    [104, 10, "buy", "KEGN", 500, 5.10, "Energy position. Long-term power demand thesis."],
    [100, 11, "sell", "ABSA", 100, 16.40, "Partial profit on the round-trip trade."],
    [96, 15, "buy", "SCOM", 200, 31.80, "Steady accumulation. Best position in the portfolio."],
    [92, 10, "buy", "EQTY", 100, 48.60, "Adding before dividend announcement."],
    [88, 14, "sell", "BAMB", 100, 58.20, "Taking profit on the second small-cap round."],
    // Month 5
    [84, 10, "buy", "KCB", 300, 33.40, "Back to a full bank position."],
    [80, 15, "buy", "SCOM", 150, 32.10, "Final add. M-Pesa is the best business on the exchange."],
    [76, 11, "sell", "KEGN", 100, 5.60, "Small profit on the energy position."],
    [72, 10, "buy", "COOP", 200, 14.40, "Re-entering the second bank."],
    [68, 14, "sell", "EQTY", 50, 50.20, "Trimmed into strength after the dividend."],
    [64, 10, "buy", "SCOM", 200, 32.80, "Last trade for the month. Best thesis in the book."],
    [60, 15, "buy", "KCB", 100, 34.20, "Adding on earnings momentum."],
    // Month 6
    [56, 10, "buy", "ABSA", 300, 15.40, "Rebuilding the fourth bank position."],
    [52, 14, "sell", "COOP", 100, 15.80, "Trimming after a strong run."],
    [48, 10, "buy", "SCOM", 200, 33.60, "Consistent accumulation."],
    [44, 11, "buy", "EQTY", 100, 51.20, "Adding. Dividend increase confirmed."],
    [40, 15, "sell", "KCB", 200, 37.80, "Taking some profit at the high end of the range."],
    [36, 10, "buy", "KEGN", 400, 5.40, "Rebuilding energy exposure."],
    [32, 14, "buy", "BAMB", 150, 60.20, "Third round on the agricultural position."],
    [28, 10, "buy", "SCOM", 200, 34.00, "Steady accumulation."],
    [24, 11, "sell", "ABSA", 200, 16.20, "Taking profit on the second round."],
    [20, 15, "buy", "KCB", 200, 35.40, "Back to a full position."],
    // Recent weeks
    [16, 10, "buy", "EQTY", 100, 52.40, "Adding before the next earnings report."],
    [12, 14, "sell", "SCOM", 100, 34.80, "Small sale for rebalancing."],
    [10, 10, "buy", "SCBK", 10, 195.00, "Small add to the Standard Chartered position."],
    [8, 15, "buy", "KCB", 200, 36.20, "Adding on weakness."],
    [6, 10, "sell", "KEGN", 200, 5.80, "Taking profit on the energy round."],
    [4, 14, "buy", "COOP", 200, 16.10, "Third entry on the second bank."],
    [3, 10, "buy", "SCOM", 200, 35.20, "Continuing the plan."],
    [2, 15, "sell", "EQTY", 50, 54.80, "Trimming a position that grew too large."],
    [1, 10, "buy", "KCB", 100, 37.40, "Adding on earnings."],
    [0, 15, "buy", "SCOM", 100, 36.10, "Final trade. Consistent with the thesis."],
  ];

  let cash = START;
  const tradeRows = T.map(([days, hour, side, ticker, shares, price, reason]) => {
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
  });
  const { error: tErr } = await sb.from("practice_trades").insert(tradeRows);
  if (tErr) throw tErr;
  console.log("  inserted " + tradeRows.length + " trades across 180 days");

  await sb.from("practice_portfolios").update({ cash: Math.round(cash * 100) / 100 }).eq("id", portfolioId);
  console.log("  cash balance: KSh " + cash.toLocaleString("en-KE"));

  // ── weekly portfolio snapshots ───────────────────────────────────
  // 26 weeks, trending upward with realistic noise. Approximates the
  // final portfolio value as a function of time.
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
    console.log("  inserted " + snapshots.length + " weekly snapshots");
  }

  // ── practice completions ─────────────────────────────────────────
  const practicePool = [];
  const types = ["scenario", "drill", "mission"];
  const levelCounts = [
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
    [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],
    [12, 3], [13, 3], [14, 3], [15, 3], [16, 3], [17, 3],
  ];
  // Add an extra cycle for levels 0-9 so those show as fully done
  const extraCounts = [
    [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
    [6, 3], [7, 3], [8, 3], [9, 3],
  ];

  let dayCursor = 178;
  const pushCards = (counts) => {
    for (const [lvl, count] of counts) {
      for (let i = 0; i < count; i++) {
        const t = types[i % types.length];
        const cardId = "L" + lvl + "-" + t;
        if (practicePool.find((p) => p.card_id === cardId)) continue;
        const passed = (lvl + i) % 7 !== 0;
        practicePool.push({
          user_id: userId,
          card_id: cardId,
          card_type: t,
          choice_id: t === "scenario" ? ["a", "b", "c"][i % 3] : null,
          passed,
          response: t === "drill" ? "See the framework in the brief." : null,
          completed_at: daysAgo(Math.max(0, dayCursor), 14),
        });
        dayCursor -= 0.8;
      }
    }
  };
  pushCards(levelCounts);
  pushCards(extraCounts);

  const { error: cErr } = await sb.from("practice_completed").insert(practicePool);
  if (cErr) throw cErr;
  console.log("  inserted " + practicePool.length + " practice completions");

  // ── memories ─────────────────────────────────────────────────────
  const memories = [
    ["Anaya correctly identified why a low P/E ratio can signal a value trap.", "valuation", 178],
    ["Anaya prefers working with smaller numbers when learning position sizing.", "position sizing", 172],
    ["Anaya confused duration with maturity in the bond lesson.", "bond mechanics", 165],
    ["Anaya held through a 6% portfolio dip without selling.", "behaviour", 158],
    ["Anaya said she feels confident reading a balance sheet now.", "balance sheet", 150],
    ["Anaya correctly predicted the impact of a rate cut on banks.", "macro", 144],
    ["Anaya asked how withholding tax affects dividend returns.", "tax", 138],
    ["Anaya said she is still unsure about how currencies move with interest rates.", "currency", 132],
    ["Anaya wanted to understand why REITs behave differently from equities.", "real estate", 126],
    ["Anaya used to confuse revenue with profit before Level 2.", "income statement", 120],
    ["Anaya reviewed a company's cash flow statement before trading it.", "cash flow", 114],
    ["Anaya mentioned wanting to hold three positions across sectors.", "diversification", 108],
    ["Anaya correctly compared two banks using P/E and P/B together.", "valuation", 102],
    ["Anaya said she found the efficient frontier concept abstract.", "portfolio theory", 96],
    ["Anaya understood why oil shocks hit consumer goods first.", "commodities", 90],
    ["Anaya said she avoids banks when NPL ratios rise above 12%.", "risk management", 86],
    ["Anaya confused REIT distributions with dividends for tax purposes.", "tax", 82],
    ["Anaya asked what a bond's credit rating actually measures.", "credit", 78],
    ["Anaya correctly described the difference between ETFs and index funds.", "funds", 74],
    ["Anaya said she wants to hold through at least one full market cycle.", "behaviour", 70],
    ["Anaya said she uses a written direction document before every trade.", "direction", 66],
    ["Anaya asked how the Fed's rate decisions affect the shilling.", "macro", 62],
    ["Anaya said she would not use leverage in FX.", "risk management", 58],
    ["Anaya correctly identified why commodities are diversifiers.", "commodities", 54],
    ["Anaya said she checks the reason field before every trade.", "behaviour", 50],
    ["Anaya is now confident with P/E comparisons across peer banks.", "valuation", 46],
    ["Anaya mentioned wanting to review her portfolio every three months.", "behaviour", 42],
    ["Anaya said she prefers value investing over growth.", "styles", 38],
    ["Anaya asked about the tax treatment of REIT distributions.", "tax", 34],
    ["Anaya correctly calculated the current yield on a bond.", "bond mechanics", 30],
    ["Anaya said she found the currency section harder than equities.", "currency", 26],
    ["Anaya avoided adding to a losing position when the thesis was intact.", "behaviour", 22],
    ["Anaya said she wants to understand options before using them.", "derivatives", 18],
    ["Anaya correctly identified a bull trap on a daily candle chart.", "charts", 14],
    ["Anaya said she prefers explicit limits on position size.", "position sizing", 10],
    ["Anaya wrote a one-page thesis before her most recent buy.", "thesis", 8],
    ["Anaya said she caught herself about to chase a rally and stopped.", "behaviour", 6],
    ["Anaya identified the difference between a dividend and a buyback.", "capital actions", 5],
    ["Anaya said she wants to learn more about emerging market ETFs.", "funds", 4],
    ["Anaya said her direction document has been the most useful exercise.", "direction", 3],
    ["Anaya correctly named the three main asset classes in her portfolio.", "asset classes", 2],
    ["Anaya said she would rather hold cash than buy without a thesis.", "behaviour", 1],
    ["Anaya asked whether bonds still make sense at current yields.", "bonds", 60],
    ["Anaya said she wants to write her own annual review this year.", "review", 45],
    ["Anaya said she would not invest in a company she cannot explain in one paragraph.", "thesis", 30],
    ["Anaya said her biggest lesson was to stop checking prices daily.", "behaviour", 24],
    ["Anaya correctly distinguished risk from volatility.", "risk", 20],
    ["Anaya asked what the fair P/E for a Kenyan bank should be.", "valuation", 16],
    ["Anaya said she prefers funds over individual stocks for now.", "funds", 12],
    ["Anaya said she still finds charts harder than fundamentals.", "charts", 9],
    ["Anaya said she is learning to sit on her hands between trades.", "behaviour", 7],
    ["Anaya noted that her portfolio has three banks and asked if that was too concentrated.", "diversification", 5],
    ["Anaya said she wants to review her position sizing monthly.", "position sizing", 4],
    ["Anaya said she prefers to write before she buys.", "thesis", 2],
    ["Anaya said the direction document changed how she thinks about risk.", "direction", 1],
  ];
  const { error: mErr } = await sb.from("mentor_memories").insert(
    memories.map(([fact, concept, d]) => ({
      user_id: userId,
      fact: fact.replace(/^Amina\b/, userFirstName),
      concept,
      created_at: daysAgo(d, 11),
    }))
  );
  if (mErr) throw mErr;
  console.log("  inserted " + memories.length + " memories");

  // ── notifications ────────────────────────────────────────────────
  const notifs = [
    ["system", "Welcome to PRAXIS", "Start with Foundations in My Learning.", "/learning", true, 180],
    ["practice", "Portfolio ready", "You have KSh 100,000 to practice with.", "/market", true, 180],
    ["practice", "First trade placed", "You bought 800 SCOM at KSh 26.10.", "/portfolio", true, 178],
    ["achievement", "First practice card complete", "You have started. Consistency matters.", "/practice", true, 177],
    ["mentor", "Jema left you a note", "Anaya correctly identified why a low P/E ratio can signal a value trap.", "/mentor", true, 178],
    ["community", "First community post", "You put something into the open.", "/community", true, 168],
    ["practice", "10 trades placed", "You have placed 10 trades. Time to check your journal.", "/portfolio/journal", true, 155],
    ["achievement", "10 lessons complete", "You are building momentum.", "/progress", true, 150],
    ["mentor", "Jema left you a note", "Anaya said she feels confident reading a balance sheet now.", "/mentor", true, 148],
    ["practice", "Mission complete", "L0-mission is done.", "/practice", true, 145],
    ["achievement", "25 practice cards complete", "You are building a habit.", "/progress", true, 138],
    ["practice", "25 trades placed", "A serious body of practice.", "/progress", true, 128],
    ["mentor", "Jema left you a note", "Anaya correctly predicted the impact of a rate cut on banks.", "/mentor", true, 120],
    ["community", "New reply on your post", "Brian Otieno replied to your post about liquidity.", "/community", true, 110],
    ["achievement", "50 practice cards complete", "Halfway to a hundred.", "/progress", true, 100],
    ["practice", "50 trades placed", "That is real commitment.", "/progress", true, 90],
    ["mentor", "Jema left you a note", "Anaya held through a 6% portfolio dip without selling.", "/mentor", true, 80],
    ["community", "New reply on your post", "Brian Otieno replied to your post about NPLs.", "/community", true, 70],
    ["achievement", "5 levels complete", "You are making progress across the curriculum.", "/learning", true, 60],
    ["practice", "Mission complete", "L5-mission is done.", "/practice", true, 55],
    ["mentor", "Jema left you a note", "Anaya said she checks the reason field before every trade.", "/mentor", true, 45],
    ["community", "New reply on your post", "Brian Otieno replied to your post about the 6% dip.", "/community", true, 35],
    ["achievement", "75 practice cards complete", "You are now well past half.", "/progress", true, 30],
    ["practice", "Mission complete", "L14-mission is done.", "/practice", true, 25],
    ["mentor", "Jema left you a note", "Anaya wrote a one-page thesis before her most recent buy.", "/mentor", true, 20],
    ["community", "New reply on your post", "Brian Otieno replied to your post about NPLs.", "/community", true, 15],
    ["achievement", "100 practice cards complete", "A serious body of work.", "/dashboard", true, 12],
    ["mentor", "Jema left you a note", "Anaya said she caught herself about to chase a rally and stopped.", "/mentor", false, 6],
    ["community", "New reply on your post", "Brian Otieno replied to your thesis post.", "/community", false, 3],
    ["mentor", "Jema left you a note", "Anaya asked whether bonds still make sense at current yields.", "/mentor", false, 1],
  ];
  const { error: nErr } = await sb.from("notifications").insert(
    notifs.map(([kind, title, body, href, read, d]) => ({
      user_id: userId,
      kind,
      title,
      body,
      href,
      read,
      created_at: daysAgo(d, 9),
    }))
  );
  if (nErr) throw nErr;
  console.log("  inserted " + notifs.length + " notifications");

  // ── bookmarks ────────────────────────────────────────────────────
  const bms = [
    ["concept", "14.4", "Position sizing", "How much of a portfolio goes into a single idea.", "/learning/lesson/14-4", 160],
    ["company", "SCOM", "Safaricom PLC", "Telecommunications, NSE", "/market/SCOM", 175],
    ["concept", "2.4", "Reading a balance sheet", "Assets, liabilities, and what they mean.", "/learning/lesson/2-4", 150],
    ["company", "EQTY", "Equity Group Holdings", "Banking, NSE", "/market/EQTY", 140],
    ["concept", "13.6", "Writing your direction document", "One page, six sections.", "/learning/lesson/13-6", 130],
    ["company", "KCB", "KCB Group", "Banking, NSE", "/market/KCB", 120],
    ["concept", "15.2", "Loss aversion", "Why losses hurt twice as much as gains feel good.", "/learning/lesson/15-2", 105],
    ["company", "EABL", "East African Breweries", "Consumer Goods, NSE", "/market/EABL", 90],
    ["concept", "3.3", "P/E in context", "A P/E ratio means nothing on its own.", "/learning/lesson/3-3", 80],
    ["concept", "5.4", "Concentration risk", "When too much of a portfolio sits in one holding.", "/learning/lesson/5-4", 70],
    ["company", "COOP", "Co-operative Bank", "Banking, NSE", "/market/COOP", 60],
    ["concept", "12.5", "Real estate and REITs", "How REITs make real estate accessible.", "/learning/lesson/12-5", 45],
    ["concept", "16.3", "The annual review", "Two rebalancing dates a year.", "/learning/lesson/16-3", 30],
    ["company", "KEGN", "KenGen", "Energy, NSE", "/market/KEGN", 20],
    ["concept", "17.3", "Currency risk", "USD/KES moves affect your US holdings.", "/learning/lesson/17-3", 8],
  ];
  const { error: bErr } = await sb.from("bookmarks").insert(
    bms.map(([ttype, tid, title, desc, href, d]) => ({
      user_id: userId,
      target_type: ttype,
      target_id: tid,
      title,
      description: desc,
      href,
      created_at: daysAgo(d, 15),
    }))
  );
  if (bErr) throw bErr;
  console.log("  inserted " + bms.length + " bookmarks");

  // ── lesson progress ──────────────────────────────────────────────
  const lessonIds = [];
  const levelLessonCounts = [
    [0, 5], [1, 6], [2, 7], [3, 6], [4, 5], [5, 7], [6, 9], [7, 6],
    [8, 8], [9, 8], [10, 7], [11, 8], [12, 8], [13, 7], [14, 5],
    [15, 5], [16, 7], [17, 9],
  ];
  for (const [lvl, count] of levelLessonCounts) {
    for (let i = 1; i <= count; i++) lessonIds.push(lvl + "." + i);
  }
  const { error: lErr } = await sb.from("lesson_progress").insert(
    lessonIds.map((id, i) => ({
      user_id: userId,
      lesson_id: id,
      completed_at: daysAgo(Math.max(0, 178 - Math.floor(i * 1.5)), 8),
    }))
  );
  if (lErr) throw lErr;
  console.log("  inserted " + lessonIds.length + " lesson completions");

  // ── community ────────────────────────────────────────────────────
  const posts = [
    { kind: "question", title: "How do you evaluate a bank when NPLs are rising?", body: "I'm looking at a bank trading below book. Their NPL ratio went from 8% to 11% in the last two quarters. Is the discount justified, or is this an opportunity? How would you think about it?", tags: ["banking", "valuation"], replies: 2, helpful: 4, days: 165 },
    { kind: "win", title: "Held through a 6% dip without selling", body: "My portfolio dropped 6% in a week and I didn't sell anything. Six months ago I would have panic-sold. The direction document really does help.", tags: ["psychology", "direction"], replies: 2, helpful: 6, days: 150 },
    { kind: "discussion", title: "Why I stopped comparing P/E across industries", body: "Used to think a bank at 5x was always cheaper than a consumer name at 15x. Then I read Level 3 properly. The context matters more than the number.", tags: ["valuation"], replies: 2, helpful: 5, days: 135 },
    { kind: "question", title: "Bond duration: does it matter for Kenyan retail?", body: "Most Kenyan bond exposure is short-term T-bills. Does duration even matter if you're holding to maturity?", tags: ["bonds"], replies: 1, helpful: 3, days: 120 },
    { kind: "challenge", title: "Committed to writing a thesis for every new position", body: "Starting this week, I will not place a buy without a one-page thesis. If I can't write it, I don't have a thesis.", tags: ["thesis", "discipline"], replies: 2, helpful: 8, days: 105 },
    { kind: "win", title: "First positive month after eight months of practice", body: "Finally had a month where my portfolio outperformed the NASI. Small win but encouraging. The discipline is starting to pay off.", tags: ["psychology"], replies: 2, helpful: 4, days: 90 },
    { kind: "discussion", title: "What does a direction document actually look like?", body: "People keep mentioning this. Here's mine, would welcome feedback. Goals, horizon, capacity as 30%, tolerance as 20%, constraints, values. One page.", tags: ["direction"], replies: 2, helpful: 6, days: 72 },
    { kind: "question", title: "Should I rebalance when the market moves, or wait for the calendar?", body: "I set 1 January and 1 July as my rebalance dates. But the market moved a lot this quarter. Should I break the rule?", tags: ["rebalancing"], replies: 2, helpful: 4, days: 60 },
    { kind: "discussion", title: "Three banks is too many. Here's why I'm changing it", body: "I realized my portfolio is 60% banking. It works until it doesn't. Adding a manufacturing position this month.", tags: ["diversification"], replies: 1, helpful: 5, days: 45 },
    { kind: "win", title: "Wrote my first annual review", body: "Reviewed every position against the thesis I wrote. Sold two because the thesis broke. Held the rest. Feel like I actually have a process now.", tags: ["review"], replies: 2, helpful: 7, days: 30 },
    { kind: "challenge", title: "30-day no-trade challenge", body: "Committed to not placing a single trade for 30 days. Learning to sit on my hands. Anyone else want to try it?", tags: ["psychology"], replies: 2, helpful: 4, days: 15 },
    { kind: "discussion", title: "The number I stopped watching", body: "I stopped checking my portfolio value daily. Two months in. It's made me a better investor, not a worse one.", tags: ["psychology"], replies: 1, helpful: 9, days: 6 },
  ];

  const { data: postRows, error: cpErr } = await sb
    .from("community_posts")
    .insert(posts.map((p) => ({
      user_id: userId,
      author_name: userName,
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
    })))
    .select("id, title");
  if (cpErr) throw cpErr;
  console.log("  inserted " + postRows.length + " posts");

  // ── replies ──────────────────────────────────────────────────────
  const repliesByTitle = {
    "How do you evaluate a bank when NPLs are rising?": [
      [162, "Check whether the NPLs are secured or unsecured. Secured lending means recovery is possible even at high NPL ratios."],
      [155, "Also look at the coverage ratio. If they have provisioned heavily, the worst may already be priced in."],
    ],
    "Held through a 6% dip without selling": [
      [148, "This is the whole game. Not selling during the dip is what separates investing from trading."],
      [145, "Nice work. Writing it down when it happens is the right move."],
    ],
    "Why I stopped comparing P/E across industries": [
      [132, "Context is everything. Sector, growth, moat, all of it matters more than the multiple."],
      [128, "The book value matters too if you're comparing banks."],
    ],
    "Bond duration: does it matter for Kenyan retail?": [
      [116, "Even T-bills reprice. Duration matters most when you might sell before maturity."],
    ],
    "Committed to writing a thesis for every new position": [
      [100, "I do something similar. My rule is: if I can't write the exit, I don't write the entry."],
      [95, "Started doing this last quarter. It's been the single biggest change."],
    ],
    "First positive month after eight months of practice": [
      [85, "Congratulations. One month is a data point, not a trend. Keep the process."],
      [82, "Nice. What changed in your approach?"],
    ],
    "What does a direction document actually look like?": [
      [68, "Mine is very similar. I also added a 'values' section for stocks I refuse to hold."],
      [64, "Great template. Stealing this."],
    ],
    "Should I rebalance when the market moves, or wait for the calendar?": [
      [56, "Stick to the calendar. The point of the calendar is to remove this exact decision."],
      [52, "Agreed. The rules exist to protect you from yourself."],
    ],
    "Three banks is too many. Here's why I'm changing it": [
      [40, "Good insight. Concentration is invisible until it matters."],
    ],
    "Wrote my first annual review": [
      [26, "This is the habit that separates serious investors from everyone else."],
      [22, "Great post. Would love to see your template."],
    ],
    "30-day no-trade challenge": [
      [10, "In. Day 3 and already wanting to make changes."],
      [8, "Count me in. I'll check back in a month."],
    ],
    "The number I stopped watching": [
      [3, "The daily check is the hardest habit to break."],
    ],
  };

  const replyRows = [];
  for (const row of postRows) {
    const list = repliesByTitle[row.title] ?? [];
    for (const [d, body] of list) {
      replyRows.push({
        post_id: row.id,
        user_id: "demo-other",
        author_name: "Brian Otieno",
        author_initials: "BO",
        author_color: "#0d9488",
        body,
        helpful_count: Math.floor(Math.random() * 4),
        created_at: daysAgo(d, 9),
      });
    }
  }
  if (replyRows.length > 0) {
    const { error: rErr } = await sb.from("community_replies").insert(replyRows);
    if (rErr) throw rErr;
    console.log("  inserted " + replyRows.length + " replies");
  }

  // ── reactions ────────────────────────────────────────────────────
  const reactionRows = [];
  const kinds = ["helpful", "agree", "respect"];
  for (let i = 0; i < postRows.length; i++) {
    reactionRows.push({ user_id: "demo-other", target_type: "post", target_id: postRows[i].id, kind: "helpful" });
    if (i % 2 === 0) {
      reactionRows.push({ user_id: "demo-other", target_type: "post", target_id: postRows[i].id, kind: "agree" });
    }
    if (i % 3 === 0) {
      reactionRows.push({ user_id: "demo-other", target_type: "post", target_id: postRows[i].id, kind: "respect" });
    }
  }
  const { error: reErr } = await sb.from("community_reactions").insert(reactionRows);
  if (reErr && !/duplicate/.test(reErr.message)) {
    console.log("  reactions: " + reErr.message);
  } else {
    console.log("  inserted " + reactionRows.length + " reactions");
  }

  // ── done ─────────────────────────────────────────────────────────
  console.log("");
  console.log("════════════════════════════════════════════");
  console.log("  SEED COMPLETE");
  console.log("════════════════════════════════════════════");
  console.log("");
  console.log("  Trades:         " + tradeRows.length);
  console.log("  Snapshots:      " + snapshots.length);
  console.log("  Practice cards: " + practicePool.length);
  console.log("  Memories:       " + memories.length);
  console.log("  Notifications:  " + notifs.length + " (" + notifs.filter((n) => !n[4]).length + " unread)");
  console.log("  Bookmarks:      " + bms.length);
  console.log("  Lessons:        " + lessonIds.length);
  console.log("  Community:      " + postRows.length + " posts, " + replyRows.length + " replies, " + reactionRows.length + " reactions");
  console.log("");
  console.log("  Final portfolio cash: KSh " + Math.round(cash).toLocaleString("en-KE"));
  console.log("");
}

main().catch((err) => { console.error("\nSeed failed:", err.message ?? err); process.exit(1); });
