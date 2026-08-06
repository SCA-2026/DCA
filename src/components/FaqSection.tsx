"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const FAQS = [
  {
    q: "What Web3 technologies does Decentrix Africa specialize in?",
    a: "We specialize in marketing and user acquisition strategies for a wide range of Web3 technologies including blockchain platforms, DeFi protocols, NFT marketplaces, DAOs, and Web3 gaming ecosystems. Our expertise spans Layer 1 and Layer 2 solutions with particular focus on creating adoption strategies tailored to African markets.",
  },
  {
    q: "How does Decentrix Africa approach user acquisition in different African regions?",
    a: "We localize campaigns for each market—language, payment rails, cultural context, and regulatory nuance. Campus activations, community partnerships, and data-driven creative let us meet users where they already gather, then convert interest into sustained on-chain participation.",
  },
  {
    q: "What kind of community building services does Decentrix offer?",
    a: "From Discord and Telegram management to campus clubs, AMAs, and offline meetups, we design programs that educate, engage, and retain. We help you seed local champions, moderate healthy spaces, and turn early adopters into advocates.",
  },
  {
    q: "How does Decentrix help with market entry into Africa?",
    a: "We combine market research, go-to-market planning, and hands-on activation. That includes competitive landscape insights, partner introductions, localization guidance, and launch playbooks tuned to regional dynamics so you enter with clarity—not guesswork.",
  },
  {
    q: "What metrics do you use to measure campaign success?",
    a: "We track acquisition cost, activation and retention rates, community growth and engagement, referral volume, and on-chain participation where relevant. Dashboards and regular reporting keep goals visible so we can iterate quickly.",
  },
  {
    q: "Does Decentrix Africa offer educational resources about Web3?",
    a: "Yes. We create workshops, campus curricula, explainers, and campaign-native learning content that demystify Web3 for African audiences—building trust and literacy alongside growth.",
  },
] as const;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="flow-band bg-[var(--ink)]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.35fr] lg:gap-16 xl:gap-20">
        <Reveal ease="out">
          <div className="lg:sticky lg:top-28">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Frequently
              <br />
              asked questions
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--mist)] md:text-base">
              Common questions about our Web3 marketing and user acquisition
              services.
            </p>
          </div>
        </Reveal>

        <ul className="min-w-0">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.q}
                delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                ease={i % 2 === 0 ? "out" : "in"}
              >
                <li className="border-b border-[var(--line)]">
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left md:py-6"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-[family-name:var(--font-display)] text-base font-bold leading-snug text-[var(--bone)] md:text-lg">
                      {item.q}
                    </span>
                    <span
                      className={`mt-1 shrink-0 text-[var(--fog)] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 6 5 5 5-5" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm leading-relaxed text-[var(--mist)] md:pb-6 md:leading-7">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
