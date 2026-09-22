const HARD_BLOCK = [
  /guaranteed?\s+(return|profit|gain|money)/i,
  /double\s+your\s+money/i,
  /\brisk[\s-]?free\b/i,
  /\b100%\s+(return|profit|guaranteed)/i,
  /\bDM\s+me\b/i,
  /\bWhatsApp\s+me\b/i,
  /\bInbox\s+me\b/i,
  /\binbox\s+for\s+(signals|details)/i,
  /\bsend\s+me\s+money\b/i,
  /\bto\s+the\s+moon\b/i,
  /\bpump\s+and\s+dump\b/i,
  /\b\d{4,}\s*%?\s*(per|a)\s+(week|month|day)/i,
  /\+254[\s-]?7\d{2}[\s-]?\d{3}[\s-]?\d{3}/,
];

const TICKERS = [
  "SCOM", "EQTY", "KCB", "COOP", "ABSA", "NCBA", "SCBK",
  "EABL", "BAMB", "BAT", "KEGN", "TOTL", "UMME", "KPLC",
  "CIC", "BRIT", "JUB", "KNRE", "NSE", "SASN", "WTK", "KAKU",
];

const PREDICTIVE = [
  /\bwill\s+(hit|reach|go\s+to)\b/i,
  /\btarget\s+price\b/i,
  /\bbuy\s+now\b/i,
  /\bsell\s+now\b/i,
  /\bpump\b/i,
  /\bmoonshot\b/i,
];

export type ModerationResult =
  | { ok: true }
  | { ok: false; reason: string };

export function moderate(text: string): ModerationResult {
  const trimmed = text.trim();
  if (trimmed.length < 4) return { ok: false, reason: "Post is too short." };
  if (trimmed.length > 6000) return { ok: false, reason: "Keep it under 6,000 characters." };

  for (const re of HARD_BLOCK) {
    if (re.test(trimmed)) {
      return {
        ok: false,
        reason: "This looks like investment advice or a scam pattern. Remove promises of returns, contact requests, or money transfers.",
      };
    }
  }

  const upper = trimmed.toUpperCase();
  const mentionsTicker = TICKERS.some((t) => new RegExp("\\b" + t + "\\b").test(upper));
  if (mentionsTicker) {
    for (const re of PREDICTIVE) {
      if (re.test(trimmed)) {
        return {
          ok: false,
          reason: "No price predictions on specific tickers. Ask a question or share what you learned instead.",
        };
      }
    }
  }

  const profanity = /\b(f+u+c+k+|s+h+i+t+|a+s+s+h+o+l+e+)\b/i;
  if (profanity.test(trimmed)) return { ok: false, reason: "Keep it civil." };

  return { ok: true };
}

export function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
