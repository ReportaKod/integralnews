'use client'

import { useCookieConsent } from '@/hooks/useCookieConsent'
import SocialShare, { SocialShareProps } from './SocialShare'

export default function ConditionalSocialShare(props: SocialShareProps) {
  const preferences = useCookieConsent()
  const socialSharing = preferences?.socialSharing ?? false
  
  if (!socialSharing) {
    return (
      <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-600 text-sm">
        <span>🔒</span>
        <span>Le partage social nécessite votre consentement aux cookies (icône verte en bas à gauche)</span>
      </div>
    )
  }
  
  return <SocialShare {...props} />
}
