'use client';

import { useState, useEffect } from 'react';

interface EmergencyContactProps {
  phoneNumber: string;
}

export default function EmergencyContact({ phoneNumber }: EmergencyContactProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Notruf nach 10 Sekunden einblenden
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000); // 10 Sekunden

    return () => clearTimeout(timer);
  }, []);

  const handleEmergencyClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Nicht rendern, wenn noch nicht sichtbar
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 lg:hidden">
      {/* Unauffälliger Notruf-Button */}
      <button
        onClick={handleEmergencyClick}
        className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95 group opacity-70 hover:opacity-100"
        style={{ 
          borderRadius: 'var(--radius-button)',
          fontSize: '10px'
        }}
        aria-label="Notruf"
      >
        <svg className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </button>
    </div>
  );
} 