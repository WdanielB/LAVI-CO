import { StudioShowcasePage } from "../_components/studio-showcase-page";

export default function WorkPage() {
  return (
    <StudioShowcasePage
      eyebrow="Casos seleccionados"
      title="Diseñamos sistemas que convierten el caos operativo en performance visible."
      description="Una selección curada de proyectos de producto, automatización y web, pensados alrededor de métricas reales, entregas más limpias y mejores decisiones bajo presión."
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
      introNote="Biblioteca de casos"
      introTitle="Tres tipos de proyecto, un solo estándar: resultados medibles con menos ruido operativo."
      introBody="Los ejemplos de abajo no son maquetas decorativas. Son narrativas de caso estructuradas para mostrar problema, intervención e impacto medible."
      sections={[
        {
          eyebrow: "Caso 01",
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
          eyebrow: "Caso 02",
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
          eyebrow: "Caso 03",
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
      ]}
      ctaPrimary={{ label: "Agendar evaluación", href: "/evaluacion" }}
      ctaSecondary={{ label: "Ver servicios", href: "/services" }}
    />
  );
}
