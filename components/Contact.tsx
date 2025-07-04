'use client'

import { useState } from 'react'

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
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    privacy: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info'
    isVisible: boolean
  }>({
    message: '',
    type: 'info',
    isVisible: false
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse'
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Nachricht ist erforderlich'
    }

    if (!formData.privacy) {
      newErrors.privacy = 'Datenschutzerklärung muss akzeptiert werden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true })
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }))
    }, 5000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      showToast('Bitte korrigieren Sie die Fehler im Formular.', 'error')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Formspree API-Anfrage
      const response = await fetch('https://formspree.io/f/xldnjzwv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          _subject: `Neue Kontaktanfrage von ${formData.name}`,
          _replyto: formData.email
        })
      })

      if (response.ok) {
        showToast('Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden bei Ihnen.', 'success')
        
        // Form zurücksetzen
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          privacy: false
        })
      } else {
        throw new Error('Formspree error')
      }
    } catch (error) {
      showToast('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-white text-sm font-medium shadow-lg"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                borderRadius: 'var(--radius-button)'
              }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              Kostenlos & unverbindlich
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Schreiben Sie uns
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
                  className={`w-full px-4 py-3 border focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 ${
                    errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                  }`}
                  style={{ borderRadius: 'var(--radius-input)' }}
                  placeholder="Ihr Name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
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
                  className={`w-full px-4 py-3 border focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                  }`}
                  style={{ borderRadius: 'var(--radius-input)' }}
                  placeholder="ihre.email@beispiel.de"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
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
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                }`}
                style={{ borderRadius: 'var(--radius-input)' }}
                placeholder="0123 456789"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
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
                className={`w-full px-4 py-3 border focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white resize-none transition-all duration-300 ${
                  errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                }`}
                style={{ borderRadius: 'var(--radius-input)' }}
                placeholder="Beschreiben Sie Ihr Projekt oder stellen Sie Ihre Frage..."
              ></textarea>
              {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-500 rounded transition-colors duration-300 flex-shrink-0"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed cursor-pointer">
                Ich habe die{' '}
                <a href="/datenschutz" className="text-primary dark:text-accent hover:underline font-medium">
                  Datenschutzerklärung
                </a>{' '}
                gelesen und stimme der Verarbeitung meiner Daten zu. *
              </label>
            </div>
            {errors.privacy && <p className="ml-7 mt-2 text-sm text-red-600 dark:text-red-400">{errors.privacy}</p>}
            
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
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
                {isSubmitting ? (
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