"use client";


import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type MentorDiagramProps = { chart: string };

const LIGHT_THEME = {
  background: "#ffffff",
  primaryColor: "#dbeafe",
  primaryTextColor: "#0f172a",
  primaryBorderColor: "#2563eb",
  lineColor: "#94a3b8",
  secondaryColor: "#f1f5f9",
  tertiaryColor: "#eff6ff",
  textColor: "#0f172a",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const DARK_THEME = {
  background: "#111827",
  primaryColor: "#1e3a8a",
  primaryTextColor: "#e2e8f0",
  primaryBorderColor: "#60a5fa",
  lineColor: "#64748b",
  secondaryColor: "#1f2937",
  tertiaryColor: "#172554",
  textColor: "#e2e8f0",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

function stripFences(input: string): string {
  return input.replace(/^```(?:mermaid|chart)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
}

function autoQuoteLabels(source: string): string {
  return source.replace(
    /([A-Za-z0-9_]+)\s*\[\s*([^"\]\n]*?[,:%()][^"\]\n]*?)\s*\]/g,
    (_m, nodeId, label) => `${nodeId}["${label}"]`,
  );
}

async function renderMermaid(source: string, isDark: boolean, idPrefix: string): Promise<string | null> {
  const mod = await import("mermaid");
  const mermaid = mod.default;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "antiscript",
    theme: "base",
    themeVariables: isDark ? DARK_THEME : LIGHT_THEME,
    fontFamily: LIGHT_THEME.fontFamily,
    flowchart: { useMaxWidth: true, htmlLabels: false, curve: "basis" },
    pie: { useMaxWidth: true, textPosition: 0.6 },
    sequence: { useMaxWidth: true },
    gantt: { useMaxWidth: true },
    journey: { useMaxWidth: true },
    timeline: { useMaxWidth: true },
    mindmap: { useMaxWidth: true },
    quadrantChart: { useMaxWidth: true },
    class: { useMaxWidth: true },
    state: { useMaxWidth: true },
    er: { useMaxWidth: true },
  });
  const cleaned = stripFences(source);
  for (const candidate of [cleaned, autoQuoteLabels(cleaned)]) {
    try {
      const result = await mermaid.render(`${idPrefix}-${Math.random().toString(36).slice(2, 6)}`, candidate);
      return result.svg;
    } catch {
      continue;
    }
  }
  return null;
}

function normalizeSvg(svg: string, mode: "inline" | "modal"): string {
  if (typeof window === "undefined") return svg;
  const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
  const el = doc.querySelector("svg");
  if (!el) return svg;
  el.removeAttribute("width");
  el.removeAttribute("height");
  el.style.display = "block";
  el.style.margin = "0 auto";
  el.style.width = "auto";
  el.style.height = "auto";
  el.style.maxWidth = mode === "inline" ? "100%" : "calc(90vw - 48px)";
  el.style.maxHeight = mode === "inline" ? "420px" : "calc(85vh - 48px)";
  return new XMLSerializer().serializeToString(el);
}

export default function MentorDiagram({ chart }: MentorDiagramProps) {
  const [failed, setFailed] = useState(false);
  const [svgInline, setSvgInline] = useState<string | null>(null);
  const [svgModal, setSvgModal] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    const cleaned = stripFences(chart);
    if (!cleaned) return;
    setLoading(true);
    setFailed(false);
    setSvgInline(null);
    setSvgModal(null);
    const isDark =
      typeof document !== "undefined" &&
      document.documentElement.getAttribute("data-theme") === "dark";
    const idPrefix = `mmd-${Date.now().toString(36)}`;
    renderMermaid(cleaned, isDark, idPrefix)
      .then((svg) => {
        if (!active) return;
        if (!svg) {
          setFailed(true);
          setLoading(false);
          return;
        }
        const i = svg.indexOf("<g class=\"node"); console.log("MMD-NODE @", i, svg.slice(i, i + 500)); const norm = normalizeSvg(svg, "inline"); setSvgInline(norm);
        setSvgModal(normalizeSvg(svg, "modal"));
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setFailed(true);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [chart]);

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    if (!modalOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen, closeModal]);

  if (failed) {
    return (
      <div style={wrapStyle}>
        <pre style={fallbackStyle}>{stripFences(chart)}</pre>
      </div>
    );
  }

  const modal =
    mounted && modalOpen && svgModal
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Diagram"
            style={backdropStyle}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <div style={modalFrameStyle}>
              <button type="button" onClick={closeModal} aria-label="Close diagram" style={closeButtonStyle}>
                <CloseIcon />
              </button>
              <div style={modalSvgHostStyle} dangerouslySetInnerHTML={{ __html: svgModal }} />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div style={wrapStyle}>
      <button
        type="button"
        onClick={() => svgModal && setModalOpen(true)}
        style={canvasStyle}
        aria-label="Open diagram full size"
        disabled={loading || !svgModal}
      >
        {loading || !svgInline ? (
          <span style={loadingStyle}>Rendering diagram…</span>
        ) : (
          <span style={svgHostStyle} dangerouslySetInnerHTML={{ __html: svgInline }} />
        )}
        {!loading && svgInline ? (
          <span style={expandHintStyle} aria-hidden="true">
            <ExpandIcon />
          </span>
        ) : null}
      </button>
      {modal}
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

const wrapStyle: CSSProperties = { marginTop: 0, width: "100%" };
const canvasStyle: CSSProperties = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 16,
  minHeight: 120,
  width: "100%",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  overflow: "hidden",
  cursor: "zoom-in",
  textAlign: "left",
};
const svgHostStyle: CSSProperties = { display: "flex", justifyContent: "center", width: "100%" };
const loadingStyle: CSSProperties = { fontSize: 13, color: "var(--color-text-muted)" };
const expandHintStyle: CSSProperties = {
  position: "absolute",
  top: 10,
  right: 10,
  width: 26,
  height: 26,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
};
const backdropStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  background: "rgba(15, 23, 42, 0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};
const modalFrameStyle: CSSProperties = {
  position: "relative",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: 24,
  maxWidth: "92vw",
  maxHeight: "90vh",
  overflow: "auto",
};
const modalSvgHostStyle: CSSProperties = { display: "block" };
const closeButtonStyle: CSSProperties = {
  position: "absolute",
  top: 8,
  right: 8,
  width: 34,
  height: 34,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  background: "var(--color-surface)",
  border: "1px solid var(--color-border-strong)",
  color: "var(--color-text)",
  cursor: "pointer",
  zIndex: 1,
};
const fallbackStyle: CSSProperties = {
  margin: 0,
  padding: 14,
  fontSize: 12.5,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  background: "var(--color-surface-muted)",
  border: "1px dashed var(--color-border-strong)",
  borderRadius: "var(--radius-md)",
  color: "var(--color-text-muted)",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
};
