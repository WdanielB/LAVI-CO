"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  {
    src: "/media/abstract-logistic-placeholder.jpg",
    title: "Trazabilidad Total",
    desc: "Visibilidad continua desde origen hasta entrega.",
  },
  {
    src: "/media/crystal-kwok-xD5SWy7hMbw-unsplash.jpg",
    title: "Almacenamiento Activo",
    desc: "Decisiones de picking y capacidad en tiempo real.",
  },
  {
    src: "/media/grant-ritchie-Nh7n1Kxb43U-unsplash.jpg",
    title: "Distribución Ágil",
    desc: "Rutas y ventanas de entrega sincronizadas.",
  },
  {
    src: "/media/jezael-melgoza-HYQvV8wWX18-unsplash.jpg",
    title: "Análisis Predictivo",
    desc: "Modelos que anticipan demanda y cuellos de botella.",
  },
];

export function SolutionsStack() {
  return (
    <section className="relative z-10 w-full bg-transparent py-12 text-white sm:py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 md:mb-12"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/60 sm:text-xs">Soluciones</p>
          <h2 className="font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            4 Fases.
            <br />
            <span className="opacity-50">Un ecosistema operativo.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {images.map((item, index) => (
            <motion.article
              key={item.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-xl border border-white/12 bg-[rgba(50,57,82,0.42)] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[2/3]">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(11,14,20,0.6)] via-transparent to-transparent" />
              </div>
              <div className="space-y-2 p-4 sm:p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                  0{index + 1}
                </p>
                <h3 className="font-serif text-xl leading-tight text-white sm:text-2xl">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/72">{item.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
