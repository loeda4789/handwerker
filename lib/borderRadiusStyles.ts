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

      // Nur CSS-Variablen setzen - keine direkten inline Styles
      // Die CSS-Regeln in globals.css verwenden bereits var(--radius-button) etc.
      // und werden automatisch aktualisiert, wenn die CSS-Variablen geändert werden

      // Debug-Logging
      console.log('🔲 applyBorderRadiusStyles aufgerufen:', {
        borderRadius: config.style.borderRadius,
        values: styles,
        cssVariablesSet: true
      })
    }, 0)
  }
}
