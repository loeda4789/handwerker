'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import ModernSpinner from '@/components/ModernSpinner'

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
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                So erreichen Sie uns
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Nutzen Sie eine der folgenden Kontaktmöglichkeiten oder füllen Sie unser Kontaktformular aus
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Telefon */}
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Telefon</h3>
                <a 
                  href={`tel:${content.contact.phone}`}
                  className="text-primary hover:text-accent font-medium text-lg"
                >
                  {content.contact.phone}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Mo-Fr: 7:00-18:00 Uhr<br/>
                  Sa: 8:00-16:00 Uhr
                </p>
              </div>

              {/* E-Mail */}
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">E-Mail</h3>
                <a 
                  href={`mailto:${content.contact.email}`}
                  className="text-primary hover:text-accent font-medium"
                >
                  {content.contact.email}
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Antwort innerhalb von<br/>
                  24 Stunden
                </p>
              </div>

              {/* Adresse */}
              <div className="text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Adresse</h3>
               <div className="text-gray-600 dark:text-gray-300">
                 <p>{content.contact.address}</p>
               </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Termine nach<br/>
                  Vereinbarung
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontaktformular */}
      <Contact content={content} />

      {/* Weitere Informationen */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Warum uns wählen?
              </h2>
            </div>
            
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {content.welcome.features.map((feature, index) => (
                 <div key={index} className="text-center p-6">
                   <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <span className="text-2xl">{feature.icon}</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                     {feature.title}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300">
                     {feature.text}
                   </p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Häufige Fragen
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Haben Sie weitere Fragen? Schauen Sie in unsere FAQ oder kontaktieren Sie uns direkt.
            </p>
            <a 
              href="/faq"
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Zu den FAQ
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