'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface TeamProps {
  content: ContentData
}

export default function Team({ content }: TeamProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  
  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white px-4 py-2 text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined",
      none: "badge-none"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }
  
  const getFontClass = () => {
    // Alle Headlines verwenden jetzt die dynamischen Fonts über CSS-Variablen
    return "" // Keine spezielle Font-Klasse mehr nötig
  }

  const teamMembers = content.team

  // Minimum swipe distance
  const minSwipeDistance = 50

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextMember()
    }
    if (isRightSwipe) {
      prevMember()
    }
  }

  return (
    <section id="team" className={`py-20 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          {designStyle === 'rounded' && (
            <span className="inline-block px-6 py-2 text-white text-sm font-medium mb-4"
              style={{ 
                borderRadius: 'var(--radius-button)',
                backgroundColor: 'var(--color-secondary)'
              }}>
              Unser Team
            </span>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-light mb-6">
            {designStyle === 'modern' ? (
              <span className="heading-underline-large">
                Unser Team
              </span>
            ) : (
              designStyle === 'rounded' ? 'Unser Team' : 'Die Experten hinter jedem Projekt'
            )}
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto mb-8">
            {isModernStyle 
              ? 'Lernen Sie unser erfahrenes Team kennen, das mit Leidenschaft und Fachwissen Ihre Projekte zum Erfolg führt.'
              : 'Erfahren, engagiert & nah dran – lernen Sie unsere Fachkräfte kennen.'
            }
          </p>
          {!isModernStyle && (
            <div className="max-w-4xl mx-auto space-y-4 text-text-secondary dark:text-light/80">
              <p>
                Hinter jedem gelungenen Projekt steht ein Team aus leidenschaftlichen 
                Handwerkern, die ihr Handwerk von der Pike auf gelernt haben und täglich mit 
                Herzblut ausüben.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Team Swiper (lg:hidden) */}
        <div className="lg:hidden relative max-w-sm mx-auto">
          <div 
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {teamMembers.map((member, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="group text-center animate-on-scroll cursor-pointer">
                    {/* Member Photo */}
                    <div className="relative mb-6">
                      {member.photo && index === 0 ? (
                        <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3 relative"
                          style={{ borderRadius: 'var(--radius-image)' }}>
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover"
                            style={{ borderRadius: 'var(--radius-image)' }}
                            sizes="192px"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ borderRadius: 'var(--radius-image)' }}></div>
                        </div>
                      ) : (
                        <div className="w-48 h-48 mx-auto overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3"
                          style={{ borderRadius: 'var(--radius-image)' }}>
                          <div className="text-center">
                            <div className="w-36 h-36 bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-inner"
                              style={{ borderRadius: 'var(--radius-image)' }}>
                              <span className="text-4xl font-bold text-white drop-shadow-lg">
                                {member.name.split(' ').map(n => n.charAt(0)).join('')}
                              </span>
                            </div>
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{ borderRadius: 'var(--radius-image)' }}></div>
                        </div>
                      )}
                      
                      {/* Position Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <span className="inline-block px-4 py-1 text-white text-sm font-medium shadow-md"
                          style={{ 
                            backgroundColor: 'var(--color-secondary)',
                            borderRadius: 'var(--radius-button)' 
                          }}>
                          {member.position}
                        </span>
                      </div>
                    </div>
                    
                    {/* Member Info */}
                    <div className="space-y-3 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-text dark:text-light group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-text-secondary dark:text-light/70 font-medium text-lg">
                        {member.specialization}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevMember}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={teamMembers.length <= 1}
            aria-label="Vorheriger Mitarbeiter"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>

          <button
            onClick={nextMember}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={teamMembers.length <= 1}
            aria-label="Nächster Mitarbeiter"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{ borderRadius: 'var(--radius-button)' }}
                aria-label={`Zu Mitarbeiter ${index + 1} wechseln`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Team Grid (hidden lg:grid) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center animate-on-scroll cursor-pointer"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationDuration: '600ms',
                animationFillMode: 'both'
              }}
            >
              {/* Member Photo */}
              <div className="relative mb-6">
                {member.photo && index === 0 ? (
                  <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3 relative"
                    style={{ borderRadius: 'var(--radius-image)' }}>
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      style={{ borderRadius: 'var(--radius-image)' }}
                      sizes="192px"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderRadius: 'var(--radius-image)' }}></div>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3"
                    style={{ borderRadius: 'var(--radius-image)' }}>
                    <div className="text-center">
                      <div className="w-36 h-36 bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-inner"
                        style={{ borderRadius: 'var(--radius-image)' }}>
                        <span className="text-4xl font-bold text-white drop-shadow-lg">
                          {member.name.split(' ').map(n => n.charAt(0)).join('')}
                        </span>
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ borderRadius: 'var(--radius-image)' }}></div>
                  </div>
                )}
                
                {/* Position Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-4 py-1 text-white text-sm font-medium shadow-md"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      borderRadius: 'var(--radius-button)' 
                    }}>
                    {member.position}
                  </span>
                </div>
              </div>
              
              {/* Member Info */}
              <div className="space-y-3 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-text dark:text-light group-hover:text-primary dark:group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-text-secondary dark:text-light/70 font-medium text-lg">
                  {member.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Expertise Section with Modern Icons */}
        <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-bold text-text dark:text-light mb-4 ${getFontClass()}`}>
              Unsere Expertise
            </h3>
            <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
              Mit jahrelanger Erfahrung und moderner Ausstattung garantieren wir höchste Qualität
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Qualität */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-7 h-7 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Qualität</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Höchste Standards</p>
            </div>

            {/* Zuverlässigkeit */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-7 h-7 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Zuverlässigkeit</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Termine werden eingehalten</p>
            </div>

            {/* Innovation */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-7 h-7 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75-7.478v-3.038c0-.235.19-.425.425-.425h.075A5.235 5.235 0 0116.5 9.375a5.235 5.235 0 00-4.738-5.236A5.238 5.238 0 016.5 9.375a5.235 5.235 0 004.25 5.136v.038l-.075-.001c-.235 0-.425.19-.425.425v3.038"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Innovation</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Moderne Techniken</p>
            </div>

            {/* Nachhaltigkeit */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-all duration-300"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-7 h-7 text-gray-900 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813c-.59-.737-.956-1.653-.956-2.636C2 4.253 3.213 3 4.69 3c1.237 0 2.28.83 2.654 1.96a50.7 50.7 0 00-3.082 5.187zm0 0a50.697 50.697 0 0115.482 0m-15.482 0L6.75 8.25m15.482 1.897L17.25 8.25m-7.5 0V6.375c0-1.036.84-1.875 1.875-1.875s1.875.84 1.875 1.875V8.25m-3.75 0h3.75"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Nachhaltigkeit</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Umweltbewusst</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 