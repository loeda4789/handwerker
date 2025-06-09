'use client';

import { useState, useEffect } from 'react';

interface SpeedDialProps {
  phoneNumber: string;
  onEmailClick: () => void;
}

export default function SpeedDial({ phoneNumber, onEmailClick }: SpeedDialProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // SpeedDial nach 7 Sekunden einblenden
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000); // 7 Sekunden

    return () => clearTimeout(timer);
  }, []);

  const toggleSpeedDial = () => {
    setIsOpen(!isOpen);
  };

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
    setIsOpen(false);
  };

  const handleEmailClick = () => {
    onEmailClick();
    setIsOpen(false);
  };

  // Nicht rendern, wenn noch nicht sichtbar
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden opacity-0 animate-[fadeInUp_0.5s_ease-out_0s_forwards]">
      {/* Speed Dial Actions */}
      <div className={`flex flex-col space-y-3 mb-3 transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Phone Action */}
        <button
          onClick={handlePhoneClick}
          className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Anrufen"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </button>

        {/* Email Action */}
        <button
          onClick={handleEmailClick}
          className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="E-Mail senden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </button>
      </div>

      {/* Main Speed Dial Button */}
      <button
        onClick={toggleSpeedDial}
        className="w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'Menü schließen' : 'Kontakt-Menü öffnen'}
      >
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          )}
        </div>
      </button>

      {/* Overlay for closing when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
} 