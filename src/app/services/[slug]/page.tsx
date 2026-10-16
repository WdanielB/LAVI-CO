import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, jsonLd, pageMetadata, siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getService, services } from "@/lib/services";
import { SiteChrome } from "../../_components/site-chrome";
import { PageHero } from "../../_components/sections/page-hero";
import { CardGrid } from "../../_components/sections/card-grid";
import { Faq } from "../../_components/sections/faq";
import { LinkList } from "../../_components/sections/link-list";
import { CtaBanner } from "../../_components/sections/cta-banner";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const cases = projects.filter((project) => service.caseSlugs.includes(project.slug));
  const otherServices = services.filter((other) => other.slug !== service.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}${path}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: `${siteConfig.url}${path}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: [
      { "@type": "City", name: "Arequipa" },
      { "@type": "Country", name: "Perú" },
    ],
  };

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Servicios", path: "/services" },
            { name: service.name, path },
          ]),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceJsonLd)} />

      <PageHero
        eyebrow={service.eyebrow}
        title={service.heading}
        description={service.intro}
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
        note="Respuesta en 1 día hábil."
      />

      <CardGrid eyebrow="Casos de uso" title={service.useCasesTitle} items={service.useCases} />

      <CardGrid eyebrow="Qué entregamos" title={service.deliverablesTitle} items={service.deliverables} />

      {cases.length > 0 && (
        <LinkList
          eyebrow="Casos reales"
          title="Proyectos donde ya lo hicimos."
          items={cases.map((project) => ({
            href: `/work/${project.slug}`,
            title: project.title,
            meta: [project.sector, project.duration].filter(Boolean).join(" · "),
          }))}
        />
      )}

      <Faq eyebrow="Preguntas frecuentes" title={`Sobre ${service.name.toLowerCase()}.`} items={service.faqs} />

      <LinkList
        eyebrow="Otros servicios"
        items={[
          ...otherServices.map((other) => ({ href: `/services/${other.slug}`, title: other.name })),
          { href: "/logistica", title: "Automatización logística y control de despacho" },
          { href: "/services", title: "Todos los servicios y cómo trabajamos" },
        ]}
      />

      <CtaBanner
        title="Cuéntanos qué proceso quieres resolver."
        body="En una llamada de 20 minutos te decimos si se puede hacer, qué tomaría construirlo y si somos el fit correcto."
        whatsappMessage={service.whatsappMessage}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />
    </SiteChrome>
  );
}
