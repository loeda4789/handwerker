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



  const themePresets = [
    {
      name: 'Coral Modern',
      description: 'Warmes Coral mit frischen Akzenten - zeitgemäß und freundlich',
      colors: {
        primary: '#ff6b6b',
        secondary: '#4ecdc4', 
        accent: '#ffe66d',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#2d3748',
        textSecondary: '#718096',
        border: '#e2e8f0'
      }
    },
    {
      name: 'Ocean Blue',
      description: 'Tiefes Meeresblau mit mineralischen Tönen - vertrauensvoll',
      colors: {
        primary: '#0d7377',
        secondary: '#14a085', 
        accent: '#f39c12',
        background: '#ffffff',
        surface: '#f7fafc',
        text: '#1a202c',
        textSecondary: '#4a5568',
        border: '#e2e8f0'
      }
    },
    {
      name: 'Forest Green',
      description: 'Natürliches Waldgrün mit Erdtönen - nachhaltig und ruhig',
      colors: {
        primary: '#38a169',
        secondary: '#805ad5', 
        accent: '#ed8936',
        background: '#ffffff',
        surface: '#f7fafc',
        text: '#1a202c',
        textSecondary: '#4a5568',
        border: '#e2e8f0'
      }
    },
    {
      name: 'Purple Tech',
      description: 'Modernes Lila mit Tech-Akzenten - innovativ und kreativ',
      colors: {
        primary: '#805ad5',
        secondary: '#38b2ac', 
        accent: '#f56565',
        background: '#ffffff',
        surface: '#faf5ff',
        text: '#1a202c',
        textSecondary: '#4a5568',
        border: '#e9d8fd'
      }
    },
    {
      name: 'Midnight Dark',
      description: 'Dunkles Premium-Schema - elegant und sophisticated',
      colors: {
        primary: '#667eea',
        secondary: '#f093fb', 
        accent: '#4fd1c7',
        background: '#1a202c',
        surface: '#2d3748',
        text: '#f7fafc',
        textSecondary: '#a0aec0',
        border: '#4a5568'
      }
    },
    {
      name: 'Sunset Orange',
      description: 'Warmes Sonnenuntergang-Orange - energiegeladen und einladend',
      colors: {
        primary: '#ed8936',
        secondary: '#9f7aea', 
        accent: '#38b2ac',
        background: '#ffffff',
        surface: '#fffaf0',
        text: '#1a202c',
        textSecondary: '#4a5568',
        border: '#fed7aa'
      }
    }
  ]

  const applyThemePreset = (preset: typeof themePresets[0]) => {
    setColors(preset.colors)
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
    <div className="fixed inset-0 z-[9999] bg-black/50">
      <div className="fixed top-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-blue-500 text-white px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎨</span>
              <h3 className="font-semibold text-sm">Design Einstellungen</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          {[
            { key: 'design', label: 'Farben', icon: '🎨' },
            { key: 'layout', label: 'Seiten', icon: '📄' },
            { key: 'hero', label: 'Startbereich', icon: '🏠' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto text-gray-800 dark:text-white">
          
          {/* Design Tab - Farben */}
          {activeTab === 'design' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Farbschema auswählen</h4>
              
              <div className="space-y-3">
                {themePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyThemePreset(preset)}
                    className="w-full p-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-left transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-800 dark:text-white">{preset.name}</h5>
                      <div className="flex space-x-1">
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-500"
                          style={{ backgroundColor: preset.colors.primary }}
                        ></div>
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-500"
                          style={{ backgroundColor: preset.colors.secondary }}
                        ></div>
                        <div 
                          className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-500"
                          style={{ backgroundColor: preset.colors.accent }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Aktuelles Schema anzeigen */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h5 className="text-sm font-medium text-gray-800 dark:text-white mb-3">Aktuelle Farben</h5>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-1 border border-gray-300 dark:border-gray-500"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Haupt</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-1 border border-gray-300 dark:border-gray-500"
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Zweit</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-1 border border-gray-300 dark:border-gray-500"
                      style={{ backgroundColor: colors.accent }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Akzent</span>
                  </div>
                  <div className="text-center">
                    <div 
                      className="w-8 h-8 rounded mx-auto mb-1 border border-gray-300 dark:border-gray-500"
                      style={{ backgroundColor: colors.text }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Text</span>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  onClick={exportTheme}
                  className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors"
                >
                  📁 Theme exportieren
                </button>
              </div>
            </div>
          )}

          {/* Layout Tab - Site Mode */}
          {activeTab === 'layout' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Seitenaufbau - Aktuell: {currentSiteMode === 'onepage' ? 'Eine Seite' : 'Mehrere Seiten'}
              </h4>
              
              <div className="space-y-3">
                <button
                  onClick={() => changeSiteMode('onepage')}
                  className={`w-full p-4 rounded-lg text-left transition-colors border ${
                    currentSiteMode === 'onepage'
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Eine Seite</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Alle Inhalte untereinander auf einer langen Seite</div>
                    </div>
                    {currentSiteMode === 'onepage' && (
                      <span className="ml-auto text-blue-500">✓</span>
                    )}
                  </div>
                </button>
                
                <button
                  onClick={() => changeSiteMode('multipage')}
                  className={`w-full p-4 rounded-lg text-left transition-colors border ${
                    currentSiteMode === 'multipage'
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🗂️</span>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white">Mehrere Seiten</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Getrennte Seiten für Services, Referenzen, etc.</div>
                    </div>
                    {currentSiteMode === 'multipage' && (
                      <span className="ml-auto text-blue-500">✓</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Hero Tab - Hero Varianten */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
                Startbereich-Design - Aktuell: {currentHeroType}
              </h4>
              
              <div className="space-y-3">
                {heroVariants.map((variant) => (
                  <button
                    key={variant.key}
                    onClick={() => changeHeroType(variant.key as any)}
                    className={`w-full p-4 rounded-lg text-left transition-colors border ${
                      currentHeroType === variant.key
                        ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{variant.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800 dark:text-white">{variant.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{variant.description}</div>
                      </div>
                      {currentHeroType === variant.key && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              💡 <strong>Hinweis:</strong> Alle Änderungen werden sofort angewendet und automatisch gespeichert.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 