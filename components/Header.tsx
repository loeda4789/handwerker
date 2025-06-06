'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ContentData } from '@/types/content'
import { useTheme } from '@/contexts/ThemeContext'

interface HeaderProps {
  content: ContentData
}

export default function Header({ content }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Safe theme access with fallback for SSR
  let theme = 'light'
  let toggleTheme = () => {}
  let isDark = false
  
  try {
    const themeContext = useTheme()
    theme = themeContext.theme
    toggleTheme = themeContext.toggleTheme
    isDark = themeContext.isDark
  } catch (error) {
    // Fallback during SSR
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll detection for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['ueber-uns', 'leistungen', 'team', 'bewertungen']
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
  }, [])

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

  // Smooth scrolling
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
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
              {/* Dark Mode Toggle */}
              {mounted && (
              <button
                type="button"
                onClick={toggleTheme}
                className="relative text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2 transition-all duration-300 hover:scale-110 z-50"
                aria-label="Theme umschalten"
              >
                <div className="relative w-5 h-5">
                  {/* Sun Icon */}
                  <svg 
                    className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                      isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                  
                  {/* Moon Icon */}
                  <svg 
                    className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                      isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                </div>
              </button>
              )}

              {/* Desktop CTA Button */}
              <Link
                href="#kontakt"
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
                <li>
                  <Link
                    href="#ueber-uns"
                    onClick={(e) => handleSmoothScroll(e, 'ueber-uns')}
                    className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                      activeSection === 'ueber-uns' 
                        ? 'text-primary dark:text-accent font-semibold' 
                        : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    {content.about.title}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#leistungen"
                    onClick={(e) => handleSmoothScroll(e, 'leistungen')}
                    className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                      activeSection === 'leistungen' 
                        ? 'text-primary dark:text-accent font-semibold' 
                        : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    Leistungen
                  </Link>
                </li>
                <li>
                  <Link
                    href="#team"
                    onClick={(e) => handleSmoothScroll(e, 'team')}
                    className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                      activeSection === 'team' 
                        ? 'text-primary dark:text-accent font-semibold' 
                        : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="#bewertungen"
                    onClick={(e) => handleSmoothScroll(e, 'bewertungen')}
                    className={`block py-2 px-3 lg:p-0 lg:hover:text-primary uppercase transition-colors duration-300 ${
                      activeSection === 'bewertungen' 
                        ? 'text-primary dark:text-accent font-semibold' 
                        : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                    }`}
                  >
                    Bewertungen
                  </Link>
                </li>
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
            <Link
              href="#ueber-uns"
              onClick={(e) => handleSmoothScroll(e, 'ueber-uns')}
              className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                activeSection === 'ueber-uns' 
                  ? 'text-primary dark:text-accent font-medium' 
                  : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
              }`}
            >
              {content.about.title}
            </Link>
            
            <Link
              href="#leistungen"
              onClick={(e) => handleSmoothScroll(e, 'leistungen')}
              className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                activeSection === 'leistungen' 
                  ? 'text-primary dark:text-accent font-medium' 
                  : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
              }`}
            >
              Leistungen
            </Link>
            
            <Link
              href="#team"
              onClick={(e) => handleSmoothScroll(e, 'team')}
              className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                activeSection === 'team' 
                  ? 'text-primary dark:text-accent font-medium' 
                  : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
              }`}
            >
              Team
            </Link>
            
            <Link
              href="#bewertungen"
              onClick={(e) => handleSmoothScroll(e, 'bewertungen')}
              className={`block text-4xl font-light tracking-wide transition-all duration-300 hover:scale-110 ${
                activeSection === 'bewertungen' 
                  ? 'text-primary dark:text-accent font-medium' 
                  : 'text-text dark:text-light hover:text-primary dark:hover:text-accent'
              }`}
            >
              Bewertungen
            </Link>
          </nav>
          
          {/* CTA Button */}
          <div className={`mt-16 transition-all duration-700 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <Link
              href="#kontakt"
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-primary to-accent rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-primary/30"
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