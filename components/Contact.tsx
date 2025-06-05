'use client'

import { useState } from 'react'

interface ContactProps {
  content: any
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function Contact({ content }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse'
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Ungültige Telefonnummer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      // Hier würde normalerweise die API-Anfrage stehen
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulierte API-Anfrage
      
      showToast('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.', 'success')
      
      // Form zurücksetzen
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      showToast('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="bg-background dark:bg-dark py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
                Kontakt
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
                Jetzt unverbindlich anfragen
              </h2>
              <p className="text-text-secondary dark:text-light/80 mb-4">
                Sie haben ein Anliegen oder möchten mehr über unsere Leistungen erfahren? Dann melden Sie sich bei uns!
              </p>
              <p className="text-text-secondary dark:text-light/80 mb-8">
                Wir freuen uns auf Ihre Nachricht!
              </p>
            </div>
            
            {/* Toast Notification */}
            {toast.isVisible && (
              <div className={`mb-6 p-4 rounded-lg border ${
                toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' :
                toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' :
                'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400'
              }`}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    {toast.type === 'success' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>}
                    {toast.type === 'error' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>}
                    {toast.type === 'info' && <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>}
                  </svg>
                  <p className="text-sm font-medium">{toast.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-surface dark:bg-dark-secondary rounded-2xl p-8 shadow-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text dark:text-light mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-colors duration-300 ${
                      errors.name ? 'border-red-500' : 'border-border dark:border-gray-600'
                    }`}
                    placeholder="Ihr vollständiger Name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text dark:text-light mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-colors duration-300 ${
                      errors.email ? 'border-red-500' : 'border-border dark:border-gray-600'
                    }`}
                    placeholder="ihre@email.de"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text dark:text-light mb-2">
                    Telefonnummer (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-colors duration-300 ${
                      errors.phone ? 'border-red-500' : 'border-border dark:border-gray-600'
                    }`}
                    placeholder="+49 123 456 789"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text dark:text-light mb-2">
                    Ich interessiere mich für...
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="renovation">Renovierung & Sanierung</option>
                    <option value="bathroom">Badezimmer & Sanitär</option>
                    <option value="electrical">Elektroinstallation</option>
                    <option value="flooring">Fliesen & Böden</option>
                    <option value="drywall">Trockenbau</option>
                    <option value="painting">Malerarbeiten</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text dark:text-light mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light resize-none"
                  placeholder="Beschreiben Sie Ihr Projekt oder Anliegen..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Nachricht senden
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 