'use client'

import { useMobileFeatures } from '@/lib/hooks/useMobileFeatures'
import MobileContactModal from './MobileContactModal'
import MobileWhatsAppButton from './MobileWhatsAppButton'

export default function MobileFeaturesNav() {
  const { isMobile, showContactModal, openContactModal, closeContactModal, isMobileContactEnabled } = useMobileFeatures()

  if (!isMobile || !isMobileContactEnabled) return null

  return (
    <>
      {/* Mobile Contact Button */}
      <button
        onClick={openContactModal}
        className="fixed bottom-20 right-6 z-40 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ 
          borderRadius: 'var(--radius-button)',
          backgroundColor: 'var(--color-secondary)',
          boxShadow: `
            0 10px 25px -5px rgba(0, 0, 0, 0.2),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          e.currentTarget.style.boxShadow = `
            0 20px 40px -10px rgba(0, 0, 0, 0.3),
            0 8px 12px -2px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
          e.currentTarget.style.boxShadow = `
            0 10px 25px -5px rgba(0, 0, 0, 0.2),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
          `;
        }}
        aria-label="Kontakt aufnehmen"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Mobile WhatsApp Button */}
      <MobileWhatsAppButton />

      {/* Mobile Contact Modal */}
      <MobileContactModal 
        isOpen={showContactModal} 
        onClose={closeContactModal} 
      />
    </>
  )
}
