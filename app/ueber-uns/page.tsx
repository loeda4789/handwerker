'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useThemeColors } from '../hooks/useThemeColors'
import PageLayout from '../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
import About from '@/components/content/About'
import Stats from '@/components/content/Stats'
import Team from '@/components/content/Team'
import Link from 'next/link'

export default function UeberUnsPage() {
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
      loadingText="Über uns wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Über uns"
        subtitle="Lernen Sie unser Unternehmen kennen - von unserer Geschichte über unser Team bis hin zu unseren Werten und unserer modernen Ausstattung."
      />

      {/* About Komponente */}
      <About content={content} />

      {/* Stats Komponente */}
      <Stats content={content} />

      {/* Team Komponente */}
      <Team content={content} />

      {/* Weitere Bereiche */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Mehr über uns erfahren
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Entdecken Sie weitere Bereiche unseres Unternehmens
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Unser Betrieb */}
              <Link 
                href="/ueber-uns/betrieb"
                className="group p-6 bg-background hover:bg-surface transition-all duration-300"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    Unser Betrieb
                  </h3>
                  <p className="text-text-secondary">
                    Firmengeschichte, Werte und moderne Ausstattung
                  </p>
                </div>
              </Link>

              {/* Unser Team */}
              <Link 
                href="/ueber-uns/team"
                className="group p-6 bg-background hover:bg-surface transition-all duration-300"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    Unser Team
                  </h3>
                  <p className="text-text-secondary">
                    Lernen Sie unsere Fachkräfte kennen
                  </p>
                </div>
              </Link>

              {/* Unsere Partner */}
              <Link 
                href="/ueber-uns/partner"
                className="group p-6 bg-background hover:bg-surface transition-all duration-300"
                style={{ borderRadius: 'var(--radius-card)' }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 mx-auto mb-4 flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    Unsere Partner
                  </h3>
                  <p className="text-text-secondary">
                    Vertrauensvolle Zusammenarbeit
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
