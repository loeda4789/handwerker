'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import ModernImageGallery from '@/components/media/ModernImageGallery'

interface PortfolioProps {
  content: ContentData
}

export default function Portfolio({ content }: PortfolioProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('Alle')
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Debug-Log hinzufügen
  console.log(' Portfolio - badgeStyle:', badgeStyle, 'fontFamily:', fontFamily, 'designStyle:', designStyle)
  
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

  // Alle verfügbaren Kategorien sammeln
  const allCategories = ['Alle', ...new Set(content.portfolio.projects.map(project => project.category))]
  const categories = allCategories.slice(0, 5) // Maximal 5 Kategorien für bessere UX

  // Projekte basierend auf aktivem Filter filtern
  // Auf mobilen Geräten werden alle Projekte angezeigt (keine Filter-Buttons)
  const filteredProjects = activeFilter === 'Alle' 
    ? content.portfolio.projects 
    : content.portfolio.projects.filter(project => project.category === activeFilter)

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
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

  return (
    <section id="referenzen" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {/* Quality Badge */}
          <div className={getBadgeClasses()}>
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

        {/* Filter Buttons - Nur Desktop */}
        <div className="mb-12">
          {/* Desktop: Centered Wrap */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
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
                {/* Category Badge - Einheitliches Design */}
                <div className="absolute top-4 left-4">
                  <span className="text-white px-3 py-1 text-sm font-medium"
                    style={{ 
                      backgroundColor: 'var(--color-primary)',
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
    </section>
  )
}
