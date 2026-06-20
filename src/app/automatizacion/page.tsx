import { LandingSubpage } from "../_components/landing-subpage";

export default function AutomatizacionPage() {
  return (
    <LandingSubpage
      badge="Automatización"
      title="Resultados medibles en semanas, no en meses"
      description="Diseñamos automatizaciones a medida para tareas operativas repetitivas. El objetivo es liberar capacidad del equipo y reducir errores humanos en procesos críticos del negocio."
      focusAreas={[
        "Relevamiento ejecutivo de procesos con mayor carga operativa.",
        "Rediseño de circuitos críticos con automatización y controles de calidad.",
        "Integración con sistemas actuales para continuidad sin fricción.",
      ]}
      resultBullets={[
        "Disminución sostenida de tiempos de ciclo en tareas repetitivas.",
        "Reducción de errores operativos en puntos de alto riesgo.",
        "Mayor trazabilidad para auditoría y toma de decisiones.",
      ]}
      implementationBullets={[
        "Inicio con un frente piloto de alto retorno y bajo riesgo.",
        "Escalado por etapas con gobierno de cambios y adopción interna.",
        "Seguimiento de KPI semanales con mesa de mejora continua.",
      ]}
      metricLabel="reducción promedio del tiempo operativo"
      metricValue="20x"
      ctaLabel="Solicitar evaluación"
      ctaHref="/evaluacion"
      secondaryCtaLabel="Ver logística"
      secondaryCtaHref="/logistica"
      heroImage="/media/tecnic-bioprocess-solutions-SQkt_CJ-ARs-unsplash.jpg"
      heroImageAlt="Visual industrial usado para automatización"
    />
  );
}
