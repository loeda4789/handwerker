'use client'

import { useState, useEffect } from 'react'

export default function DevButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentHeroType, setCurrentHeroType] = useState<string>('single')
  const [currentSiteMode, setCurrentSiteMode] = useState<'onepage' | 'multipage'>('onepage')

  // Aktuellen Hero-Typ und Site-Mode beim Laden ermitteln
  useEffect(() => {
    // Demo-Fallback aus localStorage prüfen
    const demoType = localStorage.getItem('demo-hero-type')
    if (demoType) {
      setCurrentHeroType(demoType)
    } else {
      setCurrentHeroType('single') // Standard-Fallback
    }

    // Site-Mode aus localStorage laden
    const siteMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (siteMode) {
      setCurrentSiteMode(siteMode)
    }
  }, [])

  const testBranchenSystem = () => {
    console.log('=== BRANCHENSYSTEM TEST ===')
    
    // Aktuelle URL anzeigen
    console.log('Aktuelle URL:', window.location.href)
    
    // URL-Parameter prüfen
    const urlParams = new URLSearchParams(window.location.search)
    const branche = urlParams.get('branche')
    console.log('Branche-Parameter:', branche || 'nicht gesetzt')
    
    // Verfügbare Branchen anzeigen
    console.log('Verfügbare Branchen: dachdecker, elektriker')
    
    // Test-Links generieren
    const baseUrl = window.location.origin + window.location.pathname
    console.log('Test-Links:')
    console.log('Standard (Fliesenleger):', baseUrl)
    console.log('Dachdecker:', baseUrl + '?branche=dachdecker')
    console.log('Elektriker:', baseUrl + '?branche=elektriker')
  }

  const testDachdeckerLink = () => {
    const baseUrl = window.location.origin + window.location.pathname
    window.location.href = baseUrl + '?branche=dachdecker'
  }

  const testElektrikerLink = () => {
    const baseUrl = window.location.origin + window.location.pathname
    window.location.href = baseUrl + '?branche=elektriker'
  }

  const testStandardLink = () => {
    const baseUrl = window.location.origin + window.location.pathname
    window.location.href = baseUrl
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

  const changeSiteMode = (mode: 'onepage' | 'multipage') => {
    setCurrentSiteMode(mode)
    localStorage.setItem('site-mode', mode)
    console.log('🔄 Site-Mode geändert zu:', mode)
    
    // Seite neu laden für sofortige Änderung
    window.location.reload()
  }

  const previewMultiPageRoutes = () => {
    console.log('=== MULTI-PAGE STRUKTUR ===')
    const baseUrl = window.location.origin
    console.log('Verfügbare Routen:')
    console.log('Startseite:', baseUrl)
    console.log('Services:', baseUrl + '/services')
    console.log('Referenzen:', baseUrl + '/referenzen')
    console.log('Kontakt:', baseUrl + '/kontakt')
    console.log('FAQ:', baseUrl + '/faq')
    console.log('Über uns:', baseUrl + '/ueber-uns')
    console.log('')
    console.log('Service-Einzelseiten:')
    console.log('Dachfenster:', baseUrl + '/services/dachfenster')
    console.log('Dachrinnen:', baseUrl + '/services/dachrinnen')
    console.log('Neubau:', baseUrl + '/services/neubau')
    console.log('Reparaturen:', baseUrl + '/services/reparaturen')
    console.log('Sanierung:', baseUrl + '/services/sanierung')
  }

  const heroVariants = [
    { key: 'single', name: '1. Single', icon: '🏠', description: 'Klassischer Hero' },
    { key: 'slider', name: '2. Slider', icon: '🎬', description: 'Slideshow mit 2 Slides' },
    { key: '3d', name: '3. 3D', icon: '🎨', description: 'Moderne 3D-Effekte' },
    { key: 'split', name: '5. Split', icon: '📱', description: 'Geteiltes Layout' }
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        title="Development Tools"
      >
        🔧
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-sm max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800 dark:text-white">Dev Tools</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      {/* Site-Mode Sektion */}
      <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <h4 className="font-semibold text-sm text-purple-800 dark:text-purple-200 mb-2 flex items-center">
          🌐 Website-Modus
          <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">
            {currentSiteMode === 'onepage' ? 'One-Page' : 'Multi-Page'}
          </span>
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => changeSiteMode('onepage')}
            className={`p-2 text-xs rounded transition-all duration-200 text-left hover:scale-105 ${
              currentSiteMode === 'onepage'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-700'
            }`}
          >
            <div className="font-medium">📄 One-Page Modus</div>
            <div className="text-xs opacity-75 mt-1">Alle Inhalte auf einer Seite</div>
          </button>
          <button
            onClick={() => changeSiteMode('multipage')}
            className={`p-2 text-xs rounded transition-all duration-200 text-left hover:scale-105 ${
              currentSiteMode === 'multipage'
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-700'
            }`}
          >
            <div className="font-medium">🗂️ Multi-Page Modus</div>
            <div className="text-xs opacity-75 mt-1">Separate Unterseiten</div>
          </button>
        </div>
        <button
          onClick={previewMultiPageRoutes}
          className="w-full mt-2 px-2 py-1 bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded text-xs hover:bg-purple-300 dark:hover:bg-purple-600 transition-colors"
        >
          🔍 Routen anzeigen
        </button>
        <p className="text-xs text-purple-600 dark:text-purple-300 mt-2">
          💡 Klicken zum Wechseln - Seite wird neu geladen
        </p>
      </div>

      {/* Hero-Varianten Sektion */}
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2 flex items-center">
          🎭 Hero-Varianten
          <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
            Aktuell: {currentHeroType}
          </span>
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {heroVariants.map((variant) => (
            <button
              key={variant.key}
              onClick={() => changeHeroType(variant.key as any)}
              className={`p-2 text-xs rounded transition-all duration-200 text-left hover:scale-105 ${
                currentHeroType === variant.key
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700'
              }`}
              title={variant.description}
            >
              <div className="font-medium">{variant.icon} {variant.name}</div>
              <div className="text-xs opacity-75 mt-1">{variant.description}</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-300 mt-2">
          💡 Klicken zum Wechseln - Seite wird neu geladen
        </p>
      </div>

      {/* Branchen-System Sektion */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">🏗️ Branchen-System</h4>
        
        <button
          onClick={testBranchenSystem}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          🔍 Test Branchensystem
        </button>
        
        <button
          onClick={testStandardLink}
          className="w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
        >
          🔧 → Standard (Fliesenleger)
        </button>
        
        <button
          onClick={testDachdeckerLink}
          className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
        >
          🏠 → Dachdecker
        </button>

        <button
          onClick={testElektrikerLink}
          className="w-full px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
        >
          ⚡ → Elektriker
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        <p>Console für Details öffnen</p>
      </div>
    </div>
  )
} 