'use client'

import { useEffect, useState } from 'react'
import { getContentData, getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import Team from '@/components/Team'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import ProjectProcess from '@/components/ProjectProcess'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DevButton from '@/components/DevButton'
import SpeedDial from '@/components/SpeedDial'
import ImagePerformanceMonitor from '@/components/ImagePerformanceMonitor'
import ModernSpinner from '@/components/ModernSpinner'
import Link from 'next/link'


export default function Home() {
  const [content, setContent] = useState<ContentData>(getContentData())
  const [loading, setLoading] = useState(true)
  const [siteMode, setSiteMode] = useState<'onepage' | 'multipage'>('onepage')

  // Site-Mode aus localStorage laden
  useEffect(() => {
    const savedMode = localStorage.getItem('site-mode') as 'onepage' | 'multipage'
    if (savedMode) {
      setSiteMode(savedMode)
    }
  }, [])

  useEffect(() => {
    // Content basierend auf URL-Parameter laden
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setContent(loadedContent)
      } catch (error) {
        console.error('Fehler beim Laden des Contents:', error)
        setContent(getContentData()) // Fallback
      } finally {
        setLoading(false)
      }
    }

    loadContent()

    // URL-Änderungen überwachen
    const handleUrlChange = () => {
      setLoading(true)
      loadContent()
    }

    window.addEventListener('popstate', handleUrlChange)
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange)
    }
  }, [])

  // Function to scroll to footer section
  const scrollToContact = () => {
    const footerSection = document.getElementById('footer')
    if (footerSection) {
      footerSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Scroll Animation Observer - mit Verzögerung und Debugging
  useEffect(() => {
    // Nur für One-Page Modus
    if (siteMode !== 'onepage') return

    // Kleine Verzögerung, damit alle Komponenten gerendert sind
    const setupObserver = () => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Element wird sichtbar:', entry.target)
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)

      // Observe all elements with animate-on-scroll class
      const animateElements = document.querySelectorAll('.animate-on-scroll')
      console.log('Gefundene animate-on-scroll Elemente:', animateElements.length)
      
      animateElements.forEach((el, index) => {
        console.log(`Element ${index}:`, el)
        observer.observe(el)
      })

      return observer
    }

    // Verzögerung hinzufügen
    const timer = setTimeout(() => {
      const observer = setupObserver()
      
      return () => {
        if (observer) {
          observer.disconnect()
        }
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [content, loading, siteMode])

  // Fallback: Aktiviere alle Animationen nach 2 Sekunden falls Observer nicht funktioniert
  useEffect(() => {
    if (siteMode !== 'onepage') return

    const fallbackTimer = setTimeout(() => {
      const animateElements = document.querySelectorAll('.animate-on-scroll:not(.animate-in)')
      if (animateElements.length > 0) {
        console.log('Fallback: Aktiviere', animateElements.length, 'nicht-animierte Elemente')
        animateElements.forEach((el) => {
          el.classList.add('animate-in')
        })
      }
    }, 2000)

    return () => clearTimeout(fallbackTimer)
  }, [content, siteMode])

  // Services Preview Komponente für Multi-Page Modus
  const ServicesPreview = () => (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professionelle Handwerksarbeit in allen Bereichen
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {content.services.slice(0, 3).map((service: any, index: number) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Alle Leistungen ansehen
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )

  // Referenzen Preview Komponente für Multi-Page Modus  
  const ReferenzenPreview = () => (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Unsere Referenzen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Erfolgreiche Projekte sprechen für sich
          </p>
        </div>
        
        <div className="text-center">
          <Link
            href="/referenzen"
            className="inline-flex items-center px-8 py-3 bg-primary hover:bg-accent text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Referenzen ansehen
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )

  // Contact CTA Komponente für Multi-Page Modus
  const ContactCTA = () => (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Bereit für Ihr Projekt?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Kontaktieren Sie uns für eine kostenlose Beratung
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center px-8 py-3 bg-white hover:bg-gray-100 text-primary rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Jetzt Kontakt aufnehmen
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </Link>
      </div>
    </section>
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">Content wird geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Header content={content} />
      <Hero content={content} />
      
      {/* One-Page Modus: Alle Sektionen */}
      {siteMode === 'onepage' && (
        <>
          <About content={content} />
          <Stats content={content} />
          <Services content={content} />
          <BeforeAfter content={content} />
          <Team content={content} />
          <Testimonials content={content} />
          <ProjectProcess content={content} />
          <Contact content={content} />
        </>
      )}
      
      {/* Multi-Page Modus: Nur Previews */}
      {siteMode === 'multipage' && (
        <>
          <About content={content} />
          <Stats content={content} />
          <ServicesPreview />
          <ReferenzenPreview />
          <Testimonials content={content} />
          <ContactCTA />
        </>
      )}
      
      <Footer content={content} />
      
      {/* Development Tools */}
      <DevButton />

      
      {/* Mobile Speed Dial */}
      <SpeedDial 
        phoneNumber={content.contact.phone}
        onEmailClick={scrollToContact}
      />
      
      {/* Image Performance Monitor (Development only) */}
      <ImagePerformanceMonitor content={content} />
    </main>
  )
} 