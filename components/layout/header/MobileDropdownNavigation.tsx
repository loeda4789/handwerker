'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { ContentData } from '@/types/content';
import { NavigationItem } from '@/lib/config/navigationConfig';
import HeaderCta from './HeaderCta';

interface MobileDropdownNavigationProps {
  isOpen: boolean;
  navItems: NavigationItem[];
  content: ContentData;
  siteMode: 'onepage' | 'multipage';
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onClose: () => void;
}

function MobileDropdownNavigation({
  isOpen,
  navItems,
  content,
  siteMode,
  onSmoothScroll,
  onClose
}: MobileDropdownNavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Memoized navigation items processing
  const processedNavItems = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      animationDelay: `${index * 30}ms`
    }))
  }, [navItems]);

  // Animation handling
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Focus management
      const firstButton = menuRef.current?.querySelector('button, a') as HTMLElement;
      firstButton?.focus();
    } else {
      setIsVisible(false);
      setOpenDropdown(null);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const toggleDropdown = useCallback((itemId: string) => {
    setOpenDropdown(prev => prev === itemId ? null : itemId);
  }, []);

  const handleItemClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      onSmoothScroll(e, href.substring(1));
    }
    onClose();
  }, [onSmoothScroll, onClose]);

  if (!isOpen) return null;

  // Portal für vollflächige Navigation direkt in document.body
  const dropdownNavigation = (
    <div className="md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dropdown Menu */}
      <div 
        ref={menuRef}
        className={`fixed top-16 left-4 right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-[99999] transform transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
        }`}
        style={{
          maxHeight: 'calc(100vh - 6rem)',
          overflowY: 'auto'
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {/* Menu Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menü</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            style={{ borderRadius: 'var(--radius-button)' }}
            aria-label="Menü schließen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-2">
          {/* Startseite Link */}
          <div className="animate-in fade-in-up duration-300" style={{ animationDelay: '50ms', animationFillMode: 'both' }}>
            <Link
              href="/"
              className="block py-3 px-3 text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              Startseite
            </Link>
          </div>
          
          {processedNavItems.map((item) => (
            <div key={item.id}>
              {item.hasDropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.id)}
                    className="w-full flex items-center justify-between py-3 px-3 text-left text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    style={{ borderRadius: 'var(--radius-button)' }}
                    aria-expanded={openDropdown === item.id}
                    aria-controls={`dropdown-${item.id}`}
                  >
                    <span className="text-lg font-medium">{item.label}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${
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
                    id={`dropdown-${item.id}`}
                    className={`overflow-hidden transition-all duration-200 ${
                      openDropdown === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 py-2 space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href || '#'}
                          className="block py-2 px-3 text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                          style={{ borderRadius: 'var(--radius-button)' }}
                          onClick={(e) => handleItemClick(e, dropdownItem.href || '')}
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
                  className="block py-3 px-3 text-lg font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              style={{ borderRadius: 'var(--radius-button)' }}
                  onClick={(e) => handleItemClick(e, item.href || '')}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <HeaderCta 
              ctaStyle="block w-full py-3 px-4 text-center bg-primary text-white text-base font-bold hover:bg-primary/90 transition-colors uppercase flex items-center justify-center gap-2"
              ctaStyleDynamic={{
                backgroundColor: 'var(--color-primary)',
                borderColor: 'var(--color-primary)',
                borderRadius: 'var(--radius-button)',
                padding: '0.75rem 1rem'
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
  );

  // Portal direkt in document.body rendern
  return createPortal(dropdownNavigation, document.body);
}

export default React.memo(MobileDropdownNavigation);
