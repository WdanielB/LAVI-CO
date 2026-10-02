import { ImageResponse } from "next/og";
import { BrandMark } from "./_components/brand-mark";

export const alt = "LAVI & CO — Automatización y software a medida para operaciones en LATAM";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f3f4f6",
          background:
            "radial-gradient(circle at 12% 18%, rgba(40,97,129,0.55), transparent 45%), radial-gradient(circle at 88% 10%, rgba(118,149,186,0.3), transparent 40%), #0b0e14",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <BrandMark size={44} />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>LAVI &amp; CO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: 940 }}>
            Menos fricción. Más control operativo.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "rgba(243,244,246,0.75)", maxWidth: 900, lineHeight: 1.35 }}>
            Automatización con n8n, ERP y CRM a medida, MVPs y sistemas logísticos.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #286181",
            paddingTop: 24,
            fontSize: 24,
            color: "rgba(243,244,246,0.65)",
          }}
        >
          <div style={{ display: "flex" }}>lavi.lat</div>
          <div style={{ display: "flex" }}>Arequipa, Perú · LATAM</div>
        </div>
      </div>
    ),
    size,
  );
}
