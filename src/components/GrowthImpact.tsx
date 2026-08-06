"use client";

import { ParallaxLayer } from "@/components/ParallaxLayer";
import { Reveal } from "@/components/Reveal";
import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    end: 50,
    prefix: "",
    suffix: "k+",
    label: "users onboarded to Web3 platforms across 12 African countries",
    duration: 1600,
  },
  {
    end: 65,
    prefix: "↑ ",
    suffix: "%",
    label: "average increase in community engagement through our strategies",
    duration: 1500,
  },
  {
    end: 28,
    prefix: "↑ ",
    suffix: "%",
    label: "higher retention rates compared to standard marketing approaches",
    duration: 1400,
  },
  {
    end: 3,
    prefix: "",
    suffix: "x",
    label: "faster market penetration with our localized techniques",
    duration: 1100,
  },
] as const;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function CountUp({
  end,
  prefix,
  suffix,
  duration,
  active,
}: {
  end: number;
  prefix: string;
  suffix: string;
  duration: number;
  active: boolean;
}) {
  const [value, setValue] = useState(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!active) return;

    if (reducedRef.current) {
      setValue(end);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(easeOutCubic(t) * end));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, end, duration]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: (typeof STATS)[number];
  delay: 1 | 2 | 3;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal delay={delay} ease={delay % 2 === 0 ? "in" : "out"}>
      <div
        ref={ref}
        className="stat-card flex h-full flex-col rounded-[1.35rem] border border-[var(--line)] bg-[var(--panel)]/92 p-6 shadow-[0_14px_36px_var(--surface-shadow)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--magenta)]/30 hover:shadow-[0_20px_44px_var(--surface-shadow)] md:p-7"
      >
        <p className="font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[-0.03em] text-[var(--bone)] sm:text-5xl md:text-[3.1rem]">
          <CountUp
            end={stat.end}
            prefix={stat.prefix}
            suffix={stat.suffix}
            duration={stat.duration}
            active={active}
          />
        </p>
        <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-[var(--mist)]">
          {stat.label}
        </p>
      </div>
    </Reveal>
  );
}

export function GrowthImpact() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const showEnd = () => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.max(0, video.duration - 0.05);
        }
      };
      if (video.readyState >= 1) showEnd();
      else video.addEventListener("loadedmetadata", showEnd, { once: true });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }
        void video.play().catch(() => {});
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flow-band relative overflow-hidden bg-[var(--ink)]"
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <ParallaxLayer
          speed={0.18}
          className="absolute -top-[18%] bottom-[-18%] left-0 right-0"
        >
          <video
            ref={videoRef}
            className="growth-bg-video h-full w-full min-h-full object-cover object-center"
            muted
            playsInline
            loop
            preload="metadata"
            poster="/footer-bg-poster.jpg"
          >
            <source src="/footer-bg.mp4" type="video/mp4" />
          </video>
        </ParallaxLayer>
        <div className="growth-bg-veil absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:gap-20">
        <Reveal ease="out">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-0.03em] text-[var(--bone)] md:text-4xl lg:text-[2.75rem] lg:leading-tight">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
