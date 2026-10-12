"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Corners, SheetLabel } from "./blueprint";
import { MaskText, easeExpo, useDesktop, useFinePointer, usePrefersReducedMotion, useScrollRange } from "./motion";

type Work = {
  name: string;
  sector: string;
  line: string;
  caseId: string;
  image: string;
  alt: string;
};

// Named by what the tool does; screenshots are cropped to the working area.
const works: Work[] = [
  {
    name: "Control de asistencia",
    sector: "Metalmecánica",
    line: "Marcaciones desde las cámaras de planta, con historial y reportes.",
    caseId: "case-maservit",
    image: "/media/herramientas/asistencia.webp",
    alt: "Historial de marcaciones con filtros por trabajador, tipo y estado",
  },
  {
    name: "Tienda en línea",
    sector: "Florería",
    line: "Catálogo, carrito y pago por Yape.",
    caseId: "case-vitora",
    image: "/media/herramientas/tienda.webp",
    alt: "Portada de una tienda en línea de flores",
  },
  {
    name: "Seguimiento de fabricación",
    sector: "Metalmecánica",
    line: "Cada orden por etapa, en tiempo real.",
    caseId: "case-barandas",
    image: "/media/herramientas/fabricacion.webp",
    alt: "Diagrama Gantt de órdenes por etapa: cortado, armado, soldadura, arenado y pintado",
  },
  {
    name: "Panel clínico",
    sector: "Psicología",
    line: "Pacientes, agenda y evaluaciones en un solo lugar.",
    caseId: "case-mentalabs",
    image: "/media/herramientas/panel-clinico.webp",
    alt: "Panel de especialista con pacientes activos y exámenes pendientes",
  },
];

function Caption({ work, index }: { work: Work; index: number }) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
          0{index + 1} — {work.sector}
        </p>
        <h3 className="font-serif text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
          {work.name}
        </h3>
      </div>
      <p className="max-w-[24ch] text-sm leading-snug text-white/65 sm:pt-1 sm:text-right">{work.line}</p>
    </div>
  );
}

/* ---------- Desktop: pinned horizontal gallery ---------- */

function Plate({ work, index, drift, onHover }: { work: Work; index: number; drift: MotionValue<string>; onHover: (index: number | null) => void }) {
  return (
    <Link
      href={`/work#${work.caseId}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="group block w-[58vw] max-w-[980px] shrink-0 cursor-none"
    >
      {/* The unclipped wrapper is what gets observed: a fully clipped element never reports as in view. */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="relative">
        <Corners className="text-white/50" />
        <motion.div
          variants={{
            hidden: { clipPath: "inset(0% 0% 100% 0%)" },
            visible: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: easeExpo } },
          }}
          className="relative h-[56vh] overflow-hidden bg-[#0f141c]"
        >
          {/* Slightly oversized so the drift never exposes an edge. */}
          <motion.div style={{ x: drift, scale: 1.12 }} className="absolute inset-0">
            <Image src={work.image} alt={work.alt} fill sizes="60vw" className="object-cover object-left-top" />
          </motion.div>
          <div className="absolute inset-0 bg-[var(--lavi-ink)]/25 transition-opacity duration-700 group-hover:opacity-0" />
        </motion.div>
      </motion.div>
      <Caption work={work} index={index} />
    </Link>
  );
}

function HorizontalCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const finePointer = useFinePointer();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  // Images slide against the track, so they read as sitting deeper than their frames.
  const drift = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // The viewfinder tracks tightly; its caption follows on a looser spring so it trails behind.
  const cursorX = useSpring(pointerX, { stiffness: 420, damping: 32, mass: 0.35 });
  const cursorY = useSpring(pointerY, { stiffness: 420, damping: 32, mass: 0.35 });
  const captionX = useSpring(pointerX, { stiffness: 90, damping: 18, mass: 0.6 });
  const captionY = useSpring(pointerY, { stiffness: 90, damping: 18, mass: 0.6 });
  const active = hovered !== null;
  // Keep the last tool's caption on screen while it fades out.
  const [lastHovered, setLastHovered] = useState(0);
  if (hovered !== null && hovered !== lastHovered) setLastHovered(hovered);

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={(e) => {
        pointerX.set(e.clientX);
        pointerY.set(e.clientY);
      }}
      // One pixel of vertical scroll moves the track one pixel sideways.
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-start gap-[7vw] pl-20 pr-[12vw] will-change-transform">
          <div className="flex h-[56vh] w-[36vw] shrink-0 flex-col justify-between">
            <SheetLabel index={3} title="Portafolio" />
            <h2 className="font-serif text-[clamp(3rem,5.6vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              <MaskText lines={["Proyectos", "entregados."]} className="block" />
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">04 herramientas · en uso real</p>
          </div>
          {works.map((work, i) => (
            <Plate key={work.caseId} work={work} index={i} drift={drift} onHover={setHovered} />
          ))}
        </motion.div>

        <div className="absolute inset-x-20 bottom-10 flex items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">01</span>
          <span className="relative h-px flex-1 bg-white/12">
            <motion.span style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-[var(--lavi-accent)]" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">04</span>
        </div>
      </div>

      {finePointer && (
        <>
          {/* Viewfinder: four brackets that close in on the screenshot, inverted against whatever is under them. */}
          <motion.div aria-hidden style={{ x: cursorX, y: cursorY }} className="pointer-events-none fixed left-0 top-0 z-40 mix-blend-difference">
            <motion.div
              initial={false}
              animate={{ scale: active ? 1 : 1.9, opacity: active ? 1 : 0, rotate: active ? 0 : 45 }}
              transition={{ duration: 0.55, ease: easeExpo }}
              className="relative -ml-12 -mt-12 h-24 w-24 text-white"
            >
              <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-current" />
              <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-current" />
              <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-current" />
              <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-current" />
              <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current" />
            </motion.div>
          </motion.div>
          <motion.div aria-hidden style={{ x: captionX, y: captionY }} className="pointer-events-none fixed left-0 top-0 z-40">
            <motion.p
              initial={false}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
              transition={{ duration: 0.4, ease: easeExpo }}
              className="ml-14 mt-14 flex items-center gap-3 whitespace-nowrap bg-[var(--lavi-ink)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white"
            >
              <span className="text-white/50">0{lastHovered + 1} / 0{works.length}</span>
              Abrir {works[lastHovered].name}
              <span>↗</span>
            </motion.p>
          </motion.div>
        </>
      )}
    </section>
  );
}

/* ---------- Touch: sticky card stack ---------- */

function StackCard({ work, index, progress, pinned }: { work: Work; index: number; progress: MotionValue<number>; pinned: boolean }) {
  // Each card recedes while the ones after it slide over.
  const start = index / works.length;
  const depth = works.length - 1 - index;
  const scale = useTransform(progress, [start, 1], [1, 1 - depth * 0.045]);
  const dim = useScrollRange(progress, [start, 1], [0, depth * 0.18]);

  return (
    <motion.div
      style={pinned ? { scale, top: `${84 + index * 14}px` } : undefined}
      className={`${pinned ? "sticky origin-top" : ""} mb-6 last:mb-0`}
    >
      <Link
        href={`/work#${work.caseId}`}
        className="relative block overflow-hidden border border-white/12 bg-[#0f141c] p-4 pb-6 sm:p-6"
      >
        <div className="relative aspect-[5/3] overflow-hidden bg-[var(--lavi-ink)]">
          <Image
            src={work.image}
            alt={work.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-left-top"
          />
        </div>
        <Caption work={work} index={index} />
        <p className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
          Ver herramienta <span aria-hidden>→</span>
        </p>
        {pinned && <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[var(--lavi-ink)]" />}
      </Link>
    </motion.div>
  );
}

function StackCases({ pinned }: { pinned: boolean }) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-6 md:px-12 lg:px-20">
      <SheetLabel index={3} title="Portafolio" className="mb-6" />
      <h2 className="mb-12 font-serif text-[clamp(2.5rem,12vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
        <MaskText lines={["Proyectos", "entregados."]} className="block" />
      </h2>
      <div ref={listRef} className={pinned ? "" : "grid gap-6 lg:grid-cols-2"}>
        {works.map((work, i) => (
          <StackCard key={work.caseId} work={work} index={i} progress={scrollYProgress} pinned={pinned} />
        ))}
      </div>
    </section>
  );
}

export function Cases() {
  const desktop = useDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  if (prefersReducedMotion) return <StackCases pinned={false} />;
  return desktop ? <HorizontalCases /> : <StackCases pinned />;
}
