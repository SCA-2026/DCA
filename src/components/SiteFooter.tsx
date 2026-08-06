"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/components/Reveal";

const COMPANY = [
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Careers", hiring: true },
  { href: "#potential", label: "Customers" },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = footerRef.current;
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
      { threshold: 0.2, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer
      ref={footerRef}
      className="site-footer sticky bottom-0 z-0 overflow-hidden bg-[#f0f0f0]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#f0f0f0]" aria-hidden>
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center"
          muted
          playsInline
          loop
          preload="metadata"
          poster="/footer-bg-poster.jpg"
        >
          <source src="/footer-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(247,244,252,0.9)] via-[rgba(247,244,252,0.35)] to-[rgba(247,244,252,0.15)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-between px-6 py-16 md:px-10 md:py-20 lg:py-24">
        <div className="grid gap-14 md:grid-cols-[1.1fr_auto_1.5fr] md:items-start md:gap-20 lg:gap-28">
          <Reveal ease="out">
            <a href="/" className="inline-flex w-fit items-center">
              <Image
                src="/decentrix-logo.png"
                alt="Decentrix Africa"
                width={200}
                height={56}
                className="h-12 w-auto object-contain md:h-14"
                style={{ width: "auto" }}
              />
            </a>
          </Reveal>

          <Reveal delay={1} ease="in">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-[var(--bone)]">
                Company
              </h2>
              <ul className="mt-6 space-y-4 md:mt-7 md:space-y-5">
                {COMPANY.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link inline-flex flex-wrap items-center gap-2.5 text-base text-[var(--mist)]"
                    >
                      {link.label}
                      {"hiring" in link && link.hiring && (
                        <span className="rounded-full bg-[#1a2230] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
                          We&apos;re hiring!
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2} ease="out">
            <div className="min-w-0 md:max-w-md md:justify-self-end lg:max-w-lg">
              <h2 className="font-[family-name:var(--font-display)] text-base font-bold tracking-tight text-[var(--bone)]">
                Stay up to date
              </h2>
              <form
                onSubmit={onSubscribe}
                className="mt-6 flex overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)]/95 shadow-[0_8px_24px_var(--surface-shadow)] backdrop-blur-sm transition duration-300 focus-within:border-[var(--magenta)]/40 focus-within:shadow-[0_12px_32px_var(--surface-shadow)] md:mt-7"
              >
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setSubscribed(false);
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm text-[var(--bone)] outline-none placeholder:text-[var(--fog)] md:text-base"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-[#1a2230] px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-125"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--mist)]">
                {subscribed
                  ? "Thanks — you're on the list."
                  : "Stay updated with the latest tools and exclusive deals."}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3} ease="in">
          <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--line)]/80 pt-8 md:mt-20">
            <p className="text-sm text-[var(--mist)]">
              © 2026 Decentrix Africa.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social text-[var(--mist)]"
                aria-label="Decentrix Africa on X"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.875 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social text-[var(--mist)]"
                aria-label="Decentrix Africa on LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
