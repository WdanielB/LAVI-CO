import { LandingSubpage } from "../_components/landing-subpage";

export default function RecursosPage() {
  return (
    <LandingSubpage
      badge="Recursos"
      title="Biblioteca de casos, guías y buenas prácticas"
      description="Accede a materiales claros para entender dónde automatizar primero, cómo medir impacto y qué decisiones técnicas priorizar en cada etapa."
      focusAreas={[
        "Curaduría de casos aplicados por vertical e indicador de negocio.",
        "Marcos de evaluación para priorizar iniciativas de automatización.",
        "Modelos operativos de adopción y gestión del cambio.",
      ]}
      resultBullets={[
        "Aceleración del aprendizaje interno para equipos de ejecución.",
        "Reducción del tiempo de definición y arranque de proyectos.",
        "Mejora en la calidad de decisión técnica y presupuestaria.",
      ]}
      implementationBullets={[
        "Selección de material según madurez digital y objetivo estratégico.",
        "Aplicación guiada en workshops de diagnóstico por proceso.",
        "Consolidación en un playbook propio de la organización.",
      ]}
      metricLabel="tiempo de adopción de nuevas herramientas"
      metricValue="-50%"
      ctaLabel="Comenzar con una guía"
      ctaHref="/comenzar"
      secondaryCtaLabel="Casos reales"
      secondaryCtaHref="/portafolio"
      heroImage="/media/kristiina-klaas-bswjmCH5g1g-unsplash.jpg"
      heroImageAlt="Visual editorial usado para la biblioteca de recursos"
    />
  );
}
