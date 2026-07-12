import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  images: { unoptimized: true },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  async redirects() {
    return [
      {
        source: "/learn",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
