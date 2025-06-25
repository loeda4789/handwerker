'use client'

import { useState } from 'react'

export default function DevButton() {
  const [isOpen, setIsOpen] = useState(false)

  const testBranchenSystem = () => {
    console.log('=== BRANCHENSYSTEM TEST ===')
    
    // Aktuelle URL anzeigen
    console.log('Aktuelle URL:', window.location.href)
    
    // URL-Parameter prüfen
    const urlParams = new URLSearchParams(window.location.search)
    const branche = urlParams.get('branche')
    console.log('Branche-Parameter:', branche || 'nicht gesetzt')
    
    // Verfügbare Branchen anzeigen
    console.log('Verfügbare Branchen: dachdecker')
    
    // Test-Links generieren
    const baseUrl = window.location.origin + window.location.pathname
    console.log('Test-Links:')
    console.log('Standard (Fliesenleger):', baseUrl)
    console.log('Dachdecker:', baseUrl + '?branche=dachdecker')
  }

  const testDachdeckerLink = () => {
    const baseUrl = window.location.origin + window.location.pathname
    window.location.href = baseUrl + '?branche=dachdecker'
  }

  const testStandardLink = () => {
    const baseUrl = window.location.origin + window.location.pathname
    window.location.href = baseUrl
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        title="Development Tools"
      >
        🔧
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800 dark:text-white">Dev Tools</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={testBranchenSystem}
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
        >
          🔍 Test Branchensystem
        </button>
        
        <button
          onClick={testDachdeckerLink}
          className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
        >
          🏠 → Dachdecker
        </button>
        
        <button
          onClick={testStandardLink}
          className="w-full px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
        >
          🔧 → Standard (Fliesenleger)
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        <p>Console für Details öffnen</p>
      </div>
    </div>
  )
} 