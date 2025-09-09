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
    promoBanner: boolean
    contactBar: boolean
    notdienstAlert: boolean
    whatsappWidget: boolean
    callbackPopup: boolean
    callbackRequest: boolean
    speedDial: boolean
    bewerberPopup: boolean
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
    promoBanner: false,
    contactBar: true,
    notdienstAlert: false,
    whatsappWidget: false,
    callbackPopup: false,
    callbackRequest: false,
    speedDial: false,
    bewerberPopup: false
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
    PROMO_BANNER: 'feature-promoBanner',
    CONTACT_BAR: 'feature-contactBar',
    NOTDIENST_ALERT: 'feature-notdienstAlert',
    WHATSAPP_WIDGET: 'feature-whatsappWidget',
    CALLBACK_POPUP: 'feature-callbackPopup',
    CALLBACK_REQUEST: 'feature-callbackRequest',
    SPEED_DIAL: 'feature-speedDial',
    BEWERBER_POPUP: 'feature-bewerberPopup'
  }
} as const
