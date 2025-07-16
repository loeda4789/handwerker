import React from 'react'
import Link from 'next/link'
import { ContentData } from '@/types/content'
import LocationMap from './LocationMap'

interface FooterProps {
  content: ContentData
}

export default function Footer({ content }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--color-primary)' }} className="text-white">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-secondary)' }}>Kontakt</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-medium text-white mb-3">{content.company.name}</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div>
                  <p className="text-white/80 text-sm">
                    {content.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href={`tel:${content.contact.phone}`} className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
                  Telefon: {content.contact.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href={`mailto:${content.contact.email}`} className="text-white/80 hover:text-white transition-colors duration-300 text-sm">
                  E-Mail: {content.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Öffnungszeiten */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-secondary)' }}>Öffnungszeiten</h3>
            
            <div className="space-y-3">
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-white/80 text-sm">
                   <div className="flex justify-between min-w-[180px]">
                     <span>Mo–Fr:</span>
                     <span>07:00–17:00 Uhr</span>
                   </div>
                 </div>
               </div>
              
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-white/80 text-sm">
                   <div className="flex justify-between min-w-[180px]">
                     <span>Sa:</span>
                     <span>nach Vereinbarung</span>
                   </div>
                 </div>
               </div>
              
                             <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                 </svg>
                 <div className="text-white/80 text-sm">
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
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-secondary)' }}>Standort</h3>
            
            {/* Leaflet Karte */}
            <LocationMap 
              address={content.contact.address}
              companyName={content.company.name}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-white/60 text-sm">
              © {content.company.name}. Alle Rechte vorbehalten.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6 text-sm">
                <Link href="/impressum" className="text-white/60 hover:text-white transition-colors duration-300">
                  Impressum
                </Link>
                <Link href="/datenschutz" className="text-white/60 hover:text-white transition-colors duration-300">
                  Datenschutz
                </Link>
                                 <div className="text-white/40">
                   Website by <span style={{ color: 'var(--color-secondary)' }}>ml | websolutions</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 