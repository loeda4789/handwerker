'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import ModernSpinner from '@/components/ModernSpinner'

interface ConfigState {
  layoutType: 'onepage' | 'multipage' | ''
  heroType: 'default' | 'alternative' | ''
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | ''
}

export default function HomePage() {
  const [config, setConfig] = useState<ConfigState>({
    layoutType: '',
    heroType: '',
    colorScheme: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [content, setContent] = useState<ContentData | null>(null)
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
  }, [])

  const handleConfigChange = (key: keyof ConfigState, value: string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const canGenerate = config.layoutType && config.heroType && config.colorScheme

  const handleGenerate = async () => {
    if (!canGenerate) return
    
    setIsGenerating(true)
    
    // Simulate generation process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update URL parameters and navigate
    const params = new URLSearchParams()
    params.set('layout', config.layoutType)
    params.set('hero', config.heroType)
    params.set('color', config.colorScheme)
    
    // Navigate to the generated page
    if (config.layoutType === 'onepage') {
      router.push(`/?${params.toString()}`)
    } else {
      router.push(`/?${params.toString()}`)
    }
    
    setIsGenerating(false)
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Website Konfigurator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Gestalten Sie Ihre perfekte Handwerker-Website in nur 3 einfachen Schritten
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Configuration Steps */}
          <div className="space-y-12">
            
            {/* Schritt 1: Layout Type */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Website-Typ wählen
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleConfigChange('layoutType', 'onepage')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    config.layoutType === 'onepage'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">One-Page Website</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Alles auf einer Seite - Scrolling durch verschiedene Bereiche
                  </p>
                </button>

                <button
                  onClick={() => handleConfigChange('layoutType', 'multipage')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    config.layoutType === 'multipage'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mehrseiten-Website</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Separate Seiten für Kontakt, Services, Team etc.
                  </p>
                </button>
              </div>
            </div>

            {/* Schritt 2: Hero Type */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-opacity duration-300 ${
              config.layoutType ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                  config.layoutType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Startseiten-Design wählen
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleConfigChange('heroType', 'default')}
                  disabled={!config.layoutType}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    config.heroType === 'default'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Standard Design</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Klassisches Layout mit Fokus auf Services und Portfolio
                  </p>
                </button>

                <button
                  onClick={() => handleConfigChange('heroType', 'alternative')}
                  disabled={!config.layoutType}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    config.heroType === 'alternative'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M11 9h2m-2 4h2"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modernes Design</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Innovatives Layout mit Bildrotation und dynamischen Elementen
                  </p>
                </button>
              </div>
            </div>

            {/* Schritt 3: Color Scheme */}
            <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-opacity duration-300 ${
              config.heroType ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 ${
                  config.heroType ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Farbschema wählen
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { key: 'blue', name: 'Blau', colors: 'from-blue-500 to-blue-600', accent: 'bg-blue-500' },
                  { key: 'green', name: 'Grün', colors: 'from-green-500 to-green-600', accent: 'bg-green-500' },
                  { key: 'purple', name: 'Lila', colors: 'from-purple-500 to-purple-600', accent: 'bg-purple-500' },
                  { key: 'orange', name: 'Orange', colors: 'from-orange-500 to-orange-600', accent: 'bg-orange-500' }
                ].map((color) => (
                  <button
                    key={color.key}
                    onClick={() => handleConfigChange('colorScheme', color.key)}
                    disabled={!config.heroType}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      config.colorScheme === color.key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className={`w-full h-16 bg-gradient-to-r ${color.colors} rounded-lg mb-3`}></div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{color.name}</h3>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Generate Button */}
          <div className="text-center mt-12">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating}
              className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                canGenerate && !isGenerating
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <ModernSpinner variant="dots" size="sm" color="white" className="mr-3" />
                  Website wird generiert...
                </div>
              ) : (
                'Website jetzt generieren'
              )}
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="flex justify-center space-x-4">
              {[
                { step: 1, completed: !!config.layoutType, label: 'Website-Typ' },
                { step: 2, completed: !!config.heroType, label: 'Design' },
                { step: 3, completed: !!config.colorScheme, label: 'Farbe' }
              ].map((item) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${
                    item.completed ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 