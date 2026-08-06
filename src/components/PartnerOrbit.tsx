"use client";

import { useEffect, useRef } from "react";

const PARTNERS = [
  { id: "sui", label: "Sui" },
  { id: "bybit", label: "BYBIT" },
  { id: "okx", label: "OKX" },
  { id: "mariblock", label: "mariblock" },
  { id: "moja", label: "Moja" },
] as const;

function PartnerMark({ id }: { id: (typeof PARTNERS)[number]["id"] }) {
  if (id === "sui") {
    return (
      <svg viewBox="0 0 40 48" className="h-9 w-8" aria-hidden>
        <path
          d="M20 2C11 10 6 18 6 27c0 9 6.3 15 14 15s14-6 14-15C34 18 29 10 20 2Z"
          fill="none"
          stroke="#4DA2FF"
          strokeWidth="2.4"
        />
        <path
          d="M14 28c4-6 8-8 12-6"
          fill="none"
          stroke="#4DA2FF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (id === "bybit") {
    return (
      <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--bone)]">
        BYB
        <span className="mx-0.5 inline-block h-4 w-1 translate-y-0.5 bg-[#F7A600]" />
        T
      </span>
    );
  }

  if (id === "okx") {
    return (
      <span
        className="font-[family-name:var(--font-display)] text-xl font-black tracking-[0.08em] text-[var(--bone)]"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        OKX
      </span>
    );
  }

  if (id === "mariblock") {
    return (
      <span className="flex items-center gap-2">
        <svg viewBox="0 0 28 20" className="h-5 w-7" aria-hidden>
          <path
            d="M8 10a5 5 0 1 1 5-5"
            fill="none"
            stroke="#FF6A00"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M20 10a5 5 0 1 0-5 5"
            fill="none"
            stroke="#FF6A00"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--bone)]">
          mariblock
        </span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-[#15203a]">
        <span className="font-[family-name:var(--font-display)] text-sm font-bold text-[#4ADE80]">
          M
        </span>
      </span>
      <span className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--bone)]">
        Moja
      </span>
    </span>
  );
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Scroll-scrubbed planetary orbit of partner logos.
 * Sticky stage: logos start in a line, coalesce into orbit, then keep revolving
 * as you scroll toward the next section.
 */
export function PartnerOrbit() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      const rect = root.getBoundingClientRect();
      const total = Math.max(1, root.offsetHeight - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total;
      const form = easeOutCubic(Math.min(1, p / 0.35));
      const spin = p * Math.PI * 2.4; // ~1.2 turns across the section

      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const radius = Math.min(w, h) * (0.34 + form * 0.02);
      const count = PARTNERS.length;

      if (ringRef.current) {
        ringRef.current.style.opacity = `${0.15 + form * 0.55}`;
        ringRef.current.style.transform = `scale(${0.7 + form * 0.3}) rotate(${spin * 12}deg)`;
      }

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const base = (i / count) * Math.PI * 2 - Math.PI / 2;
        const angle = base + spin;

        // Line layout at start → circular orbit as you scroll
        const lineX = ((i + 0.5) / count - 0.5) * Math.min(w * 0.9, 720);
        const lineY = 0;
        const orbX = Math.cos(angle) * radius;
        const orbY = Math.sin(angle) * radius;
        const x = lineX + (orbX - lineX) * form;
        const y = lineY + (orbY - lineY) * form;

        // Counter-rotate so logos stay upright; slight tilt while forming
        const tilt = (1 - form) * (i - 2) * 4;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
        el.style.opacity = `${0.55 + form * 0.45}`;
      });

      if (progressLabelRef.current) {
        progressLabelRef.current.textContent =
          form < 0.98 ? "Scroll — logos enter orbit" : "In orbit · keep scrolling";
      }
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
    <section
      id="partners"
      ref={rootRef}
      className="relative h-[200vh]"
      aria-label="Trusted partners in orbit"
    >
      <div className="sticky top-0 flex h-dvh flex-col items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--purple)_12%,transparent),transparent_60%)]" />

        <div className="relative z-10 mb-8 max-w-2xl text-center md:mb-10">
          <h2 className="text-brand font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by Web3 Innovators
          </h2>
          <p className="mt-3 text-sm text-[var(--mist)] md:text-base">
            Partnering with leading projects to drive adoption across Africa.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative z-10 aspect-square w-[min(88vw,460px)]"
        >
          <div
            ref={ringRef}
            className="pointer-events-none absolute inset-[12%] rounded-full border border-dashed border-[var(--line)] opacity-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand"
            aria-hidden
          />

          {PARTNERS.map((partner, i) => (
            <div
              key={partner.id}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{ marginLeft: "-4.5rem", marginTop: "-2rem" }}
            >
              <div className="flex h-16 w-36 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--panel)]/90 px-3 shadow-[0_12px_40px_var(--surface-shadow)] backdrop-blur-md">
                <PartnerMark id={partner.id} />
                <span className="sr-only">{partner.label}</span>
              </div>
            </div>
          ))}
        </div>

        <p
          ref={progressLabelRef}
          className="relative z-10 mt-10 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fog)]"
        >
          Scroll — logos enter orbit
        </p>
      </div>
    </section>
  );
}
