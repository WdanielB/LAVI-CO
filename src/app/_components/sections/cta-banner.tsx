import Link from "next/link";
import { mailtoLink, siteConfig, whatsappLink } from "@/lib/site";
import { Reveal } from "./reveal";

type Cta = { label: string; href: string };

type CtaBannerProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  /** Prefilled WhatsApp message, so the conversation starts with context. */
  whatsappMessage?: string;
  /** Low-emphasis link for visitors who are not ready to write yet. */
  secondaryCta?: Cta;
};

const assurances = [
  "Llamada de 20 minutos, sin costo",
  "Respuesta en 1 día hábil",
  "Propuesta con alcance, plazo y precio cerrado",
];

export function CtaBanner({
  eyebrow = "Siguiente paso",
  title,
  body,
  whatsappMessage = "Hola LAVI & CO, quiero agendar una llamada de 20 minutos para contarles sobre mi operación.",
  secondaryCta,
}: CtaBannerProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(40,97,129,0.38)_0%,rgba(50,57,82,0.28)_45%,rgba(11,14,20,0.7)_100%)] px-6 py-10 shadow-[0_40px_120px_-40px_rgba(40,97,129,0.55)] sm:px-10 md:py-14 lg:px-14 lg:py-16">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[var(--lavi-accent)]/40 blur-[100px]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(243,244,246,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(243,244,246,0.6)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <span aria-hidden className="h-px w-8 bg-white/50" />
                {eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl text-balance font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              {body && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">{body}</p>}

              <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {assurances.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0 text-[#7fb6d4]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black shadow-lg transition-colors hover:bg-white/90"
              >
                <span className="flex items-center gap-3">
                  <WhatsappIcon />
                  Escríbenos por WhatsApp
                </span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white"
                >
                  →
                </span>
                <span className="sr-only"> (se abre en una pestaña nueva)</span>
              </a>
              <a
                href={mailtoLink("Consulta LAVI & CO")}
                className="inline-flex items-center justify-center gap-3 border border-white/30 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
              >
                Escríbenos a {siteConfig.email}
              </a>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group mt-1 inline-flex items-center justify-center gap-2 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/65 transition-colors hover:text-white"
                >
                  {secondaryCta.label}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function WhatsappIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-[#128C4B]" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}
