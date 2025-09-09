import { ContentData } from '@/types/content'

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

export const getNavigationItems = (
  siteMode: 'onepage' | 'multipage',
  content: ContentData,
  addUrlParamsToHref: (href: string | null) => string | null
): NavigationItem[] => {
  if (siteMode === 'multipage') {
    return [
      { 
        href: addUrlParamsToHref('#ueber-uns'), 
        label: 'Über uns', 
        id: 'ueber-uns',
        hasDropdown: true,
        isClickable: true,
        dropdownItems: [
          { href: addUrlParamsToHref('/ueber-uns/team'), label: 'Unser Team' },
          { href: addUrlParamsToHref('/ueber-uns/betrieb'), label: 'Unser Betrieb' },
          { href: addUrlParamsToHref('/ueber-uns/partner'), label: 'Partner & Zulieferer' },
          { href: addUrlParamsToHref('/ueber-uns/zertifikate'), label: 'Zertifikate & Auszeichnungen' }
        ]
      },
      { 
        href: null, 
        label: 'Leistungen', 
        id: 'leistungen',
        hasDropdown: true,
        isClickable: false,
        dropdownItems: content.services
          .filter((service: any) => service.slug)
          .map((service: any, index: number) => {
            return {
              href: addUrlParamsToHref(`/services/${service.slug}`),
              label: service.title,
              icon: service.icon
            }
          })
      },
      { href: addUrlParamsToHref('#projektablauf'), label: 'Projektablauf', id: 'projektablauf', isClickable: true },
      { href: addUrlParamsToHref('/referenzen'), label: 'Referenzen', id: 'referenzen', isClickable: true },
      { href: addUrlParamsToHref('/faq'), label: 'FAQ', id: 'faq', isClickable: true },
      { href: addUrlParamsToHref('/kontakt'), label: 'Kontakt', id: 'kontakt', isClickable: true }
    ]
  } else {
    return [
      { href: '#ueber-uns', label: content.about.title, id: 'ueber-uns', isClickable: true },
      { 
        href: '#leistungen', 
        label: 'Leistungen', 
        id: 'leistungen', 
        isClickable: true,
        hasDropdown: true,
        dropdownItems: content.services
          .filter((service: any) => service.slug)
          .map((service: any, index: number) => {
            return {
              href: addUrlParamsToHref(`/services/${service.slug}`),
              label: service.title,
              icon: service.icon
            }
          })
      },
      { href: '#projektablauf', label: 'Projektablauf', id: 'projektablauf', isClickable: true }
    ]
  }
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
