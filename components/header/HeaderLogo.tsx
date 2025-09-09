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

  return (
    <Link href="/" className="flex items-center space-x-3">
      <div 
        className={`w-10 h-10 ${logoStyle} border-2 border-current flex items-center justify-center logo-font text-lg`}
        style={{ borderRadius: 'var(--radius-button)' }}
      >
        {getCompanyInitials(companyName)}
      </div>
      <span className={`text-2xl logo-font ${logoStyle} hidden sm:block`}>
        {companyName}
      </span>
    </Link>
  )
}
