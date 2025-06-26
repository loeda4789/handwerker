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
  
  // Site-Mode aus localStorage laden
  useEffect(() => {
    const savedMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (savedMode) {
      setSiteMode(savedMode)
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
  }

  // Navigation Items basierend auf Site-Mode
  const getNavItems = () => {
    if (siteMode === 'multipage') {
      return [
        { href: '/services', label: 'Leistungen', id: 'leistungen' },
        { href: '/referenzen', label: 'Referenzen', id: 'referenzen' },
        { href: '/ueber-uns', label: content.about.title, id: 'ueber-uns' },
        { href: '/faq', label: 'FAQ', id: 'faq' },
        { href: '/kontakt', label: 'Kontakt', id: 'kontakt' }
      ]
    } else {
      return [
        { href: '#ueber-uns', label: content.about.title, id: 'ueber-uns' },
        { href: '#leistungen', label: 'Leistungen', id: 'leistungen' },
        { href: '#team', label: 'Team', id: 'team' },
        { href: '#projektablauf', label: 'Projektablauf', id: 'projektablauf' }
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md border-b border-border shadow-lg dark:bg-dark/98 dark:border-gray-700' 
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent dark:bg-transparent dark:border-transparent'
      }`}>
        <nav className="px-4 py-2.5 mx-auto max-w-screen-xl">
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center z-50 relative">
              <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {content.company.name.charAt(0)}
                </span>
              </div>
            </Link>

            {/* Mobile Menu Button & CTA */}
            <div className="flex items-center lg:order-2">

              {/* Desktop CTA Button */}
              <Link
                href={siteMode === 'multipage' ? '/kontakt' : '#kontakt'}
                onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, 'kontakt') : undefined}
                className="hidden lg:inline-flex items-center px-5 py-2.5 mr-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-accent focus:ring-4 focus:ring-primary/30 dark:bg-primary dark:hover:bg-accent/90"
              >
                Jetzt Termin vereinbaren
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden hover:bg-light focus:outline-none focus:ring-2 focus:ring-primary/20 dark:hover:bg-dark dark:focus:ring-light/20 z-50 relative transition-colors duration-300"
                aria-controls="mobile-menu"
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
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, item.id) : undefined}
                      className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                        (siteMode === 'onepage' && activeSection === item.id) 
                          ? 'text-primary dark:text-accent font-semibold' 
                          : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${
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
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, item.id) : closeMobileMenu}
                className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                  (siteMode === 'onepage' && activeSection === item.id) 
                    ? 'text-primary dark:text-accent font-medium' 
                    : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className={`mt-16 transition-all duration-700 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Link
              href={siteMode === 'multipage' ? '/kontakt' : '#kontakt'}
              onClick={siteMode === 'onepage' ? (e) => handleSmoothScroll(e, 'kontakt') : closeMobileMenu}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-accent rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-primary/30"
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