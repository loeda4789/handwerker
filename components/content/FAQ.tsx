'use client'

import { useState, useEffect } from 'react'
import { ContentData } from '@/types/content'
import { useLayoutConfig, useStyleConfig, useHeadingsConfig } from '@/contexts/AppConfigContext'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import ModernImageGallery from '@/components/media/ModernImageGallery'

interface FAQProps {
  content: ContentData
}

export default function FAQ({ content }: FAQProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('Alle')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Debug-Log für FAQ
  console.log('🔍 FAQ - designStyle:', designStyle, 'badgeStyle:', badgeStyle, 'fontFamily:', fontFamily)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  // Portfolio-Funktionalität
  const allCategories = ['Alle', ...new Set(content.portfolio?.projects?.map(project => project.category) || [])]
  const categories = allCategories.slice(0, 5) // Maximal 5 Kategorien für bessere UX

  // Projekte basierend auf aktivem Filter filtern
  const filteredProjects = activeFilter === 'Alle' 
    ? (content.portfolio?.projects || [])
    : (content.portfolio?.projects || []).filter(project => project.category === activeFilter)

  // Gallery functions
  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
  }

  // Convert projects to gallery images
  const galleryImages = filteredProjects.map(project => ({
    src: project.image,
    alt: project.title,
    title: project.title,
    description: project.description
  }))

  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white px-4 py-2 text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
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
                className="bg-surface dark:bg-dark-secondary rounded-lg border border-border dark:border-dark-border"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-surface/50 dark:hover:bg-dark-secondary/50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-text dark:text-light pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <div className="text-text-secondary dark:text-light/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        {content.portfolio && content.portfolio.projects && content.portfolio.projects.length > 0 && (
          <div className="mt-16">
            {/* Section Header */}
            <div className="text-center mb-12 animate-on-scroll">
              {/* Quality Badge */}
              <div className={getBadgeClasses()}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Ausgezeichnete Qualität
              </div>
              
              <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 ${getFontClass()}`}>
                {designStyle === 'modern' ? (
                  <span className="heading-underline">{content.portfolio.title}</span>
                ) : (
                  content.portfolio.title
                )}
              </h2>
              <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
                {content.portfolio.subtitle}
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="mb-12">
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide max-w-lg mx-auto">
                <div className="flex gap-3 px-4" style={{ width: 'max-content' }}>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`flex-shrink-0 px-6 py-2 transition-all duration-300 whitespace-nowrap ${
                        activeFilter === category
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-background dark:bg-dark-secondary text-text-secondary dark:text-light/70 hover:bg-primary/10 dark:hover:bg-primary/20'
                      }`}
                      style={{ borderRadius: 'var(--radius-button)' }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Centered Wrap */}
              <div className="hidden md:flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-6 py-2 transition-all duration-300 ${
                      activeFilter === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-background dark:bg-dark-secondary text-text-secondary dark:text-light/70 hover:bg-primary/10 dark:hover:bg-primary/20'
                    }`}
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-background dark:bg-dark-secondary overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-on-scroll"
                  style={{ borderRadius: 'var(--radius-card)' }}
                  onClick={() => openGallery(index)}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-primary/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p className="text-primary/60 font-medium">{project.title}</p>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-white px-3 py-1 text-sm font-medium"
                        style={{ 
                          backgroundColor: 'var(--color-secondary)',
                          borderRadius: 'var(--radius-button)' 
                        }}>
                        {project.category}
                      </span>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center p-4">
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <p className="text-lg font-medium">Projekt ansehen</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text dark:text-light mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/70">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Image Gallery */}
            <ModernImageGallery
              images={galleryImages}
              isOpen={galleryOpen}
              onClose={closeGallery}
              initialIndex={currentImageIndex}
            />
          </div>
        )}
      </div>
    </section>
  )
}
