import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so Netlify can publish a real index.html (fixes empty 404 deploys)
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
