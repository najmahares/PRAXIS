





import type { MissionVerify } from "./cards";

export const MISSION_STEPS: Record<string, string[]> = {
  "L0-mission": [
    "Open Portfolio from the sidebar.",
    "Click the New trade button.",
    "Pick any ticker from the dropdown (SCOM, EQTY, KCB all work).",
    "Enter a share count that fits your cash balance.",
    "Click Confirm buy.",
  ],
  "L1-mission": [
    "Open Portfolio and click New trade.",
    "Pick any ticker and enter a share count.",
    "When you get to the Why are you making this trade field, write at least 150 characters.",
    "Click Confirm buy.",
    "The mission checks your longest journal note, not the size of the trade.",
  ],
  "L2-mission": [
    "Open Market from the sidebar.",
    "Look at the Yield column on each company card.",
    "Pick a company with a yield of 3% or more (SCOM, KCB, EQTY, COOP, ABSA, NCBA, BAMB, EABL, KEGN, CIC, BRIT, JUB all qualify).",
    "Open Portfolio and click New trade.",
    "Select that ticker, enter a share count, confirm.",
  ],
  "L3-mission": [
    "Open Market.",
    "Use the sector chips to filter by Banking.",
    "Pick two banks (KCB and EQTY are the clearest pair).",
    "Open Portfolio and click New trade.",
    "Buy the first bank, then repeat for the second.",
    "The mission counts holdings, not sectors, so any two same-sector names will do.",
  ],
  "L4-mission": [
    "Open Market.",
    "Pick three companies from different sectors (for example SCOM, KCB, and BAMB).",
    "Open Portfolio and click New trade.",
    "Buy the first company, then repeat for the other two.",
  ],
  "L5-mission": [
    "Open Market and note the sector tag on each card (Banking, Telecommunications, Manufacturing, Energy, and so on).",
    "Pick one company from each of three different sectors.",
    "Open Portfolio and click New trade.",
    "Buy the first, then repeat for the other two.",
    "The mission passes the moment your portfolio holds three different sectors.",
  ],
  "L6-mission": [
    "Open Market and open a chart for a stock you own.",
    "Look at the price line and find one level it has repeatedly stopped falling at (support) and one where it has repeatedly stopped rising (resistance).",
    "Open Portfolio and click New trade.",
    "Place any small trade.",
    "In the Why field, write at least 200 characters naming both levels.",
  ],
  "L7-mission": [
    "Open Portfolio.",
    "Look at the Cash balance stat card and the percentage under it.",
    "If cash is below 10%, buy more positions from Market, you are over-invested.",
    "If cash is above 40%, either buy a position or hold at the current level.",
    "The target range is 10% to 40% cash.",
  ],
  "L8-mission": [
    "Open Market.",
    "Pick one bank (KCB, EQTY, NCBA, ABSA, COOP) and one non-bank (SCOM, EABL, BAMB, KEGN).",
    "Open Portfolio and click New trade.",
    "Buy the first, then repeat for the second.",
  ],
  "L9-mission": [
    "Open Market and search for KCB.",
    "Open Portfolio and click New trade.",
    "Select KCB from the ticker dropdown.",
    "Enter any share count and confirm.",
  ],
  "L10-mission": [
    "Open Portfolio and click New trade.",
    "Place any small trade.",
    "In the Why field, write at least 200 characters about the expense ratio of a fund you hold or are considering.",
    "If the fund charges more than 1% a year, explain what you would get in return.",
  ],
  "L11-mission": [
    "Open the Jema panel (right edge) and ask: what is USD/KES today?",
    "Open Portfolio and click New trade.",
    "Place any small trade.",
    "In the Why field, write at least 150 characters about that rate and what it means for a Kenyan holding a foreign asset.",
  ],
  "L12-mission": [
    "Open Portfolio.",
    "Look at the Cash balance percentage.",
    "Either sell one position to raise cash above 30%, or hold at your current cash level if it is already in the 30% to 80% range.",
    "The mission treats a high cash position as your non-equity exposure, a deliberate dry-powder allocation.",
  ],
  "L13-mission": [
    "Open Portfolio and click New trade.",
    "Place any small trade.",
    "In the Why field, write at least 400 characters as your direction document: goals, horizon, risk capacity, risk tolerance, constraints, and values.",
    "One page of prose in the Why field is enough.",
  ],
  "L14-mission": [
    "Open Portfolio and click New trade.",
    "Place any trade on a ticker you own or want to own.",
    "In the Why field, write at least 400 characters as a one-page thesis: thesis, catalyst, evidence, risks, conviction, exit, review date.",
    "This becomes your contract with yourself.",
  ],
  "L15-mission": [
    "Open Market and pick three companies from different sectors.",
    "Open Portfolio and click New trade.",
    "Buy all three over the next few sessions.",
    "Do not sell any of them, the mission is about holding through normal price movement.",
  ],
  "L16-mission": [
    "Open Portfolio and click New trade.",
    "Place at least three separate trades.",
    "Space them out: one per week works better than three in one session.",
    "Do not chase news or react to short-term price moves.",
  ],
  "L17-mission": [
    "Open Portfolio and click New trade.",
    "Place any small trade.",
    "In the Why field, write at least 200 characters about which international access route you would use (PandaPanda, Hisa, Ndovu, AIB-AXYS with Scope Markets) and why.",
  ],
};



export function deriveSteps(verify?: MissionVerify): string[] {
  if (!verify) {
    return [
      "Open Portfolio from the sidebar.",
      "Check whether you already meet the goal described above.",
      "If not, click New trade and place the required trades.",
      "Click Check my portfolio when you think you are done.",
    ];
  }

  switch (verify.kind) {
    case "first_trade":
      return [
        "Open Portfolio from the sidebar.",
        "Click the New trade button.",
        "Pick any ticker from the dropdown.",
        "Enter a share count that fits your cash balance.",
        "Click Confirm buy.",
      ];
    case "holdings_count":
      return [
        "Open Portfolio and count your current positions.",
        "If you have fewer than " + (verify.min ?? 3) + ", open Market and pick more companies.",
        "Click New trade for each new company.",
        "Buy at least " + (verify.min ?? 3) + " total positions to complete this mission.",
      ];
    case "sector_count":
      return [
        "Open Market and note the sector tag on each company card (Banking, Telecommunications, Manufacturing, Energy, and so on).",
        "Pick one company from each of " + (verify.min ?? 2) + " different sectors.",
        "Open Portfolio and click New trade.",
        "Buy each company one at a time.",
      ];
    case "ticker_held":
      return [
        "Open Market and search for " + (verify.ticker ?? "the required ticker") + ".",
        "Open Portfolio and click New trade.",
        "Select " + (verify.ticker ?? "the ticker") + " from the dropdown.",
        "Enter any share count and confirm.",
      ];
    case "any_dividend_stock":
      return [
        "Open Market from the sidebar.",
        "Look at the Yield column on each company card.",
        "Pick a company with a yield of 3% or more (SCOM, KCB, EQTY, COOP, ABSA, NCBA, BAMB, EABL all qualify).",
        "Open Portfolio and click New trade.",
        "Buy that ticker and confirm.",
      ];
    case "journal_length":
      return [
        "Open Portfolio and click New trade.",
        "Place any small trade.",
        "In the Why are you making this trade field, write at least " + (verify.minChars ?? 150) + " characters.",
        "The mission checks your longest journal note.",
      ];
    case "cash_pct":
      return [
        "Open Portfolio.",
        "Look at the Cash balance stat card and the percentage under it.",
        "If cash is below " + (verify.min ?? 10) + "%, buy fewer positions or sell one.",
        "If cash is above " + (verify.max ?? 40) + "%, buy a position from Market.",
        "The target range is " + (verify.min ?? 10) + "% to " + (verify.max ?? 40) + "% cash.",
      ];
    default:
      return [
        "Open Portfolio from the sidebar.",
        "Check whether you meet the goal described above.",
        "Use Market and New trade to get there.",
        "Click Check my portfolio when ready.",
      ];
  }
}
