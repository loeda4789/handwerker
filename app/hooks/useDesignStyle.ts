'use client'

import { useState, useEffect } from 'react'
import { styleManager } from '@/lib/unifiedStyleManager'

export function useDesignStyle() {
  const [designStyle, setDesignStyle] = useState<string>('rounded')

  useEffect(() => {
    // Design-Style aus localStorage laden
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
      
      // Styles sofort anwenden basierend auf dem Design-Style
      const config = {
        version: '1.0.0',
        layout: {
          mode: 'multipage' as const,
          design: (savedDesignStyle as any) || 'einfach',
          variant: 'professional' as const
        },
        theme: {
          colorScheme: 'warm' as const,
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
    }
    
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
        
        // Styles sofort anwenden basierend auf dem neuen Design-Style
        const config = {
          version: '1.0.0',
          layout: {
            mode: 'multipage' as const,
            design: (newDesignStyle as any) || 'einfach',
            variant: 'professional' as const
          },
          theme: {
            colorScheme: 'warm' as const,
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
            gradient: newDesignStyle === 'modern'
          },
          style: {
            package: (newDesignStyle as any) || 'einfach',
            fontFamily: 'sans' as const,
            badgeStyle: 'minimal' as const,
            spacing: 'comfortable' as const,
            borderRadius: (newDesignStyle === 'modern' ? 'pronounced' : newDesignStyle === 'rounded' ? 'subtle' : 'none') as 'none' | 'subtle' | 'pronounced',
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
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    return () => window.removeEventListener('storage', handleDesignStyleChange)
  }, [])

  return {
    designStyle,
    setDesignStyle
  }
}
