'use client'

import { useThemeConfig } from '@/contexts/AppConfigContext'

export function useThemeColors() {
  const { colorScheme } = useThemeConfig()

  // Farben basierend auf dem gewählten Farbschema
  const getThemeColors = () => {
    switch (colorScheme) {
      case 'warm':
        return {
          primary: '#000000',
          secondary: '#D05733',
          accent: '#9A8F88',
          background: '#ffffff',
          surface: '#E5E2E0',
          text: '#000000',
          textLight: '#ffffff',
          textSecondary: '#6B635D'
        }
      case 'modern':
        return {
          primary: '#0F1A50',
          secondary: '#FD080F',
          accent: '#8D8AD9',
          background: '#ffffff',
          surface: '#F5F6FF',
          text: '#0F1A50',
          textLight: '#ffffff',
          textSecondary: '#6B7280'
        }
      case 'elegant':
        return {
          primary: '#18273A',
          secondary: '#987E4D',
          accent: '#213044',
          background: '#ffffff',
          surface: '#F7F8FA',
          text: '#18273A',
          textLight: '#ffffff',
          textSecondary: '#4A5568'
        }
      case 'nature':
        return {
          primary: '#1B4332',
          secondary: '#40916C',
          accent: '#74C69D',
          background: '#ffffff',
          surface: '#F1F8F4',
          text: '#1B4332',
          textLight: '#ffffff',
          textSecondary: '#52796F'
        }
      default:
        return {
          primary: '#18273A',
          secondary: '#987E4D',
          accent: '#213044',
          background: '#ffffff',
          surface: '#F7F8FA',
          text: '#18273A',
          textLight: '#ffffff',
          textSecondary: '#4A5568'
        }
    }
  }

  const colors = getThemeColors()

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
