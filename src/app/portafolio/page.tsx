"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SiteChrome } from "../_components/site-chrome";
import { mockResults } from "../../lib/mock-data";

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
      <section className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-10">
        <p className="text-xs uppercase tracking-[0.16em] text-hover mb-3">Portafolio</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white max-w-4xl mb-6">
          Casos de transformación operativa con métricas verificables.
        </h1>
        <p className="text-base lg:text-lg text-white/85 leading-relaxed max-w-3xl">
          Cada iniciativa se diseña sobre objetivos de negocio, métricas de desempeño y
          despliegue controlado en operación. No presentamos promesas: presentamos resultados.
        </p>
      </section>

      <section className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pb-12">
        <div className="rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md p-6 lg:p-8 xl:p-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-3">Caso destacado automático</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.company}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-sm uppercase tracking-[0.14em] text-hover mb-2">{activeCase.sector}</p>
                  <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-1">{activeCase.company}</h2>
                  <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-4">Caso mock de referencia</p>
                  <p className="text-sm lg:text-base text-white/85 leading-relaxed mb-4">
                    <span className="text-white font-semibold">Contexto:</span> {activeCase.challenge}
                  </p>
                  <p className="text-sm lg:text-base text-white/85 leading-relaxed mb-4">
                    <span className="text-white font-semibold">Intervención:</span> {activeCase.solution}
                  </p>
                  <p className="text-sm lg:text-base text-white leading-relaxed">
                    <span className="text-hover font-semibold">Impacto:</span> {activeCase.impact}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-w-[240px] lg:w-[280px] rounded-xl border border-white/20 bg-black/25 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-2">Indicador principal</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCase.company}-metric`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-5xl font-bold text-white mb-1">{activeCase.metric}</p>
                  <p className="text-sm text-white/75 mb-4">{activeCase.metricLabel}</p>
                  <p className="text-xs text-white/70">{activeCase.maturity}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {mockResults.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.company}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                    isActive ? "bg-white text-primary" : "bg-white/10 text-white/85 hover:bg-white/20"
                  }`}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {mockResults.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.04 }}
              className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md p-6 lg:p-7"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-3">{item.sector}</p>
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-1">{item.company}</h2>
              <p className="text-sm text-hover mb-5">Resultado simulado para MVP comercial</p>

              <div className="space-y-4 text-sm lg:text-base">
                <p className="text-white/90">
                  <span className="text-white font-semibold">Contexto:</span> {item.challenge}
                </p>
                <p className="text-white/90">
                  <span className="text-white font-semibold">Intervención:</span> {item.solution}
                </p>
                <p className="text-white">
                  <span className="text-hover font-semibold">Impacto:</span> {item.impact}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-white/20 bg-black/25 p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/60 mb-2">Siguiente paso</p>
            <p className="text-xl lg:text-2xl font-semibold text-white">
              Identificamos su caso de mayor impacto y construimos un roadmap ejecutivo.
            </p>
          </div>
          <Link href="/evaluacion" className="inline-flex bg-white text-primary px-8 py-3.5 rounded-md text-sm font-bold hover:bg-gray-100 transition-colors">
            Solicitar evaluación inicial
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
