import { ImageResponse } from "next/og";
import { BrandMark } from "./_components/brand-mark";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0e14",
          borderRadius: 96,
        }}
      >
        <BrandMark size={300} />
      </div>
    ),
    size,
  );
}
