'use client'

import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import DesignPreview from './DesignPreview'

interface DesignPreviewButtonProps {
  className?: string
}

export default function DesignPreviewButton({ className = '' }: DesignPreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${className}`}
        style={{ borderRadius: 'var(--radius-button)' }}
        aria-label="Design-Konfiguration öffnen"
      >
        <MdSettings className="w-6 h-6" />
      </button>
      
      <DesignPreview 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
} 