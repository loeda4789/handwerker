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
      title: "Beratung & Terminvereinbarung",
      description: "Rufen Sie uns einfach an oder senden Sie uns eine Nachricht – wir vereinbaren mit Ihnen einen Termin und besprechen Ihr Vorhaben direkt vor Ort."
    },
    {
      number: 2,
      title: "Individuelle Planung & Angebot",
      description: "Gemeinsam finden wir die optimale Lösung für Ihr Projekt. Mit unserer fachkundigen Beratung erstellen wir Ihnen ein maßgeschneidertes Angebot."
    },
    {
      number: 3,
      title: "Professionelle Umsetzung",
      description: "Von der ersten bis zur letzten Handbewegung – wir kümmern uns um eine saubere, termingerechte und reibungslose Umsetzung. Haben Sie Fragen? Wir sind jederzeit für Sie da!"
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
    <section id="projektablauf" ref={sectionRef} className="bg-surface dark:bg-dark py-20">
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
          {/* Vertikale Hauptlinie - perfekt zentriert */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-border dark:via-text-secondary to-transparent">
            {/* Aktive Hauptlinie */}
            <div 
              ref={timelineRef}
              className="absolute top-16 bottom-16 left-1/2 transform -translate-x-1/2 w-1 bg-border dark:bg-text-secondary/30 rounded-full"
            >
              {/* Scroll-basierter Fortschrittsstrich */}
              <div 
                className={`absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full transition-all duration-700 ease-out shadow-sm ${
                  timelineProgress === 0 ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
                }`}
                style={{ 
                  height: `${timelineProgress}%`,
                  transformOrigin: 'top',
                  boxShadow: '0 0 8px rgba(var(--color-primary-rgb), 0.4)'
                }}
              ></div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="space-y-20 lg:space-y-28">
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
                  {/* Schritt-Nummer Kreis - zentriert */}
                  <div 
                    className={`absolute left-1/2 transform -translate-x-1/2 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl z-20 border-4 border-white dark:border-dark transition-all duration-700 ${
                      isStrichReached 
                        ? 'scale-110 shadow-2xl animate-pulse' 
                        : 'scale-100'
                    }`}
                    style={isStrichReached ? {
                      boxShadow: `0 0 0 6px rgba(var(--color-primary-rgb), 0.2), 0 20px 40px -10px rgba(0, 0, 0, 0.3)`,
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent), var(--color-primary))'
                    } : {
                      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <span className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                      {step.number}
                    </span>
                  </div>

                  {/* Content Box - links und rechts alternierend */}
                  <div 
                    className={`${index % 2 === 0 ? 'ml-0 mr-auto pl-0 pr-12 lg:pr-16' : 'mr-0 ml-auto pr-0 pl-12 lg:pl-16'} 
                    max-w-md lg:max-w-lg bg-white dark:bg-dark-secondary rounded-2xl p-8 lg:p-10 shadow-xl border border-border/50 dark:border-text-secondary/30 hover:shadow-2xl transition-all duration-700 hover:transform hover:scale-105 backdrop-blur-sm ${
                      isActive
                        ? 'opacity-100 transform translate-y-0'
                        : 'opacity-70 transform translate-y-6'
                    }`}
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)',
                      ...(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches && {
                        background: 'linear-gradient(135deg, rgba(var(--color-dark-secondary-rgb), 0.95) 0%, rgba(var(--color-dark-secondary-rgb), 0.9) 100%)'
                      })
                    }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold text-text dark:text-light mb-4 lg:mb-6">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/80 leading-relaxed text-lg lg:text-xl">
                      {step.description}
                    </p>
                    
                    {/* Eleganter Verbindungspfeil zum Kreis */}
                    <div 
                      className={`absolute top-8 lg:top-10 ${index % 2 === 0 ? 'right-8 lg:right-12' : 'left-8 lg:left-12'} w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center`}
                    >
                      <div className={`w-0 h-0 ${index % 2 === 0 ? 'border-l-4 border-l-primary border-t-2 border-t-transparent border-b-2 border-b-transparent' : 'border-r-4 border-r-primary border-t-2 border-t-transparent border-b-2 border-b-transparent'}`}></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-on-scroll">
          <div className="bg-white/50 dark:bg-dark-secondary/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20 dark:border-text-secondary/50">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
              Bereit für Ihr nächstes Projekt?
            </h3>
            <p className="text-text-secondary dark:text-light/80 mb-6">
              Kontaktieren Sie uns für eine kostenlose Erstberatung und lassen Sie uns gemeinsam Ihre Ideen verwirklichen.
            </p>
            <a
              href="#footer"
                              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium group"
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