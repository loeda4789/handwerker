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
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        aria-label="Information anzeigen"
      >
        <MdInfoOutline className="w-4 h-4" />
        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <MdExpandMore className="w-3 h-3" />
        </div>
      </button>

      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 w-80 max-w-[90vw] bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-[10002]">
          {/* Pfeil nach oben */}
          <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
