const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    taint: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        __dirname: false
      }
    }
    return config
  }
};

module.exports = withNextIntl(nextConfig);