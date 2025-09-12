'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutConfig, useFeaturesConfig, useHeroConfig, useSiteVariant } from '@/contexts/AppConfigContext';
import { ContentData } from '@/types/content';
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig';
import { getHeaderStyles, getDropdownStyles } from '@/lib/config/headerStyles';
import HeaderLogo from './HeaderLogo';
import HeaderCta from './HeaderCta';
import MobileNavigationFactory from './MobileNavigationFactory';

interface HeaderStandardProps {
  content: ContentData;
}

export default function HeaderStandard({ content }: HeaderStandardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Context hooks
  const { mode: siteMode, design: designStyle, mobileType } = useLayoutConfig();
  const { features } = useFeaturesConfig();
  const { siteVariant } = useSiteVariant();
  const { type: heroType } = useHeroConfig();
  
  // Text-Formatierung basierend auf Variante
  const isStarter = siteVariant === 'starter';
  const navTextClass = isStarter ? 'uppercase' : 'normal-case';

  // Navigation Items
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, siteVariant);

  // Header-Stile basierend auf Design-Stil
  const headerStyles = getHeaderStyles(designStyle, isScrolled, headerVisible);
  const dropdownStyles = getDropdownStyles(designStyle, isScrolled);

  // Funktion um zu prüfen ob ein Link aktiv ist
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Scroll-Handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;
      setIsScrolled(scrolled);
      
      // Header visibility logic basierend auf Design-Stil
      if (designStyle === 'rounded') {
        // Bei rounded: Einblenden wenn nach oben gescrollt wird oder am Anfang der Seite
        if (currentScrollY < lastScrollY || currentScrollY < 100) {
          setHeaderVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setHeaderVisible(false);
        }
      } else {
        // Bei anderen Styles: Immer sichtbar
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [designStyle, lastScrollY]);

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

  // Cleanup
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

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  // Desktop Dropdown Handlers
  const handleDesktopMouseEnter = (itemId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setDesktopDropdown(itemId);
  };

  const handleDesktopMouseLeave = (itemId: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null);
    }, 150);
  };

  // Smooth scroll handler
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-16 h-16 flex items-center justify-center text-text dark:text-light hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 shadow-lg"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menü"
            >
              <div className="relative w-8 h-7 flex flex-col justify-center">
                <span className={`absolute block h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}></span>
                <span className={`absolute block h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}></span>
              </div>
            </button>

            {/* Desktop Navigation - Zentriert mit mehr Platz */}
            <div className="flex-1 flex justify-center">
              <nav className="hidden md:flex items-center space-x-6 relative">
                {navItems.map((item) => (
                  <div key={item.id} className="relative group">
                    {item.hasDropdown ? (
                      <>
                        <div
                          className="relative"
                          onMouseEnter={() => handleDesktopMouseEnter(item.id)}
                          onMouseLeave={() => handleDesktopMouseLeave(item.id)}
                        >
                          <span className={`${headerStyles.textColor} cursor-pointer flex items-center ${navTextClass} text-sm font-medium transition-all duration-300 py-1 px-5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 relative overflow-hidden`}>
                            <span className="relative z-10">{item.label}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-4 w-4 ml-2 transition-all duration-300 ${
                                desktopDropdown === item.id ? 'rotate-180' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                          <div
                            ref={(el) => { dropdownRef.current[item.id] = el }}
                            className={`${dropdownStyles.container} ${
                              desktopDropdown === item.id 
                                ? 'opacity-100 scale-100 translate-y-0' 
                                : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}
                            style={dropdownStyles.containerStyle}
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                          >
                            <div className="py-2">
                              {item.dropdownItems?.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.href}
                                  href={dropdownItem.href || '#'}
                                  className={`${dropdownStyles.item} ${navTextClass} ${
                                    isActive(dropdownItem.href || '')
                                      ? 'border-l-primary text-primary bg-primary/5' 
                                      : ''
                                  }`}
                                  style={isActive(dropdownItem.href || '') ? dropdownStyles.itemHoverStyle : {}}
                                  onClick={dropdownItem.href?.startsWith('#') ? (e) => handleSmoothScroll(e, dropdownItem.href!.substring(1)) : undefined}
                                >
                                  <span className="relative z-10">{dropdownItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link 
                        href={item.href || '#'}
                        className={`${headerStyles.textColor} text-sm font-medium flex items-center gap-2 ${navTextClass} transition-all duration-300 py-1 px-5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 relative overflow-hidden`}
                        onClick={item.href?.startsWith('#') ? (e) => handleSmoothScroll(e, item.href!.substring(1)) : undefined}
                      >
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <HeaderCta 
                ctaStyle={headerStyles.ctaStyle}
                ctaStyleDynamic={headerStyles.ctaStyleDynamic}
                ctaHoverStyle={headerStyles.ctaHoverStyle}
              />
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu - Standard Overlay */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div 
            className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 transform transition-all duration-500 ease-out z-50 shadow-2xl"
            style={{
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)'
            }}
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Menü</span>
              <button
                onClick={closeMenu}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="w-full flex items-center justify-between py-3 text-left text-gray-900 dark:text-white"
                      >
                        <span className={`text-lg font-medium ${navTextClass}`}>{item.label}</span>
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-300 ${
                            openDropdown === item.id ? 'rotate-180' : ''
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
                          openDropdown === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="pl-4 py-2 space-y-2">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href || '#'}
                              className={`block py-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors ${navTextClass}`}
                              onClick={(e) => {
                                if (dropdownItem.href?.startsWith('#')) {
                                  handleSmoothScroll(e, dropdownItem.href.substring(1));
                                }
                                closeMenu();
                              }}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || '#'}
                      className={`block py-3 text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent transition-colors ${navTextClass}`}
                      onClick={(e) => {
                        if (item.href?.startsWith('#')) {
                          handleSmoothScroll(e, item.href.substring(1));
                        }
                        closeMenu();
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <HeaderCta 
                  ctaStyle="block w-full py-4 px-6 text-center bg-primary text-white text-lg font-bold rounded-xl hover:bg-primary/90 transition-colors uppercase flex items-center justify-center gap-2"
                  ctaStyleDynamic={{
                    backgroundColor: 'var(--color-primary)',
                    borderColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1rem 1.5rem'
                  }}
                  ctaHoverStyle={{
                    backgroundColor: 'var(--color-secondary)',
                    borderColor: 'var(--color-secondary)',
                    color: 'white'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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
