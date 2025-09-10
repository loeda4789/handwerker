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
  MdPhoneInTalk,
  MdCall,
  MdCheck,
  MdBusiness,
  MdTrendingUp,
  MdDiamond
} from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useThemeConfig, useFeaturesConfig, useHeroConfig, useHeadingsConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { STYLE_PACKAGES, applyStylePackage } from '@/lib/config/stylePackages'
import { applyColorScheme, applyBorderRadiusScheme } from '@/lib/colorSchemes'
import { applyHeadingStyles } from '@/lib/headingStyles'

interface ConfigSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConfigSidebar({ isOpen, onClose }: ConfigSidebarProps) {
  const { config, isConfigLoaded } = useAppConfig()
  const { mode: siteMode, design: designStyle, setMode: setSiteMode } = useLayoutConfig()
  const { colorScheme, setColorScheme } = useThemeConfig()
  const { features, setFeature: toggleFeature } = useFeaturesConfig()
  const { type: heroType, setType: setHeroType } = useHeroConfig()
  const { underline: headingUnderline, style: headingStyle, color: headingColor, setUnderline: setHeadingUnderline, setStyle: setHeadingStyle, setColor: setHeadingColor } = useHeadingsConfig()
  const { package: stylePackage, fontFamily, badgeStyle, spacing, setPackage: setStylePackage, setFontFamily, setBadgeStyle, setSpacing } = useStyleConfig()
  
  // Debug-Log für stylePackage
  console.log('🔍 ConfigSidebar - stylePackage:', stylePackage, 'fontFamily:', fontFamily, 'badgeStyle:', badgeStyle)
  
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

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

  // Besteller-Varianten
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
      selected: siteMode === 'onepage' && !features.sideContact
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
      selected: siteMode === 'onepage' && features.sideContact
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '149€',
      period: '/Monat',
      description: 'Multi-Page Website für anspruchsvolle Projekte',
      features: ['Multi-Page Layout', 'Alle Unterseiten', 'Vollständig anpassbar'],
      icon: MdDiamond,
      color: 'bg-purple-50 border-purple-200',
      selected: siteMode === 'multipage'
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

  const featureList = [
    { key: 'contactBar', label: 'Kontakt-Leiste', icon: MdPhoneInTalk },
    { key: 'sideContact', label: 'Seiten-Kontakt', icon: MdCall }
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
            <div className="w-8 h-8 bg-gray-900 flex items-center justify-center" style={{ borderRadius: '8px' }}>
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Website Designer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors"
            style={{ borderRadius: '8px' }}
          >
            <MdClose className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Varianten */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-blue-100 flex items-center justify-center" style={{ borderRadius: '4px' }}>
                <MdStar className="w-3 h-3 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Varianten
              </h3>
            </div>
            <div className="space-y-2">
              {bestellerVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    if (variant.id === 'starter') {
                      // Starter: One-Page ohne Leistungssektor
                      setSiteMode('onepage')
                      if (features.sideContact) toggleFeature('sideContact', false)
                      if (!features.contactBar) toggleFeature('contactBar', true)
                    } else if (variant.id === 'professional') {
                      // Professionell: One-Page mit Leistungssektor
                      setSiteMode('onepage')
                      if (!features.sideContact) toggleFeature('sideContact', true)
                      if (!features.contactBar) toggleFeature('contactBar', true)
                    } else if (variant.id === 'premium') {
                      // Premium: Multi-Page mit allen Features
                      setSiteMode('multipage')
                      if (!features.sideContact) toggleFeature('sideContact', true)
                      if (!features.contactBar) toggleFeature('contactBar', true)
                    }
                  }}
                  className={`w-full p-3 border-2 transition-all text-left ${
                    variant.selected
                      ? 'border-gray-900 bg-gray-50'
                      : `${variant.color} hover:border-gray-300`
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 flex items-center justify-center ${
                      variant.selected ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
                    }`}
                    style={{ borderRadius: '6px' }}>
                      <variant.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">{variant.name}</h4>
                        <div className="text-right">
                          <span className="text-base font-bold text-gray-900">{variant.price}</span>
                          <span className="text-xs text-gray-500 ml-1">{variant.period}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{variant.description}</p>
                    </div>
                    {variant.selected && (
                      <MdCheck className="w-4 h-4 text-gray-900 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Weitere Konfiguration</span>
            </div>
          </div>

          {/* Hero-Typ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-green-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
                <MdImage className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Hero-Typ
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {heroTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setHeroType(type.key as any)}
                  className={`flex items-center gap-2 p-3 border-2 transition-all ${
                    heroType === type.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  <div className={`w-6 h-6 flex items-center justify-center ${
                    heroType === type.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                  style={{ borderRadius: '4px' }}>
                    <type.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Stil-Pakete */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-orange-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
                <MdBrush className="w-4 h-4 text-orange-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Stil-Pakete
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {STYLE_PACKAGES.map((pkg) => {
                console.log('🔍 Rendering Stil-Paket:', pkg.id, pkg.name)
                return (
                <div
                  key={pkg.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    
                    // Apply style package using the centralized function
                    const updatedConfig = applyStylePackage(config, pkg.id)
                    console.log('🎨 Stil-Paket angewendet:', pkg.id, updatedConfig.style)
                    
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
                    
                    // Update all style-related settings
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
                  }}
                  className={`flex items-center gap-3 p-4 border-2 transition-all cursor-pointer ${
                    stylePackage === pkg.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onMouseDown={(e) => {
                    console.log('🖱️ Stil-Paket geklickt:', pkg.id, 'stylePackage:', stylePackage)
                  }}
                  style={{ borderRadius: '10px' }}
                >
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
                    <span className="text-sm font-bold text-gray-700">{pkg.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{pkg.name}</div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>

          {/* Farbschema */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-purple-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
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
                  className={`flex items-center gap-3 p-3 border-2 transition-all ${
                    colorScheme === scheme.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ borderRadius: '8px' }}
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

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-indigo-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
                <MdSettings className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Features
              </h3>
            </div>
            <div className="space-y-3">
              {featureList.map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-3 border border-gray-200" style={{ borderRadius: '8px' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 flex items-center justify-center" style={{ borderRadius: '6px' }}>
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


          {/* Überschriften */}

        </div>
      </div>
    </>
  )
}