import { StudioShowcasePage } from "../_components/studio-showcase-page";

export default function ServicesPage() {
  return (
    <StudioShowcasePage
      eyebrow="Servicios"
      title="Servicios diseñados alrededor de la decisión, la velocidad y la entrega."
      description="Conectamos estrategia, diseño y ejecución frontend en capas de servicio claras para que los equipos internos lancen con menos fricción y más confianza."
      verticalLabel="Servicios / LAVI & CO"
      heroMedia={{
        kind: "video",
        src: "/media/150-135737445_medium.mp4",
        alt: "Video de estilo aéreo usado como fondo principal de servicios",
        caption: "Reel de servicios / movimiento atmosférico",
      }}
      heroMetrics={[
        { value: "3", label: "capas de servicio", detail: "Del diagnóstico al desarrollo, cada capa se delimita para reducir riesgo." },
        { value: "2-4 sem", label: "ciclo de entrega", detail: "Sprints cortos y medibles que generan progreso visible sin sobredimensionar el proceso." },
        { value: "1", label: "modelo operativo", detail: "Toda la stack se diseña para seguir coherente entre equipos y releases." },
      ]}
      introNote="Modelo de servicio"
      introTitle="Cada servicio empieza con la misma pregunta: ¿qué debería volverse más fácil después del lanzamiento?"
      introBody="Evitamos paquetes genéricos. En su lugar, construimos unidades de servicio que puedan explicarse, medirse y repetirse dentro de un negocio real."
      sections={[
        {
          eyebrow: "01 / estrategia",
          title: "Marco diagnóstico antes de cualquier desarrollo",
          body: "El proyecto empieza identificando dónde el negocio pierde tiempo, claridad o margen. Eso da un punto de partida medible antes de diseñar.",
          bullets: [
            "Mapeo de workflows y entrevistas operativas.",
            "Priorización según impacto de negocio.",
            "Medidas concretas de éxito desde el día uno.",
          ],
          metric: { value: "5 días", label: "para base", detail: "Tiempo suficiente para detectar los puntos de palanca reales antes de decidir diseño." },
          media: {
            kind: "image",
            src: "/media/crystal-kwok-xD5SWy7hMbw-unsplash.jpg",
            alt: "Imagen editorial para trabajo estratégico y planificación",
            caption: "Capa estratégica / contexto de planificación",
          },
        },
        {
          eyebrow: "02 / diseño de sistemas",
          title: "Sistemas de producto que se sienten como un lenguaje operativo",
          body: "Las interfaces se diseñan para reducir ambigüedad. Componentes, estados y flujos se manejan como parte de un solo lenguaje y no como pantallas aisladas.",
          bullets: [
            "Decisiones de design system ligadas a la realidad operativa.",
            "Jerarquía clara de componentes para uso interno más rápido.",
            "Mejor estructura de contenido y gestión de estados.",
          ],
          metric: { value: "9.2/10", label: "claridad", detail: "Los usuarios internos calificaron la interfaz después del primer release listo para producción." },
          media: {
            kind: "image",
            src: "/media/philippe-bontemps-FBsKq8iOSKg-unsplash.jpg",
            alt: "Imagen minimalista y atmosférica usada para diseño de sistemas",
            caption: "Diseño de sistemas / jerarquía visual",
          },
          reverse: true,
        },
        {
          eyebrow: "03 / build y lanzamiento",
          title: "Entrega frontend con impacto medible en el despliegue",
          body: "La capa final traduce el diseño a código mantenible, con motion y comportamiento responsive ajustados al entorno real de producción.",
          bullets: [
            "Implementación organizada alrededor de secciones reutilizables.",
            "Motion reservado para orientación, énfasis y deleite.",
            "Validación en mobile, desktop y dispositivos más lentos.",
          ],
          metric: { value: "0", label: "flujos rotos", detail: "El proceso de lanzamiento se diseña para evitar regresiones y preservar continuidad." },
          media: {
            kind: "video",
            src: "/media/34317-400974371_medium.mp4",
            alt: "Video en movimiento usado para representar entrega y lanzamiento",
            caption: "Capa de build / lanzamiento a producción",
          },
        },
      ]}
      ctaPrimary={{ label: "Iniciar evaluación", href: "/comenzar" }}
      ctaSecondary={{ label: "Ver casos", href: "/work" }}
    />
  );
}
