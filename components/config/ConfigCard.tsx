'use client'

import { useState } from 'react'
import { MdSettings, MdViewQuilt, MdDescription } from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useHeroConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import ConfigSidebar from './ConfigSidebar'

export default function ConfigCard() {
  const { config } = useAppConfig()
  const { mode: siteMode, design: designStyle, mobileType, setMobileType } = useLayoutConfig()
  const { type: heroType } = useHeroConfig()
  const { package: stylePackage } = useStyleConfig()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileConfigOpen, setIsMobileConfigOpen] = useState(false)

  // Bestimme ob HeaderKlassik verwendet wird
  const isKlassikHeader = heroType === 'split' || stylePackage === 'luxury'

  const mobileTypes = [
    { key: 'fullscreen', label: 'Vollbild', icon: MdViewQuilt },
    { key: 'sidebar', label: 'Seitenleiste', icon: MdSettings },
    { key: 'dropdown', label: 'Dropdown', icon: MdDescription }
  ]

  const summary = {
    design: isKlassikHeader ? 'Klassik' :
            designStyle === 'angular' ? 'Eckig' : 
            designStyle === 'rounded' ? 'Abgerundet' : 
            designStyle === 'modern' ? 'Modern' : 'Modern',
    color: config.theme.colorScheme === 'warm' ? 'Warm' : 
           config.theme.colorScheme === 'modern' ? 'Modern' : 
           config.theme.colorScheme === 'elegant' ? 'Elegant' : 'Nature',
    mode: siteMode === 'onepage' ? 'One-Page' : 'Multi-Page'
  }

  return (
    <>
      {/* Mobile Card Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 config-card-button"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">
                Website Designer
              </div>
              <div className="text-sm text-gray-500">
                {summary.design} • {summary.color} • {summary.mode}
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-white shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 config-card-button"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">
                Website Designer
              </div>
              <div className="text-sm text-gray-500">
                {summary.design} • {summary.color}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Navigation Config - Nur auf mobilen Geräten */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-40">
        <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Mobile Navigation
            </h3>
            <button
              onClick={() => setIsMobileConfigOpen(!isMobileConfigOpen)}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobileConfigOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          
          {isMobileConfigOpen && (
            <div className="grid grid-cols-3 gap-2">
              {mobileTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setMobileType(type.key as any)}
                  className={`flex flex-col items-center gap-1 p-2 border-2 transition-all rounded-lg ${
                    mobileType === type.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 flex items-center justify-center rounded ${
                    mobileType === type.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-medium text-gray-900 text-center">{type.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <ConfigSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}