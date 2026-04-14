"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";

const nav = [
  { href: "#work", label: "Casos" },
  { href: "#services", label: "Servicios" },
  { href: "#about", label: "Nosotros" },
  { href: "#contact", label: "Contacto" },
];

const works = [
  {
    name: "Plataforma Torre de Control",
    summary: "Suite de inteligencia operativa para despacho, visibilidad de servicio y orquestación multi-cliente.",
    tags: ["Producto", "Sistemas"],
    industry: ["Logística", "B2B"],
    client: "LAVI Operations",
  },
  {
    name: "Sistema de Flujo de Planta",
    summary: "Capa digital de operaciones para reducir tiempos muertos y mejorar la trazabilidad en líneas de alto volumen.",
    tags: ["Automatización", "Interfaz"],
    industry: ["Industria alimentaria", "Manufactura"],
    client: "LAVI Foods",
  },
  {
    name: "Sitio de Crecimiento Comercial",
    summary: "Arquitectura web enfocada en conversión para expansión regional con mejoras medibles en la calidad de leads.",
    tags: ["Web", "Conversión"],
    industry: ["Consultoría", "B2B"],
    client: "LAVI & CO",
  },
];

const services = [
  {
    id: "01",
    title: "Diseño de sistemas digitales",
    approach: "Diseñamos productos alrededor de la claridad de decisión y del ritmo operativo, para que cada interfaz empuje la acción.",
  },
  {
    id: "02",
    title: "Web de alto rendimiento",
    approach: "Construimos experiencias web robustas, rápidas, mantenibles y listas para escalar con equipos internos.",
  },
  {
    id: "03",
    title: "Entrega end-to-end",
    approach: "Desde la definición hasta el lanzamiento, alineamos estrategia, producto e ingeniería en un solo sistema continuo.",
  },
];

const team = [
  "Estrategia",
  "Diseño de producto",
  "Automatización de procesos",
  "Ingeniería frontend",
];

const quotes = [
  {
    id: "001",
    author: "Director de Operaciones, Buenos Aires",
    text: "Convirtieron una operación caótica en un sistema claro. Los resultados aparecieron en semanas, no en trimestres.",
  },
  {
    id: "002",
    author: "Gerencia General, Montevideo",
    text: "Nunca fue solo tecnología. Cada decisión de producto mostró criterio de negocio real.",
  },
  {
    id: "003",
    author: "Líder de Planta, Córdoba",
    text: "Ganamos trazabilidad real y reducimos retrabajo con una solución que todos podían usar de verdad.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-screen overflow-x-hidden bg-[var(--lavi-ink)] text-[var(--lavi-paper)]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-55"
        style={{
          background:
            "radial-gradient(circle at 14% 18%, rgba(40,97,129,0.14), transparent 34%), linear-gradient(180deg, rgba(243,244,246,0.02), rgba(11,14,20,0.28))",
        }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease }}
        className="sticky top-0 z-50 border-b border-[rgba(0,0,0,0.7)] bg-[color:rgba(50,57,82,0.84)] backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/media/logos/lavi-logo-light.png"
              alt="LAVI & CO"
              width={250}
              height={100}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-white/85 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/comenzar"
            className="rounded-full border border-[var(--primary)] bg-[var(--primary)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-colors hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
          >
            Iniciar proyecto
          </Link>
        </div>
      </motion.header>

      <section className="mx-auto flex min-h-[88vh] w-full max-w-[1320px] flex-col justify-end px-5 pb-14 pt-16 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-5 text-xs uppercase tracking-[0.22em] text-white/72"
        >
          Estudio de diseño y desarrollo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.08, ease }}
          className="max-w-5xl text-balance font-serif text-[2.5rem] leading-[0.92] tracking-[-0.02em] md:text-[4.7rem] lg:text-[6rem]"
        >
          Diseñamos sistemas digitales que vuelven la operación más clara, ágil y controlable.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="mt-10 grid gap-8 border-t border-white/15 pt-8 text-sm leading-relaxed text-white/90 md:grid-cols-[1fr_2fr_1fr]"
        >
          <p className="uppercase tracking-[0.16em] text-white/72">Filosofía</p>
          <p>
            Partimos de la realidad del negocio, reducimos la complejidad y entregamos sistemas que sostienen el crecimiento en el tiempo.
          </p>
          <p className="uppercase tracking-[0.16em] text-white/72 md:text-right">Arequipa, Perú</p>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-16 md:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/35 bg-[color:rgba(50,57,82,0.74)] shadow-[0_24px_90px_rgba(0,0,0,0.35)]"
          >
            <div className="relative aspect-[16/10] min-h-[320px]">
              <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="Reel en movimiento destacado de LAVI & CO">
                <source src="/media/150-135737445_medium.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,97,129,0.1),rgba(11,14,20,0.62))]" />
              <div className="absolute left-5 top-5 rounded-full border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.9)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                Reel destacado
              </div>
              <div className="absolute bottom-5 left-5 max-w-lg">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--lavi-fog)]">Narrativa guiada por media</p>
                <p className="mt-3 max-w-md text-pretty font-serif text-3xl leading-[1.02] md:text-4xl">
                  El sitio ahora respira movimiento, atmósfera y un ritmo visual más contundente.
                </p>
              </div>
            </div>
          </motion.article>

          <div className="grid gap-5">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.05, ease }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.74)]"
            >
              <div className="relative aspect-[4/3] min-h-[200px]">
                <Image
                  src="/media/tecnic-bioprocess-solutions-SQkt_CJ-ARs-unsplash.jpg"
                  alt="Industrial visual used to support the studio narrative"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(50,57,82,0.08),rgba(11,14,20,0.44))]" />
              </div>
              <div className="border-t border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--lavi-fog)]">Textura operativa</p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">Las referencias visuales ahora están conectadas con el tipo de trabajo que realmente entrega el estudio.</p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.74)]"
            >
              <div className="relative aspect-[4/3] min-h-[200px]">
                <Image
                  src="/media/jhonny-torrengo-hlauPhNYYLY-unsplash.jpg"
                  alt="Visual editorial usado para apoyar la narrativa comercial"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(50,57,82,0.08),rgba(11,14,20,0.44))]" />
              </div>
              <div className="border-t border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--lavi-fog)]">Marco comercial</p>
                <p className="mt-2 text-sm leading-relaxed text-white/90">Las nuevas páginas de casos y servicios extienden este lenguaje visual con métricas reales.</p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-16 md:px-10" id="work">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="grid gap-8 border-y border-white/12 py-10 md:grid-cols-[150px_1fr]"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/60 md:pt-2">Casos seleccionados</p>
          <div className="space-y-10">
            {works.map((work, index) => (
              <motion.article
                key={work.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: index * 0.07, ease }}
                className="group border-b border-white/10 pb-10 last:border-b-0 last:pb-0"
              >
                <h2 className="mb-4 max-w-4xl text-balance font-serif text-3xl leading-tight md:text-5xl">
                  {work.name}
                </h2>
                <p className="mb-5 max-w-2xl text-pretty text-white/90">{work.summary}</p>
                <div className="grid gap-4 text-xs uppercase tracking-[0.15em] text-white/72 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-white/62">Focus</p>
                    <p>{work.tags.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-white/62">Industry</p>
                    <p>{work.industry.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-white/62">Client</p>
                    <p>{work.client}</p>
                  </div>
                </div>
                <Link
                  href={`/work?case=${toSlug(work.name)}`}
                  className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-[var(--lavi-fog)] transition-all hover:text-[var(--lavi-paper)] group-hover:translate-x-2"
                >
                  <span>Ver caso</span>
                  <span aria-hidden>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 py-12 md:px-10" id="services">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease }}
          className="mb-4 text-xs uppercase tracking-[0.2em] text-white/72"
        >
          Servicios centrales
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease }}
          className="mb-10 max-w-4xl text-balance font-serif text-4xl leading-[1.02] md:text-6xl"
        >
          Donde estrategia y ejecución se convierten en sistemas digitales medibles.
        </motion.h3>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.66, delay: idx * 0.07, ease }}
              className={`flex h-full flex-col rounded-2xl border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.74)] p-6 backdrop-blur-sm ${
                idx === 0 ? "md:col-span-2 md:grid md:grid-cols-[1.2fr_0.8fr] md:items-end" : ""
              }`}
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <h4 className="font-serif text-2xl leading-tight">{service.title}</h4>
                <span className="text-xs text-[var(--lavi-accent)]">{service.id}</span>
              </div>
              <p className="max-w-[34ch] text-sm leading-relaxed text-white/90 md:mb-0">{service.approach}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/12 pt-7">
          <Link
            href="/comenzar"
            className="rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.32)] transition-transform hover:scale-[1.03]"
          >
            Iniciar proyecto
          </Link>
          <p className="text-sm text-white/82">Respuesta inicial en 1 día hábil con próximos pasos claros.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 py-14 md:px-10" id="about">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease }}
          className="grid gap-8 border-y border-white/12 py-10 md:grid-cols-[1.3fr_2fr]"
        >
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/72">El equipo</p>
            <h3 className="font-serif text-4xl leading-tight md:text-5xl">Visible, compact, precise.</h3>
          </div>

          <div>
            <p className="mb-7 max-w-2xl text-sm leading-relaxed text-white/90">
              Un equipo enfocado, con alta señal y poco ruido. Cada rol existe para transformar complejidad operativa en claridad ejecutable.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {team.map((item) => (
                <div key={item} className="rounded-xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.72)] px-4 py-3 text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 py-10 md:px-10">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className="mb-7 font-serif text-4xl leading-tight md:text-5xl"
        >
          Lo que dicen los clientes
        </motion.h3>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((quote, idx) => (
            <motion.article
              key={quote.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.62, delay: idx * 0.06, ease }}
              className="rounded-2xl border border-[var(--primary)]/25 bg-[color:rgba(50,57,82,0.72)] p-5"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/72">{quote.id}</p>
              <p className="mb-5 text-sm leading-relaxed text-white/90">{quote.text}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--lavi-fog)]">{quote.author}</p>
              <Link href="/work" className="mt-4 inline-flex text-[11px] uppercase tracking-[0.15em] text-[var(--lavi-fog)] transition-colors hover:text-[var(--lavi-paper)]">
                Ver caso relacionado
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1320px] px-5 pb-16 pt-10 md:px-10" id="contact">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.72, ease }}
          className="rounded-3xl border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.72)] p-7 md:p-10"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/72">Siguiente paso</p>
          <h4 className="mb-4 max-w-3xl text-balance font-serif text-4xl leading-[1.02] md:text-6xl">
            Diseñemos tu próximo sistema operativo.
          </h4>
          <p className="mb-4 max-w-2xl text-sm text-white/90">
            info@laviandco.com · Buenos Aires · Available for projects across LATAM.
          </p>
          <p className="mb-7 max-w-2xl text-sm text-white/82">
            Iniciamos con una conversación breve para entender contexto, urgencia y objetivos medibles.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/comenzar"
              className="rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.32)] transition-transform hover:scale-[1.03]"
            >
              Iniciar proyecto
            </Link>
            <Link
              href="/evaluacion"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[rgba(40,97,129,0.15)]"
            >
              Solicitar evaluación operativa
            </Link>
          </div>
        </motion.div>
      </footer>
      </main>
    </MotionConfig>
  );
}

