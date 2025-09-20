'use client'

import { useEffect, useState, useRef } from 'react'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface ProjectProcessProps {
  content: ContentData
}

export default function ProjectProcess({ content }: ProjectProcessProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
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

  // Verwende Daten aus content.json
  const projectSteps = content.projectProcess.steps

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return

      const section = sectionRef.current
      const sectionRect = section.getBoundingClientRect()
      
      // Berechne, wann die Sektion im Viewport ist
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const viewportHeight = window.innerHeight
      
      // Starte Animation später und ende früher für langsamere Animation
      const startPoint = viewportHeight * 0.7  // Startet später
      const endPoint = viewportHeight * 0.1    // Endet früher
      
      if (sectionTop <= startPoint && sectionTop + sectionHeight >= endPoint) {
        // Langsamere, feinere Fortschrittsberechnung
        const totalScrollRange = sectionHeight * 0.8  // Größerer Scroll-Bereich
        const scrollProgress = Math.max(0, Math.min(1, 
          (startPoint - sectionTop) / totalScrollRange
        ))
        
        // Strich-Progress: Langsamer und step-basiert
        let strichProgress = scrollProgress * 100
        
        // Step-Aktivierung basierend auf Scroll-Progress
        let currentActiveStep = 0
        if (scrollProgress > 0.2) currentActiveStep = 1      // Step 1 bei 20%
        if (scrollProgress > 0.5) currentActiveStep = 2      // Step 2 bei 50%  
        if (scrollProgress > 0.8) currentActiveStep = 3      // Step 3 bei 80%
        
        // Strich läuft zu den Steps: 0% -> 33% -> 66% -> 100%
        if (scrollProgress <= 0.33) {
          strichProgress = (scrollProgress / 0.33) * 33  // 0% bis 33%
        } else if (scrollProgress <= 0.66) {
          strichProgress = 33 + ((scrollProgress - 0.33) / 0.33) * 33  // 33% bis 66%
        } else {
          strichProgress = 66 + ((scrollProgress - 0.66) / 0.34) * 34  // 66% bis 100%
        }
        
        setTimelineProgress(Math.min(100, strichProgress))
        setActiveStep(currentActiveStep)
        
      } else if (sectionTop > startPoint) {
        setTimelineProgress(0)
        setActiveStep(0)
      } else {
        setTimelineProgress(100)
        setActiveStep(3)
      }
    }

    // Initial check
    handleScroll()
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="projektablauf" ref={sectionRef} className={`py-20 ${isModernStyle ? 'modern-style' : ''} relative overflow-hidden`}>
      {/* Hero Background Image with 20% opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${content.hero.backgroundImages.desktop})`,
          opacity: 0.2,
          zIndex: 0
        }}
      />
      
      {/* Content Container */}
      <div className="max-w-screen-xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          {(designStyle === 'rounded' || designStyle === 'modern') && (
            <span className={`${getBadgeClasses()}`}>
              Unser Prozess
            </span>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-6 ${getFontClass()}`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline">
                Unser Arbeitsprozess
              </span>
            ) : (
              designStyle === 'rounded' ? 'Unser Arbeitsprozess' : content.projectProcess.title
            )}
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            {isModernStyle
              ? 'Von der ersten Beratung bis zur finalen Abnahme - unser strukturierter Projektablauf garantiert Qualität und Transparenz.'
              : content.projectProcess.subtitle
            }
          </p>
        </div>

        {/* Vertikale Timeline für alle Bildschirmgrößen */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertikale Hauptlinie - responsive positioniert */}
          <div 
            ref={timelineRef}
            className="absolute left-6 sm:left-8 lg:left-12 top-8 lg:top-10 bottom-8 lg:bottom-10 w-1 bg-border dark:bg-text-secondary/30"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            {/* Scroll-basierter Fortschrittsstrich */}
            <div 
              className={`absolute top-0 left-0 w-full transition-all duration-500 ease-out ${
                timelineProgress === 0 ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ 
                borderRadius: 'var(--radius-button)', 
                height: `${timelineProgress}%`,
                backgroundColor: 'var(--color-accent)'
              }}
            ></div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-16 lg:space-y-24">
            {projectSteps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = activeStep >= stepNumber
              const isStrichReached = timelineProgress >= (stepNumber - 1) * 33 + 16.5
              
              return (
                <div 
                  key={index} 
                  className="relative animate-on-scroll"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Schritt-Nummer Kreis - responsive */}
                  <div 
                    className={`absolute left-2 sm:left-0 lg:left-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center shadow-lg z-10 border-4 border-white dark:border-dark transition-all duration-700 ${
                      isStrichReached 
                        ? 'scale-110 shadow-xl' 
                        : 'scale-100'
                    }`}
                    style={{ 
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      boxShadow: isStrichReached ? 
                        `0 0 0 4px rgba(var(--color-accent-rgb), 0.2), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` : 
                        undefined
                    }}
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content Box - responsive */}
                  <div 
                    className={`ml-16 sm:ml-24 lg:ml-32 bg-white dark:bg-dark-secondary p-4 sm:p-6 lg:p-8 shadow-lg border border-border dark:border-text-secondary hover:shadow-xl transition-all duration-700 hover:transform hover:scale-105 ${
                      isActive
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-90 transform translate-y-0'
                    }`}
                    style={{ borderRadius: 'var(--radius-card)' }}
                  >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-text dark:text-light mb-3 lg:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {step.description}
                    </p>
                    
                    {/* Kleiner Pfeil zur Verbindung - responsive */}
                    <div className="absolute left-12 sm:left-16 lg:left-20 top-4 sm:top-6 lg:top-8 w-0 h-0 border-l-6 sm:border-l-8 border-l-white dark:border-l-dark-secondary border-t-6 sm:border-t-8 border-t-transparent border-b-6 sm:border-b-8 border-b-transparent"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


      </div>
    </section>
  )
} 