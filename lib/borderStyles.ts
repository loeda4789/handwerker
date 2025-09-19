import { AppConfig } from '@/lib/config/types'

export const getBorderStyles = (config: AppConfig) => {
  const { borders } = config.style

  // Border-Werte basierend auf Konfiguration
  const borderValues = {
    none: {
      width: '0px',
      style: 'none',
      color: 'transparent'
    },
    subtle: {
      width: '1px',
      style: 'solid',
      color: 'var(--color-border, #e5e7eb)'
    },
    bold: {
      width: '2px',
      style: 'solid',
      color: 'var(--color-border, #d1d5db)'
    }
  }

  return borderValues[borders] || borderValues.subtle
}

export const applyBorderStyles = (config: AppConfig) => {
  if (typeof window === 'undefined') return

  const borderStyles = getBorderStyles(config)
  const root = document.documentElement

  // CSS-Variablen für Border-Styles setzen
  root.style.setProperty('--border-width', borderStyles.width)
  root.style.setProperty('--border-style', borderStyles.style)
  root.style.setProperty('--border-color', borderStyles.color)

  // Zusätzliche CSS-Klassen für verschiedene Border-Varianten
  root.style.setProperty('--border-subtle', `1px solid ${borderStyles.color}`)
  root.style.setProperty('--border-bold', `2px solid ${borderStyles.color}`)
  root.style.setProperty('--border-none', 'none')

  console.log('🎨 Border-Styles angewendet:', borders, borderStyles)
}

// CSS-Klassen basierend auf Border-Konfiguration
export const getBorderClasses = (config: AppConfig) => {
  const { borders } = config.style

  const classes = {
    none: 'border-0',
    subtle: 'border',
    bold: 'border-2'
  }

  return {
    border: classes[borders] || classes.subtle,
    borderTop: borders === 'none' ? 'border-t-0' : borders === 'bold' ? 'border-t-2' : 'border-t',
    borderRight: borders === 'none' ? 'border-r-0' : borders === 'bold' ? 'border-r-2' : 'border-r',
    borderBottom: borders === 'none' ? 'border-b-0' : borders === 'bold' ? 'border-b-2' : 'border-b',
    borderLeft: borders === 'none' ? 'border-l-0' : borders === 'bold' ? 'border-l-2' : 'border-l'
  }
}
