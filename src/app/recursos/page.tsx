import { LandingSubpage } from "../_components/landing-subpage";

export default function RecursosPage() {
  return (
    <LandingSubpage
      badge="Recursos"
      title="Biblioteca de casos, guias y buenas practicas"
      description="Accede a materiales claros para entender donde automatizar primero, como medir impacto y que decisiones tecnicas priorizar en cada etapa."
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
      metricLabel="tiempo de adopcion de nuevas herramientas"
      metricValue="-50%"
      ctaLabel="Comenzar con una guia"
      ctaHref="/comenzar"
    />
  );
}
