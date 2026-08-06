"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Sticky static image — copy on one side scrolls upward past it, then the page continues.
 */
export function FeaturesParallax({
  children,
  src,
  alt,
}: {
  children: ReactNode;
  src: string;
  alt: string;
}) {
  return (
    <section id="features" className="relative">
      {/* Sticky static photo — stays put while text scrolls */}
      <div className="sticky top-0 z-0 h-dvh w-full overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
            priority={false}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--ink)]/90 via-[var(--ink)]/55 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--ink)]/50 via-transparent to-[var(--ink)]/25"
            aria-hidden
          />
        </div>
      </div>

      {/* Text column scrolls up over the sticky image */}
      <div className="relative z-10 -mt-[100dvh]">
        <div className="mx-auto flex min-h-[70dvh] max-w-6xl items-end px-6 pb-10 pt-[18vh] md:px-10">
          <div className="w-full max-w-xl md:max-w-lg">{children}</div>
        </div>
        <div className="h-[28vh]" aria-hidden />
      </div>
    </section>
  );
}
