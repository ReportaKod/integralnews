'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { X, ChevronRight, ChevronLeft, Cookie } from 'lucide-react'

interface CookieBannerProps {
  locale: string
}

export interface CookiePreferences {
  essential: boolean // Always true, can't be disabled
  functional: boolean // Social sharing, etc.
  analytics: boolean // Vercel Analytics, etc.
  thirdParty: boolean // YouTube/Vimeo embeds, FontAwesome, etc.
  // Individual services
  socialSharing: boolean // Social sharing buttons specifically
  vercelAnalytics: boolean // Vercel Analytics specifically
  youtube: boolean // YouTube/Vimeo embeds specifically
  fontawesome: boolean // FontAwesome icons specifically
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  thirdParty: false,
  socialSharing: false,
  vercelAnalytics: false,
  youtube: false,
  fontawesome: false,
}

type BannerView = 'main' | 'essential' | 'functional' | 'analytics' | 'thirdParty'

export function CookieBanner({ locale }: CookieBannerProps) {
  const [showButton, setShowButton] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [currentView, setCurrentView] = useState<BannerView>('main')
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)
  const t = useTranslations('cookies')

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-preferences')
    
    // Show the floating button after a short delay
    setTimeout(() => setShowButton(true), 1000)
    
    // If no consent yet, auto-open banner on first visit
    if (!consent) {
      setIsFirstVisit(true)
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      functional: true,
      analytics: true,
      thirdParty: true,
      socialSharing: true,
      vercelAnalytics: true,
      youtube: true,
      fontawesome: true,
    }
    savePreferences(allAccepted)
  }

  const handleRejectAll = () => {
    savePreferences(DEFAULT_PREFERENCES)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(prefs))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    setIsFirstVisit(false)
    closeBanner()
    
    // Dispatch event for other components listening for consent
    window.dispatchEvent(new Event('cookie-consent-changed'))
  }

  const closeBanner = () => {
    setIsClosing(true)
    setTimeout(() => {
      setShowBanner(false)
      setIsClosing(false)
      setCurrentView('main') // Reset to main view when closing
    }, 300)
  }

  const openBanner = () => {
    setShowBanner(true)
    setCurrentView('main')
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return // Can't disable essential cookies
    
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: !prev[key] }
      
      // Si on modifie un service individuel, mettre à jour sa catégorie parente
      if (key === 'youtube' || key === 'fontawesome') {
        // thirdParty est true si au moins un des deux est true
        newPrefs.thirdParty = newPrefs.youtube || newPrefs.fontawesome
      } else if (key === 'socialSharing') {
        // functional est true si socialSharing est true
        newPrefs.functional = newPrefs.socialSharing
      } else if (key === 'vercelAnalytics') {
        // analytics est true si vercelAnalytics est true
        newPrefs.analytics = newPrefs.vercelAnalytics
      }
      
      return newPrefs
    })
  }

  const toggleAllInCategory = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return
    
    setPreferences((prev) => {
      const newPrefs = { ...prev, [key]: value }
      
      // Si c'est une catégorie, contrôler aussi ses services individuels
      if (key === 'thirdParty') {
        newPrefs.youtube = value
        newPrefs.fontawesome = value
      } else if (key === 'functional') {
        newPrefs.socialSharing = value
      } else if (key === 'analytics') {
        newPrefs.vercelAnalytics = value
      }
      
      return newPrefs
    })
  }

  const goToNextView = () => {
    const views: BannerView[] = ['main', 'essential', 'functional', 'analytics', 'thirdParty']
    const currentIndex = views.indexOf(currentView)
    if (currentIndex < views.length - 1) {
      setCurrentView(views[currentIndex + 1])
    } else {
      setCurrentView('main') // Loop back
    }
  }

  const goToPreviousView = () => {
    const views: BannerView[] = ['main', 'essential', 'functional', 'analytics', 'thirdParty']
    const currentIndex = views.indexOf(currentView)
    if (currentIndex > 0) {
      setCurrentView(views[currentIndex - 1])
    }
  }

  // Main view
  const renderMainView = () => (
    <div className="p-6">
      {/* Close button */}
      <button
        onClick={closeBanner}
        className="top-4 right-4 absolute text-gray-500 hover:text-gray-700 transition-colors"
        aria-label={t('close')}
      >
        <X size={20} />
      </button>

      {/* Main content */}
      <div className="pr-8">
        <h3 className="mb-3 font-bold text-gray-900 text-xl">
          {t('mainTitle')}
        </h3>
        <p className="mb-4 text-gray-600 text-sm leading-relaxed">
          {t('mainDescription')}
        </p>

        {/* Quick action info */}
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 text-sm">{t('mainChoice')}</p>
          <ul className="space-y-1 ml-6 text-gray-600 text-sm list-disc">
            <li>{t('mainChoiceAccept')}</li>
            <li>{t('mainChoiceReject')}</li>
            <li>{t('mainChoiceCustomize')}</li>
          </ul>
        </div>

        <p className="mb-4 text-gray-500 text-xs">
          {t('validityPeriod')}
        </p>

        <p className="mb-6 text-gray-600 text-sm">
          {t('moreInfo')}{' '}
          <a
            href={`/${locale}/politique-de-confidentialite`}
            className="text-blue-600 hover:underline font-medium"
          >
            {t('privacyPolicy')}
          </a>
        </p>
      </div>

      {/* Category links */}
      <div className="mb-6">
        <p className="mb-3 font-semibold text-gray-900 text-sm">{t('whyWeUseCookies')}</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCurrentView('essential')}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700 text-sm transition-colors"
          >
            {t('essential.title')} <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentView('functional')}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700 text-sm transition-colors"
          >
            {t('functional.title')} <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700 text-sm transition-colors"
          >
            {t('analytics.title')} <ChevronRight size={16} />
          </button>
          <button
            onClick={() => setCurrentView('thirdParty')}
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md font-medium text-gray-700 text-sm transition-colors"
          >
            {t('thirdParty.title')} <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleRejectAll}
          className="border-2 border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium text-gray-700 text-sm transition-colors"
        >
          {t('noThanks')}
        </button>
        <button
          onClick={() => setCurrentView('essential')}
          className="border-2 border-green-600 hover:bg-green-50 px-6 py-2.5 rounded-lg font-medium text-green-600 text-sm transition-colors"
        >
          {t('iChoose')}
        </button>
        <button
          onClick={handleAcceptAll}
          className="bg-green-600 hover:opacity-90 shadow-md px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-opacity"
        >
          {t('okForMe')}
        </button>
      </div>
    </div>
  )

  // Category detail view
  const renderCategoryView = (category: keyof CookiePreferences) => {
    const isEssential = category === 'essential'
    const isActive = preferences[category]

    return (
      <div className="p-6">
        {/* Back button */}
        <button
          onClick={() => setCurrentView('main')}
          className="top-4 left-4 absolute text-gray-500 hover:text-gray-700 transition-colors"
          aria-label={t('back')}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Close button */}
        <button
          onClick={closeBanner}
          className="top-4 right-4 absolute text-gray-500 hover:text-gray-700 transition-colors"
          aria-label={t('close')}
        >
          <X size={20} />
        </button>

        {/* Category content */}
        <div className="mt-8 mb-6">
          <h3 className="mb-3 font-bold text-gray-900 text-xl">
            {t(`${category}.title`)}
          </h3>
          <p className="mb-4 font-medium text-base text-gray-700">
            {t(`${category}.subtitle`)}
          </p>
          <p className="mb-6 text-gray-600 text-sm leading-relaxed">
            {t(`${category}.detailedDescription`)}
          </p>

          {/* Reminder to save */}
          {!isEssential && (
            <p className="text-xs text-red-600 text-center mb-4">
              {t('rememberToSave')}
            </p>
          )}

          {/* Toggle for the category */}
          {!isEssential && (
            <div className="bg-gray-50 mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleAllInCategory(category, !isActive)}
                  className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors"
                >
                  {isActive ? t('uncheckAll') : t('checkAll')}
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => togglePreference(category)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          )}

          {/* Individual cookies */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 text-sm">{t('cookiesInCategory')}</h4>
            
            {/* Cookie items specific to this category */}
            {category === 'essential' && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Session & Navigation</p>
                    <p className="mt-1 text-gray-600 text-xs">{t('essential.cookie1')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 w-5 h-5 text-green-600 rounded cursor-not-allowed opacity-50"
                  />
                </div>
              </div>
            )}

            {category === 'functional' && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Social Sharing</p>
                    <p className="mt-1 text-gray-600 text-xs">{t('functional.cookie1')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.socialSharing}
                    onChange={() => togglePreference('socialSharing')}
                    className="mt-1 w-5 h-5 text-green-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {category === 'analytics' && (
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">Vercel Analytics</p>
                    <p className="mt-1 text-gray-600 text-xs">{t('analytics.cookie1')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.vercelAnalytics}
                    onChange={() => togglePreference('vercelAnalytics')}
                    className="mt-1 w-5 h-5 text-green-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {category === 'thirdParty' && (
              <div className="space-y-4">
                {/* YouTube/Vimeo */}
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">YouTube & Vimeo</p>
                      <p className="mt-1 text-gray-600 text-xs">{t('thirdParty.cookie1')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.youtube}
                      onChange={() => togglePreference('youtube')}
                      className="mt-1 w-5 h-5 text-green-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* FontAwesome */}
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">FontAwesome</p>
                      <p className="mt-1 text-gray-600 text-xs">{t('thirdParty.cookie2')}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.fontawesome}
                      onChange={() => togglePreference('fontawesome')}
                      className="mt-1 w-5 h-5 text-green-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center border-gray-200 pt-4 border-t">
          <button
            onClick={goToPreviousView}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentView === 'essential'}
          >
            <ChevronLeft size={18} />
            {t('previous')}
          </button>
          <button
            onClick={goToNextView}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
          >
            {t('next')}
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Action buttons and cache instructions - only for non-essential categories */}
        {!isEssential && (
          <>
            {/* Cache instructions */}
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium mb-2">
                {t('cacheInstructions')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-yellow-700">
                <div className="font-mono">{t('cacheWindows')}</div>
                <div className="font-mono">{t('cacheMac')}</div>
                <div className="font-mono">{t('cacheLinux')}</div>
              </div>
              <p className="text-xs text-yellow-600 mt-2">
                {t('cacheAlternative')}
              </p>
            </div>

            {/* Bottom action buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={handleRejectAll}
                className="border-2 border-gray-300 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium text-gray-700 text-sm transition-colors"
              >
                {t('noThanks')}
              </button>
              <button
                onClick={handleSavePreferences}
                className="border-2 border-green-600 hover:bg-green-50 px-6 py-2.5 rounded-lg font-medium text-green-600 text-sm transition-colors"
              >
                {t('saveMyChoices')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-green-600 hover:opacity-90 shadow-md px-6 py-2.5 rounded-lg font-medium text-sm text-white transition-opacity"
              >
                {t('okForMe')}
              </button>
            </div>
          </>
        )}

        {/* For essential category - just a back button */}
        {isEssential && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setCurrentView('main')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors px-6 py-2.5 rounded-lg border border-green-600 hover:bg-green-50"
            >
              <ChevronLeft size={18} />
              {t('back')}
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Floating Cookie Button (Always visible) */}
      {showButton && (
        <button
          onClick={openBanner}
          className={`fixed bottom-6 left-6 z-50 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          aria-label={t('openCookieSettings')}
          title={t('manageCookies')}
        >
          <Cookie size={28} strokeWidth={2} />
        </button>
      )}

      {/* Cookie Banner Modal */}
      {showBanner && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
              isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={closeBanner}
          />
          
          {/* Banner */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 pb-4 px-4 transition-transform duration-300 ${
              isClosing ? 'translate-y-full' : 'translate-y-0'
            }`}
          >
            <div className="relative bg-white shadow-2xl border-2 border-green-600 rounded-lg mx-auto max-w-screen-xl max-h-[85vh] overflow-y-auto">
              {currentView === 'main' && renderMainView()}
              {currentView === 'essential' && renderCategoryView('essential')}
              {currentView === 'functional' && renderCategoryView('functional')}
              {currentView === 'analytics' && renderCategoryView('analytics')}
              {currentView === 'thirdParty' && renderCategoryView('thirdParty')}
            </div>
          </div>
        </>
      )}
    </>
  )
}

