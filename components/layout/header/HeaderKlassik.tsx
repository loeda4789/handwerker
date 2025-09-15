'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppConfig } from '@/contexts/AppConfigContext';
import { useLayoutConfig } from '@/contexts/AppConfigContext';
import { useThemeConfig } from '@/contexts/AppConfigContext';
import { useFeaturesConfig } from '@/contexts/AppConfigContext';
import { useHeroConfig } from '@/contexts/AppConfigContext';
import { useSiteVariant } from '@/contexts/AppConfigContext';
import { useHeadingsConfig } from '@/contexts/AppConfigContext';
import { useStyleConfig } from '@/contexts/AppConfigContext';
import { ContentData } from '@/types/content';
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig';
import { getHeaderStyles } from '@/lib/config/headerStyles';
import HeaderLogo from './HeaderLogo';
import HeaderCta from './HeaderCta';
import MobileNavigationFactory from './MobileNavigationFactory';

interface HeaderKlassikProps {
  content: ContentData;
}

export default function HeaderKlassik({ content }: HeaderKlassikProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  // Refs für bessere Hover-Kontrolle
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Context hooks
  const { mode: siteMode, design: designStyle, mobileType } = useLayoutConfig();
  const { features } = useFeaturesConfig();
  const { siteVariant } = useSiteVariant();
  const { type: heroType } = useHeroConfig();
  const { style: headingStyle } = useHeadingsConfig();
  const { package: stylePackage } = useStyleConfig();
  
  // Text-Formatierung basierend auf Variante
  const isStarter = siteVariant === 'starter';
  const navTextClass = 'normal-case'; // Alle Varianten verwenden normal-case

  // Navigation Items basierend auf Variante
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, siteVariant);

  // Header-Stile basierend auf Design-Stil
  const headerStyles = getHeaderStyles(designStyle, isScrolled, headerVisible);

  // Funktion um zu prüfen ob ein Link aktiv ist
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Scroll-Handler mit Auto-Hide für Klassik (optimiert)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrolled = currentScrollY > 50;
          setIsScrolled(scrolled);
          
          // Auto-Hide Logic: 
          // - Immer anzeigen wenn ganz oben (currentScrollY = 0)
          // - Anzeigen beim Hochscrollen (currentScrollY < lastScrollY)
          // - Verstecken beim Runter scrollen (currentScrollY > lastScrollY && currentScrollY > 50)
          if (currentScrollY === 0) {
            setHeaderVisible(true);
          } else if (currentScrollY < lastScrollY) {
            setHeaderVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setHeaderVisible(false);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
    setOpenDropdown(null);
  }, [isMenuOpen]);

  const toggleDropdown = useCallback((name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  }, [openDropdown]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, []);

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

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`${headerStyles.header} fixed w-full top-0 z-[60] transition-all duration-300 border-b border-gray-200 dark:border-gray-700 shadow-lg ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
      <div className="container mx-auto">
        <div className={`${headerStyles.nav} flex justify-between items-center`}>
          {/* Logo */}
          <HeaderLogo 
            logoStyle="text-black dark:text-white"
            companyName={content.company.name}
          />

          {/* Optimierter Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 flex items-center justify-center text-text dark:text-light hover:bg-black/10 dark:hover:bg-white/10 rounded-xl mobile-nav-animation border-2 border-gray-200 dark:border-gray-600 shadow-lg"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menü"
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-gray-900 dark:bg-gray-100 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                {item.hasDropdown ? (
                  <div
                    onMouseEnter={() => handleDesktopMouseEnter(item.id)}
                    onMouseLeave={() => handleDesktopMouseLeave(item.id)}
                  >
                    <span className={`nav-link cursor-pointer flex items-center ${navTextClass} text-sm font-medium text-text dark:text-light hover:text-primary dark:hover:text-accent transition-all duration-300 py-2 px-5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden sliding-indicator`}>
                      <span className="relative z-10">{item.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-2 transition-all duration-300 ${
                          desktopDropdown === item.id ? 'rotate-180 text-primary' : ''
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
                    </span>
                    <div 
                      ref={(el) => { dropdownRef.current[item.id] = el }}
                      className={`absolute left-0 mt-3 w-auto min-w-[240px] rounded-xl shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-white/20 dark:border-gray-700/50 transform transition-all duration-300 ease-out origin-top-left z-50 ${
                        desktopDropdown === item.id 
                          ? 'opacity-100 scale-100 translate-y-0' 
                          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className="py-2">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href || '#'}
                            className={`group flex items-center px-4 py-3 text-sm font-medium ${navTextClass} transition-all duration-200 mx-2 relative border-l-4 ${
                              isActive(dropdownItem.href || '')
                                ? 'border-l-primary text-primary bg-primary/5' 
                                : 'border-l-transparent text-text-secondary dark:text-light/70 hover:text-primary dark:hover:text-accent hover:border-l-primary hover:bg-primary/5'
                            }`}
                          >
                            <span className="relative z-10">{dropdownItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    href={item.href || '#'}
                    className={`group text-text dark:text-light hover:text-primary dark:hover:text-accent text-sm font-medium flex items-center gap-2 ${navTextClass} transition-all duration-300 py-2 px-5 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 relative overflow-hidden sliding-indicator`}
                    onClick={item.href?.startsWith('#') ? (e) => handleSmoothScroll(e, item.href!.substring(1)) : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <HeaderCta
              ctaStyle={headerStyles.ctaStyle}
              ctaStyleDynamic={headerStyles.ctaStyleDynamic}
              ctaHoverStyle={headerStyles.ctaHoverStyle}
              onClick={(e) => handleSmoothScroll(e, 'kontakt')}
            />
          </nav>

        </div>
      </div>

    </header>

      {/* Mobile Navigation - Außerhalb des Headers für korrekte Positionierung */}
      <MobileNavigationFactory
        isOpen={isMenuOpen}
        navItems={navItems}
        content={content}
        siteMode={siteMode}
        onSmoothScroll={handleSmoothScroll}
        onClose={closeMenu}
        mobileType={mobileType}
      />
    </>
  );
}
