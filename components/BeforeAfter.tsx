'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'

interface BeforeAfterProps {
  content: ContentData
}

export default function BeforeAfter({ content }: BeforeAfterProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()
  
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
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
    <section id="vorher-nachher" className="py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            <span className="heading-underline-large">Vorher / Nachher – unsere Transformationen im Vergleich</span>
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-3xl mx-auto">
            Erleben Sie die beeindruckenden Veränderungen durch unsere Arbeit. Bewegen Sie den Schieberegler, um den Unterschied zu sehen.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div 
            ref={containerRef}
            className="relative w-full h-96 md:h-[500px] overflow-hidden shadow-2xl cursor-col-resize select-none"
            style={{ borderRadius: 'var(--radius-image)' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${currentItem.afterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>

            {/* Before Image (Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${currentItem.beforeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: `${100 * (100 / sliderPosition)}%`
                }}
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-col-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary border-4 border-white flex items-center justify-center shadow-lg"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                </svg>
              </div>
            </div>

            {/* Labels */}
                            <div className="absolute bottom-4 left-4 text-white px-3 py-1 rounded text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-secondary)' }}>
              Vorher
            </div>
                            <div className="absolute bottom-4 right-4 text-white px-3 py-1 rounded text-sm font-medium"
                  style={{ backgroundColor: 'var(--color-secondary)' }}>
              Nachher
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-2">
              {currentItem.title}
            </h3>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-accent text-sm font-medium mb-4"
              style={{ borderRadius: 'var(--radius-button)' }}>
              {currentItem.category}
            </span>
            <p className="text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
              {currentItem.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}