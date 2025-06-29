'use client';

import { useState, useEffect } from 'react';

interface CallbackPopupProps {
  isEnabled: boolean;
  title?: string;
  description?: string;
  delaySeconds?: number;
}

export default function CallbackPopup({ 
  isEnabled, 
  title = "Kostenlose Beratung",
  description = "Wir rufen Sie gerne zurück!",
  delaySeconds = 30
}: CallbackPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isEnabled) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [isEnabled, delaySeconds]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 animate-[fadeIn_0.3s_ease-out]" />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]"
          style={{ borderRadius: 'var(--radius-modal)' }}>
          
          <div className="bg-primary text-text-light p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
              style={{ borderRadius: 'var(--radius-button)' }}
              aria-label="Schließen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 bg-white/20 flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-button)' }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-text-light/90">{description}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Ihr Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    style={{ borderRadius: 'var(--radius-input)' }}
                    placeholder="Max Mustermann"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    style={{ borderRadius: 'var(--radius-input)' }}
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-text hover:bg-gray-50 transition-colors"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    Später
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-primary text-text-light hover:bg-primary/90 transition-colors font-medium"
                    style={{ borderRadius: 'var(--radius-button)' }}
                  >
                    Jetzt anrufen lassen
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4"
                  style={{ borderRadius: 'var(--radius-button)' }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-text mb-2">Vielen Dank!</h4>
                <p className="text-text-secondary">Wir rufen Sie in Kürze zurück.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 