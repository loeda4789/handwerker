'use client'

/**
 * CSS-Variablen-Manager für optimierte Performance
 * Reduziert DOM-Manipulationen durch zentrale CSS-Variablen-Verwaltung
 */

interface CSSVariableConfig {
  designStyle?: string
  colorScheme?: string
  fontFamily?: string
  badgeStyle?: string
  borderRadius?: string
  borders?: string
  fontCurrent?: string
}

class CSSVariableManager {
  private static instance: CSSVariableManager
  private root: HTMLElement | null = null
  private variableCache: Map<string, string> = new Map()
  private isInitialized = false

  private constructor() {
    if (typeof window !== 'undefined') {
      this.root = document.documentElement
      this.isInitialized = true
    }
  }

  static getInstance(): CSSVariableManager {
    if (!CSSVariableManager.instance) {
      CSSVariableManager.instance = new CSSVariableManager()
    }
    return CSSVariableManager.instance
  }

  /**
   * Setzt eine CSS-Variable nur wenn sie sich geändert hat
   */
  private setVariableIfChanged(name: string, value: string): void {
    if (!this.isInitialized || !this.root) return

    const cachedValue = this.variableCache.get(name)
    if (cachedValue !== value) {
      this.root.style.setProperty(name, value)
      this.variableCache.set(name, value)
    }
  }

  /**
   * Setzt mehrere CSS-Variablen in einem Batch
   */
  setVariables(config: CSSVariableConfig): void {
    if (!this.isInitialized || !this.root) return

    const updates: Array<[string, string]> = []

    if (config.designStyle) {
      updates.push(['--current-design-style', config.designStyle])
    }
    if (config.colorScheme) {
      updates.push(['--current-color-scheme', config.colorScheme])
    }
    if (config.fontFamily) {
      updates.push(['--current-font-family', config.fontFamily])
    }
    if (config.badgeStyle) {
      updates.push(['--current-badge-style', config.badgeStyle])
    }
    if (config.borderRadius) {
      updates.push(['--current-border-radius', config.borderRadius])
    }
    if (config.borders) {
      updates.push(['--current-borders', config.borders])
    }
    if (config.fontCurrent) {
      updates.push(['--font-current', config.fontCurrent])
    }

    // Batch-Update für bessere Performance
    updates.forEach(([name, value]) => {
      this.setVariableIfChanged(name, value)
    })
  }

  /**
   * Setzt Design-Style mit allen abhängigen Variablen
   */
  setDesignStyle(designStyle: string): void {
    if (!this.isInitialized || !this.root) return

    // Design-Style als data-Attribut setzen
    document.body.setAttribute('data-style', designStyle)

    // CSS-Variablen basierend auf Design-Style
    const config: CSSVariableConfig = {
      designStyle,
      fontFamily: this.getFontFamilyForStyle(designStyle),
      badgeStyle: this.getBadgeStyleForDesign(designStyle),
      borderRadius: this.getBorderRadiusForDesign(designStyle),
      borders: this.getBordersForDesign(designStyle)
    }

    this.setVariables(config)
  }

  /**
   * Setzt Farbschema
   */
  setColorScheme(colorScheme: string): void {
    this.setVariables({ colorScheme })
  }

  /**
   * Setzt Font-Familie
   */
  setFontFamily(fontFamily: string): void {
    const fontValue = this.getFontValue(fontFamily)
    this.setVariables({ 
      fontFamily,
      fontCurrent: fontValue
    })
  }

  /**
   * Font-Familie basierend auf Design-Style
   */
  private getFontFamilyForStyle(designStyle: string): string {
    const fontMap: Record<string, string> = {
      'einfach': 'sans',
      'standard': 'sans', 
      'modern': 'sans'
    }
    return fontMap[designStyle] || 'sans'
  }

  /**
   * Badge-Style basierend auf Design-Style
   */
  private getBadgeStyleForDesign(designStyle: string): string {
    const badgeMap: Record<string, string> = {
      'einfach': 'none',
      'standard': 'minimal',
      'modern': 'none'
    }
    return badgeMap[designStyle] || 'minimal'
  }

  /**
   * Border-Radius basierend auf Design-Style
   */
  private getBorderRadiusForDesign(designStyle: string): string {
    const radiusMap: Record<string, string> = {
      'einfach': 'none',
      'standard': 'subtle',
      'modern': 'pronounced'
    }
    return radiusMap[designStyle] || 'subtle'
  }

  /**
   * Borders basierend auf Design-Style
   */
  private getBordersForDesign(designStyle: string): string {
    const borderMap: Record<string, string> = {
      'einfach': 'none',
      'standard': 'subtle',
      'modern': 'subtle'
    }
    return borderMap[designStyle] || 'subtle'
  }

  /**
   * Font-Wert für CSS-Variable
   */
  private getFontValue(fontFamily: string): string {
    const fontMap: Record<string, string> = {
      'sans': 'var(--font-sans)',
      'serif': 'var(--font-serif)',
      'mono': 'var(--font-mono)',
      'display': 'var(--font-display)'
    }
    return fontMap[fontFamily] || 'var(--font-sans)'
  }

  /**
   * Gibt den aktuellen Wert einer CSS-Variable zurück
   */
  getVariable(name: string): string | null {
    if (!this.isInitialized || !this.root) return null
    return this.variableCache.get(name) || null
  }

  /**
   * Gibt alle gecachten Variablen zurück
   */
  getAllVariables(): Record<string, string> {
    const result: Record<string, string> = {}
    this.variableCache.forEach((value, key) => {
      result[key] = value
    })
    return result
  }

  /**
   * Cache leeren
   */
  clearCache(): void {
    this.variableCache.clear()
  }

  /**
   * Debug-Informationen
   */
  debug(): void {
    console.log('🔧 CSSVariableManager Debug:')
    console.log('Initialized:', this.isInitialized)
    console.log('Root element:', this.root)
    console.log('Cached variables:', this.getAllVariables())
  }
}

// Singleton-Instanz exportieren
export const cssVariableManager = CSSVariableManager.getInstance()

/**
 * Hook für React-Komponenten
 */
export function useCSSVariables() {
  return {
    setDesignStyle: (designStyle: string) => cssVariableManager.setDesignStyle(designStyle),
    setColorScheme: (colorScheme: string) => cssVariableManager.setColorScheme(colorScheme),
    setFontFamily: (fontFamily: string) => cssVariableManager.setFontFamily(fontFamily),
    setVariables: (config: CSSVariableConfig) => cssVariableManager.setVariables(config),
    getVariable: (name: string) => cssVariableManager.getVariable(name),
    getAllVariables: () => cssVariableManager.getAllVariables(),
    debug: () => cssVariableManager.debug()
  }
}

/**
 * Utility-Funktionen für CSS-Variablen
 */
export const cssVariableUtils = {
  /**
   * Erstellt eine CSS-Variable-Referenz
   */
  var: (name: string) => `var(${name})`,
  
  /**
   * Erstellt eine CSS-Variable mit Fallback
   */
  varWithFallback: (name: string, fallback: string) => `var(${name}, ${fallback})`,
  
  /**
   * Prüft ob eine CSS-Variable unterstützt wird
   */
  supports: (name: string): boolean => {
    if (typeof window === 'undefined') return false
    return CSS.supports(`--${name}`, 'initial')
  }
}
