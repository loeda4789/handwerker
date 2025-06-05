'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ContentData } from '@/types/content'

interface BeforeAfterProps {
  content: ContentData
}

export default function BeforeAfter({ content }: BeforeAfterProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const beforeAfterData = content.beforeAfter || []
  const currentItem = beforeAfterData[currentIndex]

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
    <section id="vorher-nachher" className="bg-surface dark:bg-dark-secondary py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            Vorher / Nachher – unsere Transformationen im Vergleich
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-3xl mx-auto">
            Erleben Sie die beeindruckenden Veränderungen durch unsere Arbeit. Bewegen Sie den Schieberegler, um den Unterschied zu sehen.
          </p>
        </div>

        {/* Before/After Slider */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-2xl cursor-col-resize select-none"
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
                className="w-full h-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xl font-bold"
                style={{
                  backgroundImage: `url(${currentItem.afterImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="bg-black/50 px-4 py-2 rounded">
                  Nachher
                </div>
              </div>
            </div>

            {/* Before Image (Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div 
                className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center text-white text-xl font-bold"
                style={{
                  backgroundImage: `url(${currentItem.beforeImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: `${100 * (100 / sliderPosition)}%`
                }}
              >
                <div className="bg-black/50 px-4 py-2 rounded">
                  Vorher
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 cursor-col-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
              Vorher
            </div>
            <div className="absolute bottom-4 right-4 bg-primary text-white px-3 py-1 rounded text-sm font-medium">
              Nachher
            </div>
          </div>

          {/* Project Info */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold text-text dark:text-light mb-2">
              {currentItem.title}
            </h3>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary dark:text-accent rounded-full text-sm font-medium mb-4">
              {currentItem.category}
            </span>
            <p className="text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
              {currentItem.description}
            </p>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {beforeAfterData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setSliderPosition(50) // Reset slider position
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary dark:bg-accent' 
                    : 'bg-border dark:bg-gray-600 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => {
                setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : beforeAfterData.length - 1)
                setSliderPosition(50)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-surface dark:bg-dark border border-border dark:border-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              <span>Vorherige</span>
            </button>
            <button
              onClick={() => {
                setCurrentIndex(currentIndex < beforeAfterData.length - 1 ? currentIndex + 1 : 0)
                setSliderPosition(50)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-surface dark:bg-dark border border-border dark:border-gray-600 rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <span>Nächste</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}