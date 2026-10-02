/**
 * Brand mark (cube + rotated inner square) from BRANDING.md, written with inline
 * styles so it can be rendered by `ImageResponse` for icons and OG images.
 */
export function BrandMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "rgba(40, 97, 129, 0.8)",
        borderRadius: size * 0.1,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          background: "rgba(255, 255, 255, 0.2)",
          transform: "rotate(45deg)",
        }}
      />
    </div>
  );
}
