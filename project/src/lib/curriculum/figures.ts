import type { FigureBlock } from "./types";

export const LESSON_FIGURES: Record<string, FigureBlock> = {
  
  "0.1": {
    kind: "figure",
    type: "flow",
    caption:
      "A company turns a product or service into money, then keeps a portion as profit. That is the whole cycle.",
    steps: [
      "Company sells something customers want",
      "Money flows in as revenue",
      "Costs are paid: staff, suppliers, taxes",
      "What remains is profit",
    ],
  },
  "0.2": {
    kind: "figure",
    type: "compare",
    caption:
      "Two ways to fund a business. One must be repaid with interest. The other is owned.",
    left: {
      title: "Lender",
      body: "Gives money. Expects it back with interest regardless of how the company does.",
    },
    right: {
      title: "Investor",
      body: "Buys a share. Gets a slice of the profit if the company does well.",
    },
  },
  "0.3": {
    kind: "figure",
    type: "ratio",
    caption:
      "Owning 1,000 of 1,000,000 shares is 0.1% of the business. Small, but real.",
    segments: [
      { label: "You", value: 0.1 },
      { label: "Other shareholders", value: 99.9 },
    ],
  },
  "0.4": {
    kind: "figure",
    type: "flow",
    caption: "What happens between clicking buy and actually owning the shares.",
    steps: [
      "Buyer places an order",
      "Exchange matches with a seller",
      "Trade confirmed at the agreed price",
      "Shares move to the buyer",
    ],
  },
  "0.5": {
    kind: "figure",
    type: "compare",
    caption: "The price moves in the direction of whichever side is pushing harder.",
    left: {
      title: "More buyers than sellers",
      body: "Buyers must raise their offers to compete. The price rises.",
    },
    right: {
      title: "More sellers than buyers",
      body: "Sellers must lower their asks to compete. The price falls.",
    },
  },

  
  "1.1": {
    kind: "figure",
    type: "flow",
    caption:
      "A market order prioritises execution. You get the shares, at whatever the market is offering right now.",
    steps: [
      "You place a market buy",
      "Broker sends it to the exchange",
      "Exchange finds the best available seller",
      "Trade fills at the seller's price",
    ],
  },
  "1.2": {
    kind: "figure",
    type: "compare",
    caption:
      "One gives certainty of execution. The other gives certainty of price. You cannot have both.",
    left: {
      title: "Market order",
      body: "Fills immediately. The price you pay is not guaranteed.",
    },
    right: {
      title: "Limit order",
      body: "Fills only at your price or better. Execution is not guaranteed.",
    },
  },
  "1.3": {
    kind: "figure",
    type: "formula",
    caption:
      "The spread is the cost of trading immediately. Tight spreads signal a liquid stock.",
    label: "Spread",
    numerator: "Ask price (KSh 21.85)",
    denominator: "− Bid price (KSh 21.80)",
    result: "KSh 0.05",
  },
  "1.4": {
    kind: "figure",
    type: "compare",
    caption:
      "Liquidity is about exits. You can enter a thin market easily. You cannot always leave it without paying a price.",
    left: {
      title: "Liquid stock",
      body: "Thousands of buyers and sellers every day. You trade without moving the price.",
    },
    right: {
      title: "Illiquid stock",
      body: "Few buyers and sellers. A large order pushes the price against you before it fills.",
    },
  },
  "1.5": {
    kind: "figure",
    type: "flow",
    caption:
      "Trade day and settlement day are not the same thing. Settlement is when ownership actually changes.",
    steps: [
      "Trade executes on Monday",
      "Broker confirms the deal",
      "Exchange clears the transfer",
      "Shares arrive in your account (T+2)",
    ],
  },
  "1.6": {
    kind: "figure",
    type: "compare",
    caption:
      "An index tells you how the market is doing as a whole. It does not tell you how your portfolio is doing.",
    left: {
      title: "What the index shows",
      body: "The average movement of a group of shares. A market-level view.",
    },
    right: {
      title: "What your portfolio shows",
      body: "The actual value of what you own. Individual holdings can move very differently.",
    },
  },

  
  "2.1": {
    kind: "figure",
    type: "flow",
    caption:
      "Revenue measures the size of the business. It does not measure what the business keeps.",
    steps: [
      "Customers pay for goods or services",
      "Revenue records the total money in",
      "Revenue sits at the top of the income statement",
    ],
  },
  "2.2": {
    kind: "figure",
    type: "waterfall",
    caption:
      "Each step subtracts a cost. What is left at the bottom is what the company actually keeps.",
    bars: [
      { label: "Revenue", value: 500000, tone: "positive" },
      { label: "After direct costs", value: 200000, tone: "negative" },
      { label: "After operating expenses", value: 50000, tone: "negative" },
      { label: "After interest and taxes", value: 32000, tone: "total" },
    ],
  },
  "2.3": {
    kind: "figure",
    type: "formula",
    caption:
      "EPS normalises profit across companies of any size. That is why it is used in almost every valuation ratio.",
    label: "EPS",
    numerator: "Net profit (KSh 100M)",
    denominator: "Shares issued (25M)",
    result: "KSh 4.00",
  },
  "2.4": {
    kind: "figure",
    type: "equation",
    caption:
      "Everything a company owns is funded either by what it owes or by what its owners have put in.",
    left: "Assets",
    right: "Liabilities + Equity",
  },
  "2.5": {
    kind: "figure",
    type: "compare",
    caption:
      "The balance between the two is the company's capital structure. It shapes how the business weathers a bad year.",
    left: {
      title: "Debt",
      body: "Borrowed. Must be repaid with interest. Cheaper, but a fixed obligation.",
    },
    right: {
      title: "Equity",
      body: "Owned. No repayment required. More expensive, but flexible.",
    },
  },
  "2.6": {
    kind: "figure",
    type: "flow",
    caption:
      "Cash flow is what actually hits the bank account, separate from the profit on paper.",
    steps: [
      "Operating: cash from the core business",
      "Investing: cash spent on equipment and assets",
      "Financing: cash from loans, share issues, and dividends",
      "Net change in cash for the period",
    ],
  },
  "2.7": {
    kind: "figure",
    type: "formula",
    caption:
      "Dividend yield is the cash return you receive, regardless of what the share price does.",
    label: "Yield",
    numerator: "Annual dividend (KSh 1.20)",
    denominator: "Share price (KSh 20.00)",
    result: "6%",
  },

  
  "3.1": {
    kind: "figure",
    type: "formula",
    caption:
      "Market cap is the total value the market places on a company's equity. It changes every time the price changes.",
    label: "Market cap",
    numerator: "Share price (KSh 35.20)",
    denominator: "× Shares issued (40.0B)",
    result: "KSh 1.41 trillion",
  },
  "3.2": {
    kind: "figure",
    type: "formula",
    caption:
      "The P/E tells you how much the market is paying for each shilling of annual profit.",
    label: "P/E ratio",
    numerator: "Share price (KSh 35.20)",
    denominator: "÷ EPS (KSh 2.39)",
    result: "14.8",
  },
  "3.3": {
    kind: "figure",
    type: "bars",
    caption:
      "Safaricom trades at a P/E of 14.8 while the Kenyan banks trade at 4 to 6. Same exchange, very different multiples. Context is what makes the number meaningful.",
    bars: [
      { label: "Safaricom", value: 14.8, display: "14.8", tone: "highlight" },
      { label: "Absa Kenya", value: 6.2, display: "6.2" },
      { label: "Co-op Bank", value: 5.4, display: "5.4" },
      { label: "Equity Group", value: 5.0, display: "5.0" },
      { label: "KCB Group", value: 4.7, display: "4.7" },
      { label: "NCBA", value: 4.2, display: "4.2" },
    ],
  },
  "3.4": {
    kind: "figure",
    type: "bars",
    caption:
      "P/B means very different things in different industries. For banks, assets sit close to their real value on the balance sheet. For software, most of the value is intangible.",
    bars: [
      { label: "Equity Group (bank)", value: 1.9, display: "1.9", tone: "primary" },
      { label: "KCB Group (bank)", value: 1.4, display: "1.4", tone: "primary" },
      { label: "Software example", value: 8.0, display: "8.0", tone: "muted" },
    ],
  },
  "3.5": {
    kind: "figure",
    type: "bars",
    caption:
      "Five listed Kenyan banks, all clustered between P/E 4 and 6. The market values them as a group, with small adjustments for differences between them.",
    bars: [
      { label: "Absa Kenya", value: 6.2, display: "6.2" },
      { label: "Co-op Bank", value: 5.4, display: "5.4" },
      { label: "Equity Group", value: 5.0, display: "5.0" },
      { label: "KCB Group", value: 4.7, display: "4.7" },
      { label: "NCBA", value: 4.2, display: "4.2" },
    ],
  },
  "3.6": {
    kind: "figure",
    type: "flow",
    caption:
      "Valuation is a structured judgement, not a single number. Several angles, held together, form a view.",
    steps: [
      "P/E compared to peers and to growth",
      "P/B compared to industry norms",
      "Dividend yield supported by earnings",
      "Balance sheet able to carry a bad year",
      "Overall view: expensive, fair, or cheap",
    ],
  },

  
  "4.1": {
    kind: "figure",
    type: "flow",
    caption:
      "Every investment carries several kinds of risk at the same time, in different proportions.",
    steps: [
      "Company risk: the business does not perform as expected",
      "Market risk: the whole market falls",
      "Liquidity risk: you cannot sell at a fair price",
      "Inflation risk: cash buys less over time",
    ],
  },
  "4.2": {
    kind: "figure",
    type: "sparkline",
    caption:
      "Both lines end in the same place, but the paths are very different. Volatility is about the journey, not the destination.",
    series: [
      {
        label: "Low volatility",
        tone: "primary",
        points: [100, 101, 102, 101, 103, 102, 104, 105, 104, 106, 107, 108],
      },
      {
        label: "High volatility",
        tone: "warn",
        points: [100, 108, 92, 115, 85, 120, 90, 128, 100, 135, 110, 108],
      },
    ],
  },
  "4.3": {
    kind: "figure",
    type: "spectrum",
    caption:
      "Every investment sits somewhere on this line. Higher expected returns require accepting higher potential losses.",
    lowLabel: "Low risk, low return",
    highLabel: "High risk, high return",
    marks: [
      { position: 12, label: "Bonds", sublabel: "Steady, predictable" },
      { position: 50, label: "Blue chips", sublabel: "Established companies" },
      { position: 88, label: "Small caps", sublabel: "Higher potential, wider swings" },
    ],
  },
  "4.4": {
    kind: "figure",
    type: "compare",
    caption:
      "Risk tolerance has two sides. Both matter when you decide what to hold.",
    left: {
      title: "Financial capacity",
      body: "How much loss your finances can absorb without forcing you to change your plans.",
    },
    right: {
      title: "Emotional capacity",
      body: "How much loss you can sit with without making a rushed decision.",
    },
  },
  "4.5": {
    kind: "figure",
    type: "sparkline",
    caption:
      "The same drawdown, two horizons. A long horizon gives the investment time to recover. A short one may force you to sell at the bottom.",
    series: [
      {
        label: "Short horizon",
        tone: "warn",
        points: [100, 80, 72, 68, 62, 55, 58],
      },
      {
        label: "Long horizon",
        tone: "primary",
        points: [100, 80, 72, 68, 62, 55, 58, 72, 88, 104, 118, 132],
      },
    ],
  },

  
  "5.1": {
    kind: "figure",
    type: "bars",
    caption:
      "Typical annual returns by asset class in Kenya. The spread between the highest and lowest is what you give up for safety.",
    bars: [
      { label: "Stocks", value: 14, display: "14%", tone: "highlight" },
      { label: "Government bonds", value: 12.76, display: "12.76%" },
      { label: "Money market funds", value: 11.2, display: "11.2%" },
      { label: "Treasury bills", value: 8.5, display: "8.5%" },
      { label: "REITs (USD)", value: 8, display: "8%", tone: "muted" },
    ],
  },
  "5.2": {
    kind: "figure",
    type: "ratio",
    caption:
      "A simple three-way allocation. Even a beginner portfolio has an allocation, whether chosen or not.",
    segments: [
      { label: "Safaricom (stock)", value: 40 },
      { label: "Government bond", value: 30 },
      { label: "Money market fund", value: 30 },
    ],
  },
  "5.3": {
    kind: "figure",
    type: "compare",
    caption:
      "Diversification is not about owning more. It is about owning things that respond to different forces.",
    left: {
      title: "Concentrated portfolio",
      body: "One stock. If that sector has a bad year, the whole portfolio falls together.",
    },
    right: {
      title: "Diversified portfolio",
      body: "Stocks, bonds, cash. Different assets respond differently, smoothing the ride.",
    },
  },
  "5.3.1": {
    kind: "figure",
    type: "bars",
    caption:
      "Two assets with the same return and risk produce very different portfolio risk, depending on how closely they move together.",
    bars: [
      { label: "ρ = 1.0 (identical)", value: 15, display: "15.0%", tone: "highlight" },
      { label: "ρ = 0.5", value: 12.9, display: "12.9%" },
      { label: "ρ = 0.0 (uncorrelated)", value: 10.6, display: "10.6%" },
      { label: "ρ = -0.5", value: 7.5, display: "7.5%" },
      { label: "ρ = -1.0 (opposite)", value: 0, display: "0.0%" },
    ],
  },
  "5.4": {
    kind: "figure",
    type: "bars",
    caption:
      "Concentration builds quietly. This portfolio looks diversified by holding count, but 60% sits in one position.",
    bars: [
      { label: "Holding 1", value: 60, display: "60%", tone: "highlight" },
      { label: "Holding 2", value: 20, display: "20%" },
      { label: "Holding 3", value: 15, display: "15%" },
      { label: "Cash", value: 5, display: "5%" },
    ],
  },
  "5.5": {
    kind: "figure",
    type: "bars",
    caption:
      "Three learners, three time horizons, three stock allocations. The right answer depends on how much time you have and how much drawdown you can sit through.",
    bars: [
      { label: "Learner C (60) · short horizon", value: 25, display: "25%", tone: "muted" },
      { label: "Learner B (45) · moderate", value: 50, display: "50%" },
      { label: "Learner A (25) · long horizon", value: 80, display: "80%", tone: "highlight" },
    ],
  },
  "5.5.1": {
    kind: "figure",
    type: "compare",
    caption:
      "The efficient frontier is the set of portfolios that give the most return for each level of risk. Anything below it is leaving something on the table.",
    left: {
      title: "Below the frontier",
      body: "Lower return for the same risk. The portfolio is not using its assets efficiently.",
    },
    right: {
      title: "On the frontier",
      body: "The best possible return for that level of risk. Nothing is being wasted.",
    },
  },
  "5.6": {
    kind: "figure",
    type: "ratio",
    caption:
      "A portfolio can look diversified by number of holdings and still be heavily concentrated in one sector.",
    segments: [
      { label: "Banking", value: 60 },
      { label: "Telecommunications", value: 25 },
      { label: "Consumer goods", value: 10 },
      { label: "Cash", value: 5 },
    ],
  },
  "5.7": {
    kind: "figure",
    type: "flow",
    caption:
      "Rebalancing is the discipline of bringing your portfolio back to the allocation you chose, after the market has pushed it away.",
    steps: [
      "Target allocation: 60/30/10",
      "Market moves: stocks outperform",
      "Actual allocation drifts: 72/20/8",
      "Rebalance: sell stocks, buy bonds and cash",
      "Back to target: 60/30/10",
    ],
  },
  "5.7.1": {
    kind: "figure",
    type: "sparkline",
    caption:
      "Without rebalancing, a portfolio can drift far from its target in a few years. A 5% threshold catches this before it becomes a problem.",
    series: [
      {
        label: "Target allocation (60% stocks)",
        tone: "primary",
        points: [60, 60, 60, 60, 60, 60],
      },
      {
        label: "Actual allocation",
        tone: "warn",
        points: [60, 61.8, 63.4, 65, 66.5, 68],
      },
    ],
    yMin: 55,
    yMax: 72,
  },

  
  "6.1": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "A week of Safaricom trading shown as candlesticks. Each candle compresses four prices into one shape.",
    mode: "candles",
    candles: [
      { o: 34.9, h: 35.3, l: 34.7, c: 35.2 },
      { o: 35.2, h: 35.5, l: 35.0, c: 35.4 },
      { o: 35.4, h: 35.6, l: 35.1, c: 35.2 },
      { o: 35.2, h: 35.9, l: 35.1, c: 35.7 },
      { o: 35.7, h: 35.9, l: 35.4, c: 35.6 },
    ],
    annotations: [
      { candleIndex: 3, label: "Four prices in one shape", position: "above" },
    ],
    yMin: 34.6,
    yMax: 36.0,
    height: 260,
  },
  "6.2": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Three candles. Green body means the close was above the open. Red means the close was below. A tiny body means neither side won.",
    mode: "candles",
    candles: [
      { o: 34.8, h: 35.5, l: 34.7, c: 35.4 },
      { o: 35.4, h: 35.6, l: 34.6, c: 34.7 },
      { o: 34.7, h: 35.4, l: 34.2, c: 34.8 },
    ],
    annotations: [
      { candleIndex: 0, label: "Buyers won the day", position: "above" },
      { candleIndex: 1, label: "Sellers won the day", position: "below" },
      { candleIndex: 2, label: "Neither side won", position: "above" },
    ],
    yMin: 34.0,
    yMax: 35.8,
    height: 280,
  },
  "6.2.1": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Three patterns that repeat on charts. A hammer after a decline, a shooting star after a rise, and an engulfing candle covering the previous day.",
    mode: "candles",
    candles: [
      { o: 35.6, h: 35.7, l: 35.1, c: 35.2 },
      { o: 35.2, h: 35.3, l: 34.6, c: 35.1 },
      { o: 35.1, h: 35.9, l: 35.0, c: 35.3 },
      { o: 35.3, h: 35.9, l: 35.2, c: 35.4 },
      { o: 35.4, h: 35.5, l: 34.9, c: 35.0 },
    ],
    annotations: [
      { candleIndex: 1, label: "Hammer", position: "below" },
      { candleIndex: 3, label: "Shooting star", position: "above" },
    ],
    yMin: 34.5,
    yMax: 36.0,
    height: 280,
  },
  "6.3": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Twelve monthly candles of Safaricom. A sharp dip in March looks dramatic here. On a daily chart it would look like a crash. On the monthly view it is a small pullback in a larger rise.",
    mode: "candles",
    candles: [
      { o: 24.0, h: 26.5, l: 23.5, c: 26.0 },
      { o: 26.0, h: 28.0, l: 25.5, c: 27.5 },
      { o: 27.5, h: 28.5, l: 26.8, c: 28.2 },
      { o: 28.2, h: 30.0, l: 24.0, c: 26.5 },
      { o: 26.5, h: 29.0, l: 26.0, c: 28.8 },
      { o: 28.8, h: 31.5, l: 28.5, c: 31.0 },
      { o: 31.0, h: 33.0, l: 30.5, c: 32.5 },
      { o: 32.5, h: 34.5, l: 32.0, c: 34.0 },
      { o: 34.0, h: 35.5, l: 33.5, c: 35.2 },
      { o: 35.2, h: 36.0, l: 34.5, c: 35.8 },
      { o: 35.8, h: 36.4, l: 35.0, c: 36.0 },
      { o: 36.0, h: 36.8, l: 35.4, c: 36.5 },
    ],
    annotations: [
      { candleIndex: 3, label: "The March dip", position: "below" },
    ],
    yMin: 22.5,
    yMax: 37.5,
    height: 280,
  },
  "6.4": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Price with volume below. Tall bars mean many shares traded. The third day had three times normal volume. The price moved strongly and the move held.",
    mode: "candles",
    candles: [
      { o: 34.6, h: 34.9, l: 34.4, c: 34.8 },
      { o: 34.8, h: 35.0, l: 34.6, c: 34.9 },
      { o: 34.9, h: 36.2, l: 34.9, c: 36.0 },
      { o: 36.0, h: 36.3, l: 35.7, c: 36.1 },
      { o: 36.1, h: 36.4, l: 35.9, c: 36.2 },
      { o: 36.2, h: 36.5, l: 36.0, c: 36.3 },
    ],
    overlays: ["volume"],
    annotations: [
      { candleIndex: 2, label: "Earnings day", position: "above" },
    ],
    yMin: 34.2,
    yMax: 36.7,
    height: 340,
  },
  "6.5": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Support at KSh 34.50 and resistance at KSh 36.20. The price has touched each level twice. The market remembers these levels.",
    mode: "candles",
    candles: [
      { o: 34.6, h: 34.8, l: 34.5, c: 34.7 },
      { o: 34.7, h: 35.4, l: 34.6, c: 35.3 },
      { o: 35.3, h: 36.2, l: 35.2, c: 35.9 },
      { o: 35.9, h: 36.2, l: 35.5, c: 35.6 },
      { o: 35.6, h: 35.7, l: 34.5, c: 34.7 },
      { o: 34.7, h: 35.2, l: 34.5, c: 35.1 },
      { o: 35.1, h: 36.0, l: 35.0, c: 35.9 },
      { o: 35.9, h: 36.2, l: 35.6, c: 35.7 },
    ],
    overlays: ["support", "resistance"],
    supportLevel: 34.5,
    resistanceLevel: 36.2,
    yMin: 34.1,
    yMax: 36.6,
    height: 280,
  },
  "6.6": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "An uptrend. Each high is higher than the last. Each low is higher than the last. The trendline slopes up.",
    mode: "candles",
    candles: [
      { o: 34.5, h: 35.0, l: 34.3, c: 34.9 },
      { o: 34.9, h: 35.4, l: 34.7, c: 35.2 },
      { o: 35.2, h: 35.6, l: 35.0, c: 35.4 },
      { o: 35.4, h: 35.5, l: 34.8, c: 35.0 },
      { o: 35.0, h: 35.7, l: 34.9, c: 35.6 },
      { o: 35.6, h: 36.0, l: 35.4, c: 35.8 },
      { o: 35.8, h: 36.2, l: 35.5, c: 36.0 },
      { o: 36.0, h: 36.1, l: 35.4, c: 35.6 },
      { o: 35.6, h: 36.4, l: 35.5, c: 36.2 },
      { o: 36.2, h: 36.6, l: 36.0, c: 36.4 },
    ],
    overlays: ["trendline"],
    trendline: { startIndex: 0, startValue: 34.4, endIndex: 9, endValue: 36.0 },
    yMin: 34.0,
    yMax: 36.8,
    height: 280,
  },
  "6.7": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "Two moving averages on top of price. The faster line is the 50-period average. The slower line is the 200-period. When they cross, the trend may be changing.",
    mode: "candles",
    candles: [
      { o: 32.0, h: 32.5, l: 31.5, c: 31.8 },
      { o: 31.8, h: 32.4, l: 31.5, c: 32.2 },
      { o: 32.2, h: 32.8, l: 32.0, c: 32.6 },
      { o: 32.6, h: 33.2, l: 32.4, c: 33.0 },
      { o: 33.0, h: 33.6, l: 32.8, c: 33.4 },
      { o: 33.4, h: 34.0, l: 33.2, c: 33.8 },
      { o: 33.8, h: 34.4, l: 33.6, c: 34.2 },
      { o: 34.2, h: 34.8, l: 34.0, c: 34.6 },
      { o: 34.6, h: 35.2, l: 34.4, c: 35.0 },
      { o: 35.0, h: 35.6, l: 34.8, c: 35.4 },
      { o: 35.4, h: 35.8, l: 35.2, c: 35.6 },
      { o: 35.6, h: 36.0, l: 35.4, c: 35.8 },
    ],
    overlays: ["ma50", "ma200"],
    yMin: 31.0,
    yMax: 36.5,
    height: 280,
  },
  "6.8": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "A typical stock page on an investment platform. The chart is one part of the page. The quote panel, toolbar, fundamentals, and tabs around it tell you what the chart alone cannot.",
    mode: "platform",
  },
  "6.8.1": {
    kind: "figure",
    type: "compare",
    caption:
      "A screener filters the market down to a shortlist. The filters on one side, the stocks that match on the other.",
    left: {
      title: "Your filters",
      body: "Sector: Banking. P/E under 6. Dividend yield above 5%. Volume above one million shares.",
    },
    right: {
      title: "Matches",
      body: "Equity Group, KCB Group, Co-op Bank, NCBA. Four names in a market of 60.",
    },
  },
  "6.9": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "A double top. The price tried to break through resistance twice and failed both times. The pattern told a story about buyers running out of strength.",
    mode: "candles",
    candles: [
      { o: 34.0, h: 34.5, l: 33.8, c: 34.3 },
      { o: 34.3, h: 35.5, l: 34.2, c: 35.3 },
      { o: 35.3, h: 36.2, l: 35.1, c: 36.0 },
      { o: 36.0, h: 36.1, l: 35.2, c: 35.4 },
      { o: 35.4, h: 35.5, l: 34.6, c: 34.8 },
      { o: 34.8, h: 35.6, l: 34.7, c: 35.4 },
      { o: 35.4, h: 36.2, l: 35.3, c: 36.0 },
      { o: 36.0, h: 36.1, l: 35.0, c: 35.2 },
      { o: 35.2, h: 35.3, l: 34.3, c: 34.5 },
    ],
    annotations: [
      { candleIndex: 2, label: "First peak", position: "above" },
      { candleIndex: 6, label: "Second peak", position: "above" },
      { candleIndex: 8, label: "Breakdown", position: "below" },
    ],
    yMin: 33.9,
    yMax: 36.6,
    height: 300,
  },

  
  "7.1": {
    kind: "figure",
    type: "economic-series",
    caption:
      "CBR cuts through 2025 against the rise of the NASI index. Nine consecutive cuts pushed money out of fixed income and into equities.",
    mode: "dual",
    series: [
      {
        label: "CBR (%)",
        tone: "warn",
        points: [11.25, 11.0, 10.75, 10.5, 10.25, 10.0, 9.75, 9.5, 9.25, 9.0],
      },
      {
        label: "NASI (rebased to 100)",
        tone: "primary",
        points: [100, 105, 112, 118, 125, 132, 138, 145, 149, 151],
      },
    ],
    xLabels: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec", "Feb", "Apr", "Jun", "Aug"],
    annotations: [
      { index: 0, label: "First cut", position: "above" },
      { index: 9, label: "Ninth cut", position: "below" },
    ],
    yMin: 85,
    yMax: 160,
    height: 300,
  },
  "7.1.1": {
    kind: "figure",
    type: "flow",
    caption:
      "The effect of a rate cut takes months to travel through the economy. Watch the order to see what has already moved and what has not.",
    steps: [
      "CBR cut",
      "Interbank rates fall",
      "T-bill yields drop",
      "Bank lending rates fall",
      "Corporate borrowing costs fall",
      "Company earnings improve",
    ],
  },
  "7.2": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Kenya inflation from January 2025 to May 2026. Stable inside the CBK target through 2025, then a sharp climb when the oil shock hit in early 2026.",
    mode: "line",
    series: [
      {
        label: "CPI inflation",
        tone: "warn",
        points: [4.1, 3.9, 4.0, 4.2, 4.1, 4.0, 3.9, 4.0, 4.1, 4.0, 4.1, 4.2, 4.5, 5.1, 5.8, 6.3, 6.7],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar", "May"],
    targetBand: { min: 2.5, max: 7.5, label: "CBK target band" },
    annotations: [{ index: 15, label: "Oil shock", position: "below" }],
    yMin: 2,
    yMax: 8,
    yUnit: "%",
    height: 300,
  },
  "7.2.1": {
    kind: "figure",
    type: "compare",
    caption:
      "Two kinds of inflation. The central bank response, and the market outcome, depend on which one is happening.",
    left: {
      title: "Demand-pull",
      body: "Too much money chasing too few goods. Growth is strong. The central bank raises rates to cool demand.",
    },
    right: {
      title: "Cost-push",
      body: "Input costs rise. Growth may be weak. The central bank is stuck between inflation and recession.",
    },
  },
  "7.3": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Kenya real GDP growth from 2022 to 2026. Steady through 2025, then revised downward on the oil shock.",
    mode: "line",
    series: [
      {
        label: "Real GDP growth",
        tone: "primary",
        points: [4.8, 5.6, 4.7, 5.0, 4.3],
      },
    ],
    xLabels: ["2022", "2023", "2024", "2025", "2026 (proj.)"],
    annotations: [{ index: 4, label: "Revised down", position: "below" }],
    yMin: 3.5,
    yMax: 6.5,
    yUnit: "%",
    height: 280,
  },
  "7.4": {
    kind: "figure",
    type: "economic-series",
    caption:
      "The shilling was steady at around 129 to the dollar through 2025. Then the oil shock pushed it higher.",
    mode: "line",
    series: [
      {
        label: "USD/KES",
        tone: "warn",
        points: [129.0, 129.0, 128.5, 128.0, 129.5, 129.8, 129.5, 129.0, 129.2, 129.5, 129.3, 129.0, 129.5, 130.5, 132.0, 133.0, 134.0],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar", "May"],
    annotations: [{ index: 16, label: "Oil shock pressure", position: "above" }],
    yMin: 126,
    yMax: 136,
    height: 280,
  },
  "7.5": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Kenya PMI from January 2025 to May 2026. Anything below 50 means the private sector is contracting. The line crossed below in early 2026.",
    mode: "line",
    series: [
      {
        label: "PMI",
        tone: "primary",
        points: [52.0, 52.5, 52.0, 51.5, 52.0, 52.5, 52.8, 52.2, 51.8, 52.0, 51.5, 51.0, 49.5, 48.2, 47.0, 46.8, 46.6],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar", "May"],
    targetBand: { min: 45, max: 50, label: "Contraction zone" },
    annotations: [{ index: 16, label: "Below 50", position: "below" }],
    yMin: 45,
    yMax: 54,
    height: 300,
  },
  "7.6": {
    kind: "figure",
    type: "economic-series",
    caption:
      "The 2026 oil shock. Oil prices spiked in March. The NSE fell sharply at the same time. The two lines move in opposite directions.",
    mode: "dual",
    series: [
      {
        label: "Oil price (USD)",
        tone: "warn",
        points: [78, 82, 95, 115, 105, 98, 92],
      },
      {
        label: "NSE index (rebased to 100)",
        tone: "primary",
        points: [100, 99, 92, 82, 80, 84, 88],
      },
    ],
    xLabels: ["Jan 26", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    annotations: [{ index: 3, label: "Oil spike", position: "above" }],
    yMin: 70,
    yMax: 125,
    height: 300,
  },
  "7.6.1": {
    kind: "figure",
    type: "economic-series",
    caption:
      "A market panic follows a pattern. The first selloff is the sharpest. Then a bounce. Then a second wave as reality sets in. Then a slow recovery.",
    mode: "line",
    series: [
      {
        label: "Market index",
        tone: "primary",
        points: [100, 95, 85, 75, 70, 78, 80, 75, 68, 66, 72, 80, 88, 95, 100],
      },
    ],
    xLabels: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14"],
    annotations: [
      { index: 0, label: "Shock", position: "above" },
      { index: 4, label: "Bottom of first selloff", position: "below" },
      { index: 6, label: "Bounce", position: "above" },
      { index: 9, label: "Bottom", position: "below" },
      { index: 14, label: "Recovery", position: "above" },
    ],
    yMin: 60,
    yMax: 108,
    height: 320,
  },

  
  "8.1": {
    kind: "figure",
    type: "compare",
    caption:
      "Ordinary shares give you a vote and a dividend. Preference shares give up the vote for priority on dividends and on winding up.",
    left: {
      title: "Ordinary shares",
      body: "Vote at the AGM. Dividends paid after preference holders. Last in line if the company is wound up.",
    },
    right: {
      title: "Preference shares",
      body: "No vote. Fixed dividend paid before ordinary holders. Priority claim on assets in a wind-up.",
    },
  },
  "8.2": {
    kind: "figure",
    type: "bars",
    caption:
      "The same two Kenyan banks, compared across four different multiples. Which one is cheaper depends on which tool you pick.",
    bars: [
      { label: "Bank A P/E", value: 5.0, display: "5.0" },
      { label: "Bank B P/E", value: 6.2, display: "6.2" },
      { label: "Bank A P/B", value: 2.4, display: "2.4", tone: "highlight" },
      { label: "Bank B P/B", value: 1.8, display: "1.8", tone: "highlight" },
      { label: "Bank A EV/EBITDA", value: 8.5, display: "8.5" },
      { label: "Bank B EV/EBITDA", value: 6.1, display: "6.1" },
    ],
  },
  "8.3": {
    kind: "figure",
    type: "spectrum",
    caption:
      "Growth and value are not opposites. They are endpoints of a spectrum, and most stocks sit somewhere in between.",
    lowLabel: "Deep value",
    highLabel: "High growth",
    marks: [
      { position: 15, label: "Value", sublabel: "Low P/E, high yield" },
      { position: 50, label: "Blend", sublabel: "Mix of both" },
      { position: 85, label: "Growth", sublabel: "High P/E, reinvests profits" },
    ],
  },
  "8.4": {
    kind: "figure",
    type: "formula",
    caption:
      "The payout ratio tells you what share of profit is being returned to shareholders. Above 80% is a warning sign for most industries.",
    label: "Payout ratio",
    numerator: "Dividend per share",
    denominator: "÷ Earnings per share",
    result: "60%",
  },
  "8.5": {
    kind: "figure",
    type: "compare",
    caption:
      "Dual-class structures keep control with founders. Single-class structures give every shareholder an equal vote.",
    left: {
      title: "Single class",
      body: "One share, one vote. Every shareholder has the same say. Alphabet's smaller peers work this way.",
    },
    right: {
      title: "Dual class",
      body: "Founders hold super-voting shares. Public shareholders own the economics, not the control.",
    },
  },
  "8.6": {
    kind: "figure",
    type: "flow",
    caption:
      "Three capital actions, three different effects on your ownership stake.",
    steps: [
      "Stock split: doubles the shares, halves the price. Nothing changes.",
      "Buyback: reduces the shares. Your slice gets bigger.",
      "Dilution: issues new shares. Your slice gets smaller.",
    ],
  },
  "8.7": {
    kind: "figure",
    type: "flow",
    caption:
      "Screening is how you turn a market of hundreds into a shortlist of a few.",
    steps: [
      "Define your strategy (value, growth, income, quality)",
      "Translate the strategy into filters",
      "Apply the filters to the market",
      "Review the shortlist",
      "Research each name before deciding",
    ],
  },
  "8.8": {
    kind: "figure",
    type: "compare",
    caption:
      "Emerging markets offer growth but come with more volatility, thinner liquidity, and higher currency risk. Developed markets offer stability but slower growth.",
    left: {
      title: "Developed markets",
      body: "US, Japan, Germany, UK. Stable, liquid, strong protections. Lower growth, lower volatility.",
    },
    right: {
      title: "Emerging and frontier",
      body: "Kenya, Nigeria, Vietnam. Higher growth, less liquid, weaker protections. Higher volatility.",
    },
  },

  
  "9.1": {
    kind: "figure",
    type: "formula",
    caption:
      "Yield to maturity accounts for the coupon, the price you paid, and the face value returned at maturity.",
    label: "YTM",
    numerator: "Annual coupon + price change",
    denominator: "÷ Current bond price",
    result: "8.4%",
  },
  "9.2": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Kenya yield curve in 2025. Short rates near 8%. Long rates above 14%. The gap is what the market pays for lending longer.",
    mode: "line",
    series: [
      {
        label: "Yield (%)",
        tone: "primary",
        points: [8.5, 9.2, 10.4, 11.6, 12.5, 13.4, 14.0, 14.6, 14.9],
      },
    ],
    xLabels: ["3M", "6M", "1Y", "2Y", "5Y", "10Y", "15Y", "20Y", "25Y"],
    annotations: [
      { index: 0, label: "Short end", position: "above" },
      { index: 8, label: "Long end", position: "below" },
    ],
    yMin: 7,
    yMax: 16,
    yUnit: "%",
    height: 300,
  },
  "9.3": {
    kind: "figure",
    type: "bars",
    caption:
      "Duration tells you how much a bond price moves for a 1% change in interest rates. Longer bonds move more.",
    bars: [
      { label: "2-year bond", value: 1.9, display: "1.9 yrs" },
      { label: "5-year bond", value: 4.2, display: "4.2 yrs" },
      { label: "10-year bond", value: 6.5, display: "6.5 yrs", tone: "highlight" },
      { label: "15-year bond", value: 8.3, display: "8.3 yrs", tone: "highlight" },
      { label: "30-year bond", value: 11.6, display: "11.6 yrs" },
    ],
  },
  "9.4": {
    kind: "figure",
    type: "spectrum",
    caption:
      "Credit ratings run from AAA at the top to D for default. Kenyan government bonds sit around B, which is high-yield territory.",
    lowLabel: "Safest (AAA)",
    highLabel: "Default (D)",
    marks: [
      { position: 10, label: "AAA", sublabel: "US Treasury" },
      { position: 45, label: "BBB", sublabel: "Investment grade floor" },
      { position: 75, label: "B", sublabel: "Kenyan government" },
      { position: 95, label: "D", sublabel: "In default" },
    ],
  },
  "9.5": {
    kind: "figure",
    type: "compare",
    caption:
      "Different issuers, different risks, different yields. The higher yield always compensates for something.",
    left: {
      title: "Government bonds",
      body: "Lowest risk, lowest yield. Backed by the ability to tax and borrow. The default starting point.",
    },
    right: {
      title: "Corporate bonds",
      body: "Higher risk, higher yield. The extra yield compensates for the possibility the company cannot pay.",
    },
  },
  "9.6": {
    kind: "figure",
    type: "compare",
    caption:
      "A ladder spreads maturities evenly. A barbell concentrates on short and long. A bullet concentrates on one.",
    left: {
      title: "Ladder",
      body: "Equal amounts at every maturity. Steady stream of maturities, no view required, easiest to live with.",
    },
    right: {
      title: "Barbell or bullet",
      body: "Both require a view on interest rates or a specific known cash flow. More concentrated, more work.",
    },
  },
  "9.7": {
    kind: "figure",
    type: "compare",
    caption:
      "Inflation-protected bonds pay less upfront but adjust for inflation. In Kenya the market is small, so real assets substitute.",
    left: {
      title: "Inflation-protected bonds",
      body: "Lower yield but principal and coupon rise with CPI. Common in the US and UK, rare in Kenya.",
    },
    right: {
      title: "Real assets in Kenya",
      body: "Real estate and equities adjust with inflation over time but with higher volatility and less certainty.",
    },
  },
  "9.8": {
    kind: "figure",
    type: "compare",
    caption:
      "Individual bonds give you a known return at maturity. Bond funds give you diversification with a price that moves.",
    left: {
      title: "Individual bonds",
      body: "You know your yield to maturity. You get the face value back on the exact date. Requires larger minimum.",
    },
    right: {
      title: "Bond funds",
      body: "Instant diversification. Small amounts to enter. Price moves daily, no fixed maturity date.",
    },
  },

  
  "10.1": {
    kind: "figure",
    type: "compare",
    caption:
      "A fund pools money from many investors and buys a portfolio. You own the units, the fund owns the securities.",
    left: {
      title: "Buying directly",
      body: "You pick stocks, place trades, and pay fees for each. High capital needed for meaningful diversification.",
    },
    right: {
      title: "Buying a fund",
      body: "One purchase gives you hundreds of securities. Lower minimum, small ongoing fee, professional management.",
    },
  },
  "10.2": {
    kind: "figure",
    type: "compare",
    caption:
      "Mutual funds and ETFs hold the same kinds of underlying assets. The differences are in fees, trading, and access.",
    left: {
      title: "Mutual funds",
      body: "Bought at end-of-day NAV. Often actively managed. Higher fees. Common in Kenya.",
    },
    right: {
      title: "ETFs and index funds",
      body: "Trade like stocks. Usually passive. Much lower fees. Growing slowly on the NSE.",
    },
  },
  "10.3": {
    kind: "figure",
    type: "bars",
    caption:
      "The same KSh 1,000,000 growing at 8% for 30 years, at three different fee levels. Fees compound against you.",
    bars: [
      { label: "0.1% fee", value: 9570000, display: "KSh 9.57M", tone: "highlight" },
      { label: "1.0% fee", value: 7610000, display: "KSh 7.61M" },
      { label: "2.0% fee", value: 5740000, display: "KSh 5.74M" },
      { label: "2.5% fee", value: 5080000, display: "KSh 5.08M" },
    ],
  },
  "10.4": {
    kind: "figure",
    type: "bars",
    caption:
      "Two index funds tracking the same benchmark. The one with lower combined fees and tracking error delivers more of the index return.",
    bars: [
      { label: "Index return", value: 10.0, display: "10.0%" },
      { label: "Fund A", value: 9.2, display: "9.2%", tone: "muted" },
      { label: "Fund B", value: 9.6, display: "9.6%", tone: "highlight" },
    ],
  },
  "10.5": {
    kind: "figure",
    type: "compare",
    caption:
      "Active funds try to beat the market. Passive funds try to match it. Most active managers fail, after fees.",
    left: {
      title: "Active fund",
      body: "Research team picks securities. Higher fees. Roughly 80% underperform their benchmark over 10 years.",
    },
    right: {
      title: "Passive fund",
      body: "Buys every security in the index. Low fees. Delivers the index return minus a tiny margin.",
    },
  },
  "10.6": {
    kind: "figure",
    type: "flow",
    caption:
      "Four questions to ask before buying any fund.",
    steps: [
      "What does the fund hold?",
      "What does it cost (expense ratio + entry/exit)?",
      "How closely does it track its benchmark?",
      "How do I access it and at what minimum?",
    ],
  },
  "10.7": {
    kind: "figure",
    type: "compare",
    caption:
      "Kenyan funds give you local exposure in shillings. International funds give you global exposure in foreign currency.",
    left: {
      title: "Kenyan unit trusts",
      body: "Denominated in shillings. No currency risk. Higher fees. Focus on NSE and Kenyan fixed income.",
    },
    right: {
      title: "International ETFs",
      body: "Denominated in dollars or other currencies. Very low fees. Access to global companies and sectors.",
    },
  },

  
  "11.1": {
    kind: "figure",
    type: "economic-series",
    caption:
      "USD/KES through 2025 and into 2026. Stable through 2025, then weakening as the oil shock hit Kenya's import bill.",
    mode: "line",
    series: [
      {
        label: "USD/KES",
        tone: "warn",
        points: [129.0, 128.8, 128.5, 129.2, 129.5, 129.0, 128.8, 129.5, 130.2, 131.0, 132.5, 134.0],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar"],
    annotations: [
      { index: 0, label: "Stable", position: "below" },
      { index: 11, label: "Weakening", position: "above" },
    ],
    yMin: 126,
    yMax: 136,
    height: 280,
  },
  "11.2": {
    kind: "figure",
    type: "compare",
    caption:
      "Liquidity determines the cost of trading. Majors are cheapest. Crosses are next. Exotics carry the widest spreads.",
    left: {
      title: "Major and cross pairs",
      body: "EUR/USD, USD/JPY, GBP/USD, EUR/GBP. Tight spreads, deep liquidity. The default for traders.",
    },
    right: {
      title: "Exotic pairs",
      body: "USD/KES, USD/ZAR, USD/TRY. Wider spreads, thinner liquidity, sharp moves on local news.",
    },
  },
  "11.3": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Kenya CBR vs US Fed funds rate. When the gap between them narrows, the shilling tends to weaken.",
    mode: "dual",
    series: [
      {
        label: "Kenya CBR (%)",
        tone: "warn",
        points: [11.25, 11.0, 10.75, 10.5, 10.25, 10.0, 9.75, 9.5, 9.25, 9.0],
      },
      {
        label: "US Fed funds (%)",
        tone: "primary",
        points: [5.25, 5.25, 5.25, 5.25, 5.0, 5.0, 4.75, 4.75, 4.5, 4.5],
      },
    ],
    xLabels: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec", "Feb", "Apr", "Jun", "Aug"],
    yMin: 4,
    yMax: 12,
    yUnit: "%",
    height: 300,
  },
  "11.4": {
    kind: "figure",
    type: "compare",
    caption:
      "Four ways to exchange currency. Each is designed for a different use case.",
    left: {
      title: "Spot and forwards",
      body: "Spot is immediate exchange. Forwards lock in a rate for a future date. Used by importers and exporters.",
    },
    right: {
      title: "Futures and options",
      body: "Futures are standardised, tradeable forwards. Options give the right but not the obligation, at a premium.",
    },
  },
  "11.5": {
    kind: "figure",
    type: "bars",
    caption:
      "A 1% move in a currency, at different leverage levels. The same move is a rounding error at 1:1 and a total loss at 100:1.",
    bars: [
      { label: "No leverage (1:1)", value: 1, display: "±1%" },
      { label: "Moderate (10:1)", value: 10, display: "±10%" },
      { label: "High (30:1)", value: 30, display: "±30%", tone: "highlight" },
      { label: "Very high (100:1)", value: 100, display: "±100%", tone: "highlight" },
    ],
  },
  "11.6": {
    kind: "figure",
    type: "compare",
    caption:
      "Speculation and hedging use the same instruments but have different purposes and risk profiles.",
    left: {
      title: "Speculation",
      body: "Open a position to profit from currency moves. High risk, most retail traders lose money.",
    },
    right: {
      title: "Hedging",
      body: "Offset a currency risk you already have. Lower risk, done to reduce uncertainty.",
    },
  },
  "11.7": {
    kind: "figure",
    type: "trading-chart",
    caption:
      "USD/KES daily candles with support at 128.8 and resistance at 130.2. When the rate breaks below support, the shilling is strengthening.",
    mode: "candles",
    candles: [
      { o: 129.0, h: 129.3, l: 128.8, c: 129.1 },
      { o: 129.1, h: 129.5, l: 129.0, c: 129.4 },
      { o: 129.4, h: 130.1, l: 129.3, c: 129.9 },
      { o: 129.9, h: 130.2, l: 129.6, c: 129.8 },
      { o: 129.8, h: 130.2, l: 129.4, c: 129.5 },
      { o: 129.5, h: 129.8, l: 128.9, c: 129.1 },
      { o: 129.1, h: 129.4, l: 128.8, c: 128.9 },
      { o: 128.9, h: 129.2, l: 128.5, c: 128.6 },
    ],
    overlays: ["support", "resistance"],
    supportLevel: 128.8,
    resistanceLevel: 130.2,
    yMin: 128.3,
    yMax: 130.5,
    height: 280,
  },
  "11.8": {
    kind: "figure",
    type: "compare",
    caption:
      "Each FX strategy has a coherent logic and a specific failure mode. The risk is always in the tail.",
    left: {
      title: "Carry and trend",
      body: "Carry earns the rate differential. Trend rides directional runs. Both fail when the trend snaps.",
    },
    right: {
      title: "Mean reversion and breakouts",
      body: "Mean reversion bets on extremes reversing. Breakouts bet on levels breaking. Both suffer false signals.",
    },
  },

  
  "12.1": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Gold price in USD over two years. Gold roughly held its value through the 2026 oil shock while stocks fell.",
    mode: "line",
    series: [
      {
        label: "Gold (USD/oz)",
        tone: "primary",
        points: [1950, 2010, 2080, 2150, 2200, 2180, 2250, 2320, 2400, 2380, 2450, 2520],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar"],
    annotations: [
      { index: 0, label: "Steady", position: "below" },
      { index: 11, label: "Held through shock", position: "above" },
    ],
    yMin: 1900,
    yMax: 2600,
    height: 280,
  },
  "12.2": {
    kind: "figure",
    type: "economic-series",
    caption:
      "Oil prices through 2025 into the 2026 oil shock. The spike in March 2026 fed into Kenyan inflation within weeks.",
    mode: "line",
    series: [
      {
        label: "Brent (USD/bbl)",
        tone: "warn",
        points: [78, 80, 82, 79, 81, 83, 85, 90, 115, 105, 98, 92],
      },
    ],
    xLabels: ["Jan 25", "Mar", "May", "Jul", "Sep", "Nov", "Jan 26", "Mar"],
    annotations: [
      { index: 0, label: "Normal", position: "below" },
      { index: 8, label: "Oil shock", position: "above" },
    ],
    yMin: 70,
    yMax: 125,
    height: 280,
  },
  "12.3": {
    kind: "figure",
    type: "compare",
    caption:
      "Agricultural commodities are weather-driven. Prices can double or halve on a single harvest.",
    left: {
      title: "Soft commodities",
      body: "Coffee, cocoa, sugar, tea. Highly weather-dependent. Big swings on a single harvest failure.",
    },
    right: {
      title: "Grains and livestock",
      body: "Wheat, maize, rice, cattle. Driven by global supply, trade policy, and biofuel demand.",
    },
  },
  "12.4": {
    kind: "figure",
    type: "compare",
    caption:
      "Commodities do not compound like equities. Their value is what they do during inflation shocks and stagflation.",
    left: {
      title: "Growth assets",
      body: "Stocks and bonds compound over decades. Commodities tend to underperform over the same period.",
    },
    right: {
      title: "Inflation shock assets",
      body: "In 2022 stocks fell 19%, bonds 13%, commodities rose 16%. Small allocations help when correlations converge.",
    },
  },
  "12.5": {
    kind: "figure",
    type: "bars",
    caption:
      "Three listed REITs on the NSE, each with a different focus and target yield.",
    bars: [
      { label: "ALP Industrial", value: 0, display: "Industrial" },
      { label: "Trific Green USD", value: 8, display: "8% USD yield", tone: "highlight" },
      { label: "ILAM Fahari", value: 0, display: "Retail / commercial" },
    ],
  },
  "12.6": {
    kind: "figure",
    type: "compare",
    caption:
      "Private equity offers higher return potential but locks up capital for years and charges high fees.",
    left: {
      title: "Public markets",
      body: "Daily liquidity. Low fees. Transparent pricing. Accessible to anyone.",
    },
    right: {
      title: "Private markets",
      body: "5 to 10 year lockup. 2% plus 20% fees. High minimums. Concentration risk.",
    },
  },
  "12.7": {
    kind: "figure",
    type: "compare",
    caption:
      "Crypto is real technology but volatile asset. Understand what it is and what it is not before deciding.",
    left: {
      title: "What it is",
      body: "Decentralised digital assets. Transparent ledgers. Real global market. Legitimate technology.",
    },
    right: {
      title: "What it is not",
      body: "Not stable. Not a safe hedge. Not regulated in Kenya yet. Not a beginner investment.",
    },
  },
  "12.8": {
    kind: "figure",
    type: "compare",
    caption:
      "Alternatives add different exposures. In small doses they help. In large doses they add cost and complexity.",
    left: {
      title: "Useful in small doses",
      body: "Real assets, some hedge strategies, gold. Different return streams to balance a portfolio.",
    },
    right: {
      title: "Usually not for retail",
      body: "Hedge funds, private equity, collectibles, structured products. High fees, low liquidity, specialist.",
    },
  },
  "13.1": {
    "kind": "figure",
    "type": "flow",
    "caption": "Four questions that produce a written direction. Answer them once, in a single sitting.",
    "steps": [
      "What am I investing for?",
      "When do I need the money?",
      "How much can I lose without damaging my life?",
      "How much can I lose without panicking?"
    ]
  },
  "13.2": {
    "kind": "figure",
    "type": "compare",
    "caption": "Capacity is financial and calculable. Tolerance is psychological and learned from experience. The lower number sets your limit.",
    "left": {
      "title": "Risk capacity",
      "body": "Maximum loss your finances can absorb without changing your plans. Objective, spreadsheet output. Does not care how you feel."
    },
    "right": {
      "title": "Risk tolerance",
      "body": "Maximum loss you can experience without making a bad decision. Subjective, learned from experience. Only you can name it."
    }
  },
  "13.3": {
    "kind": "figure",
    "type": "bars",
    "caption": "Four buckets by horizon. Each has its own risk level and its own evaluation period. Do not confuse them.",
    "bars": [
      {
        "label": "0 to 6 months",
        "value": 100,
        "display": "Cash / money market",
        "tone": "muted"
      },
      {
        "label": "1 to 3 years",
        "value": 60,
        "display": "Short bonds / fixed deposit",
        "tone": "muted"
      },
      {
        "label": "3 to 7 years",
        "value": 40,
        "display": "Balanced fund",
        "tone": "highlight"
      },
      {
        "label": "7+ years",
        "value": 20,
        "display": "Equity-heavy",
        "tone": "highlight"
      }
    ]
  },
  "13.4": {
    "kind": "figure",
    "type": "flow",
    "caption": "Four constraints every direction document has to name. Tax and liquidity are the two most Kenyans miss.",
    "steps": [
      "Liquidity: how much cash must stay accessible",
      "Horizon: when each bucket is needed",
      "Tax: CGT 15% on shares, WHT on dividends and interest",
      "Legal: what you are allowed to hold"
    ]
  },
  "13.5": {
    "kind": "figure",
    "type": "flow",
    "caption": "Six questions that produce an investor profile. The answer to each is one short line.",
    "steps": [
      "What am I investing for?",
      "When do I need the money?",
      "How much can I lose without damage?",
      "How much can I lose without panic?",
      "What am I not allowed to do?",
      "What do I refuse to hold?"
    ]
  },
  "13.6": {
    "kind": "figure",
    "type": "flow",
    "caption": "Six sections of the direction document. One page total. Read before every significant decision.",
    "steps": [
      "Goals with amounts and dates",
      "Buckets by horizon",
      "Risk capacity as a percent",
      "Risk tolerance as a percent",
      "Constraints (liquidity, tax, legal)",
      "Values (what you refuse to hold)"
    ]
  },
  "13.7": {
    "kind": "figure",
    "type": "compare",
    "caption": "Rewrite the direction for life events. Rebalance for market events. Never confuse the two.",
    "left": {
      "title": "Rewrite the document",
      "body": "Marriage, divorce, new child, large income change, approaching retirement, inheritance, major health diagnosis, buying a house."
    },
    "right": {
      "title": "Just rebalance",
      "body": "NASI up 51% in 2025, NASI down in 2022, interest rate moves, election cycles. Market events do not change who you are."
    }
  },
  "14.1": {
    "kind": "figure",
    "type": "flow",
    "caption": "Four parts of a thesis. All four need to be written before you buy, not after.",
    "steps": [
      "Catalyst: what specifically changes",
      "Position: why this company benefits",
      "Risks: three things that kill the thesis",
      "Exit: price or condition to sell"
    ]
  },
  "14.2": {
    "kind": "figure",
    "type": "bars",
    "caption": "Profit after tax across three NSE names, illustrative scale. Reading a Kenyan company starts with the numbers.",
    "bars": [
      {
        "label": "Safaricom FY2025",
        "value": 45.76,
        "display": "KSh 45.76B"
      },
      {
        "label": "KCB HY2025",
        "value": 32.3,
        "display": "KSh 32.3B"
      },
      {
        "label": "Equity Q3 2025",
        "value": 54.1,
        "display": "KSh 54.1B",
        "tone": "highlight"
      }
    ]
  },
  "14.3": {
    "kind": "figure",
    "type": "bars",
    "caption": "NSE P/E in 2025 to 2026 versus the historical average. The market trades well below its long-run multiple.",
    "bars": [
      {
        "label": "Low end 2025-26",
        "value": 5.1,
        "display": "5.1x",
        "tone": "highlight"
      },
      {
        "label": "High end 2025-26",
        "value": 8.4,
        "display": "8.4x"
      },
      {
        "label": "Historical average low",
        "value": 11.3,
        "display": "11.3x",
        "tone": "muted"
      },
      {
        "label": "Historical average high",
        "value": 11.9,
        "display": "11.9x",
        "tone": "muted"
      }
    ]
  },
  "14.4": {
    "kind": "figure",
    "type": "flow",
    "caption": "Five steps before you buy a position. Size, liquidity, exit, tax, review.",
    "steps": [
      "Cap the position at 5% of portfolio",
      "Check daily volume and bid-ask spread",
      "Write the exit condition before entry",
      "Budget for 15% CGT on gains",
      "Set the review date (6 or 12 months)"
    ]
  },
  "14.5": {
    "kind": "figure",
    "type": "flow",
    "caption": "Seven sections of the one-page thesis. Fits on half a page if you are honest.",
    "steps": [
      "Thesis (one sentence)",
      "Catalyst",
      "Evidence (three data points)",
      "Risks (three specific)",
      "Conviction (high / medium / low)",
      "Exit condition",
      "Review date"
    ]
  },
  "15.1": {
    "kind": "figure",
    "type": "bars",
    "caption": "Four biases identified in peer-reviewed research on NSE investors. Information processing bias has the largest effect.",
    "bars": [
      {
        "label": "Confirmation",
        "value": 62,
        "display": "Moderate impact"
      },
      {
        "label": "Overconfidence",
        "value": 70,
        "display": "Strong impact"
      },
      {
        "label": "Familiarity",
        "value": 58,
        "display": "Moderate impact"
      },
      {
        "label": "Information processing",
        "value": 88,
        "display": "Strongest impact",
        "tone": "highlight"
      }
    ]
  },
  "15.2": {
    "kind": "figure",
    "type": "bars",
    "caption": "Disposition effect by trade frequency and investor type. Trading more makes it worse. Groups make it better.",
    "bars": [
      {
        "label": "Frequent traders",
        "value": 85,
        "display": "High",
        "tone": "highlight"
      },
      {
        "label": "Occasional traders",
        "value": 55,
        "display": "Moderate"
      },
      {
        "label": "Rare traders",
        "value": 30,
        "display": "Low"
      },
      {
        "label": "Group investors",
        "value": 22,
        "display": "Lowest",
        "tone": "highlight"
      }
    ]
  },
  "15.3": {
    "kind": "figure",
    "type": "economic-series",
    "caption": "NASI through 2025 and into 2026. The rally peaked late in the year, then corrected. Late entrants paid the cost.",
    "mode": "line",
    "series": [
      {
        "label": "NASI",
        "tone": "primary",
        "points": [
          123.5,
          132,
          141.5,
          152,
          160.5,
          172,
          186.6,
          180.2
        ]
      }
    ],
    "xLabels": [
      "Jan 25",
      "Mar",
      "May",
      "Jul",
      "Sep",
      "Oct",
      "Dec",
      "Feb 26"
    ],
    "annotations": [
      {
        "index": 0,
        "label": "Start of year",
        "position": "below"
      },
      {
        "index": 6,
        "label": "Peak",
        "position": "above"
      },
      {
        "index": 7,
        "label": "Correction",
        "position": "below"
      }
    ],
    "yMin": 110,
    "yMax": 200,
    "height": 300
  },
  "15.4": {
    "kind": "figure",
    "type": "flow",
    "caption": "Five red flags that appear in almost every unlicensed investment scheme in Kenya.",
    "steps": [
      "Promises of high fixed returns (20% per month)",
      "Social proof: everyone in your chama is earning",
      "Urgency: offer closes Friday",
      "Complexity: AI trading, blockchain arbitrage, forex bots",
      "Not on the CMA licensed entities list"
    ]
  },
  "15.5": {
    "kind": "figure",
    "type": "flow",
    "caption": "Five structural counter-measures. None require willpower. All change the default behaviour.",
    "steps": [
      "Written rule with a calendar date",
      "Decision checklist before every buy",
      "Devil's advocate reviews the thesis first",
      "Automatic contributions via standing order",
      "Chama or SACCO governance for accountability"
    ]
  },
  "16.1": {
    "kind": "figure",
    "type": "flow",
    "caption": "Tax obligations for a Kenyan investor. NSE shares are exempt from CGT. Property and unquoted shares are not.",
    "steps": [
      "CGT 15% on property and unquoted share transfers",
      "NSE-listed shares exempt from CGT",
      "Dividend WHT 5% for residents",
      "Interest WHT 15% on deposits and bonds",
      "File Form CGT1 within 30 days of transfer",
      "Keep records for 7 years"
    ]
  },
  "16.2": {
    "kind": "figure",
    "type": "compare",
    "caption": "Automatic contributions remove the monthly decision. Manual investing requires willpower every month.",
    "left": {
      "title": "Manual",
      "body": "Decide each month whether to invest. Timing depends on mood and cash flow. Frequently skipped."
    },
    "right": {
      "title": "Automatic",
      "body": "Standing order or M-Pesa Paybill executes without decision. Weekly or monthly. Never skipped."
    }
  },
  "16.3": {
    "kind": "figure",
    "type": "flow",
    "caption": "The annual review schedule. Three dates, six hours per year, produces a portfolio that reflects your life.",
    "steps": [
      "1 January: rebalance to target allocation",
      "30 June: rebalance again",
      "31 December: full IPS review + thesis check",
      "Life event: rewrite the IPS",
      "Market event: no action, wait for calendar"
    ]
  },
  "16.4": {
    "kind": "figure",
    "type": "compare",
    "caption": "Fee-only advisers work for you. Commission advisers work for the product they sell.",
    "left": {
      "title": "Fee-only adviser",
      "body": "Charges 0.5% to 1.5% of assets under advice. No commission from product providers. Legally required to risk-profile and document."
    },
    "right": {
      "title": "Commission adviser",
      "body": "Paid by the fund manager, typically 1% to 3% upfront plus trail. No fee transparency. Product bias is structural."
    }
  },
  "16.5": {
    "kind": "figure",
    "type": "flow",
    "caption": "Five-step scam check. Any one red flag is a warning. Two or more is a near-certainty.",
    "steps": [
      "Check cma.or.ke licensed entities register",
      "Look for promises of high fixed returns",
      "Look for social proof and testimonials",
      "Look for urgency and limited slots",
      "Look for complex mechanisms (AI, blockchain arbitrage)"
    ]
  },
  "16.6": {
    "kind": "figure",
    "type": "bars",
    "caption": "Same KSh 5,000 monthly contribution at 10%. Starting at 25 beats starting at 35 by 34% even with half the contributions.",
    "bars": [
      {
        "label": "Start at 25 (10 yrs contributions)",
        "value": 5.1,
        "display": "KSh 5.1M",
        "tone": "highlight"
      },
      {
        "label": "Start at 35 (20 yrs contributions)",
        "value": 3.8,
        "display": "KSh 3.8M"
      }
    ]
  },
  "16.7": {
    "kind": "figure",
    "type": "flow",
    "caption": "Six sections of the Investment Policy Statement. One page, signed, filed with your will.",
    "steps": [
      "Objectives with amounts and dates",
      "Constraints (liquidity, horizon, tax, legal, values)",
      "Risk (capacity vs tolerance, lower binds)",
      "Target allocation as bands, not points",
      "Rebalancing rule with specific dates",
      "Review schedule and rewrite triggers"
    ]
  },
  "17.1": {
    "kind": "figure",
    "type": "bars",
    "caption": "Offshore returns for Kenyan pension funds vs domestic, over three windows. Offshore led over every period.",
    "bars": [
      {
        "label": "Q2 2025",
        "value": 11.5,
        "display": "11.5%"
      },
      {
        "label": "3-year annualised",
        "value": 22.2,
        "display": "22.2%",
        "tone": "highlight"
      },
      {
        "label": "5-year annualised",
        "value": 13.9,
        "display": "13.9%",
        "tone": "highlight"
      }
    ]
  },
  "17.2": {
    "kind": "figure",
    "type": "compare",
    "caption": "Two categories of access route. Mobile-first platforms for small amounts, institutional brokers for larger.",
    "left": {
      "title": "Mobile-first platforms",
      "body": "PandaPanda, Hisa, Ndovu. Fractional from $1. M-Pesa funding. Commission-free or low fees."
    },
    "right": {
      "title": "Institutional brokers",
      "body": "AIB-AXYS via Scope Markets. Higher minimums ($500 to $1,000). Established broker relationship."
    }
  },
  "17.3": {
    "kind": "figure",
    "type": "economic-series",
    "caption": "USD/KES through 2025 into 2026. Analyst projections range from 132 to 134. Currency moves affect returns both ways.",
    "mode": "line",
    "series": [
      {
        "label": "USD/KES",
        "tone": "warn",
        "points": [
          129,
          128.8,
          129.2,
          129.5,
          130,
          130.5,
          131,
          132.5,
          134
        ]
      }
    ],
    "xLabels": [
      "Jan 25",
      "Mar",
      "May",
      "Jul",
      "Sep",
      "Nov",
      "Jan 26",
      "Mar",
      "May"
    ],
    "annotations": [
      {
        "index": 0,
        "label": "Baseline",
        "position": "below"
      },
      {
        "index": 8,
        "label": "Analyst projection",
        "position": "above"
      }
    ],
    "yMin": 126,
    "yMax": 136,
    "height": 280
  },
  "17.4": {
    "kind": "figure",
    "type": "flow",
    "caption": "Double Taxation Agreements and their withholding rates. Ireland and US do not have a DTA with Kenya.",
    "steps": [
      "14 DTAs in force with treaty partners",
      "Most treaty dividend WHT: 10%",
      "UAE and Iran: 5%",
      "Kenya-Singapore DTA: 8% dividends from 2027",
      "US-source dividends: 30% WHT (no DTA)",
      "Foreign tax credit prevents double taxation"
    ]
  },
  "17.5": {
    "kind": "figure",
    "type": "flow",
    "caption": "Accessing global markets from Kenya. Five steps from account to first trade.",
    "steps": [
      "Choose platform (verify CMA or foreign licence)",
      "Complete KYC with national ID or passport",
      "Fund via M-Pesa, bank transfer, or card",
      "Provide source-of-funds documents above $15,000",
      "Buy fractional shares from $1"
    ]
  },
  "17.6": {
    "kind": "figure",
    "type": "compare",
    "caption": "Global ETFs vs Kenyan unit trusts. Same broad exposure, radically different fee structures.",
    "left": {
      "title": "Global ETFs",
      "body": "0.03% to 0.60% expense ratio. Irish-domiciled reduces US WHT to 15%. Daily liquidity. Thousands of companies."
    },
    "right": {
      "title": "Kenyan unit trusts",
      "body": "1.5% to 2.5% expense ratio. Local currency. No FX risk. Concentrated in NSE names."
    }
  },
  "17.7": {
    "kind": "figure",
    "type": "flow",
    "caption": "Five common pitfalls in international investing. All are avoidable with planning.",
    "steps": [
      "Over-concentration in US tech",
      "Ignoring withholding tax (fund domicile matters)",
      "Currency timing (rarely works)",
      "Estate tax exposure above $60K USD in US-domiciled assets",
      "Failure to declare foreign income on KRA return"
    ]
  },
  "17.8": {
    "kind": "figure",
    "type": "bars",
    "caption": "Sample allocation for a 20-year horizon Kenyan retail investor. Kenyan pension cap shown for context.",
    "bars": [
      {
        "label": "Kenyan equities",
        "value": 65,
        "display": "65%"
      },
      {
        "label": "Kenyan bonds",
        "value": 10,
        "display": "10%"
      },
      {
        "label": "International ETF",
        "value": 25,
        "display": "25%",
        "tone": "highlight"
      },
      {
        "label": "Pension fund cap",
        "value": 15,
        "display": "15% (for reference)",
        "tone": "muted"
      }
    ]
  },
  "17.9": {
    "kind": "figure",
    "type": "compare",
    "caption": "Complexity threshold for specialist advice. Scale with portfolio size, not with ambition.",
    "left": {
      "title": "Below $50K USD",
      "body": "Handle it yourself. Simple tax reporting. Rebalance annually. No specialist needed."
    },
    "right": {
      "title": "Above $50K USD",
      "body": "Consultation on estate tax, succession, and residency if planning to move. Above $200K, specialist."
    }
  },
};
