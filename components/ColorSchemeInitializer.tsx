'use client'

import { useEffect } from 'react'
import { applyColorScheme } from '@/lib/colorSchemes'
import { eventManager, APP_EVENTS, setupOptimizedStorageListener } from '@/lib/eventManager'

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
      
      // Prüfen ob das Farbschema gültig ist
      const validSchemes = ['warm', 'modern', 'elegant', 'nature']
      const finalScheme = validSchemes.includes(savedColorScheme) ? savedColorScheme : 'warm'
      
      console.log('🎨 Verwende Farbschema:', finalScheme)
      
      // Farbschema anwenden
      applyColorScheme(finalScheme)
    }

    // Sofort beim Mount ausführen
    initializeColorScheme()

    // Event Listener für Änderungen des Farbschemas
    const handleColorSchemeChange = (eventData?: any) => {
      let newColorScheme: string
      
      if (eventData && eventData.key) {
        // Event von Event-Manager
        newColorScheme = eventData.newValue || 'warm'
      } else {
        // Direkter Aufruf
        newColorScheme = localStorage.getItem('selected-color-scheme') || 
                        localStorage.getItem('color-scheme') || 
                        'warm'
      }
      
      console.log('🎨 Farbschema geändert, wende an:', newColorScheme)
      
      // Prüfen ob das Farbschema gültig ist
      const validSchemes = ['warm', 'modern', 'elegant', 'nature']
      const finalScheme = validSchemes.includes(newColorScheme) ? newColorScheme : 'warm'
      
      console.log('🎨 Verwende Farbschema:', finalScheme)
      applyColorScheme(finalScheme)
    }

    // Event-Listener über Event-Manager registrieren
    const unsubscribeStorage = eventManager.addEventListener(APP_EVENTS.STORAGE_CHANGED, (eventData) => {
      if (eventData.key === 'selected-color-scheme' || eventData.key === 'color-scheme') {
        handleColorSchemeChange(eventData)
      }
    })

    const cleanupStorageListener = setupOptimizedStorageListener()

    // Custom Event Listener für Änderungen im gleichen Tab
    const unsubscribeCustom = eventManager.addEventListener(APP_EVENTS.COLOR_SCHEME_CHANGED, handleColorSchemeChange)

    // Cleanup
    return () => {
      unsubscribeStorage()
      unsubscribeCustom()
      cleanupStorageListener()
    }
  }, [])

  // Diese Komponente rendert nichts, sie initialisiert nur das Farbschema
  return null
}
