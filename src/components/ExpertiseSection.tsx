"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const SERVICES = [
  {
    id: "research",
    title: "Market Research",
    blurb:
      "Unlock Africa’s Web3 potential with tailored market entry and expansion strategies.",
    icon: "tools" as const,
  },
  {
    id: "community",
    title: "Community Building",
    blurb:
      "Forge strong, engaged communities online and offline for sustainable project growth.",
    icon: "grid" as const,
  },
  {
    id: "acquisition",
    title: "User Acquisition",
    blurb:
      "Drive measurable results with data-driven strategies, converting your target audience.",
    icon: "chart" as const,
  },
] as const;

function ServiceIcon({
  name,
  active,
}: {
  name: (typeof SERVICES)[number]["icon"];
  active: boolean;
}) {
  const common = {
    className: `size-6 shrink-0 transition-colors ${
      active ? "text-[var(--orange)]" : "text-[var(--fog)]"
    }`,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "tools") {
    return (
      <svg {...common}>
        <path d="M14.5 3.5a3.2 3.2 0 0 0 0 4.5L10 12.5 8 10.5l4.5-4.5a3.2 3.2 0 0 0 2-2.5Z" />
        <path d="m9.2 11.2-5 5a1.5 1.5 0 0 0 2.1 2.1l5-5" />
        <path d="M9.5 3.5a3.2 3.2 0 0 1 0 4.5L14 12.5l2-2-4.5-4.5a3.2 3.2 0 0 1-2-2.5Z" />
        <path d="m14.8 11.2 5 5a1.5 1.5 0 0 1-2.1 2.1l-5-5" />
      </svg>
    );
  }

  if (name === "grid") {
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M22 20V8" />
    </svg>
  );
}

export function ExpertiseSection() {
  const [active, setActive] = useState<(typeof SERVICES)[number]["id"]>(
    "research",
  );

  return (
    <section className="flow-band overflow-x-clip bg-[var(--ink)]">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel)] shadow-[0_20px_50px_var(--surface-shadow)] md:rounded-[2rem]">
            <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10 md:p-10 lg:gap-14 lg:p-12">
              <div className="relative md:-ml-16 lg:-ml-24 xl:-ml-28">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] shadow-[0_24px_60px_var(--surface-shadow)] sm:aspect-[5/6] md:aspect-[4/5] md:rounded-[1.5rem]">
                  <Image
                    src="/features-event.png"
                    alt="Decentrix Africa speaker addressing a seated audience at a community event"
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-[var(--bone)] sm:text-3xl md:text-[2rem] md:leading-snug lg:text-[2.35rem]">
                  Leverage{" "}
                  <span className="text-brand">Decentrix Africa&apos;s</span>{" "}
                  expertise to accelerate your Web3 adoption across the
                  continent.
                </h2>

                <ul className="mt-8 space-y-2 md:mt-10" role="list">
                  {SERVICES.map((service) => {
                    const isActive = active === service.id;
                    return (
                      <li key={service.id}>
                        <button
                          type="button"
                          onClick={() => setActive(service.id)}
                          onMouseEnter={() => setActive(service.id)}
                          className={`flex w-full items-start gap-4 rounded-2xl px-4 py-4 text-left transition duration-300 md:px-5 md:py-5 ${
                            isActive
                              ? "bg-[var(--ink)] shadow-[0_10px_28px_var(--surface-shadow)]"
                              : "bg-transparent hover:bg-[var(--ink)]/60"
                          }`}
                          aria-pressed={isActive}
                        >
                          <ServiceIcon name={service.icon} active={isActive} />
                          <span className="min-w-0">
                            <span className="block font-[family-name:var(--font-display)] text-base font-bold text-[var(--bone)] md:text-lg">
                              {service.title}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-[var(--mist)]">
                              {service.blurb}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
