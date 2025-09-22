'use client'

import { AppConfig } from '@/lib/config/types'
import { applyHeadingStyles } from '@/lib/headingStyles'
import { applyBadgeStyles } from '@/lib/badgeStyles'
import { applyBorderRadiusStyles } from '@/lib/borderRadiusStyles'
import { applyBorderStyles } from '@/lib/borderStyles'
import { applyColorScheme } from '@/lib/colorSchemes'
import { cssVariableManager } from '@/lib/cssVariables'

/**
 * Zentraler Style-Manager, der alle Style-Funktionen koordiniert
 * und sicherstellt, dass Config-Komponenten ausgeschlossen werden
 */
export class UnifiedStyleManager {
  private static instance: UnifiedStyleManager
  private currentConfig: AppConfig | null = null
  private isInitialized = false
  private debounceTimer: NodeJS.Timeout | null = null
  private styleCache = new Map<string, any>()

  private constructor() {}

  static getInstance(): UnifiedStyleManager {
    if (!UnifiedStyleManager.instance) {
      UnifiedStyleManager.instance = new UnifiedStyleManager()
    }
    return UnifiedStyleManager.instance
  }

  /**
   * Initialisiert den Style-Manager mit der ersten Konfiguration
   */
  initialize(config: AppConfig) {
    if (this.isInitialized) return
    
    this.currentConfig = config
    this.isInitialized = true
    this.applyAllStyles(config)
  }

  /**
   * Aktualisiert die Konfiguration und wendet alle Styles an
   */
  updateConfig(config: AppConfig) {
    this.currentConfig = config
    
    // Debounced style application
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    
    this.debounceTimer = setTimeout(() => {
      this.applyAllStyles(config)
      this.debounceTimer = null
    }, 16) // ~60fps
  }

  /**
   * Wendet alle Style-Funktionen in der korrekten Reihenfolge an
   */
  private applyAllStyles(config: AppConfig) {
    if (typeof window === 'undefined') return

    try {
      // 1. CSS-Variablen für Design-Style setzen (sofort, ohne setTimeout)
      this.setDesignStyleVariables(config)

      // 2. Farbschema anwenden
      if (config.theme?.colorScheme) {
        this.applyColorSchemeOptimized(config.theme.colorScheme)
        
        // Event dispatchen für Logo-Komponenten
        window.dispatchEvent(new CustomEvent('color-scheme-changed', {
          detail: { colorScheme: config.theme.colorScheme }
        }))
      }

      // 3. Weitere Styles mit Caching
      this.applyStylesWithCache(config)

      console.log('🎨 UnifiedStyleManager: Alle Styles angewendet für', config.style?.package || 'unbekannt')
    } catch (error) {
      console.error('❌ UnifiedStyleManager: Fehler beim Anwenden der Styles:', error)
    }
  }

  /**
   * Optimierte Farbschema-Anwendung mit CSS-Variablen
   */
  private applyColorSchemeOptimized(colorScheme: string) {
    // CSS-Variable über den optimierten Manager setzen
    cssVariableManager.setColorScheme(colorScheme)
    
    // Cache für bessere Performance
    if (!this.styleCache.has('colorScheme')) {
      applyColorScheme(colorScheme)
      this.styleCache.set('colorScheme', colorScheme)
    } else if (this.styleCache.get('colorScheme') !== colorScheme) {
      applyColorScheme(colorScheme)
      this.styleCache.set('colorScheme', colorScheme)
    }
  }

  /**
   * Wendet Styles mit Caching an
   */
  private applyStylesWithCache(config: AppConfig) {
    const configKey = JSON.stringify({
      package: config.style?.package,
      fontFamily: config.style?.fontFamily,
      badgeStyle: config.style?.badgeStyle,
      borderRadius: config.style?.borderRadius,
      borders: config.style?.borders,
      headings: config.headings
    })

    if (this.styleCache.get('lastConfig') !== configKey) {
      // Heading-Styles anwenden
      applyHeadingStyles(config)

      // Badge-Styles anwenden
      applyBadgeStyles(config)

      // Border-Radius-Styles anwenden
      applyBorderRadiusStyles(config)

      // Border-Styles anwenden
      applyBorderStyles(config)

      this.styleCache.set('lastConfig', configKey)
    }
  }

  /**
   * Setzt CSS-Variablen basierend auf dem Design-Style
   */
  private setDesignStyleVariables(config: AppConfig) {
    const designStyle = config.style?.package || 'einfach'

    // CSS-Variablen über den optimierten Manager setzen
    cssVariableManager.setDesignStyle(designStyle)
    
    // Zusätzliche Variablen setzen
    cssVariableManager.setVariables({
      fontFamily: config.style?.fontFamily || 'sans',
      badgeStyle: config.style?.badgeStyle || 'minimal',
      borderRadius: config.style?.borderRadius || 'subtle',
      borders: config.style?.borders || 'subtle'
    })
    
    // Debug-Logging
    console.log('🔧 Design-Style gesetzt:', designStyle)
  }

  /**
   * Gibt die aktuelle Konfiguration zurück
   */
  getCurrentConfig(): AppConfig | null {
    return this.currentConfig
  }

  /**
   * Prüft, ob der Style-Manager initialisiert ist
   */
  isReady(): boolean {
    return this.isInitialized
  }
}

// Singleton-Instanz exportieren
export const styleManager = UnifiedStyleManager.getInstance()

/**
 * Hook für React-Komponenten, um den Style-Manager zu verwenden
 */
export function useUnifiedStyleManager() {
  return {
    initialize: (config: AppConfig) => styleManager.initialize(config),
    updateConfig: (config: AppConfig) => styleManager.updateConfig(config),
    getCurrentConfig: () => styleManager.getCurrentConfig(),
    isReady: () => styleManager.isReady()
  }
}
