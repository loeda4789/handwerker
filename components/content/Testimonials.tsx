'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface TestimonialsProps {
  content: ContentData
}

export default function Testimonials({ content }: TestimonialsProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const totalSlides = content.testimonials.length
  
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

  // Touch/Mouse handlers
  const handleStart = (clientX: number) => {
    if (!isMobile) return
    setIsDragging(true)
    setStartX(clientX)
    setCurrentX(clientX)
  }

  const handleMove = (clientX: number) => {
    if (!isDragging || !isMobile) return
    
    setCurrentX(clientX)
    const diff = clientX - startX
    const newTranslateX = -(currentSlide * 100) + (diff / sliderRef.current!.offsetWidth) * 100
    setTranslateX(newTranslateX)
  }

  const handleEnd = () => {
    if (!isDragging || !isMobile) return
    
    setIsDragging(false)
    const diff = currentX - startX
    const threshold = 50
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide > 0) {
        // Swipe right - go to previous
        setCurrentSlide(currentSlide - 1)
      } else if (diff < 0 && currentSlide < totalSlides - 1) {
        // Swipe left - go to next
        setCurrentSlide(currentSlide + 1)
      }
    }
    
    setTranslateX(-(currentSlide * 100))
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Mouse events for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setTranslateX(-(index * 100))
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      const newSlide = currentSlide + 1
      setCurrentSlide(newSlide)
      setTranslateX(-(newSlide * 100))
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1
      setCurrentSlide(newSlide)
      setTranslateX(-(newSlide * 100))
    }
  }

  // Update translateX when currentSlide changes
  useEffect(() => {
    if (!isDragging) {
      setTranslateX(-(currentSlide * 100))
    }
  }, [currentSlide, isDragging])

  return (
    <section id="testimonials" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          {/* Badge nur anzeigen wenn badgeStyle nicht 'none' ist */}
          {badgeStyle !== 'none' && (
            <div className={getBadgeClasses()}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Kundenstimmen
            </div>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 ${getFontClass()}`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline">Was unsere Kunden sagen</span>
            ) : (
              'Was unsere Kunden sagen'
            )}
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Erfahren Sie, was zufriedene Kunden über unsere Arbeit berichten.
          </p>
        </div>

        {/* Mobile View - Schmaler */}
        <div className="lg:hidden">
          {/* Mobile Slider View */}
          <div className="relative overflow-hidden max-w-sm mx-auto">
            {/* Slider Container */}
            <div 
              ref={sliderRef}
              className="overflow-hidden touch-pan-y select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={isDragging ? handleMouseMove : undefined}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${translateX}%)`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {content.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-surface dark:bg-dark-secondary p-4 shadow-lg h-full max-w-full"
                      style={{ borderRadius: 'var(--radius-card)' }}>
                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary/20 flex items-center justify-center"
                            style={{ borderRadius: 'var(--radius-button)' }}>
                            <span className="text-primary font-semibold text-sm">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-text dark:text-light text-sm truncate mr-2">
                              {testimonial.name}
                            </h4>
                            {/* 5 Star Rating */}
                            <div className="flex items-center flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-3 h-3 fill-current"
                                  viewBox="0 0 20 20"
                                  style={{ color: 'var(--color-secondary)' }}
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <blockquote className="text-text-secondary dark:text-light/80 italic text-sm leading-relaxed">
                            &quot;{testimonial.text}&quot;
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
              style={{ borderRadius: 'var(--radius-button)' }}
              aria-label="Vorherige Bewertung"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
              style={{ borderRadius: 'var(--radius-button)' }}
              aria-label="Nächste Bewertung"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {content.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-gray-300 dark:bg-gray-600' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    backgroundColor: index === currentSlide ? 'var(--color-accent)' : undefined
                  }}
                  aria-label={`Zu Bewertung ${index + 1} wechseln`}
                />
              ))}
            </div>

            {/* Swipe Indicator */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l4-4m0 0l4-4m-4 4v12"/>
                </svg>
                Wischen zum Navigieren
              </p>
            </div>
          </div>
        </div>

        {/* Desktop View - Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 items-center">
          {/* Desktop Grid */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {content.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-surface dark:bg-dark-secondary p-6 shadow-lg animate-on-scroll"
                  style={{ borderRadius: 'var(--radius-card)' }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/20 flex items-center justify-center"
                        style={{ borderRadius: 'var(--radius-button)' }}>
                        <span className="text-primary font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-text dark:text-light">
                          {testimonial.name}
                        </h4>
                        {/* 5 Star Rating */}
                        <div className="flex items-center ml-auto">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 fill-current"
                              viewBox="0 0 20 20"
                              style={{ color: 'var(--color-secondary)' }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <blockquote className="text-text-secondary dark:text-light/80 italic">
                        &quot;{testimonial.text}&quot;
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google Review CTA */}
          <div className="lg:col-span-1">
            <div className="bg-surface dark:bg-dark-secondary p-8 text-center shadow-lg animate-on-scroll"
              style={{ borderRadius: 'var(--radius-card)' }}>
              {/* Star Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary/10 dark:bg-accent/10 flex items-center justify-center mx-auto"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  <svg className="w-10 h-10 text-primary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
                Teilen Sie Ihre Erfahrung
              </h3>
              
              <p className="text-text-secondary dark:text-light/80 mb-6">
                Ihre Meinung hilft uns und anderen weiter – hinterlassen Sie gern eine Bewertung auf Google.
              </p>

              {content.reviews.google && (
                <a
                  href={content.reviews.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-white transition-colors duration-300 font-medium"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-button)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  }}
                >
                  Jetzt bewerten
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 