"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { whatsappLink } from "@/lib/site";
import { Reveal } from "../sections/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export function CaseStudy({ project, index }: { project: Project; index: number }) {
  const [active, setActive] = useState(0);
  const reverse = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const image = project.images[active];

  const rows = [
    project.problem && { label: "Problema", text: project.problem },
    { label: "Qué construimos", text: project.built },
  ].filter(Boolean) as { label: string; text: string }[];

  const meta = [
    { label: "Cliente", value: project.client },
    { label: "Tipo", value: project.type },
    project.duration && { label: "Duración", value: project.duration },
    project.year && { label: "Año", value: project.year },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="scroll-mt-28 border-t border-white/10 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
        <Reveal className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
          <figure>
            <div className="overflow-hidden rounded-xl border border-white/12 bg-[#11151d] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </span>
                <span className="flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-center font-mono text-[11px] text-white/50">
                  {project.frameLabel}
                </span>
                <span aria-hidden className="w-[42px]" />
              </div>
              <div className="relative aspect-[16/9] bg-[radial-gradient(ellipse_at_top,rgba(40,97,129,0.45),transparent_65%),linear-gradient(160deg,#323952,#141821_70%)]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={image.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, 100vw"
                      className="object-contain p-3 sm:p-5"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {project.images.length > 1 && (
              <div className="mt-3 flex gap-3" role="group" aria-label={`Capturas de ${project.client}`}>
                {project.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    aria-label={`Ver captura ${i + 1}: ${img.alt}`}
                    className={`relative aspect-[16/9] w-24 overflow-hidden rounded-md border transition-all duration-300 sm:w-28 ${
                      i === active
                        ? "border-[var(--lavi-accent)] opacity-100 ring-1 ring-[var(--lavi-accent)]"
                        : "border-white/10 opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image src={img.src} alt="" fill sizes="112px" className="bg-[#232838] object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
            <figcaption className="sr-only">{image.alt}</figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.08} className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          <div className="flex items-baseline gap-4">
            <span
              className="font-sans text-4xl font-semibold leading-none text-[var(--lavi-accent)]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {number}
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {project.sector}
            </span>
          </div>

          <h2
            id={`${project.id}-title`}
            className="mt-5 text-balance font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl"
          >
            {project.title}
          </h2>

          <dl className="mt-6 space-y-5">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{row.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-white/85 lg:text-base">{row.text}</dd>
              </div>
            ))}
            {project.result && (
              <div className="border-l-2 border-[var(--lavi-accent)] bg-[var(--lavi-accent)]/10 py-3 pl-4 pr-3">
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7fb6d4]">Resultado</dt>
                <dd className="mt-1 text-base font-semibold text-white">{project.result}</dd>
              </div>
            )}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-white/75"
              >
                {tech}
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-sm">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-white/50">{item.label}</dt>
                <dd className="mt-0.5 text-white/90">{item.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={whatsappLink(`Hola LAVI & CO, vi el caso "${project.title}" y quiero algo similar para mi operación.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white px-5 py-2.5 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
            >
              Quiero algo similar
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              <span className="sr-only"> (WhatsApp, se abre en una pestaña nueva)</span>
            </a>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-[var(--lavi-accent)]"
              >
                Visitar {project.frameLabel}
                <span aria-hidden>↗</span>
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
