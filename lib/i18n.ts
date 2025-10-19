/**
 * Normalize locale to match Sanity language field
 * Maps fr-TG and fr to 'fr' for Sanity queries
 */
export function normalizeSanityLocale(locale: string): 'fr' | 'en' {
  // Map fr-TG to fr for Sanity
  if (locale.startsWith('fr')) {
    return 'fr';
  }
  return 'en';
}

/**
 * Get Sanity language from Next.js locale
 */
export function getSanityLanguage(locale: string): string {
  return normalizeSanityLocale(locale);
}


