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
import { usePrefersReducedMotion } from "./motion";

const capabilities = ["Automatización", "Herramientas a medida", "Producto", "I+D"];
const stack = ["Next.js", "PostgreSQL", "n8n", "Docker", "Hikvision", "Supabase", "React", "Python", "Shopify"];

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
    <section aria-label="Capacidades y stack" className="relative z-10 -mt-[6vh] py-16 md:py-24">
      <div className="-mx-[4vw] -rotate-[2.5deg]">
        <Ribbon baseVelocity={-2.2} className="border-y border-white/12 bg-[var(--lavi-ink)] py-4 md:py-6">
          {capabilities.map((item, i) => (
            <span key={item} className="flex items-center">
              <span
                className={`font-serif text-[clamp(2.5rem,7.5vw,6.5rem)] font-semibold leading-none tracking-[-0.04em] ${
                  i % 2 === 0 ? "text-outline" : "text-white"
                }`}
              >
                {item}
              </span>
              <span aria-hidden className="mx-[4vw] h-px w-[6vw] bg-[var(--lavi-accent)]" />
            </span>
          ))}
        </Ribbon>
      </div>

      {/* Offset so the two bands meet at the left edge and open into a wedge instead of overlapping. */}
      <div className="-mx-[4vw] mt-[5vw] hidden rotate-[2.5deg] md:block">
        <Ribbon baseVelocity={1.6} className="bg-[var(--lavi-accent)] py-3.5">
          {[...stack, ...stack].map((item, i) => (
            <span key={i} className="flex items-center font-mono text-[12px] uppercase tracking-[0.3em] text-white">
              {item}
              <span aria-hidden className="mx-8 text-white/50">
                +
              </span>
            </span>
          ))}
        </Ribbon>
      </div>
    </section>
  );
}
