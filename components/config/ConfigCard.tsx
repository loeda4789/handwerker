'use client'

import { useState } from 'react'
import { MdSettings, MdPalette, MdImage, MdStar, MdBrush, MdPhone } from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useHeroConfig, useStyleConfig, useThemeConfig } from '@/contexts/AppConfigContext'
import { UNIFIED_STYLES } from '@/lib/config/unifiedStyles'
import { colorSchemes } from '@/lib/colorSchemes'
import ConfigSidebar from './ConfigSidebar'
import { MobileFeaturesNav } from '@/components/mobile'

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
          className="w-full bg-white border border-gray-200 p-3 hover:bg-gray-50 transition-all duration-200 config-card-button rounded-2xl"
          style={{ 
            minHeight: '44px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            borderRadius: '1rem'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold text-gray-900 text-lg" style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '700',
                color: '#111827'
              }}>
                Webseite anpassen
              </div>
              <div className="text-[10px] text-gray-500 font-medium leading-tight" style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                color: '#6b7280'
              }}>
                {currentStyle.name} • {currentColorScheme?.name}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div 
                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentColorScheme?.primary }}
                />
                <div 
                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
                  style={{ backgroundColor: currentColorScheme?.secondary }}
                />
                <div 
                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
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
          className="group bg-white border border-gray-200 p-4 hover:bg-gray-50 transition-all duration-200 config-card-button rounded-2xl"
          style={{ 
            minHeight: '44px', 
            minWidth: '44px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            borderRadius: '1rem'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <MdSettings className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-lg" style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '700',
                color: '#111827'
              }}>
                Webseite anpassen
              </div>
              <div className="text-[10px] text-gray-500 font-medium mb-2 leading-tight" style={{ 
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                color: '#6b7280'
              }}>
                {currentStyle.name} • {currentColorScheme?.name}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div 
                    className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
                    style={{ backgroundColor: currentColorScheme?.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
                    style={{ backgroundColor: currentColorScheme?.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded-2xl border-2 border-white shadow-lg"
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
      
      {/* Mobile Features */}
      <MobileFeaturesNav />
    </>
  )
}