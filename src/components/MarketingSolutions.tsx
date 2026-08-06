"use client";

import { Reveal } from "@/components/Reveal";
import Link from "next/link";

const PLANS = [
  {
    id: "launchpad",
    title: "Growth Launchpad",
    blurb: "Ideal for Web3 startups entering Africa",
    features: [
      "Market research & insights",
      "Social media marketing",
      "Community management (1 platform)",
      "Basic educational content",
    ],
    cta: "Start Your Growth Journey",
    href: "/contact",
    featured: false,
    tone: "cyan",
  },
  {
    id: "accelerator",
    title: "Scale Accelerator",
    blurb: "For established projects expanding across Africa",
    features: [
      "Multi-channel user acquisition",
      "Community management (all platforms)",
      "Campus & street activations",
      "Regulatory compliance advisory",
      "Custom educational campaigns",
    ],
    cta: "Accelerate Your Growth",
    href: "/contact",
    featured: true,
    tone: "sunset",
  },
] as const;

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/25"
      aria-hidden
    >
      <svg
        viewBox="0 0 16 16"
        className="size-3 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3.5 8.2 2.8 2.8 6.2-6.2" />
      </svg>
    </span>
  );
}

export function MarketingSolutions() {
  return (
    <section id="solutions" className="flow-band bg-[var(--ink)]">
      <div className="mx-auto max-w-5xl">
        <Reveal ease="out">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-0.03em] text-[var(--bone)] md:text-4xl lg:text-[2.75rem]">
              Tailored Web3 Marketing Solutions
            </h2>
            <p className="mt-4 text-sm text-[var(--mist)] md:text-base">
              Strategic services to drive your growth across African markets.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 flex flex-col items-stretch justify-center gap-5 md:mt-14 md:flex-row md:items-center md:gap-0">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
              ease={i === 0 ? "out" : "in"}
              className={`w-full md:w-[min(100%,22rem)] ${
                plan.featured
                  ? "relative z-10 md:-ml-4 md:w-[min(100%,24rem)]"
                  : "relative z-0"
              }`}
            >
              <article
                className={`solution-card solution-card--${plan.tone} group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] p-7 text-white shadow-[0_20px_50px_var(--surface-shadow)] md:rounded-2xl md:p-8 ${
                  plan.featured ? "md:min-h-[28rem]" : "md:min-h-[25rem]"
                }`}
              >
                <div className="solution-card-sheen pointer-events-none absolute inset-0" aria-hidden />

                {plan.featured && (
                  <span className="absolute right-5 top-5 z-10 rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    Most Popular
                  </span>
                )}

                <h3 className="relative z-10 font-[family-name:var(--font-display)] text-xl font-extrabold tracking-[-0.02em] md:text-2xl">
                  {plan.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm text-white/85">
                  {plan.blurb}
                </p>

                <ul className="relative z-10 mt-7 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckIcon />
                      <span className="leading-snug text-white/95">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className="relative z-10 mt-8 block rounded-xl bg-white/20 px-5 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition duration-300 group-hover:bg-white/30 group-hover:brightness-110"
                >
                  {plan.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} ease="out">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12">
            <p className="text-sm font-medium text-[var(--bone)]">
              Enterprise Solutions?
            </p>
            <Link
              href="/contact"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold transition hover:brightness-110"
            >
              Get a Custom Proposal
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
