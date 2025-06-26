'use client'

import { useState } from 'react'
import DesignPreview from './DesignPreview'

export default function DesignPreviewButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Einstellungen"
      >
        ⚙️
      </button>
      
      <DesignPreview 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
} 