'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'

interface TeamProps {
  content: ContentData
}

export default function Team({ content }: TeamProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

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
    <section id="team" className="bg-surface dark:bg-dark-secondary py-20">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Unser Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-light mb-6">
            Die Experten hinter jedem Projekt
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto mb-8">
            Erfahren, engagiert & nah dran – lernen Sie unsere Fachkräfte kennen.
          </p>
          <div className="max-w-4xl mx-auto space-y-4 text-text-secondary dark:text-light/80">
            <p>
              Hinter jedem gelungenen Projekt steht ein Team aus leidenschaftlichen 
              Handwerkern, die ihr Handwerk von der Pike auf gelernt haben und täglich mit 
              Herzblut ausüben.
            </p>
          </div>
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
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3 relative">
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="192px"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3">
                          <div className="text-center">
                            <div className="w-36 h-36 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-inner">
                              <span className="text-4xl font-bold text-white drop-shadow-lg">
                                {member.name.split(' ').map(n => n.charAt(0)).join('')}
                              </span>
                            </div>
                          </div>
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                        </div>
                      )}
                      
                      {/* Position Badge */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium rounded-full shadow-md">
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
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/95 dark:bg-gray-800/95 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-300 z-10 disabled:opacity-30 hover:scale-105"
            disabled={teamMembers.length <= 1}
            aria-label="Vorheriger Mitarbeiter"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
            </svg>
          </button>

          <button
            onClick={nextMember}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/95 dark:bg-gray-800/95 rounded-full shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white dark:hover:bg-accent transition-all duration-300 z-10 disabled:opacity-30 hover:scale-105"
            disabled={teamMembers.length <= 1}
            aria-label="Nächster Mitarbeiter"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary dark:bg-accent scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/50 dark:hover:bg-accent/50'
                }`}
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
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3 relative">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/20 flex items-center justify-center border-4 border-white dark:border-dark shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50 group-hover:rotate-3">
                    <div className="text-center">
                      <div className="w-36 h-36 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-inner">
                        <span className="text-4xl font-bold text-white drop-shadow-lg">
                          {member.name.split(' ').map(n => n.charAt(0)).join('')}
                        </span>
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                )}
                
                {/* Position Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium rounded-full shadow-md">
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
            <h3 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
              Unsere Expertise
            </h3>
            <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
              Mit jahrelanger Erfahrung und moderner Ausstattung garantieren wir höchste Qualität
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Qualität */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Qualität</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Höchste Standards</p>
            </div>

            {/* Zuverlässigkeit */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Pünktlichkeit</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Termine werden eingehalten</p>
            </div>

            {/* Innovation */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-text dark:text-light mb-2">Innovation</h4>
              <p className="text-sm text-text-secondary dark:text-light/70">Moderne Techniken</p>
            </div>

            {/* Nachhaltigkeit */}
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
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