import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
