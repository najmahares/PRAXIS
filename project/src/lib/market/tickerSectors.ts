


import type { Sector } from "./companies";

export const TICKER_SECTORS: Record<string, Sector> = {
  
  EQTY: "Banking", KCB: "Banking", COOP: "Banking", ABSA: "Banking",
  NCBA: "Banking", SCBK: "Banking", DTK: "Banking", HF: "Banking",
  SBIC: "Banking", ICDC: "Banking", BKG: "Banking",
  
  SCOM: "Telecommunications",
  
  BRIT: "Insurance", CIC: "Insurance", JUB: "Insurance",
  KNRE: "Insurance", LBTY: "Insurance",
  
  NSE: "Investment", OCH: "Investment", LIMT: "Investment",
  SMWF: "Investment", KURV: "Investment", GLDC: "Investment",
  
  BAMB: "Manufacturing", BOC: "Manufacturing", CARB: "Manufacturing",
  SMER: "Manufacturing", EABL: "Manufacturing", BAT: "Manufacturing",
  UNGA: "Manufacturing", MASH: "Manufacturing",
  
  KEGN: "Energy", KPLC: "Energy", TOTL: "Energy", UMME: "Energy",
  
  SASN: "Agriculture", WTK: "Agriculture", KAKU: "Agriculture",
  
  FTGH: "Construction", ARML: "Construction",
  
  KQ: "Commercial Services", TPSE: "Commercial Services",
  SCAN: "Commercial Services", XPRS: "Commercial Services",
  CTUM: "Commercial Services", PORT: "Commercial Services",
  UCHM: "Commercial Services", BERG: "Commercial Services",
  SASN_ALT: "Commercial Services", HFCK: "Banking",
};

export function getSectorForTicker(ticker: string): Sector | null {
  const upper = ticker.toUpperCase();
  return TICKER_SECTORS[upper] ?? null;
}
