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
    handwerker: {
      name: 'Handwerker Classic',
      colors: {
        primary: '#c49a6c',
        secondary: '#497174',
        accent: '#f4a261',
        background: '#ffffff',
        surface: '#f8f8f8',
        text: '#1a1a1a',
        'text-light': '#ffffff',
        'text-secondary': '#6f6f6f'
      }
    },
    modern: {
      name: 'Modern Blue',
      colors: {
        primary: '#3b82f6',
        secondary: '#1e40af',
        accent: '#60a5fa',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#0f172a',
        'text-light': '#ffffff',
        'text-secondary': '#64748b'
      }
    },
    warm: {
      name: 'Warm Earth',
      colors: {
        primary: '#d97706',
        secondary: '#92400e',
        accent: '#fbbf24',
        background: '#ffffff',
        surface: '#fffbeb',
        text: '#1f2937',
        'text-light': '#ffffff',
        'text-secondary': '#6b7280'
      }
    },
    green: {
      name: 'Nature Green',
      colors: {
        primary: '#059669',
        secondary: '#047857',
        accent: '#34d399',
        background: '#ffffff',
        surface: '#f0fdf4',
        text: '#0f172a',
        'text-light': '#ffffff',
        'text-secondary': '#64748b'
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
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 Vereinfachter Farbkonfigurator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Nur 8 essenzielle Farben - Einfach & Übersichtlich
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
          {/* Preset-Schemata */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              🚀 Schnell-Auswahl
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(presetSchemes).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary transition-colors text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full border" 
                      style={{ backgroundColor: preset.colors.primary }}
                    ></div>
                    <span className="font-medium text-sm">{preset.name}</span>
                  </div>
                  <div className="flex gap-1">
                    {[preset.colors.primary, preset.colors.secondary, preset.colors.accent].map((color, i) => (
                      <div 
                        key={i}
                        className="w-3 h-3 rounded-sm border border-gray-200" 
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Individuelle Farbanpassung */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              🎯 Individuelle Anpassung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(colors).map(([colorKey, colorValue]) => {
                const label = colorLabels[colorKey as keyof typeof colorLabels]
                return (
                  <div key={colorKey} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                    <div className="flex-shrink-0">
                      <div 
                        className="w-12 h-12 border border-gray-200 dark:border-gray-600 cursor-pointer rounded-lg"
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {label.description}
                      </p>
                      <input
                        type="text"
                        value={colorValue.toUpperCase()}
                        onChange={(e) => handleColorChange(colorKey as keyof SimpleColors, e.target.value)}
                        className="w-full px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Vorschau Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  showPreview 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {showPreview ? '👁️ Vorschau AN' : '👁️ Vorschau AUS'}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Änderungen werden sofort angewendet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 