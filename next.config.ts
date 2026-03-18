import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
