'use client'

import { useState, useEffect } from 'react'
import { 
  MdClose, 
  MdBrush, 
  MdPalette, 
  MdStar, 
  MdDescription,
  MdSettings,
  MdViewQuilt,
  MdImage,
  MdViewCarousel,
  MdCall,
  MdCheck,
  MdBusiness,
  MdTrendingUp,
  MdDiamond,
  MdCleaningServices,
  MdDiamond as MdLuxury,
  MdBusinessCenter,
  MdLocalFireDepartment,
  MdFlashOn,
  MdInfo,
  MdExpandMore,
  MdExpandLess,
  MdPhone,
  MdMenu,
  MdApps
} from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useThemeConfig, useFeaturesConfig, useHeroConfig, useHeadingsConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { UNIFIED_STYLES, applyUnifiedStyle } from '@/lib/config/unifiedStyles'
import { applyColorScheme, colorSchemes as colorSchemesData } from '@/lib/colorSchemes'
import type { SimpleColorScheme } from '@/lib/colorSchemes'
import { applyHeadingStyles } from '@/lib/headingStyles'
import { applyBadgeStyles } from '@/lib/badgeStyles'
import InfoTooltip from '@/components/ui/InfoTooltip'
import InfoTooltipAdvanced from '@/components/ui/InfoTooltipAdvanced'
import ExpandableInfo from '@/components/ui/ExpandableInfo'
import InlineExplanation from '@/components/ui/InlineExplanation'
import ExpandableSection from '@/components/ui/ExpandableSection'
import SimpleInfo from '@/components/ui/SimpleInfo'
import CompactInfo from '@/components/ui/CompactInfo'

interface ConfigSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Icon-Mapping für Stil-Pakete
const getStylePackageIcon = (packageId: string) => {
  switch (packageId) {
    case 'einfach': return MdCleaningServices
    case 'standard': return MdLuxury
    case 'modern': return MdFlashOn
    default: return MdBrush
  }
}

// Hero-Varianten mit AI-Style Icons
const heroTypes = [
  { 
    key: 'single', 
    label: 'Single', 
    icon: MdImage,
    description: 'Klassisches Hero mit einem Bild'
  },
  { 
    key: 'slider', 
    label: 'Slider', 
    icon: MdViewCarousel,
    description: 'Mehrere Slides mit automatischem Wechsel'
  },
  { 
    key: 'split', 
    label: 'Split', 
    icon: MdViewQuilt,
    description: 'Geteiltes Layout mit Content und Bild'
  }
]

// Mobile Navigation Typen mit AI-Style Icons
const mobileNavTypes = [
  { 
    key: 'fullscreen', 
    label: 'Fullscreen', 
    icon: MdApps,
    description: 'Vollbild-Navigation'
  },
  { 
    key: 'sidebar', 
    label: 'Sidebar', 
    icon: MdMenu,
    description: 'Seitliche Navigation'
  },
  { 
    key: 'dropdown', 
    label: 'Dropdown', 
    icon: MdExpandMore,
    description: 'Dropdown-Menü'
  }
]

export default function ConfigSidebar({ isOpen, onClose }: ConfigSidebarProps) {
  const { config, isConfigLoaded, updateConfig } = useAppConfig()
  const { mode: siteMode, design: designStyle, variant, mobileType, setMode: setSiteMode, setVariant, setMobileType } = useLayoutConfig()
  const { colorScheme, setColorScheme } = useThemeConfig()
  const { features, setFeature: toggleFeature } = useFeaturesConfig()
  const { type: heroType, setType: setHeroType } = useHeroConfig()
  const { underline: headingUnderline, style: headingStyle, color: headingColor, setUnderline: setHeadingUnderline, setStyle: setHeadingStyle, setColor: setHeadingColor } = useHeadingsConfig()
  const { package: stylePackage, fontFamily, badgeStyle, spacing, setPackage: setStylePackage, setFontFamily, setBadgeStyle, setSpacing } = useStyleConfig()
  
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isAdvancedConfigOpen, setIsAdvancedConfigOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>('colors')
  const [lastApplied, setLastApplied] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle drag to close on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    setCurrentY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging) return
    const newY = e.touches[0].clientY
    setCurrentY(newY)
    const offset = newY - startY
    setDragOffset(Math.max(0, offset))
  }

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging) return
    setIsDragging(false)
    
    // If dragged down more than 100px, close the sidebar
    if (dragOffset > 100) {
      onClose()
    }
    
    setDragOffset(0)
  }

  // Apply CSS schemes when config is loaded (only once)
  useEffect(() => {
    if (isConfigLoaded) {
      applyColorScheme(colorScheme)
      applyHeadingStyles(config)
      applyBadgeStyles(config)
    }
  }, [isConfigLoaded, colorScheme, designStyle, config])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Besteller-Varianten mit "Empfohlen" Badge
  const bestellerVariants = [
    {
      id: 'starter',
      name: 'Starter',
      price: '99€',
      period: '/Monat',
      description: 'Perfekt für Einzelunternehmer und kleine Betriebe',
      features: ['One-Page Layout', 'Basis-Features', 'Mobile optimiert'],
      icon: MdBusiness,
      color: 'bg-gray-50 border-gray-200',
      selected: variant === 'starter',
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professionell',
      price: '119€',
      period: '/Monat',
      description: 'Ideal für wachsende Unternehmen mit Service-Portfolio',
      features: ['One-Page Layout', 'Leistungssektor', 'Alle Features'],
      icon: MdTrendingUp,
      color: 'bg-blue-50 border-blue-200',
      selected: variant === 'professional',
      recommended: true // Empfohlen
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '159€',
      period: '/Monat',
      description: 'Maximale Reichweite mit vollständiger Website',
      features: ['Multi-Page Layout', 'Alle Unterseiten', 'Vollständig anpassbar'],
      icon: MdDiamond,
      color: 'bg-gray-50 border-gray-200',
      selected: variant === 'premium',
      recommended: false
    }
  ]

  const desktopFeatures = [
    { key: 'contactBar', label: 'Kontakt-Leiste', icon: MdCall },
    { key: 'sideContact', label: 'Seiten-Kontakt', icon: MdCall }
  ]

  // Accordion-Sektionen
  const sections = [
    {
      id: 'colors',
      title: 'Farbschema',
      icon: MdPalette,
      description: 'Wählen Sie Ihr Farbschema'
    },
    {
      id: 'hero',
      title: 'Hero-Typ',
      icon: MdImage,
      description: 'Art der Hauptsektion'
    },
    {
      id: 'style',
      title: 'Stil',
      icon: MdBrush,
      description: 'Design und Schriftarten'
    },
    {
      id: 'variant',
      title: 'Paket',
      icon: MdStar,
      description: 'Wählen Sie Ihr Paket'
    },
    // Trennstrich für Zusatz-Features
    {
      id: 'separator',
      title: 'Zusätzliche Optionen',
      icon: null,
      description: 'Zusätzliche Funktionen',
      isSeparator: true
    },
    ...(isMobile ? [{
      id: 'mobile-nav',
      title: 'Mobile Navigation',
      icon: MdPhone,
      description: 'Navigation auf mobilen Geräten'
    }, {
      id: 'mobile-features',
      title: 'Mobile Features',
      icon: MdSettings,
      description: 'Kontakt und mobile Funktionen'
    }] : []),
    ...(!isMobile ? [{
      id: 'features',
      title: 'Features',
      icon: MdSettings,
      description: 'Zusätzliche Funktionen'
    }] : [])
  ]

  // Anwenden-Funktion mit Feedback
  const handleApply = async (type: string, value: any) => {
    setIsLoading(true)
    setLastApplied(type)
    setHasChanges(false)
    
    // Simuliere kurze Ladezeit für bessere UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Manuell die entsprechenden Styles anwenden
    if (type === 'color') {
      applyColorScheme(value)
    } else if (type === 'hero') {
      // Hero-Änderungen werden automatisch über den Context gehandhabt
    } else if (type === 'mobile-nav') {
      // Mobile Nav-Änderungen werden automatisch über den Context gehandhabt
    } else if (type === 'feature') {
      // Feature-Änderungen werden automatisch über den Context gehandhabt
    } else if (type === 'style') {
      // Style-Änderungen manuell anwenden - KORRIGIERT: applyUnifiedStyle hinzugefügt
      const newConfig = applyUnifiedStyle(config, value)
      updateConfig(newConfig) // Context aktualisieren
      applyHeadingStyles(newConfig)
      applyBadgeStyles(newConfig)
    } else if (type === 'variant') {
      // Variant-Änderungen werden automatisch über den Context gehandhabt
    }
    
    setIsLoading(false)
    
    // Micro-Animation für Feedback
    setTimeout(() => {
      setLastApplied(null)
    }, 2000)
  }

  // Sektion-Toggle
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Desktop Sidebar / Mobile Bottom Card */}
      <div 
        className={`fixed z-50 transition-all duration-300 ease-out ${
          isMobile 
            ? `bottom-0 left-0 right-0 bg-gradient-to-br from-white via-gray-50 to-white rounded-t-2xl shadow-2xl border-t border-gray-200 ${
                isDragging ? 'transform translate-y-0' : 'transform translate-y-0'
              }` 
            : 'top-0 right-0 w-96 h-full bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl border-l border-gray-200'
        }`}
        style={{
          transform: isMobile && isDragging ? `translateY(${dragOffset}px)` : 'translateY(0)',
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : '0',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          borderRadius: isMobile ? '1rem 1rem 0 0' : '0',
          background: 'linear-gradient(to bottom right, #ffffff, #f9fafb, #ffffff)',
          border: isMobile ? '2px solid #e5e7eb' : '2px solid #e5e7eb',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          color: '#374151'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" style={{
          borderBottom: '2px solid #e5e7eb',
          background: 'linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(245, 164, 84, 0.05), rgba(59, 130, 246, 0.05))'
        }}>
          {/* Dekorative Elemente */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-primary/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-accent/20 rounded-full animate-pulse delay-500"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <MdSettings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900" style={{ 
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: '700',
                  color: '#111827'
                }}>Webseite anpassen</h2>
                <p className="text-sm text-gray-600" style={{ 
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: '400',
                  color: '#6b7280'
                }}>Farben, Stil und mehr</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:scale-110"
              style={{
                borderRadius: '1rem',
                color: '#9ca3af',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`${isMobile ? 'max-h-[60vh]' : 'h-full'} overflow-y-auto pb-20 relative`}>
          {/* Scroll Indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 transition-opacity duration-300" 
               style={{ opacity: 'var(--scroll-indicator-opacity, 0)' }} />
          <div className="p-4 space-y-3">
            {/* Accordion-Sektionen */}
            {sections.map((section) => {
              // Separator rendern
              if (section.isSeparator) {
                return (
                  <div key={section.id} className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 py-2 text-sm font-medium text-gray-500 rounded-lg border border-gray-200" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                        {section.title}
                      </span>
                    </div>
                  </div>
                )
              }

              // Normale Sektionen rendern
              return (
              <div key={section.id} className={`border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white via-gray-50/30 to-white ${
                activeSection === section.id 
                  ? 'border-gray-300 ring-1 ring-gray-100' 
                  : 'border-gray-200'
              }`} style={{
                borderRadius: '1rem',
                background: 'linear-gradient(to bottom right, #ffffff, rgba(249, 250, 251, 0.3), #ffffff)',
                border: activeSection === section.id ? '1px solid #d1d5db' : '2px solid #e5e7eb',
                boxShadow: activeSection === section.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                <button
                  onClick={() => toggleSection(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleSection(section.id))}
                  className={`w-full flex items-center justify-between p-4 text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-gray-100 via-gray-200/80 to-gray-100 shadow-lg border-l-3 border-gray-500 ring-1 ring-gray-300' 
                      : 'bg-gradient-to-r from-gray-50 via-gray-100/50 to-gray-50 hover:from-gray-100 hover:via-gray-150/50 hover:to-gray-100 hover:shadow-sm'
                  }`}
                  aria-expanded={activeSection === section.id}
                  aria-controls={`section-${section.id}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      activeSection === section.id 
                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg ring-2 ring-primary/30 scale-110' 
                        : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300 group-hover:scale-110'
                    }`}>
                      {section.icon && <section.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />}
                    </div>
                    <div>
                      <div className={`font-semibold transition-colors duration-300 ${
                        activeSection === section.id 
                          ? 'text-gray-800 font-bold' 
                          : 'text-gray-700'
                      }`} style={{ 
                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                        fontWeight: activeSection === section.id ? '700' : '600',
                        color: activeSection === section.id ? '#1f2937' : '#374151'
                      }}>{section.title}</div>
                      {(!isMobile || section.id === 'variant') && (
                        <div className={`text-[10px] leading-tight transition-colors duration-300 ${
                          activeSection === section.id 
                            ? 'text-gray-600' 
                            : 'text-gray-500'
                        }`} style={{ 
                          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                          fontWeight: '400',
                          color: activeSection === section.id ? '#4b5563' : '#6b7280'
                        }}>{section.description}</div>
                      )}
                    </div>
                  </div>
                  {activeSection === section.id ? (
                    <div className="w-6 h-6 bg-gray-200 rounded-2xl flex items-center justify-center">
                      <MdExpandLess className="w-4 h-4 text-gray-600" />
                    </div>
                  ) : (
                    <MdExpandMore className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Sektion-Inhalt */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeSection === section.id ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-3 border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50">
                    {section.id === 'colors' && (
                      <div className="space-y-2">
                        <div className={`grid gap-3 ${isMobile ? 'grid-cols-3' : 'grid-cols-2'}`}>
                          {Object.entries(colorSchemesData).map(([key, scheme]) => (
                            <button
                              key={key}
                              onClick={() => {
                                setColorScheme(key as any)
                                handleApply('color', key)
                              }}
                              disabled={isLoading}
                              className={`p-2 rounded-2xl border-2 transition-all duration-300 group text-center transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                                colorScheme === key 
                                  ? 'border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md hover:bg-gray-50'
                              }`}
                              style={{
                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                borderRadius: '1rem',
                                background: colorScheme === key ? 'rgba(59, 130, 246, 0.15)' : '#ffffff',
                                border: colorScheme === key ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                color: '#374151',
                                fontWeight: '500'
                              }}
                            >
                              <div className="flex justify-center gap-1 mb-1">
                                <div 
                                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-md"
                                  style={{ backgroundColor: scheme.primary }}
                                />
                                <div 
                                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-md"
                                  style={{ backgroundColor: scheme.secondary }}
                                />
                                <div 
                                  className="w-6 h-6 rounded-2xl border-2 border-white shadow-md"
                                  style={{ backgroundColor: scheme.accent }}
                                />
                              </div>
                              {!isMobile && (
                                <div className="text-[9px] font-semibold text-gray-900" style={{ 
                                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                  fontWeight: '600',
                                  color: '#111827'
                                }}>{scheme.name}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'hero' && (
                      <div className="space-y-2">
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-1'}`}>
                          {heroTypes.map((hero) => (
                            <button
                              key={hero.key}
                              onClick={() => {
                                setHeroType(hero.key as any)
                                handleApply('hero', hero.key)
                              }}
                              className={`p-2 rounded-2xl border transition-all duration-300 group ${
                                heroType === hero.key 
                                  ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                  : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                              style={{
                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                borderRadius: '1rem',
                                background: heroType === hero.key ? 'rgba(59, 130, 246, 0.15)' : '#ffffff',
                                border: heroType === hero.key ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                color: '#374151',
                                fontWeight: '500'
                              }}
                            >
                              {isMobile ? (
                                // Mobile Layout: Icon oben, Text darunter
                                <div className="flex flex-col items-center text-center gap-1">
                                  <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    heroType === hero.key 
                                      ? 'bg-primary text-white shadow-lg' 
                                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                  }`}>
                                    <hero.icon className="w-3 h-3" />
                                  </div>
                                  <div className="text-xs font-semibold text-gray-900" style={{ 
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: '600',
                                    color: '#111827'
                                  }}>{hero.label}</div>
                                </div>
                              ) : (
                                // Desktop Layout: Icon links, Text rechts
                                <div className="flex items-center gap-2 text-left">
                                  <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    heroType === hero.key 
                                      ? 'bg-primary text-white shadow-lg' 
                                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                  }`}>
                                    <hero.icon className="w-3 h-3" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900" style={{ 
                                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                      fontWeight: '600',
                                      color: '#111827'
                                    }}>{hero.label}</div>
                                    <div className="text-[10px] text-gray-600" style={{ 
                                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                      fontWeight: '400',
                                      color: '#4b5563'
                                    }}>{hero.description}</div>
                                  </div>
                                  {heroType === hero.key && (
                                    <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                      <MdCheck className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'mobile-nav' && (
                      <div className="space-y-2">
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-1'}`}>
                          {mobileNavTypes.map((nav) => (
                            <button
                              key={nav.key}
                              onClick={() => {
                                setMobileType(nav.key as any)
                                handleApply('mobile-nav', nav.key)
                              }}
                              className={`p-2 rounded-2xl border transition-all duration-300 group ${
                                mobileType === nav.key 
                                  ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                  : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                              style={{
                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                borderRadius: '1rem',
                                background: mobileType === nav.key ? 'rgba(59, 130, 246, 0.15)' : '#ffffff',
                                border: mobileType === nav.key ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                color: '#374151',
                                fontWeight: '500'
                              }}
                            >
                              {isMobile ? (
                                // Mobile Layout: Icon oben, Text darunter
                                <div className="flex flex-col items-center text-center gap-1">
                                  <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    mobileType === nav.key 
                                      ? 'bg-primary text-white shadow-lg' 
                                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                  }`}>
                                    <nav.icon className="w-3 h-3" />
                                  </div>
                                  <div className="text-xs font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{nav.label}</div>
                                </div>
                              ) : (
                                // Desktop Layout: Icon links, Text rechts
                                <div className="flex items-center gap-2 text-left">
                                  <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                    mobileType === nav.key 
                                      ? 'bg-primary text-white shadow-lg' 
                                      : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                  }`}>
                                    <nav.icon className="w-3 h-3" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{nav.label}</div>
                                    <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>{nav.description}</div>
                                  </div>
                                  {mobileType === nav.key && (
                                    <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                      <MdCheck className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'mobile-features' && (
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleFeature('mobileContact', !features.mobileContact)}
                          className={`p-2 rounded-2xl border transition-all duration-300 group ${
                            features.mobileContact 
                              ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                              : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-left">
                            <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              features.mobileContact 
                                ? 'bg-primary text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                            }`}>
                              <MdPhone className="w-3 h-3" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>Mobile Kontakt</div>
                              <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Schwebender Button mit 4 Optionen</div>
                            </div>
                            {features.mobileContact && (
                              <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                <MdCheck className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                        
                        <button
                          onClick={() => toggleFeature('statusInfo', !features.statusInfo)}
                          className={`p-2 rounded-2xl border transition-all duration-300 group ${
                            features.statusInfo 
                              ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                              : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-left">
                            <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              features.statusInfo 
                                ? 'bg-primary text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                            }`}>
                              <MdSettings className="w-3 h-3" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>Status-Info</div>
                              <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Service-Informationen anzeigen</div>
                            </div>
                            {features.statusInfo && (
                              <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                <MdCheck className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                        
                        <button
                          onClick={() => toggleFeature('whatsapp', !features.whatsapp)}
                          className={`p-2 rounded-2xl border transition-all duration-300 group ${
                            features.whatsapp 
                              ? 'border-2 border-secondary bg-secondary/15 shadow-lg shadow-secondary/20' 
                              : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-2 text-left">
                            <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                              features.whatsapp 
                                ? 'bg-secondary text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                            }`}>
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>WhatsApp</div>
                              <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Direkt zu WhatsApp springen</div>
                            </div>
                            {features.whatsapp && (
                              <div className="w-5 h-5 bg-secondary rounded-2xl flex items-center justify-center">
                                <MdCheck className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                        </button>
                      </div>
                    )}

                    {section.id === 'variant' && (
                      <div className="space-y-2">
                        <div className="space-y-2">
                          {bestellerVariants.map((variant) => (
                            <button
                              key={variant.id}
                              onClick={() => {
                                setVariant(variant.id as any)
                                handleApply('variant', variant.id)
                                
                                // Bei Professionell oder Premium: Features aktivieren (ohne Sektion zu wechseln)
                                if (variant.id === 'professional' || variant.id === 'premium') {
                                  // Features aktivieren
                                  setTimeout(() => {
                                    // Kontakt-Leiste aktivieren
                                    toggleFeature('contactBar', true)
                                    // Seiten-Kontakt aktivieren  
                                    toggleFeature('sideContact', true)
                                  }, 100)
                                }
                              }}
                              className={`w-full p-3 rounded-2xl border transition-all duration-300 text-left relative group ${
                                variant.selected 
                                  ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                  : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                  variant.selected ? 'bg-primary text-white shadow-lg' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                }`}>
                                  <variant.icon className="w-3 h-3" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                      <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{variant.name}</div>
                                      {variant.recommended && (
                                        <div className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-2xl font-bold">
                                          Empfohlen
                                        </div>
                                      )}
                                    </div>
                                    <div className="text-sm font-bold text-primary" style={{ fontFamily: 'var(--font-body)' }}>
                                      {variant.price}<span className="text-[10px] font-normal text-gray-600">{variant.period}</span>
                                    </div>
                                  </div>
                                  <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>{variant.description}</div>
                                </div>
                                {variant.selected && (
                                  <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                    <MdCheck className="w-3 h-3 text-white" />
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'features' && (
                      <div className="space-y-2">
                        {desktopFeatures.map((feature) => (
                          <button
                            key={feature.key}
                            onClick={() => {
                              toggleFeature(feature.key as any, !features[feature.key as keyof typeof features])
                              handleApply('feature', feature.key)
                            }}
                            className={`w-full p-2 rounded-2xl border transition-all duration-300 group ${
                              features[feature.key as keyof typeof features]
                                ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2 text-left">
                              <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                features[feature.key as keyof typeof features] ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                              }`}>
                                <feature.icon className="w-3 h-3" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{feature.label}</div>
                                <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>Zusätzliche Kontaktmöglichkeiten</div>
                              </div>
                              {features[feature.key as keyof typeof features] && (
                                <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                  <MdCheck className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {section.id === 'style' && (
                      <div className="space-y-2">
                        <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-1'}`}>
                          {UNIFIED_STYLES.map((style) => {
                            const Icon = getStylePackageIcon(style.id)
                            return (
                              <button
                                key={style.id}
                                onClick={() => {
                                  console.log('🎨 Style-Klick:', style.id)
                                  console.log('🎨 Aktueller body data-style:', document.body.getAttribute('data-style'))
                                  setStylePackage(style.id as any)
                                  handleApply('style', style.id)
                                  setTimeout(() => {
                                    console.log('🎨 Nach Änderung body data-style:', document.body.getAttribute('data-style'))
                                    console.log('🎨 Badges gefunden:', document.querySelectorAll('.badge').length)
                                  }, 100)
                                }}
                                className={`p-2 rounded-2xl border transition-all duration-300 group ${
                                  stylePackage === style.id 
                                    ? 'border-2 border-primary bg-primary/15 shadow-lg shadow-primary/20' 
                                    : 'border-2 border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                                style={{
                                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                  borderRadius: '1rem',
                                  background: stylePackage === style.id ? 'rgba(59, 130, 246, 0.15)' : '#ffffff',
                                  border: stylePackage === style.id ? '2px solid #3b82f6' : '2px solid #e5e7eb',
                                  color: '#374151',
                                  fontWeight: '500'
                                }}
                              >
                                {isMobile ? (
                                  // Mobile Layout: Icon oben, Text darunter
                                  <div className="flex flex-col items-center text-center gap-1">
                                    <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                      stylePackage === style.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                    }`}>
                                      <Icon className="w-3 h-3" />
                                    </div>
                                    <div className="text-xs font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{style.name}</div>
                                  </div>
                                ) : (
                                  // Desktop Layout: Icon links, Text rechts
                                  <div className="flex items-center gap-2 text-left">
                                    <div className={`w-6 h-6 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                                      stylePackage === style.id ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                    }`}>
                                      <Icon className="w-3 h-3" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'var(--font-body)' }}>{style.name}</div>
                                      <div className="text-[10px] text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>{style.description}</div>
                                    </div>
                                    {stylePackage === style.id && (
                                      <div className="w-5 h-5 bg-primary rounded-2xl flex items-center justify-center">
                                        <MdCheck className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </div>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        {/* Sticky Anwenden-Button - nur auf Mobile */}
        {isMobile && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 pb-safe">
            <button
              onClick={() => {
                // Hier würde die Anwendung der Konfiguration stattfinden
                handleApply('all', 'applied')
                // ConfigCard schließen
                onClose()
              }}
              className="w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-300 bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 transform"
            >
              {lastApplied ? (
                <div className="flex items-center justify-center gap-2">
                  <MdCheck className="w-5 h-5" />
                  {lastApplied === 'color' && 'Webseite anzeigen'}
                  {lastApplied === 'hero' && 'Webseite anzeigen'}
                  {lastApplied === 'mobile-nav' && 'Webseite anzeigen'}
                  {lastApplied === 'feature' && 'Webseite anzeigen'}
                  {lastApplied === 'style' && 'Webseite anzeigen'}
                  {lastApplied === 'variant' && 'Webseite anzeigen'}
                  {lastApplied === 'all' && 'Webseite anzeigen'}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <MdCheck className="w-5 h-5" />
                  Webseite anzeigen
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}