"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiteChrome } from "./site-chrome";

type MediaAsset =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      kind: "video";
      src: string;
      alt: string;
      caption: string;
    };

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type SectionBlock = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  metric: Metric;
  media: MediaAsset;
  reverse?: boolean;
};

type ShowcasePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  verticalLabel: string;
  heroMedia: MediaAsset;
  heroMetrics: Metric[];
  sections: SectionBlock[];
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary?: {
    label: string;
    href: string;
  };
  introNote: string;
  introTitle: string;
  introBody: string;
};

function MediaFrame({ asset, priority = false }: { asset: MediaAsset; priority?: boolean }) {
  if (asset.kind === "video") {
    return (
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={asset.alt}
      >
        <source src={asset.src} type="video/mp4" />
      </video>
    );
  }

  return <Image src={asset.src} alt={asset.alt} fill priority={priority} className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />;
}

export function StudioShowcasePage({
  eyebrow,
  title,
  description,
  verticalLabel,
  heroMedia,
  heroMetrics,
  sections,
  ctaPrimary,
  ctaSecondary,
  introNote,
  introTitle,
  introBody,
}: ShowcasePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });

  const heroFloat = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const heroDrift = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 0.12, 1], [1, 1, 0.6]);

  const floatA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatB = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const floatC = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <SiteChrome>
      <main ref={rootRef} className="relative overflow-x-hidden bg-[linear-gradient(180deg,#0b0e14_0%,#121720_50%,#05070c_100%)] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(40,97,129,0.2),transparent_72%)] blur-2xl" />
          <div className="absolute right-[5%] top-[14%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(243,244,246,0.1),transparent_72%)] blur-2xl" />
          <div className="absolute bottom-[12%] left-[45%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(50,57,82,0.18),transparent_72%)] blur-2xl" />
        </div>

        <section className="relative min-h-[100dvh] overflow-hidden">
          <motion.div aria-hidden className="absolute inset-0" style={{ y: heroFloat, opacity: heroFade }}>
            <div className="absolute inset-0">
              <MediaFrame asset={heroMedia} priority />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,97,129,0.16)_0%,rgba(50,57,82,0.34)_48%,rgba(5,11,20,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(90deg,rgba(5,11,20,0.14),rgba(5,11,20,0.46))]" />

          <div className="container relative mx-auto grid min-h-[100dvh] max-w-[1440px] items-end gap-10 px-5 py-12 md:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-16">
            <motion.div style={{ y: heroDrift }} className="max-w-3xl pb-8 lg:pb-0">
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--lavi-fog)]">{eyebrow}</p>
              <h1 className="text-balance font-serif text-[3rem] leading-[0.92] tracking-[-0.03em] md:text-[5rem] xl:text-[6.4rem]">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/84 md:text-lg">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={ctaPrimary.href} className="inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]">
                  {ctaPrimary.label}
                </Link>
                {ctaSecondary ? (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex rounded-full border border-[var(--primary)]/50 bg-[color:rgba(50,57,82,0.55)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:bg-[rgba(40,97,129,0.18)]"
                  >
                    {ctaSecondary.label}
                  </Link>
                ) : null}
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.78)] p-4 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
                    <p className="font-mono text-3xl leading-none tracking-tight text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--lavi-fog)]">{metric.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside style={{ y: heroDrift }} className="relative lg:justify-self-end">
              <div className="overflow-hidden rounded-[2rem] border border-[var(--primary)]/25 bg-[rgba(50,57,82,0.78)] shadow-[0_28px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <div className="relative aspect-[4/5] min-h-[520px] w-full lg:w-[520px]">
                  <MediaFrame asset={heroMedia} priority />
                </div>
                <div className="border-t border-white/10 bg-[rgba(11,14,20,0.7)] px-5 py-4 backdrop-blur-2xl">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/55">{heroMedia.caption}</p>
                </div>
              </div>
              <div className="absolute -right-10 top-0 hidden h-full items-center lg:flex">
                <p className="origin-center rotate-90 whitespace-nowrap text-[11px] uppercase tracking-[0.36em] text-white/45">
                  {verticalLabel}
                </p>
              </div>
            </motion.aside>
          </div>

          <div className="container relative mx-auto max-w-[1440px] px-5 pb-8 md:px-10">
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-white/55">
              <span>Desplaza para explorar</span>
              <span>Narrativa guiada por media</span>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-[1440px] px-5 py-16 md:px-10 lg:py-24">
          <div className="grid gap-8 border-y border-white/12 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--lavi-fog)]">{introNote}</p>
              <h2 className="mt-4 max-w-2xl text-balance font-serif text-4xl leading-[1.02] md:text-5xl xl:text-6xl">
                {introTitle}
              </h2>
              <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/80 md:text-base">
                {introBody}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {sections.slice(0, 2).map((section) => (
                  <div key={section.title} className="rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.78)] p-4 backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--lavi-fog)]">{section.eyebrow}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/84">{section.metric.value} {section.metric.label}</p>
                    <p className="mt-2 text-xs leading-relaxed text-white/58">{section.metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {sections.map((section, index) => {
                const mediaMotion = index % 3 === 0 ? floatA : index % 3 === 1 ? floatB : floatC;
                return (
                  <motion.article
                    key={section.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid gap-5 rounded-[2rem] border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.76)] p-5 backdrop-blur-2xl shadow-[0_24px_90px_rgba(0,0,0,0.22)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-6 ${section.reverse ? "lg:[direction:rtl]" : ""}`}
                  >
                    <div className={`${section.reverse ? "lg:[direction:ltr]" : ""}`}>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--lavi-fog)]">{section.eyebrow}</p>
                      <h3 className="mt-3 text-balance font-serif text-3xl leading-[1.03] md:text-4xl">{section.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">{section.body}</p>

                      <ul className="mt-6 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/78">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--lavi-accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(11,14,20,0.45)] p-4">
                        <p className="font-mono text-3xl leading-none text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {section.metric.value}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--lavi-fog)]">{section.metric.label}</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{section.metric.detail}</p>
                      </div>
                    </div>

                    <motion.div style={{ y: mediaMotion }} className={`${section.reverse ? "lg:[direction:ltr]" : ""}`}>
                      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--primary)]/20 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
                        <div className="relative aspect-[4/5] min-h-[360px] w-full">
                          <MediaFrame asset={section.media} />
                        </div>
                        <div className="border-t border-white/10 bg-[rgba(11,14,20,0.72)] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white/58">
                          {section.media.caption}
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-[1440px] px-5 pb-20 md:px-10 lg:pb-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/30 bg-[linear-gradient(180deg,rgba(50,57,82,0.5),rgba(50,57,82,0.3))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] md:p-8 lg:p-10">
            <motion.div aria-hidden className="pointer-events-none absolute left-6 top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(243,244,246,0.24),transparent_72%)]" style={{ y: floatA }} />
            <motion.div aria-hidden className="pointer-events-none absolute right-10 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(40,97,129,0.2),transparent_72%)]" style={{ y: floatB }} />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavi-fog)]">Siguiente paso</p>
                <h3 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
                  Si el sistema está bien pensado, el trabajo se siente más liviano.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 md:text-base">
                  Traducimos presión de negocio en interfaces, flujos y sistemas operativos que puedan lanzarse, medirse y escalarse.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href={ctaPrimary.href}
                  className="inline-flex justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
                >
                  {ctaPrimary.label}
                </Link>
                {ctaSecondary ? (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex justify-center rounded-full border border-[var(--primary)]/50 bg-[color:rgba(50,57,82,0.55)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:bg-[rgba(40,97,129,0.15)]"
                  >
                    {ctaSecondary.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
