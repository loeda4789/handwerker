'use client'

import React, { useState, useEffect } from 'react'

interface ThemeEditorProps {
  isOpen: boolean
  onClose: () => void
}

export default function ThemeEditor({ isOpen, onClose }: ThemeEditorProps) {
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

  // Gespeicherte Farben beim Laden wiederherstellen
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-colors')
      if (saved) {
        try {
          const savedColors = JSON.parse(saved)
          setColors(savedColors)
        } catch (e) {
          console.log('Fehler beim Laden der gespeicherten Farben')
        }
      }
    }
  }, [])

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const resetColors = () => {
    const defaultColors = {
      primary: '#d97706',
      secondary: '#0ea5e9', 
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb'
    }
    setColors(defaultColors)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
      <div className="fixed top-4 right-4 w-80 bg-gray-900 border border-yellow-400 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="bg-yellow-400 text-gray-900 px-4 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">🎨</span>
              <h3 className="font-bold text-sm">THEME EDITOR</h3>
              <span className="text-xs bg-gray-900 text-yellow-400 px-2 py-1 rounded">DEV</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 max-h-96 overflow-y-auto text-white">
          <div className="space-y-3">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium capitalize text-gray-300">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border border-gray-600"
                    style={{ backgroundColor: value }}
                  ></div>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-8 h-8 border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-20 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            <button
              onClick={resetColors}
              className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
            >
              🔄 Standard zurücksetzen
            </button>
            <button
              onClick={exportTheme}
              className="w-full px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded transition-colors"
            >
              📁 Theme exportieren
            </button>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
            <p className="text-xs text-gray-400">
              <strong>💡 Hinweis:</strong> Änderungen werden automatisch gespeichert und beim nächsten Besuch wiederhergestellt.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 