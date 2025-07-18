'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import ModernSpinner from '@/components/ModernSpinner'
import ConfiguratorButton from '@/components/ConfiguratorButton'

export default function KontaktPage() {
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
          <p className="text-text-secondary dark:text-light/80">Kontakt wird geladen...</p>
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
              Kontakt
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Sie haben Fragen oder benötigen ein individuelles Angebot? Wir sind für Sie da und beraten Sie gerne persönlich.
            </p>
          </div>
        </div>
      </section>

            {/* Kontaktinformationen */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Sprechen wir über Ihr Projekt
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Egal ob Neubau, Renovierung oder Reparatur – wir finden die beste Lösung für Sie.
              </p>
            </div>
            
            {/* Direkte Kontakt-Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <a 
                href={`tel:${content.contact.phone}`}
                className="group p-8 bg-gradient-to-br from-primary to-accent rounded-2xl text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Sofort anrufen</h3>
                    <p className="text-lg font-medium opacity-90 mb-1">{content.contact.phone}</p>
                    <p className="text-sm opacity-75">Mo-Fr: 7:00-18:00 Uhr</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <span className="text-2xl">📞</span>
                  </div>
                </div>
              </a>

              <a 
                href={`mailto:${content.contact.email}`}
                className="group p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">E-Mail schreiben</h3>
                    <p className="text-lg font-medium text-primary dark:text-accent mb-1">{content.contact.email}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Antwort binnen 24h</p>
                  </div>
                  <div className="w-16 h-16 bg-primary/10 dark:bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-accent/30 transition-colors">
                    <span className="text-2xl">✉️</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Zusätzliche Infos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Unser Standort</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{content.contact.address}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Termine nach Vereinbarung</p>
              </div>

              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Öffnungszeiten</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Montag - Freitag</span>
                    <span className="font-medium">7:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samstag</span>
                    <span className="font-medium">8:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sonntag</span>
                    <span className="font-medium text-gray-400">Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontaktformular */}
      <Contact content={content} />

            {/* Weitere Informationen */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ihr vertrauensvoller Partner
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Seit Jahren stehen wir für Qualität, Zuverlässigkeit und erstklassigen Service in der Region.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.welcome.features.map((feature, index) => (
                <div key={index} className="p-8 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Noch Fragen offen?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              In unseren FAQ finden Sie Antworten auf die häufigsten Fragen. Falls Sie weitere Informationen benötigen, kontaktieren Sie uns gerne direkt.
            </p>
            <a 
              href="/faq"
              className="inline-block px-12 py-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: 'var(--color-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
              }}
            >
              Häufige Fragen ansehen
            </a>
          </div>
        </div>
      </section>
      
      <Footer content={content} />
      
      {/* Configurator Button */}
      <ConfiguratorButton onClick={() => window.location.href = '/'} />
    </main>
  )
} 