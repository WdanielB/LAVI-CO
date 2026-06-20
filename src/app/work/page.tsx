import { StudioShowcasePage } from "../_components/studio-showcase-page";
import { CadBlueprint } from "../_components/cad-blueprint";

export default function WorkPage() {
  return (
    <StudioShowcasePage
      eyebrow="Casos seleccionados"
      title="Cuando la operación crece sin sistema, el costo aparece en cada entrega."
      description="Mostramos intervenciones reales en producto, automatización con n8n y herramientas digitales a medida (ERP, CRM y portales internos) para reducir fricción, acelerar decisiones y recuperar control operativo."
      verticalLabel="Casos seleccionados / LAVI & CO"
      heroMedia={{
        kind: "video",
        src: "/media/3179-166339018_medium.mp4",
        alt: "Video aéreo usado como fondo principal para los casos seleccionados",
        caption: "Reel principal / fondo en movimiento",
      }}
      heroMetrics={[
        { value: "+31%", label: "productividad", detail: "La salida operativa mejoró tras consolidar sistemas y priorizar mejor el servicio." },
        { value: "6 sem", label: "primer release", detail: "Los ciclos de diseño y desarrollo se comprimieron gracias a un alcance más enfocado." },
        { value: "94%", label: "trazabilidad", detail: "La visibilidad mejoró en flujos, rutas y eventos de entrega." },
      ]}
      focusTracks={[
        {
          id: "track-ops",
          label: "Operaciones",
          detail: "Menos escalamientos y más control en despacho diario.",
          sectionId: "case-ops",
        },
        {
          id: "track-growth",
          label: "Comercial",
          detail: "Mejor narrativa y señales más claras para calificar demanda.",
          sectionId: "case-growth",
        },
        {
          id: "track-n8n",
          label: "n8n / Workflows",
          detail: "Orquestación de tareas con triggers, APIs y reglas claras.",
          sectionId: "case-n8n",
        },
        {
          id: "track-erp",
          label: "ERP / CRM a medida",
          detail: "Herramientas internas pegadas al proceso real, no al manual.",
          sectionId: "case-erp",
        },
        {
          id: "track-automation",
          label: "Automatización",
          detail: "Adopción gradual con impacto visible en menos de una semana.",
          sectionId: "case-automation",
        },
        {
          id: "track-id",
          label: "I+D / Producto",
          detail: "Metodología desde concepto hasta prototipo validado con trazabilidad de fases.",
          sectionId: "case-id",
        },
      ]}
      introNote="Biblioteca de casos"
      introTitle="Seis frentes, un solo estándar: resultados medibles con menos ruido operativo."
      introBody="Primero elegí el frente que más te duele —operaciones, comercial, workflows con n8n, ERP/CRM a medida, automatización o I+D de producto. Después podés entrar en la narrativa completa del caso para revisar decisión, ejecución e impacto."
      sections={[
        {
          id: "case-ops",
          eyebrow: "Caso 01",
          audience: "Para líderes de operaciones",
          title: "Torre de control para operaciones en vivo",
          body: "Se introdujo una capa central de comando para alinear despacho, manejo de excepciones y visibilidad del servicio en un solo ritmo operativo.",
          bullets: [
            "Reducimos traspasos manuales entre planificación y ejecución.",
            "Introdujimos estados de excepción en tiempo real y vistas de nivel de servicio.",
            "Mejoramos la visibilidad de liderazgo sin sumar trabajo de reporte.",
          ],
          metric: { value: "-27%", label: "escalamientos manuales", detail: "Hubo menos intervenciones urgentes una vez centralizadas las reglas de ruta y servicio." },
          media: {
            kind: "image",
            src: "/media/tecnic-bioprocess-solutions-SQkt_CJ-ARs-unsplash.jpg",
            alt: "Visual industrial usado para representar un sistema de torre de control",
            caption: "Centro de comando operativo / contexto industrial",
          },
        },
        {
          id: "case-growth",
          eyebrow: "Caso 02",
          audience: "Para equipos comerciales",
          title: "Experiencia comercial con señales de conversión más claras",
          body: "Se reestructuró un sitio comercial para contar la historia correcta en el orden correcto, dando a cada sección una sola tarea y una medida de éxito.",
          bullets: [
            "Rehicimos la arquitectura de información alrededor de la intención, no de la decoración.",
            "Ajustamos el copy para reducir carga cognitiva y aumentar claridad.",
            "Alineamos la jerarquía de CTA con el recorrido real del comprador.",
          ],
          metric: { value: "+18%", label: "leads calificados", detail: "Un mejor orden y un ritmo visual más fuerte elevaron la calidad del interés entrante." },
          media: {
            kind: "image",
            src: "/media/jhonny-torrengo-hlauPhNYYLY-unsplash.jpg",
            alt: "Imagen oscura de producto y arquitectura usada para narrativa comercial",
            caption: "Experiencia comercial / layout narrativo",
          },
          reverse: true,
        },
        {
          id: "case-n8n",
          eyebrow: "Caso 03",
          audience: "Para equipos sin tiempo para tareas repetitivas",
          title: "Workflows con n8n: integraciones que reemplazan trabajo manual",
          body: "Diseñamos y desplegamos workflows en n8n autohospedado para conectar ERP, correo, hojas de cálculo, Slack y APIs internas. Cada flujo nace de una tarea repetitiva con horas medibles, no de una idea genérica de automatizar.",
          bullets: [
            "Triggers por evento, webhook o cron con reintento controlado y manejo de errores.",
            "Integraciones con Google Workspace, WhatsApp Business, ERPs SaaS y bases SQL/NoSQL.",
            "Workflows versionados, monitoreados y documentados para que el equipo los pueda mantener.",
          ],
          metric: { value: "120h", label: "ahorradas al mes", detail: "Doce flujos de back-office (cotizaciones, despachos y conciliación) bajaron de tareas manuales a ejecuciones disparadas por evento." },
          media: {
            kind: "image",
            src: "/media/american-public-power-association-bv2pvCGMtzg-unsplash.jpg",
            alt: "Imagen de infraestructura conectada usada como metáfora de orquestación de workflows",
            caption: "n8n self-hosted / orquestación de eventos",
          },
        },
        {
          id: "case-erp",
          eyebrow: "Caso 04",
          audience: "Para empresas con ERP genérico que no calza",
          title: "Herramientas digitales a medida: ERP y CRM pegados al proceso real",
          body: "Cuando el ERP genérico empieza a doler, no siempre toca migrar — a veces toca construir capas a medida sobre lo que ya hay. Diseñamos módulos web para inventario, pedidos, cobranzas y CRM operativo conectados al stack actual.",
          bullets: [
            "Módulos en Next.js + PostgreSQL/Supabase con autenticación por rol y auditoría de cambios.",
            "Interfaces enfocadas: una pantalla para una decisión, sin menús de 40 ítems.",
            "Sincronización con ERP existente (SAP B1, Odoo, Defontana, etc.) vía API o eventos n8n.",
          ],
          metric: { value: "-43%", label: "tiempo de operación", detail: "El equipo de pedidos pasó de 11 minutos por orden en pantallas genéricas a 6 minutos en una interfaz hecha para su flujo real." },
          media: {
            kind: "image",
            src: "/media/jonan-steiner-exwO5Ssl6-U-unsplash.jpg",
            alt: "Imagen editorial usada para representar herramientas internas a medida",
            caption: "ERP/CRM a medida / capas sobre el stack actual",
          },
          reverse: true,
        },
        {
          id: "case-automation",
          eyebrow: "Caso 05",
          audience: "Para tecnología y transformación",
          title: "Despliegue de automatización con control para los equipos",
          body: "La capa de automatización se introdujo sin romper el ritmo de los equipos existentes, por lo que la adopción se sintió como una mejora del sistema y no como una migración forzada.",
          bullets: [
            "Mapeamos las rutas críticas antes de introducir lógica de automatización.",
            "Usamos métricas para seguir el impacto del despliegue semana a semana.",
            "Mantuvimos la interfaz estable mientras el backend cambiaba por debajo.",
          ],
          metric: { value: "48h", label: "para insight vivo", detail: "La visibilidad operativa quedó disponible en dos días desde el despliegue." },
          media: {
            kind: "video",
            src: "/media/39892-423345743_medium.mp4",
            alt: "Visual animado usado para representar despliegue y movimiento",
            caption: "Movimiento de despliegue / adopción del sistema",
          },
        },
        {
          id: "case-id",
          eyebrow: "Caso 06",
          audience: "Para equipos de desarrollo de producto",
          title: "I+D: De la idea al prototipo validado con metodología trazable",
          body: "Implementamos un sistema de gestión de ciclo de desarrollo que conecta diseño, prototipado, validación y producción inicial en un flujo único con métricas en cada etapa.",
          bullets: [
            "Trazabilidad completa del ciclo: desde brief hasta primera corrida de producción.",
            "Revisiones de diseño asistidas por datos con criterios de paso/fallo documentados.",
            "Reducción de retrabajo mediante validación temprana y protocolos de prueba estructurados.",
          ],
          metric: {
            value: "-52%",
            label: "tiempo de ciclo I+D",
            detail: "El tiempo desde concepto hasta prototipo validado se redujo al estandarizar las fases de revisión y eliminar los bucles de retrabajo tardío.",
          },
          media: {
            kind: "component",
            node: <CadBlueprint />,
            caption: "Plano técnico I+D / distribución de zonas de desarrollo",
          },
          reverse: true,
        },
      ]}
      ctaPrimary={{ label: "Agendar evaluación", href: "/evaluacion" }}
      ctaSecondary={{ label: "Explorar servicios", href: "/services" }}
      finalCtaPrimary={{ label: "Solicitar diagnóstico operativo", href: "/evaluacion" }}
      finalCtaSecondary={{ label: "Revisar enfoque de servicio", href: "/services" }}
    />
  );
}
