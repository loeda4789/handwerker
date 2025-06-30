'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ModernSpinner from '@/components/ModernSpinner'

export default function PartnerPage() {
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
          <p className="text-text-secondary dark:text-light/80">Partner werden geladen...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return <div>Fehler beim Laden der Inhalte</div>
  }

  // Partner-Daten (normalerweise würden diese aus der content.json kommen)
  const partners = [
    {
      name: "BAUHAUS",
      category: "Baumärkte & Material",
      description: "Umfassendes Sortiment für alle Handwerksprojekte mit professioneller Beratung",
      logo: "🏢",
      benefits: ["Günstige Konditionen", "Große Auswahl", "Schnelle Lieferung"]
    },
    {
      name: "Würth",
      category: "Befestigungstechnik",
      description: "Hochwertige Schrauben, Dübel und Befestigungselemente für professionelle Anwendungen",
      logo: "🔩",
      benefits: ["Premium Qualität", "Technische Beratung", "Schnelle Verfügbarkeit"]
    },
    {
      name: "Knauf",
      category: "Baustoffe",
      description: "Führender Hersteller von Gips, Trockenbau und Dämmstoffen",
      logo: "🧱",
      benefits: ["Innovative Produkte", "Schulungen", "Technischer Support"]
    },
    {
      name: "Hilti",
      category: "Werkzeuge & Technik",
      description: "Professionelle Werkzeuge und Befestigungslösungen für höchste Ansprüche",
      logo: "🔨",
      benefits: ["Profi-Werkzeuge", "Service vor Ort", "Schulungen"]
    },
    {
      name: "Lokale Baustoffhändler",
      category: "Regionale Partner",
      description: "Persönliche Betreuung und regionale Verbundenheit",
      logo: "🏪",
      benefits: ["Persönlicher Kontakt", "Kurze Wege", "Regionale Preise"]
    },
    {
      name: "Fachverbände",
      category: "Verbände & Innungen",
      description: "Mitgliedschaft in Handwerksverbänden und Innungen",
      logo: "🤝",
      benefits: ["Weiterbildung", "Netzwerk", "Qualitätsstandards"]
    }
  ]

  return (
    <main className="min-h-screen">
      <Header content={content} />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partner & Zulieferer
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Starke Partnerschaften für starke Ergebnisse. Erfahren Sie mehr über unsere zuverlässigen Partner und Lieferanten, die uns dabei helfen, höchste Qualität zu liefern.
            </p>
          </div>
        </div>
      </section>

      {/* Warum starke Partner wichtig sind */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Qualität durch starke Partnerschaften
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Unsere langjährigen Partnerschaften ermöglichen es uns, erstklassige Materialien, Werkzeuge und Dienstleistungen anzubieten
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Premium Qualität
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Durch die Zusammenarbeit mit renommierten Herstellern garantieren wir höchste Materialqualität für jedes Projekt.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Schnelle Verfügbarkeit
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kurze Lieferzeiten und zuverlässige Logistik durch bewährte Lieferantennetzwerke.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Faire Preise
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Vorteilhafte Konditionen durch langjährige Geschäftsbeziehungen geben wir an unsere Kunden weiter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner-Übersicht */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Unsere starken Partner
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Eine Auswahl unserer wichtigsten Geschäftspartner und Zulieferer
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">{partner.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-primary dark:text-accent">
                        {partner.category}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {partner.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Unsere Vorteile:
                    </h4>
                    <ul className="space-y-1">
                      {partner.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnerschaft-Vorteile für Kunden */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Ihre Vorteile durch unsere Partnerschaften
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Profitieren Sie von unseren starken Geschäftsbeziehungen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Exklusive Konditionen
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Als Geschäftskunde erhalten wir bessere Preise und Konditionen, die wir an Sie weitergeben können.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Neueste Technologien
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Durch enge Partnerschaften haben wir frühen Zugang zu innovativen Produkten und Technologien.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Garantierte Verfügbarkeit
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Bevorzugte Belieferung auch bei knappen Materialien oder hoher Nachfrage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Erweiterte Garantien
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Durch Herstellerpartnerschaften können wir oft erweiterte Garantieleistungen anbieten.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-8xl opacity-50">🤝</span>
                </div>
                <div className="absolute -z-10 top-6 right-6 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner werden */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Werden Sie unser Partner
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Sie sind Hersteller, Händler oder Dienstleister? Lassen Sie uns über eine Zusammenarbeit sprechen!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-left p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  ✅ Was wir suchen
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Hochwertige Produkte und Materialien</li>
                  <li>• Zuverlässige Lieferung und Service</li>
                  <li>• Faire und langfristige Konditionen</li>
                  <li>• Innovationsbereitschaft</li>
                </ul>
              </div>
              
              <div className="text-left p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  ✅ Was wir bieten
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Kontinuierliche Abnahme</li>
                  <li>• Pünktliche Zahlung</li>
                  <li>• Langfristige Geschäftsbeziehung</li>
                  <li>• Gegenseitige Empfehlungen</li>
                </ul>
              </div>
            </div>
            
            <a 
              href={`mailto:${content.contact.email}?subject=Partnerschaftsanfrage&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Awir interessieren uns für eine Partnerschaft mit Ihrem Unternehmen.%0D%0A%0D%0AMit freundlichen Grüßen`}
                              className="inline-flex items-center px-8 py-3 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }}
            >
              Partnerschaftsanfrage senden
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