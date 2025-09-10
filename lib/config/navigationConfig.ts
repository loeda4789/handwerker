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
  addUrlParamsToHref: (href: string | null) => string | null,
  heroType?: 'single' | 'slider' | 'video' | 'split',
  packageType?: 'starter' | 'professional' | 'premium'
): NavigationItem[] => {
  // Basis-Navigation basierend auf Hero-Typ und Package-Typ
  const getBaseNavigation = () => {
    const baseItems = []
    
    // Über uns - immer vorhanden
    baseItems.push({
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
    })
    
    // Leistungen - nur bei Professional und Premium, nicht bei Starter
    if (packageType !== 'starter') {
      baseItems.push({
        href: siteMode === 'multipage' ? null : '#leistungen', 
        label: 'Leistungen', 
        id: 'leistungen',
        hasDropdown: true,
        isClickable: siteMode === 'onepage',
        dropdownItems: content.services
          .filter((service: any) => service.slug)
          .map((service: any, index: number) => {
            return {
              href: addUrlParamsToHref(`/services/${service.slug}`),
              label: service.title,
              icon: service.icon
            }
          })
      })
    }

    // Hero-spezifische Navigation hinzufügen
    if (heroType === 'video') {
      // Video Hero: Weniger Navigation, fokussiert auf CTA
      baseItems.push(
        { href: siteMode === 'multipage' ? addUrlParamsToHref('/referenzen') : '#referenzen', label: 'Referenzen', id: 'referenzen', hasDropdown: false, isClickable: true, dropdownItems: [] }
      )
    } else if (heroType === 'slider') {
      // Slider Hero: Vollständige Navigation für bessere Orientierung
      baseItems.push(
        { href: siteMode === 'multipage' ? addUrlParamsToHref('#projektablauf') : '#projektablauf', label: 'Projektablauf', id: 'projektablauf', hasDropdown: false, isClickable: true, dropdownItems: [] },
        { href: siteMode === 'multipage' ? addUrlParamsToHref('/referenzen') : '#referenzen', label: 'Referenzen', id: 'referenzen', hasDropdown: false, isClickable: true, dropdownItems: [] }
      )
    } else if (heroType === 'split') {
      // Split Hero: Kompakte Navigation
      baseItems.push(
        { href: siteMode === 'multipage' ? addUrlParamsToHref('/referenzen') : '#referenzen', label: 'Referenzen', id: 'referenzen', hasDropdown: false, isClickable: true, dropdownItems: [] }
      )
    } else {
      // Single Hero (Standard): Standard-Navigation
      baseItems.push(
        { href: siteMode === 'multipage' ? addUrlParamsToHref('#projektablauf') : '#projektablauf', label: 'Projektablauf', id: 'projektablauf', hasDropdown: false, isClickable: true, dropdownItems: [] }
      )
    }

    // Kontakt immer hinzufügen
    baseItems.push(
      { href: siteMode === 'multipage' ? addUrlParamsToHref('/kontakt') : '#kontakt', label: 'Kontakt', id: 'kontakt', hasDropdown: false, isClickable: true, dropdownItems: [] }
    )

    // FAQ nur bei Multi-Page oder bestimmten Hero-Typen
    if (siteMode === 'multipage' || heroType === 'slider') {
      baseItems.push(
        { href: addUrlParamsToHref('/faq'), label: 'FAQ', id: 'faq', hasDropdown: false, isClickable: true, dropdownItems: [] }
      )
    }

    return baseItems
  }

  return getBaseNavigation()
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
