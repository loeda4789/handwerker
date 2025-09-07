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
import { notFound } from 'next/navigation'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ServicePage({ params }: ServicePageProps) {
  const [baseContent, setBaseContent] = useState<ContentData | null>(null)
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')
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

  // Initialen Content laden
  useEffect(() => {
    const loadContent = () => {
      try {
        // Branche aus URL-Parametern lesen oder Standard auf 'elektriker' setzen
        const urlParams = new URLSearchParams(window.location.search)
        const branche = urlParams.get('branche') || 'elektriker'
        
        // Branche in localStorage setzen für getContentDataByBranche
        localStorage.setItem('selected-branche', branche)
        
        const loadedContent = getContentDataByBranche()
        console.log('Loading content for branche:', branche)
        console.log('Loaded content:', loadedContent)
        
        setBaseContent(loadedContent)
        setLoading(false)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  useEffect(() => {
    // Params asynchron laden (Next.js 15)
    const loadParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    
    loadParams()
  }, [params])

  // Service finden basierend auf content (mit URL-Parametern)
  useEffect(() => {
    if (!content || !content.services || !slug) return

    const foundService = content.services.find(s => s.slug === slug)
    console.log('Found service from content with URL params:', foundService)
    
    if (foundService) {
      setService(foundService)
    } else {
      console.error('Service not found for slug:', slug)
      // Fallback: Verwende ersten Service wenn slug nicht gefunden
      if (content.services.length > 0) {
        setService(content.services[0])
      }
    }
  }, [content, slug])

  if (loading || !content || !content.services) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Service wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text dark:text-light mb-4">Service nicht gefunden</h1>
          <p className="text-text-secondary dark:text-light/80 mb-6">Der angeforderte Service konnte nicht gefunden werden.</p>
          <Link href="/" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  const currentServiceIndex = content.services.findIndex((s: any) => s.title === service.title)
  const otherServices = content.services.filter((_: any, index: number) => index !== currentServiceIndex)

  return (
    <main className="min-h-screen">
      <Header content={content} />
      
     

      {/* Hero Section mit Service-Bild als Hintergrund */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Service-Bild als Hintergrund */}
        {service.image && (
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              quality={90}
              priority
            />
            {/* Overlay für bessere Textlesbarkeit */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        
        {/* Hero-Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            
            {/* Service Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
              {designStyle === 'modern' ? (
                <span className="heading-underline-large">{service.title}</span>
              ) : (
                service.title
              )}
            </h1>
            
            {/* Service Description */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              {service.description}
            </p>
            
            
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Service Title */}
            <div className="text-center mb-8 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 font-heading">
                Über {service.title}
              </h2>
            </div>

            {/* Detail Text */}
            {service.detailText && (
              <div className="max-w-4xl mx-auto mb-16 animate-on-scroll">
                <p className="text-lg leading-relaxed text-text-secondary dark:text-light/80 text-center">
                  {service.detailText}
                </p>
              </div>
            )}

            {/* Gallery */}
            {service.gallery && service.gallery.length > 0 && (
              <div className="animate-on-scroll">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 font-heading">
                    {designStyle === 'modern' ? (
                      <span className="heading-underline">Unsere Arbeiten</span>
                    ) : (
                      'Unsere Arbeiten'
                    )}
                  </h2>
                  <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
                    Überzeugen Sie sich von der Qualität unserer {service.title.toLowerCase()}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.gallery.map((image: string, index: number) => (
                    <div 
                      key={index} 
                      className="relative h-64 overflow-hidden hover:scale-105 transition-transform duration-300 group cursor-pointer"
                      style={{ borderRadius: 'var(--radius-card)' }}
                    >
                      <Image
                        src={image}
                        alt={`${service.title} Bild ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        quality={80}
                      />
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interesse an {service.title}?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#kontakt"
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

      {/* Weitere Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Weitere Leistungen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Entdecken Sie unser vollständiges Leistungsspektrum
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherServices.slice(0, 3).map((otherService: any, index: number) => {
              const otherServiceIndex = content.services.findIndex((s: any) => s.title === otherService.title)
              const otherServiceSlug = `leistung-${otherServiceIndex + 1}`
              
              return (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">{otherService.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {otherService.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {otherService.description}
                  </p>
                  <Link
                    href={`/services/${otherServiceSlug}`}
                    className="inline-flex items-center text-primary hover:text-accent font-medium transition-colors"
                  >
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </Link>
                </div>
              )
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
                              className="inline-flex items-center px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }}
            >
              Alle Leistungen ansehen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer content={content} />
    </main>
  )
} 