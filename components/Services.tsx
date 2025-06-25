'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'

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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentService, setCurrentService] = useState<typeof content.services[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
    <section id="leistungen" className="bg-background dark:bg-dark-secondary py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            Unsere Leistungen & Referenzen
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Von der Planung bis zur Fertigstellung - wir bieten Ihnen den kompletten Service rund um Ihr Handwerksprojekt. Klicken Sie auf eine Leistung, um unsere Referenzen zu sehen.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <div
              key={index}
              className="bg-surface dark:bg-dark rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 cursor-pointer animate-on-scroll"
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
                    <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                <div className="text-primary dark:text-accent mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 p-3 bg-primary/10 dark:bg-accent/10 rounded-full w-fit">
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
              Ihr Projekt ist nicht dabei?
            </h3>
            <p className="text-text-secondary dark:text-light/80 mb-6 max-w-2xl mx-auto">
              Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch. Wir realisieren auch Ihr Traumprojekt!
            </p>
            <a
              href="#kontakt"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-accent transition-colors duration-300 font-medium"
            >
              Jetzt Beratung anfragen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && currentService && (
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
            {(1 + (currentService.projects?.length || 0)) > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-4 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
            )}

            {/* Next Button */}
            {(1 + (currentService.projects?.length || 0)) > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            )}

            {/* Service Title Header */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
              <h3 className="text-2xl font-bold">{currentService.title}</h3>
              <p className="text-white/80">Referenzen & Projekte</p>
            </div>

            {/* Image */}
            <div className="max-w-4xl max-h-full w-full h-full flex items-center justify-center mt-16 mb-16">
              {/* Service Main Image (Index 0) or Project Images (Index 1+) */}
              {currentImageIndex === 0 && currentService.image ? (
                <div className="relative w-full max-w-3xl h-[70vh]">
                  <Image
                    src={currentService.image}
                    alt={currentService.title}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-white">
                      <svg className="w-24 h-24 mx-auto mb-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <h4 className="text-2xl font-bold mb-2">{currentService.title}</h4>
                      <p className="text-white/80 max-w-md mx-auto">Hauptbild - {currentService.description}</p>
                    </div>
                  </div>
                </div>
              ) : currentImageIndex > 0 && currentService.projects && currentService.projects[currentImageIndex - 1] ? (
                <div className="relative w-full max-w-3xl h-[70vh]">
                  {currentService.projects[currentImageIndex - 1].image ? (
                    <Image
                      src={currentService.projects[currentImageIndex - 1].image}
                      alt={currentService.projects[currentImageIndex - 1].title}
                      fill
                      className="object-contain rounded-lg"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center" style={{display: currentService.projects[currentImageIndex - 1].image ? 'none' : 'flex'}}>
                    <div className="text-center text-white">
                      <svg className="w-24 h-24 mx-auto mb-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <h4 className="text-2xl font-bold mb-2">{currentService.projects[currentImageIndex - 1]?.title}</h4>
                      <p className="text-white/80 max-w-md mx-auto">{currentService.projects[currentImageIndex - 1]?.description}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full max-w-3xl bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center h-96">
                  <div className="text-center text-white">
                    <svg className="w-24 h-24 mx-auto mb-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <h4 className="text-2xl font-bold mb-2">{currentService.title}</h4>
                    <p className="text-white/80 max-w-md mx-auto">Kein Bild verfügbar</p>
                  </div>
                </div>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {currentImageIndex + 1} / {1 + (currentService.projects?.length || 0)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 