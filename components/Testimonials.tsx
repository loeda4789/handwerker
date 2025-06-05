import React from 'react'
import Link from 'next/link'
import { ContentData } from '@/types/content'

interface TestimonialsProps {
  content: ContentData
}

export default function Testimonials({ content }: TestimonialsProps) {
  return (
    <section id="bewertungen" className="bg-background dark:bg-dark py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 max-w-2xl mx-auto">
            Erfahren Sie, was zufriedene Kunden über unsere Arbeit berichten.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Testimonials Grid */}
          <div className="lg:col-span-2 space-y-6">
            {content.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-surface dark:bg-dark-secondary rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-text dark:text-light">
                        {testimonial.name}
                      </h4>
                      {/* 5 Star Rating */}
                      <div className="flex items-center ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-primary dark:text-accent fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="text-text-secondary dark:text-light/80 italic">
                      &quot;{testimonial.text}&quot;
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google Review CTA */}
          <div className="lg:col-span-1">
            <div className="bg-surface dark:bg-dark-secondary rounded-lg p-8 text-center shadow-lg">
              {/* Star Icon */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary/10 dark:bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-primary dark:text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-text dark:text-light mb-4">
                Teilen Sie Ihre Erfahrung
              </h3>
              
              <p className="text-text-secondary dark:text-light/80 mb-6">
                Ihre Meinung hilft uns und anderen weiter – hinterlassen Sie gern eine Bewertung auf Google.
              </p>

              {content.reviews.google && (
                <a
                  href={content.reviews.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary hover:bg-accent text-white rounded-lg transition-colors duration-300 font-medium"
                >
                  Jetzt bewerten
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>


      </div>
    </section>
  )
} 