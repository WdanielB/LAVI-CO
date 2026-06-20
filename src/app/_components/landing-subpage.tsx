"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteChrome } from "./site-chrome";

type LandingSubpageProps = {
  badge: string;
  title: string;
  description: string;
  focusAreas: string[];
  resultBullets: string[];
  implementationBullets: string[];
  metricLabel: string;
  metricValue: string;
  ctaLabel: string;
  ctaHref: string;
  heroImage?: string;
  heroImageAlt?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function LandingSubpage({
  badge,
  title,
  description,
  focusAreas,
  resultBullets,
  implementationBullets,
  metricLabel,
  metricValue,
  ctaLabel,
  ctaHref,
  heroImage,
  heroImageAlt,
  secondaryCtaLabel,
  secondaryCtaHref,
}: LandingSubpageProps) {
  return (
    <SiteChrome>
      {/* HERO ---------------------------------------------------------------- */}
      <section className="container mx-auto max-w-[1440px] px-5 pb-10 pt-12 sm:px-6 sm:pt-16 md:px-12 md:pb-14 md:pt-24 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(158deg,rgba(50,57,82,0.5),rgba(11,14,20,0.78))] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
        >
          {/* hairline top accent */}
          <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--lavi-accent),transparent)] opacity-70" />

          <div className="grid items-stretch lg:grid-cols-[1.12fr_0.88fr]">
            <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12 lg:p-14">
              <div className="inline-flex w-fit items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/65 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavi-accent)] shadow-[0_0_10px_var(--lavi-accent)]" />
                {badge}
              </div>

              <h1 className="mt-6 text-balance font-serif text-[clamp(2rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
                {title}
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-[15px] leading-[1.7] text-white/72 sm:text-base">
                {description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center justify-between gap-4 rounded-full bg-[var(--primary)] py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_12px_30px_-8px_rgba(40,97,129,0.7)] outline-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>{ctaLabel}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 select-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>

                {secondaryCtaLabel && secondaryCtaHref ? (
                  <Link
                    href={secondaryCtaHref}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white outline-none transition-colors hover:border-white/40 hover:bg-white/[0.05] active:scale-[0.98]"
                  >
                    {secondaryCtaLabel}
                  </Link>
                ) : null}
              </div>
            </div>

            {/* media + headline stat */}
            <div className="relative min-h-[280px] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroImageAlt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover opacity-90"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(40,97,129,0.45),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(118,149,186,0.25),transparent_55%)]" />
              )}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0.15),rgba(11,14,20,0.86))] lg:bg-[linear-gradient(255deg,rgba(11,14,20,0.05),rgba(11,14,20,0.78))]" />

              <div className="relative flex h-full flex-col justify-end p-7 sm:p-9 md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">Indicador principal</p>
                <p
                  className="mt-2 font-mono text-[clamp(3rem,7vw,4.75rem)] font-semibold leading-[0.9] tracking-tight text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {metricValue}
                </p>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-white/70">{metricLabel}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BODY ---------------------------------------------------------------- */}
      <section className="container mx-auto max-w-[1440px] px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-20">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] xl:gap-14">
          {/* Sticky intervention rail — hairline list, no per-item cards */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.06 }}
            className="lg:sticky lg:top-28 lg:h-fit"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--lavi-accent)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Propuesta de intervención</p>
            </div>

            <ul className="mt-6 divide-y divide-white/8 border-y border-white/8">
              {focusAreas.map((item, index) => (
                <li key={item} className="flex gap-5 py-5">
                  <span className="font-mono text-xs font-semibold leading-6 text-[var(--lavi-accent)] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-white/82">{item}</p>
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="group mt-7 inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:border-[var(--primary)]/70 hover:bg-[var(--primary)]/15 active:scale-[0.98]"
            >
              <span>{ctaLabel}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
          </motion.aside>

          <div className="space-y-7">
            {/* Impacto en indicadores — clean rows with hairline dividers */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.1 }}
              className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(50,57,82,0.4),rgba(11,14,20,0.45))] p-7 sm:p-9 xl:p-10"
            >
              <div className="mb-7 flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--lavi-accent)]">01</span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Impacto en indicadores</p>
              </div>
              <div className="divide-y divide-white/8">
                {resultBullets.map((item) => (
                  <div key={item} className="group flex items-start gap-4 py-4.5 first:pt-0 last:pb-0">
                    <span aria-hidden className="mt-1 select-none text-[var(--lavi-accent)] transition-transform duration-300 group-hover:translate-x-0.5">▸</span>
                    <p className="text-[15px] leading-relaxed text-white/85 xl:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Despliegue operativo — vertical timeline */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.16 }}
              className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(165deg,rgba(50,57,82,0.4),rgba(11,14,20,0.45))] p-7 sm:p-9 xl:p-10"
            >
              <div className="mb-8 flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[var(--lavi-accent)]">02</span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Despliegue operativo</p>
              </div>

              <ol className="relative ml-3.5 space-y-8 border-l border-dashed border-white/15 pl-8 pr-2">
                {implementationBullets.map((item, index) => (
                  <li key={item} className="relative">
                    <span className="absolute -left-[47px] top-0 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--primary)]/45 bg-[#0b0e14] font-mono text-[11px] font-semibold text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-0.5 text-[15px] leading-relaxed text-white/85 xl:text-base">{item}</p>
                  </li>
                ))}
              </ol>
            </motion.section>

            {/* Bottom CTA band */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.22 }}
              className="flex flex-col gap-4 rounded-[1.5rem] border border-[var(--primary)]/30 bg-[linear-gradient(155deg,rgba(40,97,129,0.22),rgba(11,14,20,0.5))] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">¿Listo para avanzar?</p>
                <p className="mt-1.5 text-base text-white/85">Una conversación breve aclara alcance y siguiente paso.</p>
              </div>

              <Link
                href={ctaHref}
                className="group inline-flex shrink-0 items-center justify-between gap-4 rounded-full bg-[var(--primary)] py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_12px_30px_-8px_rgba(40,97,129,0.7)] outline-none transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>{ctaLabel}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 select-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
