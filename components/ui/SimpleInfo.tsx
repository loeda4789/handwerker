'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore, MdExpandLess } from 'react-icons/md'

interface SimpleInfoProps {
  content: string
  className?: string
}

export default function SimpleInfo({ content, className = '' }: SimpleInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        aria-label="Information anzeigen"
      >
        <MdInfoOutline className="w-3 h-3" />
        {isExpanded ? (
          <MdExpandLess className="w-3 h-3" />
        ) : (
          <MdExpandMore className="w-3 h-3" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-200 rounded-r text-xs text-blue-800">
          <div className="whitespace-pre-wrap leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}
