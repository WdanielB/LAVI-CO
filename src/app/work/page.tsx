import type { Metadata } from "next";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CardGrid } from "../_components/sections/card-grid";
import { CtaBanner } from "../_components/sections/cta-banner";
import { CadBlueprint } from "../_components/cad-blueprint";

export const metadata: Metadata = {
  title: "Casos | LAVI & CO",
  description:
    "Los frentes de trabajo de LAVI & CO: automatización con n8n, ERP y CRM a medida, torre de control operativa, producto e I+D. Qué construimos y qué resuelve.",
};

export default function WorkPage() {
  return (
    <SiteChrome>
      <PageHero
        eyebrow="Frentes de trabajo"
        title="Lo que construimos, por frente de operación."
        description="Estos son los tipos de problema que resolvemos y qué entregamos en cada uno. ¿Reconoces alguno en tu operación? En una llamada te decimos cómo lo abordaríamos y por dónde empezar."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />

      <CardGrid
        eyebrow="Cuatro frentes de trabajo"
        title="Cuatro frentes, un mismo estándar de ejecución."
        description="Operaciones, workflows con n8n, ERP/CRM a medida e I+D. Cada frente: cuándo aparece, qué construimos y qué resuelve."
        items={[
          {
            id: "case-ops",
            eyebrow: "Operaciones",
            title: "Torre de control para operaciones en vivo",
            rows: [
              {
                label: "Cuándo",
                text: "Despacho, excepciones y visibilidad del servicio viven en canales separados; cada urgencia escala a gerencia.",
              },
              {
                label: "Qué construimos",
                text: "Una capa central de comando: estados de excepción en tiempo real, vistas de nivel de servicio y menos traspasos manuales entre planificación y ejecución.",
              },
              {
                label: "Qué resuelve",
                text: "Menos intervenciones urgentes al centralizar las reglas de ruta y servicio, con visibilidad gerencial sin trabajo extra de reporte.",
                highlight: true,
              },
            ],
          },
          {
            id: "case-n8n",
            eyebrow: "n8n / Workflows",
            title: "Integraciones que reemplazan trabajo manual",
            rows: [
              {
                label: "Cuándo",
                text: "Cotizaciones, despachos y conciliaciones dependen de copiar datos entre ERP, correo y hojas de cálculo.",
              },
              {
                label: "Qué construimos",
                text: "Workflows en n8n autohospedado: triggers por evento, reintento controlado e integraciones con Google Workspace, WhatsApp Business y bases SQL.",
              },
              {
                label: "Qué resuelve",
                text: "Tareas manuales convertidas en ejecuciones disparadas por evento, con flujos versionados y documentados que tu equipo puede mantener.",
                highlight: true,
              },
            ],
          },
          {
            id: "case-erp",
            eyebrow: "ERP / CRM a medida",
            title: "Herramientas pegadas al proceso real",
            rows: [
              {
                label: "Cuándo",
                text: "Un ERP genérico que obliga al equipo a navegar pantallas de 40 menús para tareas de dos minutos.",
              },
              {
                label: "Qué construimos",
                text: "Módulos web a medida (Next.js + PostgreSQL) sincronizados con el ERP existente por API: una pantalla para una decisión, con roles y auditoría.",
              },
              {
                label: "Qué resuelve",
                text: "El equipo trabaja cada orden en una interfaz hecha para su flujo real, con menos clics y menos errores, sin migrar el ERP.",
                highlight: true,
              },
            ],
          },
          {
            id: "case-id",
            eyebrow: "I+D / Producto",
            title: "De la idea al prototipo validado con trazabilidad",
            media: (
              <div className="aspect-[4/3] bg-[rgba(5,8,14,0.55)]">
                <CadBlueprint />
              </div>
            ),
            rows: [
              {
                label: "Cuándo",
                text: "Ciclos de desarrollo largos, con retrabajo tardío y poca trazabilidad entre diseño, prototipado y producción.",
              },
              {
                label: "Qué construimos",
                text: "Un sistema de gestión del ciclo completo: fases con criterios de paso/fallo documentados y validación temprana con protocolos de prueba.",
              },
              {
                label: "Qué resuelve",
                text: "El camino de concepto a prototipo validado se acorta al eliminar los bucles de retrabajo tardío.",
                highlight: true,
              },
            ],
          },
        ]}
      />

      <CtaBanner
        title="¿Cuál de estos se parece a tu operación?"
        body="Cuéntanos tu caso y te decimos en una llamada qué frente tendría el mayor impacto y por dónde empezar."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver servicios", href: "/services" }}
      />
    </SiteChrome>
  );
}
