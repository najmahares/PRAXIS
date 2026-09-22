"use client";

type Series = {
  label: string;
  tone: "primary" | "warn" | "muted";
  points: number[];
};

type Annotation = {
  index: number;
  label: string;
  position: "above" | "below";
};

type TargetBand = { min: number; max: number; label: string };

type EconomicSeriesProps = {
  mode: "line" | "dual";
  series: Series[];
  xLabels?: string[];
  annotations?: Annotation[];
  targetBand?: TargetBand;
  yMin?: number;
  yMax?: number;
  yUnit?: string;
  height?: number;
  caption: string;
};

const WIDTH = 760;
const PAD = { left: 58, right: 20, top: 36, bottom: 44 };

const TONES: Record<"primary" | "warn" | "muted", string> = {
  primary: "#2563eb",
  warn: "#d97706",
  muted: "#94a3b8",
};

export default function EconomicSeries(props: EconomicSeriesProps) {
  if (
    !props.series ||
    props.series.length === 0 ||
    props.series[0].points.length === 0
  ) {
    return null;
  }
  return <Chart {...props} />;
}

function Chart({
  series,
  xLabels,
  annotations = [],
  targetBand,
  yMin: yMinProp,
  yMax: yMaxProp,
  yUnit = "",
  height: heightProp,
  caption,
}: EconomicSeriesProps) {
  const height = heightProp ?? 280;
  const chartWidth = WIDTH - PAD.left - PAD.right;
  const chartHeight = height - PAD.top - PAD.bottom;

  const allValues = series.flatMap((s) => s.points);
  const computedMin = Math.min(...allValues);
  const computedMax = Math.max(...allValues);
  const spread = computedMax - computedMin || 1;
  const yMin = yMinProp ?? computedMin - spread * 0.12;
  const yMax = yMaxProp ?? computedMax + spread * 0.12;
  const yRange = yMax - yMin;

  const maxPoints = Math.max(...series.map((s) => s.points.length));
  const stepX = maxPoints > 1 ? chartWidth / (maxPoints - 1) : chartWidth;

  function yFor(v: number): number {
    return PAD.top + (1 - (v - yMin) / yRange) * chartHeight;
  }
  function xFor(i: number): number {
    return PAD.left + i * stepX;
  }

  function pathFor(points: number[]): string {
    return points
      .map(
        (v, i) =>
          `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(1)} ${yFor(v).toFixed(1)}`,
      )
      .join(" ");
  }

  const gridCount = 4;
  const gridRows: { y: number; value: number }[] = [];
  for (let g = 0; g <= gridCount; g++) {
    const y = PAD.top + (g / gridCount) * chartHeight;
    const value = yMin + (1 - (y - PAD.top) / chartHeight) * yRange;
    gridRows.push({ y, value });
  }

  function formatValue(v: number): string {
    if (Math.abs(v) >= 1000) return v.toFixed(0);
    if (Math.abs(v) >= 100) return v.toFixed(0);
    if (Math.abs(v) >= 10) return v.toFixed(1);
    return v.toFixed(1);
  }

  const bandTop = targetBand ? yFor(Math.min(yMax, targetBand.max)) : 0;
  const bandBottom = targetBand ? yFor(Math.max(yMin, targetBand.min)) : 0;
  const bandHeight = Math.max(0, bandBottom - bandTop);

  const labelStep = xLabels && xLabels.length > 10 ? Math.ceil(xLabels.length / 8) : 1;

  return (
    <div className="praxis-economic-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="praxis-economic-svg"
        role="img"
        aria-label={caption}
      >
        <rect
          x={PAD.left}
          y={PAD.top}
          width={chartWidth}
          height={chartHeight}
          fill="var(--color-surface)"
        />

        {targetBand && bandHeight > 0 ? (
          <g>
            <rect
              x={PAD.left}
              y={bandTop}
              width={chartWidth}
              height={bandHeight}
              fill="#2563eb"
              opacity={0.06}
            />
            <text
              x={PAD.left + 8}
              y={bandTop + 12}
              fontSize="10.5"
              fontWeight={600}
              fill="var(--color-primary)"
            >
              {targetBand.label}
            </text>
          </g>
        ) : null}

        {gridRows.map((row, i) => (
          <g key={`g${i}`}>
            <line
              x1={PAD.left}
              y1={row.y}
              x2={PAD.left + chartWidth}
              y2={row.y}
              stroke="var(--color-border)"
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            <text
              x={PAD.left - 8}
              y={row.y + 3}
              textAnchor="end"
              fontSize="10.5"
              fill="var(--color-text-muted)"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {formatValue(row.value)}
              {yUnit}
            </text>
          </g>
        ))}

        {series.map((s, i) => (
          <path
            key={`s${i}`}
            d={pathFor(s.points)}
            fill="none"
            stroke={TONES[s.tone]}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {series.map((s, sIdx) =>
          s.points.map((v, i) => (
            <circle
              key={`p${sIdx}-${i}`}
              cx={xFor(i)}
              cy={yFor(v)}
              r={2.4}
              fill={TONES[s.tone]}
            />
          )),
        )}

        {annotations.map((a, i) => {
          if (a.index < 0 || a.index >= maxPoints) return null;
          const x = xFor(a.index);
          const isAbove = a.position === "above";
          const refSeries = series[0];
          const point = refSeries.points[a.index];
          if (point === undefined) return null;
          const edgeY = yFor(point);
          const anchorY = isAbove
            ? Math.max(12, edgeY - 20)
            : Math.min(height - 4, edgeY + 22);
          const textY = isAbove
            ? Math.max(11, anchorY - 6)
            : Math.min(height - 2, anchorY + 14);
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

        {xLabels
          ? xLabels.map((label, i) =>
              i % labelStep === 0 ? (
                <text
                  key={`xl${i}`}
                  x={xFor(i)}
                  y={height - 16}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--color-text-muted)"
                >
                  {label}
                </text>
              ) : null,
            )
          : null}

        <rect
          x={PAD.left}
          y={PAD.top}
          width={chartWidth}
          height={chartHeight}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      </svg>

      {series.length > 1 ? (
        <ul className="praxis-economic-legend">
          {series.map((s, i) => (
            <li key={i} className="praxis-economic-legend-item">
              <span
                className="praxis-economic-swatch"
                style={{ background: TONES[s.tone] }}
                aria-hidden="true"
              />
              {s.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
