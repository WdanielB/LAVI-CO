"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GridLines, SheetLabel } from "./blueprint";
import { Icon, type IconName } from "./icons";
import { MaskText, easeExpo, useFinePointer } from "./motion";

const services: { title: string; approach: string; examples: string[]; icon: IconName }[] = [
  {
    title: "Automatizaciones",
    approach: "Lo que tu equipo copia, concilia o responde a mano pasa a correr solo.",
    examples: ["Avisos por WhatsApp", "Conciliaciones", "Reportes diarios"],
    icon: "cycle",
  },
  {
    title: "Herramientas a medida",
    approach: "Una pantalla por proceso, hecha para cómo trabaja tu operación.",
    examples: ["Asistencia", "Pedidos e inventario", "Seguimiento de producción"],
    icon: "grid",
  },
  {
    title: "Desarrollo de producto",
    approach: "De la idea a un primer producto que la gente ya puede usar.",
    examples: ["MVP", "Tiendas en línea", "Plataformas web"],
    icon: "rocket",
  },
  {
    title: "I+D",
    approach: "Prototipos para probar una idea antes de invertir en ella.",
    examples: ["Prototipos", "Pruebas con datos reales", "Validación"],
    icon: "flask",
  },
];

export function ServicesIndex() {
  const [active, setActive] = useState<number | null>(null);
  const finePointer = useFinePointer();

  return (
    <section id="services" className="relative py-24 md:py-44">
      <GridLines />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
        <div className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SheetLabel index={4} title="Servicios" className="mb-6" />
            <h2 className="font-serif text-[clamp(2.5rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              <MaskText lines={["Cuatro oficios,", "un objetivo."]} className="block" />
            </h2>
            <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-white/70 md:text-lg">
              Software a medida para que tu operación deje de depender de Excel, papel y mensajes sueltos.
            </p>
          </div>
          <Link href="/services" className="group relative hidden w-fit pb-1 text-[13px] font-semibold text-white md:block">
            Ver todos los servicios
            <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-white/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0" />
          </Link>
        </div>

        <ul onMouseLeave={() => finePointer && setActive(null)} className="border-t border-white/12">
          {services.map((service, i) => {
            const isActive = active === i;
            // Rows only collapse and dim where a cursor can open them; on touch every row stays readable.
            const dimmed = active !== null && !isActive;
            return (
              <motion.li
                key={service.title}
                onMouseEnter={() => finePointer && setActive(i)}
                // On touch the row crossing the middle of the screen takes the accent and redraws its icon.
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
                <Link href="/services" className="grid grid-cols-[1fr_auto] items-start gap-x-4 py-8 md:grid-cols-[6rem_1fr_auto] md:py-10">
                  <span
                    className={`col-span-2 mb-4 font-mono text-[10px] tracking-[0.28em] transition-colors duration-500 md:col-span-1 md:mb-0 md:pt-4 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className={`transition-opacity duration-700 ${dimmed ? "lg:opacity-35" : ""}`}>
                    <motion.span
                      initial={false}
                      animate={{ x: isActive && finePointer ? 14 : 0 }}
                      transition={{ duration: 0.7, ease: easeExpo }}
                      className="block font-serif text-[clamp(1.9rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em] text-white"
                    >
                      {service.title}
                    </motion.span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? "" : "lg:grid-rows-[0fr] lg:opacity-0"
                      } grid-rows-[1fr] opacity-100`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-[42ch] pt-4 text-[15px] leading-relaxed text-white/75 md:text-base lg:pl-[14px]">
                          {service.approach}
                        </span>
                        <span className="flex flex-wrap gap-2 pt-4 lg:pl-[14px]">
                          {service.examples.map((example) => (
                            <span
                              key={example}
                              className="border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65"
                            >
                              {example}
                            </span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </span>
                  <Icon name={service.icon} active={isActive} className="mt-1 h-10 w-10 text-white md:mt-2 md:h-14 md:w-14" />
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <Link
          href="/services"
          className="mt-8 flex items-center justify-between border border-white/20 px-5 py-4 text-[13px] font-semibold text-white md:hidden"
        >
          Ver todos los servicios <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
