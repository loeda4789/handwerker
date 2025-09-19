import { AppConfig } from '@/lib/config/types'

export const getBadgeStyles = (config: AppConfig) => {
  const { badgeStyle } = config.style
  
  return {
    display: badgeStyle === 'none' ? 'none' : 'block',
    style: badgeStyle
  }
}

export const applyBadgeStyles = (config: AppConfig) => {
  const styles = getBadgeStyles(config)
  
  // CSS Custom Properties setzen
  if (typeof window !== 'undefined') {
    // Verzögerung hinzufügen, um Hydration-Probleme zu vermeiden
    setTimeout(() => {
      const root = document.documentElement
      root.style.setProperty('--badge-display', styles.display)
      root.style.setProperty('--badge-style', styles.style)
    
    // Badge-Styles direkt anwenden
    const badgeElements = document.querySelectorAll('.badge:not(.config-card .badge, .config-sidebar .badge)')
    badgeElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      htmlElement.style.display = styles.display
      
      // Badge-Klassen basierend auf Style anwenden
      const badgeClasses = {
        'minimal': 'badge-minimal',
        'rounded': 'badge-rounded', 
        'pill': 'badge-pill',
        'outlined': 'badge-outlined',
        'gradient': 'badge-gradient',
        'none': ''
      }
      
      // Alle Badge-Klassen entfernen
      Object.values(badgeClasses).forEach(cls => {
        if (cls) htmlElement.classList.remove(cls)
      })
      
      // Neue Badge-Klasse hinzufügen
      if (styles.style !== 'none' && badgeClasses[styles.style as keyof typeof badgeClasses]) {
        htmlElement.classList.add(badgeClasses[styles.style as keyof typeof badgeClasses])
      }
    })
    
    // Debug-Logging
    console.log('🏷️ applyBadgeStyles aufgerufen:', {
      badgeStyle: config.style.badgeStyle,
      display: styles.display,
      style: styles.style
    })
    }, 0)
  }
}
