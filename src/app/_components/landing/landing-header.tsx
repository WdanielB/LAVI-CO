"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navItems as nav } from "@/lib/site";
import { ease, easeExpo } from "./motion";

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setIsScrolled(y > 24));

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-colors duration-500 ${
          isScrolled && !isMobileMenuOpen ? "border-b border-white/10 bg-[rgba(8,11,16,0.86)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-6 md:px-12 md:py-5 lg:px-20">
          <Link href="/" aria-label="LAVI & CO — Inicio" className="inline-flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/media/logos/lavi-logo-outline-light.png"
              alt="LAVI & CO"
              width={300}
              height={120}
              priority
              className="h-9 w-auto sm:h-10 md:h-[46px]"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.02em] text-white/70 lg:flex xl:gap-10">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative inline-flex items-center pb-1 text-white/70 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-white"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-x-100" />
              </Link>
            ))}
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
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(15,19,27,0.55)] text-white backdrop-blur-xl transition-colors hover:border-white/30 lg:hidden"
            >
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-[3px] h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    isMobileMenuOpen ? "translate-y-[3px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[9px] h-[1.5px] w-full bg-white transition-transform duration-300 ${
                    isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--lavi-ink)] px-5 pb-8 pt-24 sm:px-6 md:px-12 lg:hidden"
          >
            <nav aria-label="Principal móvil" className="flex flex-1 flex-col justify-center">
              {nav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4"
                >
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">0{index + 1}</span>
                  <span className="block overflow-hidden pb-[0.1em]">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.15 + index * 0.06, ease: easeExpo }}
                      className="block font-serif text-[clamp(2.25rem,11vw,4rem)] leading-none tracking-[-0.03em] text-white"
                    >
                      {item.label}
                    </motion.span>
                  </span>
                </Link>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="mt-8 flex flex-col gap-4"
            >
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center bg-white px-6 py-4 text-[13px] font-semibold text-black active:bg-white/90"
              >
                Agenda una llamada
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">contacto@lavi.lat · Arequipa, Perú</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Thumb-reach call to action for touch layouts; shows between the hero and the closing section. */
export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > window.innerHeight * 1.2 && scrollYProgress.get() < 0.82);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 lg:hidden"
        >
          <Link
            href="/contact"
            className="flex items-center justify-between rounded-full border border-white/15 bg-[rgba(11,14,20,0.82)] py-2 pl-6 pr-2 text-[13px] font-semibold text-white backdrop-blur-xl"
          >
            <span>Agenda una llamada</span>
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
