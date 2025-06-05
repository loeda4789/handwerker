import React from 'react'
import { ContentData } from '@/types/content'

interface ServicesProps {
  content: ContentData
}

const serviceIconMap: Record<string, React.ReactElement> = {
  'paintbrush': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
    </svg>
  ),
  'floor-plan': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  ),
  'water-drop': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  'grid': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
    </svg>
  ),
  'square': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16v2H4zm0 5h16v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM6 3h12v2H6z"/>
    </svg>
  ),
  'paint-bucket': (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1M13 7a4 4 0 104 4"/>
    </svg>
  ),
}

export default function Services({ content }: ServicesProps) {
  return (
    <section id="leistungen" className="bg-background dark:bg-dark-secondary py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Von der Planung bis zur Fertigstellung - wir bieten Ihnen den kompletten Service rund um Ihr Handwerksprojekt.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => (
            <div
              key={index}
              className="bg-surface dark:bg-dark p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 hover:scale-105 cursor-pointer animate-on-scroll"

            >
              {/* Icon */}
              <div className="text-primary dark:text-accent mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 p-3 bg-primary/10 dark:bg-accent/10 rounded-full w-fit">
                {serviceIconMap[service.icon] || serviceIconMap['paintbrush']}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-text dark:text-light mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary dark:text-light/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 