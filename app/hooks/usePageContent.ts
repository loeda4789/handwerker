'use client'

import { useState, useEffect } from 'react'
import { getContentDataByBranche } from '@/lib/config'
import { ContentData } from '@/types/content'
import { useContentWithUrlParams } from '@/lib/hooks/useUrlParams'

export function usePageContent() {
  const [baseContent, setBaseContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Verwende den URL-Parameter-Hook für automatische URL-Parameter-Integration
  const content = useContentWithUrlParams(baseContent || {} as ContentData)

  useEffect(() => {
    const loadContent = () => {
      try {
        const loadedContent = getContentDataByBranche()
        setBaseContent(loadedContent)
        setError(null)
      } catch (err) {
        console.error('Fehler beim Laden des Contents:', err)
        setError('Fehler beim Laden der Inhalte')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return {
    content,
    loading,
    error,
    baseContent
  }
}
