import { useState, useRef, useEffect } from 'react'

export const useHeaderDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Cleanup
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const toggleDropdown = (itemId: string) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId)
  }

  // Desktop Dropdown Handlers
  const handleDesktopMouseEnter = (itemId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setDesktopDropdown(itemId)
  }

  const handleDesktopMouseLeave = (itemId: string) => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null)
    }, 150)
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setDesktopDropdown(null)
    }, 150)
  }

  return {
    openDropdown,
    desktopDropdown,
    dropdownRef,
    toggleDropdown,
    handleDesktopMouseEnter,
    handleDesktopMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave
  }
}
