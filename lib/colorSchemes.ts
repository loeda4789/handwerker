export const colorSchemes = {
  blue: {
    primary: '#3b82f6',
    secondary: '#1e40af',
    accent: '#60a5fa',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e2e8f0'
  },
  green: {
    primary: '#10b981',
    secondary: '#065f46',
    accent: '#34d399',
    background: '#ffffff',
    surface: '#f0fdf4',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#d1fae5'
  },
  purple: {
    primary: '#8b5cf6',
    secondary: '#5b21b6',
    accent: '#a78bfa',
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#e9d5ff'
  },
  orange: {
    primary: '#f97316',
    secondary: '#c2410c',
    accent: '#fb923c',
    background: '#ffffff',
    surface: '#fffbeb',
    text: '#1e293b',
    textSecondary: '#64748b',
    border: '#fed7aa'
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