'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import { useContentWithUrlParams } from '@/lib/hooks/useUrlParams'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ModernSpinner from '@/components/ModernSpinner'
import ConfiguratorButton from '@/components/ConfiguratorButton'

export default function ServicesPage() {
  const [baseContent, setBaseContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [designStyle, setDesignStyle] = useState<string>('rounded')

  // Verwende den URL-Parameter-Hook für automatische URL-Parameter-Integration
  const content = useContentWithUrlParams(baseContent || {} as ContentData)

  // Design-Style aus localStorage laden
  useEffect(() => {
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
    }
    
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    return () => window.removeEventListener('storage', handleDesignStyleChange)
  }, [])

  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'

  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  useEffect(() => {
    // Content basierend auf URL-Parameter laden
    const loadContent = () => {
      try {
        // Branche aus URL-Parametern lesen oder Standard auf 'elektriker' setzen
        const urlParams = new URLSearchParams(window.location.search)
        const branche = urlParams.get('branche') || 'elektriker'
        
        // Branche in localStorage setzen für getContentDataByBranche
        localStorage.setItem('selected-branche', branche)
        
        const loadedContent = getContentDataByBranche()
        setBaseContent(loadedContent)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Services werden geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header content={content} />
      
      {/* Hero Section für Services */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">Unsere Leistungen</span>
            ) : (
              'Unsere Leistungen'
            )}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Professionelle Handwerksarbeit in allen Bereichen - von der Planung bis zur Ausführung
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 font-heading">
              {designStyle === 'modern' ? (
                <span className="heading-underline">Alle Leistungen</span>
              ) : (
                'Alle Leistungen'
              )}
            </h2>
            <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
              Entdecken Sie unser vollständiges Leistungsspektrum
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => {
              const serviceSlug = `leistung-${index + 1}`
              
              return (
                <div 
                  key={index} 
                  className="bg-surface dark:bg-dark overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 cursor-pointer animate-on-scroll"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        style={{ borderRadius: 'var(--radius-image)' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-16 h-16 text-primary/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <p className="text-primary/60 font-medium">{service.title}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Projects Counter Badge */}
                    {service.projects && service.projects.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <span className="text-white px-3 py-1 text-sm font-medium"
                          style={{ 
                            backgroundColor: 'var(--color-secondary)',
                            borderRadius: 'var(--radius-button)' 
                          }}>
                          {service.projects.length} Projekt{service.projects.length !== 1 ? 'e' : ''}
                        </span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <p className="text-lg font-medium">Mehr erfahren</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text dark:text-light mb-3">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/70 mb-4">
                      {service.description}
                    </p>
                    
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors group-hover:translate-x-1"
                    >
                      Mehr erfahren
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Bereit für Ihr Projekt?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 rounded-lg"
            >
              Jetzt anfragen
            </Link>
            <Link
              href={`tel:${content.contact.phone}`}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Anrufen
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
      
      {/* Configurator Button */}
      <ConfiguratorButton onClick={() => window.location.href = '/'} />
    </main>
  )
} 