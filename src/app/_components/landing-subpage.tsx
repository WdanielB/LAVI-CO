"use client";

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
};

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
}: LandingSubpageProps) {
  return (
    <SiteChrome>
      <section className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mb-10 lg:mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-hover mb-4">{badge}</p>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
            {title}
          </h1>
          <p className="text-base xl:text-lg leading-relaxed text-white/90 max-w-4xl">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
            className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-md p-6 xl:p-8"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-3">Propuesta de Intervención</p>
            <ul className="space-y-3">
              {focusAreas.map((item) => (
                <li key={item} className="text-sm xl:text-base text-white/90 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-md p-6 xl:p-8"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-2">Impacto en Indicadores Clave</p>
            <p className="text-4xl xl:text-5xl font-bold tracking-tight mb-2">{metricValue}</p>
            <p className="text-sm text-white/80 mb-6">{metricLabel}</p>

            <ul className="space-y-3">
              {resultBullets.map((item) => (
                <li key={item} className="text-sm xl:text-base text-white/90 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="rounded-xl border border-white/25 bg-white/10 backdrop-blur-md p-6 xl:p-8"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-white/70 mb-3">Despliegue en su Operación</p>
            <ul className="space-y-3 mb-8">
              {implementationBullets.map((item) => (
                <li key={item} className="text-sm xl:text-base text-white/90 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={ctaHref}
              className="inline-flex bg-white text-primary px-8 py-3.5 rounded-md shadow-md text-sm xl:text-base font-bold hover:bg-gray-100 transition-colors"
            >
              {ctaLabel}
            </Link>
          </motion.section>
        </div>
      </section>
    </SiteChrome>
  );
}
