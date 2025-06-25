'use client'

import { useState, useEffect, useCallback } from 'react'

interface PreloadOptions {
  priority?: boolean
  preloadDelay?: number
}

export function useImagePreloader(imageSources: string[], options: PreloadOptions = {}) {
  const { priority = false, preloadDelay = 100 } = options
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(src))
        resolve()
      }
      
      img.onerror = () => {
        setFailedImages(prev => new Set(prev).add(src))
        reject(new Error(`Failed to load image: ${src}`))
      }
      
      img.src = src
    })
  }, [])

  const preloadImages = useCallback(async () => {
    setIsLoading(true)
    
    if (priority) {
      // Preload all images immediately for priority images
      const promises = imageSources.map(src => 
        preloadImage(src).catch(() => {}) // Ignore errors for batch loading
      )
      await Promise.allSettled(promises)
    } else {
      // Preload images with delay for better performance
      for (const src of imageSources) {
        try {
          await preloadImage(src)
          if (preloadDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, preloadDelay))
          }
        } catch {
          // Continue with next image if one fails
        }
      }
    }
    
    setIsLoading(false)
  }, [imageSources, preloadImage, priority, preloadDelay])

  useEffect(() => {
    if (imageSources.length > 0) {
      preloadImages()
    }
  }, [preloadImages])

  const isImageLoaded = useCallback((src: string) => loadedImages.has(src), [loadedImages])
  const isImageFailed = useCallback((src: string) => failedImages.has(src), [failedImages])

  return {
    isLoading,
    loadedImages: Array.from(loadedImages),
    failedImages: Array.from(failedImages),
    isImageLoaded,
    isImageFailed,
    preloadImage,
  }
} 