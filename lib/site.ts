/**
 * Canonical public address of the site, used for the sitemap, robots.txt and
 * Open Graph URLs. Override with NEXT_PUBLIC_SITE_URL (e.g. for a staging site).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.integrales-togo-news.com'
).replace(/\/$/, '')
