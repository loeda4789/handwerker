'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutConfig, useFeaturesConfig, useHeroConfig, useSiteVariant } from '@/contexts/AppConfigContext';
import MobileNavigationFactory from './MobileNavigationFactory';
import { ContentData } from '@/types/content';
import { getNavigationItems, addUrlParamsToHref } from '@/lib/config/navigationConfig';
import HeaderLogo from './HeaderLogo';
import HeaderCta from './HeaderCta';

interface HeaderRoundedProps {
  content: ContentData;
}

export default function HeaderRounded({ content }: HeaderRoundedProps) {
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
  const { mode: siteMode, mobileType } = useLayoutConfig();
  const { features } = useFeaturesConfig();
  const { siteVariant } = useSiteVariant();
  const { type: heroType } = useHeroConfig();
  
  // Text-Formatierung basierend auf Variante
  const isStarter = siteVariant === 'starter';
  const navTextClass = isStarter ? 'uppercase' : 'normal-case';

  // Navigation Items
  const navItems = getNavigationItems(siteMode, content, addUrlParamsToHref, heroType, siteVariant);

  // Funktion um zu prüfen ob ein Link aktiv ist
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Scroll-Handler mit Auto-Hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 50;
      setIsScrolled(scrolled);
      
      // Auto-Hide Logic: Verstecke beim Scrollen nach unten, zeige beim Scrollen nach oben
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setHeaderVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
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

  return (
    <header 
      className={`fixed w-full top-0 z-[60] transition-all duration-500 ${
        headerVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-8 py-2">
          {/* Logo */}
          <HeaderLogo 
            logoStyle={isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}
            companyName={content.company.name}
          />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-xl transition-all duration-300 border-2 border-white/30 shadow-lg backdrop-blur-sm"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Menü"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center">
              <span className={`absolute block h-1.5 w-6 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}></span>
              <span className={`absolute block h-1.5 w-6 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute block h-1.5 w-6 bg-white rounded-full transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
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
                      <span className={`cursor-pointer flex items-center text-white hover:text-gray-200 text-sm font-medium transition-all duration-300 py-2 px-5 rounded-lg hover:bg-white/10 relative overflow-hidden ${navTextClass}`}>
                        <span className="relative z-10">{item.label}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ml-2 transition-all duration-300 ${
                            desktopDropdown === item.id ? 'rotate-180 text-gray-200' : ''
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
                                  : 'border-l-transparent text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent hover:border-l-primary hover:bg-primary/5'
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
                    className={`text-white hover:text-gray-200 text-sm font-medium flex items-center gap-2 ${navTextClass} transition-all duration-300 py-2 px-5 rounded-lg hover:bg-white/10 relative overflow-hidden`}
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
              ctaStyle="text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden flex items-center gap-2 transform hover:scale-105"
              ctaStyleDynamic={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-xl)',
                padding: '0.75rem 1.5rem'
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
