"use client";

import { useEffect, useState, type MouseEvent } from "react";
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
import { SiteFooter } from "./_components/site-footer";

const nav = [
  { href: "/work", label: "Casos" },
  { href: "/portafolio", label: "Impacto" },
  { href: "/services", label: "Servicios" },
  { href: "/logistica", label: "Logística" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

const works = [
  {
    name: "Plataforma Torre de Control",
    summary: "Despacho y visibilidad en una sola interfaz.",
    metric: "-22% tiempos de coordinación",
    caseId: "case-ops",
  },
  {
    name: "Workflows con n8n",
    summary: "Automatización de back-office con triggers, APIs e integraciones.",
    metric: "120h ahorradas al mes",
    caseId: "case-n8n",
  },
  {
    name: "ERP/CRM a medida",
    summary: "Módulos pegados al proceso real, no al manual genérico.",
    metric: "-43% tiempo por orden",
    caseId: "case-erp",
  },
  {
    name: "Sistema de Flujo de Planta",
    summary: "Trazabilidad operativa de punta a punta.",
    metric: "-18% retrabajo en línea",
    caseId: "case-automation",
  },
  {
    name: "I+D Desarrollo de Productos",
    summary: "Ciclo de producto desde brief hasta prototipo validado con trazabilidad de fases.",
    metric: "-52% tiempo de ciclo I+D",
    caseId: "case-id",
  },
];

const services = [
  {
    title: "Automatizaciones",
    approach: "Workflows n8n autohospedados que reemplazan trabajo manual medible.",
  },
  {
    title: "Herramientas digitales a medida",
    approach: "ERP, CRM y portales internos pegados al proceso real, no al manual genérico.",
  },
  {
    title: "Desarrollo de producto",
    approach: "De la idea al MVP con alcance enfocado y métricas desde el primer release.",
  },
  {
    title: "I+D",
    approach: "Investigación aplicada y prototipado validado para nuevos frentes de negocio.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const sectionDots = [
  { id: "hero", label: "Inicio" },
  { id: "work", label: "Casos" },
  { id: "services", label: "Servicios" },
  { id: "contact", label: "Contacto" },
] as const;

type SectionId = (typeof sectionDots)[number]["id"];

const RAIL_HEIGHT = 220;
const RAIL_TOP_PADDING = 20;

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.4,
    restDelta: 0.001,
  });
  const railFillScale = useTransform(smoothProgress, (value) => Math.max(0.05, value));
  const railFillOpacity = useTransform(smoothProgress, [0, 0.04, 1], [0.45, 1, 1]);

  // Continuous indicator that slides smoothly between section dots.
  const indicatorY = useMotionValue(0);
  const smoothIndicator = useSpring(indicatorY, {
    stiffness: 220,
    damping: 28,
    mass: 0.45,
  });

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

  useEffect(() => {
    const targetIndex = sectionDots.findIndex((s) => s.id === activeSection);
    const slot = sectionDots.length > 1 ? targetIndex / (sectionDots.length - 1) : 0;
    indicatorY.set(slot * RAIL_HEIGHT);
  }, [activeSection, indicatorY]);

  useEffect(() => {
    const sections = sectionDots
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const visibility = new Map<string, number>();
    sections.forEach((section) => visibility.set(section.id, 0));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const [nextActive] = [...visibility.entries()].sort((a, b) => b[1] - a[1]);
        if (nextActive && nextActive[1] > 0.08) {
          setActiveSection(nextActive[0] as SectionId);
        }
      },
      {
        threshold: [0.1, 0.25, 0.45, 0.65, 0.85],
        rootMargin: "-20% 0px -35% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: SectionId) => {
    event.preventDefault();

    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    setActiveSection(sectionId);
    setHoveredSection(null);
    window.history.replaceState(null, "", `#${sectionId}`);

    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({
      top: Math.max(0, offsetTop),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-hidden bg-[var(--lavi-ink)] text-[var(--lavi-paper)] antialiased">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 opacity-45"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(40,97,129,0.22), transparent 38%), radial-gradient(circle at 86% 12%, rgba(118,149,186,0.2), transparent 34%), linear-gradient(180deg, rgba(8,11,16,0.9), rgba(8,11,16,0.98))",
          }}
        />

        <div className="relative z-10">

          <motion.aside
          initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="pointer-events-none fixed right-4 top-1/2 z-[70] hidden -translate-y-1/2 md:block"
          aria-label="Navegacion por secciones"
        >
            <div
              className="pointer-events-auto relative flex flex-col items-center rounded-full border border-white/10 bg-[rgba(15,19,27,0.55)] px-1.5 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
              style={{ paddingTop: RAIL_TOP_PADDING, paddingBottom: RAIL_TOP_PADDING }}
            >
              {/* Rail base */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 w-[1px] -translate-x-1/2 bg-white/12"
                style={{ top: RAIL_TOP_PADDING, height: RAIL_HEIGHT }}
              />
              {/* Rail fill driven by smoothed scroll progress */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 w-[1.5px] -translate-x-1/2 origin-top rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(131,176,217,0.85),rgba(40,97,129,0.95))]"
                style={{
                  top: RAIL_TOP_PADDING,
                  height: RAIL_HEIGHT,
                  scaleY: railFillScale,
                  opacity: railFillOpacity,
                }}
              />
              {/* Glowing puck that follows the active section smoothly */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute left-1/2 z-[5] h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.85),0_0_28px_rgba(131,176,217,0.55)]"
                style={{ top: RAIL_TOP_PADDING - 6, y: smoothIndicator }}
              />

              <div className="relative" style={{ width: 28, height: RAIL_HEIGHT }}>
                {sectionDots.map((section, index) => {
                  const isActive = activeSection === section.id;
                  const isHovered = hoveredSection === section.id;
                  const isHighlighted = isActive || isHovered;
                  const slot = sectionDots.length > 1 ? index / (sectionDots.length - 1) : 0;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      aria-label={`Ir a ${section.label}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(event) => handleSectionJump(event, section.id)}
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="group absolute left-1/2 z-10 flex h-7 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none touch-manipulation"
                      style={{ top: slot * RAIL_HEIGHT }}
                    >
                      <motion.span
                        animate={
                          prefersReducedMotion
                            ? { opacity: isHighlighted ? 1 : 0.55 }
                            : {
                                opacity: isActive ? 0 : isHovered ? 1 : 0.55,
                                scale: isHovered ? 1.25 : 1,
                              }
                        }
                        transition={{ duration: 0.3, ease }}
                        className={`block h-[7px] w-[7px] rounded-full border transition-colors ${
                          isHovered
                            ? "border-white bg-white"
                            : "border-white/55 bg-[rgba(255,255,255,0.08)]"
                        }`}
                      />
                      <AnimatePresence>
                        {isHighlighted ? (
                          <motion.span
                            key={`label-${section.id}-${isActive ? "active" : "hover"}`}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.22, ease }}
                            className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md ${
                              isActive
                                ? "border border-white/15 bg-[rgba(40,97,129,0.6)] text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                                : "border border-white/10 bg-[rgba(11,14,20,0.92)] text-white/90 shadow-lg"
                            }`}
                          >
                            {section.label}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </a>
                  );
                })}
              </div>
            </div>
        </motion.aside>

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
              <Link href="/" className="inline-flex items-center hover:opacity-80 transition-opacity">
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
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
              }}
              className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.02em] text-white/70 lg:flex xl:gap-10"
            >
              {nav.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={{
                    hidden: { opacity: 0, y: -4 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  className="group relative inline-flex items-center pb-1 text-white/70 transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-x-100" />
                </motion.a>
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
                  href="/comenzar"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-black transition-transform hover:scale-105 active:scale-95 md:px-6 md:text-[13px]"
                >
                  Iniciar proyecto
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
                      href="/comenzar"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-black transition-transform active:scale-[0.98]"
                    >
                      Iniciar proyecto
                    </Link>
                    <Link
                      href="/evaluacion"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/5"
                    >
                      Evaluación operativa
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <section id="hero" className="relative flex min-h-[100dvh] w-full flex-col justify-end px-5 pb-16 pt-24 sm:px-6 sm:pt-28 md:px-12 md:pb-24 md:pt-32 lg:px-20">
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/abstract-logistic-placeholder.jpg"
              className="h-full w-full object-cover opacity-80"
            >
              <source src="/media/34317-400974371_medium.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] md:bg-black/30"></div>
          </div>
          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-end">
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
              initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[18ch] text-balance font-serif text-[clamp(2.25rem,9vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-white"
            >
              Menos fricción. Más control operativo.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[46ch] text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base md:text-lg"
            >
              Diseñamos y desarrollamos sistemas digitales para operaciones logísticas y de planta, con métricas observables desde el primer release.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-stretch gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pt-8 md:mt-12"
            >
              <Link
                href="/comenzar"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3.5 text-[13px] font-semibold text-black transition-transform hover:scale-[1.02] active:scale-95 sm:px-8 sm:py-4"
              >
                <span>Diseñar sistema</span>
                <span aria-hidden className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 active:scale-95 sm:px-8 sm:py-4"
              >
                Evaluación gratuita
              </Link>
              <p className="text-[12px] font-medium tracking-wide text-white/55 sm:text-[13px]">Respuesta en 1 día hábil.</p>
            </motion.div>
          </div>
          {/* Difuminador inferor para scroll continuo */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] h-32 bg-gradient-to-t from-[var(--lavi-ink)] to-transparent sm:h-48"></div>
        </section>

      {/* Contenedor de las secciones inferiores con fondo animado */}
      <div className="relative w-full z-10 bg-[var(--lavi-ink)] overflow-hidden">
        {/* Fondo atmosférico estático para el flujo inferior */}
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[rgba(40,97,129,0.7)] blur-[120px]" />
            <div className="absolute top-[40%] -right-[15%] w-[60vw] h-[50vw] max-w-[700px] max-h-[600px] rounded-full bg-[rgba(118,149,186,0.5)] blur-[140px]" />
        </div>

        {/* El contenido necesita z-10 para estar por encima del fondo animado */}
        <div className="relative z-10 pt-24 sm:pt-36">
          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:py-32 md:py-40" id="work">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
              className="mb-12 flex flex-col gap-4 sm:mb-16"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavi-accent)] shadow-[0_0_8px_var(--lavi-accent)]" />
                Casos de Éxito
              </div>
              <h2 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                Intervenciones reales con impacto medible en el core de la operación.
              </h2>
            </motion.div>

            {/* Asymmetric Bento Grid for Casos */}
            <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
              {works.map((work, i) => {
                const isLarge = i === 0;
                return (
                  <motion.article
                    key={work.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease }}
                    className={`group bg-white/[0.015] border border-white/5 rounded-[2rem] p-1.5 transition-all duration-500 hover:scale-[1.01] hover:border-white/12 hover:bg-white/[0.03] hover:shadow-[0_22px_60px_rgba(0,0,0,0.32)] ${
                      isLarge ? "lg:col-span-2" : "lg:col-span-1"
                    }`}
                  >
                    <div className="rounded-[calc(2rem-0.375rem)] border border-[var(--primary)]/22 bg-[linear-gradient(165deg,rgba(50,57,82,0.72),rgba(11,14,20,0.55))] p-6 lg:p-8 flex flex-col justify-between h-full min-h-[260px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                      <div>
                        <div className="mb-4 flex items-baseline justify-between gap-3">
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">Operaciones / KPI</p>
                          <p className="font-mono text-xl font-medium tracking-[0.12em] text-white/50">0{i + 1}</p>
                        </div>
                        <h3 className="mb-3 text-balance font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                          {work.name}
                        </h3>
                        <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/80">{work.summary}</p>
                      </div>

                      <div className="border-t border-white/10 pt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p
                            className="font-mono text-3xl font-semibold leading-none text-white tracking-tight"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                          >
                            {work.metric.split(" ")[0]}
                          </p>
                          <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-white/50">{work.metric.split(" ").slice(1).join(" ")}</p>
                        </div>
                        
                        <Link
                          href={`/work#${work.caseId}`}
                          className="group/link inline-flex items-center justify-between gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition-all hover:bg-[var(--primary)]/15 hover:border-[var(--primary)]/60 hover:text-white"
                        >
                          <span>Ver caso completo</span>
                          <span aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:py-32 md:py-40" id="services">
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.8, ease }}
               className="mb-12 flex flex-col gap-4 sm:mb-16"
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 select-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavi-accent)] shadow-[0_0_8px_var(--lavi-accent)]" />
                Nuestros Servicios
              </div>
              <h2 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                Cuatro capacidades integradas bajo un solo objetivo: operar mejor.
              </h2>
            </motion.div>

            {/* Premium 2x2 Services Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {services.map((service, i) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease }}
                  className="group bg-white/[0.015] border border-white/5 rounded-[2rem] p-1.5 transition-all duration-500 hover:scale-[1.01] hover:border-white/12 hover:bg-white/[0.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                >
                  <div className="rounded-[calc(2rem-0.375rem)] border border-[var(--primary)]/22 bg-[linear-gradient(165deg,rgba(50,57,82,0.72),rgba(11,14,20,0.55))] p-6 lg:p-8 flex flex-col justify-between h-full min-h-[220px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div>
                      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--lavi-accent)] ring-1 ring-inset ring-[var(--primary)]/30 transition-transform duration-500 group-hover:scale-105 font-mono text-sm font-bold shadow-md select-none">
                        0{i + 1}
                      </div>
                      <h4 className="mb-2 font-serif text-2xl font-semibold leading-tight text-white">{service.title}</h4>
                      <p className="text-sm leading-relaxed text-white/80">{service.approach}</p>
                    </div>
                    <div className="mt-6 border-t border-white/8 pt-4 flex justify-between items-center">
                      <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/50 group-hover:text-white/80 transition-colors">
                        Explorar enfoque
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 transition-all duration-300 group-hover:bg-[var(--primary)]/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 select-none">
                        ↗
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-12 flex flex-col items-stretch gap-4 border-t border-white/12 pt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              {/* Button-in-Button CTA */}
              <Link
                href="/comenzar"
                className="group inline-flex items-center justify-between gap-4 rounded-full bg-white pl-6 pr-2 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-black shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 active:scale-[0.98] outline-none"
              >
                <span>Iniciar proyecto</span>
                <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 select-none font-bold">
                  ↗
                </span>
              </Link>
              <Link
                href="/evaluacion"
                className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:bg-white/[0.06] hover:border-white/30 active:scale-[0.98] outline-none"
              >
                Evaluación gratuita
              </Link>
              <p className="text-center text-sm text-white/65 sm:text-left select-none">Respuesta inicial con próximos pasos concretos.</p>
            </motion.div>
          </section>

          {/* Double-Bezel CTA Contact Section */}
          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:py-32 md:py-40" id="contact">
            <div className="bg-white/[0.015] border border-white/6 p-1.5 rounded-[2.5rem] shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
              <div className="rounded-[calc(2.5rem-0.375rem)] border border-[var(--primary)]/30 bg-[linear-gradient(140deg,rgba(40,97,129,0.22),rgba(118,149,186,0.10),rgba(255,255,255,0.03))] p-8 sm:p-10 md:p-12 backdrop-blur-xl">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-xs">Siguiente paso</p>
                    <h4 className="mb-4 max-w-2xl text-balance font-serif text-3xl leading-[1.02] sm:text-4xl md:text-5xl">
                      Hacemos tu operación más simple.
                    </h4>
                    <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                      Una conversación breve es suficiente para mapear el primer movimiento. Sin formularios largos ni decks gigantes.
                    </p>
                    <p className="mt-4 text-sm text-white/60 font-mono">hello@laviandco.com · LATAM</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {/* Button-in-Button CTA */}
                    <Link
                      href="/comenzar"
                      className="group inline-flex items-center justify-between gap-4 rounded-full bg-white pl-6 pr-2 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-black shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 active:scale-[0.98] outline-none"
                    >
                      <span>Iniciar proyecto</span>
                      <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 select-none font-bold">
                        ↗
                      </span>
                    </Link>
                    <Link
                      href="/evaluacion"
                      className="group inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:bg-white/[0.06] hover:border-white/30 active:scale-[0.98] outline-none"
                    >
                      Solicitar evaluación
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <SiteFooter />
      </div>
    </main>
    </MotionConfig>
  );
}

