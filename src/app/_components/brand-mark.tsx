/**
 * Brand mark: the "L" of the wordmark with its full stop in the accent colour. Solid shapes
 * only, so it stays legible at 16px, and inline styles so `ImageResponse` can render it
 * for icons and OG images.
 */
export function BrandMark({ size, color = "#f3f4f6", accent = "#7fb6d4" }: { size: number; color?: string; accent?: string }) {
  const bar = size * 0.125;
  return (
    <div style={{ width: size, height: size, display: "flex", position: "relative" }}>
      <div style={{ position: "absolute", left: size * 0.242, top: size * 0.22, width: bar, height: size * 0.56, background: color }} />
      <div style={{ position: "absolute", left: size * 0.242, top: size * 0.655, width: size * 0.344, height: bar, background: color }} />
      <div style={{ position: "absolute", left: size * 0.633, top: size * 0.655, width: bar, height: bar, borderRadius: bar, background: accent }} />
    </div>
  );
}
