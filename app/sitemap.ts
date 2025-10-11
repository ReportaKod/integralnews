import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'
import { allPostsQuery } from '@/sanity/lib/queries'
import type { AllPostsQueryResult } from '@/sanity.types'

const baseUrl = 'https://djifcommunication.vercel.app'
const locales = ['fr-TG', 'fr', 'en']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all posts from Sanity
  const posts = await sanityFetch<AllPostsQueryResult>({
    query: allPostsQuery,
    stega: false,
  })

  // Static pages for each locale
  const staticPages = [
    '', // Home page
    '/posts', // All posts page
    '/reportages', // Reportages page
    '/mentions-legales', // Legal mentions
    '/politique-de-confidentialite', // Privacy policy
  ]

  // Categories found in the posts (based on theme.slug)
  const categories = ['actualite', 'economie', 'societe', 'education', 'credits']

  const sitemap: MetadataRoute.Sitemap = []

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }

    // Add category pages
    for (const category of categories) {
      sitemap.push({
        url: `${baseUrl}/${locale}/posts/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Add individual post pages
    for (const post of posts) {
      if (post.slug && post.theme?.slug) {
        sitemap.push({
          url: `${baseUrl}/${locale}/posts/${post.theme.slug}/${post.slug}`,
          lastModified: new Date(post.date),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  }

  // Add default locale redirects (without locale prefix)
  for (const page of staticPages) {
    sitemap.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : 0.8,
    })
  }

  return sitemap
}