'use client'

import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../../hooks/usePageContent'
import { useThemeColors } from '../../hooks/useThemeColors'
import PageLayout from '../../components/layout/PageLayout'
import { PageHero } from '@/components/layout'
import Team from '@/components/content/Team'

export default function TeamPage() {
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
      loadingText="Team wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Unser Team"
        subtitle="Lernen Sie die Menschen kennen, die hinter jedem erfolgreichen Projekt stehen. Unser erfahrenes Team aus Fachkräften sorgt für Qualität und Zuverlässigkeit."
      />

      {/* Teamphilosophie */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">
              Gemeinsam stark
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="p-6 bg-surface" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text mb-3">
                  Teamwork im Mittelpunkt
                </h3>
                <p className="text-text-secondary">
                  Bei uns arbeitet jeder Hand in Hand. Von der Planung bis zur Fertigstellung unterstützen sich unsere Fachkräfte gegenseitig, um das bestmögliche Ergebnis zu erzielen.
                </p>
              </div>
              
              <div className="p-6 bg-surface" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text mb-3">
                  Kontinuierliche Weiterbildung
                </h3>
                <p className="text-text-secondary">
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
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Was uns auszeichnet
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Unser Arbeitsklima und unsere Werte machen den Unterschied
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text mb-3">
                  Sichere Arbeitsplätze
                </h3>
                <p className="text-text-secondary">
                  Langfristige Perspektiven, faire Bezahlung und ein sicherer Arbeitsplatz in einem wachsenden Unternehmen.
                </p>
              </div>

              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text mb-3">
                  Vielfältige Projekte
                </h3>
                <p className="text-text-secondary">
                  Abwechslungsreiche Aufgaben von kleinen Reparaturen bis hin zu großen Neubauprojekten sorgen für Spannung im Berufsalltag.
                </p>
              </div>

              <div className="text-center p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-xl font-bold text-text mb-3">
                  Karrierechancen
                </h3>
                <p className="text-text-secondary">
                  Wir fördern unsere Mitarbeiter aktiv und bieten echte Aufstiegsmöglichkeiten vom Gesellen bis zur Führungsposition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bewerbungssektion */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                Werde Teil unseres Teams!
              </h2>
              <p className="text-xl text-text-secondary">
                Du suchst einen Arbeitsplatz mit Perspektive? Dann bewirb dich bei uns!
              </p>
            </div>
            
            {/* Aktuelle Stellenausschreibungen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-2xl font-bold text-text mb-4">
                  Fachkraft (m/w/d)
                </h3>
                <ul className="space-y-2 text-text-secondary mb-4">
                  <li>• Abgeschlossene Berufsausbildung</li>
                  <li>• Mindestens 2 Jahre Berufserfahrung</li>
                  <li>• Führerschein Klasse B</li>
                  <li>• Teamfähigkeit und Zuverlässigkeit</li>
                </ul>
                <p className="text-sm text-text-secondary">
                  Vollzeit • Unbefristet • Faire Bezahlung
                </p>
              </div>

              <div className="p-6 bg-background" style={{ borderRadius: 'var(--radius-card)' }}>
                <h3 className="text-2xl font-bold text-text mb-4">
                  Auszubildende (m/w/d)
                </h3>
                <ul className="space-y-2 text-text-secondary mb-4">
                  <li>• Hauptschulabschluss oder höher</li>
                  <li>• Interesse am Handwerk</li>
                  <li>• Motivation und Lernbereitschaft</li>
                  <li>• Technisches Verständnis</li>
                </ul>
                <p className="text-sm text-text-secondary">
                  Ausbildungsplatz • 3 Jahre • Übernahmegarantie
                </p>
              </div>
            </div>

            {/* Bewerbungsprozess */}
            <div className="bg-background p-8 mb-8" style={{ borderRadius: 'var(--radius-card)' }}>
              <h3 className="text-2xl font-bold text-text mb-6 text-center">
                So läuft deine Bewerbung ab
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    1
                  </div>
                  <h4 className="font-bold text-text mb-2">Bewerbung senden</h4>
                  <p className="text-sm text-text-secondary">
                    Per E-Mail oder Post mit Lebenslauf und Zeugnissen
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    2
                  </div>
                  <h4 className="font-bold text-text mb-2">Persönliches Gespräch</h4>
                  <p className="text-sm text-text-secondary">
                    Kennenlernen bei einem lockeren Gespräch
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    3
                  </div>
                  <h4 className="font-bold text-text mb-2">Arbeitsplatz sichern</h4>
                  <p className="text-sm text-text-secondary">
                    Bei gegenseitigem Interesse startest du bei uns durch
                  </p>
                </div>
              </div>
            </div>

            {/* Link zu Jobs */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-text mb-4">
                Alle offenen Stellen ansehen
              </h3>
              <p className="text-text-secondary mb-6">
                Entdecke alle aktuellen Stellenausschreibungen und finde deinen Traumjob!
              </p>
              <a 
                href="/jobs"
                className="inline-flex items-center px-8 py-4 bg-secondary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Alle Jobs ansehen
              </a>
            </div>

            {/* Kontakt für Bewerbungen */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-text mb-4">
                Interesse geweckt?
              </h3>
              <p className="text-text-secondary mb-6">
                Sende deine Bewerbungsunterlagen an:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`mailto:${content?.contact?.email || ''}?subject=Bewerbung&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Ahiermit bewerbe ich mich um eine Stelle in Ihrem Unternehmen.%0D%0A%0D%0AMit freundlichen Grüßen`}
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  E-Mail senden
                </a>
                
                <a 
                  href={`tel:${content?.contact?.phone || ''}`}
                  className="inline-flex items-center px-6 py-3 bg-surface hover:bg-surface/80 text-text font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
                  style={{ borderRadius: 'var(--radius-button)' }}
                >
                  Anrufen
                </a>
              </div>
              
              <p className="text-sm text-text-secondary mt-4">
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