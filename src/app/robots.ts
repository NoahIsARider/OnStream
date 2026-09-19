import { MetadataRoute } from 'next';

// Required for `output: 'export'`: a route handler has to opt into static
// generation explicitly, otherwise the static export fails collecting its data.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
  };
}
