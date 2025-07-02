'use client';

import { useState, useEffect } from 'react';
import { FiPhone, FiCheck, FiClock, FiX } from 'react-icons/fi';

interface CallbackRequestProps {
  isEnabled: boolean;
  className?: string;
}

export default function CallbackRequest({ isEnabled, className = '' }: CallbackRequestProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Zeige Widget nach 30 Sekunden an
  useEffect(() => {
    if (!isEnabled) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 Sekunden

    return () => clearTimeout(timer);
  }, [isEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Einfache Validierung
    if (!phoneNumber.trim()) {
      setError('Bitte geben Sie Ihre Telefonnummer ein.');
      return;
    }

    // Telefonnummer-Format prüfen (einfache Prüfung)
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setError('Bitte geben Sie eine gültige Telefonnummer ein.');
      return;
    }

    setIsLoading(true);

    try {
      // Hier würde normalerweise ein API-Call stattfinden
      // Für jetzt simulieren wir eine erfolgreiche Anfrage
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Rückruf-Anfrage:', { name: name.trim(), phone: phoneNumber.trim() });
      
      setIsSubmitted(true);
      setPhoneNumber('');
      setName('');
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError('');
  };

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 ${className}`}>
      {/* Minimierter Zustand - nur Button */}
      {isMinimized && (
        <button
          onClick={handleMinimize}
          className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        >
          <FiPhone className="w-6 h-6" />
        </button>
      )}

      {/* Vollständiges Widget */}
      {!isMinimized && (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-4 duration-500">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FiPhone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Kostenloser Rückruf</h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  Innerhalb 24h
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {isSubmitted ? (
              // Erfolgs-Zustand
              <div className="text-center py-2">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <FiCheck className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Anfrage erfolgreich!
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Wir rufen Sie innerhalb der nächsten 24 Stunden zurück.
                </p>
                <button
                  onClick={resetForm}
                  className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                >
                  Neue Anfrage
                </button>
              </div>
            ) : (
              // Formular
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ihr Name (optional)"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Telefonnummer *"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-xs bg-red-50 p-2 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2.5 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <FiPhone className="w-4 h-4" />
                      Rückruf anfordern
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-400 text-center">
              Vertraulich behandelt
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 