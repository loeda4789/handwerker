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

interface ConfigState {
  layoutType: 'onepage' | 'multipage' | ''
  heroType: 'single' | 'slider' | '3d' | 'split' | ''
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | ''
}

export default function HomePage() {
  const [config, setConfig] = useState<ConfigState>({
    layoutType: '',
    heroType: '',
    colorScheme: ''
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
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Sofortiges Update der Website im Hintergrund
    if (key === 'layoutType') {
      console.log('Setting siteMode to:', value)
      setSiteMode(value as 'onepage' | 'multipage')
      // Force re-render
      setForceUpdate(prev => prev + 1)
    }
    
    if (key === 'heroType' && value) {
      localStorage.setItem('demo-hero-type', value)
      // Force re-render of Hero component
      window.dispatchEvent(new Event('hero-type-changed'))
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
      <div className={`transition-all duration-500 ${showConfigurator ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'}`}>
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
            <Testimonials content={content} />
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
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              
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
              <div className="space-y-8">
                
                {/* Schritt 1: Layout Type */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Website-Umfang wählen
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleConfigChange('layoutType', 'onepage')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        config.layoutType === 'onepage'
                          ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Kompakte Website</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Alle Informationen auf einer Seite zum Durchscrollen
                      </p>
                    </button>

                    <button
                      onClick={() => handleConfigChange('layoutType', 'multipage')}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        config.layoutType === 'multipage'
                          ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                          </svg>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Erweiterte Website</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Mehrere Unterseiten für umfangreichere Inhalte
                      </p>
                    </button>
                  </div>
                </div>

                {/* Schritt 2: Hero Type */}
                <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 transition-opacity duration-300 ${
                  config.layoutType ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                      config.layoutType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      2
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Design-Stil wählen
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'single', name: 'Klassisch', icon: 'M4 6h16M4 12h16M4 18h16' },
                      { key: 'slider', name: 'Slider', icon: 'M9 5l7 7-7 7' },
                      { key: '3d', name: '3D Effekt', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10' },
                      { key: 'split', name: 'Geteilt', icon: 'M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m8-6V7a2 2 0 00-2-2h-2m2 2v6a2 2 0 002 2h2' }
                    ].map((hero) => (
                      <button
                        key={hero.key}
                        onClick={() => handleConfigChange('heroType', hero.key)}
                        disabled={!config.layoutType}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                          config.heroType === hero.key
                            ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={hero.icon}/>
                          </svg>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white">{hero.name}</h3>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Schritt 3: Color Scheme */}
                <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 transition-opacity duration-300 ${
                  config.heroType ? 'opacity-100' : 'opacity-50 pointer-events-none'
                }`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                      config.heroType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      3
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Farbschema wählen
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { key: 'blue', name: 'Blau', colors: 'from-blue-500 to-blue-600' },
                      { key: 'green', name: 'Grün', colors: 'from-green-500 to-green-600' },
                      { key: 'purple', name: 'Lila', colors: 'from-purple-500 to-purple-600' },
                      { key: 'orange', name: 'Orange', colors: 'from-orange-500 to-orange-600' }
                    ].map((color) => (
                      <button
                        key={color.key}
                        onClick={() => handleConfigChange('colorScheme', color.key)}
                        disabled={!config.heroType}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          config.colorScheme === color.key
                            ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className={`w-full h-12 bg-gradient-to-r ${color.colors} rounded-lg mb-2`}></div>
                        <h3 className="text-xs font-semibold text-gray-900 dark:text-white">{color.name}</h3>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Generate Button */}
              <div className="text-center mt-8">
                <button
                  onClick={handleGenerate}
                  disabled={!canGenerate || isGenerating}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canGenerate && !isGenerating
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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

              {/* Progress Indicator */}
              <div className="mt-6">
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