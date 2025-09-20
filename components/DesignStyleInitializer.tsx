'use client'

import { useEffect } from 'react'
import { styleManager } from '@/lib/unifiedStyleManager'

export default function DesignStyleInitializer() {
  useEffect(() => {
    // Design-Style aus localStorage laden und anwenden
    const savedDesignStyle = localStorage.getItem('design-style')
    const savedColorScheme = localStorage.getItem('selected-color-scheme') || 'warm'
    
    if (savedDesignStyle) {
      // Konfiguration mit gespeicherten Werten erstellen
      const config = {
        version: '1.0.0',
        layout: {
          mode: 'multipage' as const,
          design: (savedDesignStyle as any) || 'einfach',
          variant: 'professional' as const
        },
        theme: {
          colorScheme: (savedColorScheme as any) || 'warm',
          darkMode: false
        },
        features: {
          contactBar: false,
          sideContact: false,
          mobileContact: false,
          statusInfo: false,
          whatsapp: true
        },
        header: {
          variant: 'adaptive' as const,
          behavior: {
            hideOnScroll: false,
            floating: false,
            transparent: false
          },
          navigation: {
            showLogo: true,
            showCta: true,
            showMobileMenu: true,
            mobileType: 'sidebar' as const
          }
        },
        hero: {
          type: 'single' as const
        },
        headings: {
          underline: true,
          style: 'solid' as const,
          color: 'primary' as const,
          gradient: savedDesignStyle === 'modern'
        },
        style: {
          package: (savedDesignStyle as any) || 'einfach',
          fontFamily: 'sans' as const,
          badgeStyle: 'minimal' as const,
          spacing: 'comfortable' as const,
          borderRadius: (savedDesignStyle === 'modern' ? 'pronounced' : savedDesignStyle === 'rounded' ? 'subtle' : 'none') as 'none' | 'subtle' | 'pronounced',
          borders: 'subtle' as const
        },
        system: {
          isFirstVisit: false,
          quickEditMode: false,
          activeTab: 'layout' as const
        }
      }
      
      // Styles über UnifiedStyleManager anwenden
      styleManager.updateConfig(config)
      
      // Body data-style Attribut setzen für CSS-Selektoren
      document.body.setAttribute('data-style', savedDesignStyle)
      
      console.log('🎨 Design-Style initialisiert:', savedDesignStyle)
    }
  }, [])

  return null
}
