'use client'

import React from 'react'
import { ContentData } from '@/types/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ModernSpinner from '@/components/ui/ModernSpinner'
import ContactBar from '@/components/forms/ContactBar'
import SideContact from '@/components/forms/SideContact'
import ConfigCard from '@/components/config/ConfigCard'
import UrlParamsDebug from '@/components/config/UrlParamsDebug'

interface PageLayoutProps {
  children: React.ReactNode
  content: ContentData | null
  loading?: boolean
  loadingText?: string
  showContactBar?: boolean
  showSideContact?: boolean
  showConfigCard?: boolean
  showDebug?: boolean
  className?: string
}

export default function PageLayout({
  children,
  content,
  loading = false,
  loadingText = "Inhalt wird geladen...",
  showContactBar = true,
  showSideContact = true,
  showConfigCard = true,
  showDebug = false,
  className = ""
}: PageLayoutProps) {
  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark">
        <div className="text-center">
          <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
          <p className="text-text-secondary dark:text-light/80">{loadingText}</p>
        </div>
      </div>
    )
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('kontakt')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* URL-Parameter Debug (nur in Development) */}
      {process.env.NODE_ENV === 'development' && showDebug && <UrlParamsDebug />}
      
      {/* Marketing Features - Above Header */}
      {showContactBar && (
        <ContactBar 
          isEnabled={true} 
          phone={content.contact.phone}
          email={content.contact.email}
        />
      )}
      
      {/* Main Content */}
      <div className="transition-all duration-500">
        <Header content={content} />
        {children}
        <Footer content={content} />
      </div>

      {/* Desktop Side Contact - Global außerhalb des Containers */}
      {showSideContact && (
        <SideContact 
          phoneNumber={content.contact.phone}
          email={content.contact.email}
          onEmailClick={scrollToContact}
        />
      )}

      {/* ConfigCard - Website Designer Button */}
      {showConfigCard && <ConfigCard />}
    </div>
  )
}
