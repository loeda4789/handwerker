'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { usePageContent } from '../hooks/usePageContent'
import { useDesignStyle } from '../hooks/useDesignStyle'
import PageLayout from '../components/layout/PageLayout'
import { PageHero, SectionHeading } from '@/components/layout'
import ConfigCard from '@/components/config/ConfigCard'

export default function FAQPage() {
  const { content, loading, error } = usePageContent()
  const { designStyle } = useDesignStyle()
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

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

  // FAQ-Daten - dynamisch basierend auf der Branche
  const getFAQData = () => {
    const branche = typeof window !== 'undefined' ? 
      new URLSearchParams(window.location.search).get('branche') || 
      localStorage.getItem('selected-branche') : null

    const commonFAQs = [
      {
        question: "Wie lange dauert ein typisches Projekt?",
        answer: "Die Projektdauer hängt vom Umfang ab. Kleinere Arbeiten können oft innerhalb weniger Tage abgeschlossen werden, während größere Projekte mehrere Wochen in Anspruch nehmen können. Nach der ersten Besichtigung erhalten Sie eine realistische Zeitschätzung."
      },
      {
        question: "Erstellen Sie kostenlose Kostenvoranschläge?",
        answer: "Ja, wir erstellen grundsätzlich kostenlose und unverbindliche Kostenvoranschläge. Nach einer Vor-Ort-Besichtigung erhalten Sie ein detailliertes Angebot mit allen anfallenden Kosten."
      },
      {
        question: "Sind Sie versichert und haben entsprechende Zertifikate?",
        answer: "Selbstverständlich sind wir vollständig versichert und verfügen über alle erforderlichen Zertifikate und Qualifikationen. Gerne stellen wir Ihnen entsprechende Nachweise zur Verfügung."
      },
      {
        question: "Bieten Sie Garantie auf Ihre Arbeiten?",
        answer: "Ja, wir bieten umfassende Garantien auf unsere Arbeiten. Die Garantiezeit variiert je nach Art der Arbeit und verwendeten Materialien. Details zur Garantie erhalten Sie mit dem Angebot."
      },
      {
        question: "Können Sie auch bei Notfällen schnell helfen?",
        answer: "Ja, wir bieten einen 24/7 Notdienst für dringende Fälle. In Notfällen sind wir innerhalb kürzester Zeit vor Ort, um Schäden zu begrenzen und schnelle Lösungen zu finden."
      },
      {
        question: "Übernehmen Sie auch kleine Reparaturen?",
        answer: "Absolut! Wir übernehmen gerne auch kleinere Reparatur- und Wartungsarbeiten. Kein Auftrag ist uns zu klein - sprechen Sie uns einfach an."
      }
    ]

    if (branche === 'dachdecker') {
      return [
        ...commonFAQs,
        {
          question: "Wann ist die beste Zeit für eine Dachsanierung?",
          answer: "Die beste Zeit für Dacharbeiten ist von Frühjahr bis Herbst bei trockenem Wetter. Notfälle bearbeiten wir jedoch ganzjährig. Für größere Sanierungen empfehlen wir eine Planung im Voraus."
        },
        {
          question: "Übernehmen Sie auch die Abwicklung mit der Versicherung?",
          answer: "Bei Sturmschäden unterstützen wir Sie gerne bei der Kommunikation mit Ihrer Versicherung. Wir erstellen detaillierte Schadensberichte und arbeiten eng mit Gutachtern zusammen."
        },
        {
          question: "Welche Arten von Dächern bearbeiten Sie?",
          answer: "Wir arbeiten mit allen gängigen Dachtypen: Steildächer, Flachdächer, Satteldächer, Walmdächer und Mansarddächer. Auch Spezialkonstruktionen sind für uns kein Problem."
        }
      ]
    } else if (branche === 'elektriker') {
      return [
        ...commonFAQs,
        {
          question: "Führen Sie auch Elektroprüfungen durch?",
          answer: "Ja, wir führen alle erforderlichen Elektroprüfungen durch, einschließlich VDE-Prüfungen und Abnahmeprüfungen. Sie erhalten alle notwendigen Prüfprotokolle und Zertifikate."
        },
        {
          question: "Kann ich mein Haus für Smart Home nachrüsten?",
          answer: "Ja, auch ältere Häuser können meist für Smart Home nachgerüstet werden. Wir prüfen Ihre vorhandene Installation und entwickeln eine passende Lösung für Ihre Bedürfnisse."
        },
        {
          question: "Lohnt sich eine Photovoltaikanlage für mein Haus?",
          answer: "Das hängt von verschiedenen Faktoren ab: Dachausrichtung, Verschattung, Stromverbrauch und örtliche Gegebenheiten. Wir führen gerne eine kostenlose Potenzialanalyse durch."
        }
      ]
    } else {
      // Fliesenleger
      return [
        ...commonFAQs,
        {
          question: "Welche Fliesenarten empfehlen Sie für Badezimmer?",
          answer: "Für Badezimmer eignen sich besonders Feinsteinzeug, Naturstein oder Keramikfliesen. Wichtig sind rutschfeste Oberflächen und eine professionelle Abdichtung. Wir beraten Sie gerne bei der Auswahl."
        },
        {
          question: "Können Sie auch großformatige Fliesen verlegen?",
          answer: "Ja, wir sind spezialisiert auf großformatige Fliesen bis zu 120x60 cm und größer. Diese erfordern besondere Verlegetechnik und Erfahrung, die unser Team mitbringt."
        },
        {
          question: "Wie lange dauert eine Badsanierung?",
          answer: "Eine komplette Badsanierung dauert je nach Größe und Umfang etwa 1-3 Wochen. Kleinere Arbeiten können oft in wenigen Tagen abgeschlossen werden. Wir planen so, dass Sie möglichst wenig eingeschränkt sind."
        }
      ]
    }
  }

  const faqData = getFAQData()

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <PageLayout 
      content={content} 
      loading={loading} 
      loadingText="FAQ wird geladen..."
    >
      {/* Hero Section */}
      <PageHero
        title="Häufig gestellte Fragen"
        subtitle="Hier finden Sie Antworten auf die am häufigsten gestellten Fragen. Falls Sie weitere Fragen haben, kontaktieren Sie uns gerne direkt."
      />

      {/* FAQ Section */}
      <section className="py-20 md:py-24 bg-background dark:bg-dark">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-surface dark:bg-dark-secondary shadow-lg overflow-hidden"
                  style={{ borderRadius: 'var(--radius-card)' }}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-surface/50 dark:hover:bg-dark-secondary/50 transition-colors duration-200"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-text dark:text-light pr-6">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-text-secondary dark:text-light/60 transition-transform duration-200 flex-shrink-0 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-200 ease-in-out ${
                      openFAQ === index 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-8 pb-6 pt-2">
                      <p className="text-text-secondary dark:text-light/80 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Kontakt Section */}
      <section className="py-20 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeading
              title="Weitere Fragen?"
              subtitle="Falls Sie Ihre Frage hier nicht gefunden haben, zögern Sie nicht uns zu kontaktieren. Wir helfen gerne weiter!"
              level={2}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-16">
              {/* Telefon */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Anrufen</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Mo-Fr: 7:00-18:00 Uhr<br/>
                  Sa: 8:00-14:00 Uhr
                </p>
              </div>

              {/* E-Mail */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">E-Mail</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Antwort innerhalb<br/>
                  von 24 Stunden
                </p>
              </div>

              {/* Vor Ort */}
              <div className="text-center p-6">
                <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto mb-6"
                  style={{ borderRadius: 'var(--radius-image)' }}>
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Vor Ort</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Kostenlose Beratung<br/>
                  nach Terminvereinbarung
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-accent text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                Jetzt Kontakt aufnehmen
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