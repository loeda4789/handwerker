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
      layout: { design: 'modern' } as any,
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'clean', fontFamily: 'sans', badgeStyle: 'none', spacing: 'comfortable' }
    }
  },
  {
    id: 'luxury',
    name: 'Luxus',
    description: 'Raffiniert, hochwertig',
    icon: 'L',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { design: 'rounded' } as any,
      headings: { underline: true, style: 'solid', color: 'secondary' },
      style: { package: 'luxury', fontFamily: 'serif', badgeStyle: 'none', spacing: 'spacious' }
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Seriös, vertrauenswürdig',
    icon: 'C',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { design: 'rounded' } as any,
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
      layout: { design: 'rounded' } as any,
      headings: { underline: true, style: 'dotted', color: 'accent' },
      style: { package: 'warm', fontFamily: 'sans', badgeStyle: 'none', spacing: 'comfortable' }
    }
  },
  {
    id: 'dynamic',
    name: 'Dynamisch',
    description: 'Kraftvoll, aufmerksamkeitsstark',
    icon: 'D',
    color: 'bg-gray-50 border-gray-200',
    config: {
      layout: { design: 'angular' } as any,
      headings: { underline: true, style: 'gradient', color: 'primary' },
      style: { package: 'dynamic', fontFamily: 'display', badgeStyle: 'none', spacing: 'spacious' }
    }
  }
]

export const getStylePackage = (packageId: string): StylePackage | undefined => {
  return STYLE_PACKAGES.find(pkg => pkg.id === packageId)
}

export const applyStylePackage = (config: AppConfig, packageId: string): AppConfig => {
  const stylePackage = getStylePackage(packageId)
  if (!stylePackage) return config

  console.log('🔧 applyStylePackage - packageId:', packageId)
  console.log('🔧 applyStylePackage - stylePackage:', stylePackage)
  console.log('🔧 applyStylePackage - config vorher:', config)

  const result = {
    ...config,
    layout: {
      ...config.layout,
      ...(stylePackage.config.layout?.design && { design: stylePackage.config.layout.design })
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

  console.log('🔧 applyStylePackage - result:', result)
  return result
}
