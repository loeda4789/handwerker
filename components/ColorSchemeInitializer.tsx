'use client'

import { useEffect } from 'react'
import { applyColorScheme } from '@/lib/colorSchemes'

/**
 * ColorSchemeInitializer Component
 * 
 * Initialisiert das Farbschema beim Laden jeder Seite
 * und stellt sicher, dass es konsistent angewendet wird.
 */
export default function ColorSchemeInitializer() {
  useEffect(() => {
    // Farbschema beim Laden der Seite initialisieren
    const initializeColorScheme = () => {
      // Gespeichertes Farbschema aus localStorage laden
      const savedColorScheme = localStorage.getItem('selected-color-scheme') || 
                              localStorage.getItem('color-scheme') || 
                              'warm' // Fallback zu 'warm'
      
      console.log('🎨 Initialisiere Farbschema:', savedColorScheme)
      
      // Farbschema anwenden
      applyColorScheme(savedColorScheme)
    }

    // Sofort beim Mount ausführen
    initializeColorScheme()

    // Event Listener für Änderungen des Farbschemas
    const handleColorSchemeChange = () => {
      const newColorScheme = localStorage.getItem('selected-color-scheme') || 
                            localStorage.getItem('color-scheme') || 
                            'warm'
      
      console.log('🎨 Farbschema geändert, wende an:', newColorScheme)
      applyColorScheme(newColorScheme)
    }

    // Storage Event Listener für Änderungen in anderen Tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'selected-color-scheme' || e.key === 'color-scheme') {
        handleColorSchemeChange()
      }
    })

    // Custom Event Listener für Änderungen im gleichen Tab
    window.addEventListener('color-scheme-changed', handleColorSchemeChange)

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleColorSchemeChange)
      window.removeEventListener('color-scheme-changed', handleColorSchemeChange)
    }
  }, [])

  // Diese Komponente rendert nichts, sie initialisiert nur das Farbschema
  return null
}
