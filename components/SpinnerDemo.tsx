'use client'

import React from 'react'
import ModernSpinner from './ModernSpinner'

export default function SpinnerDemo() {
  const variants = ['ring', 'pulse', 'dots', 'wave', 'bars', 'squares'] as const
  const sizes = ['sm', 'md', 'lg', 'xl'] as const
  const colors = ['primary', 'white', 'accent'] as const

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 max-w-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">🎨 Spinner Demo</h3>
      
      {/* Varianten */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Varianten</h4>
        <div className="grid grid-cols-3 gap-3">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
              <ModernSpinner variant={variant} size="md" color="primary" />
              <span className="text-xs mt-2 text-gray-600">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Größen */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Größen</h4>
        <div className="flex items-center justify-between gap-4 p-3 rounded-lg bg-gray-50">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center">
              <ModernSpinner variant="ring" size={size} color="primary" />
              <span className="text-xs mt-2 text-gray-600">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Farben */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Farben</h4>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-gray-50">
            <ModernSpinner variant="ring" size="md" color="primary" />
            <span className="text-xs mt-2 text-gray-600">primary</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-gray-800">
            <ModernSpinner variant="ring" size="md" color="white" />
            <span className="text-xs mt-2 text-white">white</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-accent">
            <ModernSpinner variant="ring" size="md" color="accent" />
            <span className="text-xs mt-2 text-gray-600">accent</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Komponente wird nur im Development angezeigt
      </div>
    </div>
  )
} 