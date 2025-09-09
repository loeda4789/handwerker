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
  MdCheck
} from 'react-icons/md'
import { useAppConfig, useLayoutConfig, useThemeConfig, useFeaturesConfig, useHeroConfig, useHeadingsConfig } from '@/contexts/AppConfigContext'
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
  
  const [activeTab, setActiveTab] = useState('design')
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

  if (!isOpen) return null

  const tabs = [
    { key: 'design', label: 'Design', icon: MdBrush },
    { key: 'colors', label: 'Farben', icon: MdPalette },
    { key: 'headings', label: 'Überschriften', icon: MdDescription },
    { key: 'features', label: 'Features', icon: MdStar },
    { key: 'layout', label: 'Layout', icon: MdDescription }
  ]

  const designStyles = [
    { key: 'angular', label: 'Eckig', icon: MdViewQuilt },
    { key: 'rounded', label: 'Abgerundet', icon: MdImage },
    { key: 'modern', label: 'Modern', icon: MdViewCarousel }
  ]

  const colorSchemes = [
    { key: 'warm', label: 'Warm', colors: ['#f97316', '#ea580c'] },
    { key: 'modern', label: 'Modern', colors: ['#3b82f6', '#1d4ed8'] },
    { key: 'elegant', label: 'Elegant', colors: ['#8b5cf6', '#7c3aed'] },
    { key: 'nature', label: 'Natur', colors: ['#10b981', '#059669'] }
  ]

  const heroTypes = [
    { key: 'single', label: 'Einzelbild', icon: MdImage },
    { key: 'slider', label: 'Slider', icon: MdViewCarousel },
    { key: 'video', label: 'Video', icon: MdViewQuilt },
    { key: 'split', label: 'Geteilt', icon: MdDescription }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 
        shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        ${isMobile ? 'w-full max-w-sm' : 'w-80'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Design-Konfiguration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <MdClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Design-Stil
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {designStyles.map((style) => (
                    <button
                      key={style.key}
                      onClick={() => setDesignStyle(style.key as any)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        designStyle === style.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        designStyle === style.key ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        <style.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {style.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {style.key === 'angular' && 'Scharfe Ecken, minimalistisch'}
                          {style.key === 'rounded' && 'Sanfte Ecken, freundlich'}
                          {style.key === 'modern' && 'Floating Design, futuristisch'}
                        </div>
                      </div>
                      {designStyle === style.key && (
                        <MdCheck className="w-5 h-5 text-orange-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Hero-Typ
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {heroTypes.map((type) => (
                    <button
                      key={type.key}
                      onClick={() => setHeroType(type.key as any)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        heroType === type.key
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        heroType === type.key ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        <type.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Farbschema
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.key}
                    onClick={() => setColorScheme(scheme.key as any)}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      colorScheme === scheme.key
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex gap-1">
                      {scheme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {scheme.label}
                    </span>
                    {colorScheme === scheme.key && (
                      <MdCheck className="w-4 h-4 text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Headings Tab */}
          {activeTab === 'headings' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Überschriften-Styling
                </h3>
                
                {/* Underline Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      headingUnderline ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}>
                      <MdDescription className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Unterstreichung
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Überschriften unterstreichen
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setHeadingUnderline(!headingUnderline)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      headingUnderline ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        headingUnderline ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Style Selection */}
                {headingUnderline && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Unterstreichungs-Stil
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: 'gradient', label: 'Gradient', desc: 'Farbverlauf' },
                        { key: 'solid', label: 'Solid', desc: 'Einfarbig' },
                        { key: 'dotted', label: 'Gepunktet', desc: 'Punkte' },
                        { key: 'none', label: 'Keine', desc: 'Ausblenden' }
                      ].map((style) => (
                        <button
                          key={style.key}
                          onClick={() => setHeadingStyle(style.key as any)}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            headingStyle === style.key
                              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                          }`}
                        >
                          <div className={`w-8 h-1 rounded-full ${
                            style.key === 'gradient' ? 'bg-gradient-to-r from-orange-500 to-orange-300' :
                            style.key === 'solid' ? 'bg-orange-500' :
                            style.key === 'dotted' ? 'bg-orange-500' :
                            'bg-gray-300'
                          }`} style={{
                            borderStyle: style.key === 'dotted' ? 'dotted' : 'solid'
                          }} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {style.label}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {style.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Features
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'contactBar', label: 'Kontakt-Leiste', desc: 'Fixe Telefon-Leiste oben', icon: MdPhoneInTalk },
                  { key: 'sideContact', label: 'Side Contact', desc: 'Floating Kontakt-Button', icon: MdCall }
                ].map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        features[feature.key as keyof typeof features]
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {feature.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {feature.desc}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFeature(feature.key as keyof typeof features, !features[feature.key as keyof typeof features])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        features[feature.key as keyof typeof features]
                          ? 'bg-orange-500'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          features[feature.key as keyof typeof features] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Layout Tab */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Layout-Modus
              </h3>
              <div className="space-y-3">
                {[
                  { key: 'onepage', label: 'One-Page', desc: 'Alle Inhalte auf einer Seite' },
                  { key: 'multipage', label: 'Multi-Page', desc: 'Getrennte Unterseiten' }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setSiteMode(mode.key as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      siteMode === mode.key
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {mode.label}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {mode.desc}
                      </div>
                    </div>
                    {siteMode === mode.key && (
                      <MdCheck className="w-5 h-5 text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
