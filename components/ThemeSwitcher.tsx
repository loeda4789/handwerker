'use client'

import { useState, useEffect } from 'react'

const themes = {
  concrete: {
    name: 'Concrete Pure',
    icon: '🌫️',
    colors: {
      primary: '#F5F5F5',
      secondary: '#D3D3D3',
      accent: '#E0E0E0',
      background: '#FFFFFF',
      surface: '#FAFAFA',
      text: '#111111',
      textSecondary: '#4A4A4A',
      border: '#D3D3D3'
    },
    heroImages: {
      desktop: '/images/hero-background.png',
      mobile: '/images/hero-background-mobil.png'
    }
  },
  studio: {
    name: 'Studio Weiß',
    icon: '🧼',
    colors: {
      primary: '#FFFFFF',
      secondary: '#E6E6E6',
      accent: '#F8F8F8',
      background: '#FFFFFF',
      surface: '#FDFDFD',
      text: '#4F4F4F',
      textSecondary: '#6B6B6B',
      border: '#E6E6E6'
    },
    heroImages: {
      desktop: '/images/hero-background2.png',
      mobile: '/images/hero-background-mobil2.png'
    }
  },
  sunset: {
    name: 'Sunset Red',
    icon: '🌇',
    colors: {
      primary: '#B73F2C',
      secondary: '#D4574A',
      accent: '#E8A598',
      background: '#FDF3F0',
      surface: '#FAF0ED',
      text: '#5C2C21',
      textSecondary: '#8B4A3C',
      border: '#D4A59B'
    },
    heroImages: {
      desktop: '/images/hero-background2.png',
      mobile: '/images/hero-background-mobil2.png'
    }
  },
  slate: {
    name: 'Slate Night',
    icon: '🌌',
    colors: {
      primary: '#58A6FF',
      secondary: '#7BB3FF',
      accent: '#A3C7FF',
      background: '#1C1C1E',
      surface: '#2C2C2E',
      text: '#F4F4F4',
      textSecondary: '#B8B8B8',
      border: '#3C3C3E'
    },
    heroImages: {
      desktop: '/images/hero-background.png',
      mobile: '/images/hero-background-mobil.png'
    }
  },
  wood: {
    name: 'Stone & Wood',
    icon: '🪵',
    colors: {
      primary: '#A68C6D',
      secondary: '#C0B49B',
      accent: '#D4C7B0',
      background: '#FAF8F5',
      surface: '#F5F2ED',
      text: '#5D4E3C',
      textSecondary: '#7A6B58',
      border: '#C0B49B'
    },
    heroImages: {
      desktop: '/images/hero-background.png',
      mobile: '/images/hero-background-mobil.png'
    }
  },
  nordic: {
    name: 'Nordlicht Blau',
    icon: '🧊',
    colors: {
      primary: '#1F3F66',
      secondary: '#2E5C8A',
      accent: '#B4C8E1',
      background: '#F8FAFE',
      surface: '#DDE6F0',
      text: '#1F3F66',
      textSecondary: '#4A6B92',
      border: '#B4C8E1'
    },
    heroImages: {
      desktop: '/images/hero-background2.png',
      mobile: '/images/hero-background-mobil2.png'
    }
  }
}

type ThemeKey = keyof typeof themes

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('concrete')
  const [isOpen, setIsOpen] = useState(false)

  // CSS Custom Properties und Hero-Bilder aktualisieren
  const updateCSSVariables = (theme: typeof themes[ThemeKey]) => {
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
    
    // Hero-Bilder als CSS Custom Properties setzen
    root.style.setProperty('--hero-image-desktop', `url('${theme.heroImages.desktop}')`)
    root.style.setProperty('--hero-image-mobile', `url('${theme.heroImages.mobile}')`)
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
      updateCSSVariables(themes.concrete)
    }
  }, [])

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Theme Options - nur wenn geöffnet */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 bg-gray-800 rounded-xl shadow-2xl border border-gray-600 p-4 mb-2 animate-in slide-in-from-bottom duration-200 backdrop-blur-sm">
          {/* Info Header */}
          <div className="text-center mb-3 pb-3 border-b border-gray-600">
            <p className="text-white text-xs font-medium mb-1">🎨 Design-Vorschau</p>
            <p className="text-gray-300 text-xs">Wählen Sie ein Farbschema zum Testen</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 min-w-[240px] lg:min-w-[320px]">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => switchTheme(key as ThemeKey)}
                className={`p-3 rounded-lg transition-all duration-200 text-left hover:scale-105 border ${
                  activeTheme === key
                    ? 'bg-gray-700 border-white text-white shadow-md'
                    : 'bg-gray-900/50 border-gray-600 hover:bg-gray-700/50 text-gray-200'
                }`}
                title={theme.name}
              >
                <div className="text-lg mb-1">{theme.icon}</div>
                <div className="text-xs font-medium">
                  {theme.name}
                </div>
                {/* Farbvorschau */}
                <div className="flex gap-1 mt-2">
                  <div 
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Footer Info */}
          <div className="text-center mt-3 pt-3 border-t border-gray-600">
            <p className="text-gray-400 text-xs">⚠️ Demo-Tool - nicht Teil der Website</p>
          </div>
        </div>
      )}

      {/* Toggle Button - Dunkelgrau Design */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 text-gray-200 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group border border-gray-600"
        title="Design-Themes testen"
      >
        {isOpen ? (
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"/>
          </svg>
        )}
      </button>
    </div>
  )
} 