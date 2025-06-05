'use client'

import { useEffect } from 'react'
import { getContentData } from '@/lib/config'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Team from '@/components/Team'
import Portfolio from '@/components/Portfolio'
import BeforeAfter from '@/components/BeforeAfter'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DevButton from '@/components/DevButton'

export default function Home() {
  const content = getContentData()

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
  }, [])

  return (
    <main className="min-h-screen">
      <Header content={content} />
      <Hero content={content} />
      <About content={content} />
      <Services content={content} />
      <Portfolio content={content} />
      <BeforeAfter content={content} />
      <Team content={content} />
      <Testimonials content={content} />
      <Contact content={content} />
      <Footer content={content} />
      
      {/* Development Tools */}
      <DevButton />
    </main>
  )
} 