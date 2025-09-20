'use client'

import { useState } from 'react'
import { ContentData } from '@/types/content'
import { useLayoutConfig, useStyleConfig, useHeadingsConfig } from '@/contexts/AppConfigContext'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface FAQProps {
  content: ContentData
}

export default function FAQ({ content }: FAQProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Debug-Log für FAQ
  console.log('🔍 FAQ - designStyle:', designStyle, 'badgeStyle:', badgeStyle, 'fontFamily:', fontFamily)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white text-sm font-medium mb-6"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      gradient: "badge-gradient",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }
  
  const getFontClass = () => {
    // Alle Headlines verwenden jetzt die dynamischen Fonts über CSS-Variablen
    return "" // Keine spezielle Font-Klasse mehr nötig
  }

  // Verwende FAQ-Daten aus dem Content, falls vorhanden
  const faqData = content.faq && content.faq.length > 0 ? content.faq : []

  if (faqData.length === 0) {
    return null
  }

  const ChevronDownIcon = () => (
    <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )

  const ChevronUpIcon = () => (
    <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  )

  return (
    <section className={`py-16 bg-background dark:bg-dark faq-section ${designStyle === 'modern' ? 'modern-style' : ''}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-on-scroll">
          {/* Badge nur anzeigen wenn badgeStyle nicht 'none' ist */}
          {badgeStyle !== 'none' && (
            <div className={getBadgeClasses()}>
              FAQ
            </div>
          )}
          
          <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 ${getFontClass()}`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline">Häufig gestellte Fragen</span>
            ) : (
              'Häufig gestellte Fragen'
            )}
          </h2>
          <p className={`text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto ${getFontClass()}`}>
            Hier finden Sie Antworten auf die wichtigsten Fragen zu unseren Dienstleistungen
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-secondary border border-gray-200 dark:border-dark-border shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{ borderRadius: 'var(--radius-card)' }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-dark-secondary/50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-light pr-4">
                  {faq.question}
                </span>
                {openFAQ === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <div className="text-gray-700 dark:text-light/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
