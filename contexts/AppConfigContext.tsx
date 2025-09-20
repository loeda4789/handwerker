'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { AppConfig } from '@/lib/config/types'
import { configManager } from '@/lib/config/ConfigManager'
import { getSiteVariant } from '@/lib/config/siteVariants'
import { applyHeadingStyles } from '@/lib/headingStyles'
import { applyBadgeStyles } from '@/lib/badgeStyles'
import { applyBorderRadiusStyles } from '@/lib/borderRadiusStyles'
import { styleManager } from '@/lib/unifiedStyleManager'

interface AppConfigContextType {
  config: AppConfig
  updateConfig: (updates: Partial<AppConfig>) => void
  resetConfig: () => void
  isConfigLoaded: boolean
  siteVariant: 'starter' | 'professional' | 'premium'
}

export const AppConfigContext = createContext<AppConfigContextType | undefined>(undefined)

export function AppConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(configManager.getConfig())
  const [isConfigLoaded, setIsConfigLoaded] = useState(false)
  
  // Site-Variante aus expliziter Konfiguration
  const siteVariant = getSiteVariant(config.layout.mode, config.layout.variant)

  useEffect(() => {
    // Initiale Konfiguration laden
    const initialConfig = configManager.getConfig()
    
    // Prüfe localStorage für Design-Style (für Unterseiten)
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      // Aktualisiere die Konfiguration mit dem gespeicherten Design-Style
      const updatedConfig = {
        ...initialConfig,
        layout: {
          ...initialConfig.layout,
          design: savedDesignStyle as any
        },
        style: {
          ...initialConfig.style,
          package: savedDesignStyle as any,
          badgeStyle: savedDesignStyle === 'modern' ? 'none' : 'minimal' as any,
          borderRadius: (savedDesignStyle === 'modern' ? 'pronounced' : savedDesignStyle === 'rounded' ? 'subtle' : 'none') as any
        }
      }
      setConfig(updatedConfig)
      // Body data-style Attribut setzen
      document.body.setAttribute('data-style', savedDesignStyle)
      console.log('🎯 AppConfigProvider initialisiert mit localStorage Design-Style:', savedDesignStyle, updatedConfig)
    } else {
      setConfig(initialConfig)
      // Body data-style Attribut mit Standard-Wert setzen
      document.body.setAttribute('data-style', initialConfig.layout.design)
      console.log('🎯 AppConfigProvider initialisiert mit:', initialConfig)
    }
    
    setIsConfigLoaded(true)

    // Initiale Font-Familie setzen
    if (initialConfig.style?.fontFamily) {
      const fontMap = {
        'sans': 'var(--font-sans)',
        'serif': 'var(--font-serif)',
        'mono': 'var(--font-mono)',
        'display': 'var(--font-display)'
      }
      const fontValue = fontMap[initialConfig.style.fontFamily] || 'var(--font-sans)'
      document.documentElement.style.setProperty('--font-current', fontValue)
      console.log('🎨 Initiale Font-Familie gesetzt:', initialConfig.style.fontFamily, '→', fontValue)
    }

    // Initiale Styles über UnifiedStyleManager anwenden
    styleManager.initialize(initialConfig)


    // Listener für Änderungen
    // Event-Listener für Design-Style-Änderungen aus localStorage
    const handleDesignStyleChange = () => {
      const savedDesignStyle = localStorage.getItem('design-style')
      if (savedDesignStyle) {
        const updatedConfig = {
          ...config,
          layout: {
            ...config.layout,
            design: savedDesignStyle as any
          },
          style: {
            ...config.style,
            package: savedDesignStyle as any,
            badgeStyle: savedDesignStyle === 'modern' ? 'none' : 'minimal' as any,
            borderRadius: (savedDesignStyle === 'modern' ? 'pronounced' : savedDesignStyle === 'rounded' ? 'subtle' : 'none') as any
          }
        }
        setConfig(updatedConfig)
        styleManager.updateConfig(updatedConfig)
        // Body data-style Attribut aktualisieren
        document.body.setAttribute('data-style', savedDesignStyle)
        console.log('🔄 AppConfigProvider: Design-Style geändert:', savedDesignStyle, updatedConfig)
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    
    const unsubscribe = configManager.subscribe((newConfig) => {
      console.log('🔄 Konfiguration aktualisiert:', newConfig)
      setConfig(newConfig)
      
      // Font-Familie in CSS-Variablen übertragen
      if (newConfig.style?.fontFamily) {
        const fontMap = {
          'sans': 'var(--font-sans)',
          'serif': 'var(--font-serif)',
          'mono': 'var(--font-mono)',
          'display': 'var(--font-display)'
        }
        const fontValue = fontMap[newConfig.style.fontFamily] || 'var(--font-sans)'
        document.documentElement.style.setProperty('--font-current', fontValue)
        console.log('🎨 Font-Familie gesetzt:', newConfig.style.fontFamily, '→', fontValue)
      }

      // Styles bei Konfigurationsänderungen über UnifiedStyleManager anwenden
      styleManager.updateConfig(newConfig)

    })

    return () => {
      unsubscribe()
      window.removeEventListener('storage', handleDesignStyleChange)
    }
  }, [])

  const updateConfig = (updates: Partial<AppConfig>) => {
    console.log('📝 Konfiguration wird aktualisiert:', updates)
    console.log('📝 Aktuelle Konfiguration vor Update:', config)
    configManager.updateConfig(updates)
    console.log('📝 Konfiguration nach Update:', configManager.getConfig())
  }

  const resetConfig = () => {
    console.log('🔄 Konfiguration wird zurückgesetzt')
    configManager.resetToDefaults()
  }

  return (
    <AppConfigContext.Provider value={{
      config,
      updateConfig,
      resetConfig,
      isConfigLoaded,
      siteVariant
    }}>
      {children}
    </AppConfigContext.Provider>
  )
}

export function useAppConfig(): AppConfigContextType {
  const context = useContext(AppConfigContext)
  if (context === undefined) {
    throw new Error('useAppConfig must be used within an AppConfigProvider')
  }
  return context
}

// Convenience Hooks für spezifische Konfigurationsbereiche
export function useLayoutConfig() {
  const { config, updateConfig } = useAppConfig()
  
  return {
    mode: config.layout.mode,
    design: config.layout.design,
    variant: config.layout.variant,
    designStyle: config.layout.design, // Alias für Kompatibilität
    mobileType: config.header.navigation.mobileType, // Mobile Navigation Typ
    setMode: (mode: 'onepage' | 'multipage') => 
      updateConfig({ layout: { ...config.layout, mode } }),
    setDesign: (design: 'angular' | 'rounded' | 'modern') => 
      updateConfig({ layout: { ...config.layout, design } }),
    setVariant: (variant: 'starter' | 'professional' | 'premium') => 
      updateConfig({ layout: { ...config.layout, variant } }),
    setMobileType: (mobileType: 'fullscreen' | 'sidebar' | 'dropdown') =>
      updateConfig({ header: { ...config.header, navigation: { ...config.header.navigation, mobileType } } })
  }
}

export function useThemeConfig() {
  const { config, updateConfig } = useAppConfig()
  
  return {
    colorScheme: config.theme.colorScheme,
    darkMode: config.theme.darkMode,
    setColorScheme: (colorScheme: 'warm' | 'modern' | 'elegant' | 'nature') => {
      updateConfig({ theme: { ...config.theme, colorScheme } })
      // Farbschema in localStorage speichern
      localStorage.setItem('selected-color-scheme', colorScheme)
      // Event dispatchten für andere Komponenten
      window.dispatchEvent(new Event('color-scheme-changed'))
    },
    setDarkMode: (darkMode: boolean) => 
      updateConfig({ theme: { ...config.theme, darkMode } })
  }
}

export function useFeaturesConfig() {
  const { config, updateConfig } = useAppConfig()
  
  return {
    features: config.features,
    setFeature: (key: keyof typeof config.features, value: boolean) => 
      updateConfig({ features: { ...config.features, [key]: value } }),
    setFeatures: (features: Partial<typeof config.features>) => 
      updateConfig({ features: { ...config.features, ...features } }),
    toggleFeature: (key: keyof typeof config.features) => 
      updateConfig({ features: { ...config.features, [key]: !config.features[key] } })
  }
}

export function useHeroConfig() {
  const { config, updateConfig } = useAppConfig()
  return {
    type: config.hero.type,
    setType: (type: 'single' | 'slider' | 'video' | 'split') =>
      updateConfig({ hero: { ...config.hero, type } })
  }
}

export function useHeadingsConfig() {
  const { config, updateConfig } = useAppConfig()
  return {
    underline: config.headings.underline,
    style: config.headings.style,
    color: config.headings.color,
    setUnderline: (underline: boolean) =>
      updateConfig({ headings: { ...config.headings, underline } }),
    setStyle: (style: 'solid' | 'none') =>
      updateConfig({ headings: { ...config.headings, style } }),
    setColor: (color: 'primary' | 'secondary' | 'accent' | 'custom') =>
      updateConfig({ headings: { ...config.headings, color } })
  }
}

export function useStyleConfig() {
  const { config, updateConfig } = useAppConfig()
  return {
    package: config.style.package,
    fontFamily: config.style.fontFamily,
    badgeStyle: config.style.badgeStyle,
    spacing: config.style.spacing,
    borderRadius: config.style.borderRadius,
    borders: config.style.borders,
    setPackage: (packageId: 'einfach' | 'standard' | 'modern') => {
      console.log('🎨 setPackage aufgerufen mit:', packageId)
      updateConfig({ style: { ...config.style, package: packageId } })
      
      // Design-Style in localStorage speichern
      localStorage.setItem('design-style', packageId)
      
      // Body data-style Attribut aktualisieren
      if (typeof window !== 'undefined') {
        document.body.setAttribute('data-style', packageId)
      }
    },
    setFontFamily: (fontFamily: 'sans' | 'serif' | 'display') => {
      console.log('🎨 setFontFamily aufgerufen mit:', fontFamily)
      updateConfig({ style: { ...config.style, fontFamily } })
    },
    setBadgeStyle: (badgeStyle: 'minimal' | 'rounded' | 'pill' | 'outlined' | 'none') => {
      console.log('🎨 setBadgeStyle aufgerufen mit:', badgeStyle)
      updateConfig({ style: { ...config.style, badgeStyle } })
    },
    setSpacing: (spacing: 'compact' | 'comfortable' | 'spacious') => {
      console.log('🎨 setSpacing aufgerufen mit:', spacing)
      updateConfig({ style: { ...config.style, spacing } })
    },
    setBorderRadius: (borderRadius: 'none' | 'subtle' | 'pronounced') => {
      console.log('🎨 setBorderRadius aufgerufen mit:', borderRadius)
      updateConfig({ style: { ...config.style, borderRadius } })
    },
    setBorders: (borders: 'none' | 'subtle' | 'bold') => {
      console.log('🎨 setBorders aufgerufen mit:', borders)
      updateConfig({ style: { ...config.style, borders } })
    }
  }
}

export function useSystemConfig() {
  const { config, updateConfig } = useAppConfig()
  
  return {
    isFirstVisit: config.system.isFirstVisit,
    quickEditMode: config.system.quickEditMode,
    activeTab: config.system.activeTab,
    setFirstVisit: (isFirstVisit: boolean) => 
      updateConfig({ system: { ...config.system, isFirstVisit } }),
    setQuickEditMode: (quickEditMode: boolean) => 
      updateConfig({ system: { ...config.system, quickEditMode } }),
    setActiveTab: (activeTab: 'layout' | 'design' | 'color' | 'features') => 
      updateConfig({ system: { ...config.system, activeTab } })
  }
}

export function useSiteVariant() {
  const { siteVariant } = useAppConfig()
  return { siteVariant }
}
