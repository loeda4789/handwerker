'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface BeforeAfterProps {
  content: ContentData
}

export default function BeforeAfter({ content }: BeforeAfterProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      gradient: "badge-gradient",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }
  
  const getFontClass = () => {
    const fontClasses = {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
      display: "font-display"
    }
    return fontClasses[fontFamily]
  }
  
  const beforeAfterData = content.beforeAfter || []
  const currentItem = beforeAfterData[0]

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100)
    setSliderPosition(percentage)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX)
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  // Fallback wenn keine Daten vorhanden sind
  if (!beforeAfterData || beforeAfterData.length === 0) {
    return null
  }

  return (
    <section id="vorher-nachher" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 ${getFontClass()}`}>
            {isModernStyle ? (
              <span className="heading-underline-large">Vorher / Nachher – unsere Transformationen im Vergleich</span>
            ) : (
              'Vorher / Nachher – unsere Transformationen im Vergleich'
            )}
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-3xl mx-auto">
            Erleben Sie die beeindruckenden Veränderungen durch unsere Arbeit. Bewegen Sie den Schieberegler, um den Unterschied zu sehen.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div
            ref={containerRef}
            className="relative bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-col-resize select-none"
            style={{ borderRadius: 'var(--radius-card)', aspectRatio: '16/10' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Before Image (rechts) */}
            <div className="absolute inset-0">
              <Image
                src={currentItem.beforeImage}
                alt="Vorher"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-semibold" 
                style={{ borderRadius: 'var(--radius-button)' }}>
                VORHER
              </div>
            </div>

            {/* After Image (links) - wird von Slider überdeckt */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={currentItem.afterImage}
                alt="Nachher"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 text-sm font-semibold"
                style={{ borderRadius: 'var(--radius-button)' }}>
                NACHHER
              </div>
            </div>

            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-col-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Slider Handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-gray-300 shadow-lg cursor-col-resize flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                  <div className="w-0.5 h-4 bg-gray-400"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Text */}
          <div className="text-center mt-6">
            <p className="text-lg font-semibold text-text dark:text-light mb-2">
              {currentItem.title}
            </p>
            <p className="text-text-secondary dark:text-light/70">
              {currentItem.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}