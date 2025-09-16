'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useThemeColors } from '../hooks/useThemeColors'
import PageLayout from '../components/layout/PageLayout'
import { PageHero, SectionHeading } from '@/components/layout'
import PVCalculator from '@/components/content/PVCalculator'
import { useSiteVariant } from '@/contexts/AppConfigContext'

export default function PVRechnerPage() {
  const { content, loading, error } = usePageContent()
  const { classes } = useThemeColors()
  const { siteVariant } = useSiteVariant()

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

  // Nur für Premium-Variante anzeigen
  if (siteVariant !== 'premium') {
    return (
      <PageLayout 
        content={content} 
        loading={loading} 
        loadingText="PV-Rechner wird geladen..."
        showContactBar={false}
        showSideContact={false}
        showConfigCard={false}
      >
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-text mb-4">Premium-Feature</h1>
            <p className="text-text-secondary mb-6">
              Der PV-Rechner ist nur in der Premium-Variante verfügbar. 
              Bitte kontaktieren Sie uns für ein Upgrade.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout 
      content={content} 
      loading={loading} 
      loadingText="PV-Rechner wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="PV-Rechner"
        subtitle="Berechnen Sie Ihre optimale Photovoltaikanlage und sparen Sie bares Geld. Kostenlos, unverbindlich und in wenigen Minuten."
      />

      {/* PV-Rechner Komponente */}
      <PVCalculator content={content} />

      {/* Zusätzliche Informationen */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <SectionHeading
                title="Warum Photovoltaik?"
                subtitle="Investieren Sie in die Zukunft und sparen Sie langfristig Geld"
                level={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background rounded-lg shadow-lg" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Kosteneinsparung</h3>
                <p className="text-text-secondary">
                  Sparen Sie bis zu 80% Ihrer Stromkosten und amortisieren Sie Ihre Anlage in 8-12 Jahren.
                </p>
              </div>

              <div className="text-center p-6 bg-background rounded-lg shadow-lg" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Umweltschutz</h3>
                <p className="text-text-secondary">
                  Reduzieren Sie Ihren CO2-Fußabdruck und leisten Sie einen Beitrag zum Klimaschutz.
                </p>
              </div>

              <div className="text-center p-6 bg-background rounded-lg shadow-lg" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">Unabhängigkeit</h3>
                <p className="text-text-secondary">
                  Werden Sie unabhängiger von steigenden Strompreisen und Stromausfällen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bereit für Ihre Photovoltaikanlage?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Kontaktieren Sie uns für eine kostenlose Beratung und ein unverbindliches Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#kontakt"
                className="inline-flex items-center px-8 py-4 bg-white text-primary font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Kostenloses Angebot anfordern
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href={`tel:${content?.contact?.phone || ''}`}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium transition-all duration-300 hover:bg-white hover:text-primary"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
