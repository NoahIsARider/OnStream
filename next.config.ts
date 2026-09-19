import type { NextConfig } from 'next';
import path from 'path';

// GitHub Pages serves a project site from /<repo>/, so the static export needs a
// basePath or every /_next/... asset 404s. Everything else — local dev, Docker,
// Vercel — is served from the root, so this is opt-in via env and defaults off.
const pagesExport = process.env.GITHUB_PAGES === 'true';
// GitHub Actions exposes the repository as "<owner>/<name>", and a Pages project
// site is served from /<name>/. Deriving the basePath from it means a repo
// rename doesn't silently break every asset URL.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const pagesBasePath =
  process.env.PAGES_BASE_PATH ?? (repoName ? `/${repoName}` : '/OnStream');

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
