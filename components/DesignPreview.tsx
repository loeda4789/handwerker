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
  MdInfo
} from 'react-icons/md'
import { applyColorScheme } from '@/lib/colorSchemes'
import { useAppConfig, useLayoutConfig, useThemeConfig, useFeaturesConfig } from '@/contexts/AppConfigContext'

interface DesignPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export default function DesignPreview({ isOpen, onClose }: DesignPreviewProps) {
  // Neue Konfigurationsarchitektur verwenden
  const { config, isConfigLoaded } = useAppConfig()
  const { mode: currentSiteMode, design: currentDesignStyle, setMode: changeSiteMode, setDesign: changeDesignStyle } = useLayoutConfig()
  const { colorScheme: currentColorScheme, setColorScheme: changeColorScheme } = useThemeConfig()
  const { features, setFeature: toggleFeature, setFeatures: setFeatures } = useFeaturesConfig()
  
  // Lokale UI-States
  const [activeTab, setActiveTab] = useState('design')
  const [configMode, setConfigMode] = useState<'paket' | 'individuell'>('paket')
  const [activePackage, setActivePackage] = useState<'1' | '2' | '3' | null>(null)
  const [showPackageDetails, setShowPackageDetails] = useState<{[key: string]: boolean}>({})
  
  // CSS-Schemata anwenden wenn Konfiguration geladen ist
  useEffect(() => {
    if (isConfigLoaded) {
      applyColorScheme(currentColorScheme)
      // Border-Radius-Schema NICHT anwenden - Designer-Sidebar behält immer halbrunde Ränder
    }
  }, [isConfigLoaded, currentColorScheme, currentDesignStyle])

  const handleSiteModeChange = (mode: 'onepage' | 'multipage') => {
    changeSiteMode(mode)
    // Demo-Modus auch setzen für Kompatibilität
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-design-style', currentDesignStyle)
    }
  }

  const handleDesignStyleChange = (style: 'angular' | 'rounded' | 'modern') => {
    changeDesignStyle(style)
    // Demo-Modus auch setzen für Kompatibilität
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-design-style', style)
    }
  }

  const handleColorSchemeChange = (scheme: 'warm' | 'modern' | 'elegant' | 'nature') => {
    changeColorScheme(scheme)
    // Demo-Modus auch setzen für Kompatibilität
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-color-scheme', scheme)
    }
  }

  const handleFeatureToggle = (featureKey: keyof typeof features) => {
    const newValue = !features[featureKey as keyof typeof features]
    toggleFeature(featureKey, newValue)
    
    // Dispatch event für andere Komponenten
    window.dispatchEvent(new CustomEvent(`feature-${featureKey}-changed`, { 
      detail: { enabled: newValue } 
    }))
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
          contactBar: true,
          sideContact: false
        }
      },
      '2': {
        name: 'Modern',
        colorScheme: 'nature' as const,
        designStyle: 'modern' as const,
        features: {
          contactBar: false,
          sideContact: true
        }
      },
      '3': {
        name: 'Freundlich',
        colorScheme: 'elegant' as const,
        designStyle: 'rounded' as const,
        features: {
          contactBar: true,
          sideContact: true
        }
      }
    }

    const selectedPackage = packages[packageKey]
    console.log('📦 Ausgewähltes Paket:', selectedPackage)
    
    // Alle Einstellungen über neue Architektur setzen
    changeColorScheme(selectedPackage.colorScheme)
    changeDesignStyle(selectedPackage.designStyle)
    setFeatures(selectedPackage.features as Partial<typeof config.features>)
    
    // Demo-Modus auch setzen für Kompatibilität
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo-color-scheme', selectedPackage.colorScheme)
      localStorage.setItem('demo-design-style', selectedPackage.designStyle)
    }
    
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
      
      console.log('🔲 Design-Style wird NICHT angewendet - Designer-Sidebar behält halbrunde Ränder')  
      // applyBorderRadiusScheme(selectedPackage.designStyle) - NICHT anwenden für Designer-Sidebar
      
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
      
      // Border radius scheme NICHT anwenden - Designer-Sidebar behält halbrunde Ränder
      // applyBorderRadiusScheme(currentDesignStyle) - NICHT anwenden für Designer-Sidebar
      
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

  // Alle Pakete direkt anzeigen - mit identischen Farben aus den Farbschemas
  const packages = [
    {
      key: '1',
      number: '01',
      name: 'Klassisch',
      primary: 'Seriös & Vertrauensvoll',
      feature: 'Normale Kontaktmöglichkeiten',
      colors: ['#000000', '#D05733', '#9A8F88'], // warm schema: primary, secondary, accent
      preview: 'Traditionell • Bewährt • Solide'
    },
    {
      key: '3',
      number: '02',
      name: 'Freundlich',
      primary: 'Warm & Persönlich',
      feature: 'Schnelle Anruf-Buttons',
      colors: ['#18273A', '#987E4D', '#213044'], // elegant schema: primary, secondary, accent
      preview: 'Nahbar • Sympathisch • Hilfsbereit'
    },
    {
      key: '2', 
      number: '03',
      name: 'Modern',
      primary: 'Schnell & Bequem',
      feature: 'WhatsApp & Direktkontakt',
      colors: ['#1C1C1C', '#22C55E', '#16A34A'], // schwarz, hellgrün, dunkelgrün für Konfigurator
      preview: 'Zeitgemäß • Einfach • Direkter Kontakt'
    }
  ]

  return (
    <div className="fixed inset-0 z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="design-preview-modal bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-[520px] h-[600px] flex flex-col" style={{ borderRadius: '24px' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Webseite-Designer
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            style={{ borderRadius: '16px' }}
          >
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Kompakte Paket/Individuell Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-3 py-2">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1" style={{ borderRadius: '12px' }}>
            {/* Bestseller Button - sanfteres Orange */}
            <button
              onClick={() => setConfigMode('paket')}
              className={`flex-1 flex flex-col items-center gap-1 px-3 py-3 text-sm font-bold transition-all duration-300 shadow-sm ${
                configMode === 'paket'
                  ? 'text-white bg-gradient-to-br from-orange-400 to-orange-500 shadow-md scale-102'
                  : 'text-gray-600 dark:text-gray-400 hover:text-orange-400 hover:bg-white dark:hover:bg-gray-700'
              }`}
              style={{ borderRadius: '10px' }}
            >
              <span className="font-bold text-base">BESTSELLER</span>
              <span className="text-xs opacity-90">Beliebt & Bewährt</span>
            </button>
            
            {/* Individuell Button */}
            <button
              onClick={() => {
                setConfigMode('individuell')
                if (activeTab === 'pakete') setActiveTab('design')
              }}
              className={`flex-1 flex flex-col items-center gap-1 px-3 py-3 text-sm font-bold transition-all duration-300 shadow-sm ${
                configMode === 'individuell'
                  ? 'text-white bg-gradient-to-br from-orange-400 to-orange-500 shadow-md scale-102'
                  : 'text-gray-600 dark:text-gray-400 hover:text-orange-400 hover:bg-white dark:hover:bg-gray-700'
              }`}
              style={{ borderRadius: '10px' }}
            >
              <span className="font-bold text-base">INDIVIDUELL</span>
              <span className="text-xs opacity-90">Selbst anpassen</span>
            </button>
          </div>
          
          {/* Sub-Tabs nur für Individuell - kompakter */}
          {configMode === 'individuell' && (
            <div className="flex bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-1">
              {[
                { key: 'design', label: 'Design', Icon: MdBrush },
                { key: 'color', label: 'Farben', Icon: MdPalette },
                { key: 'features', label: 'Features', Icon: MdStar },
                { key: 'layout', label: 'Umfang', Icon: MdDescription }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium transition-all duration-200 mx-1 ${
                    activeTab === tab.key
                      ? 'text-orange-500 dark:text-orange-400 bg-white dark:bg-gray-700 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                  style={{ borderRadius: '0.625rem' }}
                >
                  <tab.Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* Paket Mode - Dynamisch und übersichtlich */}
          {configMode === 'paket' && (
            <div className="space-y-3 sm:space-y-4">
              {/* Alle Pakete direkt anzeigen */}
              {packages.map((pkg) => (
                <div key={pkg.key}>
                  <button
                    onClick={() => applyPackage(pkg.key as '1' | '2' | '3')}
                    className={`w-full p-3 sm:p-4 text-left border-2 sm:border-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
                      activePackage === pkg.key
                        ? 'border-orange-400 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 shadow-md scale-102'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                    style={{ borderRadius: '1rem' }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Responsive Nummerierung */}
                      <div 
                        className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center font-bold text-base sm:text-lg shadow-sm ${
                          activePackage === pkg.key
                            ? 'bg-orange-400 text-white ring-1 sm:ring-2 ring-orange-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                        style={{ borderRadius: '0.875rem' }}
                      >
                        {pkg.number}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-lg sm:text-xl truncate ${
                          activePackage === pkg.key
                            ? 'text-orange-600 dark:text-orange-300'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {pkg.name}
                        </div>
                        <div className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                          activePackage === pkg.key
                            ? 'text-orange-500 dark:text-orange-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {pkg.feature}
                        </div>
                      </div>
                      
                                                                    {/* Überschneidende Farbkreise */}
                      <div className="flex items-center -space-x-1">
                        {pkg.colors.map((color: string, index: number) => (
                          <div 
                            key={index}
                            className={`w-5 h-5 rounded-full border-2 shadow-sm ${
                              activePackage === pkg.key
                                ? 'border-white dark:border-gray-800'
                                : 'border-gray-200 dark:border-gray-600'
                            }`}
                            style={{ 
                              backgroundColor: color,
                              zIndex: pkg.colors.length - index
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                </div>
              ))}


            </div>
          )}

          {/* Layout Toggle für Bestseller */}
          {configMode === 'paket' && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="text-center mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Webseite-Umfang</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wählen Sie zwischen kompakter und erweiterter Webseite</p>
              </div>
              
              <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => handleSiteModeChange('onepage')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-all duration-200 ${
                    currentSiteMode === 'onepage'
                      ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  style={{ borderRadius: '0.5rem' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span>One Pager</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSiteModeChange('multipage')}
                  className={`flex-1 py-2 px-4 text-sm font-medium transition-all duration-200 ${
                    currentSiteMode === 'multipage'
                      ? 'bg-white dark:bg-gray-600 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                  style={{ borderRadius: '0.5rem' }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2V8z"/>
                    </svg>
                    <span>Multi Pager</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                {currentSiteMode === 'onepage' 
                  ? 'Alle Inhalte auf einer Seite - perfekt für kleinere Betriebe'
                  : 'Separate Unterseiten für umfangreichere Inhalte'
                }
              </div>
            </div>
          )}

          {/* Individuell Mode - Funktional und vereinfacht mit halb runden Formen */}
          {configMode === 'individuell' && (
            <>
              {/* Design Tab */}
              {activeTab === 'design' && (
                <div className="space-y-4">
                  {[
                    { key: 'angular', name: 'Klassisch', desc: 'Eckig & traditionell', Icon: MdViewQuilt },
                    { key: 'rounded', name: 'Freundlich', desc: 'Rund & modern', Icon: MdImage },
                    { key: 'modern', name: 'Modern', desc: 'Minimalistisch', Icon: MdViewCarousel }
                  ].map((style) => (
                    <button
                      key={style.key}
                      onClick={() => handleDesignStyleChange(style.key as 'angular' | 'rounded' | 'modern')}
                      className={`w-full p-4 text-left border-2 transition-all ${
                        currentDesignStyle === style.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                      style={{ borderRadius: '1rem' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center ${
                          currentDesignStyle === style.key
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                        style={{ borderRadius: '0.875rem' }}>
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

              {/* Farben Tab - Horizontale Farb-Pills */}
              {activeTab === 'color' && (
                <div className="space-y-6">
                  {[
                    { key: 'warm', name: 'Warm', colors: ['#000000', '#D05733', '#9A8F88'] },
                    { key: 'modern', name: 'Modern', colors: ['#0F1A50', '#FD080F', '#8D8AD9'] },
                    { key: 'elegant', name: 'Elegant', colors: ['#18273A', '#987E4D', '#213044'] },
                    { key: 'nature', name: 'Nature', colors: ['#000000', '#BCD7B6', '#A8C99A'] }
                  ].map((scheme) => (
                    <button
                      key={scheme.key}
                      onClick={() => handleColorSchemeChange(scheme.key as 'warm' | 'modern' | 'elegant' | 'nature')}
                      className={`w-full p-4 border-2 transition-all duration-300 hover:shadow-lg ${
                        currentColorScheme === scheme.key
                          ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20 shadow-md ring-2 ring-orange-200'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-800'
                      }`}
                      style={{ borderRadius: '1rem' }}
                    >
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          {scheme.colors.map((color, index) => (
                            <div 
                              key={index} 
                              className="w-6 h-6 rounded-full shadow-sm border-2 border-white dark:border-gray-800" 
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-4">
                  {[
                    { key: 'contactBar', name: 'Kontakt-Leiste', desc: 'Fixe Telefon-Leiste oben', Icon: MdPhoneInTalk },
                    { key: 'sideContact', name: 'Side Contact', desc: 'Floating Kontakt-Button', Icon: MdCall }
                  ].map((feature) => (
                    <button
                      key={feature.key}
                      onClick={() => handleFeatureToggle(feature.key as keyof typeof features)}
                      className={`w-full p-4 text-left border-2 transition-all ${
                        features[feature.key as keyof typeof features]
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                      style={{ borderRadius: '1rem' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 flex items-center justify-center ${
                            features[feature.key as keyof typeof features]
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}
                          style={{ borderRadius: '0.875rem' }}>
                            <feature.Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{feature.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{feature.desc}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 text-xs font-medium ${
                          features[feature.key as keyof typeof features]
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                        }`}
                        style={{ borderRadius: '0.75rem' }}>
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
                  {[
                    { key: 'onepage', name: 'One-Page', desc: 'Alles auf einer Seite', Icon: MdDescription },
                    { key: 'multipage', name: 'Multi-Page', desc: 'Mehrere Unterseiten', Icon: MdViewModule }
                  ].map((mode) => (
                    <button
                      key={mode.key}
                      onClick={() => changeSiteMode(mode.key as 'onepage' | 'multipage')}
                      className={`w-full p-4 text-left border-2 transition-all ${
                        currentSiteMode === mode.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                      style={{ borderRadius: '1rem' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 flex items-center justify-center ${
                          currentSiteMode === mode.key
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                        style={{ borderRadius: '0.875rem' }}>
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
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 transition-colors"
            style={{ borderRadius: '16px' }}
          >
            Webseite anzeigen
          </button>
        </div>
      </div>
    </div>
  )
} 