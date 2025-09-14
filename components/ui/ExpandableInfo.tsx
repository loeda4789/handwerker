'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore, MdExpandLess } from 'react-icons/md'

interface ExpandableInfoProps {
  content: string
  className?: string
}

export default function ExpandableInfo({ content, className = '' }: ExpandableInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Information anzeigen"
      >
        <MdInfoOutline className="w-4 h-4" />
      </button>

      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-start justify-between gap-2">
            <div className="text-sm text-gray-700 whitespace-pre-wrap flex-1">
              {content}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Information schließen"
            >
              <MdExpandLess className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
