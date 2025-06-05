import React from 'react'
import Image from 'next/image'
import { ContentData } from '@/types/content'

interface AboutProps {
  content: ContentData
}

const iconMap: Record<string, React.ReactElement> = {
  'check-circle': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  'layers': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
    </svg>
  ),
  'life-buoy': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
    </svg>
  ),
}

export default function About({ content }: AboutProps) {
  return (
    <section id="ueber-uns" className="bg-surface dark:bg-dark py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center animate-on-scroll">
          {/* Bildbereich */}
          <div className="order-2 lg:order-1">
            <div className="relative h-full max-w-md mx-auto">
              <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg shadow-xl dark:shadow-primary/20 flex items-center justify-center">
                <svg className="w-24 h-24 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              {/* Dekorativer Hintergrund */}
              <div className="absolute -z-10 top-4 right-4 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-lg"></div>
            </div>
          </div>
          
          {/* Textbereich */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-text dark:text-light mb-4">
              {content.welcome.headline}
            </h2>
            <p className="text-lg text-text-secondary dark:text-light/80 mb-8">
              {content.about.text}
            </p>
            
            {/* Features/Benefits */}
            <ul className="space-y-6">
              {content.welcome.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="text-primary dark:text-accent mt-1 mr-3">
                    {iconMap[feature.icon] || iconMap['check-circle']}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text dark:text-light">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary dark:text-light/70">
                      {feature.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
} 