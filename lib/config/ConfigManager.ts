import { AppConfig, DEFAULT_CONFIG, LEGACY_STORAGE_KEYS } from './types'

class ConfigManager {
  private static instance: ConfigManager
  private config: AppConfig
  private listeners: Set<(config: AppConfig) => void> = new Set()
  private readonly STORAGE_KEY = 'app-config-v2'

  private constructor() {
    this.config = this.loadFromStorage()
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }

  getConfig(): AppConfig {
    return { ...this.config }
  }

  updateConfig(updates: Partial<AppConfig>): void {
    this.config = { ...this.config, ...updates }
    this.saveToStorage()
    this.notifyListeners()
  }

  resetToDefaults(): void {
    this.config = { ...DEFAULT_CONFIG }
    this.saveToStorage()
    this.notifyListeners()
  }

  // Migration von alter localStorage-Struktur
  private migrateFromOldStorage(): AppConfig {
    const migrated = { ...DEFAULT_CONFIG }
    
    console.log('🔄 Migriere Konfiguration von alter localStorage-Struktur...')
    
    // Layout Migration
    const siteMode = localStorage.getItem(LEGACY_STORAGE_KEYS.SITE_MODE) as 'onepage' | 'multipage'
    if (siteMode) {
      migrated.layout.mode = siteMode
      console.log('✅ Site-Mode migriert:', siteMode)
    }
    
    const designStyle = localStorage.getItem(LEGACY_STORAGE_KEYS.DESIGN_STYLE) as 'angular' | 'rounded' | 'modern'
    if (designStyle) {
      migrated.layout.design = designStyle
      console.log('✅ Design-Style migriert:', designStyle)
    }
    
    // Theme Migration
    const colorScheme = localStorage.getItem(LEGACY_STORAGE_KEYS.COLOR_SCHEME) as 'warm' | 'modern' | 'elegant' | 'nature'
    if (colorScheme) {
      migrated.theme.colorScheme = colorScheme
      console.log('✅ Color-Scheme migriert:', colorScheme)
    }
    
    const darkMode = localStorage.getItem(LEGACY_STORAGE_KEYS.THEME) === 'dark'
    migrated.theme.darkMode = darkMode
    if (darkMode) {
      console.log('✅ Dark-Mode migriert:', darkMode)
    }
    
    // Features Migration
    migrated.features.contactBar = localStorage.getItem(LEGACY_STORAGE_KEYS.FEATURES.CONTACT_BAR) === 'true'
    migrated.features.sideContact = localStorage.getItem(LEGACY_STORAGE_KEYS.FEATURES.SIDE_CONTACT) !== 'false' // Default true
    
    // Hero Migration
    const heroType = localStorage.getItem('demo-hero-type') as 'single' | 'slider' | 'video' | 'split'
    if (heroType) {
      migrated.hero.type = heroType
    }
    
    console.log('✅ Features migriert:', migrated.features)
    
    // System Migration
    const hasVisitedBefore = localStorage.getItem(LEGACY_STORAGE_KEYS.CONFIG_SAVED) === 'true'
    migrated.system.isFirstVisit = !hasVisitedBefore
    migrated.system.quickEditMode = hasVisitedBefore
    
    if (hasVisitedBefore) {
      console.log('✅ System-Status migriert: Returning User')
    }
    
    console.log('🎉 Migration abgeschlossen:', migrated)
    return migrated
  }

  private loadFromStorage(): AppConfig {
    if (typeof window === 'undefined') return DEFAULT_CONFIG
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Version-Check für Migration
        if (parsed.version === '2.0.0') {
          console.log('📦 Neue Konfiguration aus localStorage geladen')
          return { ...DEFAULT_CONFIG, ...parsed }
        }
      }
      
      // Migration von alter Struktur
      return this.migrateFromOldStorage()
    } catch (error) {
      console.warn('⚠️ Fehler beim Laden der Konfiguration:', error)
      return DEFAULT_CONFIG
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config))
      console.log('💾 Konfiguration gespeichert:', this.config)
    } catch (error) {
      console.warn('⚠️ Fehler beim Speichern der Konfiguration:', error)
    }
  }

  subscribe(listener: (config: AppConfig) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.config))
  }

  // Rollback-Funktion für Notfälle
  rollbackToOldStorage(): void {
    console.log('🔄 Rollback zu alter localStorage-Struktur...')
    
    // Alte localStorage-Keys wiederherstellen
    localStorage.setItem(LEGACY_STORAGE_KEYS.SITE_MODE, this.config.layout.mode)
    localStorage.setItem(LEGACY_STORAGE_KEYS.DESIGN_STYLE, this.config.layout.design)
    localStorage.setItem(LEGACY_STORAGE_KEYS.COLOR_SCHEME, this.config.theme.colorScheme)
    localStorage.setItem(LEGACY_STORAGE_KEYS.THEME, this.config.theme.darkMode ? 'dark' : 'light')
    
    // Features wiederherstellen
    Object.entries(this.config.features).forEach(([key, value]) => {
      localStorage.setItem(`feature-${key}`, value.toString())
    })
    
    // System-Status wiederherstellen
    localStorage.setItem(LEGACY_STORAGE_KEYS.CONFIG_SAVED, (!this.config.system.isFirstVisit).toString())
    
    console.log('✅ Rollback abgeschlossen')
  }

  // Debug-Funktion
  debug(): void {
    console.log('🔍 ConfigManager Debug Info:')
    console.log('Current Config:', this.config)
    console.log('Listeners:', this.listeners.size)
    console.log('Storage Key:', this.STORAGE_KEY)
    console.log('Legacy Keys:', Object.keys(LEGACY_STORAGE_KEYS))
  }
}

export const configManager = ConfigManager.getInstance()
