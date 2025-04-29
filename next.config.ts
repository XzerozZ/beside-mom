import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vjbnjkvrtsdckisfguzf.supabase.co',
        pathname: '/storage/v1/object/public/**', // allow anything under this path
      },
    ],
  },
};

export default nextConfig;
