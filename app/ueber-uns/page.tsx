'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Team from '@/components/Team'
import Stats from '@/components/Stats'
import ModernSpinner from '@/components/ModernSpinner'
import Image from 'next/image'

export default function UeberUnsPage() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setContent(loadedContent)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Über uns wird geladen...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return <div>Fehler beim Laden der Inhalte</div>
  }

  return (
    <main className="min-h-screen">
      <Header content={content} />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Über uns
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Lernen Sie uns kennen – erfahren Sie mehr über unser Unternehmen, unsere Werte und das Team, das hinter jedem erfolgreichen Projekt steht.
            </p>
          </div>
        </div>
      </section>

      {/* Firmengeschichte */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Unsere Geschichte
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Von den Anfängen bis heute – eine Erfolgsgeschichte aus Leidenschaft und Handwerkskunst
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Tradition & Innovation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Was als kleiner Handwerksbetrieb begann, hat sich über die Jahre zu einem erfolgreichen Unternehmen entwickelt. 
                    Dabei haben wir nie unsere Wurzeln vergessen: Qualität, Zuverlässigkeit und persönlicher Service stehen bei uns 
                    nach wie vor im Mittelpunkt.
                  </p>
                </div>
                
                <div className="bg-accent/5 dark:bg-accent/10 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Moderne Technik, bewährte Methoden
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Wir kombinieren traditionelle Handwerkskunst mit modernster Technik und innovativen Lösungen. 
                    So entstehen Projekte, die nicht nur heute überzeugen, sondern auch für die Zukunft gerüstet sind.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-8xl opacity-50">🏗️</span>
                </div>
                <div className="absolute -z-10 top-6 right-6 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Komponente */}
      <About content={content} />

      {/* Unsere Werte */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Unsere Werte
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Diese Grundsätze leiten uns in allem, was wir tun
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Qualität
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Höchste Ansprüche an Material, Verarbeitung und Ausführung – das ist unser Versprechen.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Vertrauen
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Ehrliche Beratung, transparente Preise und verlässliche Termine schaffen langfristige Partnerschaften.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Wir bleiben am Puls der Zeit und setzen moderne Technologien für optimale Ergebnisse ein.
                </p>
              </div>

              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Nachhaltigkeit
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Umweltbewusstes Arbeiten und nachhaltige Lösungen für eine bessere Zukunft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Sektion */}
      <Team content={content} />

      {/* Statistiken */}
      <Stats content={content} />

      {/* Zertifikate & Auszeichnungen */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Zertifikate & Auszeichnungen
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Unsere Qualifikationen und Anerkennungen sprechen für sich
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Handwerkskammer
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Zertifizierter Meisterbetrieb mit Eintragung in die Handwerksrolle
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Kundenbewertungen
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {content.stats.starRating} Sterne Durchschnitt bei über {content.stats.happyClients} zufriedenen Kunden
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Nachhaltigkeit
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Zertifiziert für umweltbewusstes Arbeiten und nachhaltige Materialien
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum uns wählen? */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Warum {content.company.name}?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {content.company.tagline}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-left p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  ✅ Erfahrung seit {new Date().getFullYear() - content.stats.yearsExperience}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Über {content.stats.yearsExperience} Jahre Erfahrung und mehr als {content.stats.projectsCompleted} erfolgreich abgeschlossene Projekte
                </p>
              </div>
              
              <div className="text-left p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  ✅ Kompetentes Team
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {content.stats.teamSize} Fachkräfte mit unterschiedlichen Spezialisierungen für optimale Ergebnisse
                </p>
              </div>
            </div>
            
            <a 
              href="/kontakt"
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Jetzt Beratungstermin vereinbaren
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <Footer content={content} />
    </main>
  )
} 