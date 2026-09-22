"use client";

import type { FigureBlock } from "@/lib/curriculum/types";
import TradingChart from "./TradingChart";
import EconomicSeries from "./EconomicSeries";

const PALETTE = ["#2563eb", "#0d9488", "#7c3aed", "#d97706", "#dc2626", "#15803d"];

export default function LessonFigure({ block }: { block: FigureBlock }) {
  return (
    <figure className="praxis-figure">
      <div className="praxis-figure-canvas">
        {block.type === "formula" ? <Formula block={block} /> : null}
        {block.type === "flow" ? <Flow block={block} /> : null}
        {block.type === "compare" ? <Compare block={block} /> : null}
        {block.type === "equation" ? <Equation block={block} /> : null}
        {block.type === "waterfall" ? <Waterfall block={block} /> : null}
        {block.type === "ratio" ? <Ratio block={block} /> : null}
        {block.type === "bars" ? <Bars block={block} /> : null}
        {block.type === "sparkline" ? <Sparkline block={block} /> : null}
        {block.type === "spectrum" ? <Spectrum block={block} /> : null}
        {block.type === "trading-chart" ? (
          <TradingChart
            mode={block.mode}
            candles={block.candles}
            overlays={block.overlays}
            annotations={block.annotations}
            supportLevel={block.supportLevel}
            resistanceLevel={block.resistanceLevel}
            trendline={block.trendline}
            yMin={block.yMin}
            yMax={block.yMax}
            height={block.height}
            caption={block.caption}
          />
        ) : null}
        {block.type === "economic-series" ? (
          <EconomicSeries
            mode={block.mode}
            series={block.series}
            xLabels={block.xLabels}
            annotations={block.annotations}
            targetBand={block.targetBand}
            yMin={block.yMin}
            yMax={block.yMax}
            yUnit={block.yUnit}
            height={block.height}
            caption={block.caption}
          />
        ) : null}
      </div>
      <figcaption className="praxis-figure-caption">{block.caption}</figcaption>
    </figure>
  );
}

function Formula({ block }: { block: Extract<FigureBlock, { type: "formula" }> }) {
  return (
    <div className="praxis-figure-formula">
      <span className="praxis-figure-formula-label">{block.label}</span>
      <span className="praxis-figure-formula-equals" aria-hidden="true">=</span>
      <span className="praxis-figure-fraction">
        <span className="praxis-figure-fraction-num">{block.numerator}</span>
        <span className="praxis-figure-fraction-bar" aria-hidden="true" />
        <span className="praxis-figure-fraction-den">{block.denominator}</span>
      </span>
      <span className="praxis-figure-formula-equals" aria-hidden="true">=</span>
      <span className="praxis-figure-formula-result">{block.result}</span>
    </div>
  );
}

function Flow({ block }: { block: Extract<FigureBlock, { type: "flow" }> }) {
  return (
    <ol className="praxis-figure-flow">
      {block.steps.map((step, index) => (
        <li key={index} className="praxis-figure-flow-step">
          <span className="praxis-figure-flow-number">{String(index + 1).padStart(2, "0")}</span>
          <span className="praxis-figure-flow-text">{step}</span>
          {index < block.steps.length - 1 ? (
            <span className="praxis-figure-flow-arrow" aria-hidden="true">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                <line x1="7" y1="0" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" />
                <polygon points="7,18 3,11 11,11" fill="currentColor" />
              </svg>
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Compare({ block }: { block: Extract<FigureBlock, { type: "compare" }> }) {
  return (
    <div className="praxis-figure-compare">
      <div className="praxis-figure-compare-side praxis-figure-compare-left">
        <span className="praxis-figure-compare-title">{block.left.title}</span>
        <p className="praxis-figure-compare-body">{block.left.body}</p>
      </div>
      <div className="praxis-figure-compare-side praxis-figure-compare-right">
        <span className="praxis-figure-compare-title">{block.right.title}</span>
        <p className="praxis-figure-compare-body">{block.right.body}</p>
      </div>
    </div>
  );
}

function Equation({ block }: { block: Extract<FigureBlock, { type: "equation" }> }) {
  return (
    <div className="praxis-figure-equation">
      <span className="praxis-figure-equation-side">{block.left}</span>
      <span className="praxis-figure-equation-equals" aria-hidden="true">=</span>
      <span className="praxis-figure-equation-side">{block.right}</span>
    </div>
  );
}

function Waterfall({ block }: { block: Extract<FigureBlock, { type: "waterfall" }> }) {
  const max = Math.max(...block.bars.map((bar) => bar.value), 1);
  return (
    <ul className="praxis-figure-waterfall">
      {block.bars.map((bar, index) => {
        const pct = (bar.value / max) * 100;
        return (
          <li
            key={index}
            className={`praxis-figure-waterfall-row praxis-figure-waterfall-${bar.tone}`}
          >
            <span className="praxis-figure-waterfall-label">{bar.label}</span>
            <div className="praxis-figure-waterfall-track">
              <div className="praxis-figure-waterfall-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="praxis-figure-waterfall-value">
              KSh {bar.value.toLocaleString("en-KE")}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function Ratio({ block }: { block: Extract<FigureBlock, { type: "ratio" }> }) {
  const total = block.segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  return (
    <div className="praxis-figure-ratio">
      <div className="praxis-figure-ratio-bar">
        {block.segments.map((segment, index) => (
          <div
            key={index}
            className="praxis-figure-ratio-segment"
            style={{
              width: `${(segment.value / total) * 100}%`,
              background: PALETTE[index % PALETTE.length],
            }}
          />
        ))}
      </div>
      <ul className="praxis-figure-ratio-legend">
        {block.segments.map((segment, index) => (
          <li key={index} className="praxis-figure-ratio-legend-item">
            <span
              className="praxis-figure-ratio-dot"
              style={{ background: PALETTE[index % PALETTE.length] }}
              aria-hidden="true"
            />
            <span className="praxis-figure-ratio-label">{segment.label}</span>
            <span className="praxis-figure-ratio-pct">{segment.value.toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bars({ block }: { block: Extract<FigureBlock, { type: "bars" }> }) {
  const max = Math.max(...block.bars.map((bar) => bar.value), 1);
  return (
    <ul className="praxis-figure-bars">
      {block.bars.map((bar, index) => {
        const pct = (bar.value / max) * 100;
        const tone = bar.tone ?? "primary";
        return (
          <li key={index} className="praxis-figure-bar-row">
            <span className="praxis-figure-bar-label">{bar.label}</span>
            <div className="praxis-figure-bar-track">
              <div
                className={`praxis-figure-bar-fill praxis-figure-bar-${tone}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="praxis-figure-bar-value">{bar.display}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Sparkline({ block }: { block: Extract<FigureBlock, { type: "sparkline" }> }) {
  const width = 520;
  const height = 140;
  const padX = 8;
  const padY = 12;

  const allPoints = block.series.flatMap((s) => s.points);
  const computedMin = Math.min(...allPoints);
  const computedMax = Math.max(...allPoints);
  const yMin = block.yMin ?? computedMin - (computedMax - computedMin) * 0.1;
  const yMax = block.yMax ?? computedMax + (computedMax - computedMin) * 0.1;
  const range = yMax - yMin || 1;

  function buildPath(points: number[]): string {
    const stepX = (width - padX * 2) / (points.length - 1);
    return points
      .map((value, i) => {
        const x = padX + i * stepX;
        const y = padY + (1 - (value - yMin) / range) * (height - padY * 2);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  }

  return (
    <div className="praxis-figure-sparkline-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="praxis-figure-sparkline-svg"
        role="img"
        aria-label={block.caption}
      >
        <line
          x1={padX}
          y1={height - padY}
          x2={width - padX}
          y2={height - padY}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        {block.series.map((series, i) => (
          <path
            key={i}
            d={buildPath(series.points)}
            fill="none"
            stroke={series.tone === "warn" ? "#d97706" : "var(--color-primary)"}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <ul className="praxis-figure-sparkline-legend">
        {block.series.map((series, i) => (
          <li key={i} className="praxis-figure-sparkline-legend-item">
            <span
              className="praxis-figure-sparkline-swatch"
              style={{
                background: series.tone === "warn" ? "#d97706" : "var(--color-primary)",
              }}
              aria-hidden="true"
            />
            {series.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Spectrum({ block }: { block: Extract<FigureBlock, { type: "spectrum" }> }) {
  return (
    <div className="praxis-figure-spectrum">
      <div className="praxis-figure-spectrum-axis">
        <span className="praxis-figure-spectrum-pole praxis-figure-spectrum-low">
          {block.lowLabel}
        </span>
        <div className="praxis-figure-spectrum-line" aria-hidden="true">
          {block.marks.map((mark, index) => (
            <div
              key={index}
              className="praxis-figure-spectrum-mark"
              style={{ left: `${Math.max(0, Math.min(100, mark.position))}%` }}
            >
              <span className="praxis-figure-spectrum-dot" />
            </div>
          ))}
        </div>
        <span className="praxis-figure-spectrum-pole praxis-figure-spectrum-high">
          {block.highLabel}
        </span>
      </div>
      <ul className="praxis-figure-spectrum-labels">
        {block.marks.map((mark, index) => (
          <li
            key={index}
            className="praxis-figure-spectrum-label"
            style={{ left: `${Math.max(0, Math.min(100, mark.position))}%` }}
          >
            <span className="praxis-figure-spectrum-label-title">{mark.label}</span>
            <span className="praxis-figure-spectrum-label-sub">{mark.sublabel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
