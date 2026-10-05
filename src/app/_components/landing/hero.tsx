"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Corners, Dimension, SheetLabel } from "./blueprint";
import { MaskText, ease, useFinePointer, usePrefersReducedMotion, useScrollRange } from "./motion";

/** Final inset of the video plate, in % of the viewport: top, sides, bottom. */
const PLATE = { top: 14, side: 6, bottom: 16 };

export function Hero({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const pinned = !prefersReducedMotion;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) videoRef.current?.pause();
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Full-bleed video closes down into a framed plate. Four ink mattes scale in over it rather
  // than clipping the video, so the move stays on the compositor instead of repainting each frame.
  const matte = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const contentOpacity = useScrollRange(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -70]);
  const plateOpacity = useScrollRange(scrollYProgress, [0.55, 0.9], [0, 1]);

  // Cursor parallax between the video and the type.
  const mouseX = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const videoX = useTransform(mouseX, (v) => v * -26);
  const videoY = useTransform(mouseY, (v) => v * -18);
  const typeX = useTransform(mouseX, (v) => v * 14);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!finePointer || !pinned) return;
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full ${pinned ? "h-[185vh]" : "h-[100dvh]"}`}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <motion.div style={pinned ? { x: videoX, y: videoY, scale: videoScale } : undefined} className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/hero-poster.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/media/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/media/hero-1080.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0.55)_0%,rgba(11,14,20,0.15)_35%,rgba(11,14,20,0.78)_100%)]" />
          {pinned && (
            <>
              <motion.span
                style={{ scaleY: matte, height: `${PLATE.top}%` }}
                className="absolute inset-x-0 top-0 origin-top bg-[var(--lavi-ink)]"
              />
              <motion.span
                style={{ scaleY: matte, height: `${PLATE.bottom}%` }}
                className="absolute inset-x-0 bottom-0 origin-bottom bg-[var(--lavi-ink)]"
              />
              <motion.span
                style={{ scaleX: matte, width: `${PLATE.side}%` }}
                className="absolute inset-y-0 left-0 origin-left bg-[var(--lavi-ink)]"
              />
              <motion.span
                style={{ scaleX: matte, width: `${PLATE.side}%` }}
                className="absolute inset-y-0 right-0 origin-right bg-[var(--lavi-ink)]"
              />
            </>
          )}
        </div>

        {pinned && (
          <motion.div
            aria-hidden
            style={{
              opacity: plateOpacity,
              top: `${PLATE.top}%`,
              bottom: `${PLATE.bottom}%`,
              left: `${PLATE.side}%`,
              right: `${PLATE.side}%`,
            }}
            className="pointer-events-none absolute border border-white/15"
          >
            <Corners />
            <p className="absolute -top-7 left-0 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55">
              Fig. 01 — Operación
            </p>
            <p className="absolute -top-7 right-0 hidden font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 sm:block">
              16.409° S · 71.537° O
            </p>
            <Dimension label="Esc. 1 : 1" className="absolute inset-x-0 -bottom-9" />
          </motion.div>
        )}

        <motion.div
          style={pinned ? { opacity: contentOpacity, y: contentY, x: typeX } : undefined}
          className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-5 pb-10 pt-24 sm:px-6 sm:pt-28 md:px-12 md:pb-14 md:pt-32 lg:px-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease }}
            className="flex items-center justify-between"
          >
            <SheetLabel index={1} title="Estudio operativo" />
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 md:block">Arequipa, Perú</p>
          </motion.div>

          <div>
            <h1 className="font-serif text-[clamp(2.9rem,11.2vw,9rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              <MaskText lines={["Menos fricción.", "Más control."]} show={ready} delay={0.15} className="block" />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 1.2, delay: 0.75, ease }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-white/15 pt-6 md:mt-10 md:pt-8"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 bg-white py-2 pl-7 pr-2 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
              >
                <span>Agenda una llamada</span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white"
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="group relative pb-1 text-[13px] font-semibold text-white"
              >
                Ver casos
                <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-white/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0" />
              </Link>
              <span className="ml-auto hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45 sm:flex">
                Scroll
                <span className="relative h-px w-12 overflow-hidden bg-white/20">
                  <motion.span
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-white"
                  />
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
