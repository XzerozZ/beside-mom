import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vjbnjkvrtsdckisfguzf.supabase.co',
        pathname: '/storage/v1/object/public/**', // allow anything under this path
      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',
        pathname: '/th/id/**', 
      },
      {
        protocol: 'https',
        hostname: 'parade.com',
        pathname: '/.image/**', // allow parade images
      }
    ],
  },
};

export default nextConfig;
