'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import { useThemeColors } from '../../hooks/useThemeColors'
import PageLayout from '../../components/layout/PageLayout'
import { PageHero } from '@/components/layout'

export default function PartnerPage() {
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
      loadingText="Partner wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Unsere Partner"
        subtitle="Wir arbeiten mit vertrauensvollen Partnern zusammen, um Ihnen die beste Qualität und den besten Service zu bieten."
      />

      {/* Partner Content */}
      <section className={`py-20 ${classes.background}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold ${classes.text} mb-6`}>
              Vertrauensvolle Zusammenarbeit
            </h2>
            <p className={`text-xl ${classes.textSecondary} mb-12`}>
              Unsere langjährigen Partnerschaften mit führenden Herstellern und Lieferanten ermöglichen es uns, Ihnen stets die neuesten Technologien und höchste Qualität zu bieten.
            </p>
            
            <div className={`${classes.surface} rounded-lg p-8`}>
              <p className={`text-lg ${classes.textSecondary}`}>
                Partner-Informationen werden hier in Kürze verfügbar sein.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}