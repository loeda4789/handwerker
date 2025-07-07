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
  MdNotifications,
  MdFlashOn,
  MdInfo
} from 'react-icons/md'
import { applyColorScheme, applyBorderRadiusScheme } from '@/lib/colorSchemes'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  const [currentColorScheme, setCurrentColorScheme] = useState<'warm' | 'modern' | 'elegant' | 'nature'>('warm')
  const [currentDesignStyle, setCurrentDesignStyle] = useState<'angular' | 'rounded' | 'modern'>('angular')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [activeTab, setActiveTab] = useState('design')
  const [configMode, setConfigMode] = useState<'paket' | 'individuell'>('paket')
  const [activePackage, setActivePackage] = useState<'1' | '2' | '3' | null>(null)
  const [showPackageDetails, setShowPackageDetails] = useState<{[key: string]: boolean}>({})
  const [features, setFeatures] = useState({
    promoBanner: false,
    contactBar: false,
    notdienstAlert: false,
    whatsappWidget: false,
    callbackPopup: false,
    callbackRequest: false,
    speedDial: false
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
      callbackRequest: localStorage.getItem('feature-callbackRequest') === 'true',
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

  // Neues Paket-System
  const applyPackage = (packageKey: '1' | '2' | '3') => {
    console.log('🚀 Paket wird angewendet:', packageKey)
    
    // Setze das aktive Paket
    setActivePackage(packageKey)
    
    const packages = {
      '1': {
        name: 'Klassisch',
        colorScheme: 'warm' as const,
        designStyle: 'angular' as const,
        features: {
          promoBanner: false,
          contactBar: true,
          notdienstAlert: false,
          whatsappWidget: false,
          callbackPopup: false,
          callbackRequest: false,
          speedDial: false
        }
      },
      '2': {
        name: 'Freundlich',
        colorScheme: 'elegant' as const,
        designStyle: 'rounded' as const,
        features: {
          promoBanner: false,
          contactBar: false,
          notdienstAlert: false,
          whatsappWidget: false,
          callbackPopup: false,
          callbackRequest: false,
          speedDial: true
        }
      },
      '3': {
        name: 'Modern',
        colorScheme: 'nature' as const,
        designStyle: 'modern' as const,
        features: {
          promoBanner: false,
          contactBar: false,
          notdienstAlert: false,
          whatsappWidget: true,
          callbackPopup: false,
          callbackRequest: false,
          speedDial: false
        }
      }
    }

    const selectedPackage = packages[packageKey]
    console.log('📦 Ausgewähltes Paket:', selectedPackage)
    
    // Alle Einstellungen setzen
    setCurrentColorScheme(selectedPackage.colorScheme)
    setCurrentDesignStyle(selectedPackage.designStyle)
    setFeatures(selectedPackage.features)
    
    // In localStorage speichern
    localStorage.setItem('selected-color-scheme', selectedPackage.colorScheme)
    localStorage.setItem('design-style', selectedPackage.designStyle)
    localStorage.setItem('demo-color-scheme', selectedPackage.colorScheme)
    localStorage.setItem('demo-design-style', selectedPackage.designStyle)
    
    // Features speichern
    Object.entries(selectedPackage.features).forEach(([key, value]) => {
      localStorage.setItem(`feature-${key}`, value.toString())
    })
    
    // Events dispatchen für sofortige Aktualisierung
    Object.entries(selectedPackage.features).forEach(([key, value]) => {
      window.dispatchEvent(new CustomEvent(`feature-${key}-changed`, { 
        detail: { enabled: value } 
      }))
    })
    
    // SOFORTIGE Anwendung der Schemas
    try {
      console.log('🎨 Wende Farbschema an:', selectedPackage.colorScheme)
      applyColorScheme(selectedPackage.colorScheme)
      
      console.log('🔲 Wende Design-Style an:', selectedPackage.designStyle)  
      applyBorderRadiusScheme(selectedPackage.designStyle)
      
      // Hero type setzen
      const heroTypeMap = {
        'angular': 'split',
        'rounded': 'single', 
        'modern': 'slider'
      }
      localStorage.setItem('demo-hero-type', heroTypeMap[selectedPackage.designStyle as keyof typeof heroTypeMap])
      
      // Storage event für andere Komponenten
      window.dispatchEvent(new Event('storage'))
      
      console.log('✅ Paket erfolgreich angewendet!')
      
    } catch (error) {
      console.error('❌ Fehler beim Anwenden des Pakets:', error)
    }
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

  if (!isOpen) return null

  // Vereinfachte Paket-Daten
  const packages = [
    {
      key: '1',
      name: 'Klassisch',
      icon: '🏢',
      primary: 'Business & Seriös',
      feature: 'Kontaktleiste',
      colors: ['#000000', '#D05733'],
      preview: 'Traditionell • Vertrauensvoll • Etabliert'
    },
    {
      key: '2', 
      name: 'Freundlich',
      icon: '😊',
      primary: 'Warm & Einladend',
      feature: 'Speed Dial',
      colors: ['#18273A', '#987E4D'],
      preview: 'Nahbar • Persönlich • Sympathisch'
    },
    {
      key: '3',
      name: 'Modern',
      icon: '🚀',
      primary: 'Zeitgemäß & Fresh',
      feature: 'WhatsApp Chat',
      colors: ['#000000', '#BCD7B6'],
      preview: 'Innovativ • Dynamisch • Zukunftsorientiert'
    }
  ]

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-[500px] max-h-[80vh] flex flex-col rounded-lg">
        
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

        {/* Simple Toggle Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            {/* Paket Button */}
            <button
              onClick={() => setConfigMode('paket')}
              className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                configMode === 'paket'
                  ? 'text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-700 border-b-2 border-orange-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <MdFlashOn className="w-5 h-5" />
              <span className="font-semibold">Paket</span>
              <span className="text-xs">Komplett-Lösung</span>
            </button>
            
            {/* Individuell Button */}
            <button
              onClick={() => {
                setConfigMode('individuell')
                if (activeTab === 'pakete') setActiveTab('design')
              }}
              className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                configMode === 'individuell'
                  ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 border-b-2 border-blue-500'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <MdBrush className="w-5 h-5" />
              <span className="font-semibold">Individuell</span>
              <span className="text-xs">Anpassbar</span>
            </button>
          </div>
          
          {/* Sub-Tabs nur für Individuell */}
          {configMode === 'individuell' && (
            <div className="flex bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              {[
                { key: 'design', label: 'Design', Icon: MdBrush },
                { key: 'color', label: 'Farben', Icon: MdPalette },
                { key: 'features', label: 'Features', Icon: MdStar },
                { key: 'layout', label: 'Umfang', Icon: MdDescription }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-700 border-b-2 border-orange-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Paket Mode - Ultra Vereinfacht */}
          {configMode === 'paket' && (
            <div className="space-y-3">
              <div className="text-center mb-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Wählen Sie Ihr Design-Paket
                </h4>
              </div>
              
              {packages.map((pkg) => (
                <div key={pkg.key}>
                  <button
                    onClick={() => applyPackage(pkg.key as '1' | '2' | '3')}
                    className={`w-full p-3 text-left border rounded-lg transition-all duration-200 hover:shadow-sm ${
                      activePackage === pkg.key
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{pkg.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {pkg.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {pkg.feature}
                        </div>
                      </div>
                      
                      {/* Kompakte Farb-Vorschau */}
                      <div className="flex gap-1">
                        {pkg.colors.slice(0, 2).map((color, index) => (
                          <div 
                            key={index}
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      {/* Info Icon - nur anzeigen */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPackageDetails(prev => ({
                            ...prev,
                            [pkg.key]: !prev[pkg.key]
                          }))
                        }}
                        className="p-1 text-gray-400 hover:text-orange-500 transition-colors"
                      >
                        <MdInfo className="w-4 h-4" />
                      </button>
                    </div>
                  </button>

                  {/* Aufklappbare Details - kompakter */}
                  {showPackageDetails[pkg.key] && (
                    <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                      {pkg.preview}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center mt-6">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  💡 Nach der Auswahl können Sie weitere Anpassungen vornehmen
                </p>
              </div>
            </div>
          )}

          {/* Individuell Mode - Vereinfacht */}
          {configMode === 'individuell' && (
            <div className="text-center py-8 space-y-3">
              <MdSettings className="w-12 h-12 mx-auto text-gray-400" />
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Individuelle Anpassungen
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                Erweiterte Optionen für Design, Farben und Features sind in Entwicklung.
              </p>
              <button
                onClick={() => setConfigMode('paket')}
                className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg transition-colors"
              >
                Zurück zu Paketen
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={applyChangesAndReload}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Website anzeigen
          </button>
        </div>
      </div>
    </div>
  )
} 