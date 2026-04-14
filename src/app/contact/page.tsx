import { StudioShowcasePage } from "../_components/studio-showcase-page";

export default function ContactPage() {
  return (
    <StudioShowcasePage
      eyebrow="Contacto"
      title="Una línea directa para proyectos, auditorías y trabajo de producto."
      description="Si necesitas un sistema más claro, un mejor sitio o un modelo operativo más limpio, podemos empezar con una revisión breve y seguir desde ahí."
      verticalLabel="Contacto / LAVI & CO"
      heroMedia={{
        kind: "video",
        src: "/media/39892-423345743_medium.mp4",
        alt: "Visual breve en movimiento usado como fondo de la página de contacto",
        caption: "Reel de contacto / fondo en movimiento",
      }}
      heroMetrics={[
        { value: "24h", label: "respuesta", detail: "Mantenemos la primera respuesta rápida para que los proyectos no se frenen al inicio." },
        { value: "1", label: "auditoría", detail: "Un diagnóstico breve puede aclarar alcance, riesgo y el mejor primer movimiento." },
        { value: "3 sem", label: "hoja de ruta", detail: "La mayoría de los encargos empieza con un plan compacto y usable, no con un deck gigante." },
      ]}
      introNote="Empieza aquí"
      introTitle="Envíanos el contexto y armamos el primer sistema alrededor de eso."
      introBody="La página de contacto está pensada como una entrada calma: un diagnóstico breve, unas pocas métricas clave y un siguiente paso claro."
      sections={[
        {
          eyebrow: "Paso 01",
          title: "Cuenta el problema en lenguaje simple",
          body: "No necesitamos un deck largo para empezar. El objetivo es entender la presión del negocio y la fricción actual.",
          bullets: [
            "Describe el workflow que se siente lento o frágil.",
            "Cuéntanos dónde aparece el costo, el tiempo o la confusión.",
            "Incluye plazos o restricciones de lanzamiento.",
          ],
          metric: { value: "15 min", label: "llamada breve", detail: "Suficiente para definir si el proyecto necesita primero estrategia, diseño o desarrollo." },
          media: {
            kind: "image",
            src: "/media/regina-bordon-JEiJBQYBqLY-unsplash.jpg",
            alt: "Imagen editorial de contacto con un contexto humano y calmado",
            caption: "Contacto inicial / contexto humano",
          },
        },
        {
          eyebrow: "Paso 02",
          title: "Revisar el sistema y la oportunidad",
          body: "Mapeamos el estado actual, identificamos el cuello de botella real y lo convertimos en un plan breve de siguiente paso.",
          bullets: [
            "Revisión operativa y marco de oportunidad.",
            "Recomendaciones priorizadas con estimaciones de impacto.",
            "Alcance claro para un primer ciclo de entrega.",
          ],
          metric: { value: "1", label: "hoja de ruta", detail: "Un plan enfocado que el cliente realmente pueda usar y ejecutar." },
          media: {
            kind: "video",
            src: "/media/34317-400974371_medium.mp4",
            alt: "Fondo en movimiento usado para contexto de planificación y hoja de ruta",
            caption: "Hoja de ruta / planificación en movimiento",
          },
          reverse: true,
        },
        {
          eyebrow: "Paso 03",
          title: "Lanzar un primer release con impacto medible",
          body: "Una vez clara la dirección, pasamos al primer release con un alcance limpio y una métrica de éxito definida.",
          bullets: [
            "Ciclos de release pequeños con progreso visible.",
            "Un solo responsable por lado para continuidad.",
            "Puntos de revisión atados a métricas de negocio.",
          ],
          metric: { value: "0", label: "adivinanza", detail: "El proceso está pensado para reducir incertidumbre temprano, antes de que se vuelva costosa." },
          media: {
            kind: "image",
            src: "/media/victor-2PJMDIgK9EA-unsplash.jpg",
            alt: "Visual de contacto para contexto de entrega y lanzamiento",
            caption: "Lanzamiento / ejecución directa",
          },
        },
      ]}
      ctaPrimary={{ label: "Empezar con una auditoría", href: "/evaluacion" }}
      ctaSecondary={{ label: "Ver casos", href: "/work" }}
    />
  );
}
