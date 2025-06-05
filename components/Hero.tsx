import Image from 'next/image'
import Link from 'next/link'
import { ContentData } from '@/types/content'

interface HeroProps {
  content: ContentData
}

export default function Hero({ content }: HeroProps) {
  return (
    <section id="startseite" className="relative h-[90vh] lg:h-screen w-full overflow-hidden">
      {/* Hero Bild als Hintergrund */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background.png"
          alt="Handwerker bei der Arbeit"
          fill
          className="object-cover animate-ken-burns"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Fallback Gradient wenn Bild lädt */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 -z-10"></div>
      </div>
      
      {/* Overlay mit Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight animate-in slide-in-from-left duration-1000">
              {content.company.name}
            </h1>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-in slide-in-from-left duration-1000 delay-300">
              {content.company.tagline}
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left duration-1000 delay-500">
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg hover:bg-accent focus:ring-4 focus:ring-primary/30 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
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
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce animate-in fade-in duration-1000 delay-1000">
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