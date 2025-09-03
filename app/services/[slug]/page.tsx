'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
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
  const [content, setContent] = useState<ContentData | null>(null)
  const [service, setService] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    // Params asynchron laden (Next.js 15)
    const loadParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    
    loadParams()
  }, [params])

  useEffect(() => {
    if (!slug) return

    // Content basierend auf URL-Parameter laden
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setContent(loadedContent)
        
        // Service basierend auf Slug finden
        const foundService = loadedContent.services.find(s => s.slug === slug)
        if (foundService) {
          setService(foundService)
        } else {
          // Service nicht gefunden
          notFound()
        }
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Service wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!content || !service) {
    notFound()
  }

  const currentServiceIndex = content.services.findIndex((s: any) => s.title === service.title)
  const otherServices = content.services.filter((_: any, index: number) => index !== currentServiceIndex)

  return (
    <main className="min-h-screen">
      <Header content={content} />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <Link href="/" className="hover:text-primary transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">
              Leistungen
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">{service.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section für Service */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-8xl mb-6">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Hero Image */}
            {service.image && (
              <div className="relative h-96 md:h-[500px] mb-12 rounded-lg overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            )}

            {/* Service Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h1>
            </div>

            {/* Detail Text */}
            {service.detailText && (
              <div className="max-w-4xl mx-auto mb-16">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                  {service.detailText}
                </p>
              </div>
            )}

            {/* Gallery */}
            {service.gallery && service.gallery.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Unsere Arbeiten
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.gallery.map((image: string, index: number) => (
                    <div key={index} className="relative h-64 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                      <Image
                        src={image}
                        alt={`${service.title} Bild ${index + 1}`}
                        fill
                        className="object-cover"
                        quality={80}
                      />
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
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Jetzt Anfrage stellen
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
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