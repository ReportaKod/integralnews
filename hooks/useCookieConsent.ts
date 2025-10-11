'use client'

import { useState, useEffect } from 'react'
import { CookiePreferences, DEFAULT_PREFERENCES } from '@/components/cookies/CookieBanner'

export function useCookieConsent(): CookiePreferences {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    const checkConsent = () => {
      try {
        const stored = localStorage.getItem('cookie-preferences')
        if (stored) {
          const parsed = JSON.parse(stored)
          setPreferences(parsed)
        } else {
          setPreferences(DEFAULT_PREFERENCES)
        }
      } catch (error) {
        console.warn('Error parsing cookie preferences:', error)
        setPreferences(DEFAULT_PREFERENCES)
      }
    }

    checkConsent()

    // Listen for consent changes
    window.addEventListener('cookie-consent-changed', checkConsent)
    return () => window.removeEventListener('cookie-consent-changed', checkConsent)
  }, [])

  return preferences
}

// Hook pour vérifier si un service spécifique est autorisé
export function useServiceConsent(service: keyof CookiePreferences): boolean {
  const preferences = useCookieConsent()
  return preferences[service]
}

// Hook pour vérifier si les analytics sont autorisés
export function useAnalyticsConsent(): boolean {
  return useServiceConsent('analytics')
}

// Hook pour vérifier si les services tiers sont autorisés
export function useThirdPartyConsent(): boolean {
  return useServiceConsent('thirdParty')
}

// Hook pour vérifier si les fonctionnalités sont autorisées
export function useFunctionalConsent(): boolean {
  return useServiceConsent('functional')
}

// Hooks pour les services individuels
export function useSocialSharingConsent(): boolean {
  return useServiceConsent('socialSharing')
}

export function useVercelAnalyticsConsent(): boolean {
  return useServiceConsent('vercelAnalytics')
}

export function useYouTubeConsent(): boolean {
  return useServiceConsent('youtube')
}

export function useFontAwesomeConsent(): boolean {
  return useServiceConsent('fontawesome')
}
