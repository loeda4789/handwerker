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

  // Vereinfachte Paket-Daten mit Nummerierung und modernen Icons
  const packages = [
    {
      key: '1',
      number: '01',
      name: 'Klassisch',
      primary: 'Business & Seriös',
      feature: 'Kontaktleiste',
      colors: ['#000000', '#D05733'],
      preview: 'Traditionell • Vertrauensvoll • Etabliert'
    },
    {
      key: '2', 
      number: '02',
      name: 'Freundlich',
      primary: 'Warm & Einladend',
      feature: 'Speed Dial',
      colors: ['#18273A', '#987E4D'],
      preview: 'Nahbar • Persönlich • Sympathisch'
    },
    {
      key: '3',
      number: '03',
      name: 'Modern',
      primary: 'Zeitgemäß & Fresh',
      feature: 'WhatsApp Chat',
      colors: ['#000000', '#BCD7B6'],
      preview: 'Innovativ • Dynamisch • Zukunftsorientiert'
    }
  ]

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-[520px] h-[600px] flex flex-col rounded-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Quick-Einstellungen
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
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
              className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-t-2xl ${
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
              className={`flex-1 flex flex-col items-center gap-1 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-t-2xl ${
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
                  className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium transition-all duration-200 rounded-lg mx-1 ${
                    activeTab === tab.key
                      ? 'text-orange-600 dark:text-orange-400 bg-white dark:bg-gray-700 shadow-sm'
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
          
          {/* Paket Mode - Keine visuellen Änderungen bei Auswahl */}
          {configMode === 'paket' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Wählen Sie Ihr Design-Paket
                </h4>
              </div>
              
              {packages.map((pkg) => (
                <div key={pkg.key}>
                  <button
                    onClick={() => applyPackage(pkg.key as '1' | '2' | '3')}
                    className="w-full p-4 text-left border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
                  >
                    <div className="flex items-center gap-4">
                      {/* Nummerierung - immer gleich */}
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                        {pkg.number}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white text-lg">
                          {pkg.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {pkg.feature}
                        </div>
                      </div>
                      
                      {/* Nur Farb-Vorschau */}
                      <div className="flex gap-2">
                        {pkg.colors.slice(0, 2).map((color, index) => (
                          <div 
                            key={index}
                            className="w-5 h-5 rounded-xl border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>

                  {/* Optionale Details nur bei Klick auf Info */}
                  {showPackageDetails[pkg.key] && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm">
                      <div className="text-gray-600 dark:text-gray-400">
                        {pkg.preview}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Info-Hinweis kompakt */}
              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Schnelle Auswahl für sofortigen Start
                </p>
              </div>
            </div>
          )}

          {/* Individuell Mode - Funktional und vereinfacht mit runden Formen */}
          {configMode === 'individuell' && (
            <>
              {/* Design Tab */}
              {activeTab === 'design' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Design-Stil</h4>
                  {[
                    { key: 'angular', name: 'Klassisch', desc: 'Eckig & traditionell', Icon: MdViewQuilt },
                    { key: 'rounded', name: 'Freundlich', desc: 'Rund & modern', Icon: MdImage },
                    { key: 'modern', name: 'Modern', desc: 'Minimalistisch', Icon: MdViewCarousel }
                  ].map((style) => (
                    <button
                      key={style.key}
                      onClick={() => changeDesignStyle(style.key as 'angular' | 'rounded' | 'modern')}
                      className={`w-full p-4 text-left border-2 rounded-2xl transition-all ${
                        currentDesignStyle === style.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          currentDesignStyle === style.key
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}>
                          <style.Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{style.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{style.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Farben Tab */}
              {activeTab === 'color' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Farbschema</h4>
                  {[
                    { key: 'warm', name: 'Warm', colors: ['#291D1E', '#F5A454'], desc: 'Einladend & vertrauensvoll' },
                    { key: 'modern', name: 'Modern', colors: ['#1C1C1C', '#FA3D3B'], desc: 'Kraftvoll & energetisch' },
                    { key: 'elegant', name: 'Elegant', colors: ['#1D2D50', '#B0D7FF'], desc: 'Professionell & frisch' },
                    { key: 'nature', name: 'Nature', colors: ['#000000', '#BCD7B6'], desc: 'Natürlich & nachhaltig' }
                  ].map((scheme) => (
                    <button
                      key={scheme.key}
                      onClick={() => changeColorScheme(scheme.key as 'warm' | 'modern' | 'elegant' | 'nature')}
                      className={`w-full p-4 text-left border-2 rounded-2xl transition-all ${
                        currentColorScheme === scheme.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          {scheme.colors.map((color, index) => (
                            <div key={index} className="w-6 h-6 rounded-xl border border-gray-300" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{scheme.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{scheme.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Marketing-Features</h4>
                  {[
                    { key: 'speedDial', name: 'Speed Dial', desc: 'Mobile Kontakt-Buttons', Icon: MdCall },
                    { key: 'whatsappWidget', name: 'WhatsApp', desc: 'Chat-Widget', Icon: MdWhatsapp },
                    { key: 'contactBar', name: 'Kontakt-Leiste', desc: 'Fixe Telefon-Leiste', Icon: MdPhoneInTalk },
                    { key: 'notdienstAlert', name: 'Notdienst-Alert', desc: 'Auffällige Hinweis-Leiste', Icon: MdNotifications }
                  ].map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() => toggleFeature(feature.key as keyof typeof features)}
                      className={`w-full p-4 text-left border-2 rounded-2xl transition-all ${
                        features[feature.key as keyof typeof features]
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                            features[feature.key as keyof typeof features]
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            <feature.Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{feature.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 text-xs font-medium rounded-xl ${
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
              )}

              {/* Layout Tab */}
              {activeTab === 'layout' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-4">Website-Umfang</h4>
                  {[
                    { key: 'onepage', name: 'One-Page', desc: 'Alles auf einer Seite', Icon: MdDescription },
                    { key: 'multipage', name: 'Multi-Page', desc: 'Mehrere Unterseiten', Icon: MdViewModule }
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      onClick={() => changeSiteMode(mode.key as 'onepage' | 'multipage')}
                      className={`w-full p-4 text-left border-2 rounded-2xl transition-all ${
                        currentSiteMode === mode.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          currentSiteMode === mode.key
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}>
                          <mode.Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{mode.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{mode.desc}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={applyChangesAndReload}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-2xl transition-colors"
          >
            Website anzeigen
          </button>
        </div>
      </div>
    </div>
  )
} 