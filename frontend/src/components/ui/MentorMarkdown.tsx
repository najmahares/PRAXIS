"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import MentorDiagram from "./MentorDiagram";
import MentorQuiz from "./MentorQuiz";
import type { QuizDifficulty } from "@/lib/mentor/quizTypes";

type MentorMarkdownProps = {
  content: string;
  onTeachConcept?: (concept: string) => void;
  onQuizReady?: () => void;
};

type TextBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: 1 | 2 | 3; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

type VisualBlock =
  | { kind: "mermaid"; chart: string }
  | { kind: "image"; prompt: string }
  | { kind: "quiz"; topic: string; difficulty: QuizDifficulty; count: number };

type Block = ({ type: "text" } & TextBlock) | ({ type: "visual" } & VisualBlock);

const MERMAID_STARTERS = [
  /^flowchart\s+(TD|TB|BT|LR|RL)\b/i,
  /^graph\s+(TD|TB|BT|LR|RL)\b/i,
  /^pie\b/i,
  /^sequenceDiagram\b/i,
  /^classDiagram\b/i,
  /^stateDiagram(-v2)?\b/i,
  /^erDiagram\b/i,
  /^journey\b/i,
  /^gantt\b/i,
  /^timeline\b/i,
  /^mindmap\b/i,
  /^quadrantChart\b/i,
  /^xychart-beta\b/i,
];

const HR_PATTERN = /^\s*(-{3,}|\*{3,}|_{3,})\s*$/;

function looksLikeMermaidStart(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  return MERMAID_STARTERS.some((re) => re.test(trimmed));
}

function looksLikeMermaidBody(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^[A-Za-z0-9_]+\s*(\[|\()/.test(trimmed)) return true;
  if (/-->|---|==>|-.->/.test(trimmed)) return true;
  if (/^[A-Za-z0-9_]+\s*-->\s*[A-Za-z0-9_]+/.test(trimmed)) return true;
  if (/^subgraph\b/i.test(trimmed)) return true;
  if (/^end\s*$/i.test(trimmed)) return true;
  if (/^[A-Za-z0-9_]+\s*:\s*/.test(trimmed)) return true;
  return false;
}

export default function MentorMarkdown({ content, onTeachConcept, onQuizReady }: MentorMarkdownProps) {
  const blocks = parseBlocks(content);

  const quizFiredRef = useRef(false);
  useEffect(() => {
    quizFiredRef.current = false;
  }, [content]);

  const handleQuizReady = useCallback(() => {
    if (quizFiredRef.current) return;
    quizFiredRef.current = true;
    onQuizReady?.();
  }, [onQuizReady]);

  const quizBlocks = blocks.filter(
    (b): b is { type: "visual" } & Extract<VisualBlock, { kind: "quiz" }> =>
      b.type === "visual" && b.kind === "quiz",
  );

  if (quizBlocks.length > 0) {
    return (
      <div style={quizOnlyStyle}>
        {quizBlocks.map((block, i) => (
          <MentorQuiz
            key={i}
            topic={block.topic}
            difficulty={block.difficulty}
            count={block.count}
            onTeachConcept={onTeachConcept}
            onReady={handleQuizReady}
          />
        ))}
      </div>
    );
  }

  const texts = blocks.filter((b): b is { type: "text" } & TextBlock => b.type === "text");
  const visuals = blocks.filter(
    (b): b is { type: "visual" } & VisualBlock => b.type === "visual" && b.kind !== "quiz",
  );

  return (
    <div style={stackStyle}>
      <div style={textStackStyle}>
        {texts.map((block, i) => renderTextBlock(block, i))}
      </div>
      {visuals.length > 0 ? (
        <div style={visualStackStyle}>
          {visuals.map((block, i) => renderVisualBlock(block, i))}
        </div>
      ) : null}
    </div>
  );
}

function parseBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.split("\n");
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let inFence = false;
  let fenceLanguage = "";
  let fenceBuffer: string[] = [];
  let inLooseMermaid = false;
  let looseBuffer: string[] = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      const text = paragraph.join("\n").trim();
      if (text) blocks.push({ type: "text", kind: "paragraph", text });
      paragraph = [];
    }
  }
  function flushList() {
    if (list && list.items.length > 0) {
      blocks.push({ type: "text", kind: list.ordered ? "ol" : "ul", items: list.items });
    }
    list = null;
  }
  function flushLooseMermaid() {
    if (looseBuffer.length > 0) {
      const body = looseBuffer.join("\n").trim();
      if (body) blocks.push({ type: "visual", kind: "mermaid", chart: body });
      looseBuffer = [];
    }
    inLooseMermaid = false;
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, "");

    if (inFence) {
      if (/^\s*```\s*$/.test(line)) {
        const body = fenceBuffer.join("\n").trim();
        inFence = false;
        const firstLine = body.split("\n")[0] ?? "";
        const isMermaid =
          fenceLanguage === "mermaid" ||
          fenceLanguage === "chart" ||
          looksLikeMermaidStart(firstLine);
        if (body && isMermaid) {
          blocks.push({ type: "visual", kind: "mermaid", chart: body });
        } else if (body) {
          blocks.push({ type: "text", kind: "paragraph", text: body });
        }
        fenceBuffer = [];
        fenceLanguage = "";
      } else {
        fenceBuffer.push(rawLine);
      }
      continue;
    }

    if (inLooseMermaid) {
      if (line.trim() === "") {
        flushLooseMermaid();
        continue;
      }
      looseBuffer.push(rawLine);
      continue;
    }

    const openFenceMatch = line.match(/^\s*```\s*([a-zA-Z0-9_-]*)\s*$/);
    if (openFenceMatch) {
      flushParagraph();
      flushList();
      inFence = true;
      fenceLanguage = openFenceMatch[1].toLowerCase();
      fenceBuffer = [];
      continue;
    }

    const quizMatch = line.match(/^\s*\[\[quiz:\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(\d+)\s*\]\]\s*$/);
    if (quizMatch) {
      flushParagraph();
      flushList();
      const topic = quizMatch[1].trim();
      const rawDifficulty = quizMatch[2].trim().toLowerCase();
      const difficulty: QuizDifficulty =
        rawDifficulty === "intermediate" || rawDifficulty === "advanced"
          ? (rawDifficulty as QuizDifficulty)
          : "beginner";
      const count = Math.min(10, Math.max(3, parseInt(quizMatch[3], 10)));
      blocks.push({ type: "visual", kind: "quiz", topic, difficulty, count });
      continue;
    }

    const imageMatch = line.match(/^\s*\[\[image:\s*(.+?)\s*\]\]\s*$/);
    if (imageMatch) {
      flushParagraph();
      flushList();
      blocks.push({ type: "visual", kind: "image", prompt: imageMatch[1].trim() });
      continue;
    }

    if (HR_PATTERN.test(line)) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^\s*(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "text",
        kind: "heading",
        level: headingMatch[1].length as 1 | 2 | 3,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(ulMatch[1].trim());
      continue;
    }

    const olMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(olMatch[1].trim());
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (looksLikeMermaidStart(line) || (paragraph.length === 0 && looksLikeMermaidBody(line))) {
      flushParagraph();
      flushList();
      inLooseMermaid = true;
      looseBuffer = [rawLine];
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  flushLooseMermaid();

  if (inFence && fenceBuffer.length > 0) {
    const body = fenceBuffer.join("\n").trim();
    if (body) blocks.push({ type: "text", kind: "paragraph", text: body });
  }

  return blocks;
}

function renderTextBlock(block: { type: "text" } & TextBlock, key: number): ReactNode {
  if (block.kind === "paragraph") {
    return (
      <p key={key} style={paragraphStyle}>
        {renderMultiline(block.text, `p${key}`)}
      </p>
    );
  }
  if (block.kind === "heading") {
    const Tag = block.level === 1 ? "h3" : block.level === 2 ? "h4" : "h5";
    return (
      <Tag key={key} style={block.level === 1 ? h3Style : h4Style}>
        {renderInline(block.text, `h${key}`)}
      </Tag>
    );
  }
  if (block.kind === "ul") {
    return (
      <ul key={key} style={listStyle}>
        {block.items.map((item, i) => (
          <li key={i} style={listItemStyle}>
            {renderInline(item, `u${key}-${i}`)}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol key={key} style={listStyle}>
      {block.items.map((item, i) => (
        <li key={i} style={listItemStyle}>
          {renderInline(item, `o${key}-${i}`)}
        </li>
      ))}
    </ol>
  );
}

function renderVisualBlock(block: { type: "visual" } & VisualBlock, key: number): ReactNode {
  if (block.kind === "mermaid") return <MentorDiagram key={key} chart={block.chart} />;
  if (block.kind === "image") return <ImageBlock key={key} prompt={block.prompt} />;
  return null;
}

function ImageBlock({ prompt }: { prompt: string }) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [attempt]);

  if (failed) {
    return (
      <div style={imageErrorStyle} role="status">
        <p style={imageErrorTextStyle}>The illustration did not load.</p>
        <button type="button" onClick={() => setAttempt((v) => v + 1)} style={imageRetryStyle}>
          Try again
        </button>
      </div>
    );
  }

  const src = `/api/image?prompt=${encodeURIComponent(prompt)}&w=800&h=600&a=${attempt}`;

  return (
    <div style={imageWrapperStyle}>
      {!loaded ? <div style={imagePlaceholderStyle}>Generating illustration…</div> : null}
      <img
        src={src}
        alt={prompt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={loaded ? imageStyle : { ...imageStyle, display: "none" }}
      />
    </div>
  );
}

function renderMultiline(text: string, prefix: string): ReactNode[] {
  const lines = text.split("\n");
  const nodes: ReactNode[] = [];
  lines.forEach((line, i) => {
    if (i > 0) nodes.push(<br key={`${prefix}-br-${i}`} />);
    renderInline(line, `${prefix}-l${i}`).forEach((node) => nodes.push(node));
  });
  return nodes;
}

function renderInline(text: string, prefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*\n]+)\*|`([^`]+)`/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={`${prefix}-t${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>,
      );
    }
    if (match[1] !== undefined) nodes.push(<strong key={`${prefix}-b${key++}`}>{match[1]}</strong>);
    else if (match[2] !== undefined) nodes.push(<em key={`${prefix}-i${key++}`}>{match[2]}</em>);
    else if (match[3] !== undefined)
      nodes.push(
        <code key={`${prefix}-c${key++}`} style={codeStyle}>
          {match[3]}
        </code>,
      );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`${prefix}-t${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return nodes;
}

const quizOnlyStyle: CSSProperties = { width: "100%" };
const stackStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 16 };
const textStackStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const visualStackStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 12 };
const paragraphStyle: CSSProperties = { margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--color-text)" };
const h3Style: CSSProperties = { margin: "6px 0 0", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-text)" };
const h4Style: CSSProperties = { margin: "4px 0 0", fontSize: 15, fontWeight: 600, color: "var(--color-text)" };
const listStyle: CSSProperties = { margin: 0, paddingLeft: 22, display: "flex", flexDirection: "column", gap: 6, fontSize: 15, lineHeight: 1.7, color: "var(--color-text)" };
const listItemStyle: CSSProperties = { paddingLeft: 2 };
const codeStyle: CSSProperties = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: "0.92em", background: "var(--color-surface-muted)", border: "1px solid var(--color-border)", borderRadius: 4, padding: "1px 5px" };
const imagePlaceholderStyle: CSSProperties = { padding: 24, textAlign: "center", fontSize: 14, color: "var(--color-text-muted)", background: "var(--color-surface-muted)", border: "1px dashed var(--color-border)", borderRadius: "var(--radius-md)" };
const imageWrapperStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: 8 };
const imageStyle: CSSProperties = { width: "100%", height: "auto", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" };
const imageErrorStyle: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 14px", background: "var(--color-surface-muted)", border: "1px dashed var(--color-border-strong)", borderRadius: "var(--radius-md)" };
const imageErrorTextStyle: CSSProperties = { margin: 0, fontSize: 13.5, color: "var(--color-text-muted)" };
const imageRetryStyle: CSSProperties = { padding: "6px 12px", fontSize: 12.5, fontWeight: 500, background: "var(--color-surface)", color: "var(--color-text)", border: "1px solid var(--color-border-strong)", borderRadius: 6, cursor: "pointer" };
