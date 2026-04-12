import { LandingSubpage } from "../_components/landing-subpage";

export default function SolucionesPage() {
  return (
    <LandingSubpage
      badge="Soluciones"
      title="Soluciones digitales alineadas al negocio"
      description="Integramos analitica, software y automatizacion en un plan unico para que cada equipo opere con mas control, trazabilidad y velocidad de respuesta."
      focusAreas={[
        "Diseño de arquitectura funcional orientada a escalabilidad.",
        "Convergencia de datos y procesos entre áreas operativas y comerciales.",
        "Estandarización de flujos para reducir dispersión de criterios.",
      ]}
      resultBullets={[
        "Incremento de productividad por eliminación de tareas manuales duplicadas.",
        "Mejor calidad de información para decisiones de gestión.",
        "Mayor velocidad de respuesta frente a demanda variable.",
      ]}
      implementationBullets={[
        "Diagnóstico conjunto con líderes de cada unidad de negocio.",
        "Definición de hoja de ruta trimestral con hitos medibles.",
        "Ejecución iterativa con revisión de avance en comité ejecutivo.",
      ]}
      metricLabel="aumento de productividad en operaciones"
      metricValue="+42%"
      ctaLabel="Ver plan inicial"
      ctaHref="/comenzar"
    />
  );
}
