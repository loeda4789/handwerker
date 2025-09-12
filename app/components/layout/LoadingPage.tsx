'use client'

import React from 'react'
import ModernSpinner from '@/components/ui/ModernSpinner'

interface LoadingPageProps {
  text?: string
  className?: string
}

export default function LoadingPage({ 
  text = "Inhalt wird geladen...", 
  className = "" 
}: LoadingPageProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-background dark:bg-dark ${className}`}>
      <div className="text-center">
        <ModernSpinner variant="dots" size="xl" color="primary" className="mb-4" />
        <p className="text-text-secondary dark:text-light/80">{text}</p>
      </div>
    </div>
  )
}
