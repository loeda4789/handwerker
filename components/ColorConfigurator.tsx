'use client'

import { useState, useEffect } from 'react'

interface ColorConfiguratorProps {
  isOpen: boolean
  onClose: () => void
}

interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string // Hauptfarbe
  600: string
  700: string
  800: string
  900: string
}

interface AdditionalColors {
  background: string
  surface: string
  text: string
  'text-secondary': string
  border: string
  dark: string
  'dark-secondary': string
  light: string
}

interface ColorPalettes {
  primary: ColorPalette
  secondary: ColorPalette
  accent: ColorPalette
}

interface AllColors {
  palettes: ColorPalettes
  additional: AdditionalColors
}

// Hilfsfunktion um Farbpalette aus Hauptfarbe zu generieren
const generateColorPalette = (baseColor: string): ColorPalette => {
  // Konvertiere Hex zu HSL für bessere Farbmanipulation
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const [h, s, l] = hexToHsl(baseColor)

  return {
    50: hslToHex(h, Math.max(s - 40, 10), Math.min(l + 40, 95)),
    100: hslToHex(h, Math.max(s - 30, 15), Math.min(l + 30, 90)),
    200: hslToHex(h, Math.max(s - 20, 20), Math.min(l + 20, 85)),
    300: hslToHex(h, Math.max(s - 10, 25), Math.min(l + 10, 75)),
    400: hslToHex(h, s, Math.min(l + 5, 65)),
    500: baseColor, // Originalfarbe
    600: hslToHex(h, Math.min(s + 10, 100), Math.max(l - 10, 35)),
    700: hslToHex(h, Math.min(s + 20, 100), Math.max(l - 20, 25)),
    800: hslToHex(h, Math.min(s + 30, 100), Math.max(l - 30, 15)),
    900: hslToHex(h, Math.min(s + 40, 100), Math.max(l - 40, 5))
  }
}

export default function ColorConfigurator({ isOpen, onClose }: ColorConfiguratorProps) {
  const [palettes, setPalettes] = useState<ColorPalettes>({
    primary: generateColorPalette('#ff6b35'),
    secondary: generateColorPalette('#e55527'),
    accent: generateColorPalette('#ff8a5b')
  })

  const [additionalColors, setAdditionalColors] = useState<AdditionalColors>({
    background: '#ffffff',
    surface: '#f8f8f8',
    text: '#1a1a1a',
    'text-secondary': '#6f6f6f',
    border: '#e0e0e0',
    dark: '#0f172a',
    'dark-secondary': '#1e293b',
    light: '#f1f5f9'
  })

  const [previewMode, setPreviewMode] = useState(false)

  // Farben aus localStorage laden
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPalettes = localStorage.getItem('color-palettes')
      const savedAdditional = localStorage.getItem('additional-colors')
      
      if (savedPalettes) {
        setPalettes(JSON.parse(savedPalettes))
      }
      if (savedAdditional) {
        setAdditionalColors(JSON.parse(savedAdditional))
      }
    }
  }, [])

  // Alle Farben anwenden
  const applyColors = (newPalettes: ColorPalettes, newAdditional: AdditionalColors, save: boolean = false) => {
    const root = document.documentElement
    
    // Paletten-Farben als CSS-Variablen setzen
    Object.entries(newPalettes).forEach(([paletteKey, palette]) => {
      Object.entries(palette).forEach(([shade, color]) => {
        root.style.setProperty(`--color-${paletteKey}-${shade}`, color as string)
      })
      // Hauptfarbe auch als Legacy-Variable setzen
      root.style.setProperty(`--color-${paletteKey}`, palette[500])
    })

    // Zusätzliche Farben setzen
    Object.entries(newAdditional).forEach(([colorKey, color]) => {
      root.style.setProperty(`--color-${colorKey}`, color)
    })

    if (save) {
      localStorage.setItem('color-palettes', JSON.stringify(newPalettes))
      localStorage.setItem('additional-colors', JSON.stringify(newAdditional))
      localStorage.setItem('color-scheme', 'custom-complete')
      console.log('🎨 Vollständiges Farbschema gespeichert:', { palettes: newPalettes, additional: newAdditional })
    }
  }

  // Hauptfarbe ändern und Palette neu generieren
  const handleMainColorChange = (paletteKey: keyof ColorPalettes, mainColor: string) => {
    const newPalette = generateColorPalette(mainColor)
    const newPalettes = { ...palettes, [paletteKey]: newPalette }
    setPalettes(newPalettes)
    
    if (previewMode) {
      applyColors(newPalettes, additionalColors, false)
    }
  }

  // Einzelne Farbe in Palette ändern
  const handleShadeChange = (paletteKey: keyof ColorPalettes, shade: keyof ColorPalette, color: string) => {
    const newPalettes = {
      ...palettes,
      [paletteKey]: {
        ...palettes[paletteKey],
        [shade]: color
      }
    }
    setPalettes(newPalettes)
    
    if (previewMode) {
      applyColors(newPalettes, additionalColors, false)
    }
  }

  // Zusätzliche Farbe ändern
  const handleAdditionalColorChange = (colorKey: keyof AdditionalColors, color: string) => {
    const newAdditional = { ...additionalColors, [colorKey]: color }
    setAdditionalColors(newAdditional)
    
    if (previewMode) {
      applyColors(palettes, newAdditional, false)
    }
  }

  // Vorschau aktivieren/deaktivieren
  const togglePreview = () => {
    setPreviewMode(!previewMode)
    if (!previewMode) {
      applyColors(palettes, additionalColors, false)
    }
  }

  // Alle Farben speichern
  const saveColors = () => {
    applyColors(palettes, additionalColors, true)
    window.dispatchEvent(new Event('storage'))
    onClose()
  }

  // Farben zurücksetzen
  const resetColors = () => {
    const defaultPalettes: ColorPalettes = {
      primary: generateColorPalette('#ff6b35'),
      secondary: generateColorPalette('#e55527'),
      accent: generateColorPalette('#ff8a5b')
    }
    const defaultAdditional: AdditionalColors = {
      background: '#ffffff',
      surface: '#f8f8f8',
      text: '#1a1a1a',
      'text-secondary': '#6f6f6f',
      border: '#e0e0e0',
      dark: '#0f172a',
      'dark-secondary': '#1e293b',
      light: '#f1f5f9'
    }
    setPalettes(defaultPalettes)
    setAdditionalColors(defaultAdditional)
    applyColors(defaultPalettes, defaultAdditional, false)
  }

  // Vordefinierte Hauptfarben
  const presetMainColors = {
    orange: { primary: '#ff6b35', secondary: '#e55527', accent: '#ff8a5b' },
    blue: { primary: '#0066ff', secondary: '#0052cc', accent: '#3d8bff' },
    green: { primary: '#00d9aa', secondary: '#00b894', accent: '#26e5b8' },
    purple: { primary: '#7c3aed', secondary: '#6d28d9', accent: '#a855f7' },
    red: { primary: '#ef4444', secondary: '#dc2626', accent: '#f87171' },
    teal: { primary: '#14b8a6', secondary: '#0d9488', accent: '#5eead4' }
  }

  const applyPreset = (preset: keyof typeof presetMainColors) => {
    const colors = presetMainColors[preset]
    const newPalettes: ColorPalettes = {
      primary: generateColorPalette(colors.primary),
      secondary: generateColorPalette(colors.secondary),
      accent: generateColorPalette(colors.accent)
    }
    setPalettes(newPalettes)
    if (previewMode) {
      applyColors(newPalettes, additionalColors, false)
    }
  }

  // Zusätzliche Farben mit Labels
  const additionalColorLabels = {
    background: '🏠 Hintergrund',
    surface: '📄 Oberfläche',
    text: '📝 Text',
    'text-secondary': '📝 Text Sekundär',
    border: '🔲 Rahmen',
    dark: '🌙 Dunkel',
    'dark-secondary': '🌙 Dunkel Sekundär',
    light: '☀️ Hell'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-7xl max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: 'var(--radius-modal)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 Vollständige Farbkonfiguration
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Konfigurieren Sie alle Farben Ihres Design-Systems
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Preset Buttons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Schnelle Farbschema-Presets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(presetMainColors).map(([key, colors]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key as keyof typeof presetMainColors)}
                  className="p-3 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-center group"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  <div className="flex space-x-1 mb-2 justify-center">
                    <div 
                      className="w-4 h-4 group-hover:scale-110 transition-transform" 
                      style={{ backgroundColor: colors.primary, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                    <div 
                      className="w-4 h-4 group-hover:scale-110 transition-transform" 
                      style={{ backgroundColor: colors.secondary, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                    <div 
                      className="w-4 h-4 group-hover:scale-110 transition-transform" 
                      style={{ backgroundColor: colors.accent, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {key}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Zusätzliche Farben */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🎯 Basis-Farben
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(additionalColors).map(([colorKey, color]) => (
                <div key={colorKey} className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-white">
                    {additionalColorLabels[colorKey as keyof AdditionalColors]}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleAdditionalColorChange(colorKey as keyof AdditionalColors, e.target.value)}
                      className="w-12 h-8 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleAdditionalColorChange(colorKey as keyof AdditionalColors, e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                      style={{ borderRadius: 'var(--radius-input)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Farbpaletten */}
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🌈 Farbpaletten (10 Abstufungen)
            </h3>
            {Object.entries(palettes).map(([paletteKey, palette]) => (
              <div key={paletteKey}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-900 dark:text-white capitalize">
                    {paletteKey === 'primary' ? '🎯 Primärfarbe' : 
                     paletteKey === 'secondary' ? '🔧 Sekundärfarbe' : 
                     '✨ Akzentfarbe'} ({paletteKey})
                  </h4>
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Hauptfarbe:</label>
                    <input
                      type="color"
                      value={palette[500]}
                      onChange={(e) => handleMainColorChange(paletteKey as keyof ColorPalettes, e.target.value)}
                      className="w-12 h-8 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={palette[500]}
                      onChange={(e) => handleMainColorChange(paletteKey as keyof ColorPalettes, e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                      style={{ borderRadius: 'var(--radius-input)' }}
                    />
                  </div>
                </div>
                
                {/* Farbpalette anzeigen */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                  {Object.entries(palette).map(([shade, color]) => (
                    <div key={shade} className="text-center">
                      <div 
                        className="w-full h-16 border border-gray-200 dark:border-gray-600 cursor-pointer group relative overflow-hidden"
                        style={{ backgroundColor: color as string, borderRadius: 'var(--radius-card)' }}
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'color'
                          input.value = color as string
                          input.onchange = (e) => handleShadeChange(
                            paletteKey as keyof ColorPalettes, 
                            shade as unknown as keyof ColorPalette, 
                            (e.target as HTMLInputElement).value
                          )
                          input.click()
                        }}
                      >
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                          </svg>
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                          {shade}
                          {shade === '500' && ' ⭐'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {(color as string).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Verwendungshinweise */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
            style={{ borderRadius: 'var(--radius-card)' }}>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              💡 Verwendungstipps:
            </h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p><strong>Basis-Farben:</strong> Hintergrund, Text, Rahmen für das Layout</p>
              <p><strong>50-300:</strong> Helle Töne für Hintergründe, Hover-Zustände</p>
              <p><strong>400-500:</strong> Mittlere Töne für Standard-Buttons, Icons</p>
              <p><strong>600-900:</strong> Dunkle Töne für Text, starke Kontraste</p>
              <p><strong>⭐ 500:</strong> Hauptfarbe - Ihre Markenfarbe</p>
            </div>
          </div>

          {/* Vorschau & Kontrollen */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePreview}
                className={`px-4 py-2 font-medium transition-all duration-200 ${
                  previewMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                {previewMode ? '👁️ Vorschau AN' : '👁️ Vorschau AUS'}
              </button>
              
              <button
                onClick={resetColors}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                🔄 Zurücksetzen
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium transition-all duration-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Abbrechen
              </button>
              
              <button
                onClick={saveColors}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                ✅ Alle Farben speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 