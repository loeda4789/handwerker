'use client'

import React, { useState } from 'react'
import { ContentData } from '@/types/content'
import Toast from './Toast'

interface ContactProps {
  content: ContentData
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

  const projectSteps = [
    {
      number: 1,
      title: "Erstberatung & Vor-Ort-Termin",
      description: "Wir besprechen Ihre Wünsche und Anforderungen in einem persönlichen Gespräch vor Ort."
    },
    {
      number: 2,
      title: "Individuelle Planung & Angebot",
      description: "Basierend auf Ihren Wünschen erstellen wir ein detailliertes Angebot mit transparenten Kosten."
    },
    {
      number: 3,
      title: "Durchführung durch unser Team",
      description: "Unser erfahrenes Team setzt Ihr Projekt mit höchster Qualität und Sorgfalt um."
    },
    {
      number: 4,
      title: "Abschluss & Abnahme",
      description: "Gemeinsam überprüfen wir das Ergebnis und stellen Ihre Zufriedenheit sicher."
    }
  ]

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
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Success
      setToast({
        message: 'Vielen Dank! Wir haben Ihre Nachricht erhalten und melden uns bald bei Ihnen.',
        type: 'success',
        isVisible: true
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setToast({
        message: 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.',
        type: 'error',
        isVisible: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <section id="kontakt" className="bg-background dark:bg-dark py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-light mb-6">
              Jetzt unverbindlich anfragen
            </h2>
            
            <p className="text-text-secondary dark:text-light/80 mb-4">
              Sie haben ein Anliegen oder möchten mehr über unsere Leistungen erfahren? Dann melden Sie sich bei uns!
            </p>
            
            <p className="text-text-secondary dark:text-light/80 mb-8">
              Wir freuen uns auf Ihre Nachricht!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text dark:text-light mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface dark:bg-dark-secondary text-text dark:text-light transition-colors duration-300 ${
                    errors.name ? 'border-red-500' : 'border-border dark:border-gray-600'
                  }`}
                  placeholder=""
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text dark:text-light mb-2">
                  E-Mail (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface dark:bg-dark-secondary text-text dark:text-light"
                  placeholder=""
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text dark:text-light mb-2">
                  Telefonnummer (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface dark:bg-dark-secondary text-text dark:text-light"
                  placeholder=""
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text dark:text-light mb-2">
                  Ich interessiere mich für...
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface dark:bg-dark-secondary text-text dark:text-light"
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
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text dark:text-light mb-2">
                  Nachricht (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface dark:bg-dark-secondary text-text dark:text-light resize-none"
                  placeholder=""
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-accent hover:scale-105'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <span>Wird gesendet...</span>
                  </>
                ) : (
                  <>
                    <span>Nachricht senden</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Project Process */}
          <div className="animate-on-scroll">
            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-accent mb-8">
              So läuft ein Projekt bei uns ab
            </h3>
            
            <div className="space-y-8">
              {projectSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4 animate-on-scroll">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <h4 className="text-lg font-semibold text-primary dark:text-accent mb-2">
                      {step.title}
                    </h4>
                    <p className="text-text-secondary dark:text-light/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-12 p-6 bg-surface dark:bg-dark-secondary rounded-lg">
              <h4 className="text-lg font-semibold text-text dark:text-light mb-4">
                Kontakt Informationen
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span className="text-text-secondary dark:text-light/80">{content.contact.address}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a 
                    href={`tel:${content.contact.phone}`}
                    className="text-primary dark:text-accent hover:underline"
                  >
                    {content.contact.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a 
                    href={`mailto:${content.contact.email}`}
                    className="text-primary dark:text-accent hover:underline"
                  >
                    {content.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </section>
  )
} 