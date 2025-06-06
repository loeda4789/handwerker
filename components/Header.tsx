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
      const sections = ['ueber-uns', 'leistungen', 'team', 'bewertungen', 'kontakt']
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

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/98 backdrop-blur-md border-b border-border shadow-lg dark:bg-dark-secondary/98 dark:border-gray-600' 
        : 'bg-background/95 backdrop-blur-sm border-b border-border dark:bg-dark-secondary/95 dark:border-gray-600'
    }`}>
      <nav className="px-4 py-2.5 mx-auto max-w-screen-xl">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
              className="relative text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-2 transition-all duration-300 hover:scale-110"
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

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden hover:bg-light focus:outline-none focus:ring-2 focus:ring-primary/20 dark:hover:bg-dark dark:focus:ring-light/20"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Menü öffnen</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full items-center justify-between lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="#ueber-uns"
                  onClick={(e) => handleSmoothScroll(e, 'ueber-uns')}
                  className={`block py-2 pr-4 pl-3 border-b border-border lg:border-0 lg:p-0 lg:hover:text-primary dark:border-light/10 uppercase transition-colors duration-300 ${
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
                  className={`block py-2 pr-4 pl-3 border-b border-border lg:border-0 lg:p-0 lg:hover:text-primary dark:border-light/10 uppercase transition-colors duration-300 ${
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
                  href="#leistungen"
                  onClick={(e) => handleSmoothScroll(e, 'leistungen')}
                  className={`block py-2 pr-4 pl-3 border-b border-border lg:border-0 lg:p-0 lg:hover:text-primary dark:border-light/10 uppercase transition-colors duration-300 ${
                    activeSection === 'leistungen' 
                      ? 'text-primary dark:text-accent font-semibold' 
                      : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  Referenzen
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  onClick={(e) => handleSmoothScroll(e, 'team')}
                  className={`block py-2 pr-4 pl-3 border-b border-border lg:border-0 lg:p-0 lg:hover:text-primary dark:border-light/10 uppercase transition-colors duration-300 ${
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
                  className={`block py-2 pr-4 pl-3 border-b border-border lg:border-0 lg:p-0 lg:hover:text-primary dark:border-light/10 uppercase transition-colors duration-300 ${
                    activeSection === 'bewertungen' 
                      ? 'text-primary dark:text-accent font-semibold' 
                      : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  Bewertungen
                </Link>
              </li>
              <li>
                <Link
                  href="#kontakt"
                  onClick={(e) => handleSmoothScroll(e, 'kontakt')}
                  className={`block py-2 pr-4 pl-3 lg:border-0 lg:p-0 uppercase transition-colors duration-300 ${
                    activeSection === 'kontakt' 
                      ? 'text-primary dark:text-accent font-semibold' 
                      : 'text-text dark:text-light hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  Kontakt
                </Link>
              </li>
              {/* Mobile CTA Button */}
              <li className="lg:hidden mt-2">
                <Link
                  href="#kontakt"
                  className="inline-flex items-center justify-center w-full px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-accent focus:ring-4 focus:ring-primary/30 dark:bg-primary dark:hover:bg-accent/90 uppercase"
                >
                  Jetzt Termin vereinbaren
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
} 