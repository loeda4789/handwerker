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
        className="fixed bottom-20 right-6 z-40 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{ borderRadius: 'var(--radius-button)' }}
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
