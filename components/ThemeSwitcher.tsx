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
      background: '#ffffff',
      surface: '#f8f8f8',
      text: '#1a1a1a',
      textSecondary: '#6f6f6f',
      border: '#e0e0e0'
    }
  },
  elegant: {
    name: 'Elegant Grau',
    icon: '🏛️',
    colors: {
      primary: '#2d3748',
      secondary: '#4a5568',
      accent: '#e2e8f0',
      background: '#ffffff',
      surface: '#f7fafc',
      text: '#1a202c',
      textSecondary: '#718096',
      border: '#e2e8f0'
    }
  },
  modern: {
    name: 'Modern Blau',
    icon: '🏢',
    colors: {
      primary: '#2563eb',
      secondary: '#3b82f6',
      accent: '#dbeafe',
      background: '#ffffff',
      surface: '#f8fafc',
      text: '#1e293b',
      textSecondary: '#64748b',
      border: '#e2e8f0'
    }
  },
  warm: {
    name: 'Warm Orange',
    icon: '🔥',
    colors: {
      primary: '#ea580c',
      secondary: '#fb923c',
      accent: '#fed7aa',
      background: '#ffffff',
      surface: '#fff7ed',
      text: '#1c1917',
      textSecondary: '#78716c',
      border: '#e7e5e4'
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