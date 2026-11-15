import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@libsql/client/web"
  ],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
