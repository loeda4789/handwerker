'use client'

import { useState, useEffect } from 'react'

interface ConfiguratorButtonProps {
  onClick: () => void
}

export default function ConfiguratorButton({ onClick }: ConfiguratorButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleInteraction = () => {
    if (isMobile) {
      // On mobile, toggle tooltip on click before opening configurator
      if (!showTooltip) {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 2000) // Hide after 2 seconds
      } else {
        onClick()
      }
    } else {
      onClick()
    }
  }

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-gray-900 text-white text-sm whitespace-nowrap shadow-lg"
            style={{ borderRadius: 'var(--radius-card)' }}>
            Website konfigurieren
          </div>
        )}
        
        {/* Button */}
        <button
          onClick={handleInteraction}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
          style={{ borderRadius: 'var(--radius-button)' }}
          onMouseEnter={() => !isMobile && setShowTooltip(true)}
          onMouseLeave={() => !isMobile && setShowTooltip(false)}
          aria-label="Website Konfigurator öffnen"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </button>
      </div>
    </div>
  )
} 