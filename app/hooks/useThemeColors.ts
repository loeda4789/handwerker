'use client'

import { useThemeConfig } from '@/contexts/AppConfigContext'
import { colorSchemes } from '@/lib/colorSchemes'

export function useThemeColors() {
  const { colorScheme } = useThemeConfig()

  // Farben aus dem zentralen colorSchemes laden
  const colors = colorSchemes[colorScheme] || colorSchemes.warm

  // CSS-Klassen basierend auf dem Farbschema
  const getThemeClasses = () => {
    return {
      // Hintergrundfarben
      background: 'bg-white dark:bg-gray-900',
      surface: 'bg-gray-50 dark:bg-gray-800',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
      
      // Textfarben
      text: 'text-gray-900 dark:text-white',
      textSecondary: 'text-gray-600 dark:text-gray-300',
      textLight: 'text-white',
      
      // Border-Farben
      border: 'border-gray-200 dark:border-gray-700',
      borderPrimary: 'border-primary',
      
      // Hover-Effekte
      hoverSurface: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      hoverPrimary: 'hover:bg-accent',
      
      // Schatten
      shadow: 'shadow-lg',
      shadowHover: 'hover:shadow-xl',
      
      // Gradient-Hintergründe
      gradientPrimary: 'bg-gradient-to-br from-primary to-accent',
      gradientSurface: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
    }
  }

  return {
    colors,
    classes: getThemeClasses()
  }
}
