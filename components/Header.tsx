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
        { href: '#team', label: 'Team', id: 'team', isClickable: true },
        { href: '#projektablauf', label: 'Projektablauf', id: 'projektablauf', isClickable: true }
      ]
    }
  }

  const navItems = getNavItems()

  // Header-Stile basierend auf Design-Stil
  const getHeaderStyles = () => {
    if (designStyle === 'circular' || designStyle === 'curved') {
      // Sehr Modern & Modern: Floating Navigation mit Rundung
      return {
        container: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4',
        header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/20 ${
          isScrolled 
            ? 'bg-white/70 dark:bg-gray-900/70' 
            : 'bg-white/60 dark:bg-gray-900/60'
        }`,
        nav: 'px-6 py-3',
        borderRadius: designStyle === 'circular' ? '2rem' : '1.5rem',
        textColor: 'text-gray-900 dark:text-white',
        logoStyle: 'text-gray-900 dark:text-white',
        ctaStyle: 'bg-primary hover:bg-accent text-text-light',
        mobileMenuStyle: 'bg-white dark:bg-gray-800'
      }
    } else if (designStyle === 'angular') {
      // Klassisch: Kräftige Primärfarbe aus Konfigurator (NICHT verwässert)
      return {
        container: 'sticky top-0 z-50 w-full',
        header: `transition-all duration-300 shadow-lg border-b`,
        headerStyle: {
          backgroundColor: 'var(--color-primary)', // Kräftige Primärfarbe ohne Gradient
          borderBottomColor: 'var(--color-primary)'
        },
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-modal)',
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
          backgroundColor: 'var(--color-primary)', // Auch mobile menu kräftig
          borderTopColor: 'var(--color-primary)'
        },
        mobileCtaStyle: {
          backgroundColor: 'var(--color-secondary)',
          color: 'white'
        }
      }
    } else {
      // Halb Modern: Standard weiß mit Rundung
      return {
        container: 'sticky top-0 z-50 w-full',
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
    <div className={headerStyles.container}>
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
                      className={`${headerStyles.textColor} hover:opacity-80 font-medium transition-colors duration-200 flex items-center`}
                        >
                          {item.label}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
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
                    className={`${headerStyles.textColor} hover:opacity-80 font-medium transition-colors duration-200 ${
                      activeSection === item.id && siteMode === 'onepage' ? 'opacity-80' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
              </div>
                ))}
            
            <Link
              href="#kontakt"
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
              className={`px-6 py-2 ${headerStyles.ctaStyle}`}
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
            className={`lg:hidden p-2 ${headerStyles.textColor}`}
            aria-label="Menü öffnen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
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
                        className="w-full flex items-center justify-between py-3 text-white font-medium text-left"
                >
                  {item.label}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${
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
                          {item.dropdownItems?.map((dropdownItem, index) => (
                      <Link
                        key={index}
                        href={dropdownItem.href}
                              className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                        onClick={closeMobileMenu}
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
                      onClick={item.isClickable && item.href?.startsWith('#') ? (e) => {
                        handleSmoothScroll(e, item.id)
                        closeMobileMenu()
                      } : closeMobileMenu}
                      className="block py-3 text-white hover:text-white/80 font-medium transition-colors duration-200"
                    >
                      {item.label}
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
                className="block mt-4 px-6 py-3 text-center font-medium transition-all duration-200"
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
      </header>
      </div>
  )
} 