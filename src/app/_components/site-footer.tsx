"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { mockClientBrands, mockResults } from "../../lib/mock-data";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 border-t border-white/10 bg-[rgba(5,8,12,0.92)]"
    >
      <div className="container mx-auto max-w-[1440px] px-5 py-12 sm:px-6 md:px-12 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_1fr_0.8fr] xl:gap-12">
          <div>
            <Image
              src="/media/logos/lavi-logo-outline-light.png"
              alt="LAVI & CO"
              width={250}
              height={100}
              className="mb-5 h-9 w-auto"
            />
            <p className="max-w-sm text-sm leading-relaxed text-white/75">
              Consultoría digital y automatización para operaciones de alto impacto desde Arequipa, Perú.
            </p>
            <div className="mt-5 flex gap-2">
              <Link
                href="/comenzar"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                Iniciar proyecto
              </Link>
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-white/5"
              >
                Evaluar
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Navegación</p>
            <div className="flex flex-col gap-2.5 text-sm text-white/80">
              <Link href="/work" className="transition-colors hover:text-white">Casos</Link>
              <Link href="/portafolio" className="transition-colors hover:text-white">Impacto</Link>
              <Link href="/services" className="transition-colors hover:text-white">Servicios</Link>
              <Link href="/logistica" className="transition-colors hover:text-white">Logística</Link>
              <Link href="/about" className="transition-colors hover:text-white">Nosotros</Link>
              <Link href="/contact" className="transition-colors hover:text-white">Contacto</Link>
              <Link href="/evaluacion" className="transition-colors hover:text-white">Evaluar sin costo</Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Impacto observado</p>
            <div className="space-y-3 text-sm text-white/80">
              {mockResults.slice(0, 3).map((item) => (
                <div key={item.company} className="flex items-baseline gap-3">
                  <span className="font-mono text-[13px] font-semibold text-white" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {item.metric}
                  </span>
                  <span className="text-white/70">{item.metricLabel}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-white/55">
              Escenarios anonimizados. En evaluación compartimos trazabilidad y método de medición.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Contacto</p>
            <a
              href="mailto:hello@laviandco.com"
              className="text-sm font-medium text-white underline-offset-4 transition-colors hover:underline"
            >
              hello@laviandco.com
            </a>
            <p className="mt-3 text-sm text-white/65">Industria alimentaria y logística</p>
            <p className="mt-1 text-sm text-white/65">Respuesta en 1 día hábil</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-8">
          {mockClientBrands.map((brand) => (
            <span
              key={brand}
              className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/75"
            >
              {brand}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LAVI &amp; CO. Todos los derechos reservados.</p>
          <p>Arequipa, Perú · LATAM</p>
        </div>
      </div>
    </motion.footer>
  );
}
