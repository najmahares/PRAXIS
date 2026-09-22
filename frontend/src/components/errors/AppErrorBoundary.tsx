"use client";

import { Component, type ErrorInfo, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message || "Unknown error" };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("UI error:", error.message, info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Something went wrong</h1>
          {process.env.NODE_ENV !== "production" ? (
            <pre style={debugStyle}>{this.state.errorMessage}</pre>
          ) : null}
          <p style={bodyStyle}>
            The page could not be displayed. Try again, or reload the page if the problem continues.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="praxis-primary"
            style={buttonStyle}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}

const containerStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--color-background)",
  padding: 24,
};

const cardStyle: CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  padding: 28,
  maxWidth: 520,
  width: "100%",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  color: "var(--color-text)",
};

const debugStyle: CSSProperties = {
  margin: "12px 0",
  padding: 10,
  fontSize: 12,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  color: "var(--color-danger)",
  background: "var(--color-danger-soft)",
  border: "1px solid #fecaca",
  borderRadius: 6,
  whiteSpace: "pre-wrap",
  overflowX: "auto",
  wordBreak: "break-word",
};

const bodyStyle: CSSProperties = {
  margin: "8px 0 20px",
  fontSize: 14,
  color: "var(--color-text-muted)",
};

const buttonStyle: CSSProperties = {
  width: "100%",
  height: 44,
  border: "none",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-primary)",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
};
