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
  async headers() {
    return [
      {
        // Apply CORS headers to API routes
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
