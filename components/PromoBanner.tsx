'use client';

import { useState, useEffect } from 'react';

interface PromoBannerProps {
  isEnabled: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  validUntil?: string;
  onClose?: () => void;
}

export default function PromoBanner({ 
  isEnabled, 
  title = "Sonderangebot",
  description = "Jetzt 15% Rabatt auf Erstberatung sichern!",
  buttonText = "Jetzt anfragen",
  validUntil = "31.03.2024",
  onClose 
}: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!isEnabled) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled || !validUntil) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(validUntil + ' 23:59:59');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isEnabled, validUntil]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 animate-[fadeIn_0.3s_ease-out]" />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-[slideInFromBottom_0.5s_ease-out]">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl">
          <div className="container mx-auto px-4 py-4 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
              style={{ borderRadius: 'var(--radius-button)' }}
              aria-label="Schließen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pr-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <div className="w-8 h-8 bg-yellow-400 text-red-600 flex items-center justify-center font-bold text-sm animate-pulse"
                    style={{ borderRadius: 'var(--radius-button)' }}>
                    %
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                </div>
                <p className="text-sm md:text-base text-red-100 mb-2">{description}</p>
                
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm">
                  <span className="text-red-200">Gültig bis {validUntil}:</span>
                  <div className="flex gap-1">
                    {timeLeft.days > 0 && (
                      <span className="bg-white/20 px-2 py-1 font-mono" style={{ borderRadius: 'var(--radius-sm)' }}>
                        {timeLeft.days}d
                      </span>
                    )}
                    <span className="bg-white/20 px-2 py-1 font-mono" style={{ borderRadius: 'var(--radius-sm)' }}>
                      {String(timeLeft.hours).padStart(2, '0')}h
                    </span>
                    <span className="bg-white/20 px-2 py-1 font-mono" style={{ borderRadius: 'var(--radius-sm)' }}>
                      {String(timeLeft.minutes).padStart(2, '0')}m
                    </span>
                    <span className="bg-white/20 px-2 py-1 font-mono" style={{ borderRadius: 'var(--radius-sm)' }}>
                      {String(timeLeft.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContact}
                className="bg-white text-red-600 px-6 py-3 font-bold hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{ borderRadius: 'var(--radius-button)' }}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 