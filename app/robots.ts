import type { MetadataRoute } from 'next'
 
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
    sitemap: 'https://djifcommunication.vercel.app/sitemap.xml',
  }
}