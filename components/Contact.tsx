'use client'

import { useState, useEffect } from 'react'
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation'
import { useLayoutConfig, useStyleConfig } from '@/contexts/AppConfigContext'

interface ContactProps {
  content: any
}

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  privacy: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function Contact({ content }: ContactProps) {
  // Aktiviere Scroll-Animationen
  useScrollAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    isVisible: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  })

  // Design-Style aus AppConfigContext
  const { design: designStyle } = useLayoutConfig()
  const { badgeStyle, fontFamily } = useStyleConfig()
  
  // Moderne Ansichten (rounded, modern) verwenden modernen Badge-Stil
  const isModernStyle = designStyle === 'rounded' || designStyle === 'modern'
  
  // Badge-Klassen basierend auf Stil-Paket
  const getBadgeClasses = () => {
    const baseClasses = "inline-flex items-center gap-2 text-white px-4 py-2 text-sm font-medium mb-4"
    const badgeClasses = {
      minimal: "badge-minimal",
      rounded: "badge-rounded", 
      pill: "badge-pill",
      outlined: "badge-outlined"
    }
    return `${baseClasses} ${badgeClasses[badgeStyle]}`
  }
  
  const getFontClass = () => {
    const fontClasses = {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
      display: "font-display"
    }
    return fontClasses[fontFamily]
  }

  // Toast anzeigen
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ isVisible: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }))
    }, 5000)
  }

  // Form Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Bitte füllen Sie alle erforderlichen Felder aus.', 'error')
      return
    }

    setIsLoading(true)
    
    try {
      // Simuliere API-Call (2 Sekunden)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      showToast('Nachricht erfolgreich gesendet! Wir melden uns schnellstmöglich bei Ihnen.', 'success')
      
      // Form zurücksetzen
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      
    } catch (error) {
      showToast('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Input Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section id="kontakt" className={`py-16 ${isModernStyle ? 'modern-style' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12 animate-on-scroll">
            {/* Badge */}
            <div className={getBadgeClasses()}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              Kostenlos & unverbindlich
            </div>
            
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 ${getFontClass()}`}>
              {isModernStyle ? (
                <span className="heading-underline-large">Schreiben Sie uns</span>
              ) : (
                'Schreiben Sie uns'
              )}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Senden Sie uns eine Nachricht und wir melden uns schnellstmöglich bei Ihnen zurück.
            </p>
          </div>
          
          {/* Toast Notification */}
          {toast.isVisible && (
            <div className={`mb-8 p-4 shadow-lg ${
              toast.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400' :
              toast.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400' :
              'bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400'
            }`}
              style={{ borderRadius: 'var(--radius-card)' }}>
              <p className="font-medium">{toast.message}</p>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-8 shadow-lg space-y-6"
            style={{ borderRadius: 'var(--radius-card)' }}>
            
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300"
                  style={{ borderRadius: 'var(--radius-input)' }}
                  placeholder="Ihr Name"
                />

              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-Mail Adresse *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300"
                  style={{ borderRadius: 'var(--radius-input)' }}
                  placeholder="ihre.email@beispiel.de"
                />

              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Telefonnummer (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300"
                style={{ borderRadius: 'var(--radius-input)' }}
                placeholder="0123 456789"
              />

            </div>
             
            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ihre Nachricht *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white resize-none transition-all duration-300"
                style={{ borderRadius: 'var(--radius-input)' }}
                placeholder="Beschreiben Sie Ihr Projekt oder stellen Sie Ihre Frage..."
              ></textarea>

            </div>


            
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-8 py-4 text-white hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                style={{ 
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: 'var(--radius-button)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-b-2 border-white mr-3"
                      style={{ borderRadius: 'var(--radius-button)' }}></div>
                    Wird gesendet...
                  </div>
                ) : (
                  'Nachricht senden'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 