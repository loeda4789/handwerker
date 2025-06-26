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
      name: 'Orange Handwerk',
      description: 'Warmes Orange für traditionelle Handwerker',
      colors: {
        primary: '#d97706',
        secondary: '#0ea5e9', 
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      }
    },
    {
      name: 'Blau Professionell',
      description: 'Vertrauenswürdiges Blau für moderne Betriebe',
      colors: {
        primary: '#2563eb',
        secondary: '#059669', 
        accent: '#dc2626',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      }
    },
    {
      name: 'Grün Nachhaltig',
      description: 'Umweltfreundliches Grün für ökologische Betriebe',
      colors: {
        primary: '#059669',
        secondary: '#7c3aed', 
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      }
    },
    {
      name: 'Rot Energie',
      description: 'Kraftvolles Rot für energiegeladene Auftritte',
      colors: {
        primary: '#dc2626',
        secondary: '#2563eb', 
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
      }
    },
    {
      name: 'Grau Elegant',
      description: 'Elegantes Grau für zeitlose Eleganz',
      colors: {
        primary: '#4b5563',
        secondary: '#059669', 
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        border: '#e5e7eb'
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
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md">
      <div className="fixed top-4 right-4 w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">DESIGN VORSCHAU</h3>
                <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded-full">LIVE</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white/90 hover:text-white transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 backdrop-blur-sm border-b border-white/10">
          {[
            { key: 'design', label: 'Farben', icon: '🎨' },
            { key: 'layout', label: 'Layout', icon: '📐' },
            { key: 'hero', label: 'Hero', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-3 text-xs font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-b-2 border-blue-400'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-2 text-sm">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[480px] overflow-y-auto text-white scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30">
          
          {/* Design Tab - Farben */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-white/20">
                  <span className="text-lg">🎨</span>
                  <h4 className="text-sm font-semibold text-white">Farbschema wählen</h4>
                </div>
              </div>
              
              <div className="grid gap-4">
                {themePresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyThemePreset(preset)}
                    className="group relative w-full p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-white group-hover:text-blue-100 transition-colors">{preset.name}</h5>
                      <div className="flex space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-200"
                          style={{ backgroundColor: preset.colors.primary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-200 delay-75"
                          style={{ backgroundColor: preset.colors.secondary }}
                        ></div>
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-200 delay-150"
                          style={{ backgroundColor: preset.colors.accent }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-white/70 group-hover:text-white/90 transition-colors">
                      {preset.description}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>

              {/* Aktuelles Schema anzeigen */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg">🌈</span>
                  <h5 className="text-sm font-semibold text-white">Aktuelles Schema</h5>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center group">
                    <div 
                      className="w-10 h-10 rounded-xl mx-auto mb-2 border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: colors.primary }}
                    ></div>
                    <span className="text-xs text-white/70 font-medium">Primary</span>
                  </div>
                  <div className="text-center group">
                    <div 
                      className="w-10 h-10 rounded-xl mx-auto mb-2 border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: colors.secondary }}
                    ></div>
                    <span className="text-xs text-white/70 font-medium">Secondary</span>
                  </div>
                  <div className="text-center group">
                    <div 
                      className="w-10 h-10 rounded-xl mx-auto mb-2 border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: colors.accent }}
                    ></div>
                    <span className="text-xs text-white/70 font-medium">Accent</span>
                  </div>
                  <div className="text-center group">
                    <div 
                      className="w-10 h-10 rounded-xl mx-auto mb-2 border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: colors.text }}
                    ></div>
                    <span className="text-xs text-white/70 font-medium">Text</span>
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  onClick={exportTheme}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>📁</span>
                  <span>Theme exportieren</span>
                </button>
              </div>
            </div>
          )}

          {/* Layout Tab - Site Mode */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-white/20">
                  <span className="text-lg">🌐</span>
                  <h4 className="text-sm font-semibold text-white">Website-Struktur</h4>
                  <span className="text-xs bg-white/20 text-white/90 px-2 py-1 rounded-full">
                    {currentSiteMode === 'onepage' ? 'One-Page' : 'Multi-Page'}
                  </span>
                </div>
              </div>
              
              <div className="grid gap-4">
                <button
                  onClick={() => changeSiteMode('onepage')}
                  className={`group relative w-full p-5 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border hover:scale-[1.02] hover:shadow-lg ${
                    currentSiteMode === 'onepage'
                      ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30 border-green-400/50 text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/30 text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div>
                      <div className="font-semibold">One-Page Modus</div>
                      <div className="text-xs opacity-75 mt-1">Alle Inhalte auf einer Seite</div>
                    </div>
                  </div>
                  {currentSiteMode === 'onepage' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => changeSiteMode('multipage')}
                  className={`group relative w-full p-5 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border hover:scale-[1.02] hover:shadow-lg ${
                    currentSiteMode === 'multipage'
                      ? 'bg-gradient-to-r from-green-500/30 to-blue-500/30 border-green-400/50 text-white shadow-lg'
                      : 'bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/30 text-white/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🗂️</span>
                    </div>
                    <div>
                      <div className="font-semibold">Multi-Page Modus</div>
                      <div className="text-xs opacity-75 mt-1">Separate Unterseiten</div>
                    </div>
                  </div>
                  {currentSiteMode === 'multipage' && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Hero Tab - Hero Varianten */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-white/20">
                  <span className="text-lg">🏆</span>
                  <h4 className="text-sm font-semibold text-white">Startbereich-Varianten</h4>
                  <span className="text-xs bg-white/20 text-white/90 px-2 py-1 rounded-full capitalize">
                    {currentHeroType}
                  </span>
                </div>
              </div>
              
              <div className="grid gap-4">
                {heroVariants.map((variant) => (
                  <button
                    key={variant.key}
                    onClick={() => changeHeroType(variant.key as any)}
                    className={`group relative w-full p-5 backdrop-blur-sm rounded-xl text-left transition-all duration-300 border hover:scale-[1.02] hover:shadow-lg ${
                      currentHeroType === variant.key
                        ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30 border-orange-400/50 text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/30 text-white/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">{variant.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{variant.name}</div>
                        <div className="text-xs opacity-75 mt-1">{variant.description}</div>
                      </div>
                    </div>
                    {currentHeroType === variant.key && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-white/90">
                <strong>Hinweis:</strong> Alle Änderungen werden automatisch gespeichert und sofort angewendet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 