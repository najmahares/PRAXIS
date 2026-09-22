export type Sector =
  | "Banking"
  | "Telecommunications"
  | "Consumer Goods"
  | "Energy"
  | "Insurance"
  | "Investment"
  | "Manufacturing"
  | "Agriculture"
  | "Construction"
  | "Commercial Services";

export type Company = {
  ticker: string;
  name: string;
  sector: Sector;
  description: string;
  priceKsh: number;
  marketCapB: number;
  pe: number | null;
  eps: number | null;
  dividendKsh: number | null;
  dividendYieldPct: number | null;
  revenueB: number;
  netIncomeB: number;
  fiscalYear: string;
  fiscalPeriodEnded: string;
  riskNote: string;
  strengthNote: string;
};

export const MARKET_SNAPSHOT_DATE = "January 2026";

export const COMPANIES: Company[] = [
  {
    ticker: "SCOM",
    name: "Safaricom PLC",
    sector: "Telecommunications",
    description:
      "Kenya's largest telecommunications operator. Provides mobile voice, data, M-Pesa mobile money, and enterprise services across Kenya, Ethiopia, and the wider region.",
    priceKsh: 35.2,
    marketCapB: 1410,
    pe: 14.8,
    eps: 2.39,
    dividendKsh: 2.0,
    dividendYieldPct: 5.68,
    revenueB: 427.6,
    netIncomeB: 95.6,
    fiscalYear: "FY2026",
    fiscalPeriodEnded: "March 2026",
    riskNote:
      "Regulatory pressure on M-Pesa pricing, Ethiopia expansion still loss-making, and heavy capital expenditure on network.",
    strengthNote:
      "Dominant market position, M-Pesa now 45.6% of Kenya service revenue, 71.6M customers across the Group.",
  },
  {
    ticker: "EQTY",
    name: "Equity Group Holdings",
    sector: "Banking",
    description:
      "One of East Africa's largest banking groups, operating in Kenya, Uganda, Tanzania, Rwanda, South Sudan, and the DRC. Focused on retail and SME lending.",
    priceKsh: 100.0,
    marketCapB: 377,
    pe: 5.0,
    eps: 20.0,
    dividendKsh: 4.5,
    dividendYieldPct: 4.5,
    revenueB: 220.0,
    netIncomeB: 75.5,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Regional exposure to volatile currencies and political risk across the DRC and South Sudan.",
    strengthNote:
      "First Kenyan bank to cross KSh 75B in net profit. Strong retail franchise and digital banking adoption.",
  },
  {
    ticker: "KCB",
    name: "KCB Group PLC",
    sector: "Banking",
    description:
      "Kenya's largest bank by total assets, with operations across East Africa. Provides retail, corporate, and investment banking services.",
    priceKsh: 96.25,
    marketCapB: 319,
    pe: 4.7,
    eps: 20.5,
    dividendKsh: 5.0,
    dividendYieldPct: 5.19,
    revenueB: 218.0,
    netIncomeB: 68.4,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "High non-performing loan ratio in the retail segment. Exposure to government securities ties up capital.",
    strengthNote:
      "Total assets of KSh 2.15T. Diversified across six East African markets.",
  },
  {
    ticker: "EABL",
    name: "East African Breweries PLC",
    sector: "Consumer Goods",
    description:
      "The largest alcoholic beverage company in East Africa. Brews and distributes beer, spirits, and non-alcoholic drinks across Kenya, Uganda, and Tanzania.",
    priceKsh: 288.75,
    marketCapB: 227,
    pe: 15.6,
    eps: 18.5,
    dividendKsh: 8.5,
    dividendYieldPct: 2.94,
    revenueB: 128.8,
    netIncomeB: 12.2,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "June 2025",
    riskNote:
      "Excise duty increases, currency pressure on imported raw materials, and shifting consumer demand toward spirits.",
    strengthNote:
      "Dominant brand portfolio including Tusker, Guinness, and Johnnie Walker. Consistent dividend history.",
  },
  {
    ticker: "COOP",
    name: "Co-operative Bank of Kenya",
    sector: "Banking",
    description:
      "A tier-one Kenyan bank with a strong presence in the co-operative sector and retail banking.",
    priceKsh: 37.45,
    marketCapB: 220,
    pe: 5.4,
    eps: 6.93,
    dividendKsh: 2.5,
    dividendYieldPct: 6.68,
    revenueB: 78.0,
    netIncomeB: 25.6,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Heavy exposure to government securities. Slower loan growth than peers.",
    strengthNote:
      "Efficient operationally. One of the highest dividend yields among Kenyan banks.",
  },
  {
    ticker: "ABSA",
    name: "Absa Bank Kenya PLC",
    sector: "Banking",
    description:
      "A Kenyan subsidiary of the Absa Group. Focused on retail, business banking, and wealth management.",
    priceKsh: 34.85,
    marketCapB: 189,
    pe: 6.2,
    eps: 5.62,
    dividendKsh: 2.2,
    dividendYieldPct: 6.31,
    revenueB: 60.0,
    netIncomeB: 19.4,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Concentrated in Kenya only, unlike regional peers. Slower digital transformation than Equity or KCB.",
    strengthNote:
      "Strong brand and consistent profitability. Growing SME lending book.",
  },
  {
    ticker: "KPC",
    name: "Kenya Pipeline Company",
    sector: "Energy",
    description:
      "State-controlled company that transports and stores refined petroleum products across Kenya, Uganda, Rwanda, and South Sudan.",
    priceKsh: 9.02,
    marketCapB: 164,
    pe: 5.6,
    eps: 1.61,
    dividendKsh: 0.7,
    dividendYieldPct: 7.76,
    revenueB: 30.0,
    netIncomeB: 22.0,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "June 2025",
    riskNote:
      "Government-controlled. Policy decisions can override commercial interests. Regional fuel demand shifts could reduce volumes.",
    strengthNote:
      "Monopoly on petroleum transport in Kenya. Very high dividend yield and stable cash flows.",
  },
  {
    ticker: "NCBA",
    name: "NCBA Group PLC",
    sector: "Banking",
    description:
      "A merger of NIC Bank and Commercial Bank of Africa. Focused on retail banking, asset finance, and digital lending.",
    priceKsh: 91.0,
    marketCapB: 150,
    pe: 4.2,
    eps: 21.7,
    dividendKsh: 6.0,
    dividendYieldPct: 6.59,
    revenueB: 100.0,
    netIncomeB: 26.5,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Exposure to unsecured digital lending through M-Shwari and Fuliza carries higher credit risk.",
    strengthNote:
      "Strong partnership with Safaricom on M-Shwari. Low cost-to-income ratio.",
  },
  {
    ticker: "IMH",
    name: "I&M Group PLC",
    sector: "Banking",
    description:
      "A regional banking group headquartered in Nairobi, with operations in Kenya, Rwanda, Tanzania, Uganda, and Mauritius.",
    priceKsh: 80.75,
    marketCapB: 141,
    pe: 4.4,
    eps: 18.4,
    dividendKsh: 4.5,
    dividendYieldPct: 5.57,
    revenueB: 85.0,
    netIncomeB: 24.0,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Smaller footprint in Kenya than tier-one peers. Currency exposure in regional subsidiaries.",
    strengthNote:
      "Strong corporate banking franchise. Growing wealth management business.",
  },
  {
    ticker: "SCBK",
    name: "Standard Chartered Kenya",
    sector: "Banking",
    description:
      "A subsidiary of Standard Chartered PLC. Focused on corporate, commercial, and high-net-worth clients.",
    priceKsh: 340.0,
    marketCapB: 128,
    pe: 6.3,
    eps: 54.0,
    dividendKsh: 22.0,
    dividendYieldPct: 6.47,
    revenueB: 42.0,
    netIncomeB: 16.0,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Limited retail presence. Revenue concentration in corporate and institutional banking.",
    strengthNote:
      "Access to global Standard Chartered network. Conservative balance sheet with low NPLs.",
  },
  {
    ticker: "SBIC",
    name: "Stanbic Holdings PLC",
    sector: "Banking",
    description:
      "A subsidiary of Standard Bank Group. Provides banking, wealth, and investment services in Kenya and South Sudan.",
    priceKsh: 262.5,
    marketCapB: 104,
    pe: 5.3,
    eps: 49.5,
    dividendKsh: 14.4,
    dividendYieldPct: 5.49,
    revenueB: 50.0,
    netIncomeB: 12.8,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Similar to StanChart: limited retail presence. Slower local growth than Equity or KCB.",
    strengthNote:
      "Part of Africa's largest banking group. Strong investment banking arm (SBG Securities).",
  },
  {
    ticker: "KEGN",
    name: "KenGen PLC",
    sector: "Energy",
    description:
      "Kenya's largest electricity generator. Operates hydro, geothermal, wind, and thermal power plants. Majority state-owned.",
    priceKsh: 11.95,
    marketCapB: 79,
    pe: 4.0,
    eps: 2.99,
    dividendKsh: 0.3,
    dividendYieldPct: 2.51,
    revenueB: 55.0,
    netIncomeB: 19.8,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "June 2025",
    riskNote:
      "Dependent on rainfall for hydro and Kenya Power (its main customer) for payments. Government majority ownership limits minority shareholder influence.",
    strengthNote:
      "Dominant position in Kenyan power generation. Growing geothermal capacity reduces weather risk.",
  },
  {
    ticker: "BAT",
    name: "BAT Kenya PLC",
    sector: "Consumer Goods",
    description:
      "A subsidiary of British American Tobacco. Manufactures and sells cigarettes and other tobacco products in Kenya and export markets.",
    priceKsh: 553.0,
    marketCapB: 55,
    pe: 8.9,
    eps: 62.2,
    dividendKsh: 45.0,
    dividendYieldPct: 8.14,
    revenueB: 33.0,
    netIncomeB: 6.2,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Declining cigarette volumes globally. Regulatory pressure on tobacco. ESG concerns limit institutional interest.",
    strengthNote:
      "Very high dividend yield. Strong cash generation with minimal capital expenditure needs.",
  },
  {
    ticker: "DTK",
    name: "Diamond Trust Bank Kenya",
    sector: "Banking",
    description:
      "A tier-two Kenyan bank with operations in Kenya, Tanzania, Uganda, and Burundi. Focused on retail and SME banking.",
    priceKsh: 192.75,
    marketCapB: 54,
    pe: 3.9,
    eps: 49.4,
    dividendKsh: 10.0,
    dividendYieldPct: 5.19,
    revenueB: 45.0,
    netIncomeB: 13.8,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Smaller balance sheet than tier-one peers. Regional exposure adds complexity.",
    strengthNote:
      "Strong asset quality with low NPLs. Consistent dividend payer.",
  },
  {
    ticker: "FMLY",
    name: "Family Bank Kenya",
    sector: "Banking",
    description:
      "A mid-tier Kenyan bank focused on SME and retail banking. Known for community-level financial inclusion.",
    priceKsh: 30.9,
    marketCapB: 51,
    pe: 4.7,
    eps: 6.6,
    dividendKsh: 1.5,
    dividendYieldPct: 4.85,
    revenueB: 18.0,
    netIncomeB: 5.4,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Smaller size makes it more vulnerable to economic shocks. Less diversified revenue base.",
    strengthNote:
      "Strong presence in SME lending. Growing digital channels.",
  },
  {
    ticker: "BRIT",
    name: "Britam Holdings PLC",
    sector: "Insurance",
    description:
      "A regional insurance and asset management group with operations in Kenya, Uganda, Tanzania, Rwanda, South Sudan, and Malawi.",
    priceKsh: 8.5,
    marketCapB: 22,
    pe: 5.1,
    eps: 1.67,
    dividendKsh: 0.4,
    dividendYieldPct: 4.71,
    revenueB: 50.0,
    netIncomeB: 4.3,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Exposure to long-term insurance liabilities. Regional operations add currency and regulatory complexity.",
    strengthNote:
      "Diversified across insurance and asset management. Regional footprint provides growth options.",
  },
  {
    ticker: "JUB",
    name: "Jubilee Holdings PLC",
    sector: "Insurance",
    description:
      "East Africa's largest insurance group. Operates in Kenya, Uganda, Tanzania, Burundi, and Mauritius across life and general insurance.",
    priceKsh: 215.0,
    marketCapB: 15.6,
    pe: 4.4,
    eps: 48.9,
    dividendKsh: 12.0,
    dividendYieldPct: 5.58,
    revenueB: 62.0,
    netIncomeB: 3.5,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Insurance industry faces rising claims and tighter regulation. Currency risk across regional operations.",
    strengthNote:
      "Largest insurance group in the region. Consistent dividend record.",
  },
  {
    ticker: "CTUM",
    name: "Centum Investment Company",
    sector: "Investment",
    description:
      "Kenya's largest listed investment company. Holds a portfolio across financial services, energy, real estate, and agribusiness.",
    priceKsh: 9.4,
    marketCapB: 6.3,
    pe: null,
    eps: null,
    dividendKsh: 0.4,
    dividendYieldPct: 4.26,
    revenueB: 12.0,
    netIncomeB: -1.2,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "March 2025",
    riskNote:
      "Investment holding company with wide NAV discount. Portfolio company performance varies significantly.",
    strengthNote:
      "Diversified portfolio across sectors. Long history of value investing in East Africa.",
  },
  {
    ticker: "BAMB",
    name: "Bamburi Cement PLC",
    sector: "Construction",
    description:
      "One of East Africa's largest cement manufacturers. Operations in Kenya and Uganda. Part of the Holcim group.",
    priceKsh: 65.0,
    marketCapB: 23.6,
    pe: 15.0,
    eps: 4.33,
    dividendKsh: 2.0,
    dividendYieldPct: 3.08,
    revenueB: 42.0,
    netIncomeB: 1.6,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Cement demand tracks construction activity, which is sensitive to interest rates. Energy costs are a major input.",
    strengthNote:
      "Market-leading brand in Kenya. Strong distribution network across the region.",
  },
  {
    ticker: "SASN",
    name: "Sasini PLC",
    sector: "Agriculture",
    description:
      "A Kenyan agricultural company with operations in tea, coffee, and macadamia. Also holds an investment portfolio.",
    priceKsh: 18.5,
    marketCapB: 3.6,
    pe: 6.9,
    eps: 2.68,
    dividendKsh: 0.5,
    dividendYieldPct: 2.7,
    revenueB: 8.0,
    netIncomeB: 0.52,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "September 2025",
    riskNote:
      "Weather-dependent. Commodity price exposure (tea, coffee). Smaller scale than other listed companies.",
    strengthNote:
      "Diversified across multiple crops and an investment portfolio. Growing macadamia segment.",
  },
  {
    ticker: "NMG",
    name: "Nation Media Group",
    sector: "Commercial Services",
    description:
      "East Africa's largest media house. Publishes newspapers, operates radio and TV stations, and runs a digital platform.",
    priceKsh: 22.0,
    marketCapB: 4.1,
    pe: 5.5,
    eps: 4.0,
    dividendKsh: 1.0,
    dividendYieldPct: 4.55,
    revenueB: 8.5,
    netIncomeB: 0.74,
    fiscalYear: "FY2025",
    fiscalPeriodEnded: "December 2025",
    riskNote:
      "Structural decline in print advertising. Digital monetisation is challenging.",
    strengthNote:
      "Strong brand recognition across East Africa. Diversified revenue across print, broadcast, and digital.",
  },
];

export function getCompaniesBySector(): Record<string, Company[]> {
  return COMPANIES.reduce<Record<string, Company[]>>((groups, company) => {
    if (!groups[company.sector]) groups[company.sector] = [];
    groups[company.sector].push(company);
    return groups;
  }, {});
}

export function getAllSectors(): Sector[] {
  return Array.from(new Set(COMPANIES.map((company) => company.sector))).sort() as Sector[];
}

export function getCompany(ticker: string): Company | null {
  return COMPANIES.find((c) => c.ticker === ticker) ?? null;
}
