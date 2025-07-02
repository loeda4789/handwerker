'use client';

import { useState } from 'react';
import { FiPhone, FiCheck, FiClock } from 'react-icons/fi';

interface CallbackRequestProps {
  className?: string;
}

export default function CallbackRequest({ className = '' }: CallbackRequestProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const resetForm = () => {
    setIsSubmitted(false);
    setError('');
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto ${className}`}>
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Anfrage erfolgreich!
          </h3>
          <p className="text-gray-600 mb-4">
            Vielen Dank! Wir rufen Sie innerhalb der nächsten 24 Stunden zurück.
          </p>
          <button
            onClick={resetForm}
            className="text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Neue Anfrage stellen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto ${className}`}>
      <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <FiPhone className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Kostenloser Rückruf
        </h3>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <FiClock className="w-4 h-4" />
          Wir rufen Sie innerhalb von 24h zurück
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="callback-name" className="block text-sm font-medium text-gray-700 mb-1">
            Ihr Name (optional)
          </label>
          <input
            type="text"
            id="callback-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="callback-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefonnummer *
          </label>
          <input
            type="tel"
            id="callback-phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+49 123 456789"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Wird gesendet...
            </>
          ) : (
            <>
              <FiPhone className="w-5 h-5" />
              Rückruf anfordern
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Ihre Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
} 