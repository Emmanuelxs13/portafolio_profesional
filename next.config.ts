import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['nodemailer'],
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
