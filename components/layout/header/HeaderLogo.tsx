import Link from 'next/link'

interface HeaderLogoProps {
  logoStyle: string
  companyName: string
}

export default function HeaderLogo({ logoStyle, companyName }: HeaderLogoProps) {
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

  return (
    <Link href="/" className="flex items-center">
      {isElektroCompany ? (
        // ELEKTRO logo with border for color adaptation
        <div 
          className={`px-3 py-2 ${logoStyle} border-2 border-current flex items-center justify-center logo-font text-sm font-bold`}
          style={{ borderRadius: 'var(--radius-button)' }}
        >
          ELEKTRO
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
