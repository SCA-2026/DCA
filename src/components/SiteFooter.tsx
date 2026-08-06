"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

const COMPANY = [
  { href: "#about", label: "About us" },
  { href: "#contact", label: "Careers", hiring: true },
  { href: "#potential", label: "Customers" },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function onSubscribe(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] px-6 pb-8 pt-14 md:px-10 md:pb-10 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_1.4fr] md:items-start md:gap-16 lg:gap-24">
          <a href="/" className="inline-flex w-fit items-center">
            <Image
              src="/decentrix-logo.png"
              alt="Decentrix Africa"
              width={160}
              height={44}
              className="h-10 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </a>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--bone)]">
              Company
            </h2>
            <ul className="mt-5 space-y-3.5">
              {COMPANY.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex flex-wrap items-center gap-2.5 text-sm text-[var(--mist)] transition hover:text-[var(--bone)]"
                  >
                    {link.label}
                    {"hiring" in link && link.hiring && (
                      <span className="rounded-full bg-[#1a2230] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">
                        We&apos;re hiring!
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 md:max-w-md md:justify-self-end lg:max-w-lg">
            <h2 className="font-[family-name:var(--font-display)] text-sm font-bold text-[var(--bone)]">
              Stay up to date
            </h2>
            <form
              onSubmit={onSubscribe}
              className="mt-5 flex overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--panel)] shadow-[0_8px_24px_var(--surface-shadow)]"
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
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-[var(--bone)] outline-none placeholder:text-[var(--fog)]"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#1a2230] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-125"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs leading-relaxed text-[var(--mist)]">
              {subscribed
                ? "Thanks — you're on the list."
                : "Stay updated with the latest tools and exclusive deals."}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
          <p className="text-xs text-[var(--mist)]">
            © 2026 Decentrix Africa.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--mist)] transition hover:text-[var(--bone)]"
              aria-label="Decentrix Africa on X"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.875 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--mist)] transition hover:text-[var(--bone)]"
              aria-label="Decentrix Africa on LinkedIn"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
