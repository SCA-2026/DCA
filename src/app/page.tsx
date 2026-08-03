import { ConnectButton } from "@/components/ConnectButton";
import { DcaPlanner } from "@/components/DcaPlanner";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <a
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[var(--bone)]"
        >
          DCA
        </a>
        <nav className="flex items-center gap-6">
          <a
            href="#plan"
            className="hidden text-sm text-[var(--mist)] transition hover:text-[var(--jade)] sm:inline"
          >
            Plan
          </a>
          <ConnectButton />
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="hero-mesh relative flex min-h-dvh flex-col justify-end overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pb-24">
          <div
            className="grid-fade pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="pulse-line pointer-events-none absolute left-[8%] top-[28%] h-px w-[40%] max-w-md bg-[var(--jade)]/40 md:left-[12%]"
            aria-hidden
          />
          <div className="relative z-10 max-w-3xl">
            <p className="animate-rise font-mono text-xs uppercase tracking-[0.25em] text-[var(--jade)]">
              On-chain rhythm
            </p>
            <h1 className="animate-rise-delay mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-[var(--bone)] sm:text-6xl md:text-7xl">
              DCA
            </h1>
            <p className="animate-rise-late mt-5 max-w-md text-lg text-[var(--mist)]">
              Buy the same slice, same cadence — connect your wallet and arm a
              mock dollar-cost average.
            </p>
            <div className="animate-rise-late mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#plan"
                className="rounded-sm bg-[var(--jade)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--jade-bright)]"
              >
                Build a plan
              </a>
              <ConnectButton />
            </div>
          </div>
        </section>

        <DcaPlanner />

        <section className="border-t border-[var(--line)] px-6 py-20 md:px-10">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--jade)]">
              How it works
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--bone)] md:text-4xl">
              Three steps, no noise
            </h2>
            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Connect",
                  d: "Link an injected wallet (MetaMask or similar) on Mainnet or Sepolia.",
                },
                {
                  n: "02",
                  t: "Configure",
                  d: "Choose amount and frequency. Estimates update as you type.",
                },
                {
                  n: "03",
                  t: "Arm",
                  d: "Lock in a demo schedule. Real transfers stay off this mock.",
                },
              ].map((step) => (
                <li key={step.n}>
                  <span className="font-mono text-sm text-[var(--jade)]">
                    {step.n}
                  </span>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mist)]">
                    {step.d}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--line)] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 text-sm text-[var(--fog)]">
          <span className="font-[family-name:var(--font-display)] font-semibold text-[var(--mist)]">
            DCA
          </span>
          <span className="font-mono text-xs">Mock web3 · branch MIA</span>
        </div>
      </footer>
    </div>
  );
}
