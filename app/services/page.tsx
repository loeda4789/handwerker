'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useDesignStyle } from '../hooks/useDesignStyle'
import PageLayout from '../components/layout/PageLayout'
import Services from '@/components/content/Services'
import ConfigCard from '@/components/config/ConfigCard'
import Link from 'next/link'

export default function ServicesPage() {
  const { content, loading, error } = usePageContent()
  const { designStyle } = useDesignStyle()

  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  if (error) {
    return (
      <PageLayout 
        content={null} 
        loading={false} 
        loadingText="Fehler beim Laden der Inhalte"
        showContactBar={false}
        showSideContact={false}
        showConfigCard={false}
      >
        <div>Fehler beim Laden der Inhalte</div>
      </PageLayout>
    )
  }

  return (
    <PageLayout 
      content={content} 
      loading={loading} 
      loadingText="Services werden geladen..."
    >
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

      {/* Services mit der erweiterten Komponente */}
      <Services content={content} variant="full" />

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
              href={`tel:${content?.contact?.phone || ''}`}
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
      
      {/* ConfigCard - Website Designer Button */}
      <ConfigCard />
    </PageLayout>
  )
}