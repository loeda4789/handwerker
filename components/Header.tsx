'use client'

import { ContentData } from '@/types/content'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'
import { useHeroConfig } from '@/contexts/AppConfigContext'
import HeaderKlassik from './header/HeaderKlassik'
import HeaderRounded from './header/HeaderRounded'
import HeaderModern from './header/HeaderModern'
import HeaderStandard from './header/HeaderStandard'

interface HeaderProps {
  content: ContentData
}

export default function Header({ content }: HeaderProps) {
  const { design: designStyle } = useLayoutConfig()
  const { type: heroType } = useHeroConfig()
  const { package: stylePackage } = useStyleConfig()
  
  // Debug-Logs für Header-Auswahl
  console.log('🔍 Header Debug:', { designStyle, heroType, stylePackage })
  
  // Header-Varianten-Logik
  const getHeaderVariant = () => {
    // 1. Klassik: Hero-Typ "split" oder Stil-Paket "luxury"
    if (heroType === 'split' || stylePackage === 'luxury') {
      console.log('🎯 Header-Variante: klassik (heroType:', heroType, 'stylePackage:', stylePackage, ')')
      return 'klassik'
    }
    
    // 2. Rounded: Design-Stil "rounded"
    if (designStyle === 'rounded') {
      console.log('🎯 Header-Variante: rounded (designStyle:', designStyle, ')')
      return 'rounded'
    }
    
    // 3. Modern: Design-Stil "modern"
    if (designStyle === 'modern') {
      console.log('🎯 Header-Variante: modern (designStyle:', designStyle, ')')
      return 'modern'
    }
    
    // 4. Standard: Fallback für angular und andere
    console.log('🎯 Header-Variante: standard (fallback)')
    return 'standard'
  }
  
  const variant = getHeaderVariant()
  console.log('🎯 Finale Header-Variante:', variant)
  
  // Header-Komponente basierend auf Variante
  switch (variant) {
    case 'klassik':
      return <HeaderKlassik content={content} />
    case 'rounded':
      return <HeaderRounded content={content} />
    case 'modern':
      return <HeaderModern content={content} />
    default:
      return <HeaderStandard content={content} />
  }
}