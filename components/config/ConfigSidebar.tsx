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
import { applyColorScheme, applyBorderRadiusScheme, colorSchemes as colorSchemesData } from '@/lib/colorSchemes'
import type { SimpleColorScheme } from '@/lib/colorSchemes'
import { applyHeadingStyles } from '@/lib/headingStyles'
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

// Hero-Varianten mit Thumbnails
const heroTypes = [
  { 
    key: 'single', 
    label: 'Single', 
    icon: MdImage,
    description: 'Klassisches Hero mit einem Bild',
    thumbnail: '🖼️',
    preview: 'Ein großes Hintergrundbild mit Text und Button'
  },
  { 
    key: 'slider', 
    label: 'Slider', 
    icon: MdViewCarousel,
    description: 'Mehrere Slides mit automatischem Wechsel',
    thumbnail: '🎠',
    preview: 'Mehrere Bilder wechseln automatisch'
  },
  { 
    key: 'split', 
    label: 'Split', 
    icon: MdViewQuilt,
    description: 'Geteiltes Layout mit Content und Bild',
    thumbnail: '📱',
    preview: 'Content links, Bild rechts'
  }
]

// Mobile Navigation Typen mit Icons
const mobileNavTypes = [
  { 
    key: 'fullscreen', 
    label: 'Fullscreen', 
    icon: MdApps,
    description: 'Vollbild-Navigation',
    thumbnail: '📱'
  },
  { 
    key: 'sidebar', 
    label: 'Sidebar', 
    icon: MdMenu,
    description: 'Seitliche Navigation',
    thumbnail: '📋'
  },
  { 
    key: 'dropdown', 
    label: 'Dropdown', 
    icon: MdExpandMore,
    description: 'Dropdown-Menü',
    thumbnail: '📂'
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

  // Apply CSS schemes when config is loaded
  useEffect(() => {
    if (isConfigLoaded) {
      applyColorScheme(colorScheme)
      applyBorderRadiusScheme(designStyle)
      applyHeadingStyles(config)
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
      description: 'One-Page Website für kleine Unternehmen',
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
      description: 'One-Page mit Leistungssektor',
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
      description: 'Multi-Page Website für anspruchsvolle Projekte',
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
    ...(isMobile ? [{
      id: 'mobile-nav',
      title: 'Mobile Navigation',
      icon: MdPhone,
      description: 'Navigation auf mobilen Geräten'
    }] : []),
    {
      id: 'variant',
      title: 'Paket',
      icon: MdStar,
      description: 'Wählen Sie Ihr Paket'
    },
    {
      id: 'style',
      title: 'Stil',
      icon: MdBrush,
      description: 'Design und Schriftarten'
    }
  ]

  // Anwenden-Funktion mit Feedback
  const handleApply = (type: string, value: any) => {
    setLastApplied(type)
    setHasChanges(false)
    
    // Micro-Animation für Feedback
    setTimeout(() => {
      setLastApplied(null)
    }, 2000)
  }

  // Sektion-Toggle
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
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
            ? `bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl ${
                isDragging ? 'transform translate-y-0' : 'transform translate-y-0'
              }` 
            : 'top-0 right-0 w-96 h-full bg-white shadow-2xl'
        }`}
        style={{
          transform: isMobile && isDragging ? `translateY(${dragOffset}px)` : 'translateY(0)',
          paddingBottom: isMobile ? 'env(safe-area-inset-bottom)' : '0'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Website anpassen</h2>
              <p className="text-sm text-gray-500">Farben, Stil und mehr</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={`${isMobile ? 'max-h-[70vh]' : 'h-full'} overflow-y-auto`}>
          <div className="p-6 space-y-4">
            {/* Accordion-Sektionen */}
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <section.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{section.title}</div>
                      <div className="text-sm text-gray-500">{section.description}</div>
                    </div>
                  </div>
                  {activeSection === section.id ? (
                    <MdExpandLess className="w-5 h-5 text-gray-400" />
                  ) : (
                    <MdExpandMore className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Sektion-Inhalt */}
                {activeSection === section.id && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    {section.id === 'colors' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Farbschema wählen</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(colorSchemesData).map(([key, scheme]) => (
                            <button
                              key={key}
                              onClick={() => {
                                setColorScheme(key as any)
                                handleApply('color', key)
                              }}
                              className={`p-3 rounded-xl border-2 transition-all ${
                                colorScheme === key 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: scheme.primary }}
                                />
                                <div 
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: scheme.secondary }}
                                />
                                <div 
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: scheme.accent }}
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{scheme.name}</div>
                              <div className="text-xs text-gray-500">{scheme.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'hero' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Hero-Typ wählen</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {heroTypes.map((hero) => (
                            <button
                              key={hero.key}
                              onClick={() => {
                                setHeroType(hero.key as any)
                                handleApply('hero', hero.key)
                              }}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${
                                heroType === hero.key 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{hero.thumbnail}</div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{hero.label}</div>
                                  <div className="text-sm text-gray-500">{hero.description}</div>
                                  <div className="text-xs text-gray-400 mt-1">{hero.preview}</div>
                                </div>
                                {heroType === hero.key && (
                                  <MdCheck className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'mobile-nav' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Mobile Navigation</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {mobileNavTypes.map((nav) => (
                            <button
                              key={nav.key}
                              onClick={() => {
                                setMobileType(nav.key as any)
                                handleApply('mobile-nav', nav.key)
                              }}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${
                                mobileType === nav.key 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{nav.thumbnail}</div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{nav.label}</div>
                                  <div className="text-sm text-gray-500">{nav.description}</div>
                                </div>
                                {mobileType === nav.key && (
                                  <MdCheck className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'variant' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Paket wählen</h3>
                        <div className="space-y-3">
                          {bestellerVariants.map((variant) => (
                            <button
                              key={variant.id}
                              onClick={() => {
                                setVariant(variant.id as any)
                                handleApply('variant', variant.id)
                              }}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
                                variant.selected 
                                  ? 'border-primary bg-primary/10' 
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              {variant.recommended && (
                                <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">
                                  Empfohlen
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  variant.selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  <variant.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <div className="font-semibold text-gray-900">{variant.name}</div>
                                    <div className="text-lg font-bold text-primary">
                                      {variant.price}<span className="text-sm font-normal text-gray-500">{variant.period}</span>
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1">{variant.description}</div>
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {variant.features.map((feature, index) => (
                                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {variant.selected && (
                                  <MdCheck className="w-5 h-5 text-primary" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {section.id === 'style' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Stil wählen</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {UNIFIED_STYLES.map((style) => {
                            const Icon = getStylePackageIcon(style.id)
                            return (
                              <button
                                key={style.id}
                                onClick={() => {
                                  setStylePackage(style.id as any)
                                  handleApply('style', style.id)
                                }}
                                className={`p-4 rounded-xl border-2 transition-all text-left ${
                                  stylePackage === style.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    stylePackage === style.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-900">{style.name}</div>
                                    <div className="text-sm text-gray-500">{style.description}</div>
                                  </div>
                                  {stylePackage === style.id && (
                                    <MdCheck className="w-5 h-5 text-primary" />
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Anwenden-Button */}
        <div className={`sticky bottom-0 bg-white border-t border-gray-200 p-4 ${
          isMobile ? 'pb-safe' : ''
        }`}>
          <button
            onClick={() => {
              // Hier würde die Anwendung der Konfiguration stattfinden
              handleApply('all', 'applied')
            }}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              hasChanges 
                ? 'bg-primary text-white hover:bg-primary/90' 
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasChanges}
          >
            {lastApplied ? (
              <div className="flex items-center justify-center gap-2">
                <MdCheck className="w-5 h-5" />
                {lastApplied === 'color' && 'Farbschema angewendet'}
                {lastApplied === 'hero' && 'Hero-Typ angewendet'}
                {lastApplied === 'mobile-nav' && 'Navigation angewendet'}
                {lastApplied === 'variant' && 'Paket angewendet'}
                {lastApplied === 'style' && 'Stil angewendet'}
                {lastApplied === 'all' && 'Alle Änderungen angewendet'}
              </div>
            ) : (
              'Anwenden'
            )}
          </button>
        </div>
      </div>
    </>
  )
}