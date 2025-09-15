'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import PageLayout from '../../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
import Team from '@/components/content/Team'

export default function TeamPage() {
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
      loadingText="Team wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Unser Team"
        subtitle="Lernen Sie die Menschen kennen, die hinter jedem erfolgreichen Projekt stehen. Unser erfahrenes Team aus Fachkräften sorgt für Qualität und Zuverlässigkeit."
      />

      {/* Teamphilosophie */}
      <section className="py-16 bg-background dark:bg-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
              Gemeinsam stark
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-6 bg-surface dark:bg-dark-secondary" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text dark:text-light mb-3">
                  🤝 Teamwork im Mittelpunkt
                </h3>
                <p className="text-text-secondary dark:text-light/80">
                  Bei uns arbeitet jeder Hand in Hand. Von der Planung bis zur Fertigstellung unterstützen sich unsere Fachkräfte gegenseitig, um das bestmögliche Ergebnis zu erzielen.
                </p>
              </div>
              
              <div className="p-6 bg-surface dark:bg-dark-secondary" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text dark:text-light mb-3">
                  📚 Kontinuierliche Weiterbildung
                </h3>
                <p className="text-text-secondary dark:text-light/80">
                  Handwerk entwickelt sich ständig weiter. Deshalb investieren wir in regelmäßige Schulungen und Fortbildungen, damit unser Team immer auf dem neuesten Stand der Technik ist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Komponente */}
      <Team content={content} />

      {/* Arbeitsklima & Werte */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Was uns auszeichnet
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Unser Arbeitsklima und unsere Werte machen den Unterschied
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Sichere Arbeitsplätze
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Langfristige Perspektiven, faire Bezahlung und ein sicherer Arbeitsplatz in einem wachsenden Unternehmen.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Vielfältige Projekte
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Abwechslungsreiche Aufgaben von kleinen Reparaturen bis hin zu großen Neubauprojekten sorgen für Spannung im Berufsalltag.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Karrierechancen
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Wir fördern unsere Mitarbeiter aktiv und bieten echte Aufstiegsmöglichkeiten vom Gesellen bis zur Führungsposition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bewerbungssektion */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Werde Teil unseres Teams!
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Du suchst einen Arbeitsplatz mit Perspektive? Dann bewirb dich bei uns!
              </p>
            </div>
            
            {/* Aktuelle Stellenausschreibungen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🔨 Fachkraft (m/w/d)
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li>• Abgeschlossene Berufsausbildung</li>
                  <li>• Mindestens 2 Jahre Berufserfahrung</li>
                  <li>• Führerschein Klasse B</li>
                  <li>• Teamfähigkeit und Zuverlässigkeit</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Vollzeit • Unbefristet • Faire Bezahlung
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🎓 Auszubildende (m/w/d)
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                  <li>• Hauptschulabschluss oder höher</li>
                  <li>• Interesse am Handwerk</li>
                  <li>• Motivation und Lernbereitschaft</li>
                  <li>• Technisches Verständnis</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ausbildungsplatz • 3 Jahre • Übernahmegarantie
                </p>
              </div>
            </div>

            {/* Bewerbungsprozess */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                So läuft deine Bewerbung ab
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Bewerbung senden</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Per E-Mail oder Post mit Lebenslauf und Zeugnissen
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Persönliches Gespräch</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Kennenlernen bei einem lockeren Gespräch
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">Arbeitsplatz sichern</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Bei gegenseitigem Interesse startest du bei uns durch
                  </p>
                </div>
              </div>
            </div>

            {/* Kontakt für Bewerbungen */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Interesse geweckt?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sende deine Bewerbungsunterlagen an:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`mailto:${content?.contact?.email || ''}?subject=Bewerbung&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Ahiermit bewerbe ich mich um eine Stelle in Ihrem Unternehmen.%0D%0A%0D%0AMit freundlichen Grüßen`}
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  📧 E-Mail senden
                </a>
                
                <a 
                  href={`tel:${content?.contact?.phone || ''}`}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  📞 Anrufen
                </a>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Oder schick deine Unterlagen per Post an:<br/>
                {content?.contact?.address || ''}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}