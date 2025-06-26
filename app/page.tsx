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
import Team from '@/components/Team'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import ProjectProcess from '@/components/ProjectProcess'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import SpeedDial from '@/components/SpeedDial'
import { applyColorScheme } from '@/lib/colorSchemes'
import { MdDescription, MdViewCarousel, MdVideoLibrary, MdViewQuilt } from 'react-icons/md'

interface ConfigState {
  layoutType: 'onepage' | 'multipage' | ''
  heroType: 'single' | 'slider' | 'video' | 'split' | ''
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | ''
  heroExpanded: boolean
  colorExpanded: boolean
}

export default function HomePage() {
  const [config, setConfig] = useState<ConfigState>({
    layoutType: '',
    heroType: '',
    colorScheme: '',
    heroExpanded: false,
    colorExpanded: false
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfigurator, setShowConfigurator] = useState(true)
  const [content, setContent] = useState<ContentData | null>(null)
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage')
  const [forceUpdate, setForceUpdate] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setContent(loadedContent)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
      }
    }
    loadContent()

    // Check URL parameters to determine if we should show the configurator
    const urlParams = new URLSearchParams(window.location.search)
    const hasConfig = urlParams.has('layout') || urlParams.has('hero') || urlParams.has('color')
    
    if (hasConfig) {
      setShowConfigurator(false)
      const layout = urlParams.get('layout')
      if (layout === 'onepage' || layout === 'multipage') {
        setSiteMode(layout)
      }
      
      // Set hero type in localStorage for Hero component
      const heroType = urlParams.get('hero')
      if (heroType) {
        localStorage.setItem('demo-hero-type', heroType)
      }
    }
  }, [])

  useEffect(() => {
    console.log('Current siteMode:', siteMode)
  }, [siteMode])

  const handleConfigChange = (key: keyof ConfigState, value: string) => {
    console.log('Config Change:', key, value)
    setConfig(prev => {
      const newConfig = {
        ...prev,
        [key]: value
      }
      
      // Auto-expand next sections
      if (key === 'layoutType') {
        newConfig.heroExpanded = true
      }
      if (key === 'heroType') {
        newConfig.colorExpanded = true
      }
      
      return newConfig
    })
    
    // Sofortiges Update der Website im Hintergrund
    if (key === 'layoutType') {
      console.log('Setting siteMode to:', value)
      setSiteMode(value as 'onepage' | 'multipage')
      // Speichere in localStorage damit Header es auch sieht
      localStorage.setItem('site-mode', value)
      // Force re-render
      setForceUpdate(prev => prev + 1)
      
      // Event dispatchen damit Header sofort reagiert
      window.dispatchEvent(new Event('site-mode-changed'))
    }
    
    if (key === 'heroType' && value) {
      localStorage.setItem('demo-hero-type', value)
      // Force re-render of Hero component
      window.dispatchEvent(new Event('hero-type-changed'))
    }
    
    // Farbschema sofort anwenden
    if (key === 'colorScheme' && value) {
      applyColorScheme(value)
    }
  }

  const canGenerate = config.layoutType && config.heroType && config.colorScheme

  const handleGenerate = async () => {
    if (!canGenerate) return
    
    setIsGenerating(true)
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Set hero type in localStorage
    localStorage.setItem('demo-hero-type', config.heroType)
    setSiteMode(config.layoutType as 'onepage' | 'multipage')
    // Speichere site-mode für Header
    localStorage.setItem('site-mode', config.layoutType)
    
    // Farbschema anwenden
    applyColorScheme(config.colorScheme)
    
    // Update URL parameters
    const params = new URLSearchParams()
    params.set('layout', config.layoutType)
    params.set('hero', config.heroType)
    params.set('color', config.colorScheme)
    
    // Hide configurator and show website
    setShowConfigurator(false)
    
    // Update URL without page reload
    window.history.pushState({}, '', `/?${params.toString()}`)
    
    setIsGenerating(false)
  }

  const scrollToContact = () => {
    const footerSection = document.getElementById('footer')
    if (footerSection) {
      footerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Services Preview Component for Multi-Page Mode
  const ServicesPreview = () => (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professionelle Handwerksarbeit in allen Bereichen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content?.services.slice(0, 3).map((service: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Wird geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Website */}
      <div className={`transition-all duration-500 ${showConfigurator ? 'opacity-60 blur-[2px]' : 'opacity-100 blur-0'}`}>
        <Header content={content} />
        <Hero content={content} />
        
        {/* One-Page Mode: All Sections */}
        {siteMode === 'onepage' && (
          <>
            <About content={content} />
            <Stats content={content} />
            <Services content={content} />
            <BeforeAfter content={content} />
            <Team content={content} />
            <Testimonials content={content} />
            <ProjectProcess content={content} />
            <Contact content={content} />
          </>
        )}
        
        {/* Multi-Page Mode: Only Previews */}
        {siteMode === 'multipage' && (
          <>
            <About content={content} />
            <Stats content={content} />
            <ServicesPreview />
            
            {/* Multi-Page Demo Section */}
            <section className="py-16 bg-blue-50 dark:bg-blue-900/20">
              <div className="container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100 mb-6">
                    🏢 Mehrseiten-Modus aktiv
                  </h2>
                  <p className="text-lg text-blue-700 dark:text-blue-200 mb-8">
                    In der finalen Version würden hier separate Seiten für Services, Team, Portfolio und Kontakt existieren. Diese kompakte Ansicht zeigt nur die wichtigsten Bereiche als Preview.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Services</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Eigene Seite</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Team</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Eigene Seite</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Portfolio</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Eigene Seite</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Kontakt</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Eigene Seite</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        
        <Footer content={content} />
        
        {/* Mobile Speed Dial */}
        <SpeedDial 
          phoneNumber={content.contact.phone}
          onEmailClick={scrollToContact}
        />
      </div>

      {/* Configurator Overlay */}
      {showConfigurator && (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/30 dark:border-gray-700/30 max-w-4xl w-full max-h-[90vh] flex flex-col">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 pb-4">
                
                {/* Header */}
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Webseiten Erstellung
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Ich habe bereits eine Webseite für Sie vorbereitet. Sie haben nun die Möglichkeit zwischen Umfang, Design und Farbe zu entscheiden. Dies dient als Inspiration für Ihre finale Website.
                  </p>
                </div>

                {/* Configuration Steps */}
                <div className="space-y-6">
                  
                  {/* Schritt 1: Layout Type */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-medium mr-4 text-sm">
                        1
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Website-Umfang wählen
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button
                        onClick={() => handleConfigChange('layoutType', 'onepage')}
                        className={`p-6 rounded-xl border transition-all duration-200 text-left group hover:shadow-md ${
                          config.layoutType === 'onepage'
                            ? 'border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800 shadow-sm'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                            config.layoutType === 'onepage' 
                              ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Kompakte Website</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Alle Informationen auf einer scrollbaren Seite - perfekt für kleinere Betriebe
                        </p>
                      </button>

                      <button
                        onClick={() => handleConfigChange('layoutType', 'multipage')}
                        className={`p-6 rounded-xl border transition-all duration-200 text-left group hover:shadow-md ${
                          config.layoutType === 'multipage'
                            ? 'border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800 shadow-sm'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                            config.layoutType === 'multipage' 
                              ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900' 
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2V8z"/>
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Erweiterte Website</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Separate Unterseiten für umfangreichere Inhalte und bessere Navigation
                        </p>
                      </button>
                    </div>
                  </div>

                  {/* Schritt 2: Hero Design - Collapsible */}
                  {config.layoutType && (
                    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
                      config.layoutType ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, heroExpanded: !prev.heroExpanded }))}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-medium mr-4 text-sm">
                            2
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Design-Stil wählen
                          </h2>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.heroExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.heroExpanded && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {[
                              { 
                                key: 'single', 
                                name: 'Klassisch', 
                                desc: 'Zeitlos & elegant',
                                Icon: MdDescription
                              },
                              { 
                                key: 'slider', 
                                name: 'Slider', 
                                desc: 'Dynamisch & modern',
                                Icon: MdViewCarousel
                              },
                              { 
                                key: 'video', 
                                name: 'Video', 
                                desc: 'Dynamisch & eindrucksvoll',
                                Icon: MdVideoLibrary
                              },
                              { 
                                key: 'split', 
                                name: 'Geteilt', 
                                desc: 'Strukturiert & klar',
                                Icon: MdViewQuilt
                              }
                            ].map((hero) => (
                              <button
                                key={hero.key}
                                onClick={() => handleConfigChange('heroType', hero.key)}
                                className={`group p-6 rounded-xl border transition-all duration-200 text-center hover:shadow-md ${
                                  config.heroType === hero.key
                                    ? 'border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800 shadow-sm'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                                }`}
                              >
                                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                                  <hero.Icon className={`w-8 h-8 ${
                                    config.heroType === hero.key 
                                      ? 'text-gray-900 dark:text-gray-100' 
                                      : 'text-gray-500 dark:text-gray-400'
                                  }`} />
                                </div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{hero.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{hero.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Schritt 3: Color Scheme - Collapsible */}
                  {config.heroType && (
                    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ${
                      config.heroType ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
                    }`}>
                      <button
                        onClick={() => setConfig(prev => ({ ...prev, colorExpanded: !prev.colorExpanded }))}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-medium mr-4 text-sm">
                            3
                          </div>
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Farbschema wählen
                          </h2>
                        </div>
                        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${config.colorExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      
                      {config.colorExpanded && (
                        <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {[
                                                          { 
                              key: 'blue', 
                              name: 'Ocean Blue', 
                              desc: 'Vertrauen & Professionalität',
                              colors: ['#3b82f6', '#1d4ed8', '#1e40af', '#1e3a8a'],
                              accent: 'bg-blue-500'
                            },
                            { 
                              key: 'green', 
                              name: 'Nature Green', 
                              desc: 'Wachstum & Nachhaltigkeit',
                              colors: ['#10b981', '#059669', '#047857', '#065f46'],
                              accent: 'bg-green-500'
                            },
                            { 
                              key: 'purple', 
                              name: 'Royal Purple', 
                              desc: 'Kreativität & Innovation',
                              colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6'],
                              accent: 'bg-purple-500'
                            },
                            { 
                              key: 'orange', 
                              name: 'Energy Orange', 
                              desc: 'Dynamik & Enthusiasmus',
                              colors: ['#f97316', '#ea580c', '#dc2626', '#b91c1c'],
                              accent: 'bg-orange-500'
                            }
                            ].map((color) => (
                              <button
                                key={color.key}
                                onClick={() => handleConfigChange('colorScheme', color.key)}
                                className={`group p-6 rounded-2xl border-2 transition-all duration-500 text-center transform hover:scale-105 ${
                                  config.colorScheme === color.key
                                    ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/20 shadow-xl scale-105'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:shadow-lg'
                                }`}
                              >
                                {/* Color Palette Display */}
                              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 grid grid-cols-2 gap-0.5 p-1 bg-white dark:bg-gray-800">
                                {color.colors.map((colorHex, index) => (
                                  <div 
                                    key={index}
                                    className="rounded-lg"
                                    style={{ backgroundColor: colorHex }}
                                  ></div>
                                ))}
                              </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{color.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{color.desc}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Progress Indicator */}
                <div className="mt-8 mb-6">
                  <div className="flex justify-center space-x-4">
                    {[
                      { step: 1, completed: !!config.layoutType, label: 'Umfang' },
                      { step: 2, completed: !!config.heroType, label: 'Design' },
                      { step: 3, completed: !!config.colorScheme, label: 'Farbe' }
                    ].map((item) => (
                      <div key={item.step} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          item.completed ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Fixed Footer with Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
              <div className="p-6">
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className={`px-8 py-3 rounded-lg font-medium text-base transition-all duration-200 ${
                      canGenerate && !isGenerating
                        ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <ModernSpinner variant="dots" size="sm" color="white" className="mr-3" />
                        Website wird angepasst...
                      </div>
                    ) : (
                      'Anpassungen übernehmen'
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Show Website Button (when configurator is hidden) */}
      {!showConfigurator && (
        <div className="fixed top-4 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={() => setShowConfigurator(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 text-sm"
          >
            Konfigurator öffnen
          </button>
          
          {/* Debug Info */}
          <div className="px-3 py-2 bg-black/80 text-white rounded-lg text-xs backdrop-blur-sm">
            <div>Modus: {siteMode === 'onepage' ? 'One-Page' : 'Mehrseiten'}</div>
            <div>Hero: {typeof window !== 'undefined' ? localStorage.getItem('demo-hero-type') || 'single' : 'single'}</div>
            <div>Config: {config.layoutType || 'none'}</div>
          </div>
        </div>
      )}
    </div>
  )
} 