const PARTNERS = [
  "Decentrix Africa",
  "Ethereum",
  "Sepolia",
  "MetaMask",
  "wagmi",
  "viem",
];

export function PartnerMarquee() {
  const row = [...PARTNERS, ...PARTNERS];

  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] py-8">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--ink)] to-transparent" />
      <div className="marquee-track flex w-max gap-16">
        {row.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-[var(--mist)] uppercase"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
