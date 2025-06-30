'use client'

import React, { useState, useEffect } from 'react'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  const [activeTab, setActiveTab] = useState('design')
  const [currentHeroType, setCurrentHeroType] = useState<string>('single')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  
  // Aktuelle Einstellungen beim Laden ermitteln
  useEffect(() => {
    // Hero-Typ laden
    const demoType = localStorage.getItem('demo-hero-type')
    if (demoType) {
      setCurrentHeroType(demoType)
    }

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

  const changeHeroType = async (heroType: 'single' | 'slider' | 'video' | 'split') => {
    try {
      localStorage.setItem('demo-hero-type', heroType)
      setCurrentHeroType(heroType)
      window.location.reload()
    } catch (error) {
      console.error('Fehler beim Ändern des Hero-Typs:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 max-h-[80vh] flex flex-col"
        style={{ borderRadius: 'var(--radius-modal)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            ⚙️ Quick-Einstellungen
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {[
            { key: 'design', label: 'Design', icon: '🎨' },
            { key: 'layout', label: 'Umfang', icon: '📄' },
            { key: 'color', label: 'Farben', icon: '🌈' },
            { key: 'hero', label: 'Hero', icon: '🖼️' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-1 px-3 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Design-Stil wählen</h4>
              
              {[
                { key: 'angular', name: 'Klassisch', desc: 'Eckige Formen, traditionell', icon: '📐' },
                { key: 'rounded', name: 'Freundlich', desc: 'Runde Ecken, modern', icon: '⭕' },
                { key: 'modern', name: 'Modern', desc: 'Minimalistisch, clean', icon: '✨' }
              ].map((style) => (
                <button
                  key={style.key}
                  onClick={() => changeDesignStyle(style.key as any)}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-left transition-colors border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{style.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{style.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{style.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Website-Umfang</h4>
              
              {[
                { key: 'onepage', name: 'Eine Seite', desc: 'Alles auf einer langen Seite', icon: '📄', price: '79€/mtl' },
                { key: 'multipage', name: 'Mehrere Seiten', desc: 'Getrennte Unterseiten', icon: '🗂️', price: '99€/mtl' }
              ].map((layout) => (
                <button
                  key={layout.key}
                  onClick={() => changeSiteMode(layout.key as any)}
                  className={`w-full p-3 rounded-lg text-left transition-colors border ${
                    currentSiteMode === layout.key
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{layout.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-800 dark:text-white">{layout.name}</div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{layout.price}</span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{layout.desc}</div>
                    </div>
                    {currentSiteMode === layout.key && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Color Tab */}
          {activeTab === 'color' && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Farbschema wählen</h4>
              
              {[
                { key: 'handwerker', name: 'Braun', desc: 'Traditionell & vertrauenswürdig', colors: ['#8B4513', '#5D4037', '#D2691E'] },
                { key: 'rot', name: 'Rot', desc: 'Kraftvoll & energisch', colors: ['#C62828', '#8E24AA', '#FF5722'] },
                { key: 'blau', name: 'Blau', desc: 'Professionell & vertrauensvoll', colors: ['#1565C0', '#0D47A1', '#42A5F5'] }
              ].map((color) => (
                <button
                  key={color.key}
                  onClick={() => changeColorScheme(color.key as any)}
                  className="w-full p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-left transition-colors border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex gap-1">
                      {color.colors.map((colorHex, i) => (
                        <div 
                          key={i}
                          className="w-4 h-4 rounded-sm border border-gray-200 dark:border-gray-500" 
                          style={{ backgroundColor: colorHex }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{color.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{color.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">Startbereich-Stil</h4>
              
              {[
                { key: 'single', name: 'Klassisch', desc: 'Ein großes Bild', icon: '🏠' },
                { key: 'slider', name: 'Slideshow', desc: 'Mehrere Bilder', icon: '🎬' },
                { key: 'video', name: 'Video', desc: 'Video-Hintergrund', icon: '📹' },
                { key: 'split', name: 'Geteilt', desc: 'Text + Bild nebeneinander', icon: '📱' }
              ].map((hero) => (
                <button
                  key={hero.key}
                  onClick={() => changeHeroType(hero.key as any)}
                  className={`w-full p-3 rounded-lg text-left transition-colors border ${
                    currentHeroType === hero.key
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{hero.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{hero.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{hero.desc}</div>
                    </div>
                    {currentHeroType === hero.key && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            💡 Änderungen werden sofort angewendet
          </p>
        </div>
      </div>
    </div>
  )
} 