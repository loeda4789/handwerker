export const colorSchemes = {
  blue: {
    primary: '#0066ff',
    secondary: '#0052cc',
    accent: '#3d8bff',
    background: '#ffffff',
    surface: '#f7faff',
    text: '#0f1419',
    textSecondary: '#6b7280',
    border: '#e1ecff'
  },
  green: {
    primary: '#00d9aa',
    secondary: '#00b894',
    accent: '#26e5b8',
    background: '#ffffff',
    surface: '#f0fffe',
    text: '#0f1419',
    textSecondary: '#6b7280',
    border: '#ccf7ed'
  },
  purple: {
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#a855f7',
    background: '#ffffff',
    surface: '#faf7ff',
    text: '#0f1419',
    textSecondary: '#6b7280',
    border: '#ede9fe'
  },
  orange: {
    primary: '#ff6b35',
    secondary: '#e55527',
    accent: '#ff8a5b',
    background: '#ffffff',
    surface: '#fff8f5',
    text: '#0f1419',
    textSecondary: '#6b7280',
    border: '#fed7cc'
  }
}

export const applyColorScheme = (scheme: string) => {
  const colors = colorSchemes[scheme as keyof typeof colorSchemes]
  if (colors && typeof window !== 'undefined') {
    const root = document.documentElement
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
    
    // In localStorage speichern
    localStorage.setItem('color-scheme', scheme)
    localStorage.setItem('theme-colors', JSON.stringify(colors))
    
    console.log('🎨 Farbschema angewendet:', scheme, colors)
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