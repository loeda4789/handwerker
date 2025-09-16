'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useDesignStyle } from '../hooks/useDesignStyle'
import PageLayout from '../components/layout/PageLayout'
import { PageHero, SectionHeading } from '@/components/layout'
import ConfigCard from '@/components/config/ConfigCard'

export default function JobsPage() {
  const { content, loading, error } = usePageContent()
  const { designStyle } = useDesignStyle()
  const [location, setLocation] = useState('Rheine und Umgebung')

  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  // Dynamischen Standort aus URL-Parameter ermitteln
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const ort = urlParams.get('ort')
      if (ort) {
        setLocation(`${ort} und Umgebung`)
      }
    }
  }, [])

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

  // Job-Daten - dynamisch basierend auf der Branche
  const getJobsData = () => {
    const branche = typeof window !== 'undefined' ? 
      new URLSearchParams(window.location.search).get('branche') || 
      localStorage.getItem('selected-branche') : null

    const commonJobs = [
      {
        id: 1,
        title: "Elektromeister (m/w/d)",
        type: "Vollzeit",
        location: location,
        experience: "3-5 Jahre",
        description: "Wir suchen einen erfahrenen Elektromeister zur Verstärkung unseres Teams. Sie übernehmen die Leitung von Projekten und die Ausbildung unserer Azubis.",
        requirements: [
          "Abgeschlossene Meisterprüfung im Elektrotechniker-Handwerk",
          "Mindestens 3 Jahre Berufserfahrung",
          "Führerschein Klasse B",
          "Teamfähigkeit und Verantwortungsbewusstsein",
          "Kenntnisse in Smart Home und Photovoltaik von Vorteil"
        ],
        benefits: [
          "Attraktive Vergütung nach Tarif",
          "30 Tage Urlaub",
          "Weiterbildungsmöglichkeiten",
          "Firmenwagen möglich",
          "Betriebliche Altersvorsorge"
        ],
        startDate: "ab sofort",
        icon: "⚡"
      },
      {
        id: 2,
        title: "Elektriker (m/w/d)",
        type: "Vollzeit",
        location: location, 
        experience: "1-3 Jahre",
        description: "Für unser wachsendes Team suchen wir einen motivierten Elektriker. Sie arbeiten an spannenden Projekten und entwickeln sich kontinuierlich weiter.",
        requirements: [
          "Abgeschlossene Ausbildung als Elektriker",
          "Mindestens 1 Jahr Berufserfahrung",
          "Führerschein Klasse B",
          "Zuverlässigkeit und handwerkliches Geschick",
          "Bereitschaft zur Weiterbildung"
        ],
        benefits: [
          "Faire Bezahlung nach Tarif",
          "30 Tage Urlaub",
          "Interne Schulungen",
          "Moderne Arbeitsausrüstung",
          "Gute Aufstiegsmöglichkeiten"
        ],
        startDate: "ab sofort",
        icon: "🔧"
      },
      {
        id: 3,
        title: "Auszubildende/r Elektriker (m/w/d)",
        type: "Ausbildung",
        location: location,
        experience: "Schulabschluss",
        description: "Starte deine Karriere bei uns! Wir bieten eine fundierte Ausbildung mit modernster Technik und besten Übernahmechancen.",
        requirements: [
          "Guter Hauptschulabschluss oder höher",
          "Interesse an Technik und Handwerk",
          "Zuverlässigkeit und Lernbereitschaft",
          "Teamfähigkeit",
          "Mathematische Grundkenntnisse"
        ],
        benefits: [
          "Vergütung nach Tarif",
          "30 Tage Urlaub",
          "Übernahme nach erfolgreichem Abschluss",
          "Moderne Ausbildungsstätte",
          "Persönliche Betreuung durch Ausbilder"
        ],
        startDate: "01.08.2024",
        icon: "🎓"
      }
    ]

    if (branche === 'dachdecker') {
      return [
        {
          id: 1,
          title: "Dachdeckermeister (m/w/d)",
          type: "Vollzeit",
          location: location,
          experience: "3-5 Jahre",
          description: "Wir suchen einen erfahrenen Dachdeckermeister zur Verstärkung unseres Teams. Sie übernehmen die Leitung von Projekten und die Ausbildung unserer Azubis.",
          requirements: [
            "Abgeschlossene Meisterprüfung im Dachdecker-Handwerk",
            "Mindestens 3 Jahre Berufserfahrung",
            "Führerschein Klasse B",
            "Schwindelfreiheit",
            "Kenntnisse in modernen Dachsystemen"
          ],
          benefits: [
            "Attraktive Vergütung nach Tarif",
            "30 Tage Urlaub",
            "Weiterbildungsmöglichkeiten",
            "Firmenwagen möglich",
            "Betriebliche Altersvorsorge"
          ],
          startDate: "ab sofort",
          icon: "🏠"
        },
        {
          id: 2,
          title: "Dachdecker (m/w/d)",
          type: "Vollzeit",
          location: location,
          experience: "1-3 Jahre",
          description: "Für unser wachsendes Team suchen wir einen motivierten Dachdecker. Sie arbeiten an spannenden Projekten und entwickeln sich kontinuierlich weiter.",
          requirements: [
            "Abgeschlossene Ausbildung als Dachdecker",
            "Mindestens 1 Jahr Berufserfahrung",
            "Führerschein Klasse B",
            "Schwindelfreiheit",
            "Handwerkliches Geschick"
          ],
          benefits: [
            "Faire Bezahlung nach Tarif",
            "30 Tage Urlaub",
            "Interne Schulungen",
            "Moderne Arbeitsausrüstung",
            "Gute Aufstiegsmöglichkeiten"
          ],
          startDate: "ab sofort",
          icon: "🔨"
        },
        {
          id: 3,
          title: "Auszubildende/r Dachdecker (m/w/d)",
          type: "Ausbildung",
          location: location,
          experience: "Schulabschluss",
          description: "Starte deine Karriere bei uns! Wir bieten eine fundierte Ausbildung mit modernster Technik und besten Übernahmechancen.",
          requirements: [
            "Guter Hauptschulabschluss oder höher",
            "Interesse an Handwerk und Technik",
            "Schwindelfreiheit",
            "Zuverlässigkeit und Lernbereitschaft",
            "Teamfähigkeit"
          ],
          benefits: [
            "Vergütung nach Tarif",
            "30 Tage Urlaub",
            "Übernahme nach erfolgreichem Abschluss",
            "Moderne Ausbildungsstätte",
            "Persönliche Betreuung durch Ausbilder"
          ],
          startDate: "01.08.2024",
          icon: "🎓"
        }
      ]
    } else if (branche === 'fliesenleger') {
      return [
        {
          id: 1,
          title: "Fliesenlegermeister (m/w/d)",
          type: "Vollzeit",
          location: location,
          experience: "3-5 Jahre",
          description: "Wir suchen einen erfahrenen Fliesenlegermeister zur Verstärkung unseres Teams. Sie übernehmen die Leitung von Projekten und die Ausbildung unserer Azubis.",
          requirements: [
            "Abgeschlossene Meisterprüfung im Fliesenleger-Handwerk",
            "Mindestens 3 Jahre Berufserfahrung",
            "Führerschein Klasse B",
            "Kreativität und handwerkliches Geschick",
            "Kenntnisse in modernen Verlegetechniken"
          ],
          benefits: [
            "Attraktive Vergütung nach Tarif",
            "30 Tage Urlaub",
            "Weiterbildungsmöglichkeiten",
            "Firmenwagen möglich",
            "Betriebliche Altersvorsorge"
          ],
          startDate: "ab sofort",
          icon: "🧱"
        },
        {
          id: 2,
          title: "Fliesenleger (m/w/d)",
          type: "Vollzeit",
          location: location,
          experience: "1-3 Jahre",
          description: "Für unser wachsendes Team suchen wir einen motivierten Fliesenleger. Sie arbeiten an spannenden Projekten und entwickeln sich kontinuierlich weiter.",
          requirements: [
            "Abgeschlossene Ausbildung als Fliesenleger",
            "Mindestens 1 Jahr Berufserfahrung",
            "Führerschein Klasse B",
            "Kreativität und Präzision",
            "Teamfähigkeit"
          ],
          benefits: [
            "Faire Bezahlung nach Tarif",
            "30 Tage Urlaub",
            "Interne Schulungen",
            "Moderne Arbeitsausrüstung",
            "Gute Aufstiegsmöglichkeiten"
          ],
          startDate: "ab sofort",
          icon: "🔨"
        },
        {
          id: 3,
          title: "Auszubildende/r Fliesenleger (m/w/d)",
          type: "Ausbildung",
          location: location,
          experience: "Schulabschluss",
          description: "Starte deine Karriere bei uns! Wir bieten eine fundierte Ausbildung mit modernster Technik und besten Übernahmechancen.",
          requirements: [
            "Guter Hauptschulabschluss oder höher",
            "Interesse an Handwerk und Design",
            "Kreativität und handwerkliches Geschick",
            "Zuverlässigkeit und Lernbereitschaft",
            "Teamfähigkeit"
          ],
          benefits: [
            "Vergütung nach Tarif",
            "30 Tage Urlaub",
            "Übernahme nach erfolgreichem Abschluss",
            "Moderne Ausbildungsstätte",
            "Persönliche Betreuung durch Ausbilder"
          ],
          startDate: "01.08.2024",
          icon: "🎓"
        }
      ]
    } else {
      // Standard Elektriker Jobs
      return commonJobs
    }
  }

  const jobsData = getJobsData()

  return (
    <PageLayout 
      content={content} 
      loading={loading} 
      loadingText="Jobs werden geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Karriere bei uns"
        subtitle="Werden Sie Teil unseres erfolgreichen Teams! Wir bieten spannende Aufgaben, faire Bezahlung und beste Entwicklungsmöglichkeiten in einem modernen Arbeitsumfeld."
      />

      {/* Einleitung */}
      <section className="py-20 md:py-24 bg-background dark:bg-dark">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              title="Warum bei uns arbeiten?"
              subtitle="Wir sind ein modernes, familiengeführtes Unternehmen mit langjähriger Tradition und zukunftsorientierter Ausrichtung."
              level={2}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Moderne Technik</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Arbeiten Sie mit neuesten Technologien und modernsten Werkzeugen in einem zukunftsorientierten Umfeld.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Teamarbeit</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  In unserem familiären Arbeitsklima schätzen wir jeden Mitarbeiter und fördern eine offene Kommunikation.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Weiterbildung</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Wir investieren in Ihre Zukunft mit regelmäßigen Schulungen und Weiterbildungsmöglichkeiten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stellenausschreibungen */}
      <section className="py-20 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <SectionHeading
                title="Aktuelle Stellenausschreibungen"
                subtitle="Entdecken Sie unsere offenen Positionen und finden Sie Ihren Traumjob bei uns"
                level={2}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {jobsData.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-900 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  {/* Job Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-black flex items-center justify-center mr-4"
                        style={{ borderRadius: 'var(--radius-image)' }}>
                        <span className="text-2xl text-white">{job.icon}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {job.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium"
                        style={{ borderRadius: 'var(--radius-button)' }}>
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium"
                        style={{ borderRadius: 'var(--radius-button)' }}>
                        {job.experience}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  {/* Job Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Anforderungen:</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Wir bieten:</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Start Date */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Start:</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{job.startDate}</p>
                    </div>

                    {/* Bewerben Button - Immer unten */}
                    <div className="mt-auto">
                      <a
                        href={`mailto:${content?.contact?.email || 'info@mustermann-elektrotechnik.de'}?subject=Bewerbung: ${job.title}&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Ahiermit bewerbe ich mich um die ausgeschriebene Stelle als ${job.title}.%0D%0A%0D%0AMit freundlichen Grüßen`}
                        className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block text-center"
                        style={{ borderRadius: 'var(--radius-button)' }}
                      >
                        Jetzt bewerben
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bewerbungsprozess Section */}
      <section className="py-20 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SectionHeading
                title="So läuft deine Bewerbung ab"
                subtitle="Einfach und unkompliziert - wir machen es dir leicht, bei uns durchzustarten!"
                level={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Schritt 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bewerbung senden</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Per E-Mail oder einfach anrufen - wir freuen uns auf deine Nachricht!
                </p>
                <div className="space-y-3">
                  <a
                    href={`mailto:${content?.contact?.email || 'info@mustermann-elektrotechnik.de'}?subject=Bewerbung&body=Hallo,%0D%0A%0D%0Aich interessiere mich für eine Stelle bei Ihnen.%0D%0A%0D%0AMit freundlichen Grüßen`}
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105 text-sm"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    E-Mail senden
                  </a>
                  <a
                    href={`tel:${content?.contact?.phone || '+49123456789'}`}
                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition-all duration-300 text-sm"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Anrufen
                  </a>
                </div>
              </div>

              {/* Schritt 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Persönliches Gespräch</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Wir lernen uns bei einem lockeren Gespräch kennen - keine Prüfung, nur ein nettes Kennenlernen!
                </p>
              </div>

              {/* Schritt 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Arbeitsplatz sichern</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Bei gegenseitigem Interesse startest du bei uns durch - willkommen im Team!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section className="py-20 md:py-24 bg-background dark:bg-dark">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              title="Noch Fragen?"
              subtitle="Haben Sie Fragen zu unseren Stellenausschreibungen oder möchten Sie sich initiativ bewerben? Wir freuen uns auf Ihre Nachricht!"
              level={2}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Kontakt aufnehmen
                <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </a>
              <a
                href={`tel:${content?.contact?.phone || '+49123456789'}`}
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium transition-all duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Direkt anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* ConfigCard - Website Designer Button */}
      <ConfigCard />
    </PageLayout>
  )
}
