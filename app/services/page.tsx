'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import ModernSpinner from '@/components/ModernSpinner'
import ConfiguratorButton from '@/components/ConfiguratorButton'

export default function ServicesPage() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Content basierend auf URL-Parameter laden
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setContent(loadedContent)
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Unsere Leistungen
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Professionelle Handwerksarbeit in allen Bereichen - von der Planung bis zur Ausführung
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.map((service: any, index: number) => {
              const serviceSlug = `leistung-${index + 1}`
              
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Service Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-6xl">{service.icon}</span>
                  </div>
                  
                  {/* Service Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    
                    <Link
                      href={`/services/${serviceSlug}`}
                      className="inline-flex items-center px-6 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              }}
                    >
                      Mehr erfahren
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Bereit für Ihr Projekt?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot
          </p>
          <Link
            href="/kontakt"
                          className="inline-flex items-center px-8 py-4 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg"
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              }}
          >
            Jetzt Kontakt aufnehmen
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </section>

      <Footer content={content} />
      
      {/* Configurator Button */}
      <ConfiguratorButton onClick={() => window.location.href = '/'} />
    </main>
  )
} 