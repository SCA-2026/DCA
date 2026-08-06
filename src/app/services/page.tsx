import { ExpertiseSection } from "@/components/ExpertiseSection";
import { MarketingSolutions } from "@/components/MarketingSolutions";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — Decentrix Africa",
  description:
    "Web3 marketing, community building, and market entry services across Africa.",
};

const SERVICES = [
  {
    title: "Web3 Marketing Expertise",
    blurb:
      "Create campaigns that resonate with blockchain-savvy audiences while educating newcomers across African markets.",
  },
  {
    title: "User Acquisition & Growth",
    blurb:
      "Data-driven campaigns that attract and retain users through tokenomics, community, and regional market dynamics.",
  },
  {
    title: "Market Entry & Localization",
    blurb:
      "Navigate Africa's landscape with localization expertise, regulatory insights, and culturally relevant approaches.",
  },
  {
    title: "Community Empowerment",
    blurb:
      "Campus activations, events, and virtual engagements that educate, inspire, and foster sustainable Web3 growth.",
  },
] as const;

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 70% 0%, rgba(168, 85, 247, 0.14), transparent 60%), radial-gradient(ellipse 40% 35% at 10% 40%, rgba(0, 212, 255, 0.08), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal ease="out">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">
              Services
            </p>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.03em] text-[var(--bone)] sm:text-5xl md:text-6xl">
              Tailored Web3 growth for{" "}
              <span className="text-brand">African markets</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--mist)] md:text-lg">
              From market research to community activations — strategic services
              that drive adoption across the continent.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1a2230] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-125"
              >
                Join Us
                <span aria-hidden className="opacity-80">
                  ›
                </span>
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:gap-12">
            {SERVICES.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                ease={i % 2 === 0 ? "out" : "in"}
              >
                <article className="border-l-2 border-[var(--magenta)]/60 pl-5">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--bone)] md:text-2xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--mist)] md:text-base">
                    {item.blurb}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ExpertiseSection />
      <MarketingSolutions />
    </PageShell>
  );
}
