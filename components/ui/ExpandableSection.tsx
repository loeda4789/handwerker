'use client'

import { useState } from 'react'
import { MdInfoOutline, MdExpandMore } from 'react-icons/md'

interface ExpandableSectionProps {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  explanation: string
  className?: string
}

export default function ExpandableSection({ 
  title, 
  icon, 
  content, 
  explanation, 
  className = '' 
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          {title}
        </h3>
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
      </div>

      {isExpanded && (
        <div className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 shadow-sm">
          <div className="whitespace-pre-wrap leading-relaxed">
            {explanation}
          </div>
        </div>
      )}

      {content}
    </div>
  )
}
