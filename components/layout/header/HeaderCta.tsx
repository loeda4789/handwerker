import Link from 'next/link'

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
  return (
    <Link
      href="#kontakt"
      onClick={onClick}
      className={`px-6 py-2 uppercase ${ctaStyle}`}
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
