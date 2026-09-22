"use client";

type Candle = { o: number; h: number; l: number; c: number };

type Annotation = {
  candleIndex: number;
  label: string;
  position: "above" | "below";
};

type TradingChartProps = {
  mode: "line" | "bars" | "candles" | "platform";
  candles?: Candle[];
  overlays?: string[];
  annotations?: Annotation[];
  supportLevel?: number;
  resistanceLevel?: number;
  trendline?: {
    startIndex: number;
    startValue: number;
    endIndex: number;
    endValue: number;
  };
  yMin?: number;
  yMax?: number;
  height?: number;
  caption: string;
};

const WIDTH = 760;
const PAD = { left: 58, right: 18, top: 34, bottom: 26 };
const VOLUME_RATIO = 0.22;

const UP = "#16a34a";
const DOWN = "#dc2626";

export default function TradingChart(props: TradingChartProps) {
  if (props.mode === "platform") {
    return <PlatformMock caption={props.caption} />;
  }
  if (!props.candles || props.candles.length === 0) {
    return null;
  }
  return <PriceChart {...props} candles={props.candles} />;
}

function PriceChart({
  mode,
  candles,
  overlays = [],
  annotations = [],
  supportLevel,
  resistanceLevel,
  trendline,
  yMin: yMinProp,
  yMax: yMaxProp,
  height: heightProp,
  caption,
}: TradingChartProps & { candles: Candle[] }) {
  const hasVolume = overlays.includes("volume");
  const height = heightProp ?? (hasVolume ? 340 : 260);
  const totalChartHeight = height - PAD.top - PAD.bottom;
  const volumeHeight = hasVolume ? totalChartHeight * VOLUME_RATIO : 0;
  const gap = hasVolume ? 8 : 0;
  const priceHeight = totalChartHeight - volumeHeight - gap;
  const priceTop = PAD.top;
  const volumeTop = PAD.top + priceHeight + gap;
  const chartWidth = WIDTH - PAD.left - PAD.right;

  const allValues = candles.flatMap((c) => [c.h, c.l]);
  const computedMin = Math.min(...allValues);
  const computedMax = Math.max(...allValues);
  const computedRange = computedMax - computedMin || 1;
  const yMin = yMinProp ?? computedMin - computedRange * 0.06;
  const yMax = yMaxProp ?? computedMax + computedRange * 0.06;
  const yRange = yMax - yMin;

  const sliceWidth = chartWidth / candles.length;
  const bodyWidth = Math.max(3, sliceWidth * 0.55);

  function yFor(v: number): number {
    return priceTop + (1 - (v - yMin) / yRange) * priceHeight;
  }
  function xFor(i: number): number {
    return PAD.left + i * sliceWidth + sliceWidth / 2;
  }

  const gridCount = 4;
  const gridYs: number[] = [];
  const gridValues: number[] = [];
  for (let g = 0; g <= gridCount; g++) {
    const y = priceTop + (g / gridCount) * priceHeight;
    gridYs.push(y);
    gridValues.push(yMin + (1 - (y - priceTop) / priceHeight) * yRange);
  }

  function computeMA(period: number): (number | null)[] {
    const p = Math.min(period, Math.max(2, candles.length - 1));
    const out: (number | null)[] = [];
    for (let i = 0; i < candles.length; i++) {
      if (i < p - 1) {
        out.push(null);
      } else {
        let sum = 0;
        for (let j = i - p + 1; j <= i; j++) sum += candles[j].c;
        out.push(sum / p);
      }
    }
    return out;
  }
  function maPath(values: (number | null)[]): string {
    const parts: string[] = [];
    let started = false;
    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      if (v === null) continue;
      const x = xFor(i).toFixed(1);
      const y = yFor(v).toFixed(1);
      parts.push(`${started ? "L" : "M"} ${x} ${y}`);
      started = true;
    }
    return parts.join(" ");
  }

  const volumeValues = candles.map((c, i) => {
    const body = Math.abs(c.c - c.o);
    const range = c.h - c.l || 1;
    const ratio = Math.min(1, body / range);
    const seed = ((i * 7919) % 100) / 100;
    return 0.35 + seed * 0.3 + ratio * 0.35;
  });

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label={caption}
    >
      <rect
        x={PAD.left}
        y={priceTop}
        width={chartWidth}
        height={priceHeight}
        fill="var(--color-surface)"
      />

      {gridYs.map((y, i) => (
        <g key={`g${i}`}>
          <line
            x1={PAD.left}
            y1={y}
            x2={PAD.left + chartWidth}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth={1}
            strokeDasharray="2 4"
          />
          <text
            x={PAD.left - 8}
            y={y + 3}
            textAnchor="end"
            fontSize="10.5"
            fill="var(--color-text-muted)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            {gridValues[i].toFixed(2)}
          </text>
        </g>
      ))}

      {supportLevel !== undefined && overlays.includes("support") ? (
        <g>
          <line
            x1={PAD.left}
            y1={yFor(supportLevel)}
            x2={PAD.left + chartWidth}
            y2={yFor(supportLevel)}
            stroke={UP}
            strokeWidth={1.6}
            strokeDasharray="6 3"
          />
          <text
            x={PAD.left + chartWidth - 6}
            y={yFor(supportLevel) - 5}
            textAnchor="end"
            fontSize="11"
            fill={UP}
            fontWeight={700}
          >
            Support {supportLevel.toFixed(2)}
          </text>
        </g>
      ) : null}

      {resistanceLevel !== undefined && overlays.includes("resistance") ? (
        <g>
          <line
            x1={PAD.left}
            y1={yFor(resistanceLevel)}
            x2={PAD.left + chartWidth}
            y2={yFor(resistanceLevel)}
            stroke={DOWN}
            strokeWidth={1.6}
            strokeDasharray="6 3"
          />
          <text
            x={PAD.left + chartWidth - 6}
            y={yFor(resistanceLevel) - 5}
            textAnchor="end"
            fontSize="11"
            fill={DOWN}
            fontWeight={700}
          >
            Resistance {resistanceLevel.toFixed(2)}
          </text>
        </g>
      ) : null}

      {mode === "line" ? (
        <path
          d={candles
            .map(
              (c, i) =>
                `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(c.c).toFixed(1)}`,
            )
            .join(" ")}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      {mode === "bars"
        ? candles.map((c, i) => {
            const x = xFor(i);
            const color = c.c >= c.o ? UP : DOWN;
            return (
              <g key={i}>
                <line x1={x} y1={yFor(c.h)} x2={x} y2={yFor(c.l)} stroke={color} strokeWidth={1.4} />
                <line
                  x1={x - bodyWidth / 2}
                  y1={yFor(c.o)}
                  x2={x}
                  y2={yFor(c.o)}
                  stroke={color}
                  strokeWidth={1.4}
                />
                <line
                  x1={x}
                  y1={yFor(c.c)}
                  x2={x + bodyWidth / 2}
                  y2={yFor(c.c)}
                  stroke={color}
                  strokeWidth={1.4}
                />
              </g>
            );
          })
        : null}

      {mode === "candles"
        ? candles.map((c, i) => {
            const x = xFor(i);
            const color = c.c >= c.o ? UP : DOWN;
            const yOpen = yFor(c.o);
            const yClose = yFor(c.c);
            const bodyY = Math.min(yOpen, yClose);
            const bodyH = Math.max(2, Math.abs(yClose - yOpen));
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={yFor(c.h)}
                  x2={x}
                  y2={yFor(c.l)}
                  stroke={color}
                  strokeWidth={1.2}
                />
                <rect
                  x={x - bodyWidth / 2}
                  y={bodyY}
                  width={bodyWidth}
                  height={bodyH}
                  fill={color}
                />
              </g>
            );
          })
        : null}

      {trendline && overlays.includes("trendline") ? (
        <line
          x1={xFor(trendline.startIndex)}
          y1={yFor(trendline.startValue)}
          x2={xFor(trendline.endIndex)}
          y2={yFor(trendline.endValue)}
          stroke="#7c3aed"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
      ) : null}

      {overlays.includes("ma50") ? (
        <path
          d={maPath(computeMA(50))}
          fill="none"
          stroke="#d97706"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      {overlays.includes("ma200") ? (
        <path
          d={maPath(computeMA(200))}
          fill="none"
          stroke="#0891b2"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}

      {hasVolume ? (
        <g>
          <rect
            x={PAD.left}
            y={volumeTop}
            width={chartWidth}
            height={volumeHeight}
            fill="var(--color-surface-muted)"
            opacity={0.5}
          />
          {volumeValues.map((v, i) => {
            const color = candles[i].c >= candles[i].o ? UP : DOWN;
            const w = sliceWidth * 0.7;
            const x = PAD.left + i * sliceWidth + sliceWidth * 0.15;
            const h = v * volumeHeight * 0.9;
            return (
              <rect
                key={i}
                x={x}
                y={volumeTop + volumeHeight - h}
                width={w}
                height={h}
                fill={color}
                opacity={0.75}
              />
            );
          })}
          <text
            x={PAD.left - 8}
            y={volumeTop + 12}
            textAnchor="end"
            fontSize="10.5"
            fill="var(--color-text-muted)"
            fontWeight={600}
          >
            Vol
          </text>
        </g>
      ) : null}

      {annotations.map((a, i) => {
        const candle = candles[a.candleIndex];
        if (!candle) return null;
        const x = xFor(a.candleIndex);
        const isAbove = a.position === "above";
        const edgeY = isAbove ? yFor(candle.h) : yFor(candle.l);
        const anchorY = isAbove ? Math.max(12, edgeY - 18) : Math.min(height - 4, edgeY + 18);
        const textY = isAbove ? Math.max(11, anchorY - 6) : Math.min(height - 2, anchorY + 12);
        return (
          <g key={`a${i}`}>
            <line
              x1={x}
              y1={edgeY}
              x2={x}
              y2={anchorY}
              stroke="var(--color-text-muted)"
              strokeWidth={1}
            />
            <text
              x={x}
              y={textY}
              textAnchor="middle"
              fontSize="11"
              fontWeight={600}
              fill="var(--color-text)"
            >
              {a.label}
            </text>
          </g>
        );
      })}

      <rect
        x={PAD.left}
        y={priceTop}
        width={chartWidth}
        height={priceHeight}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={1}
      />
    </svg>
  );
}

function PlatformMock({ caption }: { caption: string }) {
  return (
    <div className="praxis-platform-mock" role="img" aria-label={caption}>
      <div className="praxis-platform-topbar">
        <span className="praxis-platform-brand">
          Investing<span className="praxis-platform-dot">.com</span>
        </span>
        <nav className="praxis-platform-nav">
          <span className="praxis-platform-nav-active">Markets</span>
          <span>My Watchlist</span>
          <span>News</span>
          <span>Charts</span>
          <span>Technical</span>
          <span>Tools</span>
        </nav>
        <span className="praxis-platform-user">Najma</span>
      </div>

      <div className="praxis-platform-tabs">
        <span className="praxis-platform-tab praxis-platform-tab-active">Indices</span>
        <span className="praxis-platform-tab">Major Indices</span>
        <span className="praxis-platform-tab">World Indices</span>
        <span className="praxis-platform-tab">Stocks</span>
        <span className="praxis-platform-tab">Bonds</span>
      </div>

      <div className="praxis-platform-quote">
        <div className="praxis-platform-quote-left">
          <div className="praxis-platform-name">Safaricom PLC</div>
          <div className="praxis-platform-price">
            35.20 <span className="praxis-platform-change">+0.45 (+1.29%)</span>
          </div>
          <div className="praxis-platform-timestamp">
            Real-time derived · 12:34 PM
          </div>
        </div>
        <div className="praxis-platform-quote-right">
          <div className="praxis-platform-quote-row">
            <span>Day&apos;s Range</span>
            <span>34.70-35.55</span>
          </div>
          <div className="praxis-platform-quote-row">
            <span>52 wk Range</span>
            <span>22.20-38.30</span>
          </div>
          <div className="praxis-platform-quote-row">
            <span>Volume</span>
            <span>1,842,300</span>
          </div>
        </div>
      </div>

      <div className="praxis-platform-toolbar">
        <span>1D</span>
        <span>1W</span>
        <span>1M</span>
        <span>3M</span>
        <span className="praxis-platform-toolbar-active">1Y</span>
        <span>5Y</span>
        <span>Max</span>
        <span className="praxis-platform-toolbar-divider" />
        <span className="praxis-platform-toolbar-active">Candles</span>
        <span>Line</span>
        <span>Bar</span>
        <span className="praxis-platform-toolbar-divider" />
        <span>Indicators</span>
        <span>Compare</span>
      </div>

      <div className="praxis-platform-chart">
        <svg viewBox="0 0 700 190" preserveAspectRatio="none" style={{ width: "100%", height: "180px", display: "block" }}>
          <rect x="0" y="0" width="700" height="190" fill="var(--color-surface)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={20 + i * 36}
              x2="700"
              y2={20 + i * 36}
              stroke="var(--color-border)"
              strokeWidth={1}
              strokeDasharray="2 4"
            />
          ))}
          <path
            d="M 8 140 L 60 132 L 110 138 L 160 120 L 210 118 L 260 100 L 310 108 L 360 88 L 410 92 L 460 74 L 510 78 L 560 60 L 610 66 L 660 46 L 692 40"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="praxis-platform-tabbar">
        <span className="praxis-platform-tab praxis-platform-tab-active">General</span>
        <span className="praxis-platform-tab">Chart</span>
        <span className="praxis-platform-tab">News &amp; Analysis</span>
        <span className="praxis-platform-tab">Technical</span>
        <span className="praxis-platform-tab">Forum</span>
      </div>

      <div className="praxis-platform-data">
        <div className="praxis-platform-data-col">
          <div className="praxis-platform-data-row">
            <span>Prev. Close</span>
            <span>34.75</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>Open</span>
            <span>34.80</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>1-Year Change</span>
            <span className="praxis-platform-up">+42.1%</span>
          </div>
        </div>
        <div className="praxis-platform-data-col">
          <div className="praxis-platform-data-row">
            <span>Market Cap</span>
            <span>1.41T</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>P/E Ratio</span>
            <span>14.8</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>Dividend Yield</span>
            <span>5.68%</span>
          </div>
        </div>
        <div className="praxis-platform-data-col">
          <div className="praxis-platform-data-row">
            <span>EPS</span>
            <span>2.39</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>Sector</span>
            <span>Telecom</span>
          </div>
          <div className="praxis-platform-data-row">
            <span>Beta</span>
            <span>0.82</span>
          </div>
        </div>
      </div>
    </div>
  );
}
