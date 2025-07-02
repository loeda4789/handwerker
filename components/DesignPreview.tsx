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
  MdSettings,
  MdStar,
  MdPhoneInTalk,
  MdWhatsapp,
  MdCall,
  MdNotifications
} from 'react-icons/md'
import { applyColorScheme, applyBorderRadiusScheme } from '@/lib/colorSchemes'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  const [activeTab, setActiveTab] = useState('design')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [currentColorScheme, setCurrentColorScheme] = useState<'warm' | 'modern' | 'elegant' | 'nature'>('warm')
  const [currentDesignStyle, setCurrentDesignStyle] = useState<'angular' | 'rounded' | 'modern'>('angular')
  
  // Marketing Features State
  const [features, setFeatures] = useState({
    promoBanner: false,
    contactBar: false,
    notdienstAlert: false,
    whatsappWidget: false,
    callbackPopup: false,
    speedDial: true
  })
  
  // Aktuelle Einstellungen beim Laden ermitteln
  useEffect(() => {
    // Site-Mode laden
    const siteMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (siteMode) {
      setCurrentSiteMode(siteMode)
    }
    
    // Color-Scheme laden
    const colorScheme = localStorage.getItem('selected-color-scheme') as 'warm' | 'modern' | 'elegant' | 'nature'
    if (colorScheme) {
      setCurrentColorScheme(colorScheme)
    }
    
    // Design-Style laden
    const designStyle = localStorage.getItem('design-style') as 'angular' | 'rounded' | 'modern'
    if (designStyle) {
      setCurrentDesignStyle(designStyle)
    }
    
    // Features laden
    const savedFeatures = {
      promoBanner: localStorage.getItem('feature-promoBanner') === 'true',
      contactBar: localStorage.getItem('feature-contactBar') === 'true',
      notdienstAlert: localStorage.getItem('feature-notdienstAlert') === 'true',
      whatsappWidget: localStorage.getItem('feature-whatsappWidget') === 'true',
      callbackPopup: localStorage.getItem('feature-callbackPopup') === 'true',
      speedDial: localStorage.getItem('feature-speedDial') !== 'false' // Default true
    }
    setFeatures(savedFeatures)
  }, [])

  const changeSiteMode = (mode: 'onepage' | 'multipage') => {
    localStorage.setItem('site-mode', mode)
    setCurrentSiteMode(mode)
    // Kein automatisches Reload mehr
  }

  const changeDesignStyle = (style: 'angular' | 'rounded' | 'modern') => {
    localStorage.setItem('design-style', style)
    localStorage.setItem('demo-design-style', style)
    setCurrentDesignStyle(style)
    // Kein automatisches Reload mehr
  }

  const changeColorScheme = (scheme: 'warm' | 'modern' | 'elegant' | 'nature') => {
    localStorage.setItem('selected-color-scheme', scheme)
    localStorage.setItem('demo-color-scheme', scheme)
    setCurrentColorScheme(scheme)
    // Kein automatisches Reload mehr
  }

  const toggleFeature = (featureKey: keyof typeof features) => {
    const newValue = !features[featureKey as keyof typeof features]
    localStorage.setItem(`feature-${featureKey}`, newValue.toString())
    setFeatures(prev => ({ ...prev, [featureKey]: newValue }))
    
    // Dispatch event für andere Komponenten
    window.dispatchEvent(new CustomEvent(`feature-${featureKey}-changed`, { 
      detail: { enabled: newValue } 
    }))
    
    // Kein automatisches Reload mehr
  }

  const applyChangesAndReload = () => {
    // Alle Änderungen anwenden bevor Reload
    try {
      // Color scheme anwenden
      applyColorScheme(currentColorScheme)
      
      // Border radius scheme anwenden
      applyBorderRadiusScheme(currentDesignStyle)
      
      // Mark user as having configured the site
      localStorage.setItem('handwerker-config-saved', 'true')
      
      // Hero type basierend auf design style setzen
      const heroTypeMap = {
        'angular': 'split',
        'rounded': 'single', 
        'modern': 'slider'
      }
      localStorage.setItem('demo-hero-type', heroTypeMap[currentDesignStyle as keyof typeof heroTypeMap])
      
      // Event dispatchen für andere Komponenten
      window.dispatchEvent(new Event('site-mode-changed'))
      window.dispatchEvent(new Event('storage'))
      
    } catch (error) {
      console.error('Fehler beim Anwenden der Änderungen:', error)
    }
    
    // Modal schließen und dann Seite aktualisieren
    onClose()
    setTimeout(() => {
      window.location.reload()
    }, 300)
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
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-[500px] h-[600px] flex flex-col rounded-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick-Einstellungen
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {[
            { key: 'design', label: 'Design', Icon: MdBrush },
            { key: 'color', label: 'Farben', Icon: MdPalette },
            { key: 'features', label: 'Features', Icon: MdStar },
            { key: 'layout', label: 'Umfang', Icon: MdDescription }
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
          
          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">Marketing-Features</h4>
              
              <div className="space-y-3">
                {[
                  {
                    key: 'speedDial',
                    name: 'Speed Dial Buttons',
                    desc: 'Mobile Schnellkontakt-Buttons',
                    Icon: MdCall,
                    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  },
                  {
                    key: 'whatsappWidget',
                    name: 'WhatsApp Chat',
                    desc: 'Floating WhatsApp-Button',
                    Icon: MdWhatsapp,
                    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  },
                  {
                    key: 'notdienstAlert',
                    name: 'Notdienst-Alert',
                    desc: 'Auffällige Notdienst-Leiste',
                    Icon: MdNotifications,
                    color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  },
                  {
                    key: 'contactBar',
                    name: 'Kontakt-Leiste',
                    desc: 'Fixe Leiste über Header',
                    Icon: MdPhoneInTalk,
                    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                  },
                  {
                    key: 'promoBanner',
                    name: 'Sonderangebot-Banner',
                    desc: 'Animierter Aktions-Banner',
                    Icon: MdStar,
                    color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }
                ].map((feature) => (
                  <button
                    key={feature.key}
                    onClick={() => toggleFeature(feature.key as keyof typeof features)}
                    className={`group w-full p-3 border-2 transition-all duration-300 text-left transform hover:scale-105 rounded-lg ${
                      features[feature.key as keyof typeof features]
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-lg scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 flex items-center justify-center shadow-sm rounded-lg ${
                        features[feature.key as keyof typeof features]
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        <feature.Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{feature.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</div>
                      </div>
                      <div className={`px-3 py-1 text-xs font-medium transition-all duration-200 rounded-lg ${
                        features[feature.key as keyof typeof features]
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}>
                        {features[feature.key as keyof typeof features] ? 'AN' : 'AUS'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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
                    className={`group p-4 border-2 transition-all duration-300 text-left transform hover:scale-105 rounded-lg ${
                      currentDesignStyle === style.key
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 flex items-center justify-center shadow-md rounded-lg ${
                        currentDesignStyle === style.key 
                          ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
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
                    color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  },
                  { 
                    key: 'multipage', 
                    name: 'Erweiterte Website', 
                    desc: 'Separate Unterseiten für mehr Struktur', 
                    Icon: MdViewModule,
                    price: '99€/mtl',
                    color: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }
                ].map((layout) => (
                  <button
                    key={layout.key}
                    onClick={() => changeSiteMode(layout.key as any)}
                    className={`group p-4 border-2 transition-all duration-300 text-left transform hover:scale-105 rounded-lg ${
                      currentSiteMode === layout.key
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 flex items-center justify-center shadow-md rounded-lg ${layout.color}`}>
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
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { 
                    key: 'warm', 
                    name: 'Business', 
                    colors: ['#000000', '#D05733', '#9A8F88', '#E5E2E0']
                  },
                  { 
                    key: 'modern', 
                    name: 'Tech', 
                    colors: ['#0F1A50', '#FD080F', '#8D8AD9', '#F5F6FF']
                  },
                  { 
                    key: 'elegant', 
                    name: 'Elegant', 
                    colors: ['#18273A', '#987E4D', '#213044', '#F7F8FA']
                  },
                  { 
                    key: 'nature', 
                    name: 'Natur', 
                    colors: ['#000000', '#BCD7B6', '#A8C99A', '#F5F5F5']
                  }
                ].map((color) => (
                  <button
                    key={color.key}
                    onClick={() => changeColorScheme(color.key as any)}
                    className={`group p-3 border-2 transition-all duration-500 text-center transform hover:scale-105 rounded-lg ${
                      currentColorScheme === color.key
                        ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                    }`}
                  >
                    {/* 2x2 Color Grid - größer und ohne Texte */}
                    <div className="w-16 h-16 mx-auto overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 grid grid-cols-2 gap-1 p-1 bg-white dark:bg-gray-800 rounded-lg">
                      {color.colors.map((colorHex, index) => (
                        <div 
                          key={index}
                          className="transition-transform duration-300 group-hover:scale-110 rounded-sm"
                          style={{ backgroundColor: colorHex }}
                        ></div>
                      ))}
                    </div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white mt-2">{color.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}
          
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <button
            onClick={applyChangesAndReload}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Änderungen übernehmen & neu laden
          </button>
          
          <button
            onClick={openMainConfigurator}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
          >
            Erweiterte Konfiguration öffnen
          </button>
        </div>
      </div>
    </div>
  )
} 