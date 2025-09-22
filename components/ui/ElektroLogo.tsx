import React from 'react'
import Image from 'next/image'

interface ElektroLogoProps {
  variant?: 'full' | 'compact' | 'mono'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const ElektroLogo: React.FC<ElektroLogoProps> = ({ 
  variant = 'full', 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-24 h-8',
    md: 'w-32 h-10',
    lg: 'w-40 h-12',
    xl: 'w-48 h-16'
  }

  const logoSrc = {
    full: '/images/logos/elektro-logo.svg',
    compact: '/images/logos/elektro-logo-compact.svg',
    mono: '/images/logos/elektro-logo-mono.svg'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <Image
        src={logoSrc[variant]}
        alt="Elektro Logo"
        width={128}
        height={40}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  )
}

export default ElektroLogo
