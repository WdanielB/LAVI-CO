import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, pageMetadata, siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CtaBanner } from "../_components/sections/cta-banner";
import { Reveal } from "../_components/sections/reveal";
import { CaseStudy } from "../_components/portfolio/case-study";
import { ProjectIndex } from "../_components/portfolio/project-index";

export const metadata: Metadata = pageMetadata({
  title: "Casos reales de software y automatización",
  description:
    "Proyectos reales de LAVI & CO: control de asistencia con integración Hikvision, tienda online, seguimiento de producción en tiempo real y MVP de producto.",
  path: "/work",
});

const sectors = new Set(projects.map((p) => p.sector));

const facts = [
  { value: String(projects.length), label: "proyectos entregados" },
  { value: String(sectors.size), label: "sectores distintos" },
  { value: "1 sem.", label: "entrega más rápida" },
];

const portfolioJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Casos de LAVI & CO",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteConfig.url}/work#${project.id}`,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.summary,
      image: `${siteConfig.url}${project.images[0].src}`,
      creator: { "@id": `${siteConfig.url}/#organization` },
      ...(project.year ? { dateCreated: project.year } : {}),
    },
  })),
};

export default function WorkPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Casos", path: "/work" }]))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(portfolioJsonLd)} />

      <PageHero
        eyebrow="Portafolio"
        title="Lo que hemos construido para clientes reales."
        description="Cuatro proyectos, cuatro operaciones distintas. Sin maquetas ni casos inventados: capturas reales de cada sistema."
      />

      <section className="container mx-auto max-w-[1440px] px-5 pb-8 sm:px-6 md:px-12 lg:px-20">
        <Reveal>
          <dl className="mb-12 grid grid-cols-3 gap-4 md:mb-16 md:max-w-3xl">
            {facts.map((fact) => (
              <div key={fact.label} className="border-l border-white/15 pl-4">
                <dt className="sr-only">{fact.label}</dt>
                <dd
                  className="font-sans text-3xl font-semibold leading-none text-white md:text-4xl"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {fact.value}
                </dd>
                <dd aria-hidden className="mt-2 text-xs leading-snug text-white/60 md:text-sm">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <ProjectIndex projects={projects} />
      </section>

      <div className="container mx-auto max-w-[1440px] px-5 pb-8 sm:px-6 md:px-12 lg:px-20">
        {projects.map((project, index) => (
          <CaseStudy key={project.id} project={project} index={index} />
        ))}
      </div>

      <CtaBanner
        title="¿Tu operación se parece a alguno de estos casos?"
        body="Cuéntanos tu caso y te decimos en una llamada cómo lo abordaríamos y por dónde empezar."
        whatsappMessage="Hola LAVI & CO, vi sus casos y quiero contarles el mío."
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />
    </SiteChrome>
  );
}
