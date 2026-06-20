"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SiteChrome } from "../_components/site-chrome";
import { mockResults } from "../../lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

const springTransition = {
  type: "spring",
  stiffness: 110,
  damping: 18,
  mass: 0.8,
} as const;

const springMetric = {
  type: "spring",
  stiffness: 130,
  damping: 15,
  mass: 0.6,
} as const;

export default function PortafolioPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCase = useMemo(() => mockResults[activeIndex], [activeIndex]);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mockResults.length);
    }, 4200);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <SiteChrome>
      <section className="container mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pt-24 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 select-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavi-accent)]" />
            Portafolio
          </div>
          <h1 className="max-w-4xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl xl:text-6xl">
            Casos de transformación operativa con métricas verificables.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/80 lg:text-lg">
            Cada iniciativa se diseña sobre objetivos de negocio, métricas de desempeño y
            despliegue controlado en operación. No presentamos promesas: presentamos resultados.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto max-w-[1440px] px-5 pb-12 sm:px-6 md:px-12 lg:px-20">
        {/* Double-Bezel Featured Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.08 }}
          className="bg-white/[0.02] border border-white/8 rounded-[2rem] p-1.5 shadow-[0_32px_100px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
        >
          <div className="rounded-[calc(2rem-0.375rem)] border border-[var(--primary)]/30 bg-[linear-gradient(165deg,rgba(50,57,82,0.78),rgba(11,14,20,0.72))] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Caso destacado</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCase.company}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={springTransition}
                  >
                    <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">{activeCase.sector}</p>
                    <h2 className="mb-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-white lg:text-4xl">
                      {activeCase.company}
                    </h2>
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-white/85 lg:text-base">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Contexto</span>
                        {activeCase.challenge}
                      </p>
                      <p className="text-sm leading-relaxed text-white/85 lg:text-base">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Intervención</span>
                        {activeCase.solution}
                      </p>
                      <p className="text-sm leading-relaxed text-white lg:text-base">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">Impacto</span>
                        {activeCase.impact}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Double-Bezel Indicator Box */}
              <div className="w-full shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 lg:w-[280px]">
                <div className="rounded-[calc(1.0rem-6px)] border border-[var(--primary)]/30 bg-[rgba(5,8,14,0.65)] p-5 w-full">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Indicador principal</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeCase.company}-metric`}
                      initial={{ opacity: 0, scale: 0.93 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.93 }}
                      transition={springMetric}
                    >
                      <p
                        className="font-mono text-5xl font-semibold leading-none tracking-tight text-white"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        {activeCase.metric}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/75">{activeCase.metricLabel}</p>
                      <p className="mt-4 border-t border-white/10 pt-3 text-xs text-white/60">{activeCase.maturity}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {mockResults.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={item.company}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={`rounded-full px-3.5 py-2 text-xs font-semibold cursor-pointer transition-all duration-300 active:scale-95 ${
                      isActive
                        ? "border border-[var(--primary)] bg-[var(--primary)] text-[var(--text-primary)] shadow-[0_4px_12px_rgba(40,97,129,0.3)]"
                        : "border border-white/15 bg-white/[0.03] text-white/75 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {item.company}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto max-w-[1440px] px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Biblioteca</p>
            <h3 className="mt-2 font-serif text-2xl leading-tight tracking-tight text-white sm:text-3xl">
              Todos los casos
            </h3>
          </div>
          <p className="hidden text-sm text-white/60 sm:block">{mockResults.length} casos · LATAM</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8">
          {mockResults.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: index * 0.04 }}
              className="group bg-white/[0.015] border border-white/5 rounded-[2rem] p-1.5 transition-all duration-500 hover:scale-[1.01] hover:border-white/12 hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
            >
              <div className="rounded-[calc(2rem-0.375rem)] border border-[var(--primary)]/22 bg-[linear-gradient(165deg,rgba(50,57,82,0.72),rgba(11,14,20,0.55))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="mb-5 flex items-baseline justify-between gap-3">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">{item.sector}</p>
                    <p
                      className="font-mono text-2xl font-semibold leading-none text-white"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {item.metric}
                    </p>
                  </div>

                  <h2 className="mb-1 font-serif text-2xl font-semibold leading-tight tracking-tight text-white lg:text-3xl">
                    {item.company}
                  </h2>
                  <p className="mb-5 text-xs text-white/55">{item.metricLabel}</p>

                  <div className="space-y-3 text-sm lg:text-base">
                    <p className="text-white/85">
                      <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55 font-mono">Contexto</span>
                      {item.challenge}
                    </p>
                    <p className="text-white/85">
                      <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/55 font-mono">Intervención</span>
                      {item.solution}
                    </p>
                    <p className="border-t border-white/10 pt-3 text-white">
                      <span className="mr-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--lavi-accent)] font-mono">Impacto</span>
                      {item.impact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Double-Bezel CTA Container at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="bg-white/[0.015] border border-white/6 p-1.5 rounded-[2rem] mt-12"
        >
          <div className="rounded-[calc(2rem-0.375rem)] border border-[var(--primary)]/30 bg-[linear-gradient(140deg,rgba(40,97,129,0.22),rgba(118,149,186,0.10),rgba(255,255,255,0.03))] p-6 lg:p-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">Siguiente paso</p>
              <p className="mt-2 max-w-2xl text-xl font-semibold leading-tight text-white lg:text-2xl">
                Identificamos tu caso de mayor impacto y construimos un roadmap ejecutivo.
              </p>
            </div>
            
            {/* Button-in-Button CTA */}
            <Link
              href="/evaluacion"
              className="group inline-flex shrink-0 items-center justify-between gap-4 rounded-full bg-[var(--primary)] pl-6 pr-2 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)] active:scale-[0.98] outline-none"
            >
              <span>Solicitar evaluación inicial</span>
              <span className="w-8 h-8 rounded-full bg-white/12 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 select-none">
                ↗
              </span>
            </Link>
          </div>
        </motion.div>
      </section>
    </SiteChrome>
  );
}
