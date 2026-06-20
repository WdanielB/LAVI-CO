import { LandingSubpage } from "../_components/landing-subpage";

export default function EvaluacionPage() {
  return (
    <LandingSubpage
      badge="Evaluación"
      title="Evaluación sin costo para detectar mejoras inmediatas"
      description="Analizamos tus procesos actuales, estimamos impacto potencial y te entregamos una propuesta inicial con foco en automatización y eficiencia operacional."
      focusAreas={[
        "Análisis de madurez operativa y puntos de fricción prioritarios.",
        "Cuantificación preliminar de oportunidades de eficiencia.",
        "Definición de hipótesis de mejora con viabilidad técnica.",
      ]}
      resultBullets={[
        "Diagnóstico ejecutivo con foco en impacto y factibilidad.",
        "Estimación de retorno para toma de decisión temprana.",
        "Ruta de implementación inicial con alcance y prioridades.",
      ]}
      implementationBullets={[
        "Entrevistas estructuradas con referentes de proceso.",
        "Modelado de escenario actual versus escenario objetivo.",
        "Presentación ejecutiva con plan de acción recomendado.",
      ]}
      metricLabel="entrega del diagnóstico inicial"
      metricValue="72h"
      ctaLabel="Coordinar reunión"
      ctaHref="/login"
      secondaryCtaLabel="Ver portafolio"
      secondaryCtaHref="/portafolio"
      heroImage="/media/regina-bordon-JEiJBQYBqLY-unsplash.jpg"
      heroImageAlt="Contexto editorial para evaluación inicial"
    />
  );
}
