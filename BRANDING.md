# Manual de Marca y Lineamientos de Diseño - Lavi & Co.

> **REGLA DE ORO / HARD RULE**: Este archivo contiene las definiciones estructurales inmutables de Lavi & Co. Al interactuar con el código, **JAMÁS MODIFIQUES LAS FORMAS NI EL ESQUEMA DEL LOGO** a menos que el usuario emita una orden directa y literal ("cambia el logo"). 

## 1. Paleta de Colores Oficial

El proyecto utiliza un sistema de color jerárquico, implementado a lo largo de todo el proyecto usando el `@theme` de Tailwind 4. Estas son las únicas variables de color permitidas.

| Nombre Tailwind | Código Hex | Función Visual / Uso |
| :--- | :--- | :--- |
| `primary` | `#0B0E14` | Títulos y fondo base. Autoridad y máxima legibilidad. |
| `secondary` | `#1A1E26` | Superficies, tarjetas y chrome. |
| `accent` | `#286181` | Botones y links. Llamado a la acción. |
| `panel` | `#323952` | Bloques de apoyo y separación visual. |
| `paper` | `#F3F4F6` | Texto claro y fondos tenues. |

### Arquitectura de color de interfaz (UI/UX)

| Función | HEX | Uso en la interfaz |
| :--- | :--- | :--- |
| Fondo base (Body) | `#0B0E14` | Fondo principal de toda la web. |
| Superficies (Cards) | `#323952` | Tarjetas, contenedores y secciones destacadas. |
| Acento primario | `#286181` | Botones CTA, links e iconos relevantes. |
| Texto principal | `#F3F4F6` | Titulares y párrafos sobre fondos oscuros. |
| Detalle profundo | `#000000` | Sombras, footers y líneas de separación finas. |

### Variables CSS base

```css
:root {
    --bg-main: #0b0e14;
    --bg-surface: #323952;
    --primary: #286181;
    --accent-dark: #000000;
    --text-primary: #f3f4f6;
    --text-muted: rgba(243, 244, 246, 0.7);
}
```

## 2. El Logo (Identidad inmutable)

El logo de Lavi & Co. no es un asset estático (imagen, svg), **es una construcción geométrica puramente en HTML/CSS estructurada con Tailwind**, montada directamente en los componentes de React para máxima sofisticación. 

Consta de:
1. Una base sólida `bg-primary`.
2. Un componente iconográfico isométrico a la izquierda consistente en un cubo de `20x20px` (`w-5 h-5 bg-accent/80`), con un cuadrado interno girado 45 grados (`rotate-45`).
3. El texto "LAVI & CO" con tracking cerrado en altas (`tracking-tight text-[15px] uppercase`).

### Código fuente del logo (Referencia absoluta)
```tsx
<div className="bg-primary text-white flex items-center gap-2 px-4 py-2.5 rounded shadow-lg">
    <div className="w-5 h-5 bg-accent/80 rounded-sm relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-white/20 rotate-45 transform origin-center"></div>
    </div>
    <span className="font-bold tracking-tight text-[15px] leading-none uppercase">LAVI & CO</span>
</div>
```

## 3. Formas y Jerarquías

- **Glassmorphism / Sombras**: Los contenedores flotantes (nav, pills, botones CTA) deben contar con `shadow-lg` o `drop-shadow`.
- **Radios (Border Radius)**: Ligeramente redondeados (usa `rounded` genérico) para mantener la seriedad B2B y constructiva. No abuses de `rounded-full` a menos que sean botones de call-to-action primarios.
- **Tipografía**: Font sans neutra (p. ej. `Inter`, `Geist`, o las default sanitizadas de Tailwind `font-sans`).
- **Media / Videos**: Las páginas hero deben llevar fondo multimedia (Videos autoPlay loop muted en `opacity-60` o `opacity-50`) con un overlay superior de color `primary` para garantizar legibilidad del texto blanco puro. 

---