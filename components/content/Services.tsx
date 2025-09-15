'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { useFeatureGating } from '@/lib/hooks/useFeatureGating'
import ModernImageGallery from '@/components/media/ModernImageGallery'

interface ServicesProps {
  content: ContentData
  variant?: 'full' | 'preview'  // NEU: Variant-System
  maxItems?: number             // NEU: Für Preview-Modus
}

export default function Services({ content, variant = 'full', maxItems = 3 }: ServicesProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentService, setCurrentService] = useState<typeof content.services[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Feature-Gating
  const { hasFeatureAccess, isStarter, isProfessional, isPremium } = useFeatureGating()
  
  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Services für Preview begrenzen
  const displayServices = variant === 'preview' 
    ? content.services.slice(0, maxItems)
    : content.services
  
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
    const fontClasses = {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
      display: "font-display"
    }
    return fontClasses[fontFamily]
  }

  // Gallery functions
  const openGallery = (service: typeof content.services[0]) => {
    setCurrentService(service)
    setCurrentImageIndex(0)
    setGalleryOpen(true)
  }

  const closeGallery = () => {
    setGalleryOpen(false)
    setCurrentService(null)
  }

  // Convert service to gallery images
  const getServiceGalleryImages = (service: typeof content.services[0]) => {
    const images = []
    
    // Add main service image
    if (service.image) {
      images.push({
        src: service.image,
        alt: service.title,
        title: service.title,
        description: service.description
      })
    }
    
    // Add project images
    if (service.projects) {
      service.projects.forEach(project => {
        if (project.image) {
          images.push({
            src: project.image,
            alt: project.title,
            title: project.title,
            description: project.description
          })
        }
      })
    }
    
    return images
  }

  // Handle service click based on package
  const handleServiceClick = (service: typeof content.services[0]) => {
    if (hasFeatureAccess('servicesDetailPages')) {
      // Professional/Premium: Navigate to detail page
      // For now, we'll use the gallery as fallback
      openGallery(service)
    } else {
      // Starter: Only show gallery
      openGallery(service)
    }
  }

  return (
    <section id="leistungen" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {/* Badge nur anzeigen wenn badgeStyle nicht 'none' ist */}
          {badgeStyle !== 'none' && (
            <div className={getBadgeClasses()}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Unser Service
            </div>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-6 text-center font-heading animate-on-scroll ${getFontClass()}`}>
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
          {displayServices.map((service, index) => (
            <div
              key={index}
              className="bg-surface dark:bg-dark overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 cursor-pointer animate-on-scroll"
              style={{ borderRadius: 'var(--radius-card)' }}
              onClick={() => handleServiceClick(service)}
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
                    {hasFeatureAccess('servicesDetailPages') ? (
                      <>
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                        <p className="text-lg font-medium">Mehr erfahren</p>
                      </>
                    ) : (
                      <>
                        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <p className="text-lg font-medium">Galerie öffnen</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Service Info */}
              <div className="p-6">
                {/* Content */}
                <h3 className="text-xl font-semibold text-text dark:text-light mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary dark:text-light/70 mb-4">
                  {service.description}
                </p>
                
                {/* Action Button based on package */}
                {hasFeatureAccess('servicesDetailPages') ? (
                  <Link 
                    href={`/services/${service.slug || service.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 font-medium transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Mehr erfahren
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                ) : (
                  <button 
                    className="inline-flex items-center text-primary dark:text-accent hover:text-primary/80 dark:hover:text-accent/80 font-medium transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      openGallery(service)
                    }}
                  >
                    Galerie öffnen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Mode: "Alle Services anzeigen" Button */}
        {variant === 'preview' && content.services.length > maxItems && (
          <div className="text-center mt-12">
            <button 
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200"
              style={{ borderRadius: 'var(--radius-button)' }}
              onClick={() => {
                // Scroll to services section or navigate to services page
                const servicesSection = document.getElementById('leistungen')
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Alle Services anzeigen
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* Modern Image Gallery */}
        {galleryOpen && currentService && (
          <ModernImageGallery
            images={getServiceGalleryImages(currentService)}
            isOpen={galleryOpen}
            onClose={closeGallery}
            initialIndex={currentImageIndex}
          />
        )}
      </div>
    </section>
  )
} 