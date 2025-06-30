'use client'

import React, { useState, useEffect } from 'react'
import { 
  MdViewQuilt, 
  MdImage, 
  MdViewCarousel, 
  MdDescription,
  MdViewModule,
  MdPalette,
  MdColorLens,
  MdBrush,
  MdClose,
  MdSettings
} from 'react-icons/md'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  const [activeTab, setActiveTab] = useState('design')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  
  // Aktuelle Einstellungen beim Laden ermitteln
  useEffect(() => {
    // Site-Mode laden
    const siteMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (siteMode) {
      setCurrentSiteMode(siteMode)
    }
  }, [])

  const changeSiteMode = (mode: 'onepage' | 'multipage') => {
    localStorage.setItem('site-mode', mode)
    setCurrentSiteMode(mode)
    window.location.reload()
  }

  const changeDesignStyle = (style: 'angular' | 'rounded' | 'modern') => {
    localStorage.setItem('design-style', style)
    localStorage.setItem('demo-design-style', style)
    window.location.reload()
  }

  const changeColorScheme = (scheme: 'handwerker' | 'rot' | 'blau') => {
    localStorage.setItem('selected-color-scheme', scheme)
    localStorage.setItem('demo-color-scheme', scheme)
    window.location.reload()
  }

  const openMainConfigurator = () => {
    onClose()
    // Trigger the main configurator to open
    const configuratorButton = document.querySelector('[aria-label="Website Konfigurator öffnen"]') as HTMLButtonElement
    if (configuratorButton) {
      configuratorButton.click()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-[500px] h-[600px] flex flex-col"
        style={{ borderRadius: 'var(--radius-modal)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick-Einstellungen
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {[
            { key: 'design', label: 'Design', Icon: MdBrush },
            { key: 'layout', label: 'Umfang', Icon: MdDescription },
            { key: 'color', label: 'Farben', Icon: MdPalette }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-700 border-b-2 border-orange-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <tab.Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Design-Stil wählen</h4>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { 
                    key: 'angular', 
                    name: 'Klassisch', 
                    desc: 'Eckige Formen, traditionell', 
                    Icon: MdViewQuilt,
                    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400'
                  },
                  { 
                    key: 'rounded', 
                    name: 'Freundlich', 
                    desc: 'Runde Ecken, modern', 
                    Icon: MdImage,
                    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  },
                  { 
                    key: 'modern', 
                    name: 'Modern', 
                    desc: 'Minimalistisch, clean', 
                    Icon: MdViewCarousel,
                    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                  }
                ].map((style) => (
                  <button
                    key={style.key}
                    onClick={() => changeDesignStyle(style.key as any)}
                    className={`group p-4 border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                      false // Temporarily disable selection styling
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 flex items-center justify-center shadow-md ${style.color}`}
                        style={{ borderRadius: 'var(--radius-card)' }}>
                        <style.Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{style.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{style.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Website-Umfang</h4>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { 
                    key: 'onepage', 
                    name: 'Kompakte Website', 
                    desc: 'Alle Inhalte auf einer langen Seite', 
                    Icon: MdDescription,
                    price: '79€/mtl',
                    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  },
                  { 
                    key: 'multipage', 
                    name: 'Erweiterte Website', 
                    desc: 'Separate Unterseiten für mehr Struktur', 
                    Icon: MdViewModule,
                    price: '99€/mtl',
                    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                  }
                ].map((layout) => (
                  <button
                    key={layout.key}
                    onClick={() => changeSiteMode(layout.key as any)}
                    className={`group p-4 border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                      currentSiteMode === layout.key
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 flex items-center justify-center shadow-md ${layout.color}`}
                        style={{ borderRadius: 'var(--radius-card)' }}>
                        <layout.Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900 dark:text-white">{layout.name}</div>
                          <span className="text-xs text-orange-600 dark:text-orange-400 font-medium bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">{layout.price}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{layout.desc}</div>
                      </div>
                      {currentSiteMode === layout.key && (
                        <div className="text-orange-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Tab */}
          {activeTab === 'color' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Farbschema wählen</h4>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { 
                    key: 'handwerker', 
                    name: 'Braun-Töne', 
                    desc: 'Traditionell & vertrauenswürdig', 
                    colors: ['#8B4513', '#5D4037', '#D2691E'],
                    Icon: MdColorLens
                  },
                  { 
                    key: 'rot', 
                    name: 'Rot-Töne', 
                    desc: 'Kraftvoll & energisch', 
                    colors: ['#C62828', '#8E24AA', '#FF5722'],
                    Icon: MdBrush
                  },
                  { 
                    key: 'blau', 
                    name: 'Blau-Töne', 
                    desc: 'Professionell & vertrauensvoll', 
                    colors: ['#1565C0', '#0D47A1', '#42A5F5'],
                    Icon: MdPalette
                  }
                ].map((color) => (
                  <button
                    key={color.key}
                    onClick={() => changeColorScheme(color.key as any)}
                    className={`group p-4 border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                      false // Temporarily disable selection styling
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 shadow-md"
                        style={{ borderRadius: 'var(--radius-card)' }}>
                        <color.Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">{color.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{color.desc}</div>
                        <div className="flex gap-1">
                          {color.colors.map((colorHex, i) => (
                            <div 
                              key={i}
                              className="w-5 h-5 rounded-sm border border-gray-200 dark:border-gray-500 shadow-sm" 
                              style={{ backgroundColor: colorHex }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer with Main Configurator Button */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={openMainConfigurator}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-3"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <MdSettings className="w-5 h-5" />
            <span>Erweiterte Einstellungen</span>
          </button>
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            💡 Alle Änderungen werden sofort angewendet
          </p>
        </div>
      </div>
    </div>
  )
} 