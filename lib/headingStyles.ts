import { AppConfig } from '@/lib/config/types'

export const getHeadingStyles = (config: AppConfig) => {
  const { underline, style, color } = config.headings
  
  if (!underline || style === 'none') {
    return {
      underline: 'none',
      textDecoration: 'none'
    }
  }

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'from-orange-500 to-orange-300'
      case 'secondary':
        return 'from-blue-500 to-blue-300'
      case 'accent':
        return 'from-purple-500 to-purple-300'
      case 'custom':
        return 'from-gray-500 to-gray-300'
      default:
        return 'from-orange-500 to-orange-300'
    }
  }

  const getSolidColor = () => {
    switch (color) {
      case 'primary':
        return 'var(--color-primary)'
      case 'secondary':
        return 'var(--color-secondary)'
      case 'accent':
        return '#8b5cf6'
      case 'custom':
        return '#6b7280'
      default:
        return 'var(--color-primary)'
    }
  }

  switch (style) {
    case 'gradient':
      return {
        underline: 'underline',
        textDecoration: 'underline',
        textDecorationColor: 'transparent',
        backgroundImage: `linear-gradient(to right, ${getSolidColor()}, ${getSolidColor()}80)`,
        backgroundSize: '100% 2px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 100%',
        textDecorationThickness: '2px'
      }
    case 'solid':
      return {
        underline: 'underline',
        textDecoration: 'underline',
        textDecorationColor: getSolidColor(),
        textDecorationThickness: '2px'
      }
    case 'dotted':
      return {
        underline: 'underline',
        textDecoration: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: getSolidColor(),
        textDecorationThickness: '2px'
      }
    default:
      return {
        underline: 'none',
        textDecoration: 'none'
      }
  }
}

export const applyHeadingStyles = (config: AppConfig) => {
  const styles = getHeadingStyles(config)
  
  // CSS Custom Properties setzen
  if (typeof window !== 'undefined') {
    const root = document.documentElement
    root.style.setProperty('--heading-underline', styles.underline)
    root.style.setProperty('--heading-text-decoration', styles.textDecoration)
    root.style.setProperty('--heading-text-decoration-color', styles.textDecorationColor || 'transparent')
    root.style.setProperty('--heading-text-decoration-thickness', styles.textDecorationThickness || '0px')
    root.style.setProperty('--heading-text-decoration-style', styles.textDecorationStyle || 'solid')
    
    if (styles.backgroundImage) {
      root.style.setProperty('--heading-background-image', styles.backgroundImage)
      root.style.setProperty('--heading-background-size', styles.backgroundSize || '100% 2px')
      root.style.setProperty('--heading-background-repeat', styles.backgroundRepeat || 'no-repeat')
      root.style.setProperty('--heading-background-position', styles.backgroundPosition || '0 100%')
    }
  }
}
