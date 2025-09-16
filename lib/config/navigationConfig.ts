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
    href: packageType === 'starter' ? '#ueber-uns' : '/ueber-uns',
    label: packageType === 'starter' ? content.about.title : 'Über uns',
    id: 'ueber-uns',
    hasDropdown: packageType === 'premium', // Nur Premium hat Dropdown
    isClickable: true,
    dropdownItems: packageType === 'premium' ? [
      { href: '/ueber-uns/team', label: 'Unser Team' },
      { href: '/ueber-uns/betrieb', label: 'Unser Betrieb' },
      { href: '/ueber-uns/partner', label: 'Partner & Zulieferer' },
      { href: '/ueber-uns/zertifikate', label: 'Zertifikate & Auszeichnungen' }
    ] : undefined
  }),
  'leistungen': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: packageType === 'starter' ? '#leistungen' : '/services',
    label: 'Leistungen',
    id: 'leistungen',
    hasDropdown: packageType === 'professional' || packageType === 'premium', // Professional UND Premium haben Dropdown
    isClickable: true, // Immer klickbar (One-Page: Scroll, Multi-Page: Link)
    dropdownItems: (packageType === 'professional' || packageType === 'premium') ? content.services
      .filter((service: any) => service.slug)
      .map((service: any) => ({
        href: `/services/${service.slug}`,
        label: service.title,
        icon: service.icon
      })) : undefined
  }),
  'projektablauf': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: packageType === 'starter' ? '#projektablauf' : '/projektablauf',
    label: 'Projektablauf',
    id: 'projektablauf',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'kontakt': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: packageType === 'starter' ? '#kontakt' : '/kontakt',
    label: 'Kontakt',
    id: 'kontakt',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'referenzen': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: packageType === 'starter' ? '#referenzen' : '/referenzen',
    label: 'Referenzen',
    id: 'referenzen',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'jobs': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: '/jobs',
    label: 'Jobs',
    id: 'jobs',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'pv-rechner': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: '/pv-rechner',
    label: 'PV-Rechner',
    id: 'pv-rechner',
    hasDropdown: false,
    isClickable: true,
    dropdownItems: []
  }),
  'weiteres': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: null,
    label: 'Weiteres',
    id: 'weiteres',
    hasDropdown: true,
    isClickable: false,
    dropdownItems: [
      { href: '/faq', label: 'FAQ' },
      { href: '/pv-rechner', label: 'PV-Rechner' }
    ]
  }),
  'faq': (content, addUrlParamsToHref, siteMode, packageType) => ({
    href: '/faq',
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
  // Da alles im localStorage gespeichert wird, sind URL-Parameter nicht mehr notwendig
  return href
}
