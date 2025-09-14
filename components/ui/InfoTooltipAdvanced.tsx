'use client'

import { useState, useRef, useEffect } from 'react'
import { MdInfoOutline } from 'react-icons/md'

interface InfoTooltipAdvancedProps {
  content: string
  className?: string
  variant?: 'tooltip' | 'expandable'
}

export default function InfoTooltipAdvanced({ 
  content, 
  className = '', 
  variant = 'tooltip' 
}: InfoTooltipAdvancedProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Tooltip-Positionierung (nur für tooltip-Variante)
  useEffect(() => {
    if (variant === 'tooltip' && isOpen && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + 8
      let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)

      // Anpassung falls Tooltip außerhalb des Viewports
      if (left < 8) left = 8
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8
      }
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = triggerRect.top - tooltipRect.height - 8
      }

      setPosition({ top, left })
    }
  }, [isOpen, variant])

  // Click-Outside-Handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (variant === 'expandable') {
    return (
      <div className={`relative inline-block ${className}`}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Information anzeigen"
        >
          <MdInfoOutline className="w-4 h-4" />
        </button>

        {isOpen && (
          <div
            ref={tooltipRef}
            className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-[10002]"
          >
            <div className="text-sm text-gray-700 whitespace-pre-wrap">
              {content}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Tooltip-Variante
  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Information anzeigen"
      >
        <MdInfoOutline className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="fixed z-[10002] max-w-xs p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <div className="whitespace-pre-wrap">{content}</div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  )
}
