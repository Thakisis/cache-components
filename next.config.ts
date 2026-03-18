import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  cacheComponents: true,
  cacheLife: {
    productCache: {
      stale: Number.MAX_SAFE_INTEGER, // máximo posible
      revalidate: Number.MAX_SAFE_INTEGER,
      // expire omitido = nunca expira (Infinity)
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactCompiler: true,
};

export default nextConfig;
