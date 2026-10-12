"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Crosshair } from "./blueprint";
import { usePrefersReducedMotion } from "./motion";

// The tools clients ask for most, then what every one of them has in common.
const tools = ["Control de asistencia", "Inventario", "Punto de venta", "Seguimiento de producción", "Cotizaciones", "Agenda de citas", "Reportes en vivo"];
const gained = ["Una sola pantalla", "En vivo", "Sin doble digitación", "A tu medida", "Tu equipo lo opera"];

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

type RibbonProps = {
  children: ReactNode;
  /** Percent of one copy travelled per second; the sign sets the resting direction. */
  baseVelocity: number;
  className?: string;
};

/** Marquee whose speed and lean follow scroll velocity, and which reverses when scrolling back up. */
function Ribbon({ children, baseVelocity, className = "" }: RibbonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smoothVelocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [7, -7]);
  // The track holds two identical copies, so wrapping at -50% is seamless.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || prefersReducedMotion) return;
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    const step = direction.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + step + step * Math.abs(factor));
  });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ x, skewX: prefersReducedMotion ? 0 : skewX }} className="flex w-max whitespace-nowrap will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function Ribbons() {
  return (
    <section aria-label="Herramientas que construimos" className="relative z-10 -mt-[6vh] py-16 md:py-24">
      <div className="-mx-[4vw] -rotate-[2.5deg]">
        <Ribbon baseVelocity={-2} className="border-y border-white/12 bg-[var(--lavi-ink)] py-4 md:py-6">
          {tools.map((item, i) => (
            <span key={item} className="flex items-center">
              <span
                className={`font-serif text-[clamp(2.25rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em] ${
                  i % 2 === 0 ? "text-outline" : "text-white"
                }`}
              >
                {item}
              </span>
              <Crosshair className="mx-[3.5vw] shrink-0 text-white/35" />
            </span>
          ))}
        </Ribbon>
      </div>

      {/* Offset so the two bands meet at the left edge and open into a wedge instead of overlapping. */}
      <div className="-mx-[4vw] mt-[7vw] rotate-[2.5deg] md:mt-[5vw]">
        <Ribbon baseVelocity={1.5} className="bg-[var(--lavi-accent)] py-3 md:py-3.5">
          {[...gained, ...gained].map((item, i) => (
            <span key={i} className="flex items-center font-mono text-[11px] uppercase tracking-[0.3em] text-white md:text-[12px]">
              {item}
              <span aria-hidden className="mx-6 text-white/55 md:mx-8">
                →
              </span>
            </span>
          ))}
        </Ribbon>
      </div>
    </section>
  );
}
