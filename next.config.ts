import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'build', // Custom output directory
  images: {
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
