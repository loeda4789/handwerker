'use client'

import { useEffect } from 'react'
import { setupStyleListener } from '@/lib/style'

/**
 * FontStyleInitializer Component
 * 
 * Initialisiert das Font-Style-System beim Laden der Seite
 * und synchronisiert es mit dem unifiedStyles System.
 */
export default function FontStyleInitializer() {
  useEffect(() => {
    // Font-Style-System initialisieren
    setupStyleListener()
  }, [])

  // Diese Komponente rendert nichts, sie initialisiert nur das System
  return null
}
