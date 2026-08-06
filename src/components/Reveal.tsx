"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealEase = "in" | "out";

export function Reveal({
  children,
  className = "",
  delay,
  ease = "out",
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
  /** Alternate between neighbors: out then in, etc. */
  ease?: RevealEase;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass =
    delay === 1
      ? "reveal-delay-1"
      : delay === 2
        ? "reveal-delay-2"
        : delay === 3
          ? "reveal-delay-3"
          : "";

  const easeClass = ease === "in" ? "reveal-ease-in" : "reveal-ease-out";

  return (
    <div ref={ref} className={`reveal ${easeClass} ${delayClass} ${className}`}>
      {children}
    </div>
  );
}
