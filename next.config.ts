import type { NextConfig } from 'next';
import path from 'path';

// GitHub Pages serves a project site from /<repo>/, so the static export needs a
// basePath or every /_next/... asset 404s. Everything else — local dev, Docker,
// Vercel — is served from the root, so this is opt-in via env and defaults off.
const pagesExport = process.env.GITHUB_PAGES === 'true';
const pagesBasePath = process.env.PAGES_BASE_PATH ?? '/fakestream';

const nextConfig: NextConfig = {
  ...(pagesExport
    ? {
        output: 'export' as const,
        basePath: pagesBasePath,
        trailingSlash: true,
        // No optimizer process exists in a static export.
        images: { unoptimized: true },
      }
    : {}),
  serverExternalPackages: ['coze-coding-dev-sdk'],
  webpack: (config, { dev }) => {
    if (dev && config.cache && config.cache.type === 'filesystem') {
      config.cache.cacheDirectory = path.resolve(
        'node_modules/.cache/next-webpack',
      );
    }
    return config;
  },
  allowedDevOrigins: ['*.dev.coze.site'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
