import { AppConfig } from './types'

export interface UnifiedStyle {
  id: 'einfach' | 'standard' | 'modern'
  name: string
  description: string
  icon: string
  color: string
  config: {
    // Typography
    typography: {
      fontFamily: 'sans' | 'serif' | 'display'
      headingSize: 'small' | 'medium' | 'large'
      textSize: 'small' | 'medium' | 'large'
      lineHeight: 'tight' | 'normal' | 'relaxed'
    }
    // Spacing
    spacing: {
      section: 'compact' | 'comfortable' | 'spacious'
      element: 'tight' | 'normal' | 'loose'
      padding: 'minimal' | 'standard' | 'generous'
    }
    // Design Elements
    design: {
      headerStyle: 'angular' | 'rounded' | 'modern' | 'klassik'
      headerVariant: 'classic' | 'modern' | 'floating'
      borderRadius: 'none' | 'subtle' | 'pronounced'
      shadows: 'none' | 'subtle' | 'dramatic'
      borders: 'none' | 'subtle' | 'bold'
    }
    // Interactive Elements
    interactive: {
      badges: 'none' | 'subtle' | 'prominent'
      underlines: 'none' | 'subtle' | 'bold'
      buttons: 'minimal' | 'standard' | 'dramatic'
      hoverEffects: 'none' | 'subtle' | 'dynamic'
    }
    // Animations
    animations: {
      transitions: 'none' | 'smooth' | 'dynamic'
      scrollEffects: 'none' | 'subtle' | 'dramatic'
      microInteractions: 'none' | 'minimal' | 'rich'
    }
  }
}

export const UNIFIED_STYLES: UnifiedStyle[] = [
  {
    id: 'einfach',
    name: 'Einfach',
    description: 'Schlicht, minimalistisch, fokussiert',
    icon: 'E',
    color: 'bg-gray-50 border-gray-200',
    config: {
      typography: {
        fontFamily: 'sans',
        headingSize: 'small',
        textSize: 'small',
        lineHeight: 'tight'
      },
      spacing: {
        section: 'compact',
        element: 'tight',
        padding: 'minimal'
      },
      design: {
        headerStyle: 'angular',
        headerVariant: 'classic',
        borderRadius: 'none',
        shadows: 'none',
        borders: 'none'
      },
      interactive: {
        badges: 'none',
        underlines: 'none',
        buttons: 'minimal',
        hoverEffects: 'none'
      },
      animations: {
        transitions: 'none',
        scrollEffects: 'none',
        microInteractions: 'none'
      }
    }
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Ausgewogen, professionell, vertrauenswürdig',
    icon: 'S',
    color: 'bg-blue-50 border-blue-200',
    config: {
      typography: {
        fontFamily: 'sans',
        headingSize: 'medium',
        textSize: 'medium',
        lineHeight: 'normal'
      },
      spacing: {
        section: 'comfortable',
        element: 'normal',
        padding: 'standard'
      },
      design: {
        headerStyle: 'rounded',
        headerVariant: 'modern',
        borderRadius: 'subtle',
        shadows: 'subtle',
        borders: 'subtle'
      },
      interactive: {
        badges: 'subtle',
        underlines: 'subtle',
        buttons: 'standard',
        hoverEffects: 'subtle'
      },
      animations: {
        transitions: 'smooth',
        scrollEffects: 'subtle',
        microInteractions: 'minimal'
      }
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Stilvoll, dynamisch, aufmerksamkeitsstark',
    icon: 'M',
    color: 'bg-purple-50 border-purple-200',
    config: {
      typography: {
        fontFamily: 'display',
        headingSize: 'large',
        textSize: 'large',
        lineHeight: 'relaxed'
      },
      spacing: {
        section: 'spacious',
        element: 'loose',
        padding: 'generous'
      },
      design: {
        headerStyle: 'modern',
        headerVariant: 'floating',
        borderRadius: 'pronounced',
        shadows: 'dramatic',
        borders: 'bold'
      },
      interactive: {
        badges: 'prominent',
        underlines: 'bold',
        buttons: 'dramatic',
        hoverEffects: 'dynamic'
      },
      animations: {
        transitions: 'dynamic',
        scrollEffects: 'dramatic',
        microInteractions: 'rich'
      }
    }
  }
]

export const getUnifiedStyle = (styleId: string): UnifiedStyle | undefined => {
  return UNIFIED_STYLES.find(style => style.id === styleId)
}

export const applyUnifiedStyle = (config: AppConfig, styleId: string): AppConfig => {
  const unifiedStyle = getUnifiedStyle(styleId)
  if (!unifiedStyle) return config

  console.log('🎨 applyUnifiedStyle - styleId:', styleId)
  console.log('🎨 applyUnifiedStyle - unifiedStyle:', unifiedStyle)

  const result = {
    ...config,
    layout: {
      ...config.layout,
      design: unifiedStyle.config.design.headerStyle
    },
    headings: {
      ...config.headings,
      underline: unifiedStyle.config.interactive.underlines !== 'none',
      style: (unifiedStyle.config.interactive.underlines === 'bold' ? 'solid' : 
             unifiedStyle.config.interactive.underlines === 'subtle' ? 'dotted' : 'none') as 'gradient' | 'solid' | 'dotted' | 'none',
      color: 'primary' as 'primary' | 'secondary' | 'accent' | 'custom'
    },
    style: {
      ...config.style,
      package: styleId as any,
      fontFamily: unifiedStyle.config.typography.fontFamily,
      badgeStyle: (unifiedStyle.config.interactive.badges === 'none' ? 'none' : 
                  unifiedStyle.config.interactive.badges === 'subtle' ? 'outlined' : 'pill') as 'minimal' | 'rounded' | 'pill' | 'outlined' | 'none',
      spacing: unifiedStyle.config.spacing.section
    }
  }

  console.log('🎨 applyUnifiedStyle - result:', result)
  return result
}

// Helper functions für CSS-Klassen basierend auf Stil
export const getTypographyClasses = (styleId: string) => {
  const style = getUnifiedStyle(styleId)
  if (!style) return {}

  const { typography } = style.config

  return {
    fontFamily: typography.fontFamily === 'serif' ? 'font-serif' : 
                typography.fontFamily === 'display' ? 'font-display' : 'font-sans',
    headingSize: typography.headingSize === 'small' ? 'text-2xl' :
                 typography.headingSize === 'medium' ? 'text-3xl' : 'text-4xl',
    textSize: typography.textSize === 'small' ? 'text-sm' :
              typography.textSize === 'medium' ? 'text-base' : 'text-lg',
    lineHeight: typography.lineHeight === 'tight' ? 'leading-tight' :
                typography.lineHeight === 'normal' ? 'leading-normal' : 'leading-relaxed'
  }
}

export const getSpacingClasses = (styleId: string) => {
  const style = getUnifiedStyle(styleId)
  if (!style) return {}

  const { spacing } = style.config

  return {
    section: spacing.section === 'compact' ? 'py-8' :
             spacing.section === 'comfortable' ? 'py-12' : 'py-16',
    element: spacing.element === 'tight' ? 'space-y-2' :
             spacing.element === 'normal' ? 'space-y-4' : 'space-y-6',
    padding: spacing.padding === 'minimal' ? 'p-4' :
             spacing.padding === 'standard' ? 'p-6' : 'p-8'
  }
}

export const getDesignClasses = (styleId: string) => {
  const style = getUnifiedStyle(styleId)
  if (!style) return {}

  const { design } = style.config

  return {
    borderRadius: design.borderRadius === 'none' ? 'rounded-none' :
                  design.borderRadius === 'subtle' ? 'rounded-lg' : 'rounded-2xl',
    shadows: design.shadows === 'none' ? 'shadow-none' :
             design.shadows === 'subtle' ? 'shadow-md' : 'shadow-2xl',
    borders: design.borders === 'none' ? 'border-0' :
             design.borders === 'subtle' ? 'border' : 'border-2'
  }
}

export const getInteractiveClasses = (styleId: string) => {
  const style = getUnifiedStyle(styleId)
  if (!style) return {}

  const { interactive } = style.config

  return {
    badges: interactive.badges === 'none' ? 'hidden' :
            interactive.badges === 'subtle' ? 'opacity-70' : 'opacity-100',
    underlines: interactive.underlines === 'none' ? 'no-underline' :
                interactive.underlines === 'subtle' ? 'underline decoration-1' : 'underline decoration-2',
    buttons: interactive.buttons === 'minimal' ? 'px-3 py-1' :
             interactive.buttons === 'standard' ? 'px-4 py-2' : 'px-6 py-3',
    hoverEffects: interactive.hoverEffects === 'none' ? '' :
                  interactive.hoverEffects === 'subtle' ? 'hover:scale-105' : 'hover:scale-110 hover:shadow-lg'
  }
}
