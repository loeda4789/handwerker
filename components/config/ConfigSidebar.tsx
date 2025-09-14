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
  MdFlashOn
} from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useThemeConfig, useFeaturesConfig, useHeroConfig, useHeadingsConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { STYLE_PACKAGES, applyStylePackage } from '@/lib/config/stylePackages'
import { applyColorScheme, applyBorderRadiusScheme } from '@/lib/colorSchemes'
import { applyHeadingStyles } from '@/lib/headingStyles'
import InfoTooltip from '@/components/ui/InfoTooltip'
import InfoTooltipAdvanced from '@/components/ui/InfoTooltipAdvanced'
import ExpandableInfo from '@/components/ui/ExpandableInfo'

interface ConfigSidebarProps {
  isOpen: boolean
  onClose: () => void
}

// Icon-Mapping für Stil-Pakete
const getStylePackageIcon = (packageId: string) => {
  switch (packageId) {
    case 'clean': return MdCleaningServices
    case 'luxury': return MdLuxury
    case 'corporate': return MdBusinessCenter
    case 'warm': return MdLocalFireDepartment
    case 'dynamic': return MdFlashOn
    default: return MdBrush
  }
}

export default function ConfigSidebar({ isOpen, onClose }: ConfigSidebarProps) {
  const { config, isConfigLoaded, updateConfig } = useAppConfig()
  const { mode: siteMode, design: designStyle, variant, mobileType, setMode: setSiteMode, setVariant, setMobileType } = useLayoutConfig()
  const { colorScheme, setColorScheme } = useThemeConfig()
  const { features, setFeature: toggleFeature } = useFeaturesConfig()
  const { type: heroType, setType: setHeroType } = useHeroConfig()
  const { underline: headingUnderline, style: headingStyle, color: headingColor, setUnderline: setHeadingUnderline, setStyle: setHeadingStyle, setColor: setHeadingColor } = useHeadingsConfig()
  const { package: stylePackage, fontFamily, badgeStyle, spacing, setPackage: setStylePackage, setFontFamily, setBadgeStyle, setSpacing } = useStyleConfig()
  
  
  // Debug-Log für stylePackage
  
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isAdvancedConfigOpen, setIsAdvancedConfigOpen] = useState(false)

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
      // Store original overflow value
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  // Debug: Aktuelle Variante
  
  // Besteller-Varianten - Einheitliche Farben
  const bestellerVariants = [
    {
      id: 'starter',
      name: 'Starter',
      price: '79€',
      period: '/Monat',
      description: 'One-Page Website für kleine Unternehmen',
      features: ['One-Page Layout', 'Basis-Features', 'Mobile optimiert'],
      icon: MdBusiness,
      color: 'bg-gray-50 border-gray-200',
      selected: variant === 'starter'
    },
    {
      id: 'professional',
      name: 'Professionell',
      price: '119€',
      period: '/Monat',
      description: 'One-Page mit Leistungssektor',
      features: ['One-Page Layout', 'Leistungssektor', 'Alle Features'],
      icon: MdTrendingUp,
      color: 'bg-gray-50 border-gray-200', // Einheitliche Farbe wie Starter
      selected: variant === 'professional'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '149€',
      period: '/Monat',
      description: 'Multi-Page Website für anspruchsvolle Projekte',
      features: ['Multi-Page Layout', 'Alle Unterseiten', 'Vollständig anpassbar'],
      icon: MdDiamond,
      color: 'bg-gray-50 border-gray-200', // Einheitliche Farbe wie Starter
      selected: variant === 'premium'
    }
  ]


  const heroTypes = [
    { key: 'single', label: 'Single', icon: MdImage },
    { key: 'slider', label: 'Slider', icon: MdViewCarousel },
    { key: 'video', label: 'Video', icon: MdCall },
    { key: 'split', label: 'Split', icon: MdViewQuilt }
  ]


  const colorSchemes = [
    { key: 'warm', label: 'Warm', colors: ['#f97316', '#fb923c', '#fed7aa'] },
    { key: 'modern', label: 'Modern', colors: ['#3b82f6', '#60a5fa', '#93c5fd'] },
    { key: 'elegant', label: 'Elegant', colors: ['#6b7280', '#9ca3af', '#d1d5db'] },
    { key: 'nature', label: 'Nature', colors: ['#059669', '#10b981', '#6ee7b7'] }
  ]

  const desktopFeatures = [
    { key: 'contactBar', label: 'Kontakt-Leiste', icon: MdCall },
    { key: 'sideContact', label: 'Seiten-Kontakt', icon: MdCall }
  ]

  const mobileFeatures: Array<{ key: string; label: string; icon: any }> = [
    // Hier können später mobile-spezifische Features hinzugefügt werden
  ]


  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Desktop Sidebar / Mobile Bottom Card */}
      <div 
        className={`
          fixed bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out flex flex-col
          ${isMobile 
            ? `bottom-0 left-0 right-0 h-[85vh] ${isOpen ? 'translate-y-0' : 'translate-y-full'}`
            : `top-0 right-0 h-full w-96 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
          }
          ${isDragging ? 'transition-none' : ''}
        `}
        style={{ 
          borderRadius: isMobile ? '20px 20px 0 0' : '0px',
          transform: isMobile && isDragging ? `translateY(${dragOffset}px)` : undefined
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Mobile Drag Handle */}
        {isMobile && (
          <div className="flex justify-center py-3 border-b border-gray-100 flex-shrink-0">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 flex items-center justify-center rounded-full">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Website Designer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors rounded-full"
          >
            <MdClose className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Varianten */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-blue-100 flex items-center justify-center rounded-full">
                <MdStar className="w-3 h-3 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Varianten
              </h3>
              <InfoTooltipAdvanced 
                content="Wählen Sie zwischen Starter (One-Page), Professional (One-Page mit erweiterten Features) oder Premium (Multi-Page mit allen Unterseiten)." 
                variant="expandable"
              />
            </div>
            <div className="space-y-2">
              {bestellerVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    if (variant.id === 'starter') {
                      // Starter: One-Page
                      setSiteMode('onepage')
                      setVariant('starter')
                    } else if (variant.id === 'professional') {
                      // Professionell: One-Page mit erweiterten Features
                      setSiteMode('onepage')
                      setVariant('professional')
                    } else if (variant.id === 'premium') {
                      // Premium: Multi-Page
                      setSiteMode('multipage')
                      setVariant('premium')
                    }
                  }}
                  className={`w-full p-4 border-2 transition-all text-left h-20 flex items-center config-sidebar-variant ${
                    variant.selected
                      ? 'border-gray-900 bg-gray-50'
                      : `${variant.color} hover:border-gray-300`
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
                      variant.selected ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
                    }`}>
                      <variant.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">{variant.name}</h4>
                        <div className="text-right">
                          <span className="text-base font-bold text-gray-900">{variant.price}</span>
                          <span className="text-xs text-gray-500 ml-1">{variant.period}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">{variant.description}</p>
                    </div>
                    {variant.selected && (
                      <MdCheck className="w-5 h-5 text-gray-900 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weitere Konfiguration - Aufklappbarer Bereich */}
          <div className="space-y-4">
            <button
              onClick={() => setIsAdvancedConfigOpen(!isAdvancedConfigOpen)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span className="font-medium text-gray-900">Weitere Konfiguration</span>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isAdvancedConfigOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {/* Aufklappbarer Inhalt */}
            {isAdvancedConfigOpen && (
              <div className="space-y-6 animate-in slide-in-from-top duration-200">

          {/* Hero-Typ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-green-100 flex items-center justify-center rounded-full">
                <MdImage className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Hero-Typ
              </h3>
              <InfoTooltipAdvanced 
                content="Split: Bild links, Text rechts\nSingle: Vollbild mit Text überlagert\nCarousel: Mehrere Bilder im Wechsel" 
                variant="expandable"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {heroTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setHeroType(type.key as any)}
                  className={`flex items-center gap-2 p-3 border-2 transition-all config-sidebar-button ${
                    heroType === type.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    heroType === type.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-purple-100 flex items-center justify-center rounded-full">
                <MdViewQuilt className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Mobile Navigation
              </h3>
              <ExpandableInfo content="Vollbild: Navigation übernimmt den gesamten Bildschirm\nSeitenleiste: Navigation schiebt sich von rechts ein\nDropdown: Navigation erscheint von oben als Dropdown" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'fullscreen', label: 'Vollbild', icon: MdViewQuilt },
                { key: 'sidebar', label: 'Seitenleiste', icon: MdSettings },
                { key: 'dropdown', label: 'Dropdown', icon: MdDescription }
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setMobileType(type.key as any)}
                  className={`flex flex-col items-center gap-2 p-3 border-2 transition-all config-sidebar-button ${
                    mobileType === type.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    mobileType === type.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-900 text-center">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stil-Pakete */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-100 flex items-center justify-center rounded-full">
                <MdBrush className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Stil-Pakete
              </h3>
              <InfoTooltip content="Wählen Sie ein vordefiniertes Design-Paket mit passenden Farben, Schriftarten und Stilelementen für Ihre Branche." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_PACKAGES.map((pkg) => {
                return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    // Apply style package using the centralized function
                    const updatedConfig = applyStylePackage(config, pkg.id)
                    
                    // Update all style-related settings FIRST
                    setStylePackage(pkg.id as any)
                    if (updatedConfig.style) {
                      if (updatedConfig.style.fontFamily) {
                        setFontFamily(updatedConfig.style.fontFamily)
                      }
                      if (updatedConfig.style.badgeStyle) {
                        setBadgeStyle(updatedConfig.style.badgeStyle)
                      }
                      if (updatedConfig.style.spacing) {
                        setSpacing(updatedConfig.style.spacing)
                      }
                    }
                    
                    if (updatedConfig.headings) {
                      if (updatedConfig.headings.underline !== undefined) {
                        setHeadingUnderline(updatedConfig.headings.underline)
                      }
                      if (updatedConfig.headings.style) {
                        setHeadingStyle(updatedConfig.headings.style)
                      }
                      if (updatedConfig.headings.color) {
                        setHeadingColor(updatedConfig.headings.color)
                      }
                    }
                    
                    // Update the configuration LAST
                    updateConfig(updatedConfig)
                    
                    // Apply the updated configuration
                    if (updatedConfig.layout) {
                      if (updatedConfig.layout.design) {
                        // Apply border radius scheme
                        applyBorderRadiusScheme(updatedConfig.layout.design)
                      }
                    }
                    
                    if (updatedConfig.headings) {
                      // Apply heading styles using the full config
                      applyHeadingStyles(updatedConfig)
                    }
                  }}
                  className={`flex items-center gap-2 p-3 border-2 transition-all cursor-pointer config-sidebar-button ${
                    stylePackage === pkg.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${
                    stylePackage === pkg.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {(() => {
                      const IconComponent = getStylePackageIcon(pkg.id)
                      return <IconComponent className="w-3 h-3" />
                    })()}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{pkg.name}</span>
                </button>
                )
              })}
            </div>
          </div>

          {/* Farbschema */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-purple-100 flex items-center justify-center rounded-full">
                <MdPalette className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Farbschema
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.key}
                  onClick={() => setColorScheme(scheme.key as any)}
                  className={`flex items-center gap-3 p-3 border-2 transition-all config-sidebar-button ${
                    colorScheme === scheme.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex gap-1">
                    {scheme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{scheme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Features - Nur auf Desktop */}
          <div className="hidden lg:block space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-100 flex items-center justify-center rounded-full">
                <MdSettings className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Desktop Features
              </h3>
            </div>
            <div className="space-y-3">
              {desktopFeatures.map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200 config-sidebar-feature">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
                      <feature.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                  </div>
                  <button
                    onClick={() => toggleFeature(feature.key as any, !features[feature.key as keyof typeof features])}
                    className={`relative inline-flex h-5 w-9 items-center transition-colors ${
                      features[feature.key as keyof typeof features]
                        ? 'bg-gray-900'
                        : 'bg-gray-200'
                    }`}
                    style={{ borderRadius: '12px' }}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform bg-white transition-transform ${
                        features[feature.key as keyof typeof features] ? 'translate-x-5' : 'translate-x-1'
                      }`}
                      style={{ borderRadius: '50%' }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Features - Nur auf Mobile */}
          {mobileFeatures.length > 0 && (
            <div className="lg:hidden space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-100 flex items-center justify-center rounded-full">
                  <MdSettings className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Mobile Features
                </h3>
              </div>
              <div className="space-y-3">
                {mobileFeatures.map((feature) => (
                  <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200 config-sidebar-feature">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
                        <feature.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{feature.label}</span>
                    </div>
                    <button
                      onClick={() => toggleFeature(feature.key as any, !features[feature.key as keyof typeof features])}
                      className={`relative inline-flex h-5 w-9 items-center transition-colors ${
                        features[feature.key as keyof typeof features]
                          ? 'bg-gray-900'
                          : 'bg-gray-200'
                      }`}
                      style={{ borderRadius: '12px' }}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform bg-white transition-transform ${
                          features[feature.key as keyof typeof features] ? 'translate-x-5' : 'translate-x-1'
                        }`}
                        style={{ borderRadius: '50%' }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Überschriften */}

              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 space-y-3">
            {/* Anwenden Button */}
            <button
              onClick={onClose}
              className="w-full py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              <MdCheck className="w-5 h-5" />
              Anwenden
            </button>
            
            
            <p className="text-xs text-gray-500 text-center">
              Ihre Änderungen werden sofort angewendet
            </p>
          </div>

        </div>
      </div>
    </>
  )
}