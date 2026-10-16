import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, jsonLd, pageMetadata, siteConfig } from "@/lib/site";
import { getProject, projects, siteDomain } from "@/lib/projects";
import { getService } from "@/lib/services";
import { SiteChrome } from "../../_components/site-chrome";
import { PageHero } from "../../_components/sections/page-hero";
import { Section } from "../../_components/sections/section";
import { Reveal } from "../../_components/sections/reveal";
import { LinkList } from "../../_components/sections/link-list";
import { CtaBanner } from "../../_components/sections/cta-banner";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.metaTitle,
    description: project.metaDescription,
    path: `/work/${project.slug}`,
  });
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = `/work/${project.slug}`;
  const service = getService(project.serviceSlug);
  const otherProjects = projects.filter((other) => other.slug !== project.slug);

  const rows = [
    project.problem && { label: "Problema", text: project.problem },
    { label: "Qué construimos", text: project.built },
    project.result && { label: "Resultado", text: project.result },
    { label: "Sector", text: project.sector },
    { label: "Tipo", text: project.type },
    { label: "Tecnología", text: project.stack.join(", ") },
    project.duration && { label: "Duración", text: project.duration },
    project.year && { label: "Año", text: project.year },
    project.url && { label: "Sitio web", text: siteDomain(project.url), href: project.url },
  ].filter(Boolean) as { label: string; text: string; href?: string }[];

  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteConfig.url}${path}#case`,
    name: project.title,
    headline: project.title,
    description: project.metaDescription,
    url: `${siteConfig.url}${path}`,
    image: project.images.map((image) => `${siteConfig.url}${image.src}`),
    inLanguage: "es-PE",
    keywords: [project.sector, project.type, ...project.stack].join(", "),
    creator: { "@id": `${siteConfig.url}/#organization` },
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Casos", path: "/work" },
            { name: project.title, path },
          ]),
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(caseJsonLd)} />

      <PageHero
        eyebrow={`Caso · ${project.sector}`}
        title={project.title}
        description={project.summary}
        primaryCta={{ label: "Quiero algo similar", href: "/contact" }}
        secondaryCta={{ label: "Ver todos los casos", href: "/work" }}
      />

      <Section label="El proyecto">
        <Reveal>
          <dl className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-x-6 gap-y-1 border-b border-white/15 py-4 md:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)]">
                <dt className="text-white/40">{row.label}</dt>
                <dd className="leading-relaxed text-white/80">
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                    >
                      {row.text}
                      <span aria-hidden> ↗</span>
                      <span className="sr-only"> (se abre en una pestaña nueva)</span>
                    </a>
                  ) : (
                    row.text
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section label="Capturas reales">
        <div className="space-y-10">
          {project.images.map((image, index) => (
            <Reveal key={image.src}>
              <figure>
                <div className="overflow-hidden rounded-xl border border-white/12 bg-[#11151d]">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1440px) 760px, (min-width: 1024px) 55vw, 100vw"
                      className="object-cover object-left-top"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-[13px] leading-relaxed text-white/50">{image.alt}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <LinkList
        eyebrow="Sigue explorando"
        items={[
          ...(service ? [{ href: `/services/${service.slug}`, title: service.name, meta: "Servicio relacionado" }] : []),
          ...otherProjects.map((other) => ({ href: `/work/${other.slug}`, title: other.title, meta: other.sector })),
        ]}
      />

      <CtaBanner
        title="¿Tu operación necesita algo parecido?"
        body="Cuéntanos tu caso y te decimos en una llamada cómo lo abordaríamos y por dónde empezar."
        whatsappMessage={`Hola LAVI & CO, vi el caso "${project.title}" y quiero algo similar para mi operación.`}
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />
    </SiteChrome>
  );
}
