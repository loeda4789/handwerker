'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ContentData } from '@/types/content'

interface HeaderProps {
  content: ContentData
}

export default function Header({ content }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [designStyle, setDesignStyle] = useState<string>('angular')
  const [headerVisible, setHeaderVisible] = useState(true)
  
  // Site-Mode und Design-Style aus localStorage laden
  useEffect(() => {
    const savedMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (savedMode) {
      setSiteMode(savedMode)
    }
    
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
    }
    
    // Event listener für site-mode Änderungen
    const handleSiteModeChange = () => {
      const newMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
      if (newMode) {
        setSiteMode(newMode)
      }
    }
    
    // Event listener für design-style Änderungen
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
      }
    }
    
    window.addEventListener('site-mode-changed', handleSiteModeChange)
    window.addEventListener('storage', handleDesignStyleChange)
    return () => {
      window.removeEventListener('site-mode-changed', handleSiteModeChange)
      window.removeEventListener('storage', handleDesignStyleChange)
    }
  }, [])

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide-on-Scroll Verhalten nur für freundlich
  useEffect(() => {
    if (designStyle !== 'rounded') {
      setHeaderVisible(true)
      return
    }

    let lastScrollY = window.scrollY
    let isScrollingDown = false

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Bei ganz oben: immer zeigen
      if (currentScrollY <= 10) {
        setHeaderVisible(true)
      } 
      // Runterscrollen und weit genug unten
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false)
        isScrollingDown = true
      } 
      // Hochscrollen (egal von wo)
      else if (currentScrollY < lastScrollY) {
        setHeaderVisible(true)
        isScrollingDown = false
      }
      
      lastScrollY = currentScrollY
    }

    // Throttle mit setTimeout statt requestAnimationFrame
    let timeoutId: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll()
          timeoutId = null
        }, 10)
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [designStyle])

  // Active section detection (nur für One-Page Modus)
  useEffect(() => {
    if (siteMode !== 'onepage') return

    const handleScroll = () => {
      const sections = ['ueber-uns', 'leistungen', 'team', 'projektablauf']
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

  // Smooth scrolling (nur für One-Page Modus)
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (siteMode !== 'onepage') return
    
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileDropdownOpen(null) // Reset mobile dropdowns when closing menu
  }

  const toggleMobileDropdown = (itemId: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === itemId ? null : itemId)
  }

  // Navigation Items basierend auf Site-Mode
  const getNavItems = () => {
    if (siteMode === 'multipage') {
      return [
        { 
          href: null, 
          label: 'Über uns', 
          id: 'ueber-uns',
          hasDropdown: true,
          isClickable: false,
          dropdownItems: [
            { href: '/ueber-uns/team', label: 'Unser Team' },
            { href: '/ueber-uns/betrieb', label: 'Unser Betrieb' },
            { href: '/ueber-uns/partner', label: 'Partner & Zulieferer' },
            { href: '/ueber-uns/zertifikate', label: 'Zertifikate & Auszeichnungen' }
          ]
        },
        { 
          href: null, 
          label: 'Leistungen', 
          id: 'leistungen',
          hasDropdown: true,
          isClickable: false,
          dropdownItems: content.services.map((service: any, index: number) => ({
            href: `/services/leistung-${index + 1}`,
            label: service.title,
            icon: service.icon
          }))
        },
        { href: '/referenzen', label: 'Referenzen', id: 'referenzen', isClickable: true },
        { href: '/faq', label: 'FAQ', id: 'faq', isClickable: true },
        { href: '/kontakt', label: 'Kontakt', id: 'kontakt', isClickable: true }
      ]
    } else {
      return [
        { href: '#ueber-uns', label: content.about.title, id: 'ueber-uns', isClickable: true },
        { href: '#leistungen', label: 'Leistungen', id: 'leistungen', isClickable: true },
        { href: '#projektablauf', label: 'Projektablauf', id: 'projektablauf', isClickable: true }
      ]
    }
  }

  const navItems = getNavItems()

  // Header-Stile basierend auf Design-Stil
  const getHeaderStyles = () => {
    // Transform direkt als inline style für zuverlässigere Kontrolle
    const getTransformStyle = () => {
      if (designStyle === 'modern') {
        // Modern: Nur Zentrierung, kein Hide-Verhalten
        return {
          transform: 'translateX(-50%)',
          transition: 'transform 0.3s ease-in-out'
        }
      } else if (designStyle === 'rounded') {
        return {
          transform: headerVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }
      }
      return {}
    }
    
    if (designStyle === 'angular') {
      // Klassisch: Eckige Kanten, dunkler Hintergrund, kein Hide-Verhalten
      return {
        container: 'sticky top-0 z-50 w-full',
        transformStyle: {},
        header: `transition-all duration-300 shadow-lg border-b`,
        headerStyle: {
          backgroundColor: 'var(--color-primary)', // Dunkler Hintergrund
          borderBottomColor: 'var(--color-primary)'
        },
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: '0px', // Eckig
        textColor: 'text-white',
        logoStyle: 'text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'white',
          borderColor: 'white',
          color: 'var(--color-primary)'
        },
        mobileMenuStyle: 'border-t',
        mobileMenuStyleDynamic: {
          backgroundColor: 'var(--color-primary)', 
          borderTopColor: 'var(--color-primary)'
        },
        mobileCtaStyle: {
          backgroundColor: 'var(--color-secondary)',
          color: 'white'
        }
      }
    } else if (designStyle === 'rounded') {
      // Freundlich: Weiß aber leicht durchsichtig, runde Buttons
      return {
        container: 'sticky top-0 z-50 w-full',
        transformStyle: getTransformStyle(),
        header: `transition-all duration-300 backdrop-blur-md shadow-lg border-b border-white/20 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90' 
            : 'bg-white/80 dark:bg-gray-900/80'
        }`,
        nav: 'px-4 py-3 mx-auto max-w-screen-xl',
        borderRadius: '0.75rem', // Leicht rund
        textColor: 'text-gray-900 dark:text-white',
        logoStyle: 'text-gray-900 dark:text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          color: 'white'
        },
        mobileMenuStyle: 'bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border-t border-white/20'
      }
    } else if (designStyle === 'modern') {
      // Modern: Floating header mit Abstand und begrenzter Breite
      return {
        container: 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-4',
        transformStyle: getTransformStyle(),
        header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/10 ${
          isScrolled 
            ? 'bg-black/25 dark:bg-gray-900/35' 
            : 'bg-black/20 dark:bg-gray-900/30'
        }`,
        nav: 'px-8 py-4',
        borderRadius: '2rem', // Floating pill design
        textColor: 'text-white',
        logoStyle: 'text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          color: 'white'
        },
        mobileMenuStyle: 'bg-black/30 backdrop-blur-xl dark:bg-gray-800/40 border-t border-white/20'
      }
    } else {
      // Fallback: Standard
      return {
        container: 'sticky top-0 z-50 w-full',
        transformStyle: {},
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white border-b border-border shadow-lg dark:bg-gray-900 dark:border-gray-700' 
            : 'bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700'
        }`,
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-modal)',
        textColor: 'text-gray-900 dark:text-white',
        logoStyle: 'text-gray-900 dark:text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'white',
          borderColor: 'white', 
          color: 'var(--color-primary)'
        },
        mobileMenuStyle: 'bg-white dark:bg-gray-800'
      }
    }
  }

  const headerStyles = getHeaderStyles()

  // Helper function to generate initials from company name
  const getCompanyInitials = (companyName: string): string => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) // Max 2 Buchstaben
  }

  // Helper function to extract company type
  const getCompanyType = (companyName: string): string => {
    const parts = companyName.split(' ')
    return parts[parts.length - 1] // Letztes Wort (z.B. "GmbH", "Handwerk")
  }

  return (
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
          <Link href="/" className="flex items-center space-x-3">
            <div 
              className={`w-10 h-10 ${headerStyles.logoStyle} border-2 border-current flex items-center justify-center logo-font text-lg`}
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              IL
            </div>
            <span className={`text-2xl logo-font ${headerStyles.logoStyle} hidden sm:block`}>
              Ihr Logo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {getNavItems().map((item) => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setDropdownOpen(item.id)}
                        onMouseLeave={() => setDropdownOpen(null)}
                      >
                    <button 
                      className={`${headerStyles.textColor} relative font-medium transition-all duration-300 flex items-center uppercase group hover:scale-105`}
                        >
                          <span className="relative">
                            {item.label}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                          </span>
                          <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                          </svg>
                    </button>
                        
                    {dropdownOpen === item.id && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        {item.dropdownItems?.map((dropdownItem, index) => (
                              <Link
                                key={index}
                                href={dropdownItem.href}
                            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-white hover:font-bold hover:bg-gradient-to-r transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md"
                            style={{
                              '--tw-gradient-from': 'var(--color-primary)',
                              '--tw-gradient-to': 'var(--color-secondary)',
                            } as React.CSSProperties}
                              >
                            {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                    )}
                      </div>
                    ) : (
                      <Link
                    href={item.href || '#'}
                    onClick={item.isClickable && item.href?.startsWith('#') ? (e) => handleSmoothScroll(e, item.id) : undefined}
                    className={`${headerStyles.textColor} relative font-medium transition-all duration-300 uppercase group hover:scale-105 ${
                      activeSection === item.id && siteMode === 'onepage' ? 'scale-105' : ''
                        }`}
                      >
                        <span className="relative">
                          {item.label}
                          <span className={`absolute bottom-0 left-0 h-0.5 bg-current transition-all duration-300 ${
                            activeSection === item.id && siteMode === 'onepage' ? 'w-full' : 'w-0 group-hover:w-full'
                          }`} style={{ backgroundColor: 'var(--color-primary)' }}></span>
                        </span>
                      </Link>
                    )}
              </div>
                ))}
            
            <Link
              href="#kontakt"
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
              className={`px-6 py-2 uppercase ${headerStyles.ctaStyle}`}
              style={{ 
                borderRadius: 'var(--radius-button)',
                ...headerStyles.ctaStyleDynamic
              }}
              onMouseEnter={(e) => {
                if (headerStyles.ctaHoverStyle) {
                  Object.assign(e.currentTarget.style, headerStyles.ctaHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                if (headerStyles.ctaStyleDynamic) {
                  Object.assign(e.currentTarget.style, headerStyles.ctaStyleDynamic);
                }
              }}
            >
              Kontakt
            </Link>
          </div>

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

        {/* Mobile Menu - Modern/Freundlich vs Klassisch */}
        {mobileMenuOpen && (
          <>
            {(designStyle === 'modern' || designStyle === 'rounded') ? (
              // Moderne Overlay-Navigation für Modern & Freundlich
              <div className="fixed inset-0 z-50 lg:hidden">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                  onClick={closeMobileMenu}
                ></div>
                
                {/* Overlay Panel */}
                <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl animate-in slide-in-from-right duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center logo-font text-sm font-bold"
                        style={{ borderRadius: 'var(--radius-button)' }}
                      >
                        IL
                      </div>
                      <span className="text-lg font-semibold text-gray-900 dark:text-white logo-font uppercase">
                        Ihr Logo
                      </span>
                    </div>
                    <button
                      onClick={closeMobileMenu}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="flex-1 px-6 py-6 space-y-2">
                    {getNavItems().map((item, index) => (
                      <div 
                        key={item.id}
                        className="animate-in slide-in-from-right duration-300"
                        style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                      >
                        {item.hasDropdown ? (
                          <div>
                            <button
                              onClick={() => toggleMobileDropdown(item.id)}
                              className="w-full flex items-center justify-between py-4 text-gray-900 dark:text-white font-medium text-left hover:bg-gradient-to-r hover:text-white hover:font-bold transition-all duration-300 rounded-lg px-3 uppercase hover:scale-[1.02] hover:shadow-md group"
                              style={{
                                '--tw-gradient-from': 'var(--color-primary)',
                                '--tw-gradient-to': 'var(--color-secondary)',
                              } as React.CSSProperties}
                            >
                              <span className="relative">
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                              </span>
                              <svg 
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  mobileDropdownOpen === item.id ? 'rotate-180' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                              </svg>
                            </button>
                            
                            {mobileDropdownOpen === item.id && (
                              <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                {item.dropdownItems?.map((dropdownItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={dropdownItem.href}
                                    className="block py-2 text-white/80 hover:text-white hover:font-bold hover:bg-white/10 transition-all duration-300 uppercase hover:scale-[1.02] border border-transparent hover:border-white/20 group"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="relative">
                                      {dropdownItem.label}
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href || '#'}
                            onClick={item.isClickable && item.href?.startsWith('#') ? (e) => {
                              handleSmoothScroll(e, item.id)
                              closeMobileMenu()
                            } : closeMobileMenu}
                            className="block py-3 text-white hover:bg-white/20 hover:backdrop-blur-sm hover:font-bold hover:text-white font-medium transition-all duration-300 uppercase hover:scale-[1.02] rounded-lg px-3 border border-transparent hover:border-white/30 group"
                          >
                            <span className="relative">
                              {item.label}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button - Unten */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href="#kontakt"
                      onClick={(e) => {
                        handleSmoothScroll(e, 'kontakt')
                        closeMobileMenu()
                      }}
                      className="w-full flex items-center justify-center px-6 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg uppercase"
                      style={{ 
                        borderRadius: 'var(--radius-button)',
                        backgroundColor: 'var(--color-secondary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                      }}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      Jetzt Termin vereinbaren
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              // Klassische Navigation für Angular Design
              <div 
                className={`lg:hidden ${headerStyles.mobileMenuStyle}`}
                style={headerStyles.mobileMenuStyleDynamic}
              >
                <div className="px-4 py-4 space-y-2">
                  {getNavItems().map((item) => (
                  <div key={item.id}>
                      {item.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => toggleMobileDropdown(item.id)}
                            className="w-full flex items-center justify-between py-3 text-white font-medium text-left hover:bg-white/20 hover:backdrop-blur-sm hover:font-bold hover:text-white transition-all duration-300 rounded-lg px-3 uppercase hover:scale-[1.02] border border-transparent hover:border-white/30 group"
                            >
                              <span className="relative">
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                              </span>
                              <svg 
                                className={`w-5 h-5 transition-transform duration-200 ${
                                  mobileDropdownOpen === item.id ? 'rotate-180' : ''
                                }`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                              </svg>
                            </button>
                            
                            {mobileDropdownOpen === item.id && (
                              <div className="ml-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                {item.dropdownItems?.map((dropdownItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={dropdownItem.href}
                                    className="block py-2 text-white/80 hover:text-white hover:font-bold hover:bg-white/10 transition-all duration-300 uppercase hover:scale-[1.02] border border-transparent hover:border-white/20 group"
                                    onClick={closeMobileMenu}
                                  >
                                    <span className="relative">
                                      {dropdownItem.label}
                                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={item.href || '#'}
                            onClick={item.isClickable && item.href?.startsWith('#') ? (e) => {
                              handleSmoothScroll(e, item.id)
                              closeMobileMenu()
                            } : closeMobileMenu}
                            className="block py-3 text-white hover:bg-white/20 hover:backdrop-blur-sm hover:font-bold hover:text-white font-medium transition-all duration-300 uppercase hover:scale-[1.02] rounded-lg px-3 border border-transparent hover:border-white/30 group"
                          >
                            <span className="relative">
                              {item.label}
                              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </span>
                          </Link>
                        )}
                    </div>
                  ))}
                
                <Link
                    href="#kontakt"
                    onClick={(e) => {
                      handleSmoothScroll(e, 'kontakt')
                      closeMobileMenu()
                    }}
                    className="block mt-4 px-6 py-3 text-center font-medium transition-all duration-300 uppercase hover:scale-105 hover:shadow-lg border border-white/30 hover:border-white/60 hover:bg-white/10"
                    style={{ 
                      borderRadius: 'var(--radius-button)',
                      ...headerStyles.mobileCtaStyle
                    }}
                  >
                    Kontakt
                </Link>
              </div>
              </div>
            )}
          </>
        )}
      </header>
      </div>
  )
} 