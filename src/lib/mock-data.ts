export type MockResult = {
  company: string;
  sector: string;
  challenge: string;
  solution: string;
  impact: string;
  metric: string;
  metricLabel: string;
  maturity: string;
};

export const mockResults: MockResult[] = [
  {
    company: "Nexa Foods",
    sector: "Industria alimentaria",
    challenge: "Quiebres frecuentes por descoordinacion entre demanda y reposicion.",
    solution: "Motor de reposicion automatizado con reglas por rotacion y criticidad.",
    impact: "-38% en tiempo de reposicion y +22% en disponibilidad de stock.",
    metric: "-38%",
    metricLabel: "tiempo de reposicion",
    maturity: "Nivel de despliegue: Escalado regional",
  },
  {
    company: "BlueRoute Ops",
    sector: "Operador logistico",
    challenge: "Alta variabilidad en tiempos de salida y baja trazabilidad de excepciones.",
    solution: "Flujo digital de despacho con alertas de SLA y priorizacion automatica.",
    impact: "+27% en cumplimiento de entregas en ventana comprometida.",
    metric: "+27%",
    metricLabel: "cumplimiento de entregas",
    maturity: "Nivel de despliegue: Operacion multi-centro",
  },
  {
    company: "Altura Distribution",
    sector: "Distribucion multisitio",
    challenge: "Procesos manuales repetitivos con baja capacidad de escalado.",
    solution: "Integracion de tareas administrativas y validaciones en una sola capa.",
    impact: "20x mas velocidad en tareas criticas de cierre operativo.",
    metric: "20x",
    metricLabel: "velocidad de cierre operativo",
    maturity: "Nivel de despliegue: Produccion estable",
  },
  {
    company: "SupplyCore LATAM",
    sector: "Cadena de suministro",
    challenge: "Decisiones tardias por informacion dispersa en multiples sistemas.",
    solution: "Tablero unificado con indicadores de servicio, costo y productividad.",
    impact: "-31% en desvios no detectados y mejora de respuesta gerencial.",
    metric: "-31%",
    metricLabel: "desvios no detectados",
    maturity: "Nivel de despliegue: Monitoreo corporativo",
  },
  {
    company: "Orion Retail Group",
    sector: "Retail y eCommerce",
    challenge: "Backoffice saturado por conciliaciones manuales y validaciones tardias.",
    solution: "Orquestacion automatica de conciliaciones y controles de excepcion.",
    impact: "-44% en esfuerzo administrativo y +18% en velocidad de cierre financiero.",
    metric: "-44%",
    metricLabel: "esfuerzo administrativo",
    maturity: "Nivel de despliegue: Operacion nacional",
  },
  {
    company: "Laboratorio Alfa",
    sector: "Manufactura / I+D",
    challenge: "Ciclos de desarrollo largos con alto retrabajo en fase de validacion.",
    solution: "Sistema de gestion de fases I+D con criterios de paso/fallo documentados y trazabilidad completa.",
    impact: "-52% en tiempo de ciclo desde concepto hasta prototipo validado.",
    metric: "-52%",
    metricLabel: "tiempo de ciclo I+D",
    maturity: "Nivel de despliegue: Produccion piloto",
  },
];

export const mockClientBrands = [
  "Nexa Foods",
  "BlueRoute Ops",
  "Altura Distribution",
  "SupplyCore LATAM",
  "Orion Retail Group",
  "Vertex ColdChain",
];

export const mockHighlights = [
  "MVP con datos simulados para demostracion comercial.",
  "Implementaciones orientadas a KPI de negocio.",
  "Diseño de despliegue por etapas con control de riesgo.",
];
