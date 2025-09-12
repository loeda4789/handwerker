import { ContentData } from '@/types/content'
import { siteVariants, heroNavigationModifiers, getSiteVariant } from './siteVariants'

export interface NavigationItem {
  href: string | null
  label: string
  id: string
  hasDropdown?: boolean
  isClickable: boolean
  dropdownItems?: DropdownItem[]
}

export interface DropdownItem {
  href: string | null
  label: string
  icon?: string
}

// Navigation-Item-Definitionen
const navigationItemDefinitions: Record<string, (content: ContentData, addUrlParamsToHref: (href: string | null) => string | null, siteMode: 'onepage' | 'multipage', packageType?: 'starter' | 'professional' | 'premium') => NavigationItem> = {
  'ueber-uns': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: siteMode === 'multipage' ? addUrlParamsToHref('#ueber-uns') : '#ueber-uns',
    label: siteMode === 'multipage' ? 'Über uns' : content.about.title,
    id: 'ueber-uns',
    hasDropdown: siteMode === 'multipage',
    isClickable: true,
    dropdownItems: siteMode === 'multipage' ? [
      { href: addUrlParamsToHref('/ueber-uns/team'), label: 'Unser Team' },
      { href: addUrlParamsToHref('/ueber-uns/betrieb'), label: 'Unser Betrieb' },
      { href: addUrlParamsToHref('/ueber-uns/partner'), label: 'Partner & Zulieferer' },
      { href: addUrlParamsToHref('/ueber-uns/zertifikate'), label: 'Zertifikate & Auszeichnungen' }
    ] : undefined
  }),
  'leistungen': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: siteMode === 'multipage' ? null : '#leistungen',
    label: 'Leistungen',
    id: 'leistungen',
    hasDropdown: siteMode === 'multipage' || packageType === 'professional', // Multi-Page (Premium) UND Professional haben Dropdown
    isClickable: true, // Immer klickbar (One-Page: Scroll, Multi-Page: Link)
    dropdownItems: (siteMode === 'multipage' || packageType === 'professional') ? content.services
      .filter((service: any) => service.slug)
      .map((service: any) => ({
        href: addUrlParamsToHref(`/services/${service.slug}`),
        label: service.title,
        icon: service.icon
      })) : undefined
  }),
  'projektablauf': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: siteMode === 'multipage' ? addUrlParamsToHref('#projektablauf') : '#projektablauf',
    label: 'Projektablauf',
    id: 'projektablauf',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'kontakt': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: siteMode === 'multipage' ? addUrlParamsToHref('/kontakt') : '#kontakt',
    label: 'Kontakt',
    id: 'kontakt',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'referenzen': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: siteMode === 'multipage' ? addUrlParamsToHref('/referenzen') : '#referenzen',
    label: 'Referenzen',
    id: 'referenzen',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'jobs': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: addUrlParamsToHref('/jobs'),
    label: 'Jobs',
    id: 'jobs',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'faq': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: addUrlParamsToHref('/faq'),
    label: 'FAQ',
    id: 'faq',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  })
}

export const getNavigationItems = (
  siteMode: 'onepage' | 'multipage',
  content: ContentData,
  addUrlParamsToHref: (href: string | null) => string | null,
  heroType: 'single' | 'slider' | 'video' | 'split' = 'single',
  packageType?: 'starter' | 'professional' | 'premium'
): NavigationItem[] => {
  // 1. Bestimme die echte Variante
  const variant = packageType || getSiteVariant(siteMode)
  
  // 2. Hole Basis-Navigation aus Variante
  const variantConfig = siteVariants[variant]
  const baseItemIds = [...variantConfig.navigation.items]
  
  // 3. Hole Hero-spezifische Modifikationen
  const heroMods = heroNavigationModifiers[heroType]
  
  // 4. Kombiniere: Basis + Hero-Modifikationen
  let finalItemIds = [...baseItemIds]
  
  // Hero-spezifische Items hinzufügen
  heroMods.add.forEach(itemId => {
    if (!finalItemIds.includes(itemId)) {
      finalItemIds.push(itemId)
    }
  })
  
  // Hero-spezifische Items entfernen
  finalItemIds = finalItemIds.filter(itemId => !heroMods.remove.includes(itemId))
  
  // 5. Konvertiere IDs zu NavigationItems
  const navigationItems: NavigationItem[] = []
  
  finalItemIds.forEach(itemId => {
    const itemDefinition = navigationItemDefinitions[itemId]
    if (itemDefinition) {
      navigationItems.push(itemDefinition(content, addUrlParamsToHref, siteMode, variant))
    }
  })
  
  return navigationItems
}

export const addUrlParamsToHref = (href: string | null): string | null => {
  if (!href) return href
  
  const currentParams = typeof window !== 'undefined' ? window.location.search : ''
  const isOnHomepage = typeof window !== 'undefined' ? window.location.pathname === '/' : true
  
  // Für Hash-Links: Intelligente Navigation basierend auf aktueller Seite
  if (href.startsWith('#')) {
    if (isOnHomepage) {
      // Auf der Startseite: Direkter Hash-Link für Smooth Scrolling
      console.log('On homepage - using direct hash link:', href)
      return href
    } else {
      // Auf Unterseiten: Zur Startseite mit Parametern und Hash
      const result = `/${currentParams}${href}`
      console.log('On subpage - navigating to homepage with hash:', result)
      return result
    }
  }
  
  // Für normale Links: Parameter anhängen
  return `${href}${currentParams}`
}
