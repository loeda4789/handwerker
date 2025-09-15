'use client'

import React from 'react'
import { useDesignStyle } from '@/app/hooks/useDesignStyle'

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHero({ title, subtitle, className = '' }: PageHeroProps) {
  const { designStyle } = useDesignStyle()

  return (
    <section className={`relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary via-accent to-primary overflow-hidden ${className}`}>
      {/* Dekorative Elemente */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight ${
            designStyle === 'modern' ? 'heading-underline-large' : ''
          }`}>
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">{title}</span>
            ) : (
              title
            )}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
