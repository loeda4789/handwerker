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
      items: ['ueber-uns', 'leistungen', 'projektablauf', 'kontakt'],
      hasDropdowns: false
    }
  },
  professional: {
    id: 'professional',
    name: 'Professional', 
    description: 'One-Page mit Side-Contact und Jobs',
    features: ['onepage', 'side-contact', 'jobs', 'advanced-navigation'],
    navigation: {
      items: ['ueber-uns', 'leistungen', 'jobs'],
      hasDropdowns: false
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    description: 'Multi-Page Website mit vollständiger Navigation',
    features: ['multipage', 'full-navigation', 'dropdowns', 'all-sections'],
    navigation: {
      items: ['ueber-uns', 'leistungen', 'projektablauf', 'kontakt', 'faq'],
      hasDropdowns: true
    }
  }
}

export const heroNavigationModifiers: Record<string, HeroNavigationModifier> = {
  single: {
    add: [],
    remove: []
  },
  slider: {
    add: ['referenzen'],
    remove: []
  },
  video: {
    add: ['referenzen'],
    remove: ['projektablauf']
  },
  split: {
    add: ['referenzen'],
    remove: ['projektablauf']
  }
}

export function getSiteVariant(
  siteMode: 'onepage' | 'multipage',
  hasSideContact: boolean
): 'starter' | 'professional' | 'premium' {
  if (siteMode === 'multipage') return 'premium'
  if (hasSideContact) return 'professional'
  return 'starter'
}
