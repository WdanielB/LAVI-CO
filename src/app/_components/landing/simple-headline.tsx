"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LINES = ["Hagámoslo", "simple."];

/**
 * The closing headline acts out its own words: the letters arrive scattered and tilted,
 * then settle into a clean line, and a rule draws under "simple."
 */
export function SimpleHeadline({ className = "" }: { className?: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const chars = q("[data-char]");
      const rule = q("[data-rule]");
      gsap.set(chars, {
        yPercent: () => gsap.utils.random(-90, 90),
        xPercent: () => gsap.utils.random(-40, 40),
        rotation: () => gsap.utils.random(-28, 28),
        opacity: 0,
      });
      gsap.set(rule, { scaleX: 0 });

      const settle = gsap
        .timeline({ paused: true })
        .to(chars, {
          yPercent: 0,
          xPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.3,
          ease: "expo.out",
          stagger: { each: 0.035, from: "random" },
        })
        .to(rule, { scaleX: 1, duration: 0.9, ease: "expo.out" }, "-=0.55");

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            settle.play();
            observer.disconnect();
          }
        },
        { threshold: 0.45 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, []);

  return (
    <h2 ref={root} aria-label={LINES.join(" ")} className={className}>
      {LINES.map((line, lineIndex) => (
        <span key={line} aria-hidden className="relative block w-fit mx-auto">
          {line.split("").map((char, i) => (
            <span key={i} data-char className="inline-block will-change-transform">
              {char}
            </span>
          ))}
          {lineIndex === LINES.length - 1 && (
            <span data-rule className="absolute -bottom-[0.07em] left-0 h-[0.035em] w-full origin-left bg-[var(--lavi-accent)]" />
          )}
        </span>
      ))}
    </h2>
  );
}
