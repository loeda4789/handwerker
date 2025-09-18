import React, { useEffect, useState } from 'react'

interface ElektroLogoWithTextProps {
  variant?: 'full' | 'compact'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  forceColor?: 'white' | 'black' | 'auto'
}

const ElektroLogoWithText: React.FC<ElektroLogoWithTextProps> = ({ 
  variant = 'compact', 
  size = 'md', 
  className = '',
  forceColor = 'auto'
}) => {
  const [textColor, setTextColor] = useState<string>('currentColor')

  const sizeClasses = {
    sm: 'w-16 h-8',
    md: 'w-20 h-10',
    lg: 'w-24 h-12',
    xl: 'w-28 h-14'
  }

  const logoSrc = {
    full: '/images/logos/elektro-logo-e-text.svg',
    compact: '/images/logos/elektro-logo-e-text-compact.svg'
  }

  const logoSize = {
    full: { width: 120, height: 60 },
    compact: { width: 100, height: 50 }
  }

  useEffect(() => {
    if (forceColor === 'auto') {
      // Automatische Farbbestimmung basierend auf dem Hintergrund
      const element = document.querySelector('[data-logo-container]')
      if (element) {
        const computedStyle = window.getComputedStyle(element)
        const backgroundColor = computedStyle.backgroundColor
        
        // Einfache Heuristik für helle/dunkle Hintergründe
        if (backgroundColor.includes('255, 255, 255') || 
            backgroundColor.includes('white') ||
            backgroundColor.includes('rgb(255, 255, 255)')) {
          setTextColor('#000000') // Schwarz auf weißem Hintergrund
        } else {
          setTextColor('#ffffff') // Weiß auf dunklem Hintergrund
        }
      }
    } else if (forceColor === 'white') {
      setTextColor('#ffffff')
    } else if (forceColor === 'black') {
      setTextColor('#000000')
    }
  }, [forceColor])

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      data-logo-container
      style={{ color: textColor }}
    >
      <img
        src={logoSrc[variant]}
        alt="Elektro Logo"
        width={logoSize[variant].width}
        height={logoSize[variant].height}
        className="w-full h-full object-contain"
        style={{ color: textColor }}
      />
    </div>
  )
}

export default ElektroLogoWithText
