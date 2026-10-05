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
  /** Zoom that crops the empty margins baked into the screenshot. */
  zoom: number;
};

const works: Work[] = [
  {
    name: "Maservit",
    sector: "Metalmecánica",
    line: "Asistencia conectada a cámaras Hikvision.",
    caseId: "case-maservit",
    image: "/media/Proyectos/maservit.png",
    alt: "Web app de control de asistencia de Maservit",
    zoom: 1.38,
  },
  {
    name: "Floralite",
    sector: "Florería · Vitora",
    line: "Tienda online con pago por Yape.",
    caseId: "case-vitora",
    image: "/media/Proyectos/vitora.png",
    alt: "Floralite, la tienda online de la florería Vitora",
    zoom: 1.12,
  },
  {
    name: "Fabricación en vivo",
    sector: "Metalmecánica",
    line: "Del Excel compartido al estado en tiempo real.",
    caseId: "case-barandas",
    image: "/media/Proyectos/barandas-1.png",
    alt: "Panel de seguimiento de fabricación de barandas inox",
    zoom: 1.18,
  },
  {
    name: "Mentalabs",
    sector: "Psicología",
    line: "El primer producto de una startup.",
    caseId: "case-mentalabs",
    image: "/media/Proyectos/mentalabs-1.png",
    alt: "MVP de producto de Mentalabs",
    zoom: 1.1,
  },
];

function Caption({ work, index }: { work: Work; index: number }) {
  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">
          0{index + 1} — {work.sector}
        </p>
        <h3 className="font-serif text-[clamp(1.75rem,3.2vw,3rem)] font-semibold leading-none tracking-[-0.035em] text-white">
          {work.name}
        </h3>
      </div>
      <p className="max-w-[24ch] text-sm leading-snug text-white/65 sm:pt-1 sm:text-right">{work.line}</p>
    </div>
  );
}

/* ---------- Desktop: pinned horizontal gallery ---------- */

function Plate({ work, index, drift, onHover }: { work: Work; index: number; drift: MotionValue<string>; onHover: (hovering: boolean) => void }) {
  return (
    <Link
      href={`/work#${work.caseId}`}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
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
          <motion.div style={{ x: drift, scale: work.zoom }} className="absolute inset-0">
            <Image src={work.image} alt={work.alt} fill sizes="60vw" className="object-cover" />
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
  const [hovering, setHovering] = useState(false);
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

  const cursorX = useSpring(useMotionValue(0), { stiffness: 300, damping: 28, mass: 0.4 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 300, damping: 28, mass: 0.4 });

  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      // One pixel of vertical scroll moves the track one pixel sideways.
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-start gap-[7vw] pl-20 pr-[12vw] will-change-transform">
          <div className="flex h-[56vh] w-[36vw] shrink-0 flex-col justify-between">
            <SheetLabel index={3} title="Casos" />
            <h2 className="font-serif text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              <MaskText lines={["Obra", "construida."]} className="block" />
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/50">04 proyectos · clientes reales</p>
          </div>
          {works.map((work, i) => (
            <Plate key={work.caseId} work={work} index={i} drift={drift} onHover={setHovering} />
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
        <motion.div
          aria-hidden
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-40"
        >
          <motion.span
            initial={false}
            animate={{ scale: hovering ? 1 : 0 }}
            transition={{ duration: 0.45, ease: easeExpo }}
            className="-ml-11 -mt-11 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-white font-mono text-[10px] uppercase tracking-[0.28em] text-black"
          >
            Ver
          </motion.span>
        </motion.div>
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
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--lavi-ink)]">
          <Image
            src={work.image}
            alt={work.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{ transform: `scale(${work.zoom})` }}
            className="object-cover"
          />
        </div>
        <Caption work={work} index={index} />
        <p className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
          Ver caso <span aria-hidden>→</span>
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
      <SheetLabel index={3} title="Casos" className="mb-6" />
      <h2 className="mb-12 font-serif text-[clamp(2.75rem,13vw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
        <MaskText lines={["Obra", "construida."]} className="block" />
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
