'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import ModernSpinner from '@/components/ModernSpinner'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import ProjectProcess from '@/components/ProjectProcess'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SpeedDial from '@/components/SpeedDial'
import { applyColorScheme, applyBorderRadiusScheme } from '@/lib/colorSchemes'
import { MdCrop32, MdRoundedCorner, MdWaves, MdCircle, MdViewQuilt, MdImage, MdViewCarousel, MdPlayCircleFilled } from 'react-icons/md'
import ConfiguratorButton from '@/components/ConfiguratorButton'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import UrlParamsDebug from '@/components/UrlParamsDebug'
import { useContentWithUrlParams } from '@/lib/hooks/useUrlParams'
import ColorConfigurator from '@/components/ColorConfigurator'
import PromoBanner from '@/components/PromoBanner'
import ContactBar from '@/components/ContactBar'
import NotdienstAlert from '@/components/NotdienstAlert'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import CallbackPopup from '@/components/CallbackPopup'

interface ConfigState {
  layoutType: 'onepage' | 'multipage' | ''
  designStyle: 'angular' | 'rounded' | 'curved' | 'circular' | ''
  colorScheme: 'handwerker' | 'rot' | 'blau' | 'schlicht' | ''
  designExpanded: boolean
  colorExpanded: boolean
  featuresExpanded: boolean
}

interface FeaturesState {
  promoBanner: boolean
  contactBar: boolean
  notdienstAlert: boolean
  whatsappWidget: boolean
  callbackPopup: boolean
  speedDial: boolean
}

// Helper component für abwechselnde Sektionshintergründe in klassischer Variante
interface SectionWrapperProps {
  children: React.ReactNode
  index: number
  designStyle: string
  className?: string
}

const SectionWrapper = ({ children, index, designStyle, className = '' }: SectionWrapperProps) => {
  if (designStyle !== 'angular') {
    // Für moderne Varianten: Standard-Styling der Komponenten beibehalten
    return <>{children}</>
  }

  // Für klassische Variante: Abwechselnde Hintergründe zwischen background und surface
  // Index 1, 3, 5, 7... sollen surface haben (ungerade Indizes)
  // Index 0, 2, 4, 6... sollen background bleiben (gerade Indizes)
  const shouldUseSurface = index % 2 === 1 // Ungerade Indizes (1, 3, 5, 7...)
  
  if (shouldUseSurface) {
    // Ungerade Sektionen: Surface-Hintergrund (helles Grau)
    return (
      <div 
        className={`bg-surface dark:bg-dark-secondary ${className}`}
      >
        {children}
      </div>
    )
  } else {
    // Gerade Sektionen: Background (weiß)
    return (
      <div className={`bg-background dark:bg-dark ${className}`}>
        {children}
      </div>
    )
  }
}

export default function HomePage() {
  const [config, setConfig] = useState<ConfigState>({
    layoutType: '',
    designStyle: '',
    colorScheme: '',
    designExpanded: false,
    colorExpanded: false,
    featuresExpanded: false
  })
  const [features, setFeatures] = useState<FeaturesState>({
    promoBanner: false,
    contactBar: false,
    notdienstAlert: false,
    whatsappWidget: false,
    callbackPopup: false,
    speedDial: true
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfigurator, setShowConfigurator] = useState(true)
  const [showColorConfigurator, setShowColorConfigurator] = useState(false)
  const [baseContent, setBaseContent] = useState<ContentData | null>(null)
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [forceUpdate, setForceUpdate] = useState(0)
  const [designStyle, setDesignStyle] = useState<string>('angular')
  const router = useRouter()

  // Initialize scroll animations
  useScrollAnimation()

  // Verwende den URL-Parameter-Hook für automatische URL-Parameter-Integration
  const content = useContentWithUrlParams(baseContent || {} as ContentData)

  useEffect(() => {
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setBaseContent(loadedContent)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
      }
    }
    loadContent()

    // Design-Style aus localStorage laden
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
    }

    // Check URL parameters to determine if we should show the configurator
    const urlParams = new URLSearchParams(window.location.search)
    const hasConfig = urlParams.has('layout') || urlParams.has('hero') || urlParams.has('color')
    
    if (hasConfig) {
      setShowConfigurator(false)
      const layout = urlParams.get('layout')
      if (layout === 'onepage' || layout === 'multipage') {
        setSiteMode(layout)
      }
      
      // Set design style in localStorage for components
      const designStyleParam = urlParams.get('design')
      if (designStyleParam) {
        localStorage.setItem('demo-design-style', designStyleParam)
        setDesignStyle(designStyleParam)
      }
    }

    // Event listener für design-style Änderungen
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    return () => window.removeEventListener('storage', handleDesignStyleChange)
  }, [])

  useEffect(() => {
    console.log('Current siteMode:', siteMode)
  }, [siteMode])

  const handleConfigChange = (key: keyof ConfigState, value: string) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value }
      
      // Auto-expand next section
      if (key === 'layoutType' && value && !prev.designStyle) {
        newConfig.designExpanded = true
      } else if (key === 'designStyle' && value && !prev.colorScheme) {
        newConfig.colorExpanded = true
        newConfig.designExpanded = false
      }
      
      return newConfig
    })
  }

  const handleGenerate = async () => {
    if (!config.layoutType || !config.designStyle || !config.colorScheme) {
      alert('Bitte füllen Sie alle Schritte aus.')
      return
    }
    
    setIsGenerating(true)
    
    try {
      // Site mode setzen
      setSiteMode(config.layoutType)
    localStorage.setItem('site-mode', config.layoutType)
    
      // Design style setzen
      setDesignStyle(config.designStyle)
      localStorage.setItem('design-style', config.designStyle)
      
      // Hero type basierend auf design style setzen
      const heroTypeMap = {
        'angular': 'split',
        'rounded': 'single', 
        'curved': 'slider',
        'circular': 'video'
      }
      localStorage.setItem('demo-hero-type', heroTypeMap[config.designStyle as keyof typeof heroTypeMap])
      
      // Border radius scheme anwenden
      applyBorderRadiusScheme(config.designStyle)
      
      // Color scheme anwenden
    applyColorScheme(config.colorScheme)
    
      // Event dispatchen für andere Komponenten
      window.dispatchEvent(new Event('site-mode-changed'))
      window.dispatchEvent(new Event('storage'))
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
    setShowConfigurator(false)
      setForceUpdate(prev => prev + 1)
      
    } catch (error) {
      console.error('Fehler beim Generieren:', error)
    } finally {
    setIsGenerating(false)
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontakt')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Services Preview Component for Multi-Page Mode
  const ServicesPreview = () => (
    <SectionWrapper index={2} designStyle={designStyle}>
      <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unsere Leistungen
          </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
            Professionelle Handwerksarbeit in allen Bereichen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content?.services.slice(0, 3).map((service: any, index: number) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 shadow-lg border border-white/20"
                style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-12 h-12 bg-white/20 flex items-center justify-center mb-4"
                  style={{ borderRadius: 'var(--radius-card)' }}>
                <span className="text-2xl">{service.icon}</span>
              </div>
                <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>
                <p className="opacity-90 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </SectionWrapper>
  )

  if (!baseContent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Website wird geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* URL-Parameter Debug (nur in Development) */}
      {process.env.NODE_ENV === 'development' && <UrlParamsDebug />}
      
      {/* Marketing Features - Above Header */}
      <NotdienstAlert isEnabled={features.notdienstAlert} />
      <ContactBar isEnabled={features.contactBar} />
      
      {/* Background Website */}
      <div className={`transition-all duration-500 ${showConfigurator ? 'opacity-60 blur-[2px]' : 'opacity-100 blur-0'}`}>
        <Header content={content} />
        <Hero content={content} />
        
        {/* One-Page Mode: All Sections mit abwechselnden Hintergründen für klassisch */}
        {siteMode === 'onepage' && (
          <>
            <SectionWrapper index={0} designStyle={designStyle}>
            <About content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={1} designStyle={designStyle}>
            <Stats content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={2} designStyle={designStyle}>
            <Services content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={3} designStyle={designStyle}>
            <BeforeAfter content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={4} designStyle={designStyle}>
            <Testimonials content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={5} designStyle={designStyle}>
            <ProjectProcess content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={6} designStyle={designStyle}>
            <Contact content={content} />
            </SectionWrapper>
          </>
        )}
        
        {/* Multi-Page Mode: Only Previews */}
        {siteMode === 'multipage' && (
          <>
            <SectionWrapper index={0} designStyle={designStyle}>
            <About content={content} />
            </SectionWrapper>
            
            <SectionWrapper index={1} designStyle={designStyle}>
            <Stats content={content} />
            </SectionWrapper>
            
            <ServicesPreview />
            
            {/* Multi-Page Demo Section */}
            <SectionWrapper index={3} designStyle={designStyle}>
              <section className="py-16">
              <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    🏢 Mehrseiten-Modus aktiv
                  </h2>
                    <p className="text-lg mb-8 opacity-90">
                    In der finalen Version würden hier separate Seiten für Services, Team, Portfolio und Kontakt existieren. Diese kompakte Ansicht zeigt nur die wichtigsten Bereiche als Preview.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Services', 'Team', 'Portfolio', 'Kontakt'].map((item, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-4 shadow border border-white/20"
                          style={{ borderRadius: 'var(--radius-card)' }}>
                          <h3 className="font-semibold">{item}</h3>
                          <p className="text-sm opacity-80">Eigene Seite</p>
                    </div>
                      ))}
                  </div>
                </div>
              </div>
            </section>
            </SectionWrapper>
          </>
        )}
        
        <Footer content={content} />
        
        {/* Marketing Features - Floating */}
        <WhatsAppWidget isEnabled={features.whatsappWidget} />
        <CallbackPopup isEnabled={features.callbackPopup} />
        <PromoBanner isEnabled={features.promoBanner} />
        
        {/* Mobile Speed Dial - nur wenn aktiviert */}
        {features.speedDial && (
          <SpeedDial 
            phoneNumber={content.contact.phone}
            onEmailClick={scrollToContact}
          />
        )}
      </div>

      {/* Configurator Overlay */}
      {showConfigurator && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-full md:max-w-4xl md:w-full md:max-h-[90vh] md:h-auto flex flex-col md:m-4"
            style={{ borderRadius: 'var(--radius-modal)' }}>
            
            {/* Mobile Header with Close Button */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Website-Konfigurator
              </h1>
              <button
                onClick={() => setShowConfigurator(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            {/* Desktop Close Button - Top Right */}
            <div className="hidden md:block absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowConfigurator(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                style={{ borderRadius: 'var(--radius-button)' }}
                aria-label="Konfigurator schließen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 md:p-8 pb-4">
                
                {/* Header - Desktop only */}
                <div className="hidden md:block text-center mb-12">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Webseiten Erstellung
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Ich habe bereits eine Webseite für Sie vorbereitet. Sie haben nun die Möglichkeit zwischen Umfang, Design und Farbe zu entscheiden. Dies dient als Inspiration für Ihre finale Website.
                  </p>
                </div>
                
                {/* Mobile Header Description */}
                <div className="md:hidden text-center mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Wählen Sie Umfang, Design und Farbe für Ihre Website-Inspiration
                  </p>
                </div>

                {/* Configuration Steps */}
                <div className="space-y-4 md:space-y-6">
                  
                  {/* Schritt 1: Layout Type - Collapsible */}
                  <div className="bg-white dark:bg-gray-800 p-4 md:p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                    style={{ borderRadius: 'var(--radius-card)' }}>
                    <div className="flex items-center mb-4 md:mb-6">
                      <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 flex items-center justify-center font-medium mr-4 text-sm"
                        style={{ borderRadius: 'var(--radius-button)' }}>
                        1
                      </div>
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                        Website-Umfang festlegen
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <button
                        onClick={() => handleConfigChange('layoutType', 'onepage')}
                        className={`group p-4 md:p-6 border-2 transition-all duration-500 text-center transform hover:scale-105 min-h-[120px] md:min-h-auto ${
                          config.layoutType === 'onepage'
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                        }`}
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                          style={{ borderRadius: 'var(--radius-card)' }}>
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            config.layoutType === 'onepage' 
                              ? 'text-orange-600 dark:text-orange-400' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                          </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Kompakte Website</h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                          Alle Inhalte auf einer Seite - perfekt für kleinere Betriebe
                        </p>
                      </button>

                      <button
                        onClick={() => handleConfigChange('layoutType', 'multipage')}
                        className={`group p-4 md:p-6 border-2 transition-all duration-500 text-center transform hover:scale-105 min-h-[120px] md:min-h-auto ${
                          config.layoutType === 'multipage'
                            ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                        }`}
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                          style={{ borderRadius: 'var(--radius-card)' }}>
                          <svg className={`w-5 h-5 md:w-6 md:h-6 ${
                            config.layoutType === 'multipage' 
                              ? 'text-orange-600 dark:text-orange-400' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2V8z"/>
                            </svg>
                          </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">Erweiterte Website</h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                          Separate Unterseiten für umfangreichere Inhalte und bessere Navigation
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Schritt 2: Design-Stil - Collapsible */}
                  {config.layoutType && (
                    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
                      config.layoutType ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`} style={{ borderRadius: 'var(--radius-card)' }}>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, designExpanded: !prev.designExpanded }))}
                        className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 min-h-[60px]"
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 flex items-center justify-center font-medium mr-4 text-sm"
                            style={{ borderRadius: 'var(--radius-button)' }}>
                            2
                          </div>
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                            Design-Stil wählen
                          </h2>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.designExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.designExpanded && (
                        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
                            {[
                              { 
                                key: 'angular', 
                                name: 'Klassisch', 
                                desc: 'Geteilter Hero, scharfe Kanten',
                                Icon: MdViewQuilt,
                                color: 'indigo'
                              },
                              { 
                                key: 'rounded', 
                                name: 'Halb Modern', 
                                desc: 'Hintergrundbild, sanfte Rundungen',
                                Icon: MdImage,
                                color: 'purple'
                              },
                              { 
                                key: 'curved', 
                                name: 'Modern', 
                                desc: 'Slider, fließende Formen',
                                Icon: MdViewCarousel,
                                color: 'orange'
                              },
                              { 
                                key: 'circular', 
                                name: 'Sehr Modern', 
                                desc: 'Video-Hero, maximale Rundungen',
                                Icon: MdPlayCircleFilled,
                                color: 'teal'
                              }
                            ].map((design) => (
                              <button
                                key={design.key}
                                onClick={() => handleConfigChange('designStyle', design.key)}
                                className={`group p-3 md:p-6 border-2 transition-all duration-500 text-center transform hover:scale-105 min-h-[120px] md:min-h-auto ${
                                  config.designStyle === design.key
                                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                                }`}
                                style={{ borderRadius: 'var(--radius-card)' }}
                              >
                                <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
                                  style={{ borderRadius: 'var(--radius-card)' }}>
                                  <design.Icon className={`w-4 h-4 md:w-6 md:h-6 ${
                                    config.designStyle === design.key 
                                      ? 'text-orange-600 dark:text-orange-400' 
                                      : 'text-gray-600 dark:text-gray-400'
                                  }`} />
                                </div>
                                <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{design.name}</h3>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 hidden md:block">{design.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schritt 3: Farbschema - Collapsible */}
                  {config.designStyle && (
                    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
                      config.designStyle ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`} style={{ borderRadius: 'var(--radius-card)' }}>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, colorExpanded: !prev.colorExpanded }))}
                        className="w-full p-4 md:p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 min-h-[60px]"
                        style={{ borderRadius: 'var(--radius-card)' }}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 flex items-center justify-center font-medium mr-4 text-sm"
                            style={{ borderRadius: 'var(--radius-button)' }}>
                            3
                          </div>
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                            Farbschema wählen
                          </h2>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.colorExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.colorExpanded && (
                        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                            {[
                              { 
                                key: 'handwerker', 
                                name: 'Braun', 
                                desc: 'Traditionell & vertrauenswürdig',
                                colors: ['#8B4513', '#5D4037', '#D2691E', '#A0522D'],
                                accent: 'bg-amber-700'
                              },
                              { 
                                key: 'rot', 
                                name: 'Rot', 
                                desc: 'Kraftvoll & energisch',
                                colors: ['#C62828', '#8E24AA', '#FF5722', '#D32F2F'],
                                accent: 'bg-red-600'
                              },
                              { 
                                key: 'blau', 
                                name: 'Blau', 
                                desc: 'Professionell & vertrauensvoll',
                                colors: ['#1565C0', '#0D47A1', '#42A5F5', '#1976D2'],
                                accent: 'bg-blue-600'
                              },
                              { 
                                key: 'schlicht', 
                                name: 'Schlicht', 
                                desc: 'Minimalistisch & elegant',
                                colors: ['#212121', '#424242', '#757575', '#616161'],
                                accent: 'bg-gray-600'
                              }
                            ].map((color) => (
                              <button
                                key={color.key}
                                onClick={() => handleConfigChange('colorScheme', color.key)}
                                className={`group p-3 md:p-6 border-2 transition-all duration-500 text-center transform hover:scale-105 min-h-[120px] md:min-h-auto ${
                                  config.colorScheme === color.key
                                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                                }`}
                                style={{ borderRadius: 'var(--radius-card)' }}
                              >
                                {/* Color Palette Display */}
                                <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 grid grid-cols-2 gap-0.5 p-1 bg-white dark:bg-gray-800"
                                  style={{ borderRadius: 'var(--radius-card)' }}>
                                {color.colors.map((colorHex, index) => (
                                  <div 
                                    key={index}
                                      className="transition-transform duration-300 group-hover:scale-110"
                                      style={{ backgroundColor: colorHex, borderRadius: 'var(--radius-sm)' }}
                                  ></div>
                                ))}
                              </div>
                                <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{color.name}</h3>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 hidden md:block">{color.desc}</p>
                              </button>
                            ))}
                          </div>
                          
                          {/* Hinweis auf erweiterte Farbpaletten */}
                          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                            style={{ borderRadius: 'var(--radius-card)' }}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                  🎨 Erweiterte Farbpaletten verfügbar
                                </h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                  Jedes Schema enthält jetzt 10 Abstufungen (50-900) für professionelle Designs
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  setShowConfigurator(false)
                                  setShowColorConfigurator(true)
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                                style={{ borderRadius: 'var(--radius-button)' }}
                              >
                                Anpassen
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schritt 4: Features */}
                  {config.colorScheme && (
                    <div className="border border-gray-200 dark:border-gray-600 mb-4 md:mb-6 transition-all duration-500 animate-in slide-in-from-top-2"
                      style={{ borderRadius: 'var(--radius-card)' }}>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, featuresExpanded: !prev.featuresExpanded }))}
                        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-600 dark:bg-gray-400 text-white dark:text-gray-900 flex items-center justify-center font-medium mr-4 text-sm"
                            style={{ borderRadius: 'var(--radius-button)' }}>
                            4
                          </div>
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                            Marketing-Features
                          </h2>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.featuresExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.featuresExpanded && (
                        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="space-y-4">
                            {/* Sonderangebot-Banner */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="promoBanner"
                                checked={features.promoBanner}
                                onChange={(e) => setFeatures(prev => ({ ...prev, promoBanner: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="promoBanner" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  Sonderangebot-Banner
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Animierter Banner mit Countdown-Timer für zeitlich begrenzte Angebote
                                </p>
                              </div>
                            </div>

                            {/* Kontakt-Leiste */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="contactBar"
                                checked={features.contactBar}
                                onChange={(e) => setFeatures(prev => ({ ...prev, contactBar: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="contactBar" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  Fixe Kontakt-Leiste
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Telefon, E-Mail und Öffnungszeiten immer sichtbar über dem Header
                                </p>
                              </div>
                            </div>

                            {/* Notdienst-Alert */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="notdienstAlert"
                                checked={features.notdienstAlert}
                                onChange={(e) => setFeatures(prev => ({ ...prev, notdienstAlert: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="notdienstAlert" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  Notdienst-Alert
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Auffällige rote Leiste für 24h-Notdienst mit direktem Anruf-Button
                                </p>
                              </div>
                            </div>

                            {/* WhatsApp Widget */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="whatsappWidget"
                                checked={features.whatsappWidget}
                                onChange={(e) => setFeatures(prev => ({ ...prev, whatsappWidget: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="whatsappWidget" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  WhatsApp Chat
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Floating WhatsApp-Button für schnelle Kundenanfragen
                                </p>
                              </div>
                            </div>

                            {/* Callback Popup */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="callbackPopup"
                                checked={features.callbackPopup}
                                onChange={(e) => setFeatures(prev => ({ ...prev, callbackPopup: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="callbackPopup" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  Rückruf-Service
                                </label>
                                                                 <p className="text-sm text-gray-600 dark:text-gray-300">
                                   &quot;Wir rufen Sie zurück&quot; Popup nach 30 Sekunden Verweildauer
                                 </p>
                              </div>
                            </div>

                            {/* Speed Dial */}
                            <div className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              style={{ borderRadius: 'var(--radius-card)' }}>
                              <input
                                type="checkbox"
                                id="speedDial"
                                checked={features.speedDial}
                                onChange={(e) => setFeatures(prev => ({ ...prev, speedDial: e.target.checked }))}
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                                style={{ borderRadius: 'var(--radius-sm)' }}
                              />
                              <div className="flex-1">
                                <label htmlFor="speedDial" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                                  Speed Dial Buttons
                                </label>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Floating Action Buttons für Anruf, E-Mail und Kontakt
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Progress Indicator */}
                <div className="mt-6 md:mt-8 mb-4 md:mb-6">
                  <div className="flex justify-center space-x-3 md:space-x-4">
                    {[
                      { step: 1, completed: !!config.layoutType, label: 'Umfang' },
                      { step: 2, completed: !!config.designStyle, label: 'Design' },
                      { step: 3, completed: !!config.colorScheme, label: 'Farbe' },
                      { step: 4, completed: config.featuresExpanded, label: 'Features' }
                    ].map((item) => (
                      <div key={item.step} className="flex items-center">
                        <div className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center ${
                          item.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        style={{ borderRadius: 'var(--radius-button)' }}>
                          {item.completed ? (
                            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                            </svg>
                          ) : (
                            <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400" style={{ borderRadius: 'var(--radius-button)' }}></div>
                          )}
                        </div>
                        <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Fixed Footer with Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 md:rounded-b-2xl">
              <div className="p-4 md:p-6">
                <div className="text-center">
                  <button
                    className={`w-full md:w-auto px-6 md:px-8 py-4 md:py-3 font-medium text-base md:text-base transition-all duration-200 ${
                      config.layoutType && config.designStyle && config.colorScheme && !isGenerating
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400'
                    }`}
                    style={{ borderRadius: 'var(--radius-button)' }}
                    onClick={handleGenerate}
                    disabled={!config.layoutType || !config.designStyle || !config.colorScheme || isGenerating}
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <ModernSpinner variant="dots" size="sm" color="white" className="mr-3" />
                        <span className="hidden md:inline">Website wird angepasst...</span>
                        <span className="md:hidden">Wird angepasst...</span>
                      </div>
                    ) : (
                      <>
                        <span className="hidden md:inline">Anpassungen übernehmen</span>
                        <span className="md:hidden">Übernehmen</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Configurator Toggle Button - links unten */}
      <ConfiguratorButton
        onClick={() => setShowConfigurator(true)}
      />

      {/* Color Configurator Overlay */}
      <ColorConfigurator
        isOpen={showColorConfigurator}
        onClose={() => setShowColorConfigurator(false)}
      />
    </div>
  )
} 