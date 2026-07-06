"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "./site-footer";

type SiteChromeProps = {
  children: ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/work", label: "Casos" },
    { href: "/services", label: "Servicios" },
    { href: "/logistica", label: "Logística" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--lavi-ink)] text-[var(--lavi-paper)] antialiased">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-45"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(40,97,129,0.22), transparent 38%), radial-gradient(circle at 86% 12%, rgba(118,149,186,0.2), transparent 34%), linear-gradient(180deg, rgba(8,11,16,0.9), rgba(8,11,16,0.98))",
        }}
      />

      <div className="relative z-10 w-full">
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 w-full border-b border-white/8 bg-[linear-gradient(180deg,rgba(8,11,16,0.92),rgba(8,11,16,0.7))] backdrop-blur-xl"
        >
          <div className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 md:px-12 md:py-5 lg:px-16">
            <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
              <Image
                src="/media/logos/lavi-logo-outline-light.png"
                alt="LAVI & CO"
                width={300}
                height={120}
                priority
                className="h-9 w-auto sm:h-10 md:h-[46px]"
              />
            </Link>

            <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.02em] text-white/70 lg:flex xl:gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative inline-flex items-center pb-1 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-white ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1px] w-full origin-left bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/contact"
                className="hidden items-center justify-center bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-colors hover:bg-white/90 sm:inline-flex md:px-6 md:text-[13px]"
              >
                Agenda una llamada
              </Link>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="site-mobile-menu"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(15,19,27,0.55)] text-white backdrop-blur-xl transition-colors hover:border-white/30 hover:bg-[rgba(40,97,129,0.28)] lg:hidden"
              >
                <span className="sr-only">Menú</span>
                <span aria-hidden className="relative block h-3.5 w-5">
                  <span
                    className={`absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "translate-y-[6px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-white transition-opacity duration-200 ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[12px] h-[1.5px] w-full bg-white transition-transform duration-300 ${
                      isMobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="site-mobile-menu"
                id="site-mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="overflow-hidden border-t border-white/8 bg-[rgba(8,11,16,0.97)] backdrop-blur-xl lg:hidden"
              >
                <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-5 sm:px-6 md:px-12">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 + index * 0.04, ease: [0.32, 0.72, 0, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                            isActive
                              ? "bg-white/5 text-white"
                              : "text-white/85 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span aria-hidden className={isActive ? "text-white" : "text-white/40"}>→</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  <div className="mt-4 flex flex-col gap-2 border-t border-white/8 pt-4">
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center bg-white px-6 py-3 text-[13px] font-semibold text-black transition-colors active:bg-white/90"
                    >
                      Agenda una llamada
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <div className="relative z-10">{children}</div>

        <SiteFooter />
      </div>
    </div>
  );
}
