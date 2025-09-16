// VEREINFACHTES FARBSYSTEM - Nur 8 essenzielle Farben

interface SimpleColorScheme {
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
    name: 'Business & Professional',
    description: 'Modern & professionell',
    primary: '#000000',      // Schwarz (aus Bild)
    secondary: '#D05733',    // Orange/Rot (aus Bild)
    accent: '#9A8F88',       // Dunkleres Grau (aus Bild)
    background: '#ffffff',   // Weiß
    surface: '#E5E2E0',      // Helles Grau (aus Bild)
    text: '#000000',         // Schwarz für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#6B635D' // Deutlich dunkleres Grau für bessere Lesbarkeit
  },
  modern: {
    name: 'Tech & Innovation',
    description: 'Modern & technologisch',
    primary: '#0F1A50',      // Navy Blue (aus Bild)
    secondary: '#FD080F',    // Leuchtend Rot (aus Bild)
    accent: '#8D8AD9',       // Lila/Violett (aus Bild)
    background: '#ffffff',   // Weiß
    surface: '#F5F6FF',      // Sehr helles Blau-Grau
    text: '#0F1A50',         // Navy Blue für Text
    textLight: '#ffffff',    // Weiß für dunkle Hintergründe
    textSecondary: '#6B7280' // Gedämpftes Grau für sekundären Text
  },
  elegant: {
    name: 'Elegant & Frisch',
    description: 'Professionell & vertrauensvoll',
    primary: '#18273A',      // Dunkles Navy (aus Bild)
    secondary: '#987E4D',    // Goldbraun/Bronze (jetzt als Hauptkontrast!)
    accent: '#213044',       // Mittleres Navy (jetzt als subtiler Akzent)
    background: '#ffffff',
    surface: '#F7F8FA',      // Sehr helles Grau-Blau
    text: '#18273A',         // Dunkles Navy für Text
    textLight: '#ffffff',
    textSecondary: '#4A5568' // Gedämpftes Grau für sekundären Text
  },
  nature: {
    name: 'Natur & Gesundheit',
    description: 'Frisch & nachhaltig',
    primary: '#000000',      // Schwarz (aus Bild)
    secondary: '#BCD7B6',    // Mintgrün (aus Bild)
    accent: '#A8C99A',       // Etwas dunkleres Grün für Akzente
    background: '#ffffff',   // Weiß
    surface: '#F5F5F5',      // Sehr helles Grau (aus Bild)
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