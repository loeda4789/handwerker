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
  const { mode: siteMode, design: designStyle, setMode: setSiteMode, setDesign: setDesignStyle } = useLayoutConfig()
  const { colorScheme, setColorScheme } = useThemeConfig()
  const { features, setFeature: toggleFeature } = useFeaturesConfig()
  const { type: heroType, setType: setHeroType } = useHeroConfig()
  const { underline: headingUnderline, style: headingStyle, color: headingColor, setUnderline: setHeadingUnderline, setStyle: setHeadingStyle, setColor: setHeadingColor } = useHeadingsConfig()
  const { package: stylePackage, fontFamily, badgeStyle, spacing, setPackage: setStylePackage, setFontFamily, setBadgeStyle, setSpacing } = useStyleConfig()
  
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      description: 'Perfekt für kleine Unternehmen',
      features: ['1 Design-Stil', 'Basis-Features', 'Mobile optimiert'],
      icon: MdBusiness,
      color: 'bg-gray-50 border-gray-200',
      selected: designStyle === 'angular' && siteMode === 'onepage'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '119€',
      period: '/Monat',
      description: 'Ideal für wachsende Unternehmen',
      features: ['3 Design-Stile', 'Alle Features', 'SEO optimiert'],
      icon: MdTrendingUp,
      color: 'bg-blue-50 border-blue-200',
      selected: designStyle === 'rounded' && siteMode === 'multipage'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '149€',
      period: '/Monat',
      description: 'Für anspruchsvolle Projekte',
      features: ['Alle Design-Stile', 'Premium Features', 'Vollständig anpassbar'],
      icon: MdDiamond,
      color: 'bg-purple-50 border-purple-200',
      selected: designStyle === 'modern' && siteMode === 'multipage'
    }
  ]

  const designStyles = [
    { key: 'angular', label: 'Eckig', icon: MdViewQuilt },
    { key: 'rounded', label: 'Abgerundet', icon: MdImage },
    { key: 'modern', label: 'Modern', icon: MdViewCarousel }
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

  const layoutModes = [
    { key: 'onepage', label: 'One-Page', description: 'Alles auf einer Seite' },
    { key: 'multipage', label: 'Multi-Page', description: 'Mehrere Unterseiten' }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-sm bg-white 
        shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        ${isMobile ? 'w-full max-w-sm' : 'w-80'}
      `}
      style={{ borderRadius: '0px' }}>
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
          
          {/* Besteller-Varianten */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Besteller-Varianten
            </h3>
            <div className="space-y-3">
              {bestellerVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    if (variant.id === 'starter') {
                      setDesignStyle('angular')
                      setSiteMode('onepage')
                    } else if (variant.id === 'professional') {
                      setDesignStyle('rounded')
                      setSiteMode('multipage')
                    } else if (variant.id === 'premium') {
                      setDesignStyle('modern')
                      setSiteMode('multipage')
                    }
                  }}
                  className={`w-full p-4 border-2 transition-all text-left ${
                    variant.selected
                      ? 'border-gray-900 bg-gray-50'
                      : `${variant.color} hover:border-gray-300`
                  }`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${
                      variant.selected ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
                    }`}
                    style={{ borderRadius: '8px' }}>
                      <variant.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                        <div className="text-right">
                          <span className="text-lg font-bold text-gray-900">{variant.price}</span>
                          <span className="text-sm text-gray-500 ml-1">{variant.period}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{variant.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {variant.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1" style={{ borderRadius: '6px' }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    {variant.selected && (
                      <MdCheck className="w-5 h-5 text-gray-900 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Design-Stil */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Design-Stil
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {designStyles.map((style) => (
                <button
                  key={style.key}
                  onClick={() => setDesignStyle(style.key as any)}
                  className={`flex flex-col items-center gap-2 p-3 border-2 transition-all ${
                    designStyle === style.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  <div className={`w-8 h-8 flex items-center justify-center ${
                    designStyle === style.key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                  style={{ borderRadius: '6px' }}>
                    <style.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-900">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Hero-Typ */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Hero-Typ
            </h3>
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

          {/* Farbschema */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Farbschema
            </h3>
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
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Features
            </h3>
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

          {/* Layout-Modus */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Layout-Modus
            </h3>
            <div className="space-y-2">
              {layoutModes.map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setSiteMode(mode.key as any)}
                  className={`w-full flex items-center justify-between p-3 border-2 transition-all ${
                    siteMode === mode.key
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  <div>
                    <div className="font-medium text-gray-900">{mode.label}</div>
                    <div className="text-sm text-gray-600">{mode.description}</div>
                  </div>
                  {siteMode === mode.key && (
                    <MdCheck className="w-5 h-5 text-gray-900" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Überschriften */}
          {/* Style Packages Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Stil-Pakete
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {STYLE_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    const newConfig = applyStylePackage(config, pkg.id)
                    // Apply all changes from the style package
                    setDesignStyle(newConfig.layout.design)
                    setColorScheme(newConfig.theme.colorScheme)
                    setHeadingUnderline(newConfig.headings.underline)
                    setHeadingStyle(newConfig.headings.style)
                    setHeadingColor(newConfig.headings.color)
                    setStylePackage(pkg.id)
                    setFontFamily(newConfig.style.fontFamily)
                    setBadgeStyle(newConfig.style.badgeStyle)
                    setSpacing(newConfig.style.spacing)
                  }}
                  className={`w-full p-4 border-2 transition-all text-left ${
                    stylePackage === pkg.id
                      ? 'border-gray-900 bg-gray-50'
                      : `${pkg.color} hover:border-gray-300`
                  }`}
                  style={{ borderRadius: '12px' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{pkg.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">{pkg.description}</p>
                    </div>
                    {stylePackage === pkg.id && (
                      <MdCheck className="w-5 h-5 text-gray-900 flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Überschriften
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200" style={{ borderRadius: '8px' }}>
                <span className="text-sm font-medium text-gray-900">Unterstreichung</span>
                <button
                  onClick={() => setHeadingUnderline(!headingUnderline)}
                  className={`relative inline-flex h-5 w-9 items-center transition-colors ${
                    headingUnderline ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                  style={{ borderRadius: '12px' }}
                >
                  <span
                    className={`inline-block h-3 w-3 transform bg-white transition-transform ${
                      headingUnderline ? 'translate-x-5' : 'translate-x-1'
                    }`}
                    style={{ borderRadius: '50%' }}
                  />
                </button>
              </div>
              
              {headingUnderline && (
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Stil</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: 'gradient', label: 'Gradient' },
                      { key: 'solid', label: 'Solid' },
                      { key: 'dotted', label: 'Gepunktet' },
                      { key: 'none', label: 'Keine' }
                    ].map((style) => (
                      <button
                        key={style.key}
                        onClick={() => setHeadingStyle(style.key as any)}
                        className={`px-3 py-2 text-xs font-medium border transition-all ${
                          headingStyle === style.key
                            ? 'border-gray-900 bg-gray-50 text-gray-900'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                        style={{ borderRadius: '6px' }}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}