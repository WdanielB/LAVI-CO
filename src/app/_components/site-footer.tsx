"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 border-t border-white/10 bg-[rgba(5,8,12,0.92)]"
    >
      <div className="container mx-auto max-w-[1440px] px-5 py-10 sm:px-6 sm:py-12 md:px-12 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 gap-7 text-center sm:grid-cols-2 sm:gap-10 sm:text-left xl:grid-cols-[1.4fr_1fr_1fr_1fr] xl:gap-12">
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="/media/logos/lavi-logo-outline-light.png"
              alt="LAVI & CO"
              width={250}
              height={100}
              className="mb-4 h-8 w-auto sm:mb-5 sm:h-9"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/75 sm:max-w-sm">
              Consultoría digital y automatización para operaciones de alto impacto desde Arequipa, Perú.
            </p>
            <div className="mt-5 flex gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-colors hover:bg-white/90"
              >
                Agenda una llamada
              </Link>
            </div>
          </div>

          <nav aria-label="Servicios" className="hidden sm:block">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Servicios</p>
            <div className="flex flex-col gap-2.5 text-sm text-white/80">
              <Link href="/services/automatizacion-n8n" className="transition-colors hover:text-white">Automatización con n8n</Link>
              <Link href="/services/erp-crm-a-medida" className="transition-colors hover:text-white">ERP y CRM a medida</Link>
              <Link href="/services/desarrollo-mvp" className="transition-colors hover:text-white">Desarrollo de MVP</Link>
              <Link href="/logistica" className="transition-colors hover:text-white">Automatización logística</Link>
            </div>
          </nav>

          <nav aria-label="Navegación del sitio">
            <p className="mb-4 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:block">Navegación</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/80 sm:flex-col sm:justify-start sm:gap-2.5">
              <Link href="/work" className="transition-colors hover:text-white">Casos</Link>
              <Link href="/services" className="transition-colors hover:text-white">Servicios</Link>
              <Link href="/logistica" className="transition-colors hover:text-white">Logística</Link>
              <Link href="/about" className="transition-colors hover:text-white">Nosotros</Link>
              <Link href="/contact" className="transition-colors hover:text-white">Contacto</Link>
            </div>
          </nav>

          <div>
            <p className="mb-4 hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:block">Contacto</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:flex-col sm:justify-start sm:gap-2.5">
              <a
                href="mailto:contacto@lavi.lat"
                className="font-medium text-white underline-offset-4 transition-colors hover:underline"
              >
                contacto@lavi.lat
              </a>
              <a
                href="https://wa.me/51946689538"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                WhatsApp<span className="hidden sm:inline">: +51 946 689 538</span>
              </a>
              <a
                href="https://instagram.com/lavi.latam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                @lavi.latam
              </a>
            </div>
            <p className="mt-4 hidden text-sm text-white/65 sm:block">Respuesta en 1 día hábil</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1.5 border-t border-white/10 pt-6 text-center text-xs text-white/55 sm:mt-10 sm:flex-row sm:gap-3 sm:pt-8 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LAVI &amp; CO. <span className="hidden sm:inline">Todos los derechos reservados.</span></p>
          <p>Arequipa, Perú · LATAM</p>
        </div>
      </div>
    </motion.footer>
  );
}
