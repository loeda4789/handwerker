import React from 'react'

interface ElektroLogoMinimalProps {
  variant?: 'minimal' | 'with-e'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: string
}

const ElektroLogoMinimal: React.FC<ElektroLogoMinimalProps> = ({ 
  variant = 'minimal', 
  size = 'md', 
  className = '',
  color
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const logoSrc = {
    minimal: '/images/logos/elektro-logo-minimal-e.svg',
    'with-e': '/images/logos/elektro-logo-elegant.svg'
  }

  const logoSize = {
    minimal: { width: 60, height: 60 },
    'with-e': { width: 80, height: 60 }
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${className}`}
      style={{ color: color || 'currentColor' }}
    >
      <img
        src={logoSrc[variant]}
        alt="Elektro Logo"
        width={logoSize[variant].width}
        height={logoSize[variant].height}
        className="w-full h-full object-contain"
        style={{ color: color || 'currentColor' }}
      />
    </div>
  )
}

export default ElektroLogoMinimal
