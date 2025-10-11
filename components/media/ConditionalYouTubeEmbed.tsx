'use client'

import { YouTubeEmbed } from '@next/third-parties/google'
import { useCookieConsent } from '@/hooks/useCookieConsent'

interface ConditionalYouTubeEmbedProps {
  videoid: string
  height?: number
  params?: string
  playlabel?: string
  style?: string
  title?: string
}

export function ConditionalYouTubeEmbed({ 
  videoid, 
  height = 400, 
  params = "controls=0", 
  playlabel, 
  style = "border-radius: 0.5rem; overflow: hidden;",
  title 
}: ConditionalYouTubeEmbedProps) {
  const preferences = useCookieConsent()
  const youtube = preferences?.youtube ?? false
  
  if (!youtube) {
    return (
      <div className="w-full h-auto bg-gray-100 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="text-4xl">🔒</div>
          <h3 className="text-lg font-semibold text-gray-700">
            Contenu vidéo bloqué
          </h3>
          <p className="text-gray-600 text-sm max-w-md">
            Cette vidéo YouTube nécessite votre consentement aux cookies (icône verte en bas à gauche)
          </p>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">
              <strong>Titre :</strong> {title || 'Vidéo YouTube'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              ID: {videoid}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="w-full h-auto">
      <YouTubeEmbed
        videoid={videoid}
        height={height}
        params={params}
        playlabel={playlabel || `Play ${title || 'video'}`}
        style={style}
      />
    </div>
  )
}
