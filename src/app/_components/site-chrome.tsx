"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { mockClientBrands, mockHighlights, mockResults } from "../../lib/mock-data";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/work", label: "Casos" },
    { href: "/services", label: "Servicios" },
    { href: "/logistica", label: "Logística" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,rgba(40,97,129,0.14),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(50,57,82,0.18),transparent_22%),linear-gradient(180deg,#0b0e14_0%,#090c12_100%)] text-white">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-secondary/12 blur-3xl"
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 w-full border-b border-[rgba(0,0,0,0.7)] bg-[rgba(50,57,82,0.72)] backdrop-blur-2xl"
      >
        <div className="w-full border-b border-white/10 bg-white/[0.02]">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-2.5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
            <span className="whitespace-nowrap text-hover">Sistema de estudio LAVI & CO</span>
            <div className="flex flex-wrap gap-3 md:gap-5">
              {mockHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 md:px-12 lg:px-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/media/logos/lavi-logo-light.png"
              alt="LAVI & CO"
              width={250}
              height={100}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-[13px] font-medium text-white/80 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 transition-all ${
                    isActive
                      ? "bg-[color:rgba(40,97,129,0.35)] text-white ring-1 ring-[rgba(0,0,0,0.4)]"
                      : "text-white/72 hover:bg-[color:rgba(50,57,82,0.55)] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/comenzar"
            className="inline-flex rounded-full border border-[var(--primary)] bg-[var(--primary)] px-5 py-2.5 text-[13px] font-semibold text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
          >
            Comenzar
          </Link>
        </div>

        <div className="hidden md:block border-t border-white/10">
          <div className="container mx-auto flex max-w-[1440px] items-center gap-4 px-6 py-2.5 text-[10px] uppercase tracking-[0.18em] text-white/58 md:px-12 lg:px-20">
            <p>Resultados simulados de referencia</p>
            <div className="flex-1 grid grid-cols-2 xl:grid-cols-4 gap-2">
              {mockResults.slice(0, 4).map((item) => (
                <span key={item.company} className="overflow-hidden rounded border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.9)] px-2 py-1 whitespace-nowrap text-ellipsis text-white/78">
                  {item.company} {item.metric} {item.metricLabel}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-2 text-[10px] uppercase tracking-[0.16em] text-white/58 md:hidden">
          <p className="truncate">Resultados simulados de referencia</p>
          <p className="mt-1 truncate text-white/72">
            {mockResults[0].company} {mockResults[0].metric} {mockResults[0].metricLabel} · {mockResults[1].company} {mockResults[1].metric} {mockResults[1].metricLabel}
          </p>
        </div>

        <div className="lg:hidden px-6 md:px-12 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--text-primary)]"
                      : "border-white/20 text-white/82 hover:border-[var(--primary)]/50 hover:bg-[color:rgba(50,57,82,0.55)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.header>

      <div className="relative z-10">{children}</div>

      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 border-t border-[rgba(0,0,0,0.78)] bg-[rgba(0,0,0,0.92)]"
      >
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-10">
            <div>
              <Image
                src="/media/logos/lavi-logo-light.png"
                alt="LAVI & CO"
                width={250}
                height={100}
                className="mb-4 h-8 w-auto"
              />
              <p className="text-sm text-white/85 max-w-sm leading-relaxed">
                Consultoría digital y automatización para operaciones de alto impacto desde Arequipa, Perú.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/58 mb-3">Navegación</p>
              <div className="flex flex-col gap-2 text-sm text-white/85">
                <Link href="/work" className="hover:text-[var(--lavi-paper)] transition-colors">Casos</Link>
                <Link href="/services" className="hover:text-[var(--lavi-paper)] transition-colors">Servicios</Link>
                <Link href="/logistica" className="hover:text-[var(--lavi-paper)] transition-colors">Logística</Link>
                <Link href="/about" className="hover:text-[var(--lavi-paper)] transition-colors">Nosotros</Link>
                <Link href="/contact" className="hover:text-[var(--lavi-paper)] transition-colors">Contacto</Link>
                <Link href="/evaluacion" className="hover:text-[var(--lavi-paper)] transition-colors">Evaluar sin costo</Link>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/58 mb-3">Resultados Mock</p>
              <div className="space-y-2 text-sm text-white/85">
                {mockResults.slice(0, 3).map((item) => (
                  <p key={item.company}>
                    <span className="text-white font-semibold">{item.company}:</span> {item.metric} {item.metricLabel}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/58 mb-3">Contacto</p>
              <p className="text-sm text-white/85">hello@laviandco.com</p>
              <p className="text-sm text-white/60 mt-4">Industria alimentaria y logística</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {mockClientBrands.map((brand) => (
                <span key={brand} className="inline-flex rounded-full bg-[color:rgba(50,57,82,0.35)] px-3 py-1.5 text-xs font-semibold text-white/80">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
