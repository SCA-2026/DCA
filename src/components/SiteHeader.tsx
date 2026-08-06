"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/decentrix-logo.png"
            alt="Decentrix Africa"
            width={148}
            height={40}
            className="h-9 w-auto max-h-10 object-contain"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--panel)]/80 px-2 py-1.5 backdrop-blur-md md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                  active
                    ? "bg-[var(--line)] font-semibold text-[var(--bone)]"
                    : "text-[var(--mist)] hover:bg-[var(--line)] hover:text-[var(--bone)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#1a2230] px-4 py-1.5 text-xs font-semibold text-white transition hover:brightness-125"
          >
            Join Us
            <span aria-hidden className="text-[10px] opacity-80">
              ›
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--mist)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 md:hidden">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  active
                    ? "bg-[var(--line)] font-semibold text-[var(--bone)]"
                    : "text-[var(--mist)] hover:bg-[var(--line)] hover:text-[var(--bone)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#1a2230] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Join Us
            <span aria-hidden>›</span>
          </Link>
        </nav>
      )}
    </header>
  );
}
