import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, pageMetadata } from "@/lib/site";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CardGrid } from "../_components/sections/card-grid";
import { SplitFeature } from "../_components/sections/split-feature";
import { SectionHeading } from "../_components/sections/section-heading";
import { Steps } from "../_components/sections/steps";
import { CtaBanner } from "../_components/sections/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "Automatización logística y control de despacho",
  description:
    "Sistemas para operaciones logísticas y de planta: torre de control de despacho, reposición automática por reglas y trazabilidad de punta a punta.",
  path: "/logistica",
});

export default function LogisticaPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Logística", path: "/logistica" }]))}
      />
      <PageHero
        eyebrow="Servicio B2B · Automatización logística"
        title="Menos quiebres de stock, despachos a tiempo y trazabilidad de punta a punta."
        description="Sistemas para operaciones logísticas y de planta: visibilidad en un solo tablero, alertas de SLA y reposición automática por reglas. Tu operación deja de reaccionar y empieza a anticiparse."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />

      <CardGrid
        eyebrow="El problema"
        title="Los tres problemas que más cuestan en logística."
        columns={3}
        items={[
          {
            eyebrow: "Stock",
            title: "Quiebres por descoordinación",
            body: "Demanda y reposición corren en sistemas separados. Cuando el quiebre se nota, ya costó ventas y el reabastecimiento llega tarde.",
          },
          {
            eyebrow: "Despacho",
            title: "Salidas tardías sin trazabilidad",
            body: "Alta variabilidad en tiempos de salida y excepciones que nadie ve hasta que el cliente reclama. El SLA se cumple por heroísmo, no por sistema.",
          },
          {
            eyebrow: "Decisión",
            title: "Información dispersa, decisiones lentas",
            body: "Servicio, costo y productividad viven en reportes distintos que llegan a fin de mes. Los desvíos se detectan cuando ya son caros.",
          },
        ]}
      />

      <section className="pb-4">
        <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
          <SectionHeading
            eyebrow="La solución"
            title="Qué construimos."
            description="Tres piezas que se despliegan por separado o en conjunto, siempre sobre los sistemas que ya tienes."
          />
        </div>
        <SplitFeature
          eyebrow="01 · Despacho"
          title="Torre de control de despacho"
          body="Un flujo digital de despacho con estados en tiempo real: cada salida, cada excepción y cada compromiso de entrega visibles en una sola pantalla."
          bullets={[
            "Alertas de SLA antes del incumplimiento, no después.",
            "Priorización automática de salidas por ventana comprometida.",
            "Historial trazable de cada excepción y su resolución.",
          ]}
        />
        <SplitFeature
          eyebrow="02 · Inventario"
          title="Motor de reposición por reglas"
          body="Reposición automática calculada por rotación y criticidad de cada SKU. El sistema propone; tu equipo aprueba con un clic o deja que corra solo."
          bullets={[
            "Reglas por rotación, criticidad y estacionalidad.",
            "Órdenes de reposición generadas y enviadas sin digitación.",
            "Cobertura de stock visible por SKU y por centro.",
          ]}
        />
        <SplitFeature
          eyebrow="03 · Gestión"
          title="Tablero de servicio y costo"
          body="Un solo tablero con indicadores de servicio, costo y productividad, alimentado por tus sistemas actuales. Los desvíos aparecen el día que ocurren."
          bullets={[
            "Indicadores unificados desde ERP, WMS y hojas operativas.",
            "Alertas de desvío con umbral configurable por gerencia.",
            "Lectura diaria en 5 minutos, sin armar reportes a mano.",
          ]}
        />
      </section>

      <Steps
        eyebrow="Despliegue"
        title="Se despliega por etapas, sin frenar tu operación."
        description="Cada etapa entra en producción antes de empezar la siguiente. Tu operación nunca se detiene por el proyecto."
        items={[
          {
            title: "Unificar la lectura operativa",
            meta: "Semanas 1–3",
            body: "Conectamos tus fuentes de datos y dejamos un tablero único funcionando. Desde aquí ya ves la operación en un solo pulso.",
          },
          {
            title: "Automatizar decisiones repetitivas",
            meta: "Semanas 4–8",
            body: "Las decisiones de alto costo y baja complejidad — reposición, priorización de salidas, alertas — pasan a reglas automáticas supervisadas.",
          },
          {
            title: "Escalar con control",
            meta: "En adelante",
            body: "Con la base estable, escalamos a más centros y más flujos cuidando margen y nivel de servicio. Si tu operación crece, el sistema crece con ella.",
          },
        ]}
      />

      <CtaBanner
        title="¿Tu operación creció más rápido que tu sistema?"
        body="Cuéntanos cómo mueves stock y despachos hoy. En una llamada de 20 minutos te decimos qué pieza tendría el mayor impacto."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />
    </SiteChrome>
  );
}
