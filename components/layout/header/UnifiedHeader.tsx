'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutConfig, useFeaturesConfig, useHeroConfig, useSiteVariant, useStyleConfig } from '@/contexts/AppConfigContext';
import { UNIFIED_STYLES } from '@/lib/config/unifiedStyles';
import MobileNavigationFactory from './MobileNavigationFactory';
import { ContentData } from '@/types/content';
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig';
import HeaderLogo from './HeaderLogo';
import HeaderCta from './HeaderCta';

interface UnifiedHeaderProps {
  content: ContentData;
}

export default function UnifiedHeader({ content }: UnifiedHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Context hooks
  const { mode: siteMode, mobileType } = useLayoutConfig();
  const { features } = useFeaturesConfig();
  const { siteVariant } = useSiteVariant();
  const { type: heroType } = useHeroConfig();
  const { package: stylePackage } = useStyleConfig();
  
  // Text-Formatierung basierend auf Variante
  const isStarter = siteVariant === 'starter';
  const navTextClass = isStarter ? 'uppercase' : 'normal-case'; // Starter verwendet Großschrift

  // Navigation Items
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, siteVariant);

  // Funktion um zu prüfen ob ein Link aktiv ist
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Scroll-Handler mit Up/Down Detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;
      const scrollingUp = currentScrollY < lastScrollY;
      
      setIsScrolled(scrolled);
      setIsScrollingUp(scrollingUp);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Intelligente Header-Styling basierend auf Stil und Hintergrund
  const getHeaderStyles = () => {
    const isHomepage = pathname === '/';
    const currentStyle = UNIFIED_STYLES.find(style => style.id === (stylePackage as any)) || UNIFIED_STYLES[0];
    const headerVariant = currentStyle.config.design.headerVariant;
    
    // Intelligente Transparenz basierend auf Hero-Typ
    const shouldUseTransparency = isHomepage && (heroType === 'single' || heroType === 'slider');
    
    if (headerVariant === 'classic') {
      // Klassischer Header: Immer sichtbar, nie transparent
      if (!isScrollingUp && isScrolled) {
        return {
          transform: 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          opacity: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          color: 'black'
        };
      }
      
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        color: 'black'
      };
    } else if (headerVariant === 'modern') {
      // Moderner Header: Intelligente Transparenz
      if (!isScrollingUp && isScrolled) {
        return {
          transform: 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          opacity: 0
        };
      }
      
      if (isScrolled) {
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          color: 'black'
        };
      }
      
      if (shouldUseTransparency) {
        return {
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white'
        };
      } else {
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          color: 'black'
        };
      }
    } else {
      // Floating Header: Immer transparent mit intelligentem Kontrast
      if (!isScrollingUp && isScrolled) {
        return {
          transform: 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          opacity: 0
        };
      }
      
      if (isScrolled) {
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'rgba(0, 0, 0, 0.1)',
          color: 'black'
        };
      }
      
      return {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        color: 'white'
      };
    }
  };

  const headerStyles = getHeaderStyles();
  const isHomepage = pathname === '/';
  const currentStyle = UNIFIED_STYLES.find(style => style.id === (stylePackage as any)) || UNIFIED_STYLES[0];
  const headerVariant = currentStyle.config.design.headerVariant;
  
  // Intelligente Text-Farben basierend auf Header-Variante
  const getTextColors = () => {
    if (headerVariant === 'classic') {
      return {
        textColor: 'text-gray-900',
        hoverColor: 'hover:text-gray-600'
      };
    } else if (headerVariant === 'modern') {
      const shouldUseTransparency = isHomepage && (heroType === 'single' || heroType === 'slider');
      if (isScrolled || !shouldUseTransparency) {
        return {
          textColor: 'text-gray-900',
          hoverColor: 'hover:text-gray-600'
        };
      } else {
        return {
          textColor: 'text-white',
          hoverColor: 'hover:text-gray-200'
        };
      }
    } else {
      // Floating
      if (isScrolled) {
        return {
          textColor: 'text-gray-900',
          hoverColor: 'hover:text-gray-600'
        };
      } else {
        return {
          textColor: 'text-white',
          hoverColor: 'hover:text-gray-200'
        };
      }
    }
  };
  
  const { textColor, hoverColor } = getTextColors();

  // Header-Container-Klassen basierend auf Variante
  const getHeaderContainerClasses = () => {
    if (headerVariant === 'classic') {
      return 'fixed top-0 left-0 z-50 w-full transition-all duration-300';
    } else if (headerVariant === 'modern') {
      return 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-8 transform -translate-x-1/2 transition-all duration-300';
    } else {
      // Floating
      return 'fixed top-4 left-1/2 z-50 w-full max-w-5xl px-8 transform -translate-x-1/2 transition-all duration-300';
    }
  };

  const getHeaderInnerClasses = () => {
    if (headerVariant === 'classic') {
      return 'shadow-lg border-b';
    } else if (headerVariant === 'modern') {
      return 'shadow-2xl border rounded-3xl';
    } else {
      // Floating
      return 'shadow-2xl border rounded-full';
    }
  };

  return (
    <header 
      className={getHeaderContainerClasses()}
    >
      <div 
        className={getHeaderInnerClasses()}
        style={headerStyles}
      >
        <div className={`flex justify-between items-center ${
          headerVariant === 'classic' ? 'px-4 py-4' : 'px-12 py-2'
        }`}>
          {/* Logo */}
          <HeaderLogo 
            logoStyle={textColor}
            companyName={content.company.name}
          />

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden w-12 h-12 flex items-center justify-center ${textColor} hover:bg-black/10 rounded-2xl transition-all duration-300`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menü"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
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
                      <span className={`cursor-pointer flex items-center ${textColor} ${hoverColor} transition-all duration-300 py-2 px-4 rounded-2xl hover:bg-black/10 relative overflow-hidden ${navTextClass}`}>
                        <span className="relative z-10">{item.label}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-2 transition-all duration-300 ${
                            desktopDropdown === item.id ? 'rotate-180 text-gray-600' : ''
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
                        className={`absolute left-0 mt-3 w-auto min-w-[240px] rounded-2xl shadow-2xl bg-white border border-gray-200 transform transition-all duration-300 ease-out origin-top-left z-50 ${
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
                                  ? 'border-l-gray-900 text-gray-900 bg-gray-50' 
                                  : 'border-l-transparent text-gray-700 hover:text-gray-900 hover:border-l-gray-900 hover:bg-gray-50'
                              }`}
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
                    className={`${textColor} ${hoverColor} font-medium flex items-center gap-2 ${navTextClass} transition-all duration-300 py-2 px-4 rounded-2xl hover:bg-black/10 relative overflow-hidden`}
                    onClick={item.href?.startsWith('#') ? (e) => handleSmoothScroll(e, item.href!.substring(1)) : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <HeaderCta 
              ctaStyle={`font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex items-center gap-2 transform hover:scale-105`}
              ctaStyleDynamic={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-secondary)',
                color: 'white',
                borderRadius: 'var(--radius-button)',
                padding: '0.75rem 1.5rem'
              }}
              ctaHoverStyle={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                color: 'white'
              }}
            />
          </div>
        </div>
      </div>

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
    </header>
  );
}
