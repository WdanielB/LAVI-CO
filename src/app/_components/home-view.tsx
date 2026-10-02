"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { navItems as nav } from "@/lib/site";
import { SiteFooter } from "./site-footer";

const works = [
  {
    name: "Control de asistencia — Maservit",
    summary: "Web app con integración de cámaras Hikvision, desplegada en el servidor de la empresa.",
    caseId: "case-maservit",
    icon: "clock",
    image: { src: "/media/Proyectos/maservit.png", alt: "Web app de control de asistencia de Maservit" },
  },
  {
    name: "Floralite — Vitora",
    summary: "E-commerce para una florería con pasarela de pago Yape.",
    caseId: "case-vitora",
    icon: "leaf",
    image: { src: "/media/Proyectos/vitora.png", alt: "Tienda online Floralite de la florería Vitora" },
  },
  {
    name: "Seguimiento de fabricación",
    summary: "Reemplazo de Excel por una app con estado de producción en tiempo real.",
    caseId: "case-barandas",
    icon: "pulse",
    image: { src: "/media/Proyectos/barandas-1.png", alt: "Panel de seguimiento de fabricación en tiempo real" },
  },
  {
    name: "MVP — Mentalabs",
    summary: "Producto inicial tipo ERP para una startup de psicología.",
    caseId: "case-mentalabs",
    icon: "layers",
    image: { src: "/media/Proyectos/mentalabs-1.png", alt: "MVP de producto de la startup Mentalabs" },
  },
] as const;

const services = [
  {
    title: "Automatizaciones",
    approach: "Workflows n8n autohospedados que reemplazan trabajo manual medible.",
    icon: "cycle",
  },
  {
    title: "Herramientas digitales a medida",
    approach: "ERP, CRM y portales internos pegados al proceso real, no al manual genérico.",
    icon: "grid",
  },
  {
    title: "Desarrollo de producto",
    approach: "De la idea al MVP con alcance enfocado y métricas desde el primer release.",
    icon: "rocket",
  },
  {
    title: "I+D",
    approach: "Investigación aplicada y prototipado validado para nuevos frentes de negocio.",
    icon: "flask",
  },
] as const;

const stack = ["Next.js", "PostgreSQL", "n8n", "Docker", "Hikvision", "Supabase", "React", "Python", "Shopify"];

const ease = [0.22, 1, 0.36, 1] as const;
const easeExpo = [0.16, 1, 0.3, 1] as const;

type IconName = "clock" | "leaf" | "pulse" | "layers" | "cycle" | "grid" | "rocket" | "flask";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
  switch (name) {
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v4.8l3.2 1.9" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M6 18C6 9 12 5 19 5c0 8-4 13-13 13Z" />
          <path d="M6 18c2-4 5-7 9-9" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M3 12h4l2 6 4-12 2 6h6" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 4 4 8.5 12 13l8-4.5Z" />
          <path d="M4 13.5 12 18l8-4.5" />
          <path d="M4 17.5 12 22l8-4.5" />
        </svg>
      );
    case "cycle":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8" />
          <path d="M17 3v4h-4M7 21v-4h4" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M12 2c3 2 5 6 5 10.5-1 1-2.5 1.8-5 1.8s-4-.8-5-1.8C7 8 9 4 12 2Z" />
          <path d="M9 14.5 6 18l1-4.5M15 14.5l3 3.5-1-4.5" />
          <circle cx="12" cy="10" r="1.6" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M9.5 3h5M10 3v6.5L5.5 18a1.8 1.8 0 0 0 1.6 2.6h9.8A1.8 1.8 0 0 0 18.5 18L14 9.5V3" />
          <path d="M8 15h8" />
        </svg>
      );
  }
}

/** Wraps children in a subtle cursor-driven 3D tilt. No-ops under prefers-reduced-motion. */
function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 200, damping: 22, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 22, mass: 0.6 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 7);
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -7);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const heroWords = "Menos fricción. Más control operativo.".split(" ");

export function HomeView() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroVideoScale = useTransform(heroProgress, [0, 1], [1, 1.18]);
  const heroVideoY = useTransform(heroProgress, [0, 1], [0, 90]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, 60]);

  function handleHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  useEffect(() => {
    if (prefersReducedMotion) videoRef.current?.pause();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-[var(--lavi-ink)] text-[var(--lavi-paper)] antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-45"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(40,97,129,0.22), transparent 38%), radial-gradient(circle at 86% 12%, rgba(118,149,186,0.2), transparent 34%), linear-gradient(180deg, rgba(8,11,16,0.9), rgba(8,11,16,0.98))",
          }}
        />

        <div className="relative z-10">

        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-500 ${
            isScrolled || isMobileMenuOpen
              ? "border-b border-white/10 bg-[rgba(8,11,16,0.78)] backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 sm:px-6 md:px-12 md:py-5 lg:px-20">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/" aria-label="LAVI & CO — Inicio" className="inline-flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/media/logos/lavi-logo-outline-light.png"
                  alt="LAVI & CO"
                  width={300}
                  height={120}
                  priority
                  className="h-9 w-auto sm:h-10 md:h-[46px]"
                />
              </Link>
            </motion.div>

            <motion.nav
              aria-label="Principal"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
              }}
              className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.02em] text-white/70 lg:flex xl:gap-10"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: -4 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                  }}
                >
                  <Link
                    href={item.href}
                    className="group relative inline-flex items-center pb-1 text-white/70 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-white"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="hidden sm:block"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-colors hover:bg-white/90 md:px-6 md:text-[13px]"
                >
                  Agenda una llamada
                </Link>
              </motion.div>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
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
                key="mobile-menu"
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-white/8 bg-[rgba(8,11,16,0.95)] backdrop-blur-xl lg:hidden"
              >
                <nav className="mx-auto flex max-w-[1440px] flex-col gap-1 px-5 py-6 sm:px-6 md:px-12 lg:px-20">
                  {nav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        <span>{item.label}</span>
                        <span aria-hidden className="text-white/40">→</span>
                      </Link>
                    </motion.div>
                  ))}
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

        <main id="contenido" tabIndex={-1} className="outline-none">
        <section
          id="hero"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden px-5 pb-16 pt-24 sm:px-6 sm:pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-20"
        >
          <motion.div
            aria-hidden
            style={{ scale: heroVideoScale, y: heroVideoY }}
            className="absolute inset-0 z-[-1] overflow-hidden"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/hero-poster.jpg"
              className="h-full w-full object-cover opacity-80"
            >
              <source src="/media/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/media/hero-1080.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] md:bg-black/30"></div>
          </motion.div>

          {!prefersReducedMotion && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute z-[1] hidden h-[440px] w-[440px] rounded-full bg-[var(--lavi-accent)]/25 blur-[110px] md:block"
              style={{ x: spotX, y: spotY, translateX: "-50%", translateY: "-50%" }}
            />
          )}

          <motion.div
            style={{ opacity: heroContentOpacity, y: heroContentY }}
            className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs sm:mb-6">
                Diseño y desarrollo operativo
              </p>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } } }}
              className="max-w-[18ch] font-serif text-[clamp(2.25rem,9vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-white"
            >
              {heroWords.map((word, i) => (
                <span key={i} className="mr-[0.24em] inline-block overflow-hidden pb-[0.15em] align-top">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: "115%", opacity: 0 },
                      visible: { y: "0%", opacity: 1, transition: { duration: 1, ease: easeExpo } },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[46ch] text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
            >
              Diseñamos y desarrollamos los sistemas que tu operación necesita: automatización, herramientas a medida y visibilidad real, con métricas desde el primer release.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-stretch gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pt-8 md:mt-12"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white py-2 pl-7 pr-2 text-[13px] font-semibold text-black transition-colors hover:bg-white/90 sm:py-2.5 sm:pl-8"
              >
                <span>Agenda una llamada</span>
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white sm:h-10 sm:w-10"
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center border border-white/25 bg-white/5 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:px-8 sm:py-4"
              >
                Ver casos
              </Link>
              <p className="text-[12px] font-medium tracking-wide text-white/55 sm:text-[13px]">Respuesta en 1 día hábil.</p>
            </motion.div>
          </motion.div>

          {!prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 1 }}
              style={{ opacity: heroContentOpacity }}
              className="pointer-events-none absolute bottom-10 right-5 z-10 hidden flex-col items-center gap-3 sm:right-6 sm:flex md:right-12 lg:right-20"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">Scroll</span>
              <span className="relative h-12 w-px overflow-hidden bg-white/15">
                <motion.span
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 top-0 h-1/2 bg-[var(--lavi-accent)]"
                />
              </span>
            </motion.div>
          )}

          {/* Difuminador inferor para scroll continuo */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-[var(--lavi-ink)] to-transparent sm:h-48"></div>
        </section>

      {/* Contenedor de las secciones inferiores con fondo animado */}
      <div className="relative w-full z-10 bg-[var(--lavi-ink)] overflow-hidden">
        {/* Fondo atmosférico estático para el flujo inferior */}
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[rgba(40,97,129,0.7)] blur-[64px]" />
            <div className="absolute top-[40%] -right-[15%] w-[60vw] h-[50vw] max-w-[700px] max-h-[600px] rounded-full bg-[rgba(118,149,186,0.5)] blur-[64px]" />
        </div>

        <div aria-label="Tecnologías con las que trabajamos" className="relative z-10 overflow-hidden border-y border-white/10 bg-white/[0.02] py-4">
          <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {[...stack, ...stack].map((item, i) => (
              <span key={i} aria-hidden={i >= stack.length || undefined} className="flex items-center gap-12">
                {item}
                <span aria-hidden className="text-[var(--lavi-accent)]">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* El contenido necesita z-10 para estar por encima del fondo animado */}
        <div className="relative z-10 pt-24 sm:pt-36">
          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-6 sm:py-32 md:px-12 md:py-40 lg:px-20" id="work">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="mb-12 flex flex-col gap-4 sm:mb-16"
            >
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <span aria-hidden className="h-px w-8 bg-[var(--lavi-accent)]" />
                Qué construimos
              </p>
              <h2 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                Lo que construimos para operaciones reales.
              </h2>
            </motion.div>

            {/* Asymmetric Bento Grid for Casos */}
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
              {works.map((work, i) => {
                const isLarge = i === 0;
                return (
                  <motion.div
                    key={work.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease }}
                    className={isLarge ? "lg:col-span-2" : "lg:col-span-1"}
                  >
                    <TiltCard
                      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[var(--lavi-accent)]/60 hover:bg-white/[0.045] hover:shadow-[0_30px_70px_-25px_rgba(40,97,129,0.45)] ${
                        isLarge ? "lg:flex-row" : ""
                      }`}
                    >
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 z-10 h-[2px] w-0 bg-[var(--lavi-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                      />
                      <div
                        className={`relative overflow-hidden border-white/10 ${
                          isLarge ? "aspect-[16/10] border-b lg:order-2 lg:aspect-auto lg:w-[55%] lg:border-b-0 lg:border-l" : "aspect-[16/9] border-b"
                        }`}
                      >
                        <Image
                          src={work.image.src}
                          alt={work.image.alt}
                          fill
                          sizes={isLarge ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
                          className="object-cover object-top opacity-85 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:opacity-100"
                        />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(8,11,16,0.55)] to-transparent" />
                      </div>

                      <div className={`flex flex-1 flex-col justify-between p-7 sm:p-8 ${isLarge ? "lg:min-h-[340px] lg:p-10" : ""}`}>
                        <div>
                          <div className="mb-6 flex items-start justify-between gap-4">
                            <p className="font-mono text-xl font-medium tracking-[0.12em] text-white/40 transition-colors duration-500 group-hover:text-[var(--lavi-accent)]">
                              0{i + 1}
                            </p>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-6 group-hover:border-[var(--lavi-accent)]/50 group-hover:text-[var(--lavi-accent)]">
                              <Icon name={work.icon} className="h-4 w-4" />
                            </span>
                          </div>
                          <h3 className="mb-3 text-balance font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                            {work.name}
                          </h3>
                          <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/80">{work.summary}</p>
                        </div>

                        <Link
                          href={`/work#${work.caseId}`}
                          aria-label={`Ver caso completo: ${work.name}`}
                          className="group/link inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/70 transition-colors after:absolute after:inset-0 after:z-20 after:content-[''] hover:text-white"
                        >
                          <span>Ver caso completo</span>
                          <span
                            aria-hidden
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-[var(--lavi-accent)] group-hover:text-white"
                          >
                            →
                          </span>
                        </Link>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-6 sm:py-32 md:px-12 md:py-40 lg:px-20" id="services">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, ease }}
               className="mb-12 flex flex-col gap-4 sm:mb-16"
            >
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <span aria-hidden className="h-px w-8 bg-[var(--lavi-accent)]" />
                Nuestros Servicios
              </p>
              <h2 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                Cuatro capacidades integradas bajo un solo objetivo: operar mejor.
              </h2>
            </motion.div>

            {/* Premium 2x2 Services Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease }}
                >
                  <TiltCard className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-[background-color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-[var(--lavi-accent)]/60 hover:bg-white/[0.045] hover:shadow-[0_30px_70px_-25px_rgba(40,97,129,0.45)] sm:p-8">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-[2px] w-0 bg-[var(--lavi-accent)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                    />
                    <div className="mb-5 flex items-center justify-between">
                      <p className="font-mono text-sm font-semibold text-white/50 transition-colors duration-500 group-hover:text-[var(--lavi-accent)]">
                        0{i + 1}
                      </p>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-6 group-hover:border-[var(--lavi-accent)]/50 group-hover:text-[var(--lavi-accent)]">
                        <Icon name={service.icon} className="h-4 w-4" />
                      </span>
                    </div>
                    <h3 className="mb-2 font-serif text-2xl font-semibold leading-tight text-white">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-white/80">{service.approach}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-12 border-t border-white/12 pt-8"
            >
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
              >
                <span>Ver todos los servicios</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 select-none">→</span>
              </Link>
            </motion.div>
          </section>

          {/* Double-Bezel CTA Contact Section */}
          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-6 sm:py-32 md:px-12 md:py-40 lg:px-20" id="contact">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="border-y-2 border-[var(--lavi-accent)] py-10 md:py-14"
            >
                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-xs">Siguiente paso</p>
                    <h2 className="mb-4 max-w-2xl text-balance font-serif text-3xl leading-[1.02] sm:text-4xl md:text-5xl">
                      Hacemos tu operación más simple.
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                      Una conversación breve es suficiente para mapear el primer movimiento. Sin formularios largos ni decks gigantes.
                    </p>
                    <p className="mt-4 text-sm text-white/60 font-mono">contacto@lavi.lat · LATAM</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-between gap-3 bg-white py-2 pl-6 pr-2 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/90 outline-none"
                    >
                      <span>Agenda una llamada</span>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/10 normal-case tracking-normal transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white"
                      >
                        →
                      </span>
                    </Link>
                    <a
                      href="mailto:contacto@lavi.lat?subject=Consulta%20LAVI%20%26%20CO"
                      className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/5 outline-none"
                    >
                      Escríbenos por correo
                    </a>
                  </div>
                </div>
            </motion.div>
          </section>
        </div>
      </div>
      </main>
      <SiteFooter />
      </div>
    </div>
    </MotionConfig>
  );
}
