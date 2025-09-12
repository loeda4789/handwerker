'use client'

import { useState, useEffect } from 'react'

export function useDesignStyle() {
  const [designStyle, setDesignStyle] = useState<string>('rounded')

  useEffect(() => {
    // Design-Style aus localStorage laden
    const savedDesignStyle = localStorage.getItem('design-style')
    if (savedDesignStyle) {
      setDesignStyle(savedDesignStyle)
    }
    
    const handleDesignStyleChange = () => {
      const newDesignStyle = localStorage.getItem('design-style')
      if (newDesignStyle) {
        setDesignStyle(newDesignStyle)
      }
    }
    
    window.addEventListener('storage', handleDesignStyleChange)
    return () => window.removeEventListener('storage', handleDesignStyleChange)
  }, [])

  return {
    designStyle,
    setDesignStyle
  }
}
