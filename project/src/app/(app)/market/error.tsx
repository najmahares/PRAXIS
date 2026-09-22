"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MarketError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error("Market error boundary:", error);
  }, [error]);

  return (
    <div className="praxis-market-empty" style={{ marginTop: 40 }}>
      <h2 className="praxis-market-empty-title">
        Market data is temporarily unavailable.
      </h2>
      <p className="praxis-market-empty-body">
        This happens when the live feed is slow or unresponsive. Your
        curriculum progress is unaffected.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center" }}>
        <button
          type="button"
          onClick={reset}
          className="praxis-market-loadmore"
        >
          Try again
        </button>
        <Link href="/dashboard" className="praxis-market-loadmore-secondary">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
