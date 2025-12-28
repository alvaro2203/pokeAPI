import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

export default nextConfig;
