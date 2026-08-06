import { Reveal } from "@/components/Reveal";

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
    href: "#contact",
    featured: false,
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
    href: "#contact",
    featured: true,
  },
] as const;

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <span
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
        featured ? "bg-white/25" : "bg-white/15"
      }`}
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
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-4xl lg:text-[2.75rem]">
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
                className={`flex h-full flex-col rounded-[1.25rem] p-7 shadow-[0_20px_50px_var(--surface-shadow)] md:rounded-2xl md:p-8 ${
                  plan.featured
                    ? "bg-gradient-to-br from-[var(--orange)] via-[#ff9a2e] to-[var(--gold)] text-white md:min-h-[28rem]"
                    : "bg-[#1a2230] text-white md:min-h-[25rem]"
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                    Most Popular
                  </span>
                )}

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold md:text-2xl">
                  {plan.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    plan.featured ? "text-white/85" : "text-white/65"
                  }`}
                >
                  {plan.blurb}
                </p>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <CheckIcon featured={plan.featured} />
                      <span className="leading-snug text-white/95">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.href}
                  className={`mt-8 block rounded-xl px-5 py-3.5 text-center text-sm font-semibold transition hover:brightness-110 ${
                    plan.featured
                      ? "bg-white/25 text-white backdrop-blur-sm hover:bg-white/35"
                      : "bg-white/15 text-white hover:bg-white/25"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3} ease="out">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12">
            <p className="text-sm font-medium text-[var(--bone)]">
              Enterprise Solutions?
            </p>
            <a
              href="#contact"
              className="rounded-xl bg-[#1a2230] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-125"
            >
              Get a Custom Proposal
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
