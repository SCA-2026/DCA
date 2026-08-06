import { Reveal } from "@/components/Reveal";

function IconCube({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M32 8 52 20v24L32 56 12 44V20L32 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M32 8v24m0 0 20-12M32 32 12 20m0 24 20-12 20 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {[
        [32, 8],
        [52, 20],
        [52, 44],
        [32, 56],
        [12, 44],
        [12, 20],
        [32, 32],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="currentColor" />
      ))}
    </svg>
  );
}

function IconOrbit({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M32 10a22 22 0 0 1 22 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="3.5 4"
      />
      <circle cx="32" cy="10" r="2.4" fill="currentColor" />
      <circle cx="54" cy="32" r="2.4" fill="currentColor" />
    </svg>
  );
}

function IconNodes({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 34h12v-12h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="34" r="3.2" fill="currentColor" />
      <circle cx="22" cy="22" r="3.2" fill="currentColor" />
      <circle cx="34" cy="10" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function JoinCommunity() {
  return (
    <section className="flow-band relative overflow-hidden bg-[var(--ink)]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <IconCube className="absolute left-[6%] top-[18%] size-14 text-[var(--orange)] opacity-90 md:left-[12%] md:top-[22%] md:size-16 lg:left-[16%]" />
        <IconOrbit className="absolute right-[8%] top-[12%] size-14 text-[var(--gold)] opacity-90 md:right-[14%] md:top-[16%] md:size-16 lg:right-[18%]" />
        <IconNodes className="absolute bottom-[18%] left-[10%] size-11 text-[var(--fog)] opacity-70 md:bottom-[22%] md:left-[18%] md:size-12 lg:left-[22%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-2 text-center">
        <Reveal ease="out">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.12] tracking-tight text-[var(--bone)] sm:text-5xl md:text-6xl">
            Let&apos;s Build
            <br />
            <span className="text-brand">Africa&apos;s Web3</span>
            <br />
            Future Together
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--mist)] md:text-base md:leading-7">
            Partner with Decentrix Africa to unlock the transformative potential
            of Web3 technologies across the continent.
          </p>
          <div className="mt-9">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a2230] px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-125"
            >
              Join our community
              <span aria-hidden className="text-base leading-none">
                ›
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
