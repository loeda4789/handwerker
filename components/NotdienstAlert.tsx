'use client';

interface NotdienstAlertProps {
  isEnabled: boolean;
  phone?: string;
  message?: string;
}

export default function NotdienstAlert({ 
  isEnabled, 
  phone = "+49 123 456789",
  message = "24h Notdienst verfügbar"
}: NotdienstAlertProps) {
  if (!isEnabled) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white py-3 relative z-50 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-red-600 flex items-center justify-center font-bold animate-bounce"
              style={{ borderRadius: 'var(--radius-button)' }}>
              !
            </div>
            <span className="font-bold text-lg">{message}</span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${phone}`}
              className="bg-white text-red-600 px-6 py-2 font-bold hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
              style={{ borderRadius: 'var(--radius-button)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>Jetzt anrufen</span>
            </a>
            <span className="text-white font-medium hidden md:block">
              {phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 