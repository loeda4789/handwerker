import { AppConfig } from './types'

export interface StylePackage {
  id: 'clean' | 'luxury' | 'corporate' | 'warm' | 'dynamic'
  name: string
  description: string
  icon: string
  color: string
  config: Partial<AppConfig>
}

export const STYLE_PACKAGES: StylePackage[] = [
  {
    id: 'clean',
    name: 'Sauber',
    description: 'Minimalistisch, zeitgemäß',
    icon: 'C',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'modern' },
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'clean', fontFamily: 'sans', badgeStyle: 'rounded', spacing: 'comfortable' }
    }
  },
  {
    id: 'luxury',
    name: 'Luxus',
    description: 'Raffiniert, hochwertig',
    icon: 'L',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'rounded' },
      headings: { underline: true, style: 'solid', color: 'secondary' },
      style: { package: 'luxury', fontFamily: 'serif', badgeStyle: 'minimal', spacing: 'spacious' }
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Seriös, vertrauenswürdig',
    icon: 'C',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'angular' },
      headings: { underline: false, style: 'none', color: 'primary' },
      style: { package: 'corporate', fontFamily: 'sans', badgeStyle: 'outlined', spacing: 'compact' }
    }
  },
  {
    id: 'warm',
    name: 'Warm',
    description: 'Einladend, persönlich',
    icon: 'W',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'rounded' },
      headings: { underline: true, style: 'dotted', color: 'accent' },
      style: { package: 'warm', fontFamily: 'sans', badgeStyle: 'pill', spacing: 'comfortable' }
    }
  },
  {
    id: 'dynamic',
    name: 'Dynamisch',
    description: 'Kraftvoll, aufmerksamkeitsstark',
    icon: 'D',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { mode: 'onepage', design: 'angular' },
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'dynamic', fontFamily: 'display', badgeStyle: 'rounded', spacing: 'spacious' }
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
