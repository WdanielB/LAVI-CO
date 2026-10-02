import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "./_components/site-chrome";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

const shortcuts = [
  { href: "/services", label: "Servicios", body: "Automatización, herramientas a medida, producto e I+D." },
  { href: "/work", label: "Casos", body: "Proyectos reales para operaciones reales." },
  { href: "/contact", label: "Contacto", body: "Cuéntanos qué te está frenando." },
];

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="container mx-auto max-w-[1440px] px-5 pb-20 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pb-24 md:pt-24 lg:px-20">
        <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
          <span aria-hidden className="h-px w-8 bg-[var(--lavi-accent)]" />
          Error 404
        </p>
        <h1 className="max-w-3xl text-balance font-serif text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
          Esta página no existe o cambió de lugar.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 lg:text-lg">
          Puede que el enlace esté desactualizado. Estos son los caminos más directos:
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {shortcuts.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col border-t border-white/25 pt-5 transition-colors duration-300 hover:border-[var(--lavi-accent)]"
              >
                <span className="flex items-center justify-between font-serif text-xl font-semibold text-white">
                  {item.label}
                  <span aria-hidden className="text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--lavi-accent)]">
                    →
                  </span>
                </span>
                <span className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 bg-white px-6 py-3 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
        >
          Volver al inicio
        </Link>
      </section>
    </SiteChrome>
  );
}
