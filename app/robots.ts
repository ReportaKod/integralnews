import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/studio/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/studio/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}