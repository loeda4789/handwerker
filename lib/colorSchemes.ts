// VEREINFACHTES FARBSYSTEM - Nur 8 essenzielle Farben

export interface SimpleColorScheme {
  name: string
  description: string
  primary: string
  secondary: string  
  accent: string
  background: string
  surface: string
  text: string
  textLight: string
  textSecondary: string
}

export const colorSchemes: Record<string, SimpleColorScheme> = {
  warm: {
    name: 'Warm',
    description: 'Warm & professionell',
    primary: '#000000',      // Schwarz
    secondary: '#E67E22',    // Kräftiges Orange
    accent: '#F39C12',       // Gold-Orange
    background: '#ffffff',   // Weiß
    surface: '#FDF2E9',      // Warmes Creme
    text: '#000000',         // Schwarz für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#8B4513' // Braun für sekundären Text
  },
  modern: {
    name: 'Modern',
    description: 'Modern & technologisch',
    primary: '#000000',      // Schwarz
    secondary: '#6B7280',    // Kräftiges Grau
    accent: '#9CA3AF',       // Helles Grau
    background: '#ffffff',   // Weiß
    surface: '#F9FAFB',      // Helles Grau
    text: '#000000',         // Schwarz für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#374151' // Dunkelgrau für sekundären Text
  },
  elegant: {
    name: 'Elegant',
    description: 'Elegant & vertrauensvoll',
    primary: '#18273A',      // Dunkles Navy
    secondary: '#987E4D',    // Goldbraun
    accent: '#213044',       // Mittleres Navy
    background: '#ffffff',   // Weiß
    surface: '#F7F8FA',      // Helles Grau-Blau
    text: '#18273A',         // Dunkles Navy für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#4A5568' // Grau für sekundären Text
  },
  nature: {
    name: 'Nature',
    description: 'Frisch & nachhaltig',
    primary: '#000000',      // Schwarz
    secondary: '#BCD7B6',    // Mintgrün
    accent: '#A8C99A',       // Grün
    background: '#ffffff',   // Weiß
    surface: '#F5F5F5',      // Helles Grau
    text: '#000000',         // Schwarz für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#666666' // Grau für sekundären Text
  },

}

export const applyColorScheme = (scheme: string) => {
  const colors = colorSchemes[scheme as keyof typeof colorSchemes]
  if (colors && typeof window !== 'undefined') {
    const root = document.documentElement
    
    // Alle 8 Farben als CSS-Variablen setzen
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-surface', colors.surface)
    root.style.setProperty('--color-text', colors.text)
    root.style.setProperty('--color-text-light', colors.textLight)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    
    // Legacy Support für Border etc.
    root.style.setProperty('--color-border', '#e0e0e0')
    root.style.setProperty('--color-dark', '#0f172a')
    root.style.setProperty('--color-dark-secondary', '#1e293b')
    
    // In localStorage speichern (beide Keys für Kompatibilität)
    localStorage.setItem('color-scheme', scheme)
    localStorage.setItem('selected-color-scheme', scheme)
    localStorage.setItem('simple-colors', JSON.stringify({
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      surface: colors.surface,
      text: colors.text,
      'text-light': colors.textLight,
      'text-secondary': colors.textSecondary
    }))
    
    console.log('🎨 Vereinfachtes Farbschema angewendet:', scheme, colors)
  }
}

// Border-Radius Design-System
export const borderRadiusSchemes = {
  angular: {
    name: 'Klassisch',
    description: 'Minimal abgerundete Kanten, traditionell',
    none: '0px',
    sm: '0.125rem',     // 2px - minimal abgerundet
    base: '0.25rem',    // 4px - leicht abgerundet
    md: '0.375rem',     // 6px - sanft abgerundet
    lg: '0.5rem',       // 8px - moderat abgerundet
    xl: '0.75rem',      // 12px - gut abgerundet
    '2xl': '1rem',      // 16px - stark abgerundet
    '3xl': '1.25rem',   // 20px - sehr abgerundet
    full: '9999px',
    button: '0.375rem', // 6px - sanft abgerundete Buttons
    card: '0.5rem',     // 8px - moderat abgerundete Cards
    image: '0.25rem',   // 4px - leicht abgerundete Bilder
    modal: '0.75rem',   // 12px - gut abgerundete Modals
    input: '0.25rem'    // 4px - leicht abgerundete Inputs
  },
  rounded: {
    name: 'Freundlich',
    description: 'Sanfte Rundungen, Mittelmaß zwischen eckig und rund',
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.25rem',
    full: '9999px',
    button: '0.5rem',   // Sanft gerundete Buttons (Mittelmaß)
    card: '0.75rem',    // Leichte Card-Rundung
    image: '0.375rem',  // Minimale Bild-Rundung
    modal: '1rem',      // Moderate Modal-Rundung
    input: '0.375rem'   // Leicht gerundete Inputs
  },
  modern: {
    name: 'Modern',
    description: 'Sehr moderne, dynamische Rundungen',
    none: '0px',
    sm: '0.5rem',
    base: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    '2xl': '3rem',
    '3xl': '4rem',
    full: '9999px',
    button: '9999px',   // Pill-Shape Buttons (extrem rund)
    card: '2.5rem',     // Sehr runde Cards
    image: '2rem',      // Sehr runde Bilder
    modal: '3rem',      // Extrem runde Modals
    input: '2rem'       // Sehr runde Inputs
  }
}

export const applyBorderRadiusScheme = (scheme: string) => {
  const borderRadius = borderRadiusSchemes[scheme as keyof typeof borderRadiusSchemes]
  if (borderRadius && typeof window !== 'undefined') {
    const root = document.documentElement
    Object.entries(borderRadius).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'description') {
        root.style.setProperty(`--radius-${key}`, value)
      }
    })
    
    // In localStorage speichern
    localStorage.setItem('border-radius-scheme', scheme)
    localStorage.setItem('theme-border-radius', JSON.stringify(borderRadius))
    
    console.log('🔄 Border-Radius-Schema angewendet:', scheme, borderRadius)
  }
} 