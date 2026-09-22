

export type KenyaStock = {
  ticker: string;
  name: string;
  priceKsh: number;
  changeKsh: number;
  changePct: number;
  volume: number | null;
  marketCapB: number | null;
  sector: string | null;
};

export type KenyaMover = KenyaStock & { direction: "gainers" | "losers" };

export type KenyaIndex = {
  name: string;
  value: number;
  change: number | null;
  changePct: number | null;
  ytdChange: string | null;
  scrapedAt: string | null;
};

export type HistoryPoint = { t: string; p: number };
