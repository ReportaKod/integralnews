'use client'

import { SpeedInsights } from "@vercel/speed-insights/next"
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function ConditionalSpeedInsights() {
  const preferences = useCookieConsent()
  const vercelAnalytics = preferences?.vercelAnalytics ?? false
  
  if (!vercelAnalytics) {
    return null
  }
  
  return <SpeedInsights />
}
