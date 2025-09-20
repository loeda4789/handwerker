import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { NavigationItem } from '@/lib/config/navigationConfig'
import { ContentData } from '@/types/content'
import { useSiteVariant } from '@/contexts/AppConfigContext'

interface MobileSideNavigationProps {
  isOpen: boolean
  navItems: NavigationItem[]
  content: ContentData
  siteMode: 'onepage' | 'multipage'
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
  onClose: () => void
}

function MobileSideNavigation({ 
  isOpen,
  navItems, 
  content, 
  siteMode, 
  onSmoothScroll, 
  onClose 
}: MobileSideNavigationProps) {
  const { siteVariant } = useSiteVariant()
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const focusTrapRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const lastFocusableRef = useRef<HTMLAnchorElement>(null)

  // Memoized navigation items processing with staggered animation
  const processedNavItems = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      animationDelay: `${index * 120}ms` // Increased delay for better effect
    }))
  }, [navItems])

  const toggleMobileDropdown = useCallback((itemId: string) => {
    setMobileDropdownOpen(prev => prev === itemId ? null : itemId)
  }, [])

  // Touch gesture handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    if (isLeftSwipe) {
      onClose()
    }
  }, [touchStart, touchEnd, onClose])

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
  const sideNavigation = (
    <div 
      className="fixed inset-0 z-[99999] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Side Navigation"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      {/* Side Panel - Slide in from right */}
      <div 
        ref={focusTrapRef}
        className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto z-[var(--z-mobile-panel)]"
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-end p-6 border-b border-gray-200 bg-gray-50">
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            style={{ borderRadius: 'var(--radius-button)' }}
            aria-label="Navigation schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        {/* Navigation Items - Scrollable */}
        <div className="flex-1 px-6 py-6 space-y-2">
          {/* Startseite Link */}
          <div 
            className="animate-in fade-in-up duration-300"
            style={{ animationDelay: '50ms', animationFillMode: 'both' }}
          >
            <Link
              href="/"
              className="block py-3 px-4 text-lg text-gray-900 hover:bg-gray-100 transition-colors duration-200 font-medium normal-case"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              Startseite
            </Link>
          </div>
          
          {processedNavItems.map((item, index) => (
            <div 
              key={item.id}
              className="animate-in fade-in-up duration-300"
              style={{ animationDelay: `${100 + index * 50}ms`, animationFillMode: 'both' }}
            >
              {item.hasDropdown ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleMobileDropdown(item.id)}
                    className="w-full flex items-center justify-between py-3 px-4 text-left text-gray-900 hover:bg-gray-100 transition-colors duration-200 group"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    <span className="text-lg font-medium normal-case">
                      {item.label}
                    </span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${
                        mobileDropdownOpen === item.id ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  
                  {mobileDropdownOpen === item.id && item.dropdownItems && (
                    <div className="ml-4 space-y-1">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        dropdownItem.href ? (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="block py-2 px-4 text-lg text-gray-900 hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                            style={{ borderRadius: 'var(--radius-button)' }}
                            onClick={onClose}
                          >
                            {dropdownItem.label}
                          </Link>
                        ) : (
                          <span
                            key={dropdownIndex}
                            className="block py-2 px-4 text-lg text-gray-400 cursor-default"
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
                  className="block py-3 px-4 text-lg text-gray-900 hover:bg-gray-100 transition-colors duration-200 font-medium normal-case"
              style={{ borderRadius: 'var(--radius-button)' }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        {/* CTA Button - Fixed at bottom */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <Link
            ref={lastFocusableRef}
            href="#kontakt"
            onClick={(e) => onSmoothScroll(e, 'kontakt')}
            className="block w-full py-3 px-4 text-white font-medium text-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 normal-case"
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

  // Portal direkt in document.body rendern
  return createPortal(sideNavigation, document.body)
}

export default React.memo(MobileSideNavigation)
