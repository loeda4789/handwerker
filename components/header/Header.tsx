'use client'

import { useState, useEffect } from 'react'
import { ContentData } from '@/types/content'
import { useAppConfig, useLayoutConfig } from '@/contexts/AppConfigContext'
import { getHeaderStyles, getDropdownStyles } from '@/lib/config/headerStyles'
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig'
import HeaderLogo from './HeaderLogo'
import HeaderNavigation from './HeaderNavigation'
import HeaderCta from './HeaderCta'
import MobileHeader from './MobileHeader'

interface HeaderProps {
  content: ContentData
}

export default function Header({ content }: HeaderProps) {
  // Neue Konfigurationsarchitektur verwenden
  const { config } = useAppConfig()
  const { mode: siteMode, design: designStyle } = useLayoutConfig()
  
  // Lokale UI-States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
  const [headerVisible, setHeaderVisible] = useState(true)

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
      
      // Header visibility logic basierend auf Design-Style
      if (designStyle === 'rounded') {
        setHeaderVisible(scrolled || window.scrollY < 100)
      } else {
        setHeaderVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [designStyle])

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

  // Navigation Items basierend auf Site-Mode
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref)

  // Header-Stile basierend auf Design-Stil
  const headerStyles = getHeaderStyles(designStyle, isScrolled, headerVisible)
  const dropdownStyles = getDropdownStyles(designStyle, isScrolled)

  return (
    <>
      <div 
        className={headerStyles.container}
        style={headerStyles.transformStyle}
      >
        <header 
          className={headerStyles.header}
          style={{ 
            borderRadius: headerStyles.borderRadius,
            ...headerStyles.headerStyle
          }}
        >
          <nav className={`${headerStyles.nav} flex items-center justify-between`}>
            {/* Logo */}
            <HeaderLogo 
              logoStyle={headerStyles.logoStyle}
              companyName={content.company.name}
            />

            {/* Desktop Navigation */}
            <HeaderNavigation
              navItems={navItems}
              textColor={headerStyles.textColor}
              dropdownStyles={dropdownStyles}
              dropdownOpen={dropdownOpen}
              activeSection={activeSection}
              siteMode={siteMode}
              onDropdownEnter={handleDropdownEnter}
              onDropdownLeave={handleDropdownLeave}
              onSmoothScroll={handleSmoothScroll}
            />
            
            {/* CTA Button */}
            <HeaderCta
              ctaStyle={headerStyles.ctaStyle}
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
