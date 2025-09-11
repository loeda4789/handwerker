'use client'

import { useState, useEffect } from 'react'
import { ContentData } from '@/types/content'
import { useAppConfig, useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { getHeaderStyles, getDropdownStyles } from '@/lib/config/headerStyles'
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig'
import { useHeroConfig } from '@/contexts/AppConfigContext'
import HeaderLogo from './header/HeaderLogo'
import HeaderNavigation from './header/HeaderNavigation'
import HeaderCta from './header/HeaderCta'
import MobileHeader from './header/MobileHeader'
import HeaderKlassik from './header/HeaderKlassik'

interface HeaderProps {
  content: ContentData
}

export default function Header({ content }: HeaderProps) {
  // Neue Konfigurationsarchitektur verwenden
  const { config } = useAppConfig()
  const { mode: siteMode, design: designStyle } = useLayoutConfig()
  const { type: heroType } = useHeroConfig()
  
  // Lokale UI-States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll detection for header background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrolled = currentScrollY > 50
      setIsScrolled(scrolled)
      
      // Header visibility logic: Immer einblenden wenn nach oben gescrollt wird
      if (designStyle === 'rounded') {
        // Bei rounded: Einblenden wenn nach oben gescrollt wird oder am Anfang der Seite
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setHeaderVisible(true)
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHeaderVisible(false)
        }
      } else {
        // Bei anderen Styles: Immer sichtbar
        setHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [designStyle, lastScrollY])

  // Active section detection (nur für One-Page Modus)
  useEffect(() => {
    if (siteMode !== 'onepage') return

    const handleScroll = () => {
      const sections = ['ueber-uns', 'leistungen', 'projektablauf']
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [siteMode])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout)
      }
    }
  }, [dropdownTimeout])

  // Smooth scrolling (nur für One-Page Modus)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    console.log('handleSmoothScroll called:', targetId, 'siteMode:', siteMode)
    if (siteMode !== 'onepage') return
    
    e.preventDefault()
    const element = document.getElementById(targetId)
    console.log('Element found for smooth scroll:', element)
    if (element) {
      console.log('Scrolling to element:', targetId)
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Dropdown handlers
  const handleDropdownEnter = (itemId: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout)
      setDropdownTimeout(null)
    }
    setDropdownOpen(itemId)
  }

  const handleDropdownLeave = (itemId: string) => {
    const timeout = setTimeout(() => {
      setDropdownOpen(null)
    }, 150) // 150ms Verzögerung
    setDropdownTimeout(timeout)
  }

  // Package-Typ bestimmen basierend auf Site-Mode und Features
  const getPackageType = (): 'starter' | 'professional' | 'premium' => {
    if (siteMode === 'multipage') return 'premium'
    if (config.features.sideContact) return 'professional'
    return 'starter'
  }
  
  const packageType = getPackageType()
  
  // Navigation Items basierend auf Variante und Hero-Typ
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, packageType)

  // Header-Stile basierend auf Design-Stil
  const headerStyles = getHeaderStyles(designStyle, isScrolled, headerVisible)
  const dropdownStyles = getDropdownStyles(designStyle, isScrolled)
  
  // Für Split-Hero: Dunklerer Header
  const isSplitHero = heroType === 'split'
  const splitHeaderStyles = isSplitHero ? {
    ...headerStyles,
    header: headerStyles.header.replace('bg-white/95', 'bg-gray-900/95').replace('bg-white', 'bg-gray-900'),
    textColor: 'text-white',
    logoStyle: 'text-white',
    ctaStyle: 'bg-white text-gray-900 hover:bg-gray-100'
  } : headerStyles

  // HeaderKlassik für bestimmte Hero-Typen oder Stil-Pakete
  const { package: stylePackage } = useStyleConfig()
  
  // Verwende HeaderKlassik für:
  // 1. Hero-Typ "split" (wie norndquartier.de)
  // 2. Stil-Paket "luxury" (elegant und hochwertig)
  if (heroType === 'split' || stylePackage === 'luxury') {
    return <HeaderKlassik content={content} />
  }

  return (
    <>
      <div 
        className={headerStyles.container}
        style={headerStyles.transformStyle}
      >
        <header 
          className={splitHeaderStyles.header}
          style={{ 
            borderRadius: splitHeaderStyles.borderRadius,
            ...splitHeaderStyles.headerStyle
          }}
        >
          <nav className={`${splitHeaderStyles.nav} flex items-center justify-between`}>
            {/* Logo */}
            <HeaderLogo 
              logoStyle={splitHeaderStyles.logoStyle}
              companyName={content.company.name}
            />

            {/* Desktop Navigation - Zentriert mit mehr Platz */}
            <div className="flex-1 flex justify-center">
              <HeaderNavigation
                navItems={navItems}
                textColor={splitHeaderStyles.textColor}
                dropdownStyles={dropdownStyles}
                dropdownOpen={dropdownOpen}
                activeSection={activeSection}
                siteMode={siteMode}
                onDropdownEnter={handleDropdownEnter}
                onDropdownLeave={handleDropdownLeave}
                onSmoothScroll={handleSmoothScroll}
              />
            </div>
            
            {/* CTA Button */}
            <HeaderCta
              ctaStyle={splitHeaderStyles.ctaStyle}
              ctaStyleDynamic={headerStyles.ctaStyleDynamic}
              ctaHoverStyle={headerStyles.ctaHoverStyle}
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${headerStyles.textColor} hover:scale-110 transition-all duration-300 rounded-lg hover:bg-black/10 dark:hover:bg-white/10`}
              aria-label="Menü öffnen"
            >
              <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileHeader
          navItems={navItems}
          content={content}
          siteMode={siteMode}
          onSmoothScroll={handleSmoothScroll}
          onClose={closeMobileMenu}
        />
      )}
    </>
  )
}