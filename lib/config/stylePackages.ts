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
    icon: '🎨',
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
    icon: '✨',
    color: 'bg-purple-50 border-purple-200',
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
    icon: '💼',
    color: 'bg-blue-50 border-blue-200',
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
    icon: '😊',
    color: 'bg-green-50 border-green-200',
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
    icon: '⚡',
    color: 'bg-orange-50 border-orange-200',
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
    ...stylePackage.config,
    style: {
      ...config.style,
      ...stylePackage.config.style
    }
  }
}
