'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useThemeColors } from '../hooks/useThemeColors'
import PageLayout from '../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
import About from '@/components/content/About'
import Stats from '@/components/content/Stats'
import Team from '@/components/content/Team'

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
      {/* Hero Section - H1: Größte Überschrift */}
      <PageHero
        title="Über uns"
        subtitle="Lernen Sie unser Unternehmen kennen - von unserer Geschichte über unser Team bis hin zu unseren Werten und unserer modernen Ausstattung."
      />

      {/* About Komponente - H2: Hauptsektionen */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
                Unsere Geschichte
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Erfahren Sie mehr über unsere Wurzeln, Werte und den Weg, der uns zu dem gemacht hat, was wir heute sind.
              </p>
            </div>
            <About content={content} />
          </div>
        </div>
      </section>

      {/* Stats Komponente - H2: Hauptsektionen */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
                Unsere Erfolge in Zahlen
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Zahlen sprechen für sich - entdecken Sie unsere beeindruckenden Statistiken und Erfolge.
              </p>
            </div>
            <Stats content={content} />
          </div>
        </div>
      </section>

      {/* Team Komponente - H2: Hauptsektionen */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-6">
                Unser Team
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Lernen Sie die Menschen kennen, die hinter unserem Erfolg stehen - erfahrene Fachkräfte mit Leidenschaft für ihr Handwerk.
              </p>
            </div>
            <Team content={content} />
          </div>
        </div>
      </section>

    </PageLayout>
  )
}
