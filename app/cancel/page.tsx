'use client'

import Link from 'next/link'
import { MdCancel, MdArrowBack, MdRefresh } from 'react-icons/md'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdCancel className="w-12 h-12 text-red-600" />
          </div>

          {/* Cancel Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Zahlung abgebrochen
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Die Zahlung wurde abgebrochen. Keine Sorge - es wurden keine Kosten verursacht.
          </p>

          {/* Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Was passiert als nächstes?
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700">
                  Ihre Konfiguration wurde gespeichert
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700">
                  Sie können jederzeit erneut versuchen zu bezahlen
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">✓</span>
                </div>
                <span className="text-gray-700">
                  Oder kontaktieren Sie uns für eine persönliche Beratung
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 py-3 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MdArrowBack className="w-5 h-5" />
              Zurück zum Designer
            </Link>
            
            <Link
              href="/kontakt"
              className="flex-1 py-3 px-6 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MdRefresh className="w-5 h-5" />
              Persönlich beraten lassen
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Probleme mit der Zahlung? Kontaktieren Sie uns unter{' '}
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
