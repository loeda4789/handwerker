import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { NavigationItem } from '@/lib/config/navigationConfig'
import { ContentData } from '@/types/content'
import { useSiteVariant } from '@/contexts/AppConfigContext'

interface MobileHeaderProps {
  isOpen: boolean
  navItems: NavigationItem[]
  content: ContentData
  siteMode: 'onepage' | 'multipage'
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
  onClose: () => void
}

function MobileHeader({ 
  isOpen,
  navItems, 
  content, 
  siteMode, 
  onSmoothScroll, 
  onClose 
}: MobileHeaderProps) {
  const { siteVariant } = useSiteVariant()
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const focusTrapRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const lastFocusableRef = useRef<HTMLAnchorElement>(null)

  // Memoized navigation items processing
  const processedNavItems = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      animationDelay: `${index * 100}ms`
    }))
  }, [navItems])

  const toggleMobileDropdown = useCallback((itemId: string) => {
    setMobileDropdownOpen(prev => prev === itemId ? null : itemId)
  }, [])

  // Escape-Key Handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Focus auf ersten fokussierbaren Element
      firstFocusableRef.current?.focus()
    }
    
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus-Trap für Keyboard-Navigation
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab') return
      
      if (e.shiftKey) {
        // Shift + Tab: Rückwärts
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault()
          lastFocusableRef.current?.focus()
        }
      } else {
        // Tab: Vorwärts
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault()
          firstFocusableRef.current?.focus()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleTabKey)
    }

    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  // Verhindere Body-Scroll wenn Menü offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])


  if (siteMode !== 'onepage' || !isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-[var(--z-mobile-overlay)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      aria-describedby="mobile-nav-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Overlay Panel - Zentrierte schöne Navigation */}
      <div 
        ref={focusTrapRef}
        className="absolute inset-0 bg-white shadow-2xl animate-in slide-in-from-bottom duration-500 overflow-y-auto z-[var(--z-mobile-panel)]"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-end p-6 border-b border-gray-200 animate-in fade-in-up duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-3 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Navigation schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Navigation Items - Zentriert und größer */}
        <div 
          id="mobile-nav-description" 
          className="sr-only"
        >
          Hauptnavigation mit allen verfügbaren Menüpunkten
        </div>
        <nav 
          className="flex-1 flex flex-col justify-center px-8 py-12 space-y-6 text-center"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          {processedNavItems.map((item, index) => (
            <div 
              key={item.id}
              className="animate-in fade-in-up duration-500"
              style={{ animationDelay: `${200 + parseInt(item.animationDelay)}ms`, animationFillMode: 'both' }}
            >
              {item.hasDropdown ? (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleMobileDropdown(item.id)}
                    className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors duration-300 uppercase"
                  >
                    {item.label}
                    <svg className="w-5 h-5 ml-2 inline transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileDropdownOpen === item.id ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}/>
                    </svg>
                  </button>
                  
                  {mobileDropdownOpen === item.id && item.dropdownItems && (
                    <div className="space-y-3 pt-4">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.href ? (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="block text-lg text-gray-600 hover:text-orange-500 transition-colors duration-300"
                            onClick={onClose}
                          >
                            {'icon' in dropdownItem && dropdownItem.icon && (
                              <span className="mr-2">{dropdownItem.icon}</span>
                            )}
                            {dropdownItem.label}
                          </Link>
                        ) : (
                          <span
                            key={dropdownIndex}
                            className="block text-lg text-gray-400 cursor-default"
                          >
                            {'icon' in dropdownItem && dropdownItem.icon && (
                              <span className="mr-2">{dropdownItem.icon}</span>
                            )}
                            {dropdownItem.label}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={item.isClickable && item.href?.startsWith('#') ? (e) => onSmoothScroll(e, item.id) : undefined}
                  className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors duration-300 uppercase"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        
        {/* CTA Button */}
        <div className="px-8 pb-12 animate-in fade-in-up duration-500" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
          <Link
            ref={lastFocusableRef}
            href="#kontakt"
            onClick={(e) => onSmoothScroll(e, 'kontakt')}
            className={`block w-full py-4 px-8 text-white font-bold text-lg ${siteVariant === 'starter' ? 'uppercase' : 'normal-case'} rounded-lg transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
            style={{ 
              backgroundColor: 'var(--color-secondary)',
              borderRadius: 'var(--radius-button)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
            }}
          >
            Jetzt anfragen
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MobileHeader)
