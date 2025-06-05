import React from 'react'
import Link from 'next/link'
import { ContentData } from '@/types/content'

interface FooterProps {
  content: ContentData
}

export default function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-text dark:bg-dark-secondary text-light">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-accent mb-6">Kontakt</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-medium text-light mb-3">{content.company.name}</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary dark:text-accent mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-light/80 text-sm">
                    {content.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary dark:text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${content.contact.phone}`} className="text-light/80 hover:text-light transition-colors duration-300 text-sm">
                  Telefon: {content.contact.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary dark:text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${content.contact.email}`} className="text-light/80 hover:text-light transition-colors duration-300 text-sm">
                  E-Mail: {content.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-accent mb-6">Öffnungszeiten</h3>
            
            <div className="space-y-3">
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 text-primary dark:text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-light/80 text-sm">
                   <div className="flex justify-between min-w-[180px]">
                     <span>Mo–Fr:</span>
                     <span>08:00–17:00 Uhr</span>
                   </div>
                 </div>
               </div>
              
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 text-primary dark:text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-light/80 text-sm">
                   <div className="flex justify-between min-w-[180px]">
                     <span>Sa:</span>
                     <span>nach Vereinbarung</span>
                   </div>
                 </div>
               </div>
              
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 text-primary dark:text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-light/80 text-sm">
                   <div className="flex justify-between min-w-[180px]">
                     <span>So:</span>
                     <span>geschlossen</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Standort mit Karte */}
          <div>
            <h3 className="text-lg font-semibold text-primary dark:text-accent mb-6">Standort</h3>
            
            {/* Karten-Placeholder */}
            <div className="bg-gray-300 dark:bg-gray-600 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
              {/* Einfache Karten-Simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900">
                {/* Straßen-Linien */}
                <div className="absolute top-8 left-4 right-4 h-0.5 bg-gray-400 transform rotate-12"></div>
                <div className="absolute top-16 left-2 right-6 h-0.5 bg-gray-400 transform -rotate-12"></div>
                <div className="absolute top-24 left-6 right-2 h-0.5 bg-gray-400 transform rotate-6"></div>
                <div className="absolute top-32 left-3 right-5 h-0.5 bg-gray-400 transform -rotate-6"></div>
                
                                 {/* Marker */}
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                   <svg className="w-8 h-8 text-primary dark:text-accent" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                   </svg>
                 </div>
                
                {/* Stadt-Label */}
                <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-300">
                  Musterstadt
                </div>
              </div>
              
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded shadow-md">
                <button className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg font-bold">+</button>
                <div className="border-t border-gray-200 dark:border-gray-600"></div>
                <button className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-lg font-bold">−</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light/20">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-light/60 text-sm">
              © {content.company.name}. Alle Rechte vorbehalten.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm">
                <Link href="/impressum" className="text-light/60 hover:text-light transition-colors duration-300">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-light/60 hover:text-light transition-colors duration-300">
                  Datenschutz
                </Link>
                                 <div className="text-light/40">
                   Website by <span className="text-primary dark:text-accent">ml | websolutions</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 