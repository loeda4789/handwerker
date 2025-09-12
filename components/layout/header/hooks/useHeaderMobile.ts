import { useState, useEffect } from 'react'

export const useHeaderMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Verhindere Scrollen wenn Menü offen ist
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  }
}
