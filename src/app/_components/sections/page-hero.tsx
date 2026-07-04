import Link from "next/link";
import { Reveal } from "./reveal";

type Cta = { label: string; href: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  note?: string;
};

export function PageHero({ eyebrow, title, description, primaryCta, secondaryCta, note }: PageHeroProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-12 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pb-16 md:pt-24 lg:px-20">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
          <span aria-hidden className="h-px w-8 bg-[var(--lavi-accent)]" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-balance font-serif text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 lg:text-lg">{description}</p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-3 bg-white px-6 py-3 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
              >
                <span>{primaryCta.label}</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/5"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
        {note && <p className="mt-4 text-xs text-white/55">{note}</p>}
      </Reveal>
    </section>
  );
}
