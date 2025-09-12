'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { MdCheckCircle, MdDownload, MdEmail } from 'react-icons/md'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [isLoading, setIsLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Hier könnten Sie die Session-Details von Stripe abrufen
      // und die Bestellbestätigung anzeigen
      setIsLoading(false)
      setOrderDetails({
        sessionId,
        status: 'completed',
        amount: '149.00',
        currency: 'EUR'
      })
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdCheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Zahlung erfolgreich!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Vielen Dank für Ihre Bestellung. Ihre Website wird nun erstellt.
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Bestelldetails
              </h2>
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bestellnummer:</span>
                  <span className="font-medium">{orderDetails.sessionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Betrag:</span>
                  <span className="font-medium">{orderDetails.amount} {orderDetails.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">Bezahlt</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Nächste Schritte
            </h3>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <span className="text-gray-700">
                  Sie erhalten eine Bestätigungs-E-Mail mit allen Details
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <span className="text-gray-700">
                  Unser Team erstellt Ihre Website innerhalb von 24-48 Stunden
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <span className="text-gray-700">
                  Sie erhalten Zugangsdaten und können Ihre Website verwalten
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/"
              className="flex-1 py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MdDownload className="w-5 h-5" />
              Zur Startseite
            </Link>
            
            <Link
              href="/kontakt"
              className="flex-1 py-3 px-6 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MdEmail className="w-5 h-5" />
              Kontakt aufnehmen
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Fragen? Kontaktieren Sie uns unter{' '}
              <a href="mailto:support@handwerker-template.de" className="text-primary hover:underline">
                support@handwerker-template.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
