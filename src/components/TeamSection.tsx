import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const TEAM = [
  {
    name: "Aurelia Mutua",
    role: "Founder & CEO",
    image: "/team-aurelia.png",
    alt: "Portrait of Aurelia Mutua, Founder and CEO of Decentrix Africa",
  },
  {
    name: "Meave Apondi",
    role: "Chief Operating Officer",
    image: "/team-meave.png",
    alt: "Portrait of Meave Apondi, Chief Operating Officer of Decentrix Africa",
  },
] as const;

export function TeamSection() {
  return (
    <section id="team" className="flow-band bg-[var(--ink)]">
      <div className="mx-auto max-w-6xl">
        <Reveal ease="out">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--bone)] md:text-4xl lg:text-5xl">
              Meet Our{" "}
              <span className="text-brand">Driving Force</span>
            </h2>
            <p className="mt-4 text-sm text-[var(--mist)] md:text-base">
              The passionate individuals dedicated to empowering Africa&apos;s
              Web3 journey.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:mt-14 md:gap-8">
          {TEAM.map((member, i) => (
            <Reveal
              key={member.name}
              delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
              ease={i % 2 === 0 ? "out" : "in"}
            >
              <article className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--panel)] shadow-[0_20px_50px_var(--surface-shadow)] md:rounded-[1.75rem]">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,8,24,0.88)] via-[rgba(12,8,24,0.2)] to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white md:text-3xl">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--gold)] md:text-base">
                    {member.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
