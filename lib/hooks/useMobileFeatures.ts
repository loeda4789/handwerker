'use client'

import { useState, useEffect } from 'react'
import { useFeaturesConfig } from '@/contexts/AppConfigContext'

export function useMobileFeatures() {
  const [isMobile, setIsMobile] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const { features } = useFeaturesConfig()

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768
      console.log('🔍 Mobile Check:', { width: window.innerWidth, isMobile: mobile })
      setIsMobile(mobile)
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

  // Debug logging
  console.log('🔍 MobileFeatures Debug:', { 
    isMobile, 
    mobileContact: features.mobileContact, 
    shouldShow: isMobile && features.mobileContact 
  })

  return {
    isMobile,
    showContactModal,
    openContactModal,
    closeContactModal,
    isMobileContactEnabled: features.mobileContact
  }
}
