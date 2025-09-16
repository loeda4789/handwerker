import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
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

  // Memoized navigation items processing with staggered animation
  const processedNavItems = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      animationDelay: `${index * 150}ms` // Increased delay for better effect
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

  // Portal für vollflächige Navigation direkt in document.body
  const mobileNavigation = (
    <div 
      className="fixed inset-0 z-[99999] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
      aria-describedby="mobile-nav-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-all duration-700 ease-out"
        style={{ 
          opacity: isOpen ? 1 : 0,
          animation: isOpen ? 'fadeIn 0.7s ease-out' : 'fadeOut 0.3s ease-in'
        }}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Overlay Panel - Zentrierte schöne Navigation */}
      <div 
        ref={focusTrapRef}
        className="absolute inset-0 bg-white shadow-2xl overflow-y-auto z-[100000] transition-all duration-700 ease-out"
        style={{
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0,
          animation: isOpen ? 'slideInFromBottom 0.7s ease-out' : 'slideOutToBottom 0.3s ease-in'
        }}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 animate-in fade-in-up duration-500" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider">menü</h2>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Navigation schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Navigation Items - Linksbündig */}
        <div 
          id="mobile-nav-description" 
          className="sr-only"
        >
          Hauptnavigation mit allen verfügbaren Menüpunkten
        </div>
        <div className="flex-1 flex items-start min-h-0">
          <nav 
            className="w-full px-10 py-12 space-y-4 text-left"
            role="navigation"
            aria-label="Hauptnavigation"
          >
          {processedNavItems.map((item, index) => (
            <div 
              key={item.id}
              className="transition-all duration-500 ease-out"
              style={{ 
                animationDelay: `${300 + parseInt(item.animationDelay)}ms`,
                animationFillMode: 'both',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
                animation: isOpen ? `fadeInUp 0.6s ease-out ${300 + parseInt(item.animationDelay)}ms both` : 'fadeOutDown 0.3s ease-in both'
              }}
            >
              {item.hasDropdown ? (
                <div className="space-y-2">
                  <button
                    onClick={() => toggleMobileDropdown(item.id)}
                    className="text-xl font-medium text-gray-900 hover:text-orange-500 transition-colors duration-300 uppercase min-h-[50px] flex items-center w-full"
                  >
                    {item.label}
                    <svg className="w-5 h-5 ml-2 inline transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileDropdownOpen === item.id ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}/>
                    </svg>
                  </button>
                  
                  {mobileDropdownOpen === item.id && item.dropdownItems && (
                    <div className="space-y-2 pt-2">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.href ? (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="block text-lg text-gray-900 hover:text-orange-500 transition-colors duration-300 min-h-[40px] flex items-center"
                            onClick={onClose}
                          >
                            {dropdownItem.label}
                          </Link>
                        ) : (
                          <span
                            key={dropdownIndex}
                            className="block text-lg text-gray-400 cursor-default min-h-[40px] flex items-center"
                          >
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
                  className="text-xl font-medium text-gray-900 hover:text-orange-500 transition-colors duration-300 uppercase min-h-[50px] flex items-center"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          </nav>
        </div>
        
        {/* CTA Button - Sticky unten in der Mitte */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 animate-in fade-in-up duration-500" style={{ animationDelay: '800ms', animationFillMode: 'both' }}>
          <Link
            ref={lastFocusableRef}
            href="#kontakt"
            onClick={(e) => onSmoothScroll(e, 'kontakt')}
            className="block w-full py-4 px-8 text-white font-bold text-lg uppercase text-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              borderRadius: 'var(--radius-button)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-accent)';
            }}
          >
            JETZT ANFRAGEN
          </Link>
        </div>
      </div>
    </div>
  )

  // Portal direkt in document.body rendern
  return createPortal(mobileNavigation, document.body)
}

export default React.memo(MobileHeader)
