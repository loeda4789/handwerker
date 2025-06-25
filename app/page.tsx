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

  // Scroll Animation Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach((el) => observer.observe(el))

    return () => {
      animateElements.forEach((el) => observer.unobserve(el))
    }
  }, [content])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
    </main>
  )
} 