"use client";

type Partner = {
  ticker: string;
  name: string;
};

const PARTNERS: Partner[] = [
  { ticker: "SCOM", name: "Safaricom" },
  { ticker: "EQTY", name: "Equity Group" },
  { ticker: "KCB", name: "KCB Group" },
  { ticker: "EABL", name: "EABL" },
  { ticker: "COOP", name: "Co-op Bank" },
  { ticker: "ABSA", name: "Absa Kenya" },
  { ticker: "SCBK", name: "StanChart Kenya" },
  { ticker: "BAMB", name: "Bamburi" },
  { ticker: "BAT", name: "BAT Kenya" },
  { ticker: "CENT", name: "Centum" },
];

const PALETTE = [
  { bg: "var(--color-tint-blue-bg)", border: "var(--color-tint-blue-border)", text: "var(--color-tint-blue-fg)" },
  { bg: "var(--color-tint-teal-bg)", border: "var(--color-tint-teal-border)", text: "var(--color-tint-teal-fg)" },
  { bg: "var(--color-tint-purple-bg)", border: "var(--color-tint-purple-border)", text: "var(--color-tint-purple-fg)" },
  { bg: "var(--color-tint-amber-bg)", border: "var(--color-tint-amber-border)", text: "var(--color-tint-amber-fg)" },
  { bg: "var(--color-tint-green-bg)", border: "var(--color-tint-green-border)", text: "var(--color-tint-green-fg)" },
  { bg: "var(--color-tint-rose-bg)", border: "var(--color-tint-rose-border)", text: "var(--color-tint-rose-fg)" },
];

export default function PartnersMarquee() {
  return (
    <div className="praxis-marquee-root" aria-label="Practice companies">
      <div className="praxis-marquee-row praxis-marquee-left">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  );
}

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="praxis-marquee-track" aria-hidden={ariaHidden || undefined}>
      {PARTNERS.map((partner, index) => {
        const colors = PALETTE[index % PALETTE.length];
        return (
          <div
            key={`${partner.ticker}-${index}`}
            className="praxis-diamond"
            style={{
              background: colors.bg,
              borderColor: colors.border,
            }}
          >
            <div className="praxis-diamond-inner">
              <span className="praxis-diamond-ticker" style={{ color: colors.text }}>
                {partner.ticker}
              </span>
              <span className="praxis-diamond-name">{partner.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
