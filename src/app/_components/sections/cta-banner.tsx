import Link from "next/link";
import { Reveal } from "./reveal";

type Cta = { label: string; href: string };

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  note?: string;
};

export function CtaBanner({ eyebrow = "Siguiente paso", title, body, primaryCta, secondaryCta, note }: CtaBannerProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-20">
      <Reveal>
        <div className="flex flex-col gap-8 border-t-2 border-[var(--lavi-accent)] pt-8 md:pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">{eyebrow}</p>
            <p className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-white lg:text-3xl">
              {title}
            </p>
            {body && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 lg:text-base">{body}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/5"
              >
                {secondaryCta.label}
              </Link>
            )}
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center gap-3 bg-white px-6 py-3 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
            >
              <span>{primaryCta.label}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
        {note && <p className="mt-4 text-xs text-white/50">{note}</p>}
      </Reveal>
    </section>
  );
}
