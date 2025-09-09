import { AppConfig } from './types'

export interface StylePackage {
  id: 'modern' | 'elegant' | 'professional' | 'friendly' | 'bold'
  name: string
  description: string
  icon: string
  color: string
  config: Partial<AppConfig>
}

export const STYLE_PACKAGES: StylePackage[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sauber, minimalistisch, zeitgemäß',
    icon: 'M',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'modern' },
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'modern', fontFamily: 'sans', badgeStyle: 'rounded', spacing: 'comfortable' }
    }
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Raffiniert, luxuriös, hochwertig',
    icon: 'E',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'rounded' },
      headings: { underline: true, style: 'solid', color: 'secondary' },
      style: { package: 'elegant', fontFamily: 'serif', badgeStyle: 'minimal', spacing: 'spacious' }
    }
  },
  {
    id: 'professional',
    name: 'Professionell',
    description: 'Seriös, vertrauenswürdig, kompetent',
    icon: 'P',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'angular' },
      headings: { underline: false, style: 'none', color: 'primary' },
      style: { package: 'professional', fontFamily: 'sans', badgeStyle: 'outlined', spacing: 'compact' }
    }
  },
  {
    id: 'friendly',
    name: 'Freundlich',
    description: 'Warm, einladend, persönlich',
    icon: 'F',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'rounded' },
      headings: { underline: true, style: 'dotted', color: 'accent' },
      style: { package: 'friendly', fontFamily: 'sans', badgeStyle: 'pill', spacing: 'comfortable' }
    }
  },
  {
    id: 'bold',
    name: 'Auffallend',
    description: 'Kraftvoll, dynamisch, aufmerksamkeitsstark',
    icon: 'B',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'angular' },
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'bold', fontFamily: 'display', badgeStyle: 'rounded', spacing: 'spacious' }
    }
  }
]

export const getStylePackage = (packageId: string): StylePackage | undefined => {
  return STYLE_PACKAGES.find(pkg => pkg.id === packageId)
}

export const applyStylePackage = (config: AppConfig, packageId: string): AppConfig => {
  const stylePackage = getStylePackage(packageId)
  if (!stylePackage) return config

  return {
    ...config,
    layout: {
      ...config.layout,
      ...stylePackage.config.layout
    },
    theme: {
      ...config.theme,
      ...stylePackage.config.theme
    },
    headings: {
      ...config.headings,
      ...stylePackage.config.headings
    },
    style: {
      ...config.style,
      ...stylePackage.config.style
    }
  }
}
