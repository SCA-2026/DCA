export function NetworkVisual() {
  return (
    <div
      className="pointer-events-none absolute right-[-6%] top-[12%] hidden h-[420px] w-[420px] lg:block xl:right-[4%]"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 400 400"
          className="network-ring absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#ff2d95" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffcc00" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            opacity="0.7"
          />
          <circle
            cx="200"
            cy="200"
            r="55"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>

        {[
          { t: "12%", l: "48%", c: "bg-[var(--cyan)]" },
          { t: "42%", l: "82%", c: "bg-[var(--magenta)]" },
          { t: "78%", l: "58%", c: "bg-[var(--orange)]" },
          { t: "58%", l: "18%", c: "bg-[var(--gold)]" },
        ].map((pos, i) => (
          <span
            key={i}
            className={`network-node absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${pos.c}`}
            style={{ top: pos.t, left: pos.l }}
          />
        ))}

        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--magenta)]/40 bg-[var(--magenta)]/10 backdrop-blur-sm" />
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--fog)]">
          Decentrix Africa
        </p>
      </div>
    </div>
  );
}
