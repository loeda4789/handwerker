'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface PortfolioProps {
  content: ContentData
}

export default function Portfolio({ content }: PortfolioProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [activeFilter, setActiveFilter] = useState('Alle')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Kategorien für Filter extrahieren
  const categories = ['Alle', ...Array.from(new Set(content.portfolio.projects.map(project => project.category)))]
  
  // Gefilterte Projekte
  const filteredProjects = activeFilter === 'Alle' 
    ? content.portfolio.projects 
    : content.portfolio.projects.filter(project => project.category === activeFilter)

  // Lightbox functions
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredProjects.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)
  }

  return (
    <section id="referenzen" className="py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            {content.portfolio.title}
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
              onClick={() => openLightbox(index)}
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
                  <span className="bg-primary/90 text-white px-3 py-1 text-sm font-medium"
                    style={{ borderRadius: 'var(--radius-button)' }}>
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 dark:bg-primary/20 p-8"
            style={{ borderRadius: 'var(--radius-card)' }}>
            <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
              Ihr Projekt ist nicht dabei?
            </h3>
            <p className="text-text-secondary dark:text-light/80 mb-6 max-w-2xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch. Wir realisieren auch Ihr Traumprojekt!
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center px-6 py-3 bg-primary text-white hover:bg-accent transition-colors duration-300 font-medium"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              Jetzt Beratung anfragen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Image */}
            <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center">
              <div className="relative w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-image)' }}>
                <div className="text-center text-white">
                  <svg className="w-24 h-24 mx-auto mb-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <h3 className="text-2xl font-bold mb-2">{filteredProjects[currentImageIndex]?.title}</h3>
                  <p className="text-lg mb-2">{filteredProjects[currentImageIndex]?.category}</p>
                  <p className="text-white/80">{filteredProjects[currentImageIndex]?.description}</p>
                </div>
              </div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {filteredProjects.length}
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 