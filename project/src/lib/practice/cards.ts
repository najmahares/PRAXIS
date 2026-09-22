



export type CardType = "scenario" | "drill" | "mission";

export type ScenarioChoice = {
  id: string;
  label: string;
  feedback: string;
  best?: boolean;
};

export type MissionVerify =
  | { kind: "first_trade" }
  | { kind: "holdings_count"; min: number }
  | { kind: "sector_count"; min: number }
  | { kind: "ticker_held"; ticker: string }
  | { kind: "any_dividend_stock" }
  | { kind: "journal_length"; minChars: number }
  | { kind: "cash_pct"; min: number; max: number };

export type PracticeCard = {
  id: string;
  level: number;
  type: CardType;
  title: string;
  brief: string;
  prompt: string;
  linkedLessonId: string;
  linkedLessonLabel: string;
  choices?: ScenarioChoice[];
  framework?: string[];
  verify?: MissionVerify;
  steps?: string[];
};

export const PRACTICE_CARDS: PracticeCard[] = [
  
  {
    id: "L0-scenario",
    level: 0,
    type: "scenario",
    title: "The friend with a tip",
    brief:
      "A friend tells you Safaricom is the biggest company on the NSE, so you should put all KSh 100,000 into it. You have to decide today.",
    prompt: "What do you do?",
    linkedLessonId: "0.3",
    linkedLessonLabel: "0.3 · What is a share?",
    choices: [
      { id: "a", label: "Put everything into Safaricom", feedback: "You own one business, one sector, one story. If Safaricom has a bad year, so do you. Ownership is real, but so is concentration." },
      { id: "b", label: "Buy Safaricom plus two other companies", feedback: "Better. You now own slices of three businesses. One bad year at one company does not define your portfolio.", best: true },
      { id: "c", label: "Wait and buy nothing yet", feedback: "Patience is legitimate. But doing nothing forever is also a decision. At some point the plan needs a first move." },
    ],
  },
  {
    id: "L0-drill",
    level: 0,
    type: "drill",
    title: "Three businesses, one sentence each",
    brief:
      "Open Market. Find Safaricom, KCB, and Equity Group.",
    prompt:
      "In one sentence each, what does the company actually sell? Do not describe the share price.",
    linkedLessonId: "0.1",
    linkedLessonLabel: "0.1 · What is a company?",
    framework: ["identifies the actual product or service", "does not confuse share price with business", "names a specific customer or market"],
  },
  {
    id: "L0-mission",
    level: 0,
    type: "mission",
    title: "Your first trade",
    brief:
      "Ownership begins with a single decision. Make it deliberate.",
    prompt: "Buy your first position in Portfolio. Any NSE ticker, any amount.",
    linkedLessonId: "0.3",
    linkedLessonLabel: "0.3 · What is a share?",
    verify: { kind: "first_trade" },
  },

  
  {
    id: "L1-scenario",
    level: 1,
    type: "scenario",
    title: "The 3pm order",
    brief:
      "You want to sell 1,000 shares of a mid-cap before market close. The bid is KSh 35.15. The ask is KSh 35.25. Liquidity is thin.",
    prompt: "Market order or limit order?",
    linkedLessonId: "1.2",
    linkedLessonLabel: "1.2 · Limit orders",
    choices: [
      { id: "a", label: "Market order, sell now", feedback: "You will be filled. But with a 10-cent spread and thin volume, you might push the price down and fill at KSh 34.80. Certainty of execution, uncertain price." },
      { id: "b", label: "Limit at KSh 35.20, wait", feedback: "You protect the price. But if the day closes without a buyer, you go home still holding. Certain price, uncertain execution.", best: true },
      { id: "c", label: "Split it, half market, half limit", feedback: "A reasonable compromise. Some certainty, some price control. Common in practice." },
    ],
  },
  {
    id: "L1-drill",
    level: 1,
    type: "drill",
    title: "Which stock is liquid?",
    brief:
      "Open Market. Look at today's volume on Safaricom and on a small-cap of your choice (e.g. Express Kenya, Williamson Tea).",
    prompt:
      "In one sentence, which is more liquid, and what would happen if you tried to sell KSh 500,000 worth of each in one day?",
    linkedLessonId: "1.4",
    linkedLessonLabel: "1.4 · Volume and liquidity",
    framework: ["cites a specific volume number", "explains what happens to price on a large order", "connects liquidity to spread"],
  },
  {
    id: "L1-mission",
    level: 1,
    type: "mission",
    title: "Two order types, one journal",
    brief:
      "Practise both order types. Note what happened in each.",
    prompt:
      "Place one trade in Portfolio, then write at least 150 characters in your journal explaining why you chose the size and the timing.",
    linkedLessonId: "1.1",
    linkedLessonLabel: "1.1 · Market orders",
    verify: { kind: "journal_length", minChars: 150 },
  },

  
  {
    id: "L2-scenario",
    level: 2,
    type: "scenario",
    title: "Two companies, two margins",
    brief:
      "Company A: KSh 10B revenue, KSh 100M profit. Company B: KSh 5B revenue, KSh 800M profit. Your friend says Company A is the bigger business, so it is the better investment.",
    prompt: "Do you agree?",
    linkedLessonId: "2.2",
    linkedLessonLabel: "2.2 · Profit",
    choices: [
      { id: "a", label: "Yes, bigger revenue always wins", feedback: "Revenue without profit is activity, not business. A retail chain with KSh 10B in sales and a 1% margin is fragile." },
      { id: "b", label: "No, Company B is more efficient", feedback: "Correct. Company B keeps 16% of every shilling of revenue. Company A keeps 1%. Efficiency compounds.", best: true },
      { id: "c", label: "Depends on the sector", feedback: "Fair. Margin norms differ, a retailer at 1% is normal, a bank at 1% is a red flag. Sector context matters." },
    ],
  },
  {
    id: "L2-drill",
    level: 2,
    type: "drill",
    title: "Where does the profit come from?",
    brief:
      "Open Market/Equity Group Holdings. Read the company description and the fundamentals block.",
    prompt:
      "In two sentences, is Equity's strength revenue growth or margin? Support your answer with one number from the page.",
    linkedLessonId: "2.6",
    linkedLessonLabel: "2.6 · Cash flow",
    framework: ["cites a specific financial figure", "distinguishes revenue from profit", "connects the answer to banking economics"],
  },
  {
    id: "L2-mission",
    level: 2,
    type: "mission",
    title: "One dividend payer",
    brief:
      "Dividends are how many Kenyan investors actually make money. Own at least one.",
    prompt: "Add a dividend-paying NSE stock to your Portfolio.",
    linkedLessonId: "2.7",
    linkedLessonLabel: "2.7 · Dividends",
    verify: { kind: "any_dividend_stock" },
  },

  
  {
    id: "L3-scenario",
    level: 3,
    type: "scenario",
    title: "The cheapest bank on the board",
    brief:
      "KCB trades at 4x P/E. Equity at 5x. Safaricom at 15x. A friend says: buy KCB, it is the cheapest.",
    prompt: "What is wrong with that logic?",
    linkedLessonId: "3.3",
    linkedLessonLabel: "3.3 · P/E in context",
    choices: [
      { id: "a", label: "Nothing, cheapest is best", feedback: "This is exactly the mistake Level 3 warns about. A low P/E often means the market expects earnings to fall." },
      { id: "b", label: "Different industries cannot be compared on P/E alone", feedback: "Correct. KCB and Equity are comparable peers, but Safaricom is a telecom, the market prices them differently because they are different businesses.", best: true },
      { id: "c", label: "Compare KCB only to other banks", feedback: "Right instinct. Peer comparison is the rule. But you still need to understand why KCB is cheaper than Equity." },
    ],
  },
  {
    id: "L3-drill",
    level: 3,
    type: "drill",
    title: "Two banks, one question",
    brief:
      "Open Market/compare. Enter KCB and EQTY.",
    prompt:
      "Which bank trades at a lower P/E today? In one sentence, why might the market pay less for it?",
    linkedLessonId: "3.5",
    linkedLessonLabel: "3.5 · Comparing peers",
    framework: ["cites the correct P/E values", "uses comparison language", "proposes a hypothesis (growth, NPLs, region, dividend)"],
  },
  {
    id: "L3-mission",
    level: 3,
    type: "mission",
    title: "Own two peers",
    brief:
      "Sector comparison only works when you own both sides.",
    prompt: "Own at least two positions in the same sector.",
    linkedLessonId: "3.5",
    linkedLessonLabel: "3.5 · Comparing peers",
    verify: { kind: "sector_count", min: 1 },
  },

  
  {
    id: "L4-scenario",
    level: 4,
    type: "scenario",
    title: "Calm or volatile",
    brief:
      "Stock A moves ±2% per month. Stock B moves ±15%. Both have similar expected returns over 5 years. You have KSh 100,000 and a 5-year horizon.",
    prompt: "Which do you pick?",
    linkedLessonId: "4.2",
    linkedLessonLabel: "4.2 · Volatility",
    choices: [
      { id: "a", label: "Stock A, smoother path", feedback: "Reasonable if you cannot stomach drawdowns. But you may be giving up return. Volatility cuts both ways." },
      { id: "b", label: "Stock B, higher risk, potential higher return", feedback: "Correct if you can truly hold through the swings. Most investors cannot, and sell at the bottom.", best: true },
      { id: "c", label: "Half each", feedback: "Diversification across volatility profiles. Legitimate and common." },
    ],
  },
  {
    id: "L4-drill",
    level: 4,
    type: "drill",
    title: "Read your own tolerance",
    brief:
      "Look at the change % column on Market. Find the highest and lowest movers today.",
    prompt:
      "In one sentence, which of the two would you hold through a 40% drop for 5 years, and why?",
    linkedLessonId: "4.4",
    linkedLessonLabel: "4.4 · Your risk tolerance",
    framework: ["names a specific ticker", "connects the answer to time horizon", "acknowledges the emotional difficulty"],
  },
  {
    id: "L4-mission",
    level: 4,
    type: "mission",
    title: "Hold through volatility",
    brief:
      "A position you own has to actually move for you to learn.",
    prompt: "Own at least 3 positions so your portfolio has some spread of volatility.",
    linkedLessonId: "4.3",
    linkedLessonLabel: "4.3 · Risk vs return",
    verify: { kind: "holdings_count", min: 3 },
  },

  
  {
    id: "L5-scenario",
    level: 5,
    type: "scenario",
    title: "Four banks and a telecom",
    brief:
      "You own 4 banks and Safaricom. Banks fall 20% on a rate decision. Safaricom falls 3%. Your portfolio fell more than the market.",
    prompt: "What was wrong?",
    linkedLessonId: "5.4",
    linkedLessonLabel: "5.4 · Concentration risk",
    choices: [
      { id: "a", label: "Nothing, the market went down", feedback: "No. The market fell 8%. You fell 17%. The gap is your concentration." },
      { id: "b", label: "Your sector exposure was too concentrated", feedback: "Correct. Four banks means the portfolio is 80% banking. One sector event moves everything.", best: true },
      { id: "c", label: "You should have sold before the rate decision", feedback: "Timing decisions like this are what the discipline is supposed to replace. The problem is structural, not tactical." },
    ],
  },
  {
    id: "L5-drill",
    level: 5,
    type: "drill",
    title: "Your real allocation",
    brief:
      "Open Portfolio. Look at the Allocation by sector donut. Also look at your Cash balance.",
    prompt:
      "How many sectors do you hold? Is cash over 40% of the portfolio? In two sentences, is this a diversified portfolio?",
    linkedLessonId: "5.5",
    linkedLessonLabel: "5.5 · Asset allocation",
    framework: ["reads the donut correctly", "acknowledges cash as a position", "proposes at least one change"],
  },
  {
    id: "L5-mission",
    level: 5,
    type: "mission",
    title: "Three sectors",
    brief:
      "Diversification is easiest to feel when you can see it in the donut.",
    prompt: "Own positions across at least 3 different sectors.",
    linkedLessonId: "5.6",
    linkedLessonLabel: "5.6 · Sector exposure",
    verify: { kind: "sector_count", min: 3 },
  },

  
  {
    id: "L6-scenario",
    level: 6,
    type: "scenario",
    title: "The range that broke",
    brief:
      "A stock has traded between KSh 20 and KSh 22 for three months. Today it closes at KSh 24 on 3x normal volume.",
    prompt: "What does this mean?",
    linkedLessonId: "6.5",
    linkedLessonLabel: "6.5 · Support and resistance",
    choices: [
      { id: "a", label: "Guaranteed breakout, buy now", feedback: "Breakouts on volume are a real signal. They are not a guarantee. False breakouts happen constantly." },
      { id: "b", label: "Worth watching, a break with volume is a signal, not a certainty", feedback: "Correct. Volume confirms conviction, but conviction can be wrong. React with a plan, not a full position.", best: true },
      { id: "c", label: "Ignore it, charts do not matter", feedback: "Charts are not magic, but price levels are where real buyers and sellers accumulate. Ignoring them means ignoring information." },
    ],
  },
  {
    id: "L6-drill",
    level: 6,
    type: "drill",
    title: "Find support on your own holding",
    brief:
      "Pick one position you own. Open its Market page and look at the last 30 days of prices.",
    prompt:
      "In one sentence, at what price has this stock repeatedly stopped falling? Name the level.",
    linkedLessonId: "6.5",
    linkedLessonLabel: "6.5 · Support and resistance",
    framework: ["names a specific price level", "describes what happened at that level", "connects it to buyers stepping in"],
  },
  {
    id: "L6-mission",
    level: 6,
    type: "mission",
    title: "Chart your thinking",
    brief:
      "Charts are only useful if you can name what you see.",
    prompt:
      "Write at least 200 characters in your journal identifying one support level and one resistance level in a stock you own.",
    linkedLessonId: "6.6",
    linkedLessonLabel: "6.6 · Trends",
    verify: { kind: "journal_length", minChars: 200 },
  },

  
  {
    id: "L7-scenario",
    level: 7,
    type: "scenario",
    title: "The rate cut",
    brief:
      "CBK cuts the policy rate by 200bps. Headlines say it is good for the economy.",
    prompt: "What happens to banks, bond funds, and your mortgage?",
    linkedLessonId: "7.1.1",
    linkedLessonLabel: "7.1.1 · How rate cuts reach your portfolio",
    choices: [
      { id: "a", label: "Everything goes up together", feedback: "Not quite. Rate cuts reach different parts of the economy at different speeds. And not everything benefits." },
      { id: "b", label: "Bond funds gain (rates down = bond prices up). Banks may face margin pressure. Mortgages get cheaper.", feedback: "Correct. Transmission is uneven. Bond funds benefit first, banks face NIM compression, borrowers benefit slowly.", best: true },
      { id: "c", label: "It does not matter for my portfolio", feedback: "It matters. Every stock on the NSE is priced off the rate environment. Ignoring it means missing the biggest macro driver." },
    ],
  },
  {
    id: "L7-drill",
    level: 7,
    type: "drill",
    title: "Read today's NASI",
    brief:
      "Open Market. Look at the pulse line at the top and the NASI value.",
    prompt:
      "Is the market up or down today, and by how much? In one sentence, does your portfolio reflect the same move?",
    linkedLessonId: "7.6",
    linkedLessonLabel: "7.6 · Market shocks",
    framework: ["cites the NASI number", "compares it to their portfolio", "notices if they diverge"],
  },
  {
    id: "L7-mission",
    level: 7,
    type: "mission",
    title: "Watch cash as a position",
    brief:
      "Cash is a position, not a leftover. In macro-driven markets it is often the best one.",
    prompt:
      "Keep cash between 10% and 40% of your portfolio. Too little means no dry powder. Too much means you are not invested.",
    linkedLessonId: "7.1",
    linkedLessonLabel: "7.1 · Interest rates",
    verify: { kind: "cash_pct", min: 10, max: 40 },
  },

  
  {
    id: "L8-scenario",
    level: 8,
    type: "scenario",
    title: "The 2:1 split",
    brief:
      "A company you own announces a 2-for-1 share split. The stock was KSh 100. It is now KSh 50.",
    prompt: "Are you richer, poorer, or the same?",
    linkedLessonId: "8.6",
    linkedLessonLabel: "8.6 · Splits, buybacks, and dilution",
    choices: [
      { id: "a", label: "The same, you just have more shares", feedback: "Correct. A split changes the share count, not the value of the business. Your slice is identical.", best: true },
      { id: "b", label: "Richer, you now have twice as many shares", feedback: "Tempting. But each share is worth half. Net ownership is unchanged." },
      { id: "c", label: "Poorer, the price dropped", feedback: "The price dropped because the share count doubled. Total value is the same." },
    ],
  },
  {
    id: "L8-drill",
    level: 8,
    type: "drill",
    title: "Dividend yields across banks",
    brief:
      "Open Market/compare. Compare three banks: KCB, Equity, NCBA.",
    prompt:
      "Which has the highest dividend yield? In one sentence, name one risk that would threaten that dividend.",
    linkedLessonId: "8.4",
    linkedLessonLabel: "8.4 · Dividend strategies",
    framework: ["identifies the correct ticker", "cites the yield %", "names a real risk (NPLs, capital, regulation)"],
  },
  {
    id: "L8-mission",
    level: 8,
    type: "mission",
    title: "Screening discipline",
    brief:
      "Own at least one dividend payer and at least one growth stock. Two different reasons to hold.",
    prompt: "Hold at least 2 positions. One from each style.",
    linkedLessonId: "8.3",
    linkedLessonLabel: "8.3 · Growth versus value investing",
    verify: { kind: "holdings_count", min: 2 },
  },

  
  {
    id: "L9-scenario",
    level: 9,
    type: "scenario",
    title: "Rates rise 300bps",
    brief:
      "You hold a 10-year government bond yielding 12%. The CBK raises rates by 300bps.",
    prompt: "What happens to the market value of your bond?",
    linkedLessonId: "9.3",
    linkedLessonLabel: "9.3 · Bond pricing and duration",
    choices: [
      { id: "a", label: "The value rises", feedback: "No. Bond prices move opposite to rates. A 10-year bond loses significant value on a 300bp hike." },
      { id: "b", label: "The value falls, and more for longer maturities", feedback: "Correct. Duration measures how much. A 10-year bond falls roughly 25-30% for a 300bp move.", best: true },
      { id: "c", label: "No change, it still pays the same coupon", feedback: "The coupon is fixed. But the market price of the bond falls so that new buyers get the new yield." },
    ],
  },
  {
    id: "L9-drill",
    level: 9,
    type: "drill",
    title: "Rate sensitivity in your portfolio",
    brief:
      "Look at the CBK rate (ask Jema if you need the current value). Then look at the biggest bank position you hold.",
    prompt:
      "In two sentences, would a 200bp rate cut help or hurt that bank, and why?",
    linkedLessonId: "9.3",
    linkedLessonLabel: "9.3 · Bond pricing and duration",
    framework: ["cites the current rate", "explains net interest margin", "acknowledges the trade-off between lending and borrowing rates"],
  },
  {
    id: "L9-mission",
    level: 9,
    type: "mission",
    title: "Fixed income exposure",
    brief:
      "Every serious portfolio has some. Own it deliberately.",
    prompt: "Add a bond exposure to your holdings. KCB or a fixed-income fund counts.",
    linkedLessonId: "9.1",
    linkedLessonLabel: "9.1 · Bond fundamentals",
    verify: { kind: "ticker_held", ticker: "KCB" },
  },

  
  {
    id: "L10-scenario",
    level: 10,
    type: "scenario",
    title: "The 20-year fee",
    brief:
      "Fund A: 0.1% expense ratio, index tracker. Fund B: 2% expense ratio, active. Both invest in the same market. You have KSh 100,000 and 20 years.",
    prompt: "How much does the fee difference cost you?",
    linkedLessonId: "10.3",
    linkedLessonLabel: "10.3 · Expense ratios",
    choices: [
      { id: "a", label: "A small amount, maybe 5%", feedback: "Far more. Over 20 years the difference compounds to roughly 30% of your final wealth." },
      { id: "b", label: "Roughly 30% of final wealth", feedback: "Correct. At 9% gross return, Fund A ends near KSh 554k, Fund B near KSh 391k. The gap is the fee.", best: true },
      { id: "c", label: "Fund B wins if the manager is skilled", feedback: "Most active managers do not beat their benchmark after fees. The evidence is overwhelming." },
    ],
  },
  {
    id: "L10-drill",
    level: 10,
    type: "drill",
    title: "Funds at a glance",
    brief:
      "Compare a Kenyan unit trust (commonly 1.5-2.5% annual fees) to a global ETF (0.05-0.2%).",
    prompt:
      "On KSh 500,000 over 20 years at 9% gross, compute the difference in final value between the two fee levels.",
    linkedLessonId: "10.3",
    linkedLessonLabel: "10.3 · Expense ratios",
    framework: ["uses the correct fee percentages", "compounds over 20 years", "arrives at a specific KSh figure"],
  },
  {
    id: "L10-mission",
    level: 10,
    type: "mission",
    title: "Your fee awareness",
    brief:
      "You cannot control returns. You can control what you pay.",
    prompt:
      "Write at least 200 characters in your journal about the expense ratio of one fund you hold or want to hold. If it exceeds 1%, explain why.",
    linkedLessonId: "10.3",
    linkedLessonLabel: "10.3 · Expense ratios",
    verify: { kind: "journal_length", minChars: 200 },
  },

  
  {
    id: "L11-scenario",
    level: 11,
    type: "scenario",
    title: "Waiting for a better rate",
    brief:
      "You want to buy a US stock. USD/KES is 129. You believe the shilling will strengthen to 120 within 3 months. The stock looks attractive now.",
    prompt: "What do you do?",
    linkedLessonId: "11.3",
    linkedLessonLabel: "11.3 · Central bank policy",
    choices: [
      { id: "a", label: "Wait for 120", feedback: "This is currency timing. It rarely works. The stock may rise 15% while you wait, more than the FX gain you wanted." },
      { id: "b", label: "Buy now, accept currency risk", feedback: "Correct default. You researched the stock; do not let a currency forecast override that. FX is the second decision, not the first.", best: true },
      { id: "c", label: "Buy half now, half if the rate hits 120", feedback: "Averaging. Reasonable, but adds complexity for a small edge." },
    ],
  },
  {
    id: "L11-drill",
    level: 11,
    type: "drill",
    title: "USD/KES then and now",
    brief:
      "Ask Jema for the current USD/KES. Compare to what you remember from six months ago.",
    prompt:
      "In one sentence, what has the shilling done, and what would that mean for a Kenyan holding a US ETF?",
    linkedLessonId: "11.1",
    linkedLessonLabel: "11.1 · Currency basics",
    framework: ["cites both rates", "identifies direction (strength or weakness)", "connects to shilling return on foreign holdings"],
  },
  {
    id: "L11-mission",
    level: 11,
    type: "mission",
    title: "Track the rate",
    brief:
      "You cannot manage a risk you do not observe.",
    prompt:
      "Write at least 150 characters in your journal about the USD/KES rate today. You will check it again in 30 days.",
    linkedLessonId: "11.1",
    linkedLessonLabel: "11.1 · Currency basics",
    verify: { kind: "journal_length", minChars: 150 },
  },

  
  {
    id: "L12-scenario",
    level: 12,
    type: "scenario",
    title: "Oil jumps 30%",
    brief:
      "Middle East tensions push Brent crude from $80 to $104. You own banks, Safaricom, and a consumer goods stock.",
    prompt: "Which holding benefits, and which suffers?",
    linkedLessonId: "12.2",
    linkedLessonLabel: "12.2 · Oil and energy",
    choices: [
      { id: "a", label: "None, oil only affects energy companies", feedback: "Oil affects transport, food, plastics, and inflation. Your consumer goods stock feels it through input costs." },
      { id: "b", label: "Consumer goods suffer (input costs up), banks may benefit (higher rates follow)", feedback: "Correct. Oil shocks are macro events. Every holding feels the transmission.", best: true },
      { id: "c", label: "Safaricom benefits most", feedback: "Safaricom's costs are network and power, not fuel. The effect is secondary at best." },
    ],
  },
  {
    id: "L12-drill",
    level: 12,
    type: "drill",
    title: "Gold versus the market",
    brief:
      "Look up the Absa NewGold ETF (ticker GLD or similar on Market). Compare its 1-year return to the NASI.",
    prompt:
      "In two sentences, which would have protected you more during the 2026 oil shock, and why?",
    linkedLessonId: "12.1",
    linkedLessonLabel: "12.1 · Gold as an asset class",
    framework: ["cites both returns", "explains gold's role as a diversifier", "does not assume gold always wins"],
  },
  {
    id: "L12-mission",
    level: 12,
    type: "mission",
    title: "One non-equity position",
    brief:
      "Diversifiers only help if you actually own them.",
    prompt:
      "Add a non-equity exposure to your portfolio: gold ETF, REIT, or a deliberate cash allocation above 30%.",
    linkedLessonId: "12.4",
    linkedLessonLabel: "12.4 · Commodities as diversifiers",
    verify: { kind: "cash_pct", min: 30, max: 80 },
  },

  
  {
    id: "L13-scenario",
    level: 13,
    type: "scenario",
    title: "The 30% drop",
    brief:
      "The NASI falls 30% in six weeks. Your portfolio falls 25%. Every headline says sell. Your direction document says hold if the drawdown is under 40%.",
    prompt: "What do you do?",
    linkedLessonId: "13.7",
    linkedLessonLabel: "13.7 · When direction changes",
    choices: [
      { id: "a", label: "Sell, the market is collapsing", feedback: "This is the exact moment the direction document exists for. Selling locks in the loss and proves the document was never real." },
      { id: "b", label: "Hold. Reread the document. Rebalance if the allocation has drifted.", feedback: "Correct. Nothing in your plan changed because the market moved. That is the whole point of writing it down.", best: true },
      { id: "c", label: "Buy more aggressively", feedback: "Only if your cash allocation allows it and the direction document says so. Not because you feel brave." },
    ],
  },
  {
    id: "L13-drill",
    level: 13,
    type: "drill",
    title: "One sentence, one direction",
    brief:
      "Direction is a written statement. Write yours.",
    prompt:
      "Complete in one sentence: 'I am investing for ___, in ___ years, and I can tolerate a ___% loss without changing my behaviour.'",
    linkedLessonId: "13.1",
    linkedLessonLabel: "13.1 · Why direction comes first",
    framework: ["names a specific goal", "states a time horizon", "gives a numeric risk tolerance"],
  },
  {
    id: "L13-mission",
    level: 13,
    type: "mission",
    title: "Write the direction",
    brief:
      "One page. Six sections. Reviewed on a schedule.",
    prompt:
      "Write at least 400 characters in your journal as a direction document: goals, horizon, capacity, tolerance, constraints, values.",
    linkedLessonId: "13.6",
    linkedLessonLabel: "13.6 · Writing your direction document",
    verify: { kind: "journal_length", minChars: 400 },
  },

  
  {
    id: "L14-scenario",
    level: 14,
    type: "scenario",
    title: "The risk you cannot name",
    brief:
      "You want to buy Safaricom. You think it will go up. A mentor asks: what specifically would make you sell?",
    prompt: "Which answer is a real thesis?",
    linkedLessonId: "14.1",
    linkedLessonLabel: "14.1 · What a thesis is",
    choices: [
      { id: "a", label: "If the price falls 20%", feedback: "That is a stop-loss, not a thesis. Price alone is not a reason. Businesses do not care what you paid." },
      { id: "b", label: "If M-Pesa revenue growth stalls for two consecutive quarters", feedback: "Correct. This is falsifiable, specific, and about the business, not the price.", best: true },
      { id: "c", label: "If the market crashes", feedback: "Too vague. Every stock falls in a market crash. This rule would trigger for reasons unrelated to your thesis." },
    ],
  },
  {
    id: "L14-drill",
    level: 14,
    type: "drill",
    title: "Three sentences about a holding",
    brief:
      "Pick one position you own. Open its Market page.",
    prompt:
      "In three sentences: why you bought it, what would change your mind, when you will review it.",
    linkedLessonId: "14.5",
    linkedLessonLabel: "14.5 · The one-page thesis",
    framework: ["states a specific catalyst", "names a falsifiable risk", "sets a review date"],
  },
  {
    id: "L14-mission",
    level: 14,
    type: "mission",
    title: "Write the thesis",
    brief:
      "One page. Seven sections. It becomes your contract with yourself.",
    prompt:
      "Write at least 400 characters in your journal for one of your holdings: thesis, catalyst, evidence, risks, conviction, exit, review date.",
    linkedLessonId: "14.5",
    linkedLessonLabel: "14.5 · The one-page thesis",
    verify: { kind: "journal_length", minChars: 400 },
  },

  
  {
    id: "L15-scenario",
    level: 15,
    type: "scenario",
    title: "The position that hurts",
    brief:
      "You bought SCOM at KSh 35. It drops to KSh 28. Headlines are negative. Your thesis says hold. Your gut says sell.",
    prompt: "What do you do?",
    linkedLessonId: "15.2",
    linkedLessonLabel: "15.2 · Loss aversion",
    choices: [
      { id: "a", label: "Sell to stop the pain", feedback: "This is the disposition effect. You sell winners early and hold losers too long. The pain is not a signal." },
      { id: "b", label: "Reread the thesis. If the business still matches it, hold.", feedback: "Correct. The decision is about the business, not the price. If the thesis broke, sell. If not, hold.", best: true },
      { id: "c", label: "Buy more to average down", feedback: "Only if the thesis says add. Averaging down on a broken thesis is doubling a mistake." },
    ],
  },
  {
    id: "L15-drill",
    level: 15,
    type: "drill",
    title: "Count your trades",
    brief:
      "Open Portfolio. Look at the total trade count and the days the portfolio is old.",
    prompt:
      "In one sentence, how many trades have you made per week on average? Is that more than your direction document implies?",
    linkedLessonId: "15.2",
    linkedLessonLabel: "15.2 · Loss aversion",
    framework: ["cites a specific number", "computes trades per week", "compares to a stated target"],
  },
  {
    id: "L15-mission",
    level: 15,
    type: "mission",
    title: "Hold through a loss",
    brief:
      "The only way to learn loss tolerance is to actually experience one.",
    prompt:
      "Hold at least 3 positions for 30 days without selling any of them.",
    linkedLessonId: "15.2",
    linkedLessonLabel: "15.2 · Loss aversion",
    verify: { kind: "holdings_count", min: 3 },
  },

  
  {
    id: "L16-scenario",
    level: 16,
    type: "scenario",
    title: "Twelve trades in three weeks",
    brief:
      "You have made twelve trades in three weeks. The portfolio return is roughly flat. You feel productive.",
    prompt: "What does this suggest?",
    linkedLessonId: "16.3",
    linkedLessonLabel: "16.3 · The annual review",
    choices: [
      { id: "a", label: "Nothing, activity is good", feedback: "Activity is not the same as progress. Twelve trades to produce no return is a signal that the process is unclear." },
      { id: "b", label: "You are trading on feelings, not on a written plan", feedback: "Correct. Frequency of trade correlates with the disposition effect. More trades usually means worse returns.", best: true },
      { id: "c", label: "You should trade more", feedback: "No. The evidence is the opposite." },
    ],
  },
  {
    id: "L16-drill",
    level: 16,
    type: "drill",
    title: "Rebalance or drift?",
    brief:
      "Open Portfolio. Look at the Cash balance % and the Allocation by sector donut.",
    prompt:
      "In two sentences, has your allocation drifted from what your direction document says? What is the one change to bring it back?",
    linkedLessonId: "16.3",
    linkedLessonLabel: "16.3 · The annual review",
    framework: ["cites the current cash %", "compares to the target from the direction document", "names one specific trade to rebalance"],
  },
  {
    id: "L16-mission",
    level: 16,
    type: "mission",
    title: "The habit",
    brief:
      "Consistency beats timing. Own at least three positions you can hold.",
    prompt:
      "Hold at least 3 positions you have chosen deliberately, not chased.",
    linkedLessonId: "16.6",
    linkedLessonLabel: "16.6 · Building the habit",
    verify: { kind: "holdings_count", min: 3 },
  },

  
  {
    id: "L17-scenario",
    level: 17,
    type: "scenario",
    title: "The shilling weakens 10%",
    brief:
      "You hold $1,000 of a US-listed ETF. USD/KES moves from 129 to 142.",
    prompt: "What happens to your KSh value, assuming the ETF price is unchanged?",
    linkedLessonId: "17.3",
    linkedLessonLabel: "17.3 · Currency risk",
    choices: [
      { id: "a", label: "Nothing, the ETF price is the same", feedback: "The ETF price is in dollars. Your KSh value changes with the rate." },
      { id: "b", label: "Your KSh value rises about 10%", feedback: "Correct. $1,000 at 129 was KSh 129,000. At 142 it is KSh 142,000. A 10% currency gain on top of any ETF move.", best: true },
      { id: "c", label: "Your KSh value falls", feedback: "The shilling weakened, which means your dollar-denominated holding is worth more in shillings, not less." },
    ],
  },
  {
    id: "L17-drill",
    level: 17,
    type: "drill",
    title: "The currency math",
    brief:
      "Ask Jema for the current USD/KES rate.",
    prompt:
      "In two sentences, if you invested KSh 100,000 today and the rate moved 10% in your favour over a year, what would your KSh value be?",
    linkedLessonId: "17.5",
    linkedLessonLabel: "17.5 · Practical logistics",
    framework: ["cites the current rate", "applies a 10% move correctly", "arrives at a specific KSh figure"],
  },
  {
    id: "L17-mission",
    level: 17,
    type: "mission",
    title: "International exposure",
    brief:
      "Diversification across currencies is the last lesson of the curriculum.",
    prompt:
      "Write at least 200 characters in your journal about one international access route you would use (PandaPanda, Hisa, Ndovu, AIB-AXYS/Scope) and why.",
    linkedLessonId: "17.2",
    linkedLessonLabel: "17.2 · Access routes",
    verify: { kind: "journal_length", minChars: 200 },
  },
];

export function getCardsForLevel(level: number): PracticeCard[] {
  return PRACTICE_CARDS.filter((c) => c.level === level);
}

export function getCard(id: string): PracticeCard | undefined {
  return PRACTICE_CARDS.find((c) => c.id === id);
}
