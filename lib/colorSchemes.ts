// Hilfsfunktion um Farbpalette aus Hauptfarbe zu generieren
const generateColorPalette = (baseColor: string) => {
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return [h * 360, s * 100, l * 100]
  }

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const [h, s, l] = hexToHsl(baseColor)

  return {
    50: hslToHex(h, Math.max(s - 40, 10), Math.min(l + 40, 95)),
    100: hslToHex(h, Math.max(s - 30, 15), Math.min(l + 30, 90)),
    200: hslToHex(h, Math.max(s - 20, 20), Math.min(l + 20, 85)),
    300: hslToHex(h, Math.max(s - 10, 25), Math.min(l + 10, 75)),
    400: hslToHex(h, s, Math.min(l + 5, 65)),
    500: baseColor, // Originalfarbe
    600: hslToHex(h, Math.min(s + 10, 100), Math.max(l - 10, 35)),
    700: hslToHex(h, Math.min(s + 20, 100), Math.max(l - 20, 25)),
    800: hslToHex(h, Math.min(s + 30, 100), Math.max(l - 30, 15)),
    900: hslToHex(h, Math.min(s + 40, 100), Math.max(l - 40, 5))
  }
}

// Erweiterte Farbschemata mit besseren, professionelleren Farben
export const colorSchemes = {
  blue: {
    name: 'Ocean Blue',
    description: 'Professionell & vertrauenswürdig',
    primary: '#2563eb',      // Kräftiges Blau
    secondary: '#1d4ed8',    // Dunkleres Blau
    accent: '#60a5fa',       // Helles Blau
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0'
  },
  green: {
    name: 'Nature Green',
    description: 'Nachhaltig & frisch',
    primary: '#059669',      // Kräftiges Grün
    secondary: '#047857',    // Dunkleres Grün
    accent: '#34d399',       // Helles Grün
    background: '#ffffff',
    surface: '#f0fdf4',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#bbf7d0'
  },
  purple: {
    name: 'Royal Purple',
    description: 'Premium & elegant',
    primary: '#7c3aed',      // Kräftiges Lila
    secondary: '#6d28d9',    // Dunkleres Lila
    accent: '#a78bfa',       // Helles Lila
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e9d5ff'
  },
  orange: {
    name: 'Vibrant Orange',
    description: 'Energisch & warm',
    primary: '#ea580c',      // Kräftiges Orange
    secondary: '#c2410c',    // Dunkleres Orange
    accent: '#fb923c',       // Helles Orange
    background: '#ffffff',
    surface: '#fff7ed',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#fed7aa'
  },
  red: {
    name: 'Power Red',
    description: 'Stark & aufmerksamkeitsstark',
    primary: '#dc2626',      // Kräftiges Rot
    secondary: '#b91c1c',    // Dunkleres Rot
    accent: '#f87171',       // Helles Rot
    background: '#ffffff',
    surface: '#fef2f2',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#fecaca'
  },
  teal: {
    name: 'Modern Teal',
    description: 'Modern & ausgewogen',
    primary: '#0d9488',      // Kräftiges Teal
    secondary: '#0f766e',    // Dunkleres Teal
    accent: '#5eead4',       // Helles Teal
    background: '#ffffff',
    surface: '#f0fdfa',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#99f6e4'
  }
}

export const applyColorScheme = (scheme: string) => {
  const colors = colorSchemes[scheme as keyof typeof colorSchemes]
  if (colors && typeof window !== 'undefined') {
    const root = document.documentElement
    
    // Basis-Farben setzen (Legacy-Kompatibilität)
    Object.entries(colors).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'description') {
        root.style.setProperty(`--color-${key}`, value)
      }
    })
    
    // Erweiterte Paletten generieren und setzen
    const primaryPalette = generateColorPalette(colors.primary)
    const secondaryPalette = generateColorPalette(colors.secondary)
    const accentPalette = generateColorPalette(colors.accent)
    
    // Primärfarben-Palette
    Object.entries(primaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-primary-${shade}`, color)
    })
    
    // Sekundärfarben-Palette
    Object.entries(secondaryPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-secondary-${shade}`, color)
    })
    
    // Akzentfarben-Palette
    Object.entries(accentPalette).forEach(([shade, color]) => {
      root.style.setProperty(`--color-accent-${shade}`, color)
    })
    
    // In localStorage speichern
    localStorage.setItem('color-scheme', scheme)
    localStorage.setItem('theme-colors', JSON.stringify(colors))
    localStorage.setItem('color-palettes', JSON.stringify({
      primary: primaryPalette,
      secondary: secondaryPalette,
      accent: accentPalette
    }))
    
    console.log('🎨 Erweitertes Farbschema angewendet:', scheme, colors)
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