"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteChrome } from "../_components/site-chrome";

export default function LoginPage() {
  return (
    <SiteChrome>
      <section className="container mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl rounded-xl border border-[var(--primary)]/30 bg-[color:rgba(50,57,82,0.76)] backdrop-blur-md p-8 xl:p-10 shadow-xl"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-hover mb-3">Area de clientes</p>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Acceso seguro</h1>
          <p className="text-base text-white/90 leading-relaxed mb-8">
            Este acceso esta reservado para clientes con implementaciones activas. Si todavia no tenes cuenta,
            primero completa la evaluacion sin costo para definir tu plan de trabajo.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/evaluacion"
              className="inline-flex rounded-md border border-[var(--primary)] bg-[var(--primary)] px-8 py-3.5 text-sm font-bold text-[var(--text-primary)] shadow-md transition-colors hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
            >
              Ir a evaluacion
            </Link>
            <Link
              href="/comenzar"
              className="inline-flex rounded-md border border-[var(--primary)]/45 bg-[color:rgba(50,57,82,0.55)] px-8 py-3.5 text-sm font-bold text-white hover:bg-[rgba(40,97,129,0.2)] transition-colors"
            >
              Ver proceso de inicio
            </Link>
          </div>
        </motion.div>
      </section>
    </SiteChrome>
  );
}
