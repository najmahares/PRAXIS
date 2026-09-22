export type LevelTier = "foundations" | "asset-deep-dives" | "universal-skills";

export type Level = {
  id: number;
  title: string;
  goal: string;
  prerequisite: string;
  tier: LevelTier;
};

export type LessonMeta = {
  id: string;
  level: number;
  title: string;
  concept: string;
  minutes: number;
  summary: string;
};

export type LessonBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "example"; title: string; text: string }
  | { kind: "takeaway"; text: string }
  | {
      kind: "check";
      question: string;
      options: string[];
      correct: number;
      explanation: string;
    };

export type FigureBlock =
  | {
      kind: "figure";
      type: "formula";
      caption: string;
      label: string;
      numerator: string;
      denominator: string;
      result: string;
    }
  | {
      kind: "figure";
      type: "flow";
      caption: string;
      steps: string[];
    }
  | {
      kind: "figure";
      type: "compare";
      caption: string;
      left: { title: string; body: string };
      right: { title: string; body: string };
    }
  | {
      kind: "figure";
      type: "equation";
      caption: string;
      left: string;
      right: string;
    }
  | {
      kind: "figure";
      type: "waterfall";
      caption: string;
      bars: { label: string; value: number; tone: "positive" | "negative" | "total" }[];
    }
  | {
      kind: "figure";
      type: "ratio";
      caption: string;
      segments: { label: string; value: number }[];
    }
  | {
      kind: "figure";
      type: "bars";
      caption: string;
      bars: {
        label: string;
        value: number;
        display: string;
        tone?: "primary" | "muted" | "highlight";
      }[];
    }
  | {
      kind: "figure";
      type: "sparkline";
      caption: string;
      series: { label: string; tone: "primary" | "warn"; points: number[] }[];
      yMin?: number;
      yMax?: number;
    }
  | {
      kind: "figure";
      type: "spectrum";
      caption: string;
      lowLabel: string;
      highLabel: string;
      marks: { position: number; label: string; sublabel: string }[];
    }
  | {
      kind: "figure";
      type: "trading-chart";
      caption: string;
      mode: "line" | "bars" | "candles" | "platform";
      candles?: { o: number; h: number; l: number; c: number }[];
      overlays?: (
        | "volume"
        | "support"
        | "resistance"
        | "ma50"
        | "ma200"
        | "trendline"
      )[];
      annotations?: {
        candleIndex: number;
        label: string;
        position: "above" | "below";
      }[];
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
    }
  | {
      kind: "figure";
      type: "economic-series";
      caption: string;
      mode: "line" | "dual";
      series: {
        label: string;
        tone: "primary" | "warn" | "muted";
        points: number[];
      }[];
      xLabels?: string[];
      annotations?: {
        index: number;
        label: string;
        position: "above" | "below";
      }[];
      targetBand?: { min: number; max: number; label: string };
      yMin?: number;
      yMax?: number;
      yUnit?: string;
      height?: number;
    };

export type Lesson = LessonMeta & {
  body: LessonBlock[];
};
