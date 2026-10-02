import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLd, pageMetadata } from "@/lib/site";
import { SiteChrome } from "../_components/site-chrome";
import { PageHero } from "../_components/sections/page-hero";
import { CardGrid } from "../_components/sections/card-grid";
import { Steps } from "../_components/sections/steps";
import { Faq } from "../_components/sections/faq";
import { CtaBanner } from "../_components/sections/cta-banner";

export const metadata: Metadata = pageMetadata({
  title: "Servicios: automatización con n8n, ERP y CRM a medida",
  description:
    "Automatización con n8n, ERP y CRM a medida, desarrollo de producto e I+D aplicada. Diagnóstico en días, primer release en semanas.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: "Servicios", path: "/services" }]))}
      />
      <PageHero
        eyebrow="Servicios"
        title="Software y automatización a la medida de tu operación — no al revés."
        description="Cuatro servicios para dejar de perder horas en tareas manuales, hojas de cálculo paralelas y sistemas que no conversan entre sí."
        primaryCta={{ label: "Agenda una llamada", href: "/contact" }}
        secondaryCta={{ label: "Ver casos", href: "/work" }}
        note="Respuesta en 1 día hábil."
      />

      <CardGrid
        eyebrow="Qué hacemos"
        title="Cuatro servicios, un objetivo: que tu equipo deje de hacer trabajo de máquina."
        items={[
          {
            id: "automatizacion",
            eyebrow: "01 · Automatización",
            title: "Automatización con n8n",
            rows: [
              {
                label: "Cuándo",
                text: "Tu equipo copia datos entre sistemas, concilia a mano o responde lo mismo veinte veces al día.",
              },
              {
                label: "Entregamos",
                text: "Workflows en n8n autohospedado que conectan tu ERP, correo, hojas de cálculo y WhatsApp — versionados, monitoreados y documentados.",
              },
              {
                label: "Para qué",
                text: "Horas de trabajo manual convertidas en ejecuciones automáticas que corren solas y que tu equipo puede mantener.",
                highlight: true,
              },
            ],
          },
          {
            id: "erp-crm-a-medida",
            eyebrow: "02 · Herramientas a medida",
            title: "ERP, CRM y portales internos",
            rows: [
              {
                label: "Cuándo",
                text: "El ERP genérico empieza a doler: pantallas de 40 menús, procesos que viven en Excel porque el sistema no calza.",
              },
              {
                label: "Entregamos",
                text: "Módulos web sobre tu stack actual (SAP B1, Odoo, Defontana u otros): inventario, pedidos, cobranzas y CRM operativo, con roles y auditoría.",
              },
              {
                label: "Para qué",
                text: "Una interfaz por proceso: menos clics, menos errores y menos capacitación que en un ERP genérico.",
                highlight: true,
              },
            ],
          },
          {
            id: "desarrollo-de-producto",
            eyebrow: "03 · Producto",
            title: "Desarrollo de producto y MVP",
            rows: [
              {
                label: "Cuándo",
                text: "Tienes una idea validable o un proceso que podría ser un producto, y necesitas algo usable en semanas, no en un año.",
              },
              {
                label: "Entregamos",
                text: "Un primer release funcional con alcance cerrado y una métrica de éxito definida antes de escribir código.",
              },
              {
                label: "Para qué",
                text: "Algo funcional y usable en semanas, con visibilidad del avance en cada ciclo, en vez de un proyecto de un año.",
                highlight: true,
              },
            ],
          },
          {
            eyebrow: "04 · I+D",
            title: "I+D aplicada a producto",
            rows: [
              {
                label: "Cuándo",
                text: "Tus ciclos de desarrollo son largos, con retrabajo en validación y poca trazabilidad entre diseño, prototipo y producción.",
              },
              {
                label: "Entregamos",
                text: "Un sistema de gestión de fases con criterios de paso/fallo documentados y trazabilidad desde el brief hasta la primera corrida.",
              },
              {
                label: "Para qué",
                text: "Un camino más corto de concepto a prototipo validado, con menos retrabajo tardío y decisiones documentadas.",
                highlight: true,
              },
            ],
          },
        ]}
      />

      <Steps
        eyebrow="Cómo trabajamos"
        title="Diagnóstico en días, primer release en semanas."
        description="Sin meses de consultoría antes de ver algo funcionando. Cada ciclo termina con software en producción y una métrica que lo respalda."
        items={[
          {
            title: "Diagnóstico",
            meta: "5 días",
            body: "Mapeamos dónde pierde tiempo tu operación y elegimos el punto de mayor palanca. Sales con un documento corto, útil aunque no sigas con nosotros.",
          },
          {
            title: "Alcance y propuesta",
            meta: "Precio cerrado",
            body: "Definimos qué construimos primero, en cuánto tiempo y cuánto cuesta. Cada ciclo tiene precio cerrado: sin sorpresas por horas extra.",
          },
          {
            title: "Primer release",
            meta: "2–6 semanas",
            body: "Construimos y ponemos en producción la primera pieza. Tu equipo la usa desde el día uno; nosotros medimos y ajustamos.",
          },
          {
            title: "Medición y siguiente ciclo",
            body: "Revisamos la métrica acordada contra la línea base. Si el número acompaña, definimos el siguiente ciclo; si no, lo corregimos antes de crecer.",
          },
        ]}
      />

      <Faq
        eyebrow="Objeciones frecuentes"
        title="Lo que nos preguntan antes de empezar."
        items={[
          {
            question: "¿Tenemos que cambiar nuestro ERP?",
            answer:
              "No. En la mayoría de los casos construimos capas encima de lo que ya tienes: módulos web y automatizaciones que se sincronizan con tu ERP por API o eventos. Migrar es la última opción, no la primera.",
          },
          {
            question: "¿Cuánto cuesta un proyecto?",
            answer:
              "Trabajamos por etapas con precio cerrado por ciclo. El diagnóstico define el alcance del primer ciclo y su costo antes de comprometerte; nunca firmas un proyecto de un año a ciegas.",
          },
          {
            question: "¿Y si mi equipo no es técnico?",
            answer:
              "Todo lo que entregamos queda documentado y pensado para que tu equipo lo opere: interfaces simples, flujos monitoreados y capacitación incluida en el cierre de cada ciclo.",
          },
          {
            question: "¿Qué pasa cuando termina el proyecto?",
            answer:
              "El sistema es tuyo: código, credenciales y documentación. Si quieres, seguimos con soporte y mejoras por ciclos; si no, tu equipo puede mantenerlo sin depender de nosotros.",
          },
        ]}
      />

      <CtaBanner
        title="Cuéntanos qué tarea le roba más horas a tu equipo."
        body="En una llamada de 20 minutos te decimos si se puede automatizar, qué tomaría construirlo y si somos el fit correcto."
        whatsappMessage="Hola LAVI & CO, quiero contarles qué tarea le roba más horas a mi equipo."
        secondaryCta={{ label: "Ver casos", href: "/work" }}
      />
    </SiteChrome>
  );
}
