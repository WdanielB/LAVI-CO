import { StudioShowcasePage } from "../_components/studio-showcase-page";

export default function AboutPage() {
  return (
    <StudioShowcasePage
      eyebrow="Nosotros"
      title="Un estudio pequeño, con foco preciso y estándar alto."
      description="Trabajamos cerca del problema, mantenemos el proceso transparente y tratamos cada release como un sistema que debe sostenerse en el mundo real."
      verticalLabel="Nosotros / LAVI & CO"
      heroMedia={{
        kind: "image",
        src: "/media/adrienguh-wvagVtn3GGk-unsplash.jpg",
        alt: "Imagen editorial de costa usada para enmarcar la sección de nosotros",
        caption: "Clima del estudio / contexto calmo",
      }}
      heroMetrics={[
        { value: "8", label: "disciplinas", detail: "Estrategia, diseño, frontend, automatización y decisiones de producto trabajadas en conjunto." },
        { value: "24h", label: "respuesta", detail: "El estudio está estructurado para moverse rápido cuando un proyecto necesita impulso." },
        { value: "1", label: "punto de contacto", detail: "Una sola responsabilidad mantiene el proceso simple para clientes y colaboradores." },
      ]}
      introNote="Identidad del estudio"
      introTitle="Mantenemos el equipo pequeño para que el pensamiento siga afilado y la salida siga coherente."
      introBody="El objetivo no es parecer ocupados. Es construir trabajo que se vea deliberado, funcione sin fricción y sostenga al negocio después del lanzamiento."
      sections={[
        {
          eyebrow: "Principio 01",
          title: "Trabajar cerca del problema",
          body: "Evitamos la dirección abstracta sin contexto. Cada decisión se ancla en el workflow real, las restricciones y los resultados del negocio.",
          bullets: [
            "Los briefs se reducen a lo que realmente importa.",
            "El equipo trabaja desde restricciones reales y no desde supuestos.",
            "El contexto de negocio se mantiene visible durante toda la entrega.",
          ],
          metric: { value: "-40%", label: "iteración desperdiciada", detail: "Un alcance más preciso reduce churn de diseño y ciclos de revisión innecesarios." },
          media: {
            kind: "image",
            src: "/media/kristiina-klaas-bswjmCH5g1g-unsplash.jpg",
            alt: "Imagen suave de paisaje usada para enmarcar principios del estudio",
            caption: "Principios / lectura cercana",
          },
        },
        {
          eyebrow: "Principio 02",
          title: "Mantener el proceso visible y simple",
          body: "Los clientes deberían saber qué está pasando, qué viene después y dónde está el riesgo. La claridad es parte del servicio, no un efecto colateral.",
          bullets: [
            "Puntos de control transparentes de planificación y entrega.",
            "Traspasos claros entre estrategia y ejecución.",
            "Reglas simples para alcance, feedback y release.",
          ],
          metric: { value: "5", label: "etapas", detail: "Cada encargo se organiza en pocas fases entendibles." },
          media: {
            kind: "video",
            src: "/media/150-135737445_medium.mp4",
            alt: "Fondo en movimiento usado para representar visibilidad del proceso",
            caption: "Proceso / ritmo y transparencia",
          },
          reverse: true,
        },
        {
          eyebrow: "Principio 03",
          title: "Entregar trabajo que siga funcionando",
          body: "El resultado final se mide por si sigue teniendo sentido cuando la novedad se va. Los buenos sistemas sostienen su forma bajo uso real.",
          bullets: [
            "Comportamiento responsive verificado en distintos breakpoints.",
            "Motion limitado a momentos intencionales.",
            "Diseño y código mantenibles para equipos futuros.",
          ],
          metric: { value: "12+", label: "entregas", detail: "El enfoque del estudio está pensado para lanzamientos repetidos, no para trucos visuales aislados." },
          media: {
            kind: "image",
            src: "/media/nick-QrVQ69lZx5o-unsplash.jpg",
            alt: "Imagen editorial usada para contexto de envío y entrega",
            caption: "Entrega / salida duradera",
          },
        },
      ]}
      ctaPrimary={{ label: "Iniciar proyecto", href: "/comenzar" }}
      ctaSecondary={{ label: "Ver servicios", href: "/services" }}
    />
  );
}
