"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteChrome } from "../_components/site-chrome";

const ease = [0.22, 1, 0.36, 1] as const;

export default function LoginPage() {
  return (
    <SiteChrome>
      <section className="container mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pb-24 md:pt-24 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
            className="lg:sticky lg:top-28"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavi-accent)]" />
              Área de clientes
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              Acceso seguro a tu workspace operativo.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
              Este acceso está reservado para clientes con implementaciones activas. Si todavía no tienes cuenta,
              primero completa la evaluación sin costo para definir tu plan de trabajo.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Tableros operativos en vivo y reportes ejecutivos.",
                "Repositorio de releases, decisiones y métricas.",
                "Canal directo con el equipo asignado al proyecto.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/80">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--lavi-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.08 }}
            className="rounded-2xl border border-[var(--primary)]/30 bg-[linear-gradient(165deg,rgba(50,57,82,0.78),rgba(11,14,20,0.72))] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Iniciar sesión</p>
            <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Accede con tu cuenta corporativa
            </h2>

            <form className="mt-7 space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div>
                <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nombre@empresa.com"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-[rgba(8,11,16,0.6)] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[var(--primary)] focus:bg-[rgba(8,11,16,0.8)]"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-[rgba(8,11,16,0.6)] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[var(--primary)] focus:bg-[rgba(8,11,16,0.8)]"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 text-xs text-white/65">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--primary)]" />
                  Mantener sesión
                </label>
                <a href="#recuperar" className="text-xs font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[color:color-mix(in_oklab,var(--primary)_90%,white_10%)]"
              >
                Ingresar
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </form>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">¿Sin cuenta?</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/[0.06]"
              >
                Evaluación gratuita
              </Link>
              <Link
                href="/comenzar"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white/[0.06]"
              >
                Cómo iniciamos
              </Link>
            </div>

            <p className="mt-6 text-center text-xs text-white/45">
              Acceso restringido. Conexión cifrada extremo a extremo.
            </p>
          </motion.div>
        </div>
      </section>
    </SiteChrome>
  );
}
