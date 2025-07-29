'use client'

import { useState, useEffect } from 'react'

interface PromoBannerProps {
  isEnabled?: boolean
  message?: string
  ctaText?: string
  ctaLink?: string
  showCloseButton?: boolean
  autoHide?: boolean
  autoHideDelay?: number
}

export default function PromoBanner({
  isEnabled = true,
  message = "🔥 20% RABATT AUF ALLES im gesamten Juni! Jetzt Termin vereinbaren!",
  ctaText = "Jetzt buchen",
  ctaLink = "#kontakt",
  showCloseButton = true,
  autoHide = false,
  autoHideDelay = 10000
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Banner nach 500ms einblenden
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Auto-hide nach delay
    if (autoHide) {
      const hideTimer = setTimeout(() => {
        handleClose()
      }, autoHideDelay)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }

    return () => clearTimeout(showTimer)
  }, [autoHide, autoHideDelay])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsClosing(false)
    }, 300)
  }

  const handleCTAClick = () => {
    // Smooth scroll to contact section
    const element = document.getElementById('kontakt')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  if (!isVisible || !isEnabled) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[9999] transform transition-all duration-500 ease-out ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Gradient Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      {/* Banner Content */}
      <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Message */}
            <div className="flex items-center space-x-3 flex-1">
              {/* Animated Fire Icon */}
              <div className="animate-pulse">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
              </div>
              
              {/* Text mit Animation */}
              <div className="flex-1">
                <p className="text-sm sm:text-base font-semibold tracking-wide animate-pulse">
                  {message}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={handleCTAClick}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold text-sm sm:text-base hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {ctaText}
              </button>

              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                  aria-label="Banner schließen"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse"></div>
      </div>
    </div>
  )
} 