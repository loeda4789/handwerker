'use client'

import React from 'react'
import { useDesignStyle } from '@/app/hooks/useDesignStyle'
import { useThemeColors } from '@/app/hooks/useThemeColors'

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHero({ title, subtitle, className = '' }: PageHeroProps) {
  const { designStyle } = useDesignStyle()
  const { colors } = useThemeColors()

  // Bestimme ob der Hintergrund dunkel oder hell ist basierend auf den Primary-Farben
  const isDarkBackground = () => {
    // Konvertiere Hex zu RGB und berechne Helligkeit
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null
    }

    const rgb = hexToRgb(colors.primary)
    if (!rgb) return true // Fallback zu dunkel

    // Berechne relative Luminanz
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
    return luminance < 0.5 // Dunkel wenn Luminanz < 0.5
  }

  const darkBackground = isDarkBackground()
  const textColor = darkBackground ? 'text-white' : 'text-gray-900'
  const textSecondaryColor = darkBackground ? 'text-white/90' : 'text-gray-700'
  const overlayColor = darkBackground ? 'bg-black/10' : 'bg-white/10'
  const decorColor = darkBackground ? 'bg-white/10' : 'bg-gray-900/10'

  return (
    <section className={`relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-gradient-to-br from-primary via-accent to-primary overflow-hidden ${className}`}>
      {/* Dekorative Elemente */}
      <div className={`absolute inset-0 ${overlayColor}`}></div>
      <div className={`absolute top-10 left-10 w-20 h-20 ${decorColor} rounded-full animate-pulse`}></div>
      <div className={`absolute bottom-10 right-10 w-32 h-32 ${decorColor.replace('/10', '/5')} rounded-full animate-pulse delay-1000`}></div>
      <div className={`absolute top-1/2 left-1/4 w-16 h-16 ${decorColor} rounded-full animate-pulse delay-500`}></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${textColor} mb-4 md:mb-6 leading-tight ${
            designStyle === 'modern' ? 'heading-underline-large' : ''
          }`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">{title}</span>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className={`text-lg md:text-xl lg:text-2xl ${textSecondaryColor} max-w-3xl mx-auto leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
