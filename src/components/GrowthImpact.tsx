import { Reveal } from "@/components/Reveal";

const STATS = [
  {
    value: "50k+",
    label: "users onboarded to Web3 platforms across 12 African countries",
  },
  {
    value: "↑ 65%",
    label: "average increase in community engagement through our strategies",
  },
  {
    value: "↑ 28%",
    label: "higher retention rates compared to standard marketing approaches",
  },
  {
    value: "3x",
    label: "faster market penetration with our localized techniques",
  },
] as const;

export function GrowthImpact() {
  return (
    <section className="flow-band bg-[var(--ink)]">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:gap-20">
        <Reveal ease="out">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Accelerate Your Web3 Growth
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[var(--mist)] md:text-base md:leading-7">
              At Decentrix Africa, we provide the expertise, connections, and
              strategies to help you scale across African markets effectively.
            </p>

            <blockquote className="relative mt-12 max-w-lg pl-1">
              <span
                className="pointer-events-none absolute -left-1 -top-8 font-[family-name:var(--font-display)] text-[7rem] leading-none text-[var(--line)] select-none md:-top-10 md:text-[8.5rem]"
                aria-hidden
              >
                “
              </span>
              <p className="relative text-base leading-relaxed text-[var(--mist)] italic md:text-lg md:leading-8">
                Decentrix are a joy to work with—smart, hardworking, creative,
                responsive, and incredibly well-organized. We see them as
                long-term partners in building the Moja vision, and I can&apos;t
                recommend them highly enough.
              </p>
              <footer className="relative mt-6">
                <p className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--bone)]">
                  Tarig Hilal
                </p>
                <p className="mt-0.5 text-sm text-[var(--mist)]">
                  Founder | Moja
                </p>
              </footer>
            </blockquote>
          </div>
        </Reveal>

        <Reveal delay={2} ease="in">
          <div className="grid grid-cols-2">
            {STATS.map((stat, i) => {
              const top = i < 2;
              const left = i % 2 === 0;
              return (
                <div
                  key={stat.value}
                  className={`py-8 ${left ? "pr-6 md:pr-10" : "pl-6 md:pl-10"} ${
                    top ? "border-b border-[var(--line)] pb-10" : "pt-10"
                  } ${left ? "" : "border-l border-[var(--line)]"}`}
                >
                  <p className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight text-[var(--bone)] sm:text-5xl md:text-[3.25rem]">
                    {stat.value}
                  </p>
                  <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-[var(--mist)]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
