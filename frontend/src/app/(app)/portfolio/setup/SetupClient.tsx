"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CAPITAL_CHOICES } from "@/lib/practice/types";
import { formatKsh } from "@/lib/practice/math";
import "../practice.css";

export default function SetupClient() {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(100000);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/practice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startingCapital: selected }),
      });
      const data = await res.json();
      if (!data.ok) {
        if (data.error === "already_exists") {
          router.push("/portfolio");
          return;
        }
        setError(data.error ?? "Could not create portfolio");
        return;
      }
      router.push("/portfolio");
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="praxis-practice-setup">
      <Link href="/dashboard" className="praxis-practice-back">
        <span aria-hidden="true">{"\u2190"}</span>
        <span>Back</span>
      </Link>

      <header className="praxis-practice-setup-header">
        <h1 className="praxis-practice-setup-title">Choose your starting capital</h1>
        <p className="praxis-practice-setup-sub">
          This is your virtual portfolio. You can reset it later, but the choice is locked once you make your first trade.
        </p>
      </header>

      <div className="praxis-practice-capital-grid">
        {CAPITAL_CHOICES.map((choice) => {
          const active = selected === choice.amount;
          return (
            <button
              key={choice.amount}
              type="button"
              className={"praxis-practice-capital-card" + (active ? " is-selected" : "")}
              onClick={() => setSelected(choice.amount)}
              aria-pressed={active}
            >
              <span className="praxis-practice-capital-label">{choice.label}</span>
              <span className="praxis-practice-capital-amount">{formatKsh(choice.amount)}</span>
              <span className="praxis-practice-capital-blurb">{choice.blurb}</span>
            </button>
          );
        })}
      </div>

      {error ? <p className="praxis-practice-setup-error">{error}</p> : null}

      <div className="praxis-practice-setup-actions">
        <button type="button" className="praxis-practice-primary" onClick={begin} disabled={busy}>
          {busy ? "Setting up…" : "Start with " + formatKsh(selected)}
        </button>
      </div>
    </div>
  );
}
