'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore, MdExpandLess } from 'react-icons/md'

interface CompactInfoProps {
  content: string
  className?: string
}

export default function CompactInfo({ content, className = '' }: CompactInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors text-xs"
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
        <div className="mt-1 p-2 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600">
          {content}
        </div>
      )}
    </div>
  )
}
