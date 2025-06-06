'use client'

import { useEffect, useState, useRef } from 'react'

interface ProjectProcessProps {
  content: any
}

export default function ProjectProcess({ content }: ProjectProcessProps) {
  const [timelineProgress, setTimelineProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const projectSteps = [
    {
      number: 1,
      title: "Beratung & Konzeption",
      description: "Professionelle Bestandsaufnahme, detaillierte Beratung und maßgeschneiderte Projektkonzeption direkt vor Ort."
    },
    {
      number: 2,
      title: "Präzise Planung & Angebot",
      description: "Detaillierte Projektplanung mit transparenter Kostenaufstellung und terminlicher Abstimmung nach Ihren Wünschen."
    },
    {
      number: 3,
      title: "Fachgerechte Umsetzung",
      description: "Meisterhafte Ausführung durch unser qualifiziertes Team mit höchsten Qualitätsstandards und pünktlicher Fertigstellung."
    }
  ]

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
    <section ref={sectionRef} className="bg-surface dark:bg-dark py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Unser Prozess
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
            So läuft ein Projekt bei uns ab
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Von der ersten Idee bis zur finalen Abnahme - unser strukturierter Prozess garantiert optimale Ergebnisse.
          </p>
        </div>

        {/* Vertikale Timeline für alle Bildschirmgrößen */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertikale Hauptlinie */}
          <div 
            ref={timelineRef}
            className="absolute left-8 lg:left-12 top-0 bottom-0 w-1 bg-border dark:bg-gray-600 rounded-full"
          >
            {/* Scroll-basierter Fortschrittsstrich */}
            <div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent rounded-full transition-all duration-500 ease-out" 
              style={{ height: `${timelineProgress}%` }}
            ></div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-16 lg:space-y-24">
            {projectSteps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = activeStep >= stepNumber
              const isStrichReached = timelineProgress >= (stepNumber - 1) * 33 + 16.5 // Strich erreicht Step-Mitte
              
              return (
                <div 
                  key={index} 
                  className="relative animate-on-scroll"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Schritt-Nummer Kreis */}
                  <div 
                    className={`absolute left-0 lg:left-4 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-surface dark:border-dark transition-all duration-700 ${
                      isStrichReached 
                        ? 'scale-110 shadow-xl ring-4 ring-primary/20' 
                        : 'scale-100'
                    }`}
                  >
                    <span className="text-xl lg:text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>

                  {/* Content Box */}
                  <div 
                    className={`ml-24 lg:ml-32 bg-white dark:bg-dark-secondary rounded-xl p-6 lg:p-8 shadow-lg border border-border dark:border-gray-700 hover:shadow-xl transition-all duration-700 hover:transform hover:scale-105 ${
                      isActive
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-60 transform translate-y-4'
                    }`}
                  >
                    <h3 className="text-xl lg:text-2xl font-bold text-text dark:text-light mb-3 lg:mb-4">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/80 leading-relaxed text-base lg:text-lg">
                      {step.description}
                    </p>
                    
                    {/* Kleiner Pfeil zur Verbindung */}
                    <div className="absolute left-16 lg:left-20 top-6 lg:top-8 w-0 h-0 border-l-8 border-l-white dark:border-l-dark-secondary border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
              Bereit für Ihr nächstes Projekt?
            </h3>
            <p className="text-text-secondary dark:text-light/80 mb-6">
              Kontaktieren Sie uns für eine kostenlose Erstberatung und lassen Sie uns gemeinsam Ihre Ideen verwirklichen.
            </p>
            <a
              href="#footer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium group"
            >
              Jetzt Beratung anfragen
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 