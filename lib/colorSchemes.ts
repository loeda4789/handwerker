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
    name: 'Warm & Elegant',
    description: 'Traditionell & vertrauenswürdig',
    primary: '#291D1E',      // Dunkelbraun
    secondary: '#F5A454',    // Orange
    accent: '#F6D7AC',       // Creme
    background: '#ffffff',
    surface: '#faf8f5',      // Sehr helles Beige
    text: '#291D1E',         // Dunkelbraun für Text
    textLight: '#ffffff',
    textSecondary: '#8B6F47'
  },
  modern: {
    name: 'Modern & Energetisch',
    description: 'Kraftvoll & dynamisch',
    primary: '#1C1C1C',      // Anthrazit
    secondary: '#FA3D3B',    // Signalrot
    accent: '#C6C6C6',       // Hellgrau
    background: '#ffffff',
    surface: '#f8f8f8',      // Sehr helles Grau
    text: '#1C1C1C',         // Anthrazit für Text
    textLight: '#ffffff',
    textSecondary: '#666666'
  },
  elegant: {
    name: 'Elegant & Frisch',
    description: 'Professionell & vertrauensvoll',
    primary: '#18273A',      // Dunkles Navy (aus Bild)
    secondary: '#213044',    // Mittleres Navy (aus Bild)
    accent: '#987E4D',       // Goldbraun/Bronze (aus Bild)
    background: '#ffffff',
    surface: '#F7F8FA',      // Sehr helles Grau-Blau
    text: '#18273A',         // Dunkles Navy für Text
    textLight: '#ffffff',
    textSecondary: '#4A5568' // Gedämpftes Grau für sekundären Text
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
    
    // In localStorage speichern
    localStorage.setItem('color-scheme', scheme)
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
    description: 'Eckige Kanten, traditionell',
    none: '0px',
    sm: '0px',
    base: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
    '2xl': '0px',
    '3xl': '0px',
    full: '0px',
    button: '0px',      // Eckige Buttons
    card: '0px',        // Eckige Cards
    image: '0px',       // Eckige Bilder
    modal: '0px',       // Eckige Modals
    input: '0px'        // Eckige Inputs
  },
  rounded: {
    name: 'Freundlich',
    description: 'Runde Buttons, freundliche Rundungen',
    none: '0px',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
    button: '1.5rem',   // Runde Buttons (eher Richtung rund)
    card: '1rem',       // Moderate Card-Rundung
    image: '0.75rem',   // Leichte Bild-Rundung
    modal: '1.25rem',   // Moderate Modal-Rundung
    input: '0.75rem'    // Runde Inputs
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