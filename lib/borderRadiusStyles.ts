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
      image: '0.25rem',     // 4px
      xl: '0.5rem'          // 8px
    },
    subtle: {
      button: '0.5rem',     // 8px
      card: '0.75rem',      // 12px
      input: '0.375rem',    // 6px
      modal: '1rem',        // 16px
      badge: '0.5rem',      // 8px
      image: '0.5rem',      // 8px
      xl: '0.75rem'         // 12px
    },
    pronounced: {
      button: '1.5rem',     // 24px - sehr rund wie FAQ
      card: '1.75rem',      // 28px - sehr rund wie FAQ
      input: '1rem',        // 16px - rund
      modal: '2rem',        // 32px - sehr rund
      badge: '1.25rem',     // 20px - rund
      image: '1.25rem',     // 20px - rund
      xl: '2rem'            // 32px - sehr rund
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
      root.style.setProperty('--radius-xl', styles.xl)

      // Direkt alle relevanten Elemente aktualisieren
      const buttons = document.querySelectorAll('button, .btn, [data-cta="true"], [role="button"], .button, [class*="button"], [class*="btn"]')
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

      const xlElements = document.querySelectorAll('[class*="xl"], .header, .navigation, [style*="--radius-xl"]')
      xlElements.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.xl
      })

      // Zusätzlich: Alle Elemente mit var(--radius-button) Style-Attribut aktualisieren
      const elementsWithButtonRadius = document.querySelectorAll('[style*="--radius-button"]')
      elementsWithButtonRadius.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.button
      })

      // Zusätzlich: Alle Elemente mit var(--radius-card) Style-Attribut aktualisieren
      const elementsWithCardRadius = document.querySelectorAll('[style*="--radius-card"]')
      elementsWithCardRadius.forEach((element) => {
        const htmlElement = element as HTMLElement
        htmlElement.style.borderRadius = styles.card
      })

      // Zusätzlich: Alle Elemente mit var(--radius-image) Style-Attribut aktualisieren
      const elementsWithImageRadius = document.querySelectorAll('[style*="--radius-image"]')
      elementsWithImageRadius.forEach((element) => {
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
        imagesUpdated: images.length,
        xlElementsUpdated: xlElements.length,
        elementsWithButtonRadius: elementsWithButtonRadius.length,
        elementsWithCardRadius: elementsWithCardRadius.length,
        elementsWithImageRadius: elementsWithImageRadius.length
      })
    }, 0)
  }
}
