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
  handwerker: {
    name: 'Handwerker Classic',
    description: 'Traditionell & vertrauenswürdig',
    primary: '#c49a6c',
    secondary: '#497174',
    accent: '#f4a261',
    background: '#ffffff',
    surface: '#f8f8f8',
    text: '#1a1a1a',
    textLight: '#ffffff',
    textSecondary: '#6f6f6f'
  },
  blue: {
    name: 'Modern Blue',
    description: 'Professionell & modern',
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textLight: '#ffffff',
    textSecondary: '#64748b'
  },
  green: {
    name: 'Nature Green',
    description: 'Nachhaltig & frisch',
    primary: '#059669',
    secondary: '#047857',
    accent: '#34d399',
    background: '#ffffff',
    surface: '#f0fdf4',
    text: '#0f172a',
    textLight: '#ffffff',
    textSecondary: '#64748b'
  },
  orange: {
    name: 'Vibrant Orange',
    description: 'Energisch & warm',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c',
    background: '#ffffff',
    surface: '#fff7ed',
    text: '#0f172a',
    textLight: '#ffffff',
    textSecondary: '#64748b'
  },
  red: {
    name: 'Power Red',
    description: 'Stark & aufmerksamkeitsstark',
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#f87171',
    background: '#ffffff',
    surface: '#fef2f2',
    text: '#0f172a',
    textLight: '#ffffff',
    textSecondary: '#64748b'
  },
  teal: {
    name: 'Modern Teal',
    description: 'Modern & ausgewogen',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#5eead4',
    background: '#ffffff',
    surface: '#f0fdfa',
    text: '#0f172a',
    textLight: '#ffffff',
    textSecondary: '#64748b'
  }
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
    name: 'Eckig',
    description: 'Scharfe, moderne Kanten',
    none: '0px',
    sm: '0px',
    base: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
    '2xl': '0px',
    '3xl': '0px',
    full: '0px',
    button: '0px',
    card: '0px',
    image: '0px',
    modal: '0px',
    input: '0px'
  },
  rounded: {
    name: 'Abgerundet',
    description: 'Sanfte, moderne Rundungen',
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
    button: '0.5rem',
    card: '0.75rem',
    image: '0.5rem',
    modal: '1rem',
    input: '0.375rem'
  },
  curved: {
    name: 'Geschwungen',
    description: 'Organische, fließende Formen',
    none: '0px',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    full: '9999px',
    button: '1rem',
    card: '1.5rem',
    image: '1rem',
    modal: '2rem',
    input: '0.75rem'
  },
  circular: {
    name: 'Rund',
    description: 'Maximale Rundungen, organisch',
    none: '0px',
    sm: '0.5rem',
    base: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    '2xl': '3rem',
    '3xl': '4rem',
    full: '9999px',
    button: '2rem',
    card: '2rem',
    image: '1.5rem',
    modal: '2.5rem',
    input: '1rem'
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