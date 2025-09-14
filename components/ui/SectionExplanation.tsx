'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore } from 'react-icons/md'

interface SectionExplanationProps {
  content: string
  className?: string
}

export default function SectionExplanation({ content, className = '' }: SectionExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        aria-label="Erklärung anzeigen"
      >
        <MdInfoOutline className="w-3 h-3" />
        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <MdExpandMore className="w-2.5 h-2.5" />
        </div>
      </button>

      {isExpanded && (
        <div className="absolute left-0 right-0 mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm z-10">
          <div className="whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
