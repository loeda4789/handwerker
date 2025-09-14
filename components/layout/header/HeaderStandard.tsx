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
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Context hooks
  const { mode: siteMode, design: designStyle, mobileType } = useLayoutConfig();
  const { features } = useFeaturesConfig();
  const { siteVariant } = useSiteVariant();
  const { type: heroType } = useHeroConfig();
  
  // Text-Formatierung basierend auf Variante
  const navTextClass = siteVariant === 'starter' ? 'uppercase' : 'normal-case';
  
  const pathname = usePathname();
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, siteVariant);
  
  // Header-Styles basierend auf Design und Hero-Type
  const headerStyles = getHeaderStyles(designStyle, false, headerVisible);
  const dropdownStyles = getDropdownStyles(designStyle, false);

  // Aktive Navigation ermitteln
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Scroll-Handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (designStyle === 'modern' || designStyle === 'rounded') {
        // Bei modern/rounded: Header bei Scroll nach oben einblenden, nach unten ausblenden
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
  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
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
              className="md:hidden w-12 h-12 flex items-center justify-center text-text dark:text-light hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-600 shadow-lg"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Menü"
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

            {/* CTA Button */}
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