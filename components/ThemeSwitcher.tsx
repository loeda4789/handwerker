'use client'

import { useState, useEffect } from 'react'

const themes = {
  handwerker: {
    name: 'Handwerk Natur',
    icon: '🏗️',
    colors: {
      primary: '#c49a6c',
      secondary: '#497174', 
      accent: '#f4e9dc',
      background: '#fafafa',
      surface: '#f5f5f4',
      text: '#1a1a1a',
      textSecondary: '#6f6f6f',
      border: '#e0e0e0'
    }
  },
  elegant: {
    name: 'Elegant Grau',
    icon: '🏛️',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#f3f4f6',
      background: '#f9fafb',
      surface: '#ffffff',
      text: '#111827',
      textSecondary: '#6b7280',
      border: '#d1d5db'
    }
  },
  modern: {
    name: 'Modern Blau',
    icon: '🏢',
    colors: {
      primary: '#1d4ed8',
      secondary: '#3b82f6',
      accent: '#dbeafe',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f172a',
      textSecondary: '#475569',
      border: '#cbd5e1'
    }
  },
  warm: {
    name: 'Warm Orange',
    icon: '🔥',
    colors: {
      primary: '#dc2626',
      secondary: '#f97316',
      accent: '#fef3c7',
      background: '#fffbeb',
      surface: '#fff7ed',
      text: '#1c1917',
      textSecondary: '#78716c',
      border: '#fed7aa'
    }
  }
}

type ThemeKey = keyof typeof themes

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('handwerker')
  const [isOpen, setIsOpen] = useState(false)

  // CSS Custom Properties aktualisieren
  const updateCSSVariables = (theme: typeof themes[ThemeKey]) => {
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }

  // Theme wechseln
  const switchTheme = (themeKey: ThemeKey) => {
    setActiveTheme(themeKey)
    updateCSSVariables(themes[themeKey])
    localStorage.setItem('selectedTheme', themeKey)
    setIsOpen(false)
  }

  // Theme beim Laden der Seite wiederherstellen
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeKey
    if (savedTheme && themes[savedTheme]) {
      setActiveTheme(savedTheme)
      updateCSSVariables(themes[savedTheme])
    } else {
      // Standardtheme laden
      updateCSSVariables(themes.handwerker)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Options - nur wenn geöffnet */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-dark-secondary rounded-xl shadow-2xl border border-border dark:border-text-secondary p-3 mb-2 animate-in slide-in-from-bottom duration-200">
          <div className="grid grid-cols-2 gap-2 min-w-[200px]">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => switchTheme(key as ThemeKey)}
                className={`p-3 rounded-lg transition-all duration-200 text-left hover:scale-105 ${
                  activeTheme === key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface dark:bg-dark hover:bg-primary/10 dark:hover:bg-primary/20'
                }`}
                title={theme.name}
              >
                <div className="text-lg mb-1">{theme.icon}</div>
                <div className="text-xs font-medium text-text dark:text-light">
                  {theme.name}
                </div>
                {/* Farbvorschau */}
                <div className="flex gap-1 mt-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-white/50"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-3 h-3 rounded-full border border-white/50"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-3 h-3 rounded-full border border-white/50"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        title="Farbschema wechseln"
      >
        {isOpen ? (
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
          </svg>
        )}
      </button>
    </div>
  )
} 