import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, pageMetadata } from "@/lib/site";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CardGrid } from "../_components/sections/card-grid";
import { SectionHeading } from "../_components/sections/section-heading";
import { Reveal } from "../_components/sections/reveal";
import { CtaBanner } from "../_components/sections/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros: estudio de desarrollo operativo en Arequipa",
  description:
    "Estudio de diseño y desarrollo operativo en Arequipa, Perú. Equipo pequeño, cerca del problema, con entregas que siguen funcionando después del lanzamiento.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Nosotros", path: "/about" }]))}
      />
      <PageHero
        eyebrow="Nosotros"
        title="Somos un equipo pequeño. Eso es a propósito."
        description="Trabajamos desde Arequipa, cerca del problema y dentro de tu operación — no desde un deck de 80 láminas. Un solo punto de contacto, proceso visible y entregas que se miden en producción."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />

      <CardGrid
        eyebrow="Cómo trabajamos"
        title="Tres reglas que no negociamos."
        columns={3}
        items={[
          {
            eyebrow: "01",
            title: "Cerca del problema",
            body: "Cada decisión se ancla en tu workflow real, tus restricciones y tus números — no en supuestos ni en dirección abstracta. Si hace falta, vamos a la planta.",
          },
          {
            eyebrow: "02",
            title: "Proceso visible",
            body: "Siempre sabes qué está pasando, qué viene después y dónde está el riesgo. Puntos de control claros, reglas simples para alcance y feedback.",
          },
          {
            eyebrow: "03",
            title: "Entregas que duran",
            body: "El resultado se mide cuando la novedad se va: código mantenible, sistemas documentados y tu equipo capaz de operarlos sin depender de nosotros.",
          },
        ]}
      />

      <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
        <SectionHeading
          eyebrow="Honestidad primero"
          title="Para quién somos un buen fit — y para quién no."
        />
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          <Reveal>
            <div className="h-full border-t-2 border-[var(--lavi-accent)] pt-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--lavi-accent)]">
                Somos un buen fit si
              </p>
              <ul className="divide-y divide-white/10">
                {[
                  "Tu operación tiene procesos manuales que duelen: horas perdidas, errores repetidos, decisiones tardías.",
                  "Quieres resultados medibles en semanas y estás dispuesto a empezar por un ciclo acotado.",
                  "Necesitas que el sistema quede documentado y en manos de tu equipo, no atado a un proveedor.",
                ].map((item) => (
                  <li key={item} className="py-3 text-sm leading-relaxed text-white/85 lg:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full border-t border-white/25 pt-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                No somos el fit si
              </p>
              <ul className="divide-y divide-white/10">
                {[
                  "Buscas staffing o cuerpos por hora para un equipo que ya tiene el plan resuelto.",
                  "Necesitas solo un logo nuevo o una web vitrina sin conexión con la operación.",
                  "Quieres un proyecto de un año cerrado por adelantado, sin medir nada en el camino.",
                ].map((item) => (
                  <li key={item} className="py-3 text-sm leading-relaxed text-white/70 lg:text-base">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm text-white/60">
                Si es tu caso, igual escríbenos: te recomendamos a quién acudir.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Una llamada de 20 minutos define si tiene sentido trabajar juntos."
        whatsappMessage="Hola LAVI & CO, quiero agendar una llamada de 20 minutos para ver si tiene sentido trabajar juntos."
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />
    </SiteChrome>
  );
}
