import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CardGrid } from "../_components/sections/card-grid";
import { CtaBanner } from "../_components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Casos | LAVI & CO",
  description:
    "Proyectos reales de LAVI & CO: control de asistencia con integración Hikvision, tienda online, seguimiento de producción en tiempo real y MVP de producto.",
};

export default function WorkPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Proyectos"
        title="Lo que hemos construido para clientes reales."
        description="Cuatro proyectos, cuatro operaciones distintas. ¿Tu caso se parece a alguno? En una llamada vemos cómo lo resolveríamos."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />

      <CardGrid
        eyebrow="Proyectos reales"
        title="Cuatro proyectos, cuatro operaciones distintas."
        items={[
          {
            id: "case-maservit",
            eyebrow: "Metalmecánica · Maservit",
            title: "Control de asistencia con integración Hikvision",
            media: (
              <Image
                src="/media/Proyectos/maservit.png"
                alt="Web app de control de asistencia de Maservit"
                width={960}
                height={640}
                className="aspect-[3/2] w-full object-cover"
              />
            ),
            rows: [
              {
                label: "Problema",
                text: "El control de asistencia se hacía revisando cámaras, y tomaba mucho tiempo.",
              },
              {
                label: "Qué construimos",
                text: "Una web app desplegada en Docker en el propio servidor de la empresa, integrada con sus dispositivos Hikvision.",
              },
              {
                label: "Resultado",
                text: "Mejora en los tiempos de control.",
                highlight: true,
              },
              {
                label: "Stack",
                text: "Next.js · PostgreSQL",
              },
              {
                label: "Duración",
                text: "1 semana · 2026",
              },
            ],
          },
          {
            id: "case-vitora",
            eyebrow: "Florería · Vitora",
            title: "Tienda online con pago por Yape",
            media: (
              <Image
                src="/media/Proyectos/vitora.png"
                alt="Tienda online de la florería Vitora"
                width={960}
                height={640}
                className="aspect-[3/2] w-full object-cover"
              />
            ),
            rows: [
              {
                label: "Qué construimos",
                text: "Una tienda online con pasarela de pago Yape integrada.",
              },
              {
                label: "Resultado",
                text: "Más ventas a través de la web.",
                highlight: true,
              },
              {
                label: "Stack",
                text: "Shopify",
              },
              {
                label: "Duración",
                text: "30 días · 2025",
              },
              {
                label: "Sitio",
                text: "vitora.pe",
              },
            ],
          },
          {
            id: "case-barandas",
            eyebrow: "Metalmecánica · Proyecto confidencial",
            title: "Seguimiento de fabricación en tiempo real",
            media: (
              <div className="grid grid-cols-3 gap-0.5">
                {["barandas-1.png", "barandas-2.png", "barandas-3.png"].map((file) => (
                  <Image
                    key={file}
                    src={`/media/Proyectos/${file}`}
                    alt="Panel de seguimiento de fabricación de barandas inox"
                    width={400}
                    height={400}
                    className="aspect-square w-full object-cover"
                  />
                ))}
              </div>
            ),
            rows: [
              {
                label: "Qué construimos",
                text: "Una app para ver el estado de fabricación en tiempo real. Antes usaban un Excel que solo se actualizaba pasándose el archivo entre personas; ahora el equipo ve los resultados en vivo desde la web.",
              },
              {
                label: "Stack",
                text: "Python (backend) · React (frontend) · Supabase",
              },
              {
                label: "Duración",
                text: "1 semana · 2026",
              },
            ],
          },
          {
            id: "case-mentalabs",
            eyebrow: "Psicología · Mentalabs",
            title: "MVP de producto para una startup",
            media: (
              <div className="grid grid-cols-2 gap-0.5">
                {["mentalabs-1.png", "mentalabs-2.png"].map((file) => (
                  <Image
                    key={file}
                    src={`/media/Proyectos/${file}`}
                    alt="MVP de producto de Mentalabs"
                    width={480}
                    height={480}
                    className="aspect-square w-full object-cover"
                  />
                ))}
              </div>
            ),
            rows: [
              {
                label: "Problema",
                text: "Necesitaban organizar el negocio de forma integral — el equivalente a un ERP.",
              },
              {
                label: "Qué construimos",
                text: "El MVP inicial de producto para la startup Mentalabs.",
              },
              {
                label: "Stack",
                text: "Next.js · Supabase",
              },
            ],
          },
        ]}
      />

      <CtaBanner
        title="¿Tu operación se parece a alguno de estos casos?"
        body="Cuéntanos tu caso y te decimos en una llamada cómo lo abordaríamos y por dónde empezar."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />
    </SiteChrome>
  );
}
