import Link from "next/link";
import { Reveal } from "./reveal";
import { SHEET_GRID } from "./section";

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
    <section className="container mx-auto max-w-[1440px] px-5 pb-14 pt-14 sm:px-6 sm:pt-20 md:px-12 md:pb-24 md:pt-28 lg:px-20">
      <Reveal>
        <h1 className="max-w-[20ch] text-balance font-serif text-[clamp(2.1rem,5.6vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
          {title}
        </h1>
        <div className={`mt-12 md:mt-20 ${SHEET_GRID}`}>
          <p className="text-[13px] leading-snug tracking-[-0.01em] text-white/50">{eyebrow}</p>
          <div>
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-white/70 md:text-base">{description}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[14px]">
                {primaryCta && (
                  <Link href={primaryCta.href} className="group inline-flex items-center gap-2 border-b border-white pb-1 font-medium text-white">
                    {primaryCta.label}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </Link>
                )}
                {secondaryCta && (
                  <Link href={secondaryCta.href} className="border-b border-white/25 pb-1 text-white/70 transition-colors hover:border-white hover:text-white">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
            {note && <p className="mt-6 text-[13px] text-white/40">{note}</p>}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
