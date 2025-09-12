'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import ModernSpinner from '../ui/ModernSpinner'

interface ImageWithFallbackProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  quality?: number
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
}

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  quality = 80,
  priority = false,
  placeholder = 'empty',
  fallbackSrc,
  onLoad,
  onError,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }
    if (onError) onError()
  }, [fallbackSrc, imgSrc, onError])

  if (hasError && !fallbackSrc) {
    return (
      <div className={`bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center ${className} transition-all duration-300 hover:from-primary/30 hover:to-accent/30`}>
        <div className="text-center animate-[fadeIn_0.5s_ease-out]">
          <svg className="w-16 h-16 text-primary/60 mx-auto mb-4 transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <p className="text-primary/60 text-sm font-medium">Bild nicht verfügbar</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center z-10 ${className}`}>
          <ModernSpinner variant="dots" size="md" color="primary" />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        className={`${className} transition-all duration-700 ease-out ${
          isLoading 
            ? 'opacity-0 scale-105 blur-sm' 
            : 'opacity-100 scale-100 blur-0 hover:scale-105'
        }`}
        sizes={sizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
} 