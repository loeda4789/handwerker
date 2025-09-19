'use client'

import { AppConfig } from '@/lib/config/types'
import { applyHeadingStyles } from '@/lib/headingStyles'
import { applyBadgeStyles } from '@/lib/badgeStyles'
import { applyBorderRadiusStyles } from '@/lib/borderRadiusStyles'
import { applyBorderStyles } from '@/lib/borderStyles'
import { applyColorScheme } from '@/lib/colorSchemes'

/**
 * Zentraler Style-Manager, der alle Style-Funktionen koordiniert
 * und sicherstellt, dass Config-Komponenten ausgeschlossen werden
 */
export class UnifiedStyleManager {
  private static instance: UnifiedStyleManager
  private currentConfig: AppConfig | null = null
  private isInitialized = false

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
    this.applyAllStyles(config)
  }

  /**
   * Wendet alle Style-Funktionen in der korrekten Reihenfolge an
   */
  private applyAllStyles(config: AppConfig) {
    if (typeof window === 'undefined') return

    // Verzögerung hinzufügen, um Hydration-Probleme zu vermeiden
    setTimeout(() => {
      try {
        // 1. Farbschema anwenden
        if (config.theme?.colorScheme) {
          applyColorScheme(config.theme.colorScheme)
          
          // Event dispatchen für Logo-Komponenten
          window.dispatchEvent(new CustomEvent('color-scheme-changed', {
            detail: { colorScheme: config.theme.colorScheme }
          }))
        }

        // 2. Heading-Styles anwenden
        applyHeadingStyles(config)

        // 3. Badge-Styles anwenden
        applyBadgeStyles(config)

        // 4. Border-Radius-Styles anwenden
        applyBorderRadiusStyles(config)

        // 5. Border-Styles anwenden
        applyBorderStyles(config)

        // 6. Zusätzliche CSS-Variablen für Design-Style setzen
        this.setDesignStyleVariables(config)

        console.log('🎨 UnifiedStyleManager: Alle Styles angewendet für', config.style?.package || 'unbekannt')
      } catch (error) {
        console.error('❌ UnifiedStyleManager: Fehler beim Anwenden der Styles:', error)
      }
    }, 0)
  }

  /**
   * Setzt CSS-Variablen basierend auf dem Design-Style
   */
  private setDesignStyleVariables(config: AppConfig) {
    const root = document.documentElement
    const designStyle = config.style?.package || 'einfach'

    // Design-Style als data-Attribut setzen
    document.body.setAttribute('data-style', designStyle)

    // Zusätzliche CSS-Variablen für bessere Kompatibilität
    root.style.setProperty('--current-design-style', designStyle)
    
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
