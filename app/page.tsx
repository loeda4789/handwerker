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


export default function Home() {
  const [content, setContent] = useState<ContentData>(getContentData())
  const [loading, setLoading] = useState(true)

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
    }, [content, loading])

  // Fallback: Aktiviere alle Animationen nach 2 Sekunden falls Observer nicht funktioniert
  useEffect(() => {
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
  }, [content])

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
      <About content={content} />
      <Stats content={content} />
      <Services content={content} />
      <BeforeAfter content={content} />
      <Team content={content} />
      <Testimonials content={content} />
      <ProjectProcess content={content} />
      <Contact content={content} />
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