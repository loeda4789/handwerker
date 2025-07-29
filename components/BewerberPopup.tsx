'use client'

import { useState, useEffect } from 'react'

interface BewerberPopupProps {
  isEnabled?: boolean
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  showCloseButton?: boolean
  autoHide?: boolean
  autoHideDelay?: number
  showDelay?: number
}

export default function BewerberPopup({
  isEnabled = true,
  title = "Wir suchen dich!",
  subtitle = "Engagierte Mitarbeiter in unserem Team",
  ctaText = "Erfahre mehr",
  ctaLink = "#karriere",
  showCloseButton = true,
  autoHide = false,
  autoHideDelay = 15000,
  showDelay = 3000
}: BewerberPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Popup nach showDelay einblenden
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, showDelay)

    // Auto-hide nach delay
    if (autoHide) {
      const hideTimer = setTimeout(() => {
        handleClose()
      }, showDelay + autoHideDelay)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }

    return () => clearTimeout(showTimer)
  }, [autoHide, autoHideDelay, showDelay])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleCTAClick = () => {
    // Smooth scroll to career section or contact
    const element = document.getElementById('karriere') || document.getElementById('kontakt')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    handleClose()
  }

  if (!isVisible || !isEnabled) return null

  return (
    <div 
      className={`fixed bottom-4 right-4 z-[9999] transform transition-all duration-500 ease-out ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Main Popup Card */}
      <div className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm w-80"
           style={{ borderRadius: 'var(--radius-card)' }}>
        
        {/* Header mit Icon */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Animated Icon */}
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse"
                   style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
              </div>
            </div>
            
            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Popup schließen"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            Werde Teil unseres erfolgreichen Teams! Wir bieten faire Bezahlung, 
            moderne Arbeitsbedingungen und eine familiäre Atmosphäre.
          </p>
          
          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold text-sm hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            {ctaText}
          </button>
        </div>

        {/* Animated Border */}
        <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"
             style={{ borderRadius: '0 0 var(--radius-card) var(--radius-card)' }}></div>
      </div>

      {/* Floating Action Button für Mobile */}
      <div className="md:hidden mt-2">
        <button
          onClick={handleCTAClick}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          {ctaText}
        </button>
      </div>
    </div>
  )
} 