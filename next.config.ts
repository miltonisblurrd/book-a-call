import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/book-a-call",
  assetPrefix: "/book-a-call",
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
