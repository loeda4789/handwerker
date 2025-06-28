'use client'

import { useState, useEffect } from 'react'

interface ColorConfiguratorProps {
  isOpen: boolean
  onClose: () => void
}

interface CustomColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
}

export default function ColorConfigurator({ isOpen, onClose }: ColorConfiguratorProps) {
  const [colors, setColors] = useState<CustomColors>({
    primary: '#ff6b35',
    secondary: '#e55527',
    accent: '#ff8a5b',
    background: '#ffffff',
    surface: '#fff8f5',
    text: '#0f1419',
    textSecondary: '#6b7280',
    border: '#fed7cc'
  })

  const [previewMode, setPreviewMode] = useState(false)

  // Farben aus localStorage laden
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedColors = localStorage.getItem('custom-colors')
      if (savedColors) {
        setColors(JSON.parse(savedColors))
      }
    }
  }, [])

  // Farben anwenden
  const applyColors = (newColors: CustomColors, save: boolean = false) => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    Object.entries(newColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    if (save) {
      localStorage.setItem('custom-colors', JSON.stringify(newColors))
      localStorage.setItem('color-scheme', 'custom')
      console.log('🎨 Custom Farben gespeichert:', newColors)
    }
  }

  // Farbe ändern
  const handleColorChange = (colorKey: keyof CustomColors, value: string) => {
    const newColors = { ...colors, [colorKey]: value }
    setColors(newColors)
    
    if (previewMode) {
      applyColors(newColors, false)
    }
  }

  // Vorschau aktivieren/deaktivieren
  const togglePreview = () => {
    setPreviewMode(!previewMode)
    if (!previewMode) {
      applyColors(colors, false)
    }
  }

  // Farben speichern
  const saveColors = () => {
    applyColors(colors, true)
    window.dispatchEvent(new Event('storage'))
    onClose()
  }

  // Farben zurücksetzen
  const resetColors = () => {
    const defaultColors: CustomColors = {
      primary: '#ff6b35',
      secondary: '#e55527', 
      accent: '#ff8a5b',
      background: '#ffffff',
      surface: '#fff8f5',
      text: '#0f1419',
      textSecondary: '#6b7280',
      border: '#fed7cc'
    }
    setColors(defaultColors)
    applyColors(defaultColors, false)
  }

  // Farbschema-Presets
  const presets = {
    orange: {
      primary: '#ff6b35',
      secondary: '#e55527',
      accent: '#ff8a5b',
      background: '#ffffff',
      surface: '#fff8f5',
      text: '#0f1419',
      textSecondary: '#6b7280',
      border: '#fed7cc'
    },
    blue: {
      primary: '#0066ff',
      secondary: '#0052cc',
      accent: '#3d8bff',
      background: '#ffffff',
      surface: '#f7faff',
      text: '#0f1419',
      textSecondary: '#6b7280',
      border: '#e1ecff'
    },
    green: {
      primary: '#00d9aa',
      secondary: '#00b894',
      accent: '#26e5b8',
      background: '#ffffff',
      surface: '#f0fffe',
      text: '#0f1419',
      textSecondary: '#6b7280',
      border: '#ccf7ed'
    },
    purple: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#a855f7',
      background: '#ffffff',
      surface: '#faf7ff',
      text: '#0f1419',
      textSecondary: '#6b7280',
      border: '#ede9fe'
    }
  }

  const applyPreset = (preset: keyof typeof presets) => {
    const presetColors = presets[preset]
    setColors(presetColors)
    if (previewMode) {
      applyColors(presetColors, false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{ borderRadius: 'var(--radius-modal)' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎨 Farbkonfigurator
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Passen Sie alle Farben individuell an Ihre Bedürfnisse an
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
              Schnelle Presets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(presets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key as keyof typeof presets)}
                  className="p-3 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors text-center"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  <div className="flex space-x-1 mb-2 justify-center">
                    <div 
                      className="w-4 h-4" 
                      style={{ backgroundColor: preset.primary, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                    <div 
                      className="w-4 h-4" 
                      style={{ backgroundColor: preset.secondary, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                    <div 
                      className="w-4 h-4" 
                      style={{ backgroundColor: preset.accent, borderRadius: 'var(--radius-sm)' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {key}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Farbeinstellungen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hauptfarben */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Hauptfarben
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primärfarbe (Header, Sektionen)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#ff6b35"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sekundärfarbe (Buttons, Akzente)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#e55527"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Akzentfarbe (Hover, Highlights)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#ff8a5b"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hintergrund & Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Hintergrund & Text
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hintergrundfarbe
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Oberflächenfarbe (Cards)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.surface}
                      onChange={(e) => handleColorChange('surface', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.surface}
                      onChange={(e) => handleColorChange('surface', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#fff8f5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Textfarbe
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.text}
                      onChange={(e) => handleColorChange('text', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#0f1419"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sekundäre Textfarbe
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.textSecondary}
                      onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.textSecondary}
                      onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#6b7280"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rahmenfarbe
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={colors.border}
                      onChange={(e) => handleColorChange('border', e.target.value)}
                      className="w-12 h-10 border border-gray-300 dark:border-gray-600"
                      style={{ borderRadius: 'var(--radius-button)' }}
                    />
                    <input
                      type="text"
                      value={colors.border}
                      onChange={(e) => handleColorChange('border', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      style={{ borderRadius: 'var(--radius-input)' }}
                      placeholder="#fed7cc"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vorschau & Kontrollen */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
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
                ✅ Farben speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 