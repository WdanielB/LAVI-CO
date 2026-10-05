"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { SiteFooter } from "./site-footer";
import { Cases } from "./landing/cases";
import { Closing, FooterReveal } from "./landing/closing";
import { Hero } from "./landing/hero";
import { INTRO_KEY, Intro } from "./landing/intro";
import { FloatingCta, LandingHeader } from "./landing/landing-header";
import { Manifesto } from "./landing/manifesto";
import { SmoothScroll, usePrefersReducedMotion, useSessionFlag } from "./landing/motion";
import { Ribbons } from "./landing/ribbons";
import { ServicesIndex } from "./landing/services-index";

export function HomeView() {
  const [intro, setIntro] = useState<"playing" | "revealing" | "done">("playing");
  const prefersReducedMotion = usePrefersReducedMotion();
  const introSeen = useSessionFlag(INTRO_KEY);
  const skipIntro = introSeen || prefersReducedMotion;

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="bg-[var(--lavi-ink)] text-[var(--lavi-paper)] antialiased">
        {!skipIntro && intro !== "done" && (
          <Intro onReveal={() => setIntro("revealing")} onDone={() => setIntro("done")} />
        )}
        <LandingHeader />
        <main id="contenido" tabIndex={-1} className="relative min-h-screen overflow-x-clip outline-none">
          <Hero ready={skipIntro || intro !== "playing"} />
          <Ribbons />
          <Manifesto />
          <Cases />
          <ServicesIndex />
          <Closing />
        </main>
        <FooterReveal>
          <SiteFooter />
        </FooterReveal>
        <FloatingCta />
      </div>
    </MotionConfig>
  );
}
