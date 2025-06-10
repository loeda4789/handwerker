import Link from 'next/link'
import { ContentData } from '@/types/content'

interface HeroProps {
  content: ContentData
}

// Hilfsfunktion zum Extrahieren des Ortsnamens aus der Adresse
function extractCityFromAddress(address: string): string {
  // Adresse ist normalerweise "Straße, PLZ Ort" oder "Straße, PLZ, Ort"
  const parts = address.split(',').map(part => part.trim())
  if (parts.length >= 2) {
    // Letzter Teil enthält meist PLZ und Ort
    const lastPart = parts[parts.length - 1]
    // PLZ am Anfang entfernen (normalerweise 5 Ziffern + Leerzeichen)
    const cityMatch = lastPart.match(/^\d{5}\s+(.+)$/)
    if (cityMatch) {
      return cityMatch[1]
    }
    // Falls kein PLZ-Muster gefunden wird, nehme den letzten Teil
    return lastPart
  }
  return 'Ihrer Region'
}

export default function Hero({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)
  
  return (
    <section id="startseite" className="relative h-[90vh] lg:h-screen w-full overflow-hidden">
      {/* Hero Bild als Hintergrund */}
      <div className="absolute inset-0">
        {/* Desktop Hintergrundbild - verwendet CSS Custom Property */}
        <div 
          className="absolute inset-0 hidden md:block animate-ken-burns bg-cover bg-center bg-no-repeat hero-bg-desktop"
          style={{ backgroundImage: 'var(--hero-image-desktop, url("/images/hero-background2.png"))' }}
        ></div>
        {/* Mobile Hintergrundbild - verwendet CSS Custom Property */}
        <div 
          className="absolute inset-0 block md:hidden animate-ken-burns bg-cover bg-center bg-no-repeat hero-bg-mobile"
          style={{ backgroundImage: 'var(--hero-image-mobile, url("/images/hero-background-mobil.png"))' }}
        ></div>
        {/* Fallback Gradient wenn Bild lädt */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 -z-10"></div>
      </div>
      
      {/* Overlay mit Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Headline - Firmenname */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
              style={{ color: 'var(--color-heroText, #ffffff)' }}
            >
              {content.company.name}
            </h1>
            
            {/* Tagline - Experte aus Ort */}
            <p 
              className="text-lg md:text-xl mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]"
              style={{ color: 'var(--color-heroTextSecondary, rgba(255,255,255,0.9))' }}
            >
              Ihr Handwerksexperte aus {cityName}
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg focus:ring-4 transition-all duration-300 group hover:scale-105 hover:shadow-lg transform hover:-translate-y-1"
                style={{ 
                  color: 'var(--color-background, #ffffff)', 
                  backgroundColor: 'var(--color-primary, #0ea5e9)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent, #38bdf8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary, #0ea5e9)';
                }}
              >
                Jetzt Termin vereinbaren
                <svg 
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
        <Link href="#ueber-uns" className="block group">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
            <svg 
              className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          </div>
        </Link>
      </div>
    </section>
  )
} 