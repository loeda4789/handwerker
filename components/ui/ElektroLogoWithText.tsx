import React, { useEffect, useState } from 'react'
import Image from 'next/image'

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
    const updateColor = () => {
      if (forceColor === 'auto') {
        // Verwende CSS-Variablen für automatische Farbanpassung
        const root = document.documentElement
        const computedStyle = getComputedStyle(root)
        const textColor = computedStyle.getPropertyValue('--color-text').trim()
        setTextColor(textColor || 'var(--color-text)')
      } else if (forceColor === 'white') {
        setTextColor('#ffffff')
      } else if (forceColor === 'black') {
        setTextColor('#000000')
      }
    }

    // Initiale Farbe setzen
    updateColor()

    // Auf Farbschema-Änderungen hören
    const handleColorSchemeChange = () => {
      updateColor()
    }

    // Event-Listener für Farbschema-Änderungen
    window.addEventListener('storage', handleColorSchemeChange)
    window.addEventListener('color-scheme-changed', handleColorSchemeChange)

    return () => {
      window.removeEventListener('storage', handleColorSchemeChange)
      window.removeEventListener('color-scheme-changed', handleColorSchemeChange)
    }
  }, [forceColor])

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      data-logo-container
      style={{ color: textColor }}
    >
      <Image
        src={logoSrc[variant]}
        alt="Elektro Logo"
        width={logoSize[variant].width}
        height={logoSize[variant].height}
        className="w-full h-full object-contain"
        style={{ color: textColor }}
        priority
      />
    </div>
  )
}

export default ElektroLogoWithText
