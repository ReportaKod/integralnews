import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

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

    // Récupérer les métadonnées de l'URL
    const response = await fetch(url)
    const html = await response.text()
    
    // Extraire les métadonnées Open Graph
    const ogTitle = extractMeta(html, 'property="og:title"') || title || 'Article'
    const ogDescription = extractMeta(html, 'property="og:description"') || description || ''
    const ogImage = extractMeta(html, 'property="og:image"') || image || ''

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
