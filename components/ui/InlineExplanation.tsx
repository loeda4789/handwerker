'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore } from 'react-icons/md'

interface InlineExplanationProps {
  content: string
  className?: string
}

export default function InlineExplanation({ content, className = '' }: InlineExplanationProps) {
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
        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
          <div className="whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
