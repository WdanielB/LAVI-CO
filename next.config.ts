import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/portafolio", destination: "/work", permanent: true },
      { source: "/soluciones", destination: "/services", permanent: true },
      { source: "/automatizacion", destination: "/services", permanent: true },
      { source: "/comenzar", destination: "/contact", permanent: true },
      { source: "/evaluacion", destination: "/contact", permanent: true },
      { source: "/recursos", destination: "/contact", permanent: true },
      { source: "/login", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
