"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const works = [
  {
    name: "Control Tower Platform",
    summary: "Operational intelligence suite for dispatch, service level visibility, and multi-client orchestration.",
    tags: ["Product", "Systems"],
    industry: ["Logistics", "B2B"],
    client: "LAVI Operations",
  },
  {
    name: "Plant Flow System",
    summary: "Digital operations layer to reduce idle time and improve traceability for high-volume production lines.",
    tags: ["Automation", "Interface"],
    industry: ["Food Industry", "Manufacturing"],
    client: "LAVI Foods",
  },
  {
    name: "Commercial Growth Site",
    summary: "Conversion-first website architecture for regional expansion with measurable lead quality improvements.",
    tags: ["Web", "Conversion"],
    industry: ["Consulting", "B2B"],
    client: "LAVI & CO",
  },
];

const services = [
  {
    id: "01",
    title: "Digital Systems Design",
    approach: "We shape products around decision clarity and operational rhythm, so every interface drives action.",
    cta: "Discuss design",
  },
  {
    id: "02",
    title: "High-Performance Web",
    approach: "We build robust web experiences that are fast, maintainable, and ready to scale with internal teams.",
    cta: "Discuss build",
  },
  {
    id: "03",
    title: "End-to-End Delivery",
    approach: "From definition to launch, we align strategy, product, and engineering into one continuous system.",
    cta: "Start project",
  },
];

const team = [
  "Strategy",
  "Product Design",
  "Process Automation",
  "Frontend Engineering",
];

const quotes = [
  {
    id: "001",
    author: "Operations Director, Buenos Aires",
    text: "They turned a chaotic operation into a clear system. Results appeared in weeks, not quarters.",
  },
  {
    id: "002",
    author: "General Management, Montevideo",
    text: "This was never just technology. Every product decision showed strong business judgment.",
  },
  {
    id: "003",
    author: "Plant Lead, Cordoba",
    text: "We gained true traceability and reduced rework with a solution everyone could actually use.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-[#f0f0f0]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 12% 16%, rgba(255,255,255,0.14), transparent 40%), radial-gradient(circle at 82% 76%, rgba(255,255,255,0.08), transparent 46%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.22))",
        }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease }}
        className="sticky top-0 z-50 border-b border-white/10 bg-[color:rgba(10,10,10,0.84)] backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 py-4 md:px-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative h-5 w-5 overflow-hidden rounded-sm bg-white">
              <span className="absolute inset-0 rotate-45 bg-white/35" />
            </span>
            <span className="font-serif text-xl tracking-[0.08em]">LAVI STUDIO</span>
          </Link>

          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.16em] text-white/75 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/comenzar"
            className="rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black"
          >
            Start
          </Link>
        </div>
      </motion.header>

      <section className="mx-auto flex min-h-[88vh] w-full max-w-[1320px] flex-col justify-end px-5 pb-14 pt-16 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-5 text-xs uppercase tracking-[0.22em] text-white/55"
        >
          Design and Development Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.08, ease }}
          className="max-w-5xl font-serif text-[2.5rem] leading-[0.92] tracking-[-0.02em] md:text-[4.7rem] lg:text-[6rem]"
        >
          We design digital systems that make operations feel inevitable.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.28, ease }}
          className="mt-10 grid gap-8 border-t border-white/15 pt-8 text-sm leading-relaxed text-white/82 md:grid-cols-[1fr_2fr_1fr]"
        >
          <p className="uppercase tracking-[0.16em] text-white/55">Philosophy</p>
          <p>
            We begin with business reality, then reduce complexity, and finally ship systems that sustain growth over time.
          </p>
          <p className="uppercase tracking-[0.16em] text-white/55 md:text-right">Buenos Aires, LATAM</p>
        </motion.div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 pb-16 md:px-10" id="work">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease }}
          className="grid gap-8 border-y border-white/12 py-10 md:grid-cols-[150px_1fr]"
        >
          <p className="font-serif text-6xl leading-none text-white/35">Selected</p>
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
                <h2 className="mb-4 font-serif text-3xl leading-tight md:text-5xl">{work.name}</h2>
                <p className="mb-5 max-w-3xl text-white/82">{work.summary}</p>
                <div className="grid gap-4 text-xs uppercase tracking-[0.15em] text-white/60 md:grid-cols-3">
                  <div>
                    <p className="mb-2 text-white/45">Focus</p>
                    <p>{work.tags.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-white/45">Industry</p>
                    <p>{work.industry.join(" · ")}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-white/45">Client</p>
                    <p>{work.client}</p>
                  </div>
                </div>
                <div className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.14em] text-[var(--lavi-fog)] transition-transform group-hover:translate-x-2">
                  <span>Open case</span>
                  <span aria-hidden>→</span>
                </div>
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
          className="mb-4 text-xs uppercase tracking-[0.2em] text-white/55"
        >
          Core Services
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease }}
          className="mb-10 max-w-4xl font-serif text-4xl leading-[1.02] md:text-6xl"
        >
          Where strategy and execution become measurable digital systems.
        </motion.h3>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.66, delay: idx * 0.07, ease }}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm"
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <h4 className="font-serif text-2xl leading-tight">{service.title}</h4>
                <span className="text-xs text-white/60">{service.id}</span>
              </div>
              <p className="mb-8 text-sm leading-relaxed text-white/80">{service.approach}</p>
              <button
                type="button"
                className="text-xs uppercase tracking-[0.16em] text-[var(--lavi-fog)] transition-colors hover:text-white"
              >
                {service.cta}
              </button>
            </motion.article>
          ))}
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
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/55">The Team</p>
            <h3 className="font-serif text-4xl leading-tight md:text-5xl">Visible, compact, precise.</h3>
          </div>

          <div>
            <p className="mb-7 max-w-2xl text-sm leading-relaxed text-white/82">
              A focused team with high signal and low noise. Every role exists to transform operational complexity into executable clarity.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {team.map((item) => (
                <div key={item} className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm">
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
          What clients say
        </motion.h3>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((quote, idx) => (
            <motion.article
              key={quote.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.62, delay: idx * 0.06, ease }}
              className="rounded-2xl border border-white/12 bg-[color:rgba(255,255,255,0.03)] p-5"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/55">{quote.id}</p>
              <p className="mb-5 text-sm leading-relaxed text-white/84">{quote.text}</p>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--lavi-fog)]">{quote.author}</p>
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
          className="rounded-3xl border border-white/12 bg-[color:rgba(255,255,255,0.02)] p-7 md:p-10"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/55">Next Step</p>
          <h4 className="mb-4 max-w-3xl font-serif text-4xl leading-[1.02] md:text-6xl">
            Let us design your next operational system.
          </h4>
          <p className="mb-7 max-w-2xl text-sm text-white/80">
            info@laviandco.com · Buenos Aires · Available for projects across LATAM.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/comenzar"
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-transform hover:scale-[1.03]"
            >
              Start project
            </Link>
            <Link
              href="/evaluacion"
              className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/10"
            >
              Request audit
            </Link>
          </div>
        </motion.div>
      </footer>
    </main>
  );
}

