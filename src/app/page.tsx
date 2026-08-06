import { AboutSection } from "@/components/AboutSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ConnectButton } from "@/components/ConnectButton";
import { FaqSection } from "@/components/FaqSection";
import { FeaturesParallax } from "@/components/FeaturesParallax";
import { GlassParticleScroll } from "@/components/GlassParticleScroll";
import { GrowthImpact } from "@/components/GrowthImpact";
import { HeroBookingBar } from "@/components/HeroBookingBar";
import { JoinCommunity } from "@/components/JoinCommunity";
import { MarketingSolutions } from "@/components/MarketingSolutions";
import { NetworkVisual } from "@/components/NetworkVisual";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import { PartnerOrbit } from "@/components/PartnerOrbit";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";

const POTENTIAL = [
  {
    title: "Web3 Marketing Expertise",
    blurb:
      "Leverage our deep understanding of Web3 technologies to create innovative marketing strategies that resonate with blockchain-savvy audiences while educating newcomers to the space.",
    icon: "people" as const,
  },
  {
    title: "User Acquisition & Growth",
    blurb:
      "Implement data-driven campaigns that attract and retain users across Africa's diverse markets, utilizing our expertise in tokenomics, community building, and regional market dynamics.",
    icon: "shield" as const,
  },
  {
    title: "Market Entry & Localization",
    blurb:
      "Navigate Africa's complex market landscape with our localization expertise, regulatory insights, and culturally-relevant approaches tailored to each region's unique characteristics.",
    icon: "docs" as const,
  },
  {
    title: "Community Empowerment",
    blurb:
      "Build loyal communities through our campus activations, events, and virtual engagements designed to educate, inspire, and foster sustainable growth in the African Web3 ecosystem.",
    icon: "target" as const,
  },
] as const;

function PotentialIcon({ name }: { name: (typeof POTENTIAL)[number]["icon"] }) {
  const common = {
    className: "size-8 text-[var(--orange)]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "people") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <circle cx="16.5" cy="9" r="2.4" />
        <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8S14 16 14.6 19" />
        <path d="M14 19c.4-2.2 1.9-3.5 3.8-3.5 1.4 0 2.6.7 3.2 1.8" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3.5 5.5 6.2v5.1c0 4 2.7 7.2 6.5 8.7 3.8-1.5 6.5-4.7 6.5-8.7V6.2L12 3.5Z" />
        <path d="m9.2 12.1 1.9 1.9 3.7-3.8" />
      </svg>
    );
  }
  if (name === "docs") {
    return (
      <svg {...common}>
        <path d="M8 5.5h7.5L19 9v9.5H8z" />
        <path d="M15.5 5.5V9H19" />
        <path d="M5 8.5h3v11H5.8A1.8 1.8 0 0 1 4 17.7V10a1.5 1.5 0 0 1 1.5-1.5H5Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="11" r="3" />
      <path d="M8.5 17.5c.8-1.6 2-2.4 3.5-2.4s2.7.8 3.5 2.4" />
    </svg>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "Amplify on-chain reach",
    label: "Steady buys",
    blurb:
      "Automate a simple cadence so you keep buying through noise — same amount, same rhythm.",
  },
  {
    n: "02",
    title: "Connect, manage, grow",
    label: "Wallet first",
    blurb:
      "Link an injected wallet, configure amount and frequency, then arm a mock schedule.",
  },
  {
    n: "03",
    title: "Stay in control",
    label: "Demo safe",
    blurb:
      "Explore the flow without sending funds. Real transfers stay off this mock.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="site-sheet relative z-10 flex flex-1 flex-col bg-[var(--ink)]">
        <SiteHeader />

        <main className="flex flex-1 flex-col">
        <section className="hero-stage flow-haze relative flex min-h-dvh flex-col overflow-hidden px-6 pb-10 pt-28 md:px-10 md:pb-14">
          <ParallaxLayer speed={0.12} className="absolute inset-0">
            <div className="ken-burns" />
          </ParallaxLayer>
          <div className="ken-burns-overlay absolute inset-0" />
          <div
            className="grid-fade pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
          />
          <div className="orb orb-a left-[58%] top-[8%]" aria-hidden />
          <div className="orb orb-b left-[8%] top-[42%]" aria-hidden />
          <ParallaxLayer speed={0.06} className="absolute inset-0">
            <NetworkVisual />
          </ParallaxLayer>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-end gap-10 text-center">
            <div className="max-w-3xl">
              <p className="animate-rise font-mono text-xs uppercase tracking-[0.25em] text-brand">
                Decentrix Africa
              </p>
              <h1 className="animate-rise-delay text-brand mt-4 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Maximize your on-chain presence
              </h1>
              <p className="animate-rise-late mx-auto mt-5 max-w-xl text-base text-[var(--mist)] md:text-lg">
                Dollar-cost average with a clear cadence — connect your wallet,
                set amount and frequency, arm a mock schedule.
              </p>
              <div className="animate-rise-later mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="bg-brand rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-110"
                >
                  Get in touch
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-[var(--line)] bg-[var(--panel)]/80 px-6 py-3 text-sm text-[var(--bone)] transition hover:border-[var(--magenta)]"
                >
                  Explore features
                </a>
              </div>
            </div>
            <div className="w-full text-left">
              <HeroBookingBar />
            </div>
          </div>
        </section>

        <PartnerOrbit />

        <GlassParticleScroll>
          <div className="pointer-events-none h-[6vh]" aria-hidden />

          <FeaturesParallax
            src="/features-event.png"
            alt="Decentrix Africa community event — speaker addressing a seated audience"
          >
            <div className="space-y-[18vh]">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                  Features
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--bone)] md:text-5xl">
                  Built for steady{" "}
                  <span className="text-brand">Web3 habits</span>
                </h2>
                <p className="mt-4 max-w-md text-[var(--mist)]">
                  Education, community, and cadence — the same room energy,
                  turned into a wallet-connected flow.
                </p>
              </div>

              {FEATURES.map((f) => (
                <article
                  key={f.n}
                  className="border-l-2 border-[var(--magenta)]/70 pl-5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand">
                    {f.n} · {f.label}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--bone)] md:text-2xl">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--mist)]">
                    {f.blurb}
                  </p>
                </article>
              ))}
            </div>
          </FeaturesParallax>
        </GlassParticleScroll>

        <AboutSection />

        <section id="potential" className="flow-band relative z-10 bg-[var(--ink)]">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start lg:gap-16">
            <Reveal ease="out">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  Unlocking Africa&apos;s{" "}
                  <span className="text-brand">Web3 Potential</span>
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--mist)] md:text-base md:leading-7">
                  At Decentrix Africa, we address the unique challenges of Web3
                  adoption in African markets. From educational campaigns to
                  community building, we&apos;re dedicated to helping your
                  project succeed through innovative marketing and user
                  acquisition strategies.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14">
              {POTENTIAL.map((item, i) => (
                <Reveal
                  key={item.title}
                  delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                  ease={i % 2 === 0 ? "out" : "in"}
                >
                  <div>
                    <PotentialIcon name={item.icon} />
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold text-[var(--bone)] md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--mist)]">
                      {item.blurb}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ExpertiseSection />

        <GrowthImpact />

        <MarketingSolutions />

        <TeamSection />

        <JoinCommunity />

        <FaqSection />

        <section id="contact" className="flow-band">
          <Reveal ease="out">
            <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--panel)] px-8 py-12 shadow-[0_20px_50px_var(--surface-shadow)] md:flex-row md:items-center md:px-12">
              <div className="max-w-xl">
                <h2 className="text-brand font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
                  Ready to grow with us?
                </h2>
                <p className="mt-4 text-[var(--mist)]">
                  Partner with Decentrix Africa on Web3 marketing, community, and
                  market entry across the continent.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#solutions"
                    className="bg-brand rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-110"
                  >
                    View solutions
                  </a>
                  <ConnectButton />
                </div>
              </div>
              <div
                className="hidden h-40 w-40 shrink-0 rounded-3xl border border-[var(--line)] bg-brand opacity-80 md:block"
                aria-hidden
              />
            </div>
          </Reveal>
        </section>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
