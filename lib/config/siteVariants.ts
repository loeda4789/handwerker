import { NavigationItem } from './navigationConfig'

export interface SiteVariant {
  id: 'starter' | 'professional' | 'premium'
  name: string
  description: string
  features: string[]
  navigation: {
    items: string[]
    hasDropdowns: boolean
  }
}

export interface HeroNavigationModifier {
  add: string[]
  remove: string[]
  modify?: Record<string, Partial<NavigationItem>>
}

export const siteVariants: Record<string, SiteVariant> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'One-Page Website für kleine Unternehmen',
    features: ['onepage', 'basic-navigation', 'contact-section'],
    navigation: {
      items: ['ueber-uns', 'leistungen', 'projektablauf'],
      hasDropdowns: false
    }
  },
  professional: {
    id: 'professional',
    name: 'Professional', 
    description: 'One-Page mit Side-Contact, Projektablauf und FAQ',
    features: ['onepage', 'side-contact', 'projektablauf', 'faq', 'advanced-navigation'],
    navigation: {
      items: ['ueber-uns', 'leistungen', 'projektablauf', 'faq'],
      hasDropdowns: true
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'Multi-Page Website mit Jobs und vollständiger Navigation',
    features: ['multipage', 'full-navigation', 'dropdowns', 'jobs', 'all-sections'],
    navigation: {
      items: ['ueber-uns', 'leistungen', 'referenzen', 'jobs', 'faq'],
      hasDropdowns: true
    }
  }
}

// Hero-Typ beeinflusst NICHT die Navigation - nur visueller Stil
// Navigation wird nur von der Variante (Starter/Professional/Premium) bestimmt
export const heroNavigationModifiers: Record<string, HeroNavigationModifier> = {
  single: {
    add: [],
    remove: []
  },
  slider: {
    add: [],
    remove: []
  },
  video: {
    add: [],
    remove: []
  },
  split: {
    add: [],
    remove: []
  }
}

export function getSiteVariant(
  siteMode: 'onepage' | 'multipage',
  explicitVariant?: 'starter' | 'professional' | 'premium'
): 'starter' | 'professional' | 'premium' {
  // Wenn explizite Variante angegeben, diese verwenden
  if (explicitVariant) return explicitVariant
  
  if (siteMode === 'multipage') return 'premium'
  // Starter ist der Standard für One-Page
  return 'starter'
}