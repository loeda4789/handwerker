// Zentrale Konfigurationstypen für die App
export interface AppConfig {
  version: string
  layout: {
    mode: 'onepage' | 'multipage'
    design: 'angular' | 'rounded' | 'modern' | 'klassik'
    variant: 'starter' | 'professional' | 'premium'
  }
  theme: {
    colorScheme: 'warm' | 'modern' | 'elegant' | 'nature'
    darkMode: boolean
  }
  features: {
    contactBar: boolean
    sideContact: boolean
  }
  header: {
    variant: 'desktop' | 'mobile' | 'adaptive'
    behavior: {
      hideOnScroll: boolean
      floating: boolean
      transparent: boolean
    }
    navigation: {
      showLogo: boolean
      showCta: boolean
      showMobileMenu: boolean
      mobileType: 'fullscreen' | 'sidebar' | 'dropdown'
    }
  }
  hero: {
    type: 'single' | 'slider' | 'video' | 'split'
  }
  headings: {
    underline: boolean
    style: 'solid' | 'none'
    color: 'primary' | 'secondary' | 'accent' | 'custom'
    gradient?: boolean
  }
  style: {
    package: 'einfach' | 'standard' | 'modern'
    fontFamily: 'sans' | 'serif' | 'display'
    badgeStyle: 'minimal' | 'rounded' | 'pill' | 'outlined' | 'none' | 'gradient'
    spacing: 'compact' | 'comfortable' | 'spacious'
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
    design: 'modern',
    variant: 'professional'
  },
  theme: {
    colorScheme: 'nature',
    darkMode: false
  },
  features: {
    contactBar: false,
    sideContact: true
  },
  header: {
    variant: 'adaptive',
    behavior: {
      hideOnScroll: true,
      floating: false,
      transparent: true
    },
    navigation: {
      showLogo: true,
      showCta: true,
      showMobileMenu: true,
      mobileType: 'fullscreen'
    }
  },
  hero: {
    type: 'single'
  },
  headings: {
    underline: true,
    style: 'solid',
    color: 'primary'
  },
  style: {
    package: 'modern',
    fontFamily: 'sans',
    badgeStyle: 'none',
    spacing: 'comfortable'
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
