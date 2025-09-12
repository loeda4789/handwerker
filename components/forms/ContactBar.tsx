'use client';

interface ContactBarProps {
  isEnabled: boolean;
  phone?: string;
  email?: string;
  hours?: string;
}

export default function ContactBar({ 
  isEnabled, 
  phone = "+49 123 456789",
  email = "info@handwerker.de",
  hours = "Mo-Fr 8-18 Uhr"
}: ContactBarProps) {
  if (!isEnabled) {
    return null;
  }

  return (
    <div className="bg-primary text-text-light py-3 text-sm relative z-50 border-b border-primary-dark/30">
      <div className="container mx-auto px-4">
        {/* Mobile Layout: Stacked */}
        <div className="md:hidden flex flex-col items-center space-y-3">
          <a 
            href={`tel:${phone}`}
            className="flex items-center gap-2 hover:text-accent transition-colors px-4 py-1 rounded-md hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="font-medium">{phone}</span>
          </a>

          <div className="w-16 h-px bg-white/20"></div>

          <a 
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-accent transition-colors px-4 py-1 rounded-md hover:bg-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>{email}</span>
          </a>

          <div className="w-16 h-px bg-white/20"></div>

          <div className="flex items-center gap-2 text-text-light/90 px-4 py-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{hours}</span>
          </div>
        </div>

        {/* Desktop Layout: Centered with dividers */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a 
              href={`tel:${phone}`}
              className="flex items-center gap-2 hover:text-accent transition-colors px-4 py-2 rounded-md hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span className="font-medium">{phone}</span>
            </a>

            <div className="w-px h-6 bg-white/30"></div>

            <a 
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-accent transition-colors px-4 py-2 rounded-md hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{email}</span>
            </a>

            <div className="w-px h-6 bg-white/30"></div>

            <div className="flex items-center gap-2 text-text-light/90 px-4 py-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{hours}</span>
            </div>
          </div>

          {/* JETZT ANFRAGEN Button */}
          <a 
            href="/kontakt"
            className="bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            JETZT ANFRAGEN
          </a>
        </div>
      </div>
    </div>
  );
} 