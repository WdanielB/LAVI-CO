"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
    }
  | {
      kind: "component";
      node: ReactNode;
      caption: string;
    };

type Metric = {
  value: string;
  label: string;
  detail: string;
};

type SectionBlock = {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  metric: Metric;
  media: MediaAsset;
  audience?: string;
  reverse?: boolean;
};

type FocusTrack = {
  id: string;
  label: string;
  detail: string;
  sectionId: string;
};

type ShowcasePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  verticalLabel: string;
  heroMedia: MediaAsset;
  heroMetrics: Metric[];
  focusTracks?: FocusTrack[];
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
  finalCtaPrimary?: {
    label: string;
    href: string;
  };
  finalCtaSecondary?: {
    label: string;
    href: string;
  };
};

function MediaFrame({ asset, priority = false }: { asset: MediaAsset; priority?: boolean }) {
  if (asset.kind === "component") {
    return <>{asset.node}</>;
  }

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
  focusTracks = [],
  sections,
  ctaPrimary,
  ctaSecondary,
  introNote,
  introTitle,
  introBody,
  finalCtaPrimary,
  finalCtaSecondary,
}: ShowcasePageProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const [isDesktopMotion, setIsDesktopMotion] = useState(false);

  useEffect(() => {
    const updateMotionState = () => {
      setIsDesktopMotion(window.matchMedia("(min-width: 1024px)").matches);
    };

    updateMotionState();
    window.addEventListener("resize", updateMotionState);

    return () => window.removeEventListener("resize", updateMotionState);
  }, []);

  const heroFloat = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const heroDrift = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroFade = useTransform(scrollYProgress, [0, 0.12, 1], [1, 1, 0.6]);

  const floatA = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const floatB = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const floatC = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const heroFloatStyle = isDesktopMotion ? heroFloat : 0;
  const heroDriftStyle = isDesktopMotion ? heroDrift : 0;
  const heroFadeStyle = isDesktopMotion ? heroFade : 1;
  const floatAStyle = isDesktopMotion ? floatA : 0;
  const floatBStyle = isDesktopMotion ? floatB : 0;
  const floatCStyle = isDesktopMotion ? floatC : 0;

  return (
    <SiteChrome>
      <main ref={rootRef} className="relative overflow-x-hidden bg-[radial-gradient(circle_at_12%_14%,rgba(40,97,129,0.18),transparent_34%),linear-gradient(180deg,#0b0e14_0%,#111824_44%,#06090f_100%)] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(40,97,129,0.22),transparent_72%)] blur-2xl" />
          <div className="absolute right-[5%] top-[14%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(243,244,246,0.08),transparent_72%)] blur-2xl" />
          <div className="absolute bottom-[12%] left-[45%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(50,57,82,0.15),transparent_72%)] blur-2xl" />
        </div>

        <section className="relative min-h-[100dvh] overflow-hidden">
          <motion.div aria-hidden className="absolute inset-0" style={{ y: heroFloatStyle, opacity: heroFadeStyle }}>
            <div className="absolute inset-0">
              <MediaFrame asset={heroMedia} priority />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,97,129,0.16)_0%,rgba(50,57,82,0.34)_48%,rgba(5,11,20,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(90deg,rgba(5,11,20,0.14),rgba(5,11,20,0.46))]" />

          <div className="container relative mx-auto grid min-h-[100dvh] max-w-[1440px] items-end gap-6 px-5 pb-10 pt-24 sm:gap-8 sm:pt-28 md:px-10 md:pt-32 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10 lg:py-16">
            <motion.div style={{ y: heroDriftStyle }} className="max-w-3xl pb-4 lg:pb-0">
              <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[var(--lavi-fog)] sm:mb-4 sm:text-xs">{eyebrow}</p>
              <h1 className="text-balance font-serif text-[clamp(2rem,8vw,6.1rem)] leading-[0.95] tracking-[-0.03em]">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-white/84 sm:mt-6 sm:text-base md:text-lg">
                {description}
              </p>

              {focusTracks.length > 0 ? (
                <div className="mt-7">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/82">Elegi tu frente prioritario</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                    {focusTracks.map((track) => (
                      <Link
                        key={track.id}
                        href={`#${track.sectionId}`}
                        className="group rounded-2xl border border-[var(--primary)]/28 bg-[rgba(11,14,20,0.42)] px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/54 hover:bg-[rgba(50,57,82,0.52)]"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/95">{track.label}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/86">{track.detail}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link href={ctaPrimary.href} className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]">
                  {ctaPrimary.label}
                </Link>
                {ctaSecondary ? (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--primary)]/50 bg-[color:rgba(50,57,82,0.55)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:bg-[rgba(40,97,129,0.18)]"
                  >
                    {ctaSecondary.label}
                  </Link>
                ) : null}
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-[var(--primary)]/22 bg-[linear-gradient(160deg,rgba(50,57,82,0.76),rgba(11,14,20,0.62))] p-4 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
                    <p className="font-mono text-3xl leading-none tracking-tight text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                      {metric.value}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/93">{metric.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/88">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.aside style={{ y: heroDriftStyle }} className="relative w-full lg:justify-self-end">
              <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-[var(--primary)]/28 bg-[linear-gradient(160deg,rgba(50,57,82,0.75),rgba(11,14,20,0.65))] shadow-[0_28px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                <div className="relative aspect-[4/5] min-h-[320px] w-full sm:min-h-[420px] lg:min-h-[520px]">
                  <MediaFrame asset={heroMedia} priority />
                </div>
                <div className="border-t border-white/10 bg-[rgba(11,14,20,0.7)] px-5 py-4 backdrop-blur-2xl">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/78">{heroMedia.caption}</p>
                </div>
              </div>
              <div className="absolute -right-10 top-0 hidden h-full items-center lg:flex">
                <p className="origin-center rotate-90 whitespace-nowrap text-[11px] uppercase tracking-[0.36em] text-white/72">
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
              <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-white/88 md:text-base">
                {introBody}
              </p>

              <div className="mt-8 rounded-2xl border border-[var(--primary)]/24 bg-[linear-gradient(155deg,rgba(50,57,82,0.74),rgba(11,14,20,0.58))] p-4 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/86">Resumen ejecutivo rapido</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  {sections.map((section, sectionIndex) => (
                    <Link
                      key={`${section.title}-${sectionIndex}`}
                      href={`#${section.id ?? `case-${sectionIndex + 1}`}`}
                      className="rounded-xl border border-white/14 bg-[rgba(8,11,16,0.56)] p-3 transition-all hover:border-[var(--primary)]/46 hover:bg-[rgba(40,97,129,0.14)]"
                    >
                      <p className="text-[10px] uppercase tracking-[0.17em] text-white/84">{section.eyebrow}</p>
                      {section.audience ? <p className="mt-1 text-sm font-semibold leading-snug text-white/96">{section.audience}</p> : null}
                      <p className="mt-2 text-xs leading-relaxed text-white/88">
                        {section.metric.value} {section.metric.label}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8">
              {sections.map((section, index) => {
                const mediaMotion = index % 3 === 0 ? floatAStyle : index % 3 === 1 ? floatBStyle : floatCStyle;
                return (
                  <motion.article
                    key={section.title}
                    id={section.id ?? `case-${index + 1}`}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className={`grid gap-5 rounded-[2rem] border border-white/10 bg-[linear-gradient(156deg,rgba(50,57,82,0.42),rgba(11,14,20,0.5))] p-5 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.7)] md:grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-6 ${section.reverse ? "lg:[direction:rtl]" : ""}`}
                  >
                    <div className={`${section.reverse ? "lg:[direction:ltr]" : ""}`}>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/86">{section.eyebrow}</p>
                      {section.audience ? <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--lavi-accent)]">{section.audience}</p> : null}
                      <h3 className="mt-3 text-balance font-serif text-3xl leading-[1.03] md:text-4xl">{section.title}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/88 md:text-base">{section.body}</p>

                      <ul className="mt-6 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/88">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--lavi-accent)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex items-baseline gap-4 border-t border-white/12 pt-5">
                        <p className="font-mono text-4xl leading-none text-[var(--lavi-accent)]" style={{ fontVariantNumeric: "tabular-nums" }}>
                          {section.metric.value}
                        </p>
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/92">{section.metric.label}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-white/75">{section.metric.detail}</p>
                        </div>
                      </div>
                    </div>

                    <motion.div style={{ y: mediaMotion }} className={`w-full ${section.reverse ? "lg:[direction:ltr]" : ""}`}>
                      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--primary)]/20 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-2xl">
                        <div className="relative aspect-[4/5] min-h-[280px] w-full sm:min-h-[320px] lg:min-h-[360px]">
                          <MediaFrame asset={section.media} />
                        </div>
                        <div className="border-t border-white/10 bg-[rgba(11,14,20,0.72)] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white/82">
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
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/28 bg-[linear-gradient(175deg,rgba(50,57,82,0.52),rgba(11,14,20,0.54))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] md:p-8 lg:p-10">
            <motion.div aria-hidden className="pointer-events-none absolute left-6 top-6 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(243,244,246,0.24),transparent_72%)]" style={{ y: floatAStyle }} />
            <motion.div aria-hidden className="pointer-events-none absolute right-10 top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(40,97,129,0.2),transparent_72%)]" style={{ y: floatBStyle }} />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavi-fog)]">Siguiente paso</p>
                <h3 className="mt-3 max-w-3xl text-balance font-serif text-4xl leading-[1.02] md:text-5xl lg:text-6xl">
                  Si el sistema está bien pensado, el trabajo se siente más liviano.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/88 md:text-base">
                  Traducimos presión de negocio en interfaces, flujos y sistemas operativos que puedan lanzarse, medirse y escalarse.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Link
                  href={finalCtaPrimary?.href ?? ctaPrimary.href}
                  className="inline-flex justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
                >
                  {finalCtaPrimary?.label ?? ctaPrimary.label}
                </Link>
                {(finalCtaSecondary ?? ctaSecondary) ? (
                  <Link
                    href={(finalCtaSecondary ?? ctaSecondary)?.href ?? "#"}
                    className="inline-flex justify-center rounded-full border border-[var(--primary)]/50 bg-[color:rgba(50,57,82,0.55)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:-translate-y-0.5 hover:bg-[rgba(40,97,129,0.15)]"
                  >
                    {(finalCtaSecondary ?? ctaSecondary)?.label}
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
