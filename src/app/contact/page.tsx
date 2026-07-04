import type { Metadata } from "next";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { SectionHeading } from "../_components/sections/section-heading";
import { Reveal } from "../_components/sections/reveal";
import { Steps } from "../_components/sections/steps";

export const metadata: Metadata = {
  title: "Contacto | LAVI & CO",
  description:
    "Cuéntanos qué está frenando tu operación. Respondemos en un día hábil con un siguiente paso claro: llamada de 20 minutos y propuesta breve.",
};

const MAILTO = "mailto:contacto@lavi.lat?subject=Consulta%20LAVI%20%26%20CO";
// TODO: reemplazar con el número real de WhatsApp Business antes de publicar el botón.
// const WHATSAPP = "https://wa.me/51XXXXXXXXX";

export default function ContactPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Contacto"
        title="Cuéntanos qué te está frenando. Respondemos en un día hábil."
        description="No necesitamos un brief perfecto ni una reunión de una hora. Un correo con dos o tres líneas sobre tu operación es suficiente para empezar."
      />

      <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
        <Reveal>
          <div className="flex flex-col gap-6 border-y-2 border-[var(--lavi-accent)] py-8 lg:flex-row lg:items-center lg:justify-between lg:py-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">Canal directo</p>
              <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-white lg:text-3xl">
                contacto@lavi.lat
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                Escríbenos y coordinamos una llamada de 20 minutos para entender tu operación. Sin compromiso: si no
                somos el fit correcto, te lo decimos en esa primera llamada.
              </p>
            </div>
            <a
              href={MAILTO}
              className="group inline-flex shrink-0 items-center gap-3 bg-white px-6 py-3 text-[13px] font-semibold text-black transition-colors hover:bg-white/90"
            >
              <span>Escríbenos por correo</span>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </Reveal>
      </section>

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

      <section className="container mx-auto max-w-[1440px] px-5 pb-20 sm:px-6 md:px-12 md:pb-24 lg:px-20">
        <SectionHeading
          eyebrow="Para avanzar más rápido"
          title="Qué incluir en tu mensaje."
          description="Con estos tres puntos llegamos a la llamada con la mitad del trabajo hecho. Si no los tienes claros, escríbenos igual."
        />
        <Reveal>
          <ul className="max-w-3xl border-t border-white/25">
            {[
              "El proceso que hoy se siente lento, frágil o demasiado manual.",
              "Dónde aparece el costo: horas de tu equipo, errores, retrabajos o decisiones tardías.",
              "Plazos o restricciones que tengamos que respetar (temporada alta, cierre contable, migraciones en curso).",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-white/15 py-4 text-sm leading-relaxed text-white/80 lg:text-base"
              >
                <span aria-hidden className="mt-[7px] h-px w-5 shrink-0 bg-[var(--lavi-accent)]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm text-white/60">
            Respuesta en 1 día hábil · Arequipa, Perú · Trabajamos con operaciones en todo LATAM.
          </p>
        </Reveal>
      </section>
    </SiteChrome>
  );
}
