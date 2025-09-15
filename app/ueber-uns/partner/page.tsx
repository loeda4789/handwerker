'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import PageLayout from '../../components/layout/PageLayout'
import { PageHero } from '@/components/layout'

export default function PartnerPage() {
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
      loadingText="Partner wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Unsere Partner"
        subtitle="Wir arbeiten mit vertrauensvollen Partnern zusammen, um Ihnen die beste Qualität und den besten Service zu bieten."
      />

      {/* Partner Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Vertrauensvolle Zusammenarbeit
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Unsere langjährigen Partnerschaften mit führenden Herstellern und Lieferanten ermöglichen es uns, Ihnen stets die neuesten Technologien und höchste Qualität zu bieten.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Partner-Informationen werden hier in Kürze verfügbar sein.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}