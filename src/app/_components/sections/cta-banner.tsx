import Link from "next/link";
import { mailtoLink, siteConfig, whatsappLink } from "@/lib/site";
import { Reveal } from "./reveal";
import { Section } from "./section";

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

const rowClass =
  "group flex items-baseline justify-between gap-6 border-b border-white/15 py-5 text-white transition-colors hover:text-white/70";

export function CtaBanner({
  eyebrow = "Siguiente paso",
  title,
  body,
  whatsappMessage = "Hola LAVI & CO, quiero agendar una llamada de 20 minutos para contarles sobre mi operación.",
  secondaryCta,
}: CtaBannerProps) {
  return (
    <Section label={eyebrow}>
      <Reveal>
        <h2 className="max-w-[22ch] text-balance font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.04em] text-white">
          {title}
        </h2>
        {body && <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-white/60">{body}</p>}

        <div className="mt-10 border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em] md:mt-14">
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className={rowClass}>
            <span className="font-medium">Escríbenos por WhatsApp</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          <a href={mailtoLink("Consulta LAVI & CO")} className={rowClass}>
            <span className="font-medium">{siteConfig.email}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </a>
          {secondaryCta && (
            <Link href={secondaryCta.href} className={`${rowClass} text-white/60`}>
              <span>{secondaryCta.label}</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          )}
        </div>
        <p className="mt-6 text-[13px] leading-relaxed text-white/40">
          Llamada de 20 minutos, sin costo. Respuesta en 1 día hábil. Propuesta con alcance, plazo y precio cerrado.
        </p>
      </Reveal>
    </Section>
  );
}
