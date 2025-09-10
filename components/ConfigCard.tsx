'use client'

import { useState } from 'react'
import { MdSettings } from 'react-icons/md'
import { useAppConfig, useLayoutConfig } from '@/contexts/AppConfigContext'
import ConfigSidebar from './ConfigSidebar'

export default function ConfigCard() {
  const { config } = useAppConfig()
  const { mode: siteMode, design: designStyle } = useLayoutConfig()
  const [isOpen, setIsOpen] = useState(false)

  const summary = {
    design: designStyle === 'angular' ? 'Eckig' : designStyle === 'rounded' ? 'Abgerundet' : 'Modern',
    color: config.theme.colorScheme === 'warm' ? 'Warm' : 
           config.theme.colorScheme === 'modern' ? 'Modern' : 
           config.theme.colorScheme === 'elegant' ? 'Elegant' : 'Nature',
    mode: siteMode === 'onepage' ? 'One-Page' : 'Multi-Page'
  }

  return (
    <>
      {/* Mobile Card Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 config-card-button"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold text-gray-900">
                Website Designer
              </div>
              <div className="text-sm text-gray-500">
                {summary.design} • {summary.color} • {summary.mode}
              </div>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-white shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 hover:scale-105 config-card-button"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <MdSettings className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">
                Website Designer
              </div>
              <div className="text-sm text-gray-500">
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