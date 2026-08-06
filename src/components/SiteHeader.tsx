"use client";

import { ConnectButton } from "@/components/ConnectButton";
import Image from "next/image";
import { useState } from "react";

const LINKS = [
  { href: "#partners", label: "Partners" },
  { href: "#features", label: "Features" },
  { href: "#about", label: "About" },
  { href: "#solutions", label: "Solutions" },
  { href: "#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/decentrix-logo.png"
            alt="Decentrix Africa"
            width={148}
            height={40}
            className="h-9 w-auto max-h-10 object-contain"
            style={{ width: "auto" }}
            priority
          />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--panel)]/80 px-2 py-1.5 backdrop-blur-md lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs text-[var(--mist)] transition hover:bg-[var(--line)] hover:text-[var(--bone)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ConnectButton />
          </div>
          <button
            type="button"
            className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--mist)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-3 flex max-w-6xl flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 lg:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-[var(--mist)] hover:bg-[var(--line)] hover:text-[var(--bone)]"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-[var(--line)] pt-3 sm:hidden">
            <ConnectButton />
          </div>
        </nav>
      )}
    </header>
  );
}
