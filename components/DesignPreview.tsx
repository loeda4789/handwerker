'use client'

import React, { useState, useEffect } from 'react'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'layout' | 'hero'>('design')
  const [currentHeroType, setCurrentHeroType] = useState<string>('single')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  
  const [colors, setColors] = useState({
    primary: '#d97706',
    secondary: '#0ea5e9', 
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb'
  })

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

    // Gespeicherte Farben laden
    const saved = localStorage.getItem('theme-colors')
    if (saved) {
      try {
        const savedColors = JSON.parse(saved)
        setColors(savedColors)
      } catch (e) {
        console.log('Fehler beim Laden der gespeicherten Farben')
      }
    }
  }, [])

  // CSS Custom Properties in Echtzeit aktualisieren
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value)
      })
      
      // In localStorage speichern
      localStorage.setItem('theme-colors', JSON.stringify(colors))
    }
  }, [colors])

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const resetColors = () => {
    const defaultColors = {
      primary: '#d97706',
      secondary: '#0ea5e9', 
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    }
    setColors(defaultColors)
  }

  const exportTheme = () => {
    const themeConfig = {
      colors: colors,
      fonts: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"]
      }
    }
    
    const dataStr = JSON.stringify(themeConfig, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theme.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const changeSiteMode = (mode: 'onepage' | 'multipage') => {
    setCurrentSiteMode(mode)
    localStorage.setItem('site-mode', mode)
    console.log('🔄 Site-Mode geändert zu:', mode)
    
    // Seite neu laden für sofortige Änderung
    window.location.reload()
  }

  const changeHeroType = async (heroType: 'single' | 'slider' | '3d' | 'split') => {
    try {
      console.log('🎨 Ändere Hero-Typ zu:', heroType)
      
      // Content-Datei basierend auf aktueller Branche ermitteln
      const urlParams = new URLSearchParams(window.location.search)
      const branche = urlParams.get('branche')
      
      let contentFile = 'content.json'
      if (branche === 'dachdecker') {
        contentFile = 'dachdecker_content.json'
      } else if (branche === 'elektriker') {
        contentFile = 'elektriker_content.json'
      }

      // API-Aufruf zum Ändern des Hero-Typs
      const response = await fetch('/api/update-hero-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroType,
          contentFile
        })
      })

      if (response.ok) {
        setCurrentHeroType(heroType)
        // Seite neu laden, um Änderungen zu sehen
        window.location.reload()
      } else {
        console.error('Fehler beim Ändern des Hero-Typs')
        // Fallback: Direkte Änderung über localStorage für Demo
        localStorage.setItem('demo-hero-type', heroType)
        setCurrentHeroType(heroType)
        window.location.reload()
      }
    } catch (error) {
      console.error('Fehler:', error)
      // Fallback für Demo
      localStorage.setItem('demo-hero-type', heroType)
      setCurrentHeroType(heroType)
      window.location.reload()
    }
  }

  const heroVariants = [
    { key: 'single', name: 'Single', icon: '🏠', description: 'Klassischer Hero' },
    { key: 'slider', name: 'Slider', icon: '🎬', description: 'Slideshow' },
    { key: '3d', name: '3D', icon: '🎨', description: '3D-Effekte' },
    { key: 'split', name: 'Split', icon: '📱', description: 'Geteiltes Layout' }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
      <div className="fixed top-4 right-4 w-80 bg-gray-900 border border-blue-400 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="bg-blue-400 text-gray-900 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎨</span>
              <h3 className="font-bold text-sm">DESIGN VORSCHAU</h3>
              <span className="text-xs bg-gray-900 text-blue-400 px-2 py-1 rounded">LIVE</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { key: 'design', label: 'Farben', icon: '🎨' },
            { key: 'layout', label: 'Layout', icon: '📐' },
            { key: 'hero', label: 'Hero', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto text-white">
          
          {/* Design Tab - Farben */}
          {activeTab === 'design' && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-blue-400 mb-3">Farbschema anpassen</h4>
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm font-medium capitalize text-gray-300">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-6 h-6 rounded border border-gray-600"
                      style={{ backgroundColor: value }}
                    ></div>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-8 h-8 border-none bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key, e.target.value)}
                      className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-white"
                    />
                  </div>
                </div>
              ))}
              
              <div className="mt-4 space-y-2">
                <button
                  onClick={resetColors}
                  className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                >
                  🔄 Standard zurücksetzen
                </button>
                <button
                  onClick={exportTheme}
                  className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded transition-colors"
                >
                  📁 Theme exportieren
                </button>
              </div>
            </div>
          )}

          {/* Layout Tab - Site Mode */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center">
                  🌐 Website-Struktur
                  <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded">
                    {currentSiteMode === 'onepage' ? 'One-Page' : 'Multi-Page'}
                  </span>
                </h4>
                <div className="space-y-2">
                  <button
                    onClick={() => changeSiteMode('onepage')}
                    className={`w-full p-3 text-sm rounded transition-all duration-200 text-left ${
                      currentSiteMode === 'onepage'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">📄 One-Page Modus</div>
                    <div className="text-xs opacity-75 mt-1">Alle Inhalte auf einer Seite</div>
                  </button>
                  <button
                    onClick={() => changeSiteMode('multipage')}
                    className={`w-full p-3 text-sm rounded transition-all duration-200 text-left ${
                      currentSiteMode === 'multipage'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium">🗂️ Multi-Page Modus</div>
                    <div className="text-xs opacity-75 mt-1">Separate Unterseiten</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hero Tab - Hero Varianten */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center">
                  🏆 Startbereich-Varianten
                  <span className="ml-2 text-xs bg-blue-600 px-2 py-1 rounded capitalize">
                    {currentHeroType}
                  </span>
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {heroVariants.map((variant) => (
                    <button
                      key={variant.key}
                      onClick={() => changeHeroType(variant.key as any)}
                      className={`p-3 text-sm rounded transition-all duration-200 text-left ${
                        currentHeroType === variant.key
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{variant.icon}</span>
                        <div>
                          <div className="font-medium">{variant.name}</div>
                          <div className="text-xs opacity-75">{variant.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
            <p className="text-xs text-gray-400">
              <strong>💡 Hinweis:</strong> Alle Änderungen werden automatisch gespeichert und sofort angewendet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 