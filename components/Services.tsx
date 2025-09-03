'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface ServicesProps {
  content: ContentData
}

const serviceIconMap: Record<string, React.ReactElement> = {
  'paintbrush': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
    </svg>
  ),
  'floor-plan': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
  'water-drop': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  'grid': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
    </svg>
  ),
  'square': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16v2H4zm0 5h16v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM6 3h12v2H6z"/>
    </svg>
  ),
  'paint-bucket': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1M13 7a4 4 0 104 4"/>
    </svg>
  ),
  'sun': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  ),
  'wrench': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  'sparkles': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
    </svg>
  ),
}

export default function Services({ content }: ServicesProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentService, setCurrentService] = useState<typeof content.services[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Design-Style aus localStorage abrufen
  const [designStyle, setDesignStyle] = useState<string>('angular')
  
  useEffect(() => {
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
    }
    
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    return () => window.removeEventListener('storage', handleDesignStyleChange)
  }, [])
  
  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'

  // Lightbox functions
  const openLightbox = (service: typeof content.services[0]) => {
    setCurrentService(service)
    setCurrentImageIndex(0)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentService(null)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    if (currentService) {
      // Total images = 1 (service image) + project images
      const totalImages = 1 + (currentService.projects?.length || 0)
      setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    }
  }

  const prevImage = () => {
    if (currentService) {
      // Total images = 1 (service image) + project images
      const totalImages = 1 + (currentService.projects?.length || 0)
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }

  return (
    <section id="leistungen" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {designStyle === 'rounded' && (
            <span className="inline-block px-6 py-2 text-white text-sm font-medium mb-4"
              style={{ 
                borderRadius: 'var(--radius-button)',
                backgroundColor: 'var(--color-secondary)'
              }}>
              Unser Service
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center logo-font animate-on-scroll">
            {designStyle === 'modern' ? (
              <span className="heading-underline">Was wir anbieten</span>
            ) : (
              'Was wir anbieten'
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto animate-on-scroll">
            {isModernStyle 
              ? 'Bei uns erhalten Sie alles aus einer Hand. Von der Beratung über den Verkauf bis hin zur professionellen Verlegung Ihrer Fliesen kümmern wir uns um jedes Detail. Profitieren Sie von unserer Expertise und unserem umfassenden Service.'
              : 'Von der Planung bis zur Fertigstellung - wir bieten Ihnen den kompletten Service rund um Ihr Handwerksprojekt. Klicken Sie auf eine Leistung, um unsere Referenzen zu sehen.'
            }
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <div
              key={index}
              className="bg-surface dark:bg-dark overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 cursor-pointer animate-on-scroll"
              style={{ borderRadius: 'var(--radius-card)' }}
              onClick={() => openLightbox(service)}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    style={{ borderRadius: 'var(--radius-image)' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-primary/60 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p className="text-primary/60 font-medium">{service.title}</p>
                    </div>
                  </div>
                )}
                
                {/* Projects Counter Badge */}
                {service.projects && service.projects.length > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="text-white px-3 py-1 text-sm font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-secondary)',
                        borderRadius: 'var(--radius-button)' 
                      }}>
                      {service.projects.length} Projekt{service.projects.length !== 1 ? 'e' : ''}
                    </span>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <p className="text-lg font-medium">Referenzen ansehen</p>
                  </div>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="p-6">
                {/* Icon */}
                <div className="text-primary dark:text-accent mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 p-3 bg-primary/10 dark:bg-accent/10 w-fit"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  {serviceIconMap[service.icon] || serviceIconMap['paintbrush']}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-text dark:text-light mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary dark:text-light/70">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 