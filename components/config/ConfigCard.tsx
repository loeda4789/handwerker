'use client'

import { useState } from 'react'
import { MdSettings, MdPalette, MdImage, MdStar, MdBrush } from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useHeroConfig, useStyleConfig, useThemeConfig } from '@/contexts/AppConfigContext'
import { UNIFIED_STYLES } from '@/lib/config/unifiedStyles'
import { colorSchemes } from '@/lib/colorSchemes'
import ConfigSidebar from './ConfigSidebar'

export default function ConfigCard() {
  const { config } = useAppConfig()
  const { mode: siteMode, design: designStyle, variant } = useLayoutConfig()
  const { type: heroType } = useHeroConfig()
  const { package: stylePackage } = useStyleConfig()
  const { colorScheme } = useThemeConfig()
  const [isOpen, setIsOpen] = useState(false)

  // Bestimme den aktuellen Stil
  const currentStyle = UNIFIED_STYLES.find(style => style.id === (stylePackage as any)) || UNIFIED_STYLES[0]
  const currentColorScheme = colorSchemes[colorScheme as keyof typeof colorSchemes]

  // Hero-Icons für Visualisierung
  const getHeroIcon = (type: string) => {
    switch (type) {
      case 'single': return '🖼️'
      case 'slider': return '🎠'
      case 'split': return '📱'
      default: return '🖼️'
    }
  }

  // Variant-Icons
  const getVariantIcon = (variant: string) => {
    switch (variant) {
      case 'starter': return '🚀'
      case 'professional': return '⭐'
      case 'premium': return '💎'
      default: return '🚀'
    }
  }

  return (
    <>
      {/* Mobile Card Button - Optimiert */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white shadow-xl border border-gray-200 p-4 hover:shadow-2xl transition-all duration-300 config-card-button rounded-2xl"
          style={{ minHeight: '44px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <MdSettings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-gray-900 text-lg">
                Website anpassen
              </div>
              <div className="text-sm text-gray-600">
                {currentStyle.name} • {currentColorScheme?.name} • {getVariantIcon(variant)}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1">
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: currentColorScheme?.primary }}
                />
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: currentColorScheme?.secondary }}
                />
              </div>
              <div className="text-xs text-gray-500">{getHeroIcon(heroType)}</div>
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Floating Button - Optimiert */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-white shadow-xl border border-gray-200 p-5 hover:shadow-2xl transition-all duration-300 hover:scale-105 config-card-button rounded-2xl"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <MdSettings className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-lg">
                Website anpassen
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {currentStyle.name} • {currentColorScheme?.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: currentColorScheme?.primary }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: currentColorScheme?.secondary }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: currentColorScheme?.accent }}
                  />
                </div>
                <span className="text-lg">{getHeroIcon(heroType)}</span>
                <span className="text-lg">{getVariantIcon(variant)}</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Sidebar */}
      <ConfigSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}