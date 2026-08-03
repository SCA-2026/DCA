"use client";

import { useAccount } from "wagmi";
import { useState } from "react";

const FREQUENCIES = [
  { id: "daily", label: "Daily", days: 1 },
  { id: "weekly", label: "Weekly", days: 7 },
  { id: "biweekly", label: "Biweekly", days: 14 },
  { id: "monthly", label: "Monthly", days: 30 },
] as const;

export function DcaPlanner() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("100");
  const [frequency, setFrequency] =
    useState<(typeof FREQUENCIES)[number]["id"]>("weekly");
  const [armed, setArmed] = useState(false);

  const freq = FREQUENCIES.find((f) => f.id === frequency)!;
  const monthlyEstimate = ((Number(amount) || 0) * 30) / freq.days;

  return (
    <section id="plan" className="relative mx-auto w-full max-w-5xl px-6 py-24">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--jade)]">
        Plan
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight text-[var(--bone)] md:text-5xl">
        Set your cadence
      </h2>
      <p className="mt-4 max-w-lg text-[var(--mist)]">
        Pick an amount and rhythm. When your wallet is connected, arm a mock
        schedule — no on-chain spend in this demo.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--fog)]">
              Amount per buy (USD)
            </span>
            <div className="flex items-center gap-3 border-b border-[var(--line)] pb-2">
              <span className="font-mono text-2xl text-[var(--jade)]">$</span>
              <input
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setArmed(false);
                }}
                className="w-full bg-transparent font-[family-name:var(--font-display)] text-4xl text-[var(--bone)] outline-none"
              />
            </div>
          </label>

          <fieldset>
            <legend className="mb-3 text-sm text-[var(--fog)]">Frequency</legend>
            <div className="flex flex-wrap gap-2">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFrequency(f.id);
                    setArmed(false);
                  }}
                  className={`px-4 py-2 text-sm transition ${
                    frequency === f.id
                      ? "bg-[var(--jade)] font-semibold text-[var(--ink)]"
                      : "border border-[var(--line)] text-[var(--mist)] hover:border-[var(--jade)] hover:text-[var(--jade)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            disabled={!isConnected}
            onClick={() => setArmed(true)}
            className="rounded-sm bg-[var(--bone)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isConnected ? "Arm schedule" : "Connect wallet to arm"}
          </button>
        </div>

        <aside className="flex flex-col justify-between border border-[var(--line)] bg-[var(--panel)] p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fog)]">
              Monthly estimate
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--bone)]">
              ${monthlyEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
            <p className="mt-3 text-sm text-[var(--mist)]">
              ${amount || 0} · {freq.label.toLowerCase()}
            </p>
          </div>
          <p
            className={`mt-8 font-mono text-sm ${
              armed ? "text-[var(--jade)]" : "text-[var(--fog)]"
            }`}
          >
            {armed
              ? "Schedule armed · demo only"
              : isConnected
                ? "Ready when you are"
                : "Wallet required"}
          </p>
        </aside>
      </div>
    </section>
  );
}
