import { withContentlayer } from "next-contentlayer";

import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // CORS 헤더 설정 추가
  async headers() {
    return [
      {
        source: '/site.webmanifest', // site.webmanifest 파일에 적용
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*' // 모든 출처에서의 접근 허용
          },
        ],
      },
    ];
  },
};

export default withContentlayer(nextConfig);
