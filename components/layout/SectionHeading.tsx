'use client'

import React from 'react'
import { useLayoutConfig, useHeadingsConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  badge?: {
    text: string
    icon?: React.ReactNode
  }
  className?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

export default function SectionHeading({ 
  title, 
  subtitle, 
  badge, 
  className = '', 
  level = 2 
}: SectionHeadingProps) {
  const { design: designStyle } = useLayoutConfig()
  const { underline: headingUnderline } = useHeadingsConfig()
  const { badgeStyle, fontFamily, spacing } = useStyleConfig()
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements
  const headingClasses = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-bold',
    4: 'text-xl md:text-2xl font-bold',
    5: 'text-lg md:text-xl font-bold',
    6: 'text-base md:text-lg font-bold'
  }

  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      gradient: "badge-gradient",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }

  const getFontClass = () => {
    const fontClasses = {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
      display: "font-display"
    }
    return fontClasses[fontFamily]
  }

  const getSpacingClass = () => {
    const spacingClasses = {
      compact: "spacing-compact",
      comfortable: "spacing-comfortable", 
      spacious: "spacing-spacious"
    }
    return spacingClasses[spacing]
  }

  return (
    <div className={`text-center ${getSpacingClass()} animate-on-scroll ${className}`}>
      {/* Badge */}
      {badge && (
        <div className={getBadgeClasses()}
          style={{ backgroundColor: 'var(--color-secondary)' }}>
          {badge.text}
        </div>
      )}
      
      {/* Title */}
      <HeadingTag className={`${headingClasses[level]} ${getFontClass()} text-text dark:text-light mb-6 transition-colors duration-300`}>
        {isModernStyle && headingUnderline ? (
          <span className="heading-underline-large">{title}</span>
        ) : (
          title
        )}
      </HeadingTag>
      
      {/* Subtitle */}
      {subtitle && (
        <p className={`text-lg ${getFontClass()} text-text-secondary dark:text-light/80 max-w-2xl mx-auto transition-colors duration-300`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
