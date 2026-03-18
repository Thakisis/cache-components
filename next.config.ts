import type { NextConfig } from "next";
const Year = 1000 * 60 * 60 * 24 * 365;
const nextConfig: NextConfig = {
  /* config options here */
  
  cacheComponents: true,
  cacheLife: {
    nuncaSeRevalida: {
      stale: Year, // 1 año
      expire: Year , // 1 poco menos de 1año
      revalidate: Year , // 1 año
    }
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactCompiler: true,
};

export default nextConfig;
