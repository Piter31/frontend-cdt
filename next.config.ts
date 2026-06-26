import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow all HTTPS images from common CDN and media hosts
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;