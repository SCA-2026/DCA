"use client";

import { JoinCommunity } from "@/components/JoinCommunity";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import Link from "next/link";
import { useState, type FormEvent } from "react";

export function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
  }

  return (
    <PageShell>
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 10%, rgba(255, 45, 149, 0.1), transparent 55%), radial-gradient(ellipse 45% 35% at 90% 30%, rgba(0, 212, 255, 0.1), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <Reveal ease="out">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">
                Contact
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.03em] text-[var(--bone)] sm:text-5xl md:text-6xl">
                Let&apos;s build together
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--mist)] md:text-lg">
                Partner with Decentrix Africa on Web3 marketing, community, and
                market entry. Tell us about your project — we&apos;ll get back
                soon.
              </p>
              <p className="mt-8 text-sm text-[var(--mist)]">
                Or explore{" "}
                <Link
                  href="/services"
                  className="font-semibold text-[var(--bone)] underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-[var(--magenta)]"
                >
                  our services
                </Link>{" "}
                first.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} ease="in">
            <form
              onSubmit={onSubmit}
              className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_16px_40px_var(--surface-shadow)] md:p-8"
            >
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--fog)]">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setSent(false);
                    setName(e.target.value);
                  }}
                  className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--ink)] px-4 py-3 text-sm text-[var(--bone)] outline-none transition focus:border-[var(--magenta)]/50"
                  placeholder="Your name"
                />
              </label>
              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--fog)]">
                  Email
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setSent(false);
                    setEmail(e.target.value);
                  }}
                  className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--ink)] px-4 py-3 text-sm text-[var(--bone)] outline-none transition focus:border-[var(--magenta)]/50"
                  placeholder="you@company.com"
                />
              </label>
              <label className="mt-5 block">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--fog)]">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => {
                    setSent(false);
                    setMessage(e.target.value);
                  }}
                  className="mt-2 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--ink)] px-4 py-3 text-sm text-[var(--bone)] outline-none transition focus:border-[var(--magenta)]/50"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#1a2230] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-125"
              >
                Send message
                <span aria-hidden className="opacity-80">
                  ›
                </span>
              </button>
              <p className="mt-4 text-center text-xs text-[var(--mist)]">
                {sent
                  ? "Thanks — we received your message."
                  : "We typically reply within 1–2 business days."}
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <JoinCommunity />
    </PageShell>
  );
}
