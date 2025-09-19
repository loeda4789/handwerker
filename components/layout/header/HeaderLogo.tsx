import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeaderLogoProps {
  logoStyle: string
  companyName: string
}

export default function HeaderLogo({ logoStyle, companyName }: HeaderLogoProps) {
  const [textColor, setTextColor] = useState<string>('var(--color-text)')

  // Helper function to generate initials from company name
  const getCompanyInitials = (companyName: string): string => {
    return companyName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) // Max 2 Buchstaben
  }

  // Check if company name contains "Elektro" to show the new logo
  const isElektroCompany = companyName.toLowerCase().includes('elektro') || 
                          companyName.toLowerCase().includes('elektriker') ||
                          companyName.toLowerCase().includes('elektroinstallation')

  // Update color when color scheme changes
  useEffect(() => {
    const updateColor = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)
      const color = computedStyle.getPropertyValue('--color-text').trim()
      setTextColor(color || 'var(--color-text)')
    }

    // Initiale Farbe setzen
    updateColor()

    // Auf Farbschema-Änderungen hören
    const handleColorSchemeChange = () => {
      updateColor()
    }

    // Event-Listener für Farbschema-Änderungen
    window.addEventListener('storage', handleColorSchemeChange)
    window.addEventListener('color-scheme-changed', handleColorSchemeChange)

    return () => {
      window.removeEventListener('storage', handleColorSchemeChange)
      window.removeEventListener('color-scheme-changed', handleColorSchemeChange)
    }
  }, [])

  return (
    <Link href="/" className="flex items-center">
      {isElektroCompany ? (
        // New E + Elektro Logo as text/HTML for color adaptation
        <div className="h-12 w-auto flex items-center justify-center" style={{ color: textColor }}>
          <div className="flex items-center space-x-2">
            {/* E-Symbol als HTML */}
            <div className="flex flex-col justify-center">
              <div className="w-6 h-1 bg-current mb-1"></div>
              <div className="w-6 h-1 bg-current mb-1"></div>
              <div className="w-6 h-1 bg-current"></div>
            </div>
            {/* Text */}
            <span className="text-xl font-bold tracking-wider" style={{ color: textColor }}>
              ELEKTRO
            </span>
          </div>
        </div>
      ) : (
        // Original initials logo
        <div 
          className={`w-12 h-12 ${logoStyle} border-2 border-current flex items-center justify-center logo-font text-lg`}
          style={{ borderRadius: 'var(--radius-button)' }}
        >
          {getCompanyInitials(companyName)}
        </div>
      )}
    </Link>
  )
}
