import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, mailtoLink, pageMetadata, siteConfig, whatsappLink } from "@/lib/site";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { Reveal } from "../_components/sections/reveal";
import { Section } from "../_components/sections/section";
import { Steps } from "../_components/sections/steps";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contacto: agenda una llamada de 20 minutos",
  description:
    "Cuéntanos qué está frenando tu operación. Respondemos en un día hábil con un siguiente paso claro: llamada de 20 minutos y propuesta breve.",
  path: "/contact",
});

const MAILTO = mailtoLink("Consulta LAVI & CO");
const WHATSAPP = whatsappLink("Hola LAVI & CO, quiero agendar una llamada de 20 minutos para contarles sobre mi operación.");

const helpful = [
  "El proceso que hoy se siente lento, frágil o demasiado manual.",
  "Dónde aparece el costo: horas de tu equipo, errores, retrabajos o decisiones tardías.",
  "Plazos o restricciones que tengamos que respetar.",
];

export default function ContactPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Contacto", path: "/contact" }]))}
      />
      <PageHero
        eyebrow="Contacto"
        title="Cuéntanos qué te está frenando."
        description="No necesitamos un brief perfecto ni una reunión de una hora. Seis preguntas cortas bastan para empezar, y respondemos en un día hábil."
      />

      <Section label="Formulario">
        <Reveal>
          <ContactForm />
        </Reveal>
      </Section>

      <Section label="Canal directo">
        <Reveal>
          <div className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
            <a
              href={MAILTO}
              className="group flex items-baseline justify-between gap-6 border-b border-white/15 py-5 text-white transition-colors hover:text-white/70"
            >
              <span className="font-medium">{siteConfig.email}</span>
              <span aria-hidden>↗</span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-6 border-b border-white/15 py-5 text-white transition-colors hover:text-white/70"
            >
              <span className="font-medium">WhatsApp</span>
              <span aria-hidden>↗</span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </div>

          <p className="mt-12 border-b border-white/15 pb-3 text-[14px] text-white/40">Qué nos ayuda a responder mejor</p>
          <ul className="text-[14px] leading-snug tracking-[-0.01em]">
            {helpful.map((item) => (
              <li key={item} className="border-b border-white/15 py-4 leading-relaxed md:pr-28 text-white/65">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[13px] text-white/40">Arequipa, Perú. Trabajamos con operaciones en todo LATAM.</p>
        </Reveal>
      </Section>

      <Steps
        eyebrow="Proceso"
        title="Qué pasa después de tu mensaje."
        items={[
          {
            title: "Te respondemos",
            meta: "1 día hábil",
            body: "Lees una respuesta concreta, no un autoresponder. Si tu caso no es para nosotros, también te lo decimos ahí.",
          },
          {
            title: "Llamada de 20 minutos",
            meta: "Sin costo",
            body: "Entendemos tu operación: dónde se pierde tiempo, qué sistemas usas hoy y qué resultado esperas.",
          },
          {
            title: "Propuesta breve",
            meta: "Alcance · plazo · precio",
            body: "Recibes una propuesta corta con el primer paso definido: qué construimos, en cuánto tiempo y cuánto cuesta. Sin decks de 80 láminas.",
          },
        ]}
      />
    </SiteChrome>
  );
}
