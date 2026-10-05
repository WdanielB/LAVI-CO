"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GridLines, SheetLabel } from "./blueprint";
import { Icon, type IconName } from "./icons";
import { MaskText, easeExpo, useFinePointer } from "./motion";

const services: { title: string; approach: string; icon: IconName }[] = [
  { title: "Automatizaciones", approach: "Flujos que reemplazan trabajo manual medible.", icon: "cycle" },
  { title: "Herramientas a medida", approach: "ERP, CRM y portales pegados a tu proceso real.", icon: "grid" },
  { title: "Desarrollo de producto", approach: "De la idea al MVP, con métricas desde el primer release.", icon: "rocket" },
  { title: "I+D", approach: "Prototipos validados para nuevos frentes de negocio.", icon: "flask" },
];

export function ServicesIndex() {
  const [active, setActive] = useState<number | null>(null);
  const finePointer = useFinePointer();

  return (
    <section id="services" className="relative py-28 md:py-44">
      <GridLines />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SheetLabel index={4} title="Servicios" className="mb-6" />
            <h2 className="font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              <MaskText lines={["Cuatro oficios,", "un objetivo."]} className="block" />
            </h2>
          </div>
          <Link
            href="/services"
            className="group relative w-fit pb-1 text-[13px] font-semibold text-white"
          >
            Ver todos los servicios
            <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-white/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0" />
          </Link>
        </div>

        <ul onMouseLeave={() => finePointer && setActive(null)} className="border-t border-white/12">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.li
                key={service.title}
                onMouseEnter={() => finePointer && setActive(i)}
                // On touch the row crossing the middle of the screen takes focus.
                onViewportEnter={() => !finePointer && setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="relative border-b border-white/12"
              >
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: easeExpo }}
                  className="absolute -bottom-px left-0 h-px w-full origin-left bg-[var(--lavi-accent)]"
                />
                <Link href="/services" className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-7 md:grid-cols-[6rem_1fr_auto] md:py-10">
                  <span
                    className={`pt-2 font-mono text-[10px] tracking-[0.28em] transition-colors duration-500 md:pt-4 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <motion.span
                      initial={false}
                      animate={{ x: isActive ? 14 : 0, opacity: active === null || isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.7, ease: easeExpo }}
                      className="block font-serif text-[clamp(1.75rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-white"
                    >
                      {service.title}
                    </motion.span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[40ch] pl-[14px] pt-4 text-sm leading-relaxed text-white/70 md:text-base">
                          {service.approach}
                        </span>
                      </span>
                    </span>
                  </span>
                  <Icon name={service.icon} active={isActive} className="mt-1 h-9 w-9 text-white md:mt-2 md:h-14 md:w-14" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
