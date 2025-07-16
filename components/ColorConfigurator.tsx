'use client'

import { useState, useEffect } from 'react'

interface ColorConfiguratorProps {
  isOpen: boolean
  onClose: () => void
}

interface SimpleColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  'text-light': string
  'text-secondary': string
}

type ViewMode = 'packages' | 'custom'

export default function ColorConfigurator({ isOpen, onClose }: ColorConfiguratorProps) {
  const [colors, setColors] = useState<SimpleColors>({
    primary: '#c49a6c',
    secondary: '#497174', 
    accent: '#f4a261',
    background: '#ffffff',
    surface: '#f8f8f8',
    text: '#1a1a1a',
    'text-light': '#ffffff',
    'text-secondary': '#6f6f6f'
  })

  const [viewMode, setViewMode] = useState<ViewMode>('packages')
  const [showPreview, setShowPreview] = useState(false)

  // Farben beim Laden aus localStorage wiederherstellen
  useEffect(() => {
    const savedColors = localStorage.getItem('simple-colors')
    if (savedColors) {
      try {
        const parsedColors = JSON.parse(savedColors)
        setColors(parsedColors)
        applyColors(parsedColors, false)
      } catch (error) {
        console.error('Fehler beim Laden der Farben:', error)
      }
    }
  }, [])

  // Einzelne Farbe ändern
  const handleColorChange = (colorKey: keyof SimpleColors, newColor: string) => {
    const newColors = { ...colors, [colorKey]: newColor }
    setColors(newColors)
    applyColors(newColors, true)
  }

  // Farben anwenden
  const applyColors = (newColors: SimpleColors, save: boolean = false) => {
    const root = document.documentElement
    
    // Alle Farben als CSS-Variablen setzen
    Object.entries(newColors).forEach(([key, color]) => {
      const cssVarName = key === 'text-light' ? '--color-text-light' : 
                        key === 'text-secondary' ? '--color-text-secondary' :
                        `--color-${key}`
      root.style.setProperty(cssVarName, color)
    })
    
    if (save) {
      localStorage.setItem('simple-colors', JSON.stringify(newColors))
    }
  }

  // Vordefinierte Farbschemata
  const presetSchemes = {
    warm: {
      name: 'Warm & Elegant',
      description: 'Warme, einladende Farben für traditionelle Handwerksbetriebe',
      colors: {
        primary: '#291D1E',
        secondary: '#F5A454',
        accent: '#F6D7AC',
        background: '#ffffff',
        surface: '#faf8f5',
        text: '#291D1E',
        'text-light': '#ffffff',
        'text-secondary': '#8B6F47'
      }
    },
    modern: {
      name: 'Modern & Energetisch',
      description: 'Klare, moderne Farben für zeitgemäße Unternehmen',
      colors: {
        primary: '#1C1C1C',
        secondary: '#FA3D3B',
        accent: '#C6C6C6',
        background: '#ffffff',
        surface: '#f8f8f8',
        text: '#1C1C1C',
        'text-light': '#ffffff',
        'text-secondary': '#666666'
      }
    },
    elegant: {
      name: 'Elegant & Frisch',
      description: 'Elegante, professionelle Farben für anspruchsvolle Kunden',
      colors: {
        primary: '#1D2D50',
        secondary: '#B0D7FF',
        accent: '#FAF7F2',
        background: '#ffffff',
        surface: '#f8fafe',
        text: '#1D2D50',
        'text-light': '#ffffff',
        'text-secondary': '#5A6B8C'
      }
    },
    natural: {
      name: 'Natürlich & Erdverbunden',
      description: 'Natürliche Erdtöne für umweltbewusste Betriebe',
      colors: {
        primary: '#2D5016',
        secondary: '#8FBC8F',
        accent: '#E6F3E6',
        background: '#ffffff',
        surface: '#f8faf8',
        text: '#2D5016',
        'text-light': '#ffffff',
        'text-secondary': '#6B8B3D'
      }
    }
  }

  const applyPreset = (presetKey: string) => {
    const preset = presetSchemes[presetKey as keyof typeof presetSchemes]
    if (preset) {
      setColors(preset.colors)
      applyColors(preset.colors, true)
    }
  }

  // Farb-Labels mit Icons
  const colorLabels = {
    primary: { name: 'Hauptfarbe', icon: '🎨', description: 'Ihre Markenfarbe' },
    secondary: { name: 'Kontrastfarbe', icon: '🔵', description: 'Sekundäre Akzente' },
    accent: { name: 'Highlight', icon: '✨', description: 'Hover & Effekte' },
    background: { name: 'Hintergrund', icon: '⬜', description: 'Haupt-Hintergrund' },
    surface: { name: 'Oberfläche', icon: '🔲', description: 'Cards & Sektionen' },
    text: { name: 'Text', icon: '📝', description: 'Haupt-Text' },
    'text-light': { name: 'Heller Text', icon: '💡', description: 'Text auf dunklem Hintergrund' },
    'text-secondary': { name: 'Grauer Text', icon: '🔗', description: 'Sekundäre Infos' }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 Farbkonfigurator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Gestalten Sie das Erscheinungsbild Ihrer Website
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Toggle-Button */}
          <div className="flex mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg flex">
              <button
                onClick={() => setViewMode('packages')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  viewMode === 'packages'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📦 Fertige Pakete
              </button>
              <button
                onClick={() => setViewMode('custom')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  viewMode === 'custom'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🎯 Eigene Anpassung
              </button>
            </div>
          </div>

          {/* Packages View */}
          {viewMode === 'packages' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Wählen Sie ein vorgefertigtes Farbschema
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Professionell gestaltete Farbkombinationen, die sofort einsatzbereit sind.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(presetSchemes).map(([key, preset]) => (
                  <div
                    key={key}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-5 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => applyPreset(key)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {preset.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {preset.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Farbvorschau */}
                    <div className="flex gap-2 mb-3">
                      <div 
                        className="w-8 h-8 rounded-md border border-gray-200" 
                        style={{ backgroundColor: preset.colors.primary }}
                        title="Hauptfarbe"
                      ></div>
                      <div 
                        className="w-8 h-8 rounded-md border border-gray-200" 
                        style={{ backgroundColor: preset.colors.secondary }}
                        title="Kontrastfarbe"
                      ></div>
                      <div 
                        className="w-8 h-8 rounded-md border border-gray-200" 
                        style={{ backgroundColor: preset.colors.accent }}
                        title="Akzentfarbe"
                      ></div>
                      <div 
                        className="w-8 h-8 rounded-md border border-gray-200" 
                        style={{ backgroundColor: preset.colors.surface }}
                        title="Oberflächenfarbe"
                      ></div>
                    </div>
                    
                    <button className="w-full bg-gray-50 dark:bg-gray-700 hover:bg-orange-50 dark:hover:bg-orange-900 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 py-2 rounded-md text-sm font-medium transition-colors">
                      Dieses Schema verwenden
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom View */}
          {viewMode === 'custom' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                  Individuelle Farbanpassung
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Passen Sie jede Farbe einzeln an Ihre Bedürfnisse an.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(colors).map(([colorKey, colorValue]) => {
                  const label = colorLabels[colorKey as keyof typeof colorLabels]
                  return (
                    <div key={colorKey} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-14 h-14 border border-gray-200 dark:border-gray-600 cursor-pointer rounded-lg transition-transform hover:scale-105"
                          style={{ backgroundColor: colorValue }}
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'color'
                            input.value = colorValue
                            input.onchange = (e) => handleColorChange(
                              colorKey as keyof SimpleColors, 
                              (e.target as HTMLInputElement).value
                            )
                            input.click()
                          }}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{label.icon}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {label.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {label.description}
                        </p>
                        <input
                          type="text"
                          value={colorValue.toUpperCase()}
                          onChange={(e) => handleColorChange(colorKey as keyof SimpleColors, e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Footer mit Vorschau Toggle */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showPreview 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-800'
                }`}
              >
                {showPreview ? '👁️ Vorschau AN' : '👁️ Vorschau AUS'}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Änderungen werden automatisch gespeichert
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 