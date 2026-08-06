"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from "wagmi";
import { useState } from "react";

const FREQUENCIES = ["Daily", "Weekly", "Monthly"] as const;

export function HeroBookingBar() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState("100");
  const [frequency, setFrequency] =
    useState<(typeof FREQUENCIES)[number]>("Weekly");

  return (
    <div className="hero-book w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]/90 shadow-[0_24px_80px_var(--surface-shadow)] backdrop-blur-md sm:rounded-full sm:px-1">
      <div className="grid gap-0 sm:grid-cols-[1fr_1fr_auto]">
        <label className="flex flex-col gap-1 border-b border-[var(--line)] px-5 py-4 sm:border-b-0 sm:border-r">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fog)]">
            Amount
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-brand">$</span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent font-[family-name:var(--font-display)] text-2xl text-[var(--bone)] outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1 border-b border-[var(--line)] px-5 py-4 sm:border-b-0 sm:border-r">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fog)]">
            Cadence
          </span>
          <select
            value={frequency}
            onChange={(e) =>
              setFrequency(e.target.value as (typeof FREQUENCIES)[number])
            }
            className="cursor-pointer appearance-none bg-transparent font-[family-name:var(--font-display)] text-2xl text-[var(--bone)] outline-none"
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f} className="bg-[var(--ink)]">
                {f}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center justify-center gap-3 px-5 py-4">
          {isConnected ? (
            <a
              href="#contact"
              className="bg-brand whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-110"
            >
              Get in touch
            </a>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>
    </div>
  );
}
