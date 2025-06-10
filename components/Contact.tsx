'use client'

import { useState } from 'react'

interface ContactProps {
  content: any
}

interface FormData {
  name: string
  email: string
  phone: string
  requestType: string
  serviceCategory: string
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
    requestType: '',
    serviceCategory: '',
    message: '',
    privacy: false
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string>('')
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField('')
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
          requestType: formData.requestType,
          serviceCategory: formData.serviceCategory,
          message: formData.message,
          _subject: `Neue Anfrage von ${formData.name} - ${formData.requestType}`,
          _replyto: formData.email
        })
      })

      if (response.ok) {
        showToast('🎉 Vielen Dank für Ihre Nachricht! Wir melden uns innerhalb von 24 Stunden bei Ihnen.', 'success')
        
        // Form zurücksetzen
        setFormData({
          name: '',
          email: '',
          phone: '',
          requestType: '',
          serviceCategory: '',
          message: '',
          privacy: false
        })
      } else {
        throw new Error('Formspree error')
      }
    } catch (error) {
      showToast('❌ Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppClick = () => {
    const message = `Hallo! Ich interessiere mich für Ihre Handwerksleistungen und würde gerne mehr erfahren.`
    // Telefonnummer für WhatsApp formatieren (+ und Leerzeichen entfernen)
    const phoneForWhatsApp = content.contact.phone.replace(/[\s\+\-\(\)]/g, '')
    const whatsappUrl = `https://wa.me/${phoneForWhatsApp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${content.contact.phone}`
  }

  return (
    <section id="kontakt" className="bg-background dark:bg-dark py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12 animate-on-scroll">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent rounded-full text-sm font-medium mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text dark:text-light mb-6">
            Jetzt unverbindlich anfragen
          </h2>
          <p className="text-lg text-text-secondary dark:text-light/80 mb-4 max-w-2xl mx-auto">
            Sie haben ein Anliegen oder möchten mehr über unsere Leistungen erfahren? Dann melden Sie sich bei uns!
          </p>
          <div className="flex items-center justify-center text-sm text-text-secondary dark:text-light/60 mb-8">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Antwort innerhalb von 24 Stunden
          </div>
        </div>

        {/* Quick Contact - Mobile: Buttons, Desktop: Phone Number */}
        <div className="mb-8 animate-on-scroll">
          {/* Mobile: Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595"/>
              </svg>
              WhatsApp Chat
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </button>
            
            <button
              onClick={handlePhoneClick}
              className="flex items-center justify-center px-6 py-4 bg-primary hover:bg-accent text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Sofort anrufen
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </button>
          </div>

          {/* Desktop: Phone Number Display */}
          <div className="hidden md:flex items-center justify-center bg-surface dark:bg-dark-secondary rounded-xl p-6 border border-border/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 dark:bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary dark:text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-secondary dark:text-light/60 mb-1">Rufen Sie uns direkt an:</p>
                <p className="text-2xl font-bold text-text dark:text-light">{content.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Toast Notification */}
        {toast.isVisible && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 shadow-lg animate-on-scroll ${
            toast.type === 'success' ? 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:border-green-400 dark:text-green-400' :
            toast.type === 'error' ? 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:border-red-400 dark:text-red-400' :
            'bg-blue-50 border-blue-400 text-blue-800 dark:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400'
          }`}>
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                {toast.type === 'success' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>}
                {toast.type === 'error' && <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>}
                {toast.type === 'info' && <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>}
              </svg>
              <div>
                <p className="font-medium">{toast.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="animate-on-scroll">
          <form onSubmit={handleSubmit} className="bg-surface dark:bg-dark-secondary rounded-2xl p-6 md:p-8 shadow-xl border border-border/50 dark:border-gray-700/50 space-y-6">
            
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  className={`w-full px-4 pt-6 pb-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-all duration-300 peer ${
                    errors.name ? 'border-red-500 focus:ring-red-500' : 'border-border dark:border-text-secondary hover:border-primary/50 dark:hover:border-accent/50'
                  }`}
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.name || focusedField === 'name' 
                      ? 'top-2 text-xs text-primary dark:text-accent font-medium' 
                      : 'top-4 text-text-secondary dark:text-light/60'
                  }`}
                >
                  Vollständiger Name *
                </label>
                {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {errors.name}
                </p>}
              </div>

              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className={`w-full px-4 pt-6 pb-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-all duration-300 peer ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border dark:border-text-secondary hover:border-primary/50 dark:hover:border-accent/50'
                  }`}
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    formData.email || focusedField === 'email' 
                      ? 'top-2 text-xs text-primary dark:text-accent font-medium' 
                      : 'top-4 text-text-secondary dark:text-light/60'
                  }`}
                >
                  E-Mail Adresse *
                </label>
                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  {errors.email}
                </p>}
              </div>
            </div>

            {/* Phone Field */}
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                className={`w-full px-4 pt-6 pb-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light transition-all duration-300 peer ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-border dark:border-text-secondary hover:border-primary/50 dark:hover:border-accent/50'
                }`}
                placeholder=" "
              />
              <label 
                htmlFor="phone" 
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.phone || focusedField === 'phone' 
                    ? 'top-2 text-xs text-text-secondary dark:text-light/60 font-medium' 
                    : 'top-4 text-text-secondary dark:text-light/60'
                }`}
              >
                Telefonnummer (optional)
              </label>
              {errors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.phone}
              </p>}
            </div>

            {/* Request Type Field */}
            <div className="relative">
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleInputChange}
                onFocus={() => handleFocus('requestType')}
                onBlur={handleBlur}
                className="w-full px-4 pt-6 pb-2 text-base border border-border dark:border-text-secondary rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light hover:border-primary/50 dark:hover:border-accent/50 transition-all duration-300"
              >
                <option value="" disabled hidden></option>
                <option value="Rückruf">Rückruf</option>
                <option value="Beratungstermin">Beratungstermin</option>
                <option value="Kostenvoranschlag">Kostenvoranschlag</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
              <label 
                htmlFor="requestType" 
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.requestType || focusedField === 'requestType' 
                    ? 'top-2 text-xs text-primary dark:text-accent font-medium' 
                    : 'top-4 text-text-secondary dark:text-light/60'
                }`}
              >
                Art der Anfrage {!formData.requestType && !focusedField && '- Bitte wählen'}
              </label>
            </div>

             {/* Service Category Field - Only show if request type is selected and not 'Sonstiges' */}
             {formData.requestType && formData.requestType !== 'Sonstiges' && (
               <div className="relative animate-on-scroll" style={{ opacity: 1, transform: 'translateY(0px)' }}>
                 <select
                   id="serviceCategory"
                   name="serviceCategory"
                   value={formData.serviceCategory}
                   onChange={handleInputChange}
                   onFocus={() => handleFocus('serviceCategory')}
                   onBlur={handleBlur}
                   className="w-full px-4 pt-6 pb-2 text-base border border-border dark:border-text-secondary rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light hover:border-primary/50 dark:hover:border-accent/50 transition-all duration-300"
                 >
                   <option value="" disabled hidden></option>
                   <option value="Badezimmer komplett">Badezimmer komplett</option>
                   <option value="Küche (Arbeitsplatte/Spritzschutz)">Küche (Arbeitsplatte/Spritzschutz)</option>
                   <option value="Wohnräume/Flur">Wohnräume/Flur</option>
                   <option value="Balkon/Terrasse">Balkon/Terrasse</option>
                   <option value="Sanierung/Renovierung">Sanierung/Renovierung</option>
                   <option value="Reparaturen (Fliesen/Fugen)">Reparaturen (Fliesen/Fugen)</option>
                   <option value="Naturstein/Mosaik">Naturstein/Mosaik</option>
                   <option value="Außenbereich">Außenbereich</option>
                 </select>
                 <label 
                   htmlFor="serviceCategory" 
                   className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                     formData.serviceCategory || focusedField === 'serviceCategory' 
                       ? 'top-2 text-xs text-primary dark:text-accent font-medium' 
                       : 'top-4 text-text-secondary dark:text-light/60'
                   }`}
                 >
                   Worum geht es? {!formData.serviceCategory && focusedField !== 'serviceCategory' && '(optional - bitte wählen)'}
                 </label>
               </div>
             )}
             
             {/* Message Field */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                rows={5}
                className={`w-full px-4 pt-6 pb-2 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background dark:bg-dark text-text dark:text-light resize-none transition-all duration-300 ${
                  errors.message ? 'border-red-500 focus:ring-red-500' : 'border-border dark:border-text-secondary hover:border-primary/50 dark:hover:border-accent/50'
                }`}
                placeholder=" "
              ></textarea>
              <label 
                htmlFor="message" 
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  formData.message || focusedField === 'message' 
                    ? 'top-2 text-xs text-primary dark:text-accent font-medium' 
                    : 'top-4 text-text-secondary dark:text-light/60'
                }`}
              >
                Ihre Nachricht *
              </label>
              {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
                {errors.message}
              </p>}
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={formData.privacy}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-border dark:border-text-secondary rounded transition-colors duration-300"
              />
              <label htmlFor="privacy" className="text-sm text-text-secondary dark:text-light/80 leading-relaxed">
                Ich habe die{' '}
                <a href="/datenschutz" className="text-primary dark:text-accent hover:underline font-medium">
                  Datenschutzerklärung
                </a>{' '}
                gelesen und stimme der Verarbeitung meiner Daten zu. *
              </label>
            </div>
            {errors.privacy && <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {errors.privacy}
            </p>}
            
            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-accent text-white rounded-xl hover:shadow-xl transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-105 min-w-[200px]"
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
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Nachricht senden
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
} 