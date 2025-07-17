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

import PromoBanner from '@/components/PromoBanner'
import ContactBar from '@/components/ContactBar'
import NotdienstAlert from '@/components/NotdienstAlert'
import WhatsAppWidget from '@/components/WhatsAppWidget'
import CallbackPopup from '@/components/CallbackPopup'
import CallbackRequest from '@/components/CallbackRequest'
import DesignPreviewButton from '@/components/DesignPreviewButton'

interface ConfigState {
  layoutType: 'onepage' | 'multipage' | ''
  designStyle: 'angular' | 'rounded' | 'modern' | ''
  colorScheme: 'warm' | 'modern' | 'elegant' | ''
  designExpanded: boolean
  colorExpanded: boolean
  featuresExpanded: boolean
  // Adaptive Modi-System
  isFirstVisit: boolean
  quickEditMode: boolean
  activeTab: 'layout' | 'design' | 'color' | 'features'
}

interface FeaturesState {
  promoBanner: boolean
  contactBar: boolean
  notdienstAlert: boolean
  whatsappWidget: boolean
  callbackPopup: boolean
  callbackRequest: boolean
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
    featuresExpanded: false,
    isFirstVisit: true,
    quickEditMode: false,
    activeTab: 'layout'
  })
  const [features, setFeatures] = useState<FeaturesState>({
    promoBanner: false,
    contactBar: false,
    notdienstAlert: false,
    whatsappWidget: false,
    callbackPopup: false,
    callbackRequest: false,
    speedDial: true
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfigurator, setShowConfigurator] = useState(false) // Temporarily disabled - can be re-enabled later

  const [baseContent, setBaseContent] = useState<ContentData | null>(null)
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [forceUpdate, setForceUpdate] = useState(0)
  const [designStyle, setDesignStyle] = useState<string>('angular')
  const [isDesktop, setIsDesktop] = useState(false)
  const router = useRouter()

  // Initialize scroll animations
  useScrollAnimation()

  // Check screen size for modal sizing
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Verwende den URL-Parameter-Hook für automatische URL-Parameter-Integration
  const content = useContentWithUrlParams(baseContent || {} as ContentData)

  // Check if user has visited before and set appropriate mode
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('handwerker-config-saved')
    const savedLayoutType = localStorage.getItem('site-mode')
    const savedDesignStyle = localStorage.getItem('design-style')
    const savedColorScheme = localStorage.getItem('selected-color-scheme')
    
    // Features aus Quick-Einstellungen laden
    const featuresConfig = {
      promoBanner: localStorage.getItem('feature-promoBanner') === 'true',
      contactBar: localStorage.getItem('feature-contactBar') === 'true',
      notdienstAlert: localStorage.getItem('feature-notdienstAlert') === 'true',
      whatsappWidget: localStorage.getItem('feature-whatsappWidget') === 'true',
      callbackPopup: localStorage.getItem('feature-callbackPopup') === 'true',
      callbackRequest: localStorage.getItem('feature-callbackRequest') === 'true',
      speedDial: localStorage.getItem('feature-speedDial') !== 'false' // Default true
    }
    
    setFeatures(featuresConfig)
    
    if (hasVisitedBefore && (savedLayoutType || savedDesignStyle || savedColorScheme)) {
      // Returning user - enable Quick-Edit mode
      setConfig(prev => ({
        ...prev,
        isFirstVisit: false,
        quickEditMode: true,
        layoutType: (savedLayoutType as any) || '',
        designStyle: (savedDesignStyle as any) || '',
        colorScheme: (savedColorScheme as any) || '',
        // In Quick-Edit mode, don't auto-expand sections
        designExpanded: false,
        colorExpanded: false,
        featuresExpanded: false
      }))
    } else {
      // New user - setup mode
      setConfig(prev => ({
        ...prev,
        isFirstVisit: true,
        quickEditMode: false
      }))
    }
  }, [])

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

  // Schemas beim initialen Laden anwenden
  useEffect(() => {
    // Gespeicherte Einstellungen beim Laden anwenden
    const savedDesignStyle = localStorage.getItem('design-style')
    const savedColorScheme = localStorage.getItem('selected-color-scheme')
    
    if (savedDesignStyle) {
      applyBorderRadiusScheme(savedDesignStyle)
      console.log('🔄 Border-Radius-Schema beim Laden angewendet:', savedDesignStyle)
    }
    
    if (savedColorScheme) {
      applyColorScheme(savedColorScheme)
      console.log('🎨 Farbschema beim Laden angewendet:', savedColorScheme)
    }
  }, []) // Nur einmal beim Mount ausführen

  const handleConfigChange = (key: keyof ConfigState, value: string) => {
    setConfig(prev => {
      const newConfig = { ...prev, [key]: value }
      
      // Auto-expand next section
      if (key === 'layoutType' && value && !prev.designStyle) {
        newConfig.designExpanded = true
      } else if (key === 'designStyle' && value && !prev.colorScheme) {
        newConfig.colorExpanded = true
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
      
      // Color scheme für Quick-Edit speichern
      localStorage.setItem('selected-color-scheme', config.colorScheme)
      
      // Features speichern
      Object.entries(features).forEach(([key, value]) => {
        localStorage.setItem(`feature-${key}`, value.toString())
      })
      
      // Mark user as having configured the site
      localStorage.setItem('handwerker-config-saved', 'true')
      
      // Hero type basierend auf design style setzen
      const heroTypeMap = {
        'angular': 'split',
        'rounded': 'single', 
        'modern': 'slider'
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
      <ContactBar 
        isEnabled={features.contactBar} 
        phone={content.contact.phone}
        email={content.contact.email}
      />
      
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
            <SectionWrapper index={2} designStyle={designStyle}>
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
        <CallbackRequest isEnabled={features.callbackRequest} />
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
          <div className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 w-full h-full flex flex-col"
            style={{ 
              borderRadius: 'var(--radius-modal)',
              width: isDesktop ? '90vw' : '100%',
              height: isDesktop ? '98vh' : '100%',
              margin: isDesktop ? '8px' : '0'
            }}>
            
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
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
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
                                name: 'Freundlich', 
                                desc: 'Hintergrundbild, sanfte Rundungen',
                                Icon: MdImage,
                                color: 'green'
                              },
                              { 
                                key: 'modern', 
                                name: 'Modern', 
                                desc: 'Slider-Hero, sehr moderne Buttons',
                                Icon: MdViewCarousel,
                                color: 'purple'
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
                          <div className="flex items-center">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mr-2">
                            Farbschema wählen
                          </h2>

                          </div>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.colorExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.colorExpanded && (
                        <div className="px-4 pb-4 md:px-6 md:pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                            {[
                              { 
                                key: 'warm', 
                                name: 'Warm & Elegant', 
                                desc: 'Traditionell & vertrauenswürdig',
                                colors: ['#291D1E', '#F5A454', '#F6D7AC', '#faf8f5'],
                                accent: 'bg-orange-600'
                              },
                              { 
                                key: 'modern', 
                                name: 'Modern & Energetisch', 
                                desc: 'Kraftvoll & dynamisch',
                                colors: ['#1C1C1C', '#FA3D3B', '#C6C6C6', '#f8f8f8'],
                                accent: 'bg-red-600'
                              },
                              { 
                                key: 'elegant', 
                                name: 'Elegant & Frisch', 
                                desc: 'Professionell & vertrauensvoll',
                                colors: ['#1D2D50', '#B0D7FF', '#FAF7F2', '#f8fafe'],
                                accent: 'bg-blue-600'
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
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                            {[
                              { 
                                key: 'promoBanner', 
                                name: 'Sonderangebot-Banner', 
                                desc: 'Animierter Banner mit Countdown-Timer für zeitlich begrenzte Angebote',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'contactBar', 
                                name: 'Fixe Kontakt-Leiste', 
                                desc: 'Telefon, E-Mail und Öffnungszeiten immer sichtbar über dem Header',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'notdienstAlert', 
                                name: 'Notdienst-Alert', 
                                desc: 'Auffällige rote Leiste für 24h-Notdienst mit direktem Anruf-Button',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'whatsappWidget', 
                                name: 'WhatsApp Chat', 
                                desc: 'Floating WhatsApp-Button für schnelle Kundenanfragen',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'callbackPopup', 
                                name: 'Rückruf-Service', 
                                desc: '&quot;Wir rufen Sie zurück&quot; Popup nach 30 Sekunden Verweildauer',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'callbackRequest', 
                                name: 'Rückruf-Widget', 
                                desc: 'Kleines floating Widget am Rand für schnelle Rückruf-Anfragen',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                  </svg>
                                )
                              },
                              { 
                                key: 'speedDial', 
                                name: 'Speed Dial Buttons', 
                                desc: 'Floating Action Buttons für Anruf, E-Mail und Kontakt',
                                icon: (
                                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                  </svg>
                                )
                              }
                            ].map((feature) => (
                              <button
                                key={feature.key}
                                onClick={() => setFeatures(prev => ({ ...prev, [feature.key]: !prev[feature.key as keyof FeaturesState] }))}
                                className={`group p-3 md:p-6 border-2 transition-all duration-500 text-center transform hover:scale-105 min-h-[120px] md:min-h-auto ${
                                  features[feature.key as keyof FeaturesState]
                                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                                }`}
                                style={{ borderRadius: 'var(--radius-card)' }}
                              >
                                <div className={`w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-4 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex items-center justify-center ${
                                  features[feature.key as keyof FeaturesState] 
                                    ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}
                                  style={{ borderRadius: 'var(--radius-card)' }}>
                                  {feature.icon}
                                </div>
                                <h3 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{feature.name}</h3>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 hidden md:block" dangerouslySetInnerHTML={{ __html: feature.desc }}></p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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



      {/* Design Preview Button (Tab-Navigation) */}
      <DesignPreviewButton />
    </div>
  )
} 