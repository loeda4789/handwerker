'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useThemeColors } from '../hooks/useThemeColors'
import PageLayout from '../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
import Portfolio from '@/components/content/Portfolio'
import Testimonials from '@/components/content/Testimonials'
import Stats from '@/components/content/Stats'

export default function ReferenzenPage() {
  const { content, loading, error } = usePageContent()
  const { classes } = useThemeColors()

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
      loadingText="Referenzen werden geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Unsere Referenzen"
        subtitle="Entdecken Sie unsere erfolgreichen Projekte und lesen Sie, was unsere zufriedenen Kunden über unsere Arbeit sagen."
      />

      {/* Stats Komponente - Zeigt unsere Erfolge */}
      <Stats content={content} />

      {/* Portfolio Komponente - Zeigt unsere Projekte */}
      <Portfolio content={content} />

      {/* Testimonials Komponente - Kundenbewertungen */}
      <Testimonials content={content} />

      {/* Zusätzlicher Bereich für weitere Referenzen */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Warum Kunden uns vertrauen
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Über Jahre haben wir uns durch Qualität, Zuverlässigkeit und Kundenzufriedenheit einen ausgezeichneten Ruf erarbeitet.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Qualität */}
              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  Höchste Qualität
                </h3>
                <p className="text-text-secondary">
                  Wir verwenden nur hochwertige Materialien und modernste Techniken für dauerhafte Ergebnisse.
                </p>
              </div>

              {/* Zuverlässigkeit */}
              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  Termingerechte Ausführung
                </h3>
                <p className="text-text-secondary">
                  Pünktlichkeit ist für uns selbstverständlich. Wir halten unsere Termine ein und informieren Sie über jeden Schritt.
                </p>
              </div>

              {/* Kundenservice */}
              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-3">
                  Persönlicher Service
                </h3>
                <p className="text-text-secondary">
                  Individuelle Beratung und maßgeschneiderte Lösungen für jeden Kunden und jedes Projekt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}