"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { SiteFooter } from "./_components/site-footer";

const nav = [
  { href: "/work", label: "Casos" },
  { href: "/services", label: "Servicios" },
  { href: "/logistica", label: "Logística" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

const works = [
  {
    name: "Plataforma Torre de Control",
    summary: "Despacho y visibilidad en una sola interfaz.",
    focus: "Operaciones en vivo",
    caseId: "case-ops",
  },
  {
    name: "Workflows con n8n",
    summary: "Automatización de back-office con triggers, APIs e integraciones.",
    focus: "Back-office automatizado",
    caseId: "case-n8n",
  },
  {
    name: "ERP/CRM a medida",
    summary: "Módulos pegados al proceso real, no al manual genérico.",
    focus: "Herramientas a medida",
    caseId: "case-erp",
  },
  {
    name: "I+D Desarrollo de Productos",
    summary: "Ciclo de producto desde brief hasta prototipo validado con trazabilidad de fases.",
    focus: "Desarrollo de producto",
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

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      <main className="relative min-h-screen overflow-x-clip bg-[var(--lavi-ink)] text-[var(--lavi-paper)] antialiased">
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
              Diseñamos y desarrollamos los sistemas que tu operación necesita: automatización, herramientas a medida y visibilidad real, con métricas desde el primer release.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-stretch gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:pt-8 md:mt-12"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center bg-white px-7 py-3.5 text-[13px] font-semibold text-black transition-colors hover:bg-white/90 sm:px-8 sm:py-4"
              >
                <span>Agenda una llamada</span>
                <span aria-hidden className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center border border-white/25 bg-white/5 px-7 py-3.5 text-[13px] font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:px-8 sm:py-4"
              >
                Ver casos
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
            <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[rgba(40,97,129,0.7)] blur-[64px]" />
            <div className="absolute top-[40%] -right-[15%] w-[60vw] h-[50vw] max-w-[700px] max-h-[600px] rounded-full bg-[rgba(118,149,186,0.5)] blur-[64px]" />
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
                  <motion.article
                    key={work.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease }}
                    className={`group flex h-full min-h-[220px] flex-col justify-between border-t border-white/25 pt-6 transition-colors duration-300 hover:border-[var(--lavi-accent)] ${
                      isLarge ? "lg:col-span-2" : "lg:col-span-1"
                    }`}
                  >
                      <div>
                        <div className="mb-4 flex items-baseline justify-between gap-3">
                          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">Frente de trabajo</p>
                          <p className="font-mono text-xl font-medium tracking-[0.12em] text-white/50">0{i + 1}</p>
                        </div>
                        <h3 className="mb-3 text-balance font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                          {work.name}
                        </h3>
                        <p className="mb-6 max-w-xl text-sm leading-relaxed text-white/80">{work.summary}</p>
                      </div>

                      <div className="border-t border-white/10 pt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                          {work.focus}
                        </p>

                        <Link
                          href={`/work#${work.caseId}`}
                          className="group/link inline-flex items-center gap-3 border border-white/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-[var(--lavi-accent)] hover:text-white"
                        >
                          <span>Ver caso completo</span>
                          <span aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-0.5">→</span>
                        </Link>
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
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease }}
                  className="group flex h-full min-h-[200px] flex-col justify-between border-t border-white/25 pt-6 transition-colors duration-300 hover:border-[var(--lavi-accent)]"
                >
                    <div>
                      <p className="mb-4 font-mono text-sm font-semibold text-[var(--lavi-accent)] select-none">
                        0{i + 1}
                      </p>
                      <h4 className="mb-2 font-serif text-2xl font-semibold leading-tight text-white">{service.title}</h4>
                      <p className="text-sm leading-relaxed text-white/80">{service.approach}</p>
                    </div>
                    <div className="mt-6 border-t border-white/8 pt-4 flex justify-between items-center">
                      <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/50 group-hover:text-white/80 transition-colors">
                        Explorar enfoque
                      </span>
                      <span aria-hidden className="text-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white select-none">
                        →
                      </span>
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
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/90 outline-none"
              >
                <span>Agenda una llamada</span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 select-none">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/5 outline-none"
              >
                Ver servicios
              </Link>
              <p className="text-center text-sm text-white/65 sm:text-left select-none">Respuesta inicial con próximos pasos concretos.</p>
            </motion.div>
          </section>

          {/* Double-Bezel CTA Contact Section */}
          <section className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:py-32 md:py-40" id="contact">
            <div className="border-y-2 border-[var(--lavi-accent)] py-10 md:py-14">
                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65 sm:text-xs">Siguiente paso</p>
                    <h4 className="mb-4 max-w-2xl text-balance font-serif text-3xl leading-[1.02] sm:text-4xl md:text-5xl">
                      Hacemos tu operación más simple.
                    </h4>
                    <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                      Una conversación breve es suficiente para mapear el primer movimiento. Sin formularios largos ni decks gigantes.
                    </p>
                    <p className="mt-4 text-sm text-white/60 font-mono">contacto@lavi.lat · LATAM</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {/* Button-in-Button CTA */}
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-3 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/90 outline-none"
                    >
                      <span>Agenda una llamada</span>
                      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 select-none">→</span>
                    </Link>
                    <a
                      href="mailto:contacto@lavi.lat?subject=Consulta%20LAVI%20%26%20CO"
                      className="inline-flex items-center justify-center border border-white/25 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/5 outline-none"
                    >
                      Escríbenos por correo
                    </a>
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

