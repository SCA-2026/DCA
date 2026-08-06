"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Phase = "enter" | "hold" | "exit" | "hidden";

const PAGES: Record<string, { title: string; tagline: string }> = {
  "/": {
    title: "Home",
    tagline: "Maximize your on-chain presence across African markets.",
  },
  "/services": {
    title: "Services",
    tagline: "Web3 marketing, community, and growth tailored for Africa.",
  },
  "/contact": {
    title: "Contact",
    tagline: "Partner with Decentrix — tell us about your project.",
  },
};

const FIRST_VISIT = {
  title: "Welcome to Decentrix",
  tagline: "Web3 marketing and growth for African communities.",
} as const;

function resolvePage(path: string) {
  return PAGES[path] ?? {
    title: path
      .replace(/^\//, "")
      .replace(/[-/]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Decentrix",
    tagline: "Preparing your next view.",
  };
}

function pathFromHref(href: string) {
  return href.split(/[?#]/)[0] || "/";
}

function isInternalNav(href: string, currentPath: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  return pathFromHref(href) !== currentPath;
}

export function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("enter");
  const [headline, setHeadline] = useState(FIRST_VISIT.title);
  const [tagline, setTagline] = useState(FIRST_VISIT.tagline);
  const prevPath = useRef<string | null>(null);
  const isFirstVisit = useRef(true);
  const timers = useRef<number[]>([]);
  const reducedRef = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const setCopyForPath = (path: string, first: boolean) => {
    if (first) {
      setHeadline(FIRST_VISIT.title);
      setTagline(FIRST_VISIT.tagline);
      return;
    }
    const page = resolvePage(path);
    setHeadline(page.title);
    setTagline(page.tagline);
  };

  const run = (durationScale: number) => {
    clearTimers();
    setPhase("enter");
    document.documentElement.classList.add("page-transition-lock");

    timers.current.push(
      window.setTimeout(() => setPhase("hold"), 420 * durationScale),
    );
    timers.current.push(
      window.setTimeout(() => setPhase("exit"), 1600 * durationScale),
    );
    timers.current.push(
      window.setTimeout(() => {
        setPhase("hidden");
        document.documentElement.classList.remove("page-transition-lock");
      }, 2200 * durationScale),
    );
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !isInternalNav(href, pathname)) return;
      const nextPath = pathFromHref(href);
      setCopyForPath(nextPath, false);
      setPhase("enter");
      document.documentElement.classList.add("page-transition-lock");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useLayoutEffect(() => {
    if (prevPath.current === null || prevPath.current !== pathname) {
      const first = isFirstVisit.current;
      isFirstVisit.current = false;
      prevPath.current = pathname;
      setCopyForPath(pathname, first);
      run(reducedRef.current ? 0.15 : 1);
    }

    return () => {
      clearTimers();
      document.documentElement.classList.remove("page-transition-lock");
    };
  }, [pathname]);

  if (phase === "hidden") return null;

  return (
    <div
      className={`page-transition fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[var(--ink)] ${phase}`}
      aria-live="polite"
      aria-busy={phase !== "exit"}
      role="status"
    >
      <div className="page-transition-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="page-transition-inner relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 text-center">
        <div className="page-transition-logo">
          <Image
            src="/decentrix-logo.png"
            alt=""
            width={200}
            height={56}
            className="h-12 w-auto object-contain md:h-14"
            style={{ width: "auto" }}
            priority
          />
        </div>

        <p className="page-transition-brand mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-brand">
          Decentrix Africa
        </p>

        <h1 className="page-transition-welcome mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-0.03em] text-[var(--bone)] sm:text-4xl">
          {headline}
        </h1>

        <p className="page-transition-tagline mt-4 max-w-sm text-sm leading-relaxed text-[var(--mist)] sm:text-base">
          {tagline}
        </p>

        <p className="page-transition-status mt-10 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--fog)]">
          <span className="page-transition-dot" aria-hidden />
          Preparing your experience
        </p>
      </div>
    </div>
  );
}
