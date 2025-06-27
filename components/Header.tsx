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

  // Note: Dark mode functionality removed

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
    if (designStyle === 'circular') {
      // Sehr Modern: Floating Navigation mit maximaler Rundung
      return {
        container: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4',
        header: `transition-all duration-300 backdrop-blur-xl shadow-2xl border border-white/20 ${
          isScrolled 
            ? 'bg-white/70 dark:bg-gray-900/70' 
            : 'bg-white/60 dark:bg-gray-900/60'
        }`,
        nav: 'px-6 py-3',
        borderRadius: '2rem'
      }
    } else if (designStyle === 'angular') {
      // Klassisch: Immer weiß, nicht durchsichtig
      return {
        container: 'sticky top-0 z-50 w-full',
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white border-b border-border shadow-lg dark:bg-gray-900 dark:border-gray-700' 
            : 'bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700'
        }`,
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-modal)'
      }
    } else {
      // Andere Design-Stile: Standard sticky Navigation mit Transparenz
      return {
        container: 'sticky top-0 z-50 w-full',
        header: `transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-md border-b border-border shadow-lg dark:bg-dark/98 dark:border-gray-700' 
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent dark:bg-transparent dark:border-transparent'
        }`,
        nav: 'px-4 py-2.5 mx-auto max-w-screen-xl',
        borderRadius: 'var(--radius-modal)'
      }
    }
  }

  const headerStyles = getHeaderStyles()

  return (
    <>
      <div className={headerStyles.container}>
        <header className={headerStyles.header} style={{ borderRadius: headerStyles.borderRadius }}>
          <nav className={headerStyles.nav}>
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50 relative">
              <div className="h-12 px-4 bg-primary flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <span className="text-white font-bold text-sm whitespace-nowrap">
                  Ihr Logo
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button & CTA */}
            <div className="flex items-center lg:order-2">

              {/* Desktop CTA Button */}
              <Link
                href={siteMode === 'multipage' ? '/kontakt' : '#kontakt'}
                onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, 'kontakt') : undefined}
                className="hidden lg:inline-flex items-center px-5 py-2.5 mr-2 text-sm font-medium text-white bg-primary hover:bg-accent focus:ring-4 focus:ring-primary/30 dark:bg-primary dark:hover:bg-accent/90"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Jetzt Termin vereinbaren
              </Link>

              {/* Mobile Menu Button - Only visible on mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="lg:hidden inline-flex items-center p-2 ml-1 text-sm hover:bg-light focus:outline-none focus:ring-2 focus:ring-primary/20 dark:hover:bg-dark dark:focus:ring-light/20 z-50 relative transition-colors duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}
                aria-controls="navbar-mobile"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Menü öffnen</span>
                
                {/* Animated Hamburger */}
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
                    mobileMenuOpen ? 'rotate-45 translate-y-0' : 'translate-y-[-6px]'
                  }`}></span>
                  <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                  <span className={`w-6 h-0.5 bg-current transition-all duration-300 origin-center ${
                    mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[6px]'
                  }`}></span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex lg:w-auto lg:order-1" id="desktop-menu">
              <ul className="flex flex-row font-medium space-x-8">
                {navItems.map((item: any) => (
                  <li key={item.id} className="relative">
                    {item.hasDropdown && siteMode === 'multipage' ? (
                      <div
                        className="relative"
                        onMouseEnter={() => setDropdownOpen(item.id)}
                        onMouseLeave={() => setDropdownOpen(null)}
                      >
                        {item.isClickable ? (
                          <Link
                            href={item.href}
                            className={`flex items-center py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 text-text dark:text-light hover:text-primary dark:hover:text-primary`}
                          >
                            {item.label}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </Link>
                        ) : (
                          <span
                            className={`flex items-center py-2 px-3 lg:p-0 uppercase transition-colors duration-300 text-text dark:text-light cursor-default`}
                          >
                            {item.label}
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </span>
                        )}
                        
                        {/* Dropdown Menu */}
                        <div className={`absolute top-full left-0 mt-2 w-64 shadow-xl border transition-all duration-300 z-50 ${
                          designStyle === 'circular' 
                            ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/30 dark:border-gray-600/30' 
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                        } ${
                          dropdownOpen === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                        }`}
                          style={{ borderRadius: designStyle === 'circular' ? '1rem' : 'var(--radius-card)' }}>
                          <div className="py-2">
                            {item.dropdownItems?.map((dropdownItem: any, index: number) => (
                              <Link
                                key={index}
                                href={dropdownItem.href}
                                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors duration-200"
                              >
                                <span className="font-medium">{dropdownItem.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      item.isClickable ? (
                        <Link
                          href={item.href}
                          onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, item.id) : undefined}
                          className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                            activeSection === item.id && siteMode === 'onepage'
                              ? 'text-primary dark:text-accent font-semibold' 
                              : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span
                          className={`block py-2 px-3 lg:p-0 uppercase transition-colors duration-300 cursor-default text-text dark:text-light`}
                        >
                          {item.label}
                        </span>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      </div>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div className={`fixed inset-0 ${designStyle === 'circular' ? 'z-30' : 'z-40'} lg:hidden transition-all duration-500 ease-in-out ${
        mobileMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        {/* Background Overlay */}
        <div 
          className={`absolute inset-0 bg-white dark:bg-gray-900 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMobileMenu}
        ></div>
        
        {/* Navigation Content */}
        <div className={`relative h-full flex flex-col justify-center items-center transition-all duration-700 ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Navigation Links */}
          <nav className="text-center space-y-8">
            {navItems.map((item: any) => (
              <div key={item.id}>
                {item.hasDropdown && siteMode === 'multipage' ? (
                  <div>
                    {/* Main dropdown trigger - no link behavior */}
                    <button
                      onClick={() => toggleMobileDropdown(item.id)}
                      className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                        mobileDropdownOpen === item.id
                          ? 'text-primary dark:text-accent font-medium' 
                          : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {item.label}
                        <svg className={`w-6 h-6 ml-2 transition-transform duration-300 ${
                          mobileDropdownOpen === item.id ? 'rotate-180' : ''
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </span>
                    </button>
                    
                    {/* Mobile Dropdown Items - Collapsible */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      mobileDropdownOpen === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="mt-4 space-y-4">
                        {item.dropdownItems?.map((dropdownItem: any, index: number) => (
                          <Link
                            key={index}
                            href={dropdownItem.href}
                            onClick={closeMobileMenu}
                            className="block text-center text-xl font-light text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors duration-300"
                          >
                            <span>{dropdownItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  item.isClickable ? (
                    <Link
                      href={item.href}
                      onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, item.id) : closeMobileMenu}
                      className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                        activeSection === item.id && siteMode === 'onepage'
                          ? 'text-primary dark:text-accent font-medium' 
                          : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={`block text-4xl font-light tracking-wide transition-all duration-300 cursor-default text-text dark:text-light`}
                    >
                      {item.label}
                    </span>
                  )
                )}
              </div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className={`mt-16 transition-all duration-700 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Link
              href={siteMode === 'multipage' ? '/kontakt' : '#kontakt'}
              onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, 'kontakt') : closeMobileMenu}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-accent hover:shadow-xl hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-primary/30"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              Jetzt Termin vereinbaren
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
          
          {/* Company Info */}
          <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-700 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-text-secondary dark:text-light/60 text-sm">
              {content.company.name}
            </p>
            <p className="text-text-secondary dark:text-light/60 text-sm mt-1">
              {content.company.tagline}
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 