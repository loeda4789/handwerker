import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { ContentData } from '@/types/content'
import { useState, useEffect } from 'react'
import { MdVerified, MdAccessTime, MdSupportAgent } from 'react-icons/md'
import { useHeroConfig } from '@/contexts/AppConfigContext'

interface HeroProps {
  content: ContentData
}

// Hilfsfunktion um Stadt aus Adresse zu extrahieren
function extractCityFromAddress(address: string): string {
  try {
    // Extrahiert die Stadt aus einer deutschen Adresse
    // Format: "Straße Hausnummer, PLZ Stadt"
    const parts = address.split(',')
    if (parts.length >= 2) {
      const cityPart = parts[1].trim()
      // Entfernt PLZ (erste 5 Ziffern) und gibt nur die Stadt zurück
      const city = cityPart.replace(/^\d{5}\s*/, '').trim()
      return city || 'Ihrer Region'
    }
    return 'Ihrer Region'
  } catch (error) {
    return 'Ihrer Region'
  }
}

const formatHeroTitle = (tagline: string) => {
  // Für Fliesenleger
  if (tagline.includes('Handwerks-Partner')) {
    return "Ihr verlässlicher Fliesenleger"
  }
  
  // Für Elektriker
  if (tagline.includes('Elektro-Partner')) {
    return "Kompetenz, die elektrisiert."
  }
  
  // Für Dachdecker
  if (tagline.includes('Dach-Partner')) {
    return "Ihr verlässlicher Dachdecker"
  }
  
  // Fallback für andere Branchen
  return "Ihr verlässlicher Partner"
}

// Neue Hilfsfunktion für zweifarbige Texte
const formatHeroText = (tagline: string, cityName: string) => {
  // Für Fliesenleger
  if (tagline.includes('Handwerks-Partner')) {
    return "Wir machen Ihr Zuhause noch schöner"
  }
  
  // Für Elektriker
  if (tagline.includes('Elektro-Partner')) {
    return "Meisterqualität für Ihre Elektroinstallationen"
  }
  
  // Für Dachdecker
  if (tagline.includes('Dach-Partner')) {
    return "Meisterqualität für Ihr Dach"
  }
  
  // Fallback für andere Branchen
  return "Meisterqualität für Ihre Projekte"
}

// Hero Single Variant (Standard)
function HeroSingle({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)
  
  // Design-Style aus localStorage abrufen für Design-spezifische Styles
  const [designStyle, setDesignStyle] = useState<string>('angular')
  
  useEffect(() => {
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
  
  return (
    <>
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
        <div className="absolute inset-0">
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 -z-10"></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center lg:justify-start lg:text-left px-4">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl lg:max-w-3xl">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.2s_forwards]"
                style={{ color: 'var(--color-heroText, #ffffff)' }}
              >
                {formatHeroTitle(content.company.tagline)}
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8 opacity-0 animate-[fadeInUp_1s_ease-out_0.6s_forwards]"
                style={{ 
                  color: designStyle === 'modern' ? '#ffffff' : 'var(--color-heroTextSecondary, rgba(255,255,255,0.9))' 
                }}
              >
                {formatHeroText(content.company.tagline, cityName)}
              </p>
              
              <div className="opacity-0 animate-[fadeInUp_1s_ease-out_1s_forwards]">
                <Link
                  href="#kontakt"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium focus:ring-4 transition-all duration-300 group hover:scale-105 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ 
                    color: 'var(--color-background, #ffffff)', 
                    backgroundColor: 'var(--color-primary, #0ea5e9)',
                    borderRadius: 'var(--radius-button)'
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
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-[fadeInUp_1s_ease-out_1.4s_forwards]">
          <Link href="#ueber-uns" className="block group">
            <div className="p-2 bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300"
              style={{ borderRadius: 'var(--radius-button)' }}>
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

// Hero Slider Variant
function HeroSlider({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      desktop: content.hero.backgroundImages.desktop,
      mobile: content.hero.backgroundImages.mobile,
      title: content.hero.title || formatHeroTitle(content.company.tagline),
      subtitle: content.hero.subtitle || formatHeroText(content.company.tagline, cityName),
      cta: "Jetzt Termin vereinbaren"
    },
    {
      desktop: content.hero.backgroundImages.desktopAlt || content.hero.backgroundImages.desktop,
      mobile: content.hero.backgroundImages.mobileAlt || content.hero.backgroundImages.mobile,
      title: "Meisterqualität",
      subtitle: "Wir machen Ihr Zuhause noch schöner",
      cta: "Mehr erfahren"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={slides[0].desktop} media="(min-width: 768px)" />
        <link rel="preload" as="image" href={slides[0].mobile} media="(max-width: 767px)" />
      </Head>

      <section id="startseite" className="relative h-[90vh] lg:h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 hidden md:block">
              <Image
                src={slide.desktop}
                alt={`Hero Slide ${index + 1} Desktop`}
                fill
                priority={index === 0}
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 block md:hidden">
              <Image
                src={slide.mobile}
                alt={`Hero Slide ${index + 1} Mobile`}
                fill
                priority={index === 0}
                quality={85}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white"
                key={`title-${currentSlide}`}
              >
                {slides[currentSlide].title}
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8"
                style={{ color: '#ffffff' }}
                key={`subtitle-${currentSlide}`}
              >
                {slides[currentSlide].subtitle}
              </p>
              
              <div>
                <Link
                  href="#kontakt"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium transition-all duration-300 group hover:scale-105 hover:shadow-lg transform hover:-translate-y-1 text-white"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    borderRadius: 'var(--radius-button)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                  }}
                >
                  {slides[currentSlide].cta}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              style={{ borderRadius: 'var(--radius-button)' }}
            />
          ))}
        </div>
      </section>
    </>
  )
}

// Hero Video Variant (previously 3D)
function HeroVideo({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Head>
        <link rel="preload" as="image" href={content.hero.backgroundImages.desktop} media="(min-width: 768px)" />
        <link rel="preload" as="image" href={content.hero.backgroundImages.mobile} media="(max-width: 767px)" />
      </Head>

      <section id="startseite" className="relative h-[90vh] lg:h-screen w-full overflow-hidden perspective-1000">
        <div 
          className={`absolute inset-0 transition-all duration-1000 transform-gpu ${
            isLoaded ? 'scale-100 rotate-0' : 'scale-110 rotate-y-12'
          }`}
        >
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={content.hero.backgroundImages.desktop}
              alt="Hero Video Desktop"
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 block md:hidden">
            <Image
              src={content.hero.backgroundImages.mobile}
              alt="Hero Video Mobile"
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div 
            className={`container mx-auto px-4 transition-all duration-1000 delay-300 transform-gpu ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="transform-gpu hover:scale-105 transition-transform duration-300">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
                  {formatHeroTitle(content.company.tagline)}
                </h1>
                
                <p className="text-xl md:text-2xl mb-8 drop-shadow-lg" style={{ color: '#ffffff' }}>
                  {formatHeroText(content.company.tagline, cityName)}
                </p>
                
                <div className="flex flex-col gap-4 justify-center items-center">
                  <Link
                    href="#kontakt"
                    className="group relative overflow-hidden px-8 py-4 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-1 rounded-lg"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      borderRadius: 'var(--radius-button)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                    }}
                  >
                    <span className="relative z-10">Jetzt Termin vereinbaren</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  <Link
                    href="#ueber-uns"
                    className="px-8 py-4 border-2 border-white text-white font-medium transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105 transform hover:-translate-y-1"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    Mehr erfahren
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 right-10 w-20 h-20 bg-white/10 backdrop-blur-sm animate-float hidden lg:block"
          style={{ borderRadius: 'var(--radius-button)' }}></div>
        <div className="absolute bottom-1/4 left-10 w-12 h-12 bg-primary/30 backdrop-blur-sm animate-float-delayed hidden lg:block"
          style={{ borderRadius: 'var(--radius-button)' }}></div>
      </section>
    </>
  )
}

// Hero Split Variant - Modern AI-Website Style
function HeroSplit({ content }: HeroProps) {
  const cityName = extractCityFromAddress(content.contact.address)

  return (
    <section id="startseite" className="relative min-h-screen w-full overflow-hidden bg-black dark:bg-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-secondary/30 rounded-full animate-pulse delay-3000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 min-h-screen">
        <div className="flex min-h-screen items-center">
          {/* Left Side - Minimalist Content */}
          <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <div className="w-2 h-2 bg-primary rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Verfügbar in {cityName}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-white leading-tight">
                {formatHeroTitle(content.company.tagline)}
              </h1>
            
              {/* Subtitle */}
              <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-lg">
                {formatHeroText(content.company.tagline, cityName)}
              </p>

              {/* Modern CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Link
                  href="#kontakt"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 hover:scale-105"
                >
                  <span className="relative z-10">Kostenloses Angebot</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="#ueber-uns"
                  className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-primary hover:text-primary transition-all duration-300 hover:bg-primary/5"
                >
                  Mehr erfahren
                </Link>
              </div>

              {/* Modern Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Notdienst</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">Zufriedenheit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Image with Effects */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl scale-110"></div>
              
              {/* Image Container */}
              <div className="relative w-[600px] h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <Image
                  src={content.hero.backgroundImages.desktop}
                  alt="Hero Split Image"
                  fill
                  priority
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/30 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Mobile Background */}
          <div className="absolute inset-0 lg:hidden -z-10">
            <Image
              src={content.hero.backgroundImages.mobile}
              alt="Hero Split Mobile"
              fill
              priority
              quality={85}
              className="object-cover opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Main Hero Component
export default function Hero({ content }: HeroProps) {
  // Hero-Type aus AppConfigContext
  const { type: currentHeroType } = useHeroConfig()
  
  console.log('Hero Type:', currentHeroType)
  
  switch (currentHeroType) {
    case 'slider':
      return <HeroSlider content={content} />
    case 'video':
      return <HeroVideo content={content} />
    case 'split':
      return <HeroSplit content={content} />
    case 'single':
    default:
      return <HeroSingle content={content} />
  }
} 
