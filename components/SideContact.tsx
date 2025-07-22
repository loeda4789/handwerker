'use client';

import { useState, useEffect } from 'react';

interface SideContactProps {
  phoneNumber: string;
  email: string;
  onEmailClick: () => void;
}

export default function SideContact({ phoneNumber, email, onEmailClick }: SideContactProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // SideContact sofort einblenden (für Test)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // 0.5 Sekunden für Test

    return () => clearTimeout(timer);
  }, []);

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleEmailClick = () => {
    onEmailClick();
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    // Verzögerung für bessere UX
    setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  // Debug-Log
  console.log('SideContact:', { isVisible, isExpanded, phoneNumber, email });

  // Nicht rendern, wenn noch nicht sichtbar oder auf Mobile
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      {/* Seitliche Kontaktleiste */}
      <div 
        className={`bg-white dark:bg-gray-800 shadow-lg border-l border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          borderRadius: 'var(--radius-card) 0 0 var(--radius-card)',
          minWidth: '280px'
        }}
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Kontakt
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Schnell und einfach erreichbar
          </p>
        </div>

        {/* Kontakt-Buttons */}
        <div className="p-4 space-y-3">
          {/* Telefon */}
          <button
            onClick={handlePhoneClick}
            className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <div 
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-button)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">Anrufen</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{phoneNumber}</div>
            </div>
          </button>

          {/* E-Mail */}
          <button
            onClick={handleEmailClick}
            className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
            style={{ borderRadius: 'var(--radius-button)' }}
          >
            <div 
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-button)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">E-Mail</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{email}</div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Wir sind für Sie da
          </p>
        </div>
      </div>

      {/* Trigger-Button (immer sichtbar) */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        style={{ 
          borderRadius: 'var(--radius-button) 0 0 var(--radius-button)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed'
        }}
        onMouseEnter={handleExpand}
        onMouseLeave={handleCollapse}
      >
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          <span>Kontakt</span>
        </div>
      </div>
    </div>
  );
} 