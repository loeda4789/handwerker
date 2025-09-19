import { AppConfig } from '@/lib/config/types'

export const getBorderRadiusStyles = (config: AppConfig) => {
  const { borderRadius } = config.style

  // Border-Radius-Werte basierend auf Konfiguration
  const borderRadiusValues = {
    none: {
      button: '0.25rem',    // 4px
      card: '0.375rem',     // 6px
      input: '0.25rem',     // 4px
      modal: '0.5rem',      // 8px
      badge: '0.25rem',     // 4px
      image: '0.25rem'      // 4px
    },
    subtle: {
      button: '0.5rem',     // 8px
      card: '0.75rem',      // 12px
      input: '0.375rem',    // 6px
      modal: '1rem',        // 16px
      badge: '0.5rem',      // 8px
      image: '0.5rem'       // 8px
    },
    pronounced: {
      button: '1rem',       // 16px
      card: '1.25rem',      // 20px
      input: '0.75rem',     // 12px
      modal: '1.5rem',      // 24px
      badge: '1rem',        // 16px
      image: '1rem'         // 16px
    }
  }

  return borderRadiusValues[borderRadius]
}

export const applyBorderRadiusStyles = (config: AppConfig) => {
  const styles = getBorderRadiusStyles(config)

  if (typeof window !== 'undefined') {
    // Verzögerung hinzufügen, um Hydration-Probleme zu vermeiden
    setTimeout(() => {
      const root = document.documentElement

      // CSS-Variablen für Border-Radius setzen
      root.style.setProperty('--radius-button', styles.button)
      root.style.setProperty('--radius-card', styles.card)
      root.style.setProperty('--radius-input', styles.input)
      root.style.setProperty('--radius-modal', styles.modal)
      root.style.setProperty('--radius-badge', styles.badge)
      root.style.setProperty('--radius-image', styles.image)

      // Direkt alle relevanten Elemente aktualisieren
      const buttons = document.querySelectorAll('button, .btn, [data-cta="true"]')
      buttons.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.button
      })

      const inputs = document.querySelectorAll('input, select, textarea')
      inputs.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.input
      })

      const cards = document.querySelectorAll('[class*="card"], .bg-surface, .shadow-lg')
      cards.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.card
      })

      const badges = document.querySelectorAll('.badge, .badge-minimal, .badge-rounded, .badge-pill, .badge-outlined, .badge-gradient')
      badges.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.badge
      })

      const images = document.querySelectorAll('img, .image, [class*="image"]')
      images.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.image
      })

      // Debug-Logging
      console.log('🔲 applyBorderRadiusStyles aufgerufen:', {
        borderRadius: config.style.borderRadius,
        values: styles,
        buttonsUpdated: buttons.length,
        inputsUpdated: inputs.length,
        cardsUpdated: cards.length,
        badgesUpdated: badges.length,
        imagesUpdated: images.length
      })
    }, 0)
  }
}
