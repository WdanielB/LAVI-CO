import { LandingSubpage } from "../_components/landing-subpage";

export default function ComenzarPage() {
  return (
    <LandingSubpage
      badge="Comenzar"
      title="Primer paso: evaluación de procesos clave"
      description="En esta etapa priorizamos las tareas que más impacto generan en tiempo, costo y calidad. Definimos un roadmap corto para ejecutar mejoras visibles desde el inicio."
      focusAreas={[
        "Alineación de objetivos de negocio, operación y tecnología.",
        "Detección de oportunidades con impacto financiero tangible.",
        "Definición de alcance con foco en velocidad de ejecución.",
      ]}
      resultBullets={[
        "Disminución del tiempo hasta primer resultado verificable.",
        "Mayor claridad para asignación de recursos y presupuesto.",
        "Riesgo operativo controlado desde el diseño inicial.",
      ]}
      implementationBullets={[
        "Kick-off ejecutivo con patrocinadores y responsables operativos.",
        "Plan de acción 30-60-90 con entregables y responsables definidos.",
        "Gobernanza de avance con revisión periódica de KPI.",
      ]}
      metricLabel="tiempo para lanzar primer flujo optimizado"
      metricValue="15 días"
      ctaLabel="Ir a evaluación sin costo"
      ctaHref="/evaluacion"
      secondaryCtaLabel="Ver casos"
      secondaryCtaHref="/work"
      heroImage="/media/jhonny-torrengo-hlauPhNYYLY-unsplash.jpg"
      heroImageAlt="Imagen editorial usada para la fase de inicio del proyecto"
    />
  );
}
