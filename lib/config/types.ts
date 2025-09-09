// Zentrale Konfigurationstypen für die App
export interface AppConfig {
  version: string
  layout: {
    mode: 'onepage' | 'multipage'
    design: 'angular' | 'rounded' | 'modern'
  }
  theme: {
    colorScheme: 'warm' | 'modern' | 'elegant' | 'nature'
    darkMode: boolean
  }
  features: {
    contactBar: boolean
    sideContact: boolean
  }
  system: {
    isFirstVisit: boolean
    quickEditMode: boolean
    activeTab: 'layout' | 'design' | 'color' | 'features'
  }
}

export const DEFAULT_CONFIG: AppConfig = {
  version: '2.0.0',
  layout: {
    mode: 'onepage',
    design: 'rounded'
  },
  theme: {
    colorScheme: 'warm',
    darkMode: false
  },
  features: {
    contactBar: true,
    sideContact: true
  },
  system: {
    isFirstVisit: true,
    quickEditMode: false,
    activeTab: 'layout'
  }
}

// Legacy localStorage Keys für Migration
export const LEGACY_STORAGE_KEYS = {
  SITE_MODE: 'site-mode',
  DESIGN_STYLE: 'design-style',
  COLOR_SCHEME: 'selected-color-scheme',
  THEME: 'theme',
  CONFIG_SAVED: 'handwerker-config-saved',
  FEATURES: {
    CONTACT_BAR: 'feature-contactBar',
    SIDE_CONTACT: 'feature-sideContact'
  }
} as const
