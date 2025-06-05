'use client'

import React, { useState } from 'react'
import ThemeEditor from './ThemeEditor'

export default function DevButton() {
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  return (
    <>
      {/* Floating Developer Button */}
      <div className="fixed bottom-4 left-4 z-[9998]">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-3 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 border-2 border-yellow-300 animate-pulse hover:animate-none"
          title="Theme Editor öffnen (Development Tool)"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎨</span>
            <span className="hidden group-hover:block text-xs font-bold bg-black/20 px-2 py-1 rounded whitespace-nowrap">
              DEV TOOL
            </span>
          </div>
        </button>
        
        {/* Zusätzlicher Hinweis */}
        <div className="absolute -top-8 left-0 bg-gray-900 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          ⚠️ Development Mode
        </div>
      </div>

      {/* Theme Editor Modal */}
      <ThemeEditor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
      />
    </>
  )
} 