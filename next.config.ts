import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  cacheComponents: true,
  cacheLife: {
    nuncaSeRevalida: {
      stale: 300 ,
      expire: 31536000 , // 1 poco menos de 1año
      revalidate: 31536000 , // 1 año
    }
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactCompiler: true,
};

export default nextConfig;
