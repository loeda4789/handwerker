'use client'

import { useState } from 'react'
import { MdSettings, MdBrush, MdPalette, MdStar, MdDescription } from 'react-icons/md'
import { useAppConfig } from '@/contexts/AppConfigContext'
import ConfigSidebar from './ConfigSidebar'

export default function ConfigCard() {
  const [isOpen, setIsOpen] = useState(false)
  const { config } = useAppConfig()

  const getConfigSummary = () => {
    const design = config.layout.design
    const color = config.theme.colorScheme
    const mode = config.layout.mode
    
    return {
      design: design === 'angular' ? 'Eckig' : design === 'rounded' ? 'Abgerundet' : 'Modern',
      color: color === 'warm' ? 'Warm' : color === 'modern' ? 'Modern' : color === 'elegant' ? 'Elegant' : 'Natur',
      mode: mode === 'onepage' ? 'One-Page' : 'Multi-Page'
    }
  }

  const summary = getConfigSummary()

  return (
    <>
      {/* Mobile Card Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900 dark:text-white">
                Design anpassen
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {summary.design} • {summary.color} • {summary.mode}
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
              <div className="w-2 h-2 bg-orange-100 rounded-full"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900 dark:text-white">
                Design-Konfiguration
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {summary.design} • {summary.color}
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Sidebar */}
      <ConfigSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
