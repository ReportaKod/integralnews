import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

// Node.js runtime on purpose: the Edge bundle (satori + resvg + font) is over the
// 1 MB Edge Function limit of the Hobby plan.
export const runtime = 'nodejs'

// Hosts the route is allowed to fetch pages from. Anything else is rejected so
// the endpoint can't be used to make the server request arbitrary or internal URLs (SSRF).
const SITE_HOSTS = new Set(
  [
    'integralnews.vercel.app',
    'integrales-togo-news.com',
    'www.integrales-togo-news.com',
    process.env.VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_BRANCH_URL,
    // Extra hosts, comma-separated, e.g. OG_ALLOWED_HOSTS=www.example.com,example.com
    ...(process.env.OG_ALLOWED_HOSTS?.split(',').map((h) => h.trim()) ?? []),
    ...(process.env.NODE_ENV !== 'production' ? ['localhost:3000'] : []),
  ].filter((h): h is string => Boolean(h))
)

// Additional hosts allowed for the Open Graph image only
const IMAGE_HOSTS = new Set([...SITE_HOSTS, 'cdn.sanity.io'])

function isAllowedUrl(value: string | null, hosts: Set<string>): value is string {
  if (!value) return false
  try {
    const u = new URL(value)
    const isLocal = u.hostname === 'localhost' && process.env.NODE_ENV !== 'production'
    return (u.protocol === 'https:' || (isLocal && u.protocol === 'http:')) && hosts.has(u.host)
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Récupérer les paramètres
    const url = searchParams.get('url')
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const image = searchParams.get('image')

    if (!url) {
      return new Response('URL manquante', { status: 400 })
    }

    if (!isAllowedUrl(url, SITE_HOSTS)) {
      return new Response('URL non autorisée', { status: 400 })
    }

    // Récupérer les métadonnées de l'URL (pas de redirection, délai limité, taille limitée)
    const response = await fetch(url, {
      redirect: 'error',
      signal: AbortSignal.timeout(5000),
    })
    const html = (await response.text()).slice(0, 500_000)
    
    // Extraire les métadonnées Open Graph
    const ogTitle = extractMeta(html, 'property="og:title"') || title || 'Article'
    const ogDescription = extractMeta(html, 'property="og:description"') || description || ''
    const candidateImage = extractMeta(html, 'property="og:image"') || image
    const ogImage = isAllowedUrl(candidateImage ?? null, IMAGE_HOSTS) ? candidateImage : ''

    // Générer l'image Open Graph avec @vercel/og
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              height: '90%',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              padding: '40px',
            }}
          >
            {ogImage && (
              <img
                src={ogImage}
                alt=""
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '20px',
                }}
              />
            )}
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#1a1a1a',
                marginBottom: '20px',
                lineHeight: '1.2',
              }}
            >
              {ogTitle}
            </h1>
            {ogDescription && (
              <p
                style={{
                  fontSize: '24px',
                  textAlign: 'center',
                  color: '#666',
                  lineHeight: '1.4',
                  maxWidth: '800px',
                }}
              >
                {ogDescription}
              </p>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                fontSize: '18px',
                color: '#999',
              }}
            >
              Intégrales Togo News
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Erreur génération OG:', error)
    return new Response('Erreur interne', { status: 500 })
  }
}

function extractMeta(html: string, selector: string): string | null {
  const regex = new RegExp(`<meta\\s+${selector}\\s+content="([^"]*)"`, 'i')
  const match = html.match(regex)
  return match ? match[1] : null
}
