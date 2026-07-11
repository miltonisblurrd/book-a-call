import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  images: { unoptimized: true },
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
