'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import PageLayout from '../../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
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
      <PageHero
        title="Unser Betrieb"
        subtitle="Lernen Sie unseren Betrieb kennen - von der Firmengeschichte bis zu unseren Werten und der modernen Ausstattung."
      />

      {/* About Komponente */}
      <About content={content} />

      {/* Stats Komponente */}
      <Stats content={content} />
    </PageLayout>
  )
}