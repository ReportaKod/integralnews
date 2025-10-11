'use client'

import { useEffect } from 'react'
import { useCookieConsent } from '@/hooks/useCookieConsent'

export function ConditionalFontAwesome() {
  const preferences = useCookieConsent()
  const fontawesome = preferences?.fontawesome ?? false

  useEffect(() => {
    if (!fontawesome) {
      // Désactiver FontAwesome en supprimant les styles
      const fontAwesomeStyles = document.querySelectorAll('link[href*="fontawesome"], style[data-fa]')
      fontAwesomeStyles.forEach(style => {
        if (style instanceof HTMLLinkElement) {
          style.disabled = true
        } else if (style instanceof HTMLStyleElement) {
          style.textContent = ''
        }
      })
    } else {
      // Réactiver FontAwesome
      const fontAwesomeStyles = document.querySelectorAll('link[href*="fontawesome"], style[data-fa]')
      fontAwesomeStyles.forEach(style => {
        if (style instanceof HTMLLinkElement) {
          style.disabled = false
        }
      })
    }
  }, [fontawesome])

  return null
}
