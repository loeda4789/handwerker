'use client'

import React, { useEffect, useState } from 'react'
import { ContentData, BeforeAfterItem } from '@/types/content'
import { useImagePreloader } from '@/lib/hooks/useImagePreloader'

interface ImagePerformanceMonitorProps {
  content: ContentData
  enabled?: boolean
}

export default function ImagePerformanceMonitor({ 
  content, 
  enabled = process.env.NODE_ENV === 'development' 
}: ImagePerformanceMonitorProps) {
  const [performanceData, setPerformanceData] = useState<{
    loadTime: number
    imageCount: number
    failedCount: number
  } | null>(null)

  // Sammle alle Bildquellen aus dem Content
  const allImages = React.useMemo(() => {
    const images: string[] = []
    
    // Hero-Bilder
    if (content.hero?.backgroundImages) {
      images.push(content.hero.backgroundImages.desktop)
      images.push(content.hero.backgroundImages.mobile)
    }
    
    // About-Bild
    if (content.about?.image) {
      images.push(content.about.image)
    }
    
    // Service-Bilder
    content.services?.forEach(service => {
      if (service.image) images.push(service.image)
      service.projects?.forEach(project => {
        if (project.image) images.push(project.image)
      })
    })
    
    // Portfolio-Bilder
    content.portfolio?.projects?.forEach(project => {
      if (project.image) images.push(project.image)
    })
    
    // Team-Fotos
    content.team?.forEach(member => {
      if (member.photo) images.push(member.photo)
    })
    
    // Before/After-Bilder
    content.beforeAfter?.forEach((item: BeforeAfterItem) => {
      if (item.beforeImage) images.push(item.beforeImage)
      if (item.afterImage) images.push(item.afterImage)
    })
    
    return [...new Set(images)] // Entferne Duplikate
  }, [content])

  const { isLoading, loadedImages, failedImages } = useImagePreloader(allImages, {
    priority: true,
    preloadDelay: 50
  })

  useEffect(() => {
    if (!isLoading && allImages.length > 0) {
      const loadTime = performance.now()
      setPerformanceData({
        loadTime: Math.round(loadTime),
        imageCount: loadedImages.length,
        failedCount: failedImages.length
      })
    }
  }, [isLoading, allImages.length, loadedImages.length, failedImages.length])

  // Nur in Development-Modus anzeigen
  if (!enabled || !performanceData) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono backdrop-blur-sm">
      <div className="space-y-1">
        <div>🖼️ Bilder: {performanceData.imageCount}/{allImages.length}</div>
        <div>⏱️ Ladezeit: {performanceData.loadTime}ms</div>
        {performanceData.failedCount > 0 && (
          <div className="text-red-400">❌ Fehler: {performanceData.failedCount}</div>
        )}
        <div className="text-green-400">
          ✅ {Math.round((performanceData.imageCount / allImages.length) * 100)}% geladen
        </div>
      </div>
    </div>
  )
} 