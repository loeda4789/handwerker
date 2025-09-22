'use client'

import { useEffect, useState } from 'react'
import { getContentDataByBranche, getCurrentBranche } from '@/lib/config'

export default function BrancheDebug() {
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    const content = getContentDataByBranche()
    const currentBranche = getCurrentBranche()
    
    setDebugInfo({
      currentBranche,
      companyName: content.company.name,
      companyTagline: content.company.tagline,
      aboutText: content.about.text.substring(0, 100) + '...',
      urlParams: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('branche') : null
    })
  }, [])

  if (!debugInfo) return null

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '2px solid #000', 
      padding: '10px', 
      zIndex: 9999,
      fontSize: '12px',
      maxWidth: '300px'
    }}>
      <h3> Branche Debug</h3>
      <p><strong>Aktuelle Branche:</strong> {debugInfo.currentBranche || 'Keine'}</p>
      <p><strong>URL-Parameter:</strong> {debugInfo.urlParams || 'Keine'}</p>
      <p><strong>Firmenname:</strong> {debugInfo.companyName}</p>
      <p><strong>Tagline:</strong> {debugInfo.companyTagline}</p>
      <p><strong>About-Text:</strong> {debugInfo.aboutText}</p>
    </div>
  )
}
