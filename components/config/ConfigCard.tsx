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


  return (
    <>
      {/* Mobile Card Button - Optimiert */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border border-gray-200 p-4 hover:shadow-2xl transition-all duration-300 config-card-button rounded-2xl hover:scale-105"
          style={{ minHeight: '44px' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
              <MdSettings className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                Website anpassen
              </div>
              <div className="text-[10px] text-gray-500 font-medium leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                {currentStyle.name} • {currentColorScheme?.name}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentColorScheme?.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentColorScheme?.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentColorScheme?.accent }}
                />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Floating Button - Optimiert */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-br from-white via-gray-50 to-white shadow-xl border border-gray-200 p-5 hover:shadow-2xl transition-all duration-300 hover:scale-105 config-card-button rounded-2xl"
          style={{ minHeight: '44px', minWidth: '44px' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <MdSettings className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                Website anpassen
              </div>
              <div className="text-[10px] text-gray-500 font-medium mb-2 leading-tight" style={{ fontFamily: 'var(--font-body)' }}>
                {currentStyle.name} • {currentColorScheme?.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: currentColorScheme?.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: currentColorScheme?.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: currentColorScheme?.accent }}
                  />
                </div>
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