'use client'

import { useState } from 'react'
import DesignPreview from './DesignPreview'

export default function DesignPreviewButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
        title="Design Vorschau"
      >
        🎨
      </button>
      
      <DesignPreview 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
} 