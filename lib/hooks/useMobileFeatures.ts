'use client'

import { useState, useEffect } from 'react'

export function useMobileFeatures() {
  const [isMobile, setIsMobile] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Listen for resize events
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const openContactModal = () => {
    setShowContactModal(true)
  }

  const closeContactModal = () => {
    setShowContactModal(false)
  }

  return {
    isMobile,
    showContactModal,
    openContactModal,
    closeContactModal
  }
}
