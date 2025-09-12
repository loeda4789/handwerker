'use client'

import React from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  index: number
  designStyle: string
  className?: string
}

export default function SectionWrapper({ 
  children, 
  index, 
  designStyle, 
  className = '' 
}: SectionWrapperProps) {
  if (designStyle !== 'angular') {
    // Für moderne Varianten: Standard-Styling der Komponenten beibehalten
    return <>{children}</>
  }

  // Für klassische Variante: Abwechselnde Hintergründe zwischen background und surface
  // Index 1, 3, 5, 7... sollen surface haben (ungerade Indizes)
  // Index 0, 2, 4, 6... sollen background bleiben (gerade Indizes)
  const shouldUseSurface = index % 2 === 1 // Ungerade Indizes (1, 3, 5, 7...)
  
  if (shouldUseSurface) {
    // Ungerade Sektionen: Surface-Hintergrund (helles Grau)
    return (
      <div 
        className={`bg-surface dark:bg-dark-secondary ${className}`}
      >
        {children}
      </div>
    )
  } else {
    // Gerade Sektionen: Background (weiß)
    return (
      <div className={`bg-background dark:bg-dark ${className}`}>
        {children}
      </div>
    )
  }
}
