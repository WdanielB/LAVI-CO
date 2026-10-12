import { ImageResponse } from "next/og";
import { BrandMark } from "./_components/brand-mark";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Full-bleed square with no transparent corners: browsers and Google crop or round it themselves.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b0e14" }}>
        <BrandMark size={512} />
      </div>
    ),
    size,
  );
}
