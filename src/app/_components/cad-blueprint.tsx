"use client";

export function CadBlueprint() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 800 1000"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Plano técnico I+D — distribución de zonas de desarrollo de producto"
      style={{ display: "block" }}
    >
      <defs>
        {/* Minor grid 25×25 */}
        <pattern id="bp-grid-minor" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#0f2a45" strokeWidth="0.3" />
        </pattern>
        {/* Major grid 100×100 nesting minor */}
        <pattern id="bp-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#bp-grid-minor)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#1a3a5c" strokeWidth="0.6" />
        </pattern>
        {/* Cross-hatch 8×8 for Validación zone */}
        <pattern id="bp-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1e4a70" strokeWidth="0.6" />
        </pattern>
        {/* Arrowhead marker */}
        <marker id="bp-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#b0bec5" />
        </marker>
        <marker id="bp-arrow-rev" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#b0bec5" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="800" height="1000" fill="#0a1628" />

      {/* Grid fill */}
      <rect width="800" height="1000" fill="url(#bp-grid-major)" opacity="0.9" />

      {/* ── Outer border (double-line CAD style) ── */}
      <rect x="20" y="20" width="760" height="960" fill="none" stroke="#1e4a70" strokeWidth="1" />
      <rect x="28" y="28" width="744" height="944" fill="none" stroke="#2a5c8a" strokeWidth="0.5" />

      {/* ══ ZONE LAYOUT ══
          Usable area: x=50..750, y=60..880  (700×820)
          Horizontal split at x=320 (DISEÑO 270w | PROTOTIPADO 430w)
          Vertical split at y=380  (top 320h | bottom 500h)
      */}

      {/* DISEÑO — top-left: x=50,y=60 w=270 h=320 */}
      <rect x="50" y="60" width="270" height="320" fill="none" stroke="#4fc3f7" strokeWidth="1.2" />

      {/* PROTOTIPADO — top-right: x=320,y=60 w=430 h=320 */}
      <rect x="320" y="60" width="430" height="320" fill="none" stroke="#4fc3f7" strokeWidth="1.2" />

      {/* VALIDACIÓN — bottom-left: x=50,y=380 w=350 h=500 */}
      <rect x="50" y="380" width="350" height="500" fill="url(#bp-hatch)" opacity="0.25" />
      <rect x="50" y="380" width="350" height="500" fill="none" stroke="#4fc3f7" strokeWidth="1.2" />

      {/* PRODUCCIÓN — bottom-right: x=400,y=380 w=350 h=500 */}
      <rect x="400" y="380" width="350" height="500" fill="none" stroke="#4fc3f7" strokeWidth="1.2" />

      {/* ── Interior detail lines ── */}
      {/* Sub-division inside DISEÑO */}
      <line x1="50" y1="160" x2="320" y2="160" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />
      <line x1="185" y1="160" x2="185" y2="380" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />

      {/* Sub-division inside PROTOTIPADO */}
      <line x1="320" y1="200" x2="750" y2="200" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />
      <line x1="530" y1="60" x2="530" y2="380" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />

      {/* Sub-division inside PRODUCCIÓN */}
      <line x1="400" y1="560" x2="750" y2="560" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />
      <line x1="575" y1="380" x2="575" y2="880" stroke="#2a5c8a" strokeWidth="0.6" strokeDasharray="6 3" />

      {/* ── Zone labels ── */}
      <text x="185" y="108" textAnchor="middle" fill="#e0f7fa" fontSize="13" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600" letterSpacing="2">DISEÑO</text>
      <text x="535" y="108" textAnchor="middle" fill="#e0f7fa" fontSize="13" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600" letterSpacing="2">PROTOTIPADO</text>
      <text x="225" y="428" textAnchor="middle" fill="#e0f7fa" fontSize="13" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600" letterSpacing="2">VALIDACIÓN</text>
      <text x="225" y="446" textAnchor="middle" fill="#80cbc4" fontSize="9" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">(ÁREA CONTROLADA)</text>
      <text x="575" y="428" textAnchor="middle" fill="#e0f7fa" fontSize="13" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600" letterSpacing="2">PRODUCCIÓN</text>

      {/* Sub-zone labels */}
      <text x="118" y="140" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">BRIEF</text>
      <text x="118" y="270" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">CONCEPTO</text>
      <text x="253" y="270" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">REVISIÓN</text>
      <text x="425" y="140" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">MODELO 3D</text>
      <text x="640" y="140" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">PRUEBA RÁPIDA</text>
      <text x="488" y="300" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">ITERACIÓN</text>
      <text x="490" y="490" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">LÍNEA PILOTO</text>
      <text x="663" y="490" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">CONTROL</text>
      <text x="490" y="720" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">ESCALA</text>
      <text x="663" y="720" textAnchor="middle" fill="#80cbc4" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" letterSpacing="1">DESPACHO</text>

      {/* ── Dimension lines ── */}
      {/* Horizontal top: total width 700 */}
      <line x1="50" y1="42" x2="750" y2="42" stroke="#b0bec5" strokeWidth="0.6" markerStart="url(#bp-arrow-rev)" markerEnd="url(#bp-arrow)" />
      <text x="400" y="38" textAnchor="middle" fill="#90caf9" fontSize="9" fontFamily="ui-monospace, 'JetBrains Mono', monospace">700 u</text>
      {/* Vertical right: total height 820 */}
      <line x1="768" y1="60" x2="768" y2="880" stroke="#b0bec5" strokeWidth="0.6" markerStart="url(#bp-arrow-rev)" markerEnd="url(#bp-arrow)" />
      <text x="784" y="474" textAnchor="middle" fill="#90caf9" fontSize="9" fontFamily="ui-monospace, 'JetBrains Mono', monospace" transform="rotate(90,784,474)">820 u</text>
      {/* Horizontal mid: DISEÑO width 270 */}
      <line x1="50" y1="395" x2="320" y2="395" stroke="#b0bec5" strokeWidth="0.5" strokeDasharray="3 2" />
      <text x="185" y="393" textAnchor="middle" fill="#90caf9" fontSize="8" fontFamily="ui-monospace, 'JetBrains Mono', monospace">270</text>
      {/* Vertical mid: top zone height 320 */}
      <line x1="35" y1="60" x2="35" y2="380" stroke="#b0bec5" strokeWidth="0.5" strokeDasharray="3 2" />
      <text x="32" y="224" textAnchor="middle" fill="#90caf9" fontSize="8" fontFamily="ui-monospace, 'JetBrains Mono', monospace" transform="rotate(-90,32,224)">320</text>

      {/* ── Callout 1: Iteración rápida → Prototipado ── */}
      <circle cx="548" cy="250" r="5" fill="none" stroke="#4fc3f7" strokeWidth="1" />
      <circle cx="548" cy="250" r="2.5" fill="#4fc3f7" />
      <line x1="553" y1="247" x2="600" y2="224" stroke="#4fc3f7" strokeWidth="0.7" />
      <rect x="601" y="210" width="118" height="24" rx="3" fill="#0a1628" stroke="#4fc3f7" strokeWidth="0.7" />
      <text x="660" y="226" textAnchor="middle" fill="#e0f7fa" fontSize="9.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">Iteración rápida</text>

      {/* ── Callout 2: Prueba controlada → Validación ── */}
      <circle cx="170" cy="560" r="5" fill="none" stroke="#4fc3f7" strokeWidth="1" />
      <circle cx="170" cy="560" r="2.5" fill="#4fc3f7" />
      <line x1="165" y1="558" x2="116" y2="534" stroke="#4fc3f7" strokeWidth="0.7" />
      <rect x="34" y="520" width="118" height="24" rx="3" fill="#0a1628" stroke="#4fc3f7" strokeWidth="0.7" />
      <text x="93" y="536" textAnchor="middle" fill="#e0f7fa" fontSize="9.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">Prueba controlada</text>

      {/* ── Callout 3: Escala gradual → Producción ── */}
      <circle cx="490" cy="650" r="5" fill="none" stroke="#4fc3f7" strokeWidth="1" />
      <circle cx="490" cy="650" r="2.5" fill="#4fc3f7" />
      <line x1="495" y1="647" x2="550" y2="620" stroke="#4fc3f7" strokeWidth="0.7" />
      <rect x="551" y="606" width="110" height="24" rx="3" fill="#0a1628" stroke="#4fc3f7" strokeWidth="0.7" />
      <text x="606" y="622" textAnchor="middle" fill="#e0f7fa" fontSize="9.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">Escala gradual</text>

      {/* ── Flow arrows between zones ── */}
      {/* DISEÑO → PROTOTIPADO */}
      <line x1="320" y1="220" x2="338" y2="220" stroke="#4fc3f7" strokeWidth="1" markerEnd="url(#bp-arrow)" opacity="0.7" />
      {/* PROTOTIPADO → VALIDACIÓN (vertical) */}
      <line x1="225" y1="380" x2="225" y2="398" stroke="#4fc3f7" strokeWidth="1" markerEnd="url(#bp-arrow)" opacity="0.7" />
      {/* VALIDACIÓN → PRODUCCIÓN (horizontal) */}
      <line x1="400" y1="630" x2="418" y2="630" stroke="#4fc3f7" strokeWidth="1" markerEnd="url(#bp-arrow)" opacity="0.7" />

      {/* ── Title block (bottom-right, CAD standard) ── */}
      <rect x="400" y="895" width="350" height="75" fill="#060e1c" stroke="#2a5c8a" strokeWidth="0.8" />
      {/* Internal dividers */}
      <line x1="400" y1="922" x2="750" y2="922" stroke="#2a5c8a" strokeWidth="0.5" />
      <line x1="400" y1="948" x2="750" y2="948" stroke="#2a5c8a" strokeWidth="0.5" />
      <line x1="570" y1="922" x2="570" y2="970" stroke="#2a5c8a" strokeWidth="0.5" />
      <line x1="660" y1="922" x2="660" y2="970" stroke="#2a5c8a" strokeWidth="0.5" />
      {/* Title block labels */}
      <text x="575" y="913" textAnchor="middle" fill="#4fc3f7" fontSize="10" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="700" letterSpacing="1">PLANTA I+D</text>
      <text x="403" y="937" fill="#80cbc4" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">PROYECTO</text>
      <text x="403" y="949" fill="#e0f7fa" fontSize="8.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">LAVI &amp; CO</text>
      <text x="403" y="963" fill="#e0f7fa" fontSize="8" fontFamily="ui-monospace, 'JetBrains Mono', monospace">Desarrollo de Producto</text>
      <text x="572" y="935" textAnchor="middle" fill="#80cbc4" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">REV.</text>
      <text x="572" y="949" textAnchor="middle" fill="#e0f7fa" fontSize="9.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600">03</text>
      <text x="572" y="963" textAnchor="middle" fill="#80cbc4" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">2026-04</text>
      <text x="662" y="935" fill="#80cbc4" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">ESCALA</text>
      <text x="662" y="949" fill="#e0f7fa" fontSize="9.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace" fontWeight="600">1:100</text>
      <text x="662" y="963" fill="#80cbc4" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">HOJA 1/1</text>

      {/* ── North arrow ── */}
      <line x1="85" y1="905" x2="85" y2="885" stroke="#4fc3f7" strokeWidth="1.2" markerEnd="url(#bp-arrow)" />
      <circle cx="85" cy="915" r="10" fill="none" stroke="#2a5c8a" strokeWidth="0.8" />
      <text x="85" y="919" textAnchor="middle" fill="#e0f7fa" fontSize="9" fontFamily="ui-monospace, 'JetBrains Mono', monospace">N</text>

      {/* ── Scale bar ── */}
      <rect x="130" y="906" width="60" height="6" fill="none" stroke="#b0bec5" strokeWidth="0.7" />
      <rect x="130" y="906" width="30" height="6" fill="#b0bec5" opacity="0.4" />
      <text x="130" y="920" fill="#90caf9" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">0</text>
      <text x="157" y="920" fill="#90caf9" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">50</text>
      <text x="185" y="920" fill="#90caf9" fontSize="7.5" fontFamily="ui-monospace, 'JetBrains Mono', monospace">100 u</text>

      {/* ── Corner marks (CAD registration marks) ── */}
      {[
        [20, 20], [780, 20], [20, 980], [780, 980]
      ].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx - 8} y1={cy} x2={cx + 8} y2={cy} stroke="#2a5c8a" strokeWidth="0.8" />
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke="#2a5c8a" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}
