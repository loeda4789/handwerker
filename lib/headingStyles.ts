import { AppConfig } from '@/lib/config/types'

export const getHeadingStyles = (config: AppConfig) => {
  const { underline, style, color } = config.headings
  
  if (!underline || style === 'none') {
    return {
      underline: 'no-underline',
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

  // Nur 'solid' ist noch möglich nach der if-Prüfung
  return {
    underline: 'underline',
    textDecoration: 'underline',
    textDecorationColor: getSolidColor(),
    textDecorationThickness: '2px'
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
    root.style.setProperty('--heading-text-decoration-style', 'solid')
    
    // Direkt alle h2 Elemente anwenden (außer ConfigCard/ConfigSidebar)
    const h2Elements = document.querySelectorAll('h2:not(.config-card h2):not(.config-sidebar h2)')
    h2Elements.forEach((element) => {
      const htmlElement = element as HTMLElement
      if (styles.textDecoration === 'none') {
        htmlElement.style.textDecoration = 'none'
        htmlElement.style.textDecorationColor = 'transparent'
        htmlElement.style.textDecorationThickness = '0px'
      } else {
        htmlElement.style.textDecoration = styles.textDecoration
        htmlElement.style.textDecorationColor = styles.textDecorationColor || 'transparent'
        htmlElement.style.textDecorationThickness = styles.textDecorationThickness || '0px'
        htmlElement.style.textDecorationStyle = 'solid'
      }
    })
    
    // Font-Style direkt anwenden
    const { style } = config.headings
    if (style && style !== 'none') {
      // data-style Attribut am body setzen
      document.body.setAttribute('data-style', style)
      
      // Alle Headlines direkt aktualisieren
      const allHeadlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6:not(.config-card h1, .config-card h2, .config-card h3, .config-card h4, .config-card h5, .config-card h6, .config-sidebar h1, .config-sidebar h2, .config-sidebar h3, .config-sidebar h4, .config-sidebar h5, .config-sidebar h6)')
      allHeadlines.forEach((element) => {
        const htmlElement = element as HTMLElement
        // Font-Family wird über CSS-Variablen gesteuert, aber wir können es auch direkt setzen
        htmlElement.style.fontFamily = 'var(--font-heading)'
      })
    }
    
    // Debug-Logging
    console.log('🎨 applyHeadingStyles aufgerufen:', {
      underline: config.headings.underline,
      style: config.headings.style,
      color: config.headings.color,
      textDecoration: styles.textDecoration,
      textDecorationColor: styles.textDecorationColor
    })
  }
}
