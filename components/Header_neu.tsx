'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  
  // Refs für bessere Hover-Kontrolle
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Funktion um zu prüfen ob ein Link aktiv ist
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Verhindere Scrollen wenn Menü offen ist
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Cleanup auf Unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  // Desktop Dropdown-Kontrolle mit Verzögerung
  const handleDesktopMouseEnter = (dropdownName: string) => {
    // Lösche eventuell laufenden Timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Kurze Verzögerung vor dem Öffnen (200ms)
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(dropdownName);
    }, 200);
  };

  const handleDesktopMouseLeave = (dropdownName: string) => {
    // Lösche Öffnungs-Timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Verzögerung vor dem Schließen (300ms)
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 300);
  };

  // Für das Dropdown selbst - Verhindere Schließen beim Hovern über das Dropdown
  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 200);
  };

  return (
    <header className="bg-brand-primary dark:bg-gray-900 shadow-sm py-4 fixed w-full top-0 z-[60] border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-brand-text-dark dark:text-gray-200">
            NordQuartier
          </Link>

          {/* Optimierter Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 flex items-center justify-center text-brand-text-dark dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl mobile-nav-animation"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menü"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-7 h-6 flex flex-col justify-center">
              <span className={`absolute block h-1 bg-current rounded-full mobile-nav-animation ${
                isMenuOpen 
                  ? 'rotate-45 top-2.5 w-7' 
                  : 'top-1 w-7'
              }`} style={{ willChange: 'transform, opacity' }}></span>
              <span className={`absolute block h-1 bg-current rounded-full mobile-nav-animation ${
                isMenuOpen 
                  ? 'opacity-0 scale-0 top-2.5 w-7' 
                  : 'opacity-100 scale-100 top-2.5 w-5'
              }`} style={{ willChange: 'transform, opacity' }}></span>
              <span className={`absolute block h-1 bg-current rounded-full mobile-nav-animation ${
                isMenuOpen 
                  ? '-rotate-45 top-2.5 w-7' 
                  : 'top-4 w-6'
              }`} style={{ willChange: 'transform, opacity' }}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {/* Urlaubsquartiere Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleDesktopMouseEnter('urlaubsquartiere')}
              onMouseLeave={() => handleDesktopMouseLeave('urlaubsquartiere')}
            >
              <span className="nav-link cursor-pointer flex items-center uppercase font-medium text-brand-text-dark dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden">
                <span className="relative z-10">Urlaubsquartiere</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-all duration-300 ${
                    desktopDropdown === 'urlaubsquartiere' ? 'rotate-180 text-brand-accent' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {/* Sliding indicator */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"></div>
              </span>
              <div 
                ref={(el) => { dropdownRef.current['urlaubsquartiere'] = el }}
                className={`absolute left-0 mt-3 w-auto min-w-[240px] rounded-xl shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 ease-out origin-top-left z-50 ${
                  desktopDropdown === 'urlaubsquartiere' 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="py-2">
                  <Link
                    href="/urlaubsquartier/appartements"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/urlaubsquartier/appartements')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Appartements</span>
                  </Link>
                  <Link
                    href="/urlaubsquartier/ferienwohnung"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/urlaubsquartier/ferienwohnung')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Ferienwohnungen</span>
                  </Link>
                  <Link
                    href="/urlaubsquartier/premium_ferienwohnung"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/urlaubsquartier/premium_ferienwohnung')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Premium-<wbr />Ferienwohnungen</span>
                  </Link>
                  <Link
                    href="/urlaubsquartier/galerie"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/urlaubsquartier/galerie')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Galerie</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Service Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleDesktopMouseEnter('service')}
              onMouseLeave={() => handleDesktopMouseLeave('service')}
            >
              <span className="nav-link cursor-pointer flex items-center uppercase font-medium text-brand-text-dark dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden">
                <span className="relative z-10">Service</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-all duration-300 ${
                    desktopDropdown === 'service' ? 'rotate-180 text-brand-accent' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {/* Sliding indicator */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"></div>
              </span>
              <div 
                ref={(el) => { dropdownRef.current['service'] = el }}
                className={`absolute left-0 mt-3 w-auto min-w-[200px] rounded-xl shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 ease-out origin-top-left z-50 ${
                  desktopDropdown === 'service' 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="py-2">
                  <Link
                    href="/service/serviceleistungen"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/service/serviceleistungen')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Service<wbr />leistungen</span>
                  </Link>
                  <Link
                    href="/service/faqs"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/service/faqs')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">FAQs</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Entdecken Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => handleDesktopMouseEnter('entdecken')}
              onMouseLeave={() => handleDesktopMouseLeave('entdecken')}
            >
              <span className="nav-link cursor-pointer flex items-center uppercase font-medium text-brand-text-dark dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden">
                <span className="relative z-10">Entdecken</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-2 transition-all duration-300 ${
                    desktopDropdown === 'entdecken' ? 'rotate-180 text-brand-accent' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                {/* Sliding indicator */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-accent to-brand-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"></div>
              </span>
              <div 
                ref={(el) => { dropdownRef.current['entdecken'] = el }}
                className={`absolute left-0 mt-3 w-auto min-w-[220px] rounded-xl shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 ease-out origin-top-left z-50 ${
                  desktopDropdown === 'entdecken' 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="py-2">
                  <Link
                    href="/entdecken/inselmomente"
                    className={`group flex items-center px-4 py-3 text-sm font-medium uppercase transition-all duration-200 mx-2 relative border-l-4 ${
                      isActive('/entdecken/inselmomente')
                        ? 'border-l-brand-accent text-brand-accent bg-brand-accent/5' 
                        : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-brand-accent dark:hover:text-brand-accent hover:border-l-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    <span className="relative z-10">Inselmomente</span>
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/last-minute" 
              className="group text-brand-text-dark dark:text-gray-300 pl-4 hover:text-brand-accent dark:hover:text-brand-accent font-medium flex items-center gap-2 uppercase transition-all duration-300 py-2 px-3 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden"
            >
              <span className="relative z-10">ANGEBOTE</span>
              <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-1.5 py-0.5 rounded-full font-bold animate-pulse relative z-10">%</span>
              {/* Sliding indicator */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-accent to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full"></div>
            </Link>
            <Link 
              href="/kontakt" 
              className="group bg-brand-accent hover:bg-brand-text-dark text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex items-center gap-2 transform hover:scale-105"
            >
              <svg className="w-4 h-4 flex-shrink-0 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="relative z-10 uppercase">Buchung<wbr /> anfragen</span>
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-text-dark to-brand-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>
          </nav>

          {/* Enhanced Mobile Navigation */}
          <div
            className={`fixed inset-0 z-[999999] md:hidden transition-all duration-500 ease-in-out ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            {/* Overlay */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-500 ease-in-out ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <div 
              className={`absolute inset-0 bg-white dark:bg-gray-900 transform transition-all duration-500 ease-out flex flex-col ${
                isMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-full scale-95'
              }`}
            >
              {/* Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100 uppercase">Menü</span>
                <button
                  onClick={closeMenu}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                >
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-3">
                  {/* Urlaubsquartiere */}
                  <div>
                    <button
                      onClick={() => toggleDropdown('urlaubsquartiere')}
                      className="w-full flex items-center justify-between py-2 text-left text-gray-900 dark:text-gray-100"
                    >
                      <span className="text-2xl font-bold uppercase">Urlaubsquartiere</span>
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-300 ${
                          openDropdown === 'urlaubsquartiere' ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === 'urlaubsquartiere' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-6 py-3 space-y-4">
                        <Link
                          href="/urlaubsquartier/appartements"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Appartements
                        </Link>
                        <Link
                          href="/urlaubsquartier/ferienwohnung"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Ferienwohnungen
                        </Link>
                        <Link
                          href="/urlaubsquartier/premium_ferienwohnung"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Premium-Ferienwohnungen
                        </Link>
                        <Link
                          href="/urlaubsquartier/galerie"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Galerie
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                    <button
                      onClick={() => toggleDropdown('service')}
                      className="w-full flex items-center justify-between py-2 text-left text-gray-900 dark:text-gray-100"
                    >
                      <span className="text-2xl font-bold uppercase">Service</span>
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-300 ${
                          openDropdown === 'service' ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === 'service' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-6 py-3 space-y-4">
                        <Link
                          href="/service/serviceleistungen"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Serviceleistungen
                        </Link>
                        <Link
                          href="/service/faqs"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          FAQs
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Entdecken */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                    <button
                      onClick={() => toggleDropdown('entdecken')}
                      className="w-full flex items-center justify-between py-2 text-left text-gray-900 dark:text-gray-100"
                    >
                      <span className="text-2xl font-bold uppercase">Entdecken</span>
                      <svg
                        className={`w-6 h-6 transform transition-transform duration-300 ${
                          openDropdown === 'entdecken' ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === 'entdecken' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-6 py-3 space-y-4">
                        <Link
                          href="/entdecken/inselmomente"
                          className="block text-gray-600 dark:text-gray-400 hover:text-brand-accent text-lg font-medium uppercase"
                          onClick={closeMenu}
                        >
                          Inselmomente
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Last Minute zu Angebote umbenennen */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-2">
                    <Link
                      href="/last-minute"
                      className="block py-2 text-2xl font-bold text-gray-900 dark:text-gray-100 uppercase flex items-center gap-2"
                      onClick={closeMenu}
                    >
                      <span>Angebote</span>
                      <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full font-bold">%</span>
                    </Link>
                  </div>

                  {/* Buchung anfragen Button */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-16 pb-12">
                    <Link
                      href="/kontakt"
                      className="block w-full py-4 px-6 text-center bg-gray-900 dark:bg-gray-800 text-white text-xl font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors uppercase flex items-center justify-center gap-2"
                      onClick={closeMenu}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Buchung anfragen
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// In styles/globals.css sollte der folgende Code sein:
// .nav-link {
//   @apply text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors duration-200;
// } 