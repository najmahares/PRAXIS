import { ImageResponse } from "next/og";

export const alt = "PRAXIS, Your first portfolio doesn't have to be real.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#eff6ff",
        padding: "72px 80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#0f172a",
        }}
      >
        PRAXIS
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#0f172a",
            maxWidth: 960,
          }}
        >
          Your first portfolio doesn&rsquo;t have to be real.
        </div>
        <div
          style={{
            fontSize: 26,
            lineHeight: 1.4,
            color: "#475569",
            maxWidth: 840,
          }}
        >
          Learn the stock market by practicing it. Virtual capital you choose in
          capital. No real money.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: "#2563eb",
          fontWeight: 600,
        }}
      >
        praxis.example
      </div>
    </div>,
    { ...size },
  );
}
