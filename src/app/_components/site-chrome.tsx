"use client";

import Link from "next/link";
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
    { href: "/automatizacion", label: "Automatización" },
    { href: "/soluciones", label: "Soluciones" },
    { href: "/logistica", label: "Logística" },
    { href: "/recursos", label: "Recursos" },
    { href: "/portafolio", label: "Portafolio" },
    { href: "/login", label: "Login" },
  ];

  return (
    <div className="relative min-h-screen bg-primary text-white overflow-x-hidden">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 18, 0], y: [0, 24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-hover/20 blur-3xl"
        animate={{ x: [0, -22, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary/80 backdrop-blur-xl"
      >
        <div className="w-full border-b border-white/10 bg-black/30">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-2.5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
            <span className="text-hover whitespace-nowrap">MVP Demo</span>
            <div className="flex flex-wrap gap-3 md:gap-5">
              {mockHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-5 w-5 rounded-sm bg-accent/80 relative overflow-hidden">
              <span className="absolute inset-0 bg-white/20 rotate-45"></span>
            </span>
            <span className="text-[15px] font-bold tracking-tight uppercase">LAVI & CO</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-white/85">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/comenzar"
            className="inline-flex bg-accent text-white px-5 py-2.5 rounded-md text-[13px] font-bold hover:bg-hover hover:text-primary transition-all hover:scale-105"
          >
            Comenzar
          </Link>
        </div>

        <div className="hidden md:block border-t border-white/10">
          <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-2.5 flex items-center gap-4 text-[11px] uppercase tracking-[0.14em] text-white/60">
            <p>Resultados simulados de referencia</p>
            <div className="flex-1 grid grid-cols-2 xl:grid-cols-4 gap-2">
              {mockResults.slice(0, 4).map((item) => (
                <span key={item.company} className="text-white/80 bg-white/5 border border-white/10 rounded px-2 py-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.company} {item.metric} {item.metricLabel}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden px-6 md:px-12 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold border transition-colors ${
                    isActive
                      ? "bg-white text-primary border-white"
                      : "border-white/30 text-white/85 hover:border-white/55"
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
        className="relative z-10 border-t border-white/15 bg-[#050D1A]"
      >
        <div className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 py-10 lg:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-10">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-white/70 mb-3">LAVI & CO</p>
              <p className="text-sm text-white/85 max-w-sm leading-relaxed">
                Consultoria digital y automatizacion para operaciones de alto impacto.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-3">Navegación</p>
              <div className="flex flex-col gap-2 text-sm text-white/85">
                <Link href="/automatizacion" className="hover:text-white transition-colors">Automatización</Link>
                <Link href="/soluciones" className="hover:text-white transition-colors">Soluciones</Link>
                <Link href="/logistica" className="hover:text-white transition-colors">Logística</Link>
                <Link href="/recursos" className="hover:text-white transition-colors">Recursos</Link>
                <Link href="/portafolio" className="hover:text-white transition-colors">Portafolio</Link>
                <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                <Link href="/evaluacion" className="hover:text-white transition-colors">Evaluar sin costo</Link>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-3">Resultados Mock</p>
              <div className="space-y-2 text-sm text-white/85">
                {mockResults.slice(0, 3).map((item) => (
                  <p key={item.company}>
                    <span className="text-white font-semibold">{item.company}:</span> {item.metric} {item.metricLabel}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-white/60 mb-3">Contacto</p>
              <p className="text-sm text-white/85">hello@laviandco.com</p>
              <p className="text-sm text-white/60 mt-4">Industria Alimentaria y Logística</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {mockClientBrands.map((brand) => (
              <span key={brand} className="inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
