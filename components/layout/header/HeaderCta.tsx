import Link from 'next/link'
import { useSiteVariant } from '@/contexts/AppConfigContext'

interface HeaderCtaProps {
  ctaStyle: string
  ctaStyleDynamic: React.CSSProperties
  ctaHoverStyle: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function HeaderCta({ 
  ctaStyle, 
  ctaStyleDynamic, 
  ctaHoverStyle, 
  onClick 
}: HeaderCtaProps) {
  const { siteVariant } = useSiteVariant()
  
  // Alle Varianten verwenden normal-case
  const textTransform = 'normal-case'
  
  return (
    <Link
      href="#kontakt"
      onClick={onClick}
      className={`px-6 py-2 ${textTransform} ${ctaStyle}`}
      style={{ 
        borderRadius: 'var(--radius-button)',
        ...ctaStyleDynamic
      }}
      onMouseEnter={(e) => {
        if (ctaHoverStyle) {
          Object.assign(e.currentTarget.style, ctaHoverStyle)
        }
      }}
      onMouseLeave={(e) => {
        if (ctaStyleDynamic) {
          Object.assign(e.currentTarget.style, ctaStyleDynamic)
        }
      }}
    >
      Jetzt anfragen
    </Link>
  )
}
