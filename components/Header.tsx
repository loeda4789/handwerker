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
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null)
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

  // Hide-on-Scroll Verhalten nur für freundlich (rounded)
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

  // Dropdown handling functions
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
            href: `/services/${service.slug}`,
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
        // Modern: Nur Zentrierung, immer sichtbar
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
      // Angular: Eckiges Design mit transparentem Hintergrund
      return {
        container: 'fixed top-0 z-50 w-full',
        transformStyle: {},
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
            : 'bg-transparent'
        }`,
        headerStyle: isScrolled ? {} : {},
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: '0px', // Eckig
        textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          color: 'white'
        }
      }
    } else if (designStyle === 'rounded') {
      // Rounded: Sanfte Ecken mit transparentem Hintergrund
      return {
        container: 'fixed top-0 z-50 w-full',
        transformStyle: getTransformStyle(),
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
            : 'bg-transparent'
        }`,
        nav: 'px-4 py-4 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-card)',
        textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          color: 'white'
        }
      }
    } else if (designStyle === 'modern') {
      // Modern: Floating header mit Abstand und begrenzter Breite, immer fixed
      return {
        container: 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-4',
        transformStyle: getTransformStyle(),
        header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/10 ${
          isScrolled 
            ? 'bg-black/30 dark:bg-gray-900/40' 
            : 'bg-black/25 dark:bg-gray-900/35'
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
        }
      }
    } else {
      // Fallback: Standard mit transparentem Hintergrund
      return {
        container: 'fixed top-0 z-50 w-full',
        transformStyle: {},
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-border shadow-lg dark:bg-gray-900/95 dark:border-gray-700' 
            : 'bg-transparent'
        }`,
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-modal)',
        textColor: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        logoStyle: isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
        ctaStyle: 'text-white font-medium transition-all duration-200',
        ctaStyleDynamic: {
          backgroundColor: 'var(--color-secondary)',
          borderColor: 'var(--color-secondary)'
        },
        ctaHoverStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)', 
          color: 'white'
        }
      }
    }
  }

  const headerStyles = getHeaderStyles()

  // Dropdown styling basierend auf Design-Stil
  const getDropdownStyles = () => {
    if (designStyle === 'angular') {
      return {
        container: 'absolute top-full left-0 mt-2 w-48 shadow-xl border z-50',
        containerStyle: {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          borderRadius: '0px'
        },
        item: 'block px-4 py-3 text-white hover:bg-white hover:text-gray-900 font-medium transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
        itemHoverStyle: {
          backgroundColor: 'white',
          color: 'var(--color-primary)'
        }
      }
    } else if (designStyle === 'rounded') {
      return {
        container: 'absolute top-full left-0 mt-2 w-48 shadow-xl border z-50',
        containerStyle: {
          backgroundColor: 'white',
          borderColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-card)'
        },
        item: 'block px-4 py-3 text-gray-700 hover:text-white hover:font-bold hover:bg-gradient-to-r transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
        itemHoverStyle: {
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
          color: 'white'
        }
      }
    } else if (designStyle === 'modern') {
      return {
        container: 'absolute top-full left-0 mt-2 w-48 shadow-2xl border z-50',
        containerStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'var(--radius-card)',
          backdropFilter: 'blur(20px)'
        },
        item: 'block px-4 py-3 text-white hover:text-white hover:font-bold hover:bg-gradient-to-r transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
        itemHoverStyle: {
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
          color: 'white'
        }
      }
    } else {
      return {
        container: 'absolute top-full left-0 mt-2 w-48 shadow-xl border border-gray-200 dark:border-gray-700 z-50',
        containerStyle: {
          backgroundColor: 'white',
          borderColor: 'var(--color-primary)',
          borderRadius: 'var(--radius-card)'
        },
        item: 'block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-white hover:font-bold hover:bg-gradient-to-r transition-all duration-300 first:rounded-t-lg last:rounded-b-lg uppercase hover:scale-[1.02] hover:shadow-md',
        itemHoverStyle: {
          background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))',
          color: 'white'
        }
      }
    }
  }

  const dropdownStyles = getDropdownStyles()

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
                        onMouseEnter={() => handleDropdownEnter(item.id)}
                        onMouseLeave={() => handleDropdownLeave(item.id)}
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
                        className={`${dropdownStyles.container}`}
                        style={dropdownStyles.containerStyle}
                        onMouseEnter={() => handleDropdownEnter(item.id)}
                        onMouseLeave={() => handleDropdownLeave(item.id)}
                      >
                        {item.dropdownItems?.map((dropdownItem, index) => (
                              <Link
                                key={index}
                                href={dropdownItem.href}
                            className={`${dropdownStyles.item}`}
                            style={{
                              '--tw-gradient-from': 'var(--color-primary)',
                              '--tw-gradient-to': 'var(--color-secondary)',
                            } as React.CSSProperties}
                            onMouseEnter={(e) => {
                              if (dropdownStyles.itemHoverStyle) {
                                Object.assign(e.currentTarget.style, dropdownStyles.itemHoverStyle);
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.removeProperty('background');
                              e.currentTarget.style.removeProperty('color');
                              e.currentTarget.style.removeProperty('background-color');
                            }}
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
      </header>
      </div>

      {/* Mobile Menu - Schöne zentrierte Navigation nur für Onepage-Modus */}
      {mobileMenuOpen && siteMode === 'onepage' && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Overlay Panel - Zentrierte schöne Navigation */}
          <div className="absolute inset-0 bg-white shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 animate-in fade-in-up duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center logo-font text-lg font-bold"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  {getCompanyInitials(content.company.name)}
                </div>
                <span className="text-xl font-semibold text-gray-900 logo-font uppercase">
                  {content.company.name}
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-3 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            {/* Navigation Items - Zentriert und größer */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 space-y-6 text-center">
              {getNavItems().map((item, index) => (
                <div 
                  key={item.id}
                  className="animate-in slide-in-from-left duration-600"
                  style={{ animationDelay: `${200 + index * 150}ms`, animationFillMode: 'both' }}
                >
                  <Link
                    href={item.href || '#'}
                    onClick={item.isClickable && item.href?.startsWith('#') ? (e) => {
                      handleSmoothScroll(e, item.id)
                      closeMobileMenu()
                    } : closeMobileMenu}
                    className="block py-6 text-gray-900 hover:text-white font-semibold text-2xl transition-all duration-500 uppercase hover:scale-110 rounded-xl hover:bg-gradient-to-r group relative overflow-hidden"
                    style={{
                      '--tw-gradient-from': 'var(--color-primary)',
                      '--tw-gradient-to': 'var(--color-secondary)',
                    } as React.CSSProperties}
                  >
                    <span className="relative z-10">
                      {item.label}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" style={{
                      background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))'
                    }}></span>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* CTA Button - Unten fixiert */}
            <div className="p-8 border-t border-gray-200 animate-in slide-in-from-bottom duration-600" style={{ animationDelay: `${200 + getNavItems().length * 150}ms`, animationFillMode: 'both' }}>
              <Link
                href="#kontakt"
                onClick={(e) => {
                  handleSmoothScroll(e, 'kontakt')
                  closeMobileMenu()
                }}
                className="w-full flex items-center justify-center px-8 py-6 text-white font-bold text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl uppercase rounded-2xl"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Jetzt Termin vereinbaren
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu - Multipage Navigation (unverändert) */}
      {mobileMenuOpen && siteMode === 'multipage' && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Overlay Panel - Vollflächig weiß für ALLE Design-Stile */}
          <div className="absolute inset-0 bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center logo-font text-sm font-bold"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  {getCompanyInitials(content.company.name)}
                </div>
                <span className="text-lg font-semibold text-gray-900 logo-font uppercase">
                  {content.company.name}
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
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
                        className="w-full flex items-center justify-between py-4 text-gray-900 font-medium text-left hover:bg-gradient-to-r hover:text-white hover:font-bold transition-all duration-300 rounded-lg px-3 uppercase hover:scale-[1.02] hover:shadow-md group"
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
                              className="block py-3 px-3 text-gray-700 hover:bg-gradient-to-r hover:text-white hover:font-bold transition-all duration-300 uppercase hover:scale-[1.02] rounded-lg border border-transparent hover:border-gray-200 group"
                              style={{
                                '--tw-gradient-from': 'var(--color-primary)',
                                '--tw-gradient-to': 'var(--color-secondary)',
                              } as React.CSSProperties}
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
                      className="block py-4 px-3 text-gray-900 hover:bg-gradient-to-r hover:text-white font-medium transition-all duration-300 uppercase hover:scale-[1.02] rounded-lg border border-transparent hover:border-gray-200 group"
                      style={{
                        '--tw-gradient-from': 'var(--color-primary)',
                        '--tw-gradient-to': 'var(--color-secondary)',
                      } as React.CSSProperties}
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
            <div className="p-6 border-t border-gray-200">
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
      )}
    </>
  )
} 