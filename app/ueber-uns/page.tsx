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

    </PageLayout>
  )
}
