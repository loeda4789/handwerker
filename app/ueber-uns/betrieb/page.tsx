'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import PageLayout from '../../components/layout/PageLayout'
import About from '@/components/content/About'
import Stats from '@/components/content/Stats'

export default function BetriebPage() {
  const { content, loading, error } = usePageContent()

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
      loadingText="Betrieb wird geladen..."
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Unser Betrieb
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Lernen Sie unseren Betrieb kennen - von der Firmengeschichte bis zu unseren Werten und der modernen Ausstattung.
            </p>
          </div>
        </div>
      </section>

      {/* About Komponente */}
      <About content={content} />

      {/* Stats Komponente */}
      <Stats content={content} />
    </PageLayout>
  )
}