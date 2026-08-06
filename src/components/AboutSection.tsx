"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const CARDS = [
  {
    title: "Our Mission",
    image: "/about-mission.png",
    alt: "Audience of young adults attentively seated at a Decentrix Africa session",
    body: "To empower African businesses, developers, and communities by providing accessible Web3 education, strategic marketing solutions, and robust ecosystem support, fostering sustainable growth and innovation from the ground up.",
  },
  {
    title: "Our Vision",
    image: "/about-vision.png",
    alt: "Community members seated in rows during a Decentrix Africa gathering",
    body: "To see a digitally transformed Africa where Web3 technologies create transparent, equitable, and prosperous opportunities for all, positioning the continent as a leading force in the decentralized future.",
  },
] as const;

/**
 * Short sticky fade covers the previous section, then solid About content
 * (Mission / Vision image cards with hover reveal).
 */
export function AboutSection() {
  const fadeZoneRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = fadeZoneRef.current;
    const veil = veilRef.current;
    if (!zone || !veil) return;

    let frame = 0;

    const update = () => {
      const rect = zone.getBoundingClientRect();
      const travel = Math.max(1, zone.offsetHeight - window.innerHeight * 0.15);
      const scrolled = Math.min(Math.max(-rect.top, 0), travel);
      const fade = scrolled / travel;
      veil.style.opacity = `${fade}`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="about" className="relative bg-[var(--ink)]">
      {/* Fade containment — sticky only lives here, not into following sections */}
      <div ref={fadeZoneRef} className="relative h-[55vh]">
        <div className="sticky top-0 h-dvh">
          <div
            ref={veilRef}
            className="h-full w-full bg-[var(--ink)]"
            style={{ opacity: 0 }}
            aria-hidden
          />
        </div>
      </div>

      <div className="relative z-10 -mt-[35vh] bg-[var(--ink)] px-6 pb-24 pt-8 md:px-10 md:pb-32 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-5xl">
              About <span className="text-brand">Decentrix Africa</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--mist)] md:text-lg">
              Pioneering Web3 adoption and digital transformation across the
              African continent.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {CARDS.map((card) => (
              <article
                key={card.title}
                className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)] shadow-[0_20px_50px_var(--surface-shadow)] outline-none focus-within:ring-2 focus-within:ring-[var(--magenta)]/50 md:aspect-[5/6]"
                tabIndex={0}
              >
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-within:scale-105"
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,8,24,0.92)] via-[rgba(12,8,24,0.35)] to-transparent transition duration-500 group-hover:via-[rgba(12,8,24,0.55)] group-focus-within:via-[rgba(12,8,24,0.55)]"
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white md:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-h-56 text-sm leading-relaxed text-white/90 opacity-100 transition-all duration-500 ease-out md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover:max-h-56 md:group-hover:opacity-100 md:group-focus-within:max-h-56 md:group-focus-within:opacity-100 md:text-base md:leading-7">
                    {card.body}
                  </p>
                  <p className="mt-3 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition md:block md:group-hover:opacity-0 md:group-focus-within:opacity-0">
                    Hover to read
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
