import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  cacheComponents: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactCompiler: true,
};

export default nextConfig;
