import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { ContentData } from '@/types/content'

interface HeroProps {
  content: ContentData
}

// Hilfsfunktion um Stadt aus Adresse zu extrahieren
function extractCityFromAddress(address: string): string {
  console.log('Verarbeite Adresse:', address)
  
  // Pattern für deutsche Adressen: PLZ Stadt
  const plzCityMatch = address.match(/\d{5}\s+([^,]+)/)
  if (plzCityMatch) {
    const city = plzCityMatch[1].trim()
    console.log('PLZ-Stadt Match gefunden:', city)
    return city
  }
  
  // Pattern für Stadt nach Komma
  const cityAfterCommaMatch = address.match(/,\s*([^,\d]+?)(?:\s*\d|$)/)
  if (cityAfterCommaMatch) {
    const city = cityAfterCommaMatch[1].trim()
    console.log('Stadt nach Komma gefunden:', city)
    return city
  }
  
  // Fallback: Nimm das letzte Wort ohne Zahlen
  const words = address.split(/[,\s]+/).filter(word => word.length > 0 && !/^\d+$/.test(word))
  if (words.length >= 1) {
    const city = words[words.length - 1]
    console.log('Fallback Stadt gefunden:', city)
    return city
  }
  
  console.log('Keine Stadt gefunden, verwende Fallback')
  return 'Ihrer Region'
}

export default function Hero({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)
  
  // Debug: Zeige Stadt in der Konsole
  console.log('Adresse:', content.contact.address)
  console.log('Extrahierte Stadt:', cityName)
  
  return (
    <>
      {/* Preload Hero Images */}
      <Head>
        <link
          rel="preload"
          as="image"
          href={content.hero.backgroundImages.desktop}
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href={content.hero.backgroundImages.mobile}
          media="(max-width: 767px)"
        />
      </Head>

      <section id="startseite" className="relative h-[90vh] lg:h-screen w-full overflow-hidden">
        {/* Hero Bild als Hintergrund mit Next.js Image Optimierung */}
        <div className="absolute inset-0">
          {/* Desktop Hintergrundbild - ab 768px (md) */}
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={content.hero.backgroundImages.desktop}
              alt="Hero Hintergrund Desktop"
              fill
              priority
              quality={85}
              className="object-cover animate-ken-burns"
              sizes="(min-width: 768px) 100vw, 0px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          {/* Mobile Hintergrundbild - bis 767px mit sm Breakpoint */}
          <div className="absolute inset-0 block md:hidden">
            <Image
              src={content.hero.backgroundImages.mobile}
              alt="Hero Hintergrund Mobile"
              fill
              priority
              quality={85}
              className="object-cover animate-ken-burns"
              sizes="(max-width: 767px) 100vw, 0px"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          {/* Fallback Gradient wenn Bild lädt */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 -z-10"></div>
        </div>
        
        {/* Overlay mit Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center lg:justify-start lg:text-left px-4">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* Headline - Firmenname */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
                style={{ color: 'var(--color-heroText, #ffffff)' }}
              >
                {content.company.name}
              </h1>
              
              {/* Tagline - Partner aus Ort */}
              <p 
                className="text-lg md:text-xl mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]"
                style={{ color: 'var(--color-heroTextSecondary, rgba(255,255,255,0.9))' }}
              >
                {content.company.tagline} aus {cityName}
              </p>
              
              {/* CTA Button */}
              <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
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
    </>
  )
} 